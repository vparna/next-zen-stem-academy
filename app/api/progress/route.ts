import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import { getProgressByEnrollment, updateProgress } from '@/models/Progress';
import { ObjectId } from 'mongodb';

async function getHandler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const enrollmentId = searchParams.get('enrollmentId');
    
    if (!enrollmentId) {
      return NextResponse.json(
        { error: 'Enrollment ID is required' },
        { status: 400 }
      );
    }
    
    const progress = await getProgressByEnrollment(enrollmentId);
    
    return NextResponse.json({ progress });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function postHandler(req: NextRequest) {
  try {
    const user = (req as any).user;
    const { enrollmentId, lessonId, status, timeSpent } = await req.json();
    
    if (!enrollmentId || !lessonId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const updates: any = {
      userId: new ObjectId(user.userId),
      status: status || 'in-progress',
      lastAccessedAt: new Date(),
    };
    
    if (timeSpent) {
      updates.timeSpent = timeSpent;
    }
    
    if (status === 'completed') {
      updates.completedAt = new Date();
    }
    
    await updateProgress(enrollmentId, lessonId, updates);
    
    return NextResponse.json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);
