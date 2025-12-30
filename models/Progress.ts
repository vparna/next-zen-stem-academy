import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Progress } from '@/types';

const COLLECTION_NAME = 'progress';

export async function createProgress(progressData: Omit<Progress, '_id'>): Promise<ObjectId> {
  const db = await getDatabase();
  
  const result = await db.collection<Progress>(COLLECTION_NAME).insertOne(progressData);
  
  return result.insertedId;
}

export async function getProgressByEnrollment(enrollmentId: string | ObjectId): Promise<Progress[]> {
  const db = await getDatabase();
  const objectId = typeof enrollmentId === 'string' ? new ObjectId(enrollmentId) : enrollmentId;
  return db.collection<Progress>(COLLECTION_NAME).find({ enrollmentId: objectId }).toArray();
}

export async function getProgressByLesson(
  enrollmentId: string | ObjectId,
  lessonId: string | ObjectId
): Promise<Progress | null> {
  const db = await getDatabase();
  const enrollmentObjId = typeof enrollmentId === 'string' ? new ObjectId(enrollmentId) : enrollmentId;
  const lessonObjId = typeof lessonId === 'string' ? new ObjectId(lessonId) : lessonId;
  
  return db.collection<Progress>(COLLECTION_NAME).findOne({
    enrollmentId: enrollmentObjId,
    lessonId: lessonObjId
  });
}

export async function updateProgress(
  enrollmentId: string | ObjectId,
  lessonId: string | ObjectId,
  updates: Partial<Omit<Progress, '_id' | 'enrollmentId' | 'lessonId'>>
): Promise<boolean> {
  const db = await getDatabase();
  const enrollmentObjId = typeof enrollmentId === 'string' ? new ObjectId(enrollmentId) : enrollmentId;
  const lessonObjId = typeof lessonId === 'string' ? new ObjectId(lessonId) : lessonId;
  
  const result = await db.collection<Progress>(COLLECTION_NAME).updateOne(
    { enrollmentId: enrollmentObjId, lessonId: lessonObjId },
    { $set: updates },
    { upsert: true }
  );
  
  return result.modifiedCount > 0 || result.upsertedCount > 0;
}

export async function calculateCourseProgress(
  enrollmentId: string | ObjectId,
  totalLessons: number
): Promise<number> {
  const progress = await getProgressByEnrollment(enrollmentId);
  const completedLessons = progress.filter(p => p.status === 'completed').length;
  
  return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
}
