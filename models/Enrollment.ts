import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Enrollment } from '@/types';

const COLLECTION_NAME = 'enrollments';

export async function createEnrollment(enrollmentData: Omit<Enrollment, '_id'>): Promise<ObjectId> {
  const db = await getDatabase();
  
  const result = await db.collection<Enrollment>(COLLECTION_NAME).insertOne(enrollmentData);
  
  return result.insertedId;
}

export async function getEnrollmentById(id: string | ObjectId): Promise<Enrollment | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<Enrollment>(COLLECTION_NAME).findOne({ _id: objectId });
}

export async function getEnrollmentsByUserId(userId: string | ObjectId): Promise<Enrollment[]> {
  const db = await getDatabase();
  const objectId = typeof userId === 'string' ? new ObjectId(userId) : userId;
  return db.collection<Enrollment>(COLLECTION_NAME).find({ userId: objectId }).toArray();
}

export async function updateEnrollment(
  id: string | ObjectId,
  updates: Partial<Omit<Enrollment, '_id'>>
): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<Enrollment>(COLLECTION_NAME).updateOne(
    { _id: objectId },
    { $set: updates }
  );
  
  return result.modifiedCount > 0;
}

export async function getEnrollmentsByCourseId(courseId: string | ObjectId): Promise<Enrollment[]> {
  const db = await getDatabase();
  const objectId = typeof courseId === 'string' ? new ObjectId(courseId) : courseId;
  return db.collection<Enrollment>(COLLECTION_NAME).find({ courseId: objectId }).toArray();
}
