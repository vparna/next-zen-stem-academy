import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/middleware/adminAuth';
import { getDatabase } from '@/lib/db/mongodb';
import { Attendance, Child, User, Course } from '@/types';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

async function handler(req: NextRequest) {
  try {
    const db = await getDatabase();
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const childId = searchParams.get('childId');
    
    // Build query
    const query: any = {};
    
    if (startDate && endDate) {
      query.checkInTime = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    
    if (childId) {
      query.childId = childId;
    }
    
    // Get all attendance records
    const attendances = await db.collection<Attendance>('attendances')
      .find(query)
      .sort({ checkInTime: -1 })
      .toArray();
    
    // Fetch related data for each attendance
    const attendanceData = await Promise.all(
      attendances.map(async (attendance) => {
        const child = await db.collection<Child>('children')
          .findOne({ _id: attendance.childId });
        
        const parent = await db.collection<User>('users')
          .findOne({ _id: attendance.userId });
        
        const checkInTeacher = await db.collection<User>('users')
          .findOne({ _id: attendance.checkInTeacherId });
        
        let checkOutTeacher = null;
        if (attendance.checkOutTeacherId) {
          checkOutTeacher = await db.collection<User>('users')
            .findOne({ _id: attendance.checkOutTeacherId });
        }
        
        let course = null;
        if (attendance.courseId) {
          course = await db.collection<Course>('courses')
            .findOne({ _id: attendance.courseId });
        }
        
        return {
          id: attendance._id?.toString(),
          childName: child?.name || 'Unknown',
          childAge: child?.age,
          parentName: parent ? `${parent.firstName} ${parent.lastName}` : 'Unknown',
          parentEmail: parent?.email || 'N/A',
          courseName: course?.name || 'N/A',
          checkInTime: attendance.checkInTime,
          checkOutTime: attendance.checkOutTime,
          status: attendance.status,
          checkInTeacher: checkInTeacher ? `${checkInTeacher.firstName} ${checkInTeacher.lastName}` : 'Unknown',
          checkOutTeacher: checkOutTeacher ? `${checkOutTeacher.firstName} ${checkOutTeacher.lastName}` : null,
          notes: attendance.notes,
          duration: attendance.checkOutTime 
            ? Math.round((attendance.checkOutTime.getTime() - attendance.checkInTime.getTime()) / (1000 * 60))
            : null,
        };
      })
    );
    
    // Calculate statistics
    const totalAttendance = attendanceData.length;
    const completedAttendance = attendanceData.filter(a => a.status === 'completed').length;
    const activeAttendance = attendanceData.filter(a => a.status === 'checked-in').length;
    
    const averageDuration = attendanceData
      .filter(a => a.duration !== null)
      .reduce((sum, a) => sum + (a.duration || 0), 0) / completedAttendance || 0;
    
    return NextResponse.json({
      attendance: attendanceData,
      total: totalAttendance,
      statistics: {
        total: totalAttendance,
        completed: completedAttendance,
        active: activeAttendance,
        averageDuration: Math.round(averageDuration),
      },
    });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attendance records' },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);
