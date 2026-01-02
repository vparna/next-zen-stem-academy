import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/middleware/adminAuth';
import { getDatabase } from '@/lib/db/mongodb';
import { User, Child, Enrollment, Attendance, Progress, Course } from '@/types';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

async function handler(req: NextRequest) {
  try {
    const db = await getDatabase();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    // If userId is provided, get detailed report for that student
    if (userId) {
      const user = await db.collection<User>('users')
        .findOne({ _id: userId as any });
      
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      
      // Get all children for this user
      const children = await db.collection<Child>('children')
        .find({ userId: user._id })
        .toArray();
      
      // Get all enrollments
      const enrollments = await db.collection<Enrollment>('enrollments')
        .find({ userId: user._id })
        .toArray();
      
      // Get detailed enrollment data
      const enrollmentDetails = await Promise.all(
        enrollments.map(async (enrollment) => {
          const course = await db.collection<Course>('courses')
            .findOne({ _id: enrollment.courseId });
          
          // Get progress for this enrollment
          const progressRecords = await db.collection<Progress>('progress')
            .find({ enrollmentId: enrollment._id })
            .toArray();
          
          const completedLessons = progressRecords.filter(p => p.status === 'completed').length;
          const totalLessons = progressRecords.length;
          
          return {
            id: enrollment._id?.toString(),
            courseName: course?.name || 'Unknown',
            status: enrollment.status,
            paymentStatus: enrollment.paymentStatus,
            amount: enrollment.amount,
            enrolledAt: enrollment.enrolledAt,
            progress: enrollment.progress || 0,
            completedLessons,
            totalLessons,
          };
        })
      );
      
      // Get attendance records for all children
      const allAttendance = await Promise.all(
        children.map(async (child) => {
          const attendances = await db.collection<Attendance>('attendances')
            .find({ childId: child._id })
            .sort({ checkInTime: -1 })
            .toArray();
          
          return {
            childName: child.name,
            totalAttendance: attendances.length,
            completedAttendance: attendances.filter(a => a.status === 'completed').length,
            recentAttendance: attendances.slice(0, 5).map(a => ({
              checkInTime: a.checkInTime,
              checkOutTime: a.checkOutTime,
              status: a.status,
            })),
          };
        })
      );
      
      return NextResponse.json({
        student: {
          id: user._id?.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          createdAt: user.createdAt,
        },
        children: children.map(c => ({
          id: c._id?.toString(),
          name: c.name,
          age: c.age,
          grade: c.grade,
        })),
        enrollments: enrollmentDetails,
        attendance: allAttendance,
        summary: {
          totalEnrollments: enrollments.length,
          activeEnrollments: enrollments.filter(e => e.status === 'active').length,
          completedEnrollments: enrollments.filter(e => e.status === 'completed').length,
          totalSpent: enrollments.reduce((sum, e) => sum + e.amount, 0),
        },
      });
    }
    
    // Otherwise, get summary statistics for all students
    const users = await db.collection<User>('users')
      .find({ role: 'parent' })
      .toArray();
    
    const totalStudents = users.length;
    
    const allEnrollments = await db.collection<Enrollment>('enrollments')
      .find({})
      .toArray();
    
    const allAttendances = await db.collection<Attendance>('attendances')
      .find({})
      .toArray();
    
    const totalRevenue = allEnrollments
      .filter(e => e.paymentStatus === 'paid')
      .reduce((sum, e) => sum + e.amount, 0);
    
    // Group enrollments by course
    const enrollmentsByCourse: Record<string, number> = {};
    await Promise.all(
      allEnrollments.map(async (enrollment) => {
        const course = await db.collection<Course>('courses')
          .findOne({ _id: enrollment.courseId });
        
        if (course) {
          const courseName = course.name;
          enrollmentsByCourse[courseName] = (enrollmentsByCourse[courseName] || 0) + 1;
        }
      })
    );
    
    return NextResponse.json({
      summary: {
        totalStudents,
        totalEnrollments: allEnrollments.length,
        activeEnrollments: allEnrollments.filter(e => e.status === 'active').length,
        completedEnrollments: allEnrollments.filter(e => e.status === 'completed').length,
        totalRevenue,
        totalAttendance: allAttendances.length,
        completedAttendance: allAttendances.filter(a => a.status === 'completed').length,
      },
      enrollmentsByCourse,
    });
  } catch (error) {
    console.error('Error generating student reports:', error);
    return NextResponse.json(
      { error: 'Failed to generate student reports' },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);
