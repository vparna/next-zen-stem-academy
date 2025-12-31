
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import { getEnrollmentsByUserId } from '@/models/Enrollment';
import { getCourseById } from '@/models/Course';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

async function handler(req: NextRequest) {
  try {
    const user = (req as any).user;
    
    // Get all enrollments for the user
    const enrollments = await getEnrollmentsByUserId(user.userId);
    
    // Fetch course details for each enrollment
    const enrollmentsWithCourses = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = await getCourseById(enrollment.courseId.toString());
        return {
          ...enrollment,
          course,
        };
      })
    );
    
    return NextResponse.json({ 
      enrollments: enrollmentsWithCourses,
      count: enrollmentsWithCourses.length 
    });
  } catch (error) {
    console.error('Error fetching user enrollments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handler);
