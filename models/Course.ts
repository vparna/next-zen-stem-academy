import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Course } from '@/types';

const COLLECTION_NAME = 'courses';

export async function getAllCourses(activeOnly = true): Promise<Course[]> {
  const db = await getDatabase();
  const query = activeOnly ? { active: true } : {};
  return db.collection<Course>(COLLECTION_NAME).find(query).toArray();
}

export async function getCourseById(id: string | ObjectId): Promise<Course | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<Course>(COLLECTION_NAME).findOne({ _id: objectId });
}

export async function getCoursesByCategory(category: string): Promise<Course[]> {
  const db = await getDatabase();
  return db.collection<Course>(COLLECTION_NAME).find({ 
    category: category as Course['category'], 
    active: true 
  }).toArray();
}

export async function createCourse(courseData: Omit<Course, '_id' | 'createdAt' | 'updatedAt'>): Promise<ObjectId> {
  const db = await getDatabase();
  const now = new Date();
  
  const result = await db.collection<Course>(COLLECTION_NAME).insertOne({
    ...courseData,
    createdAt: now,
    updatedAt: now,
  });
  
  return result.insertedId;
}

export async function updateCourse(
  id: string | ObjectId,
  updates: Partial<Omit<Course, '_id' | 'createdAt'>>
): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<Course>(COLLECTION_NAME).updateOne(
    { _id: objectId },
    { $set: { ...updates, updatedAt: new Date() } }
  );
  
  return result.modifiedCount > 0;
}
