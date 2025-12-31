import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import { ObjectId } from 'mongodb';
import { 
  getAssignmentsByCourseId, 
  createSubmission, 
  getSubmissionByAssignmentAndUser 
} from '@/models/Assignment';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

async function getHandler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    
    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }
    
    const assignments = await getAssignmentsByCourseId(courseId);
    
    return NextResponse.json({ assignments });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function postHandler(req: NextRequest) {
  try {
    const user = (req as any).user;
    const { assignmentId, enrollmentId, submittedText, submittedFiles } = await req.json();
    
    if (!assignmentId || !enrollmentId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if already submitted
    const existing = await getSubmissionByAssignmentAndUser(
      assignmentId,
      user.userId
    );
    
    if (existing && existing.status !== 'resubmit-requested') {
      return NextResponse.json(
        { error: 'Assignment already submitted' },
        { status: 400 }
      );
    }
    
    const submissionId = await createSubmission({
      assignmentId: new ObjectId(assignmentId),
      enrollmentId: new ObjectId(enrollmentId),
      userId: new ObjectId(user.userId),
      submittedText,
      submittedFiles,
      submittedAt: new Date(),
      status: 'submitted',
    });
    
    return NextResponse.json({
      message: 'Assignment submitted successfully',
      submissionId: submissionId.toString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting assignment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);
