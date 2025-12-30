import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Quiz, QuizAttempt } from '@/types';

const QUIZ_COLLECTION = 'quizzes';
const ATTEMPT_COLLECTION = 'quiz_attempts';

// Quiz functions
export async function createQuiz(quizData: Omit<Quiz, '_id' | 'createdAt' | 'updatedAt'>): Promise<ObjectId> {
  const db = await getDatabase();
  const now = new Date();
  
  const result = await db.collection<Quiz>(QUIZ_COLLECTION).insertOne({
    ...quizData,
    createdAt: now,
    updatedAt: now,
  });
  
  return result.insertedId;
}

export async function getQuizById(id: string | ObjectId): Promise<Quiz | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<Quiz>(QUIZ_COLLECTION).findOne({ _id: objectId });
}

export async function getQuizzesByCourseId(courseId: string | ObjectId): Promise<Quiz[]> {
  const db = await getDatabase();
  const objectId = typeof courseId === 'string' ? new ObjectId(courseId) : courseId;
  return db.collection<Quiz>(QUIZ_COLLECTION)
    .find({ courseId: objectId, active: true })
    .toArray();
}

export async function updateQuiz(
  id: string | ObjectId,
  updates: Partial<Omit<Quiz, '_id' | 'createdAt'>>
): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<Quiz>(QUIZ_COLLECTION).updateOne(
    { _id: objectId },
    { $set: { ...updates, updatedAt: new Date() } }
  );
  
  return result.modifiedCount > 0;
}

// Quiz Attempt functions
export async function createQuizAttempt(attemptData: Omit<QuizAttempt, '_id'>): Promise<ObjectId> {
  const db = await getDatabase();
  
  const result = await db.collection<QuizAttempt>(ATTEMPT_COLLECTION).insertOne(attemptData);
  
  return result.insertedId;
}

export async function getQuizAttemptById(id: string | ObjectId): Promise<QuizAttempt | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<QuizAttempt>(ATTEMPT_COLLECTION).findOne({ _id: objectId });
}

export async function getAttemptsByQuizAndUser(
  quizId: string | ObjectId,
  userId: string | ObjectId
): Promise<QuizAttempt[]> {
  const db = await getDatabase();
  const quizObjId = typeof quizId === 'string' ? new ObjectId(quizId) : quizId;
  const userObjId = typeof userId === 'string' ? new ObjectId(userId) : userId;
  
  return db.collection<QuizAttempt>(ATTEMPT_COLLECTION)
    .find({ quizId: quizObjId, userId: userObjId })
    .sort({ attemptNumber: -1 })
    .toArray();
}

export async function updateQuizAttempt(
  id: string | ObjectId,
  updates: Partial<Omit<QuizAttempt, '_id'>>
): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<QuizAttempt>(ATTEMPT_COLLECTION).updateOne(
    { _id: objectId },
    { $set: updates }
  );
  
  return result.modifiedCount > 0;
}

export async function gradeQuizAttempt(attempt: QuizAttempt, quiz: Quiz): Promise<{ score: number; passed: boolean }> {
  let totalScore = 0;
  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
  
  attempt.answers.forEach(answer => {
    const question = quiz.questions.find(q => q.id === answer.questionId);
    if (question && answer.answer === question.correctAnswer) {
      totalScore += question.points;
    }
  });
  
  const passed = totalScore >= quiz.passingScore;
  
  return { score: totalScore, passed };
}
