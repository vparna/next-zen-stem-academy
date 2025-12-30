import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import { 
  getQuizzesByCourseId, 
  createQuizAttempt, 
  getAttemptsByQuizAndUser,
  getQuizById,
  gradeQuizAttempt 
} from '@/models/Quiz';
import { ObjectId } from 'mongodb';

async function getHandler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    const quizId = searchParams.get('quizId');
    const user = (req as any).user;
    
    if (quizId && user.userId) {
      // Get attempts for a specific quiz
      const attempts = await getAttemptsByQuizAndUser(quizId, user.userId);
      return NextResponse.json({ attempts });
    }
    
    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID or Quiz ID is required' },
        { status: 400 }
      );
    }
    
    const quizzes = await getQuizzesByCourseId(courseId);
    
    return NextResponse.json({ quizzes });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function postHandler(req: NextRequest) {
  try {
    const user = (req as any).user;
    const { quizId, enrollmentId, answers } = await req.json();
    
    if (!quizId || !enrollmentId || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Get quiz details
    const quiz = await getQuizById(quizId);
    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    // Check attempt limit
    const previousAttempts = await getAttemptsByQuizAndUser(quizId, user.userId);
    if (quiz.maxAttempts && previousAttempts.length >= quiz.maxAttempts) {
      return NextResponse.json(
        { error: 'Maximum attempts reached' },
        { status: 400 }
      );
    }
    
    const attemptNumber = previousAttempts.length + 1;
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    
    // Create attempt object with all required fields
    const attempt: any = {
      quizId: new ObjectId(quizId),
      enrollmentId: new ObjectId(enrollmentId),
      userId: new ObjectId(user.userId),
      answers,
      startedAt: new Date(),
      submittedAt: new Date(),
      totalPoints,
      attemptNumber,
      passed: false,
      score: 0,
    };
    
    // Grade the attempt
    const gradeResult = await gradeQuizAttempt(attempt, quiz);
    attempt.score = gradeResult.score;
    attempt.passed = gradeResult.passed;
    
    const attemptId = await createQuizAttempt(attempt);
    
    return NextResponse.json({
      message: 'Quiz submitted successfully',
      attemptId: attemptId.toString(),
      score: gradeResult.score,
      totalPoints,
      passed: gradeResult.passed,
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);
