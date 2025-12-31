import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Lesson } from '@/types';

const COLLECTION_NAME = 'lessons';

export async function createLesson(lessonData: Omit<Lesson, '_id' | 'createdAt' | 'updatedAt'>): Promise<ObjectId> {
  const db = await getDatabase();
  const now = new Date();
  
  const result = await db.collection<Lesson>(COLLECTION_NAME).insertOne({
    ...lessonData,
    createdAt: now,
    updatedAt: now,
  });
  
  return result.insertedId;
}

export async function getLessonById(id: string | ObjectId): Promise<Lesson | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<Lesson>(COLLECTION_NAME).findOne({ _id: objectId });
}

export async function getLessonsByCourseId(courseId: string | ObjectId): Promise<Lesson[]> {
  const db = await getDatabase();
  const objectId = typeof courseId === 'string' ? new ObjectId(courseId) : courseId;
  return db.collection<Lesson>(COLLECTION_NAME)
    .find({ courseId: objectId, active: true })
    .sort({ order: 1 })
    .toArray();
}

export async function updateLesson(
  id: string | ObjectId,
  updates: Partial<Omit<Lesson, '_id' | 'createdAt'>>
): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<Lesson>(COLLECTION_NAME).updateOne(
    { _id: objectId },
    { $set: { ...updates, updatedAt: new Date() } }
  );
  
  return result.modifiedCount > 0;
}

export async function deleteLesson(id: string | ObjectId): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<Lesson>(COLLECTION_NAME).deleteOne({ _id: objectId });
  
  return result.deletedCount > 0;
}
