import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import { createEnrollment } from '@/models/Enrollment';
import { getCourseById } from '@/models/Course';
import { ObjectId } from 'mongodb';

async function handler(req: NextRequest) {
  try {
    const user = (req as any).user;
    const { courseId, childId, batchId, amount } = await req.json();
    
    if (!courseId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Verify course exists
    const course = await getCourseById(courseId);
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Create enrollment
    const enrollmentId = await createEnrollment({
      userId: new ObjectId(user.userId),
      courseId: new ObjectId(courseId),
      childId: childId ? new ObjectId(childId) : undefined,
      batchId: batchId ? new ObjectId(batchId) : undefined,
      status: 'pending',
      paymentStatus: 'pending',
      amount,
      enrolledAt: new Date(),
    });
    
    return NextResponse.json({
      enrollmentId: enrollmentId.toString(),
      message: 'Enrollment created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating enrollment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const POST = withAuth(handler);
