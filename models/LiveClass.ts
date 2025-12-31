import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { LiveClass } from '@/types';

const COLLECTION_NAME = 'live_classes';

export async function createLiveClass(liveClassData: Omit<LiveClass, '_id' | 'createdAt' | 'updatedAt'>): Promise<ObjectId> {
  const db = await getDatabase();
  const now = new Date();
  
  const result = await db.collection<LiveClass>(COLLECTION_NAME).insertOne({
    ...liveClassData,
    createdAt: now,
    updatedAt: now,
  });
  
  return result.insertedId;
}

export async function getLiveClassById(id: string | ObjectId): Promise<LiveClass | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<LiveClass>(COLLECTION_NAME).findOne({ _id: objectId });
}

export async function getLiveClassesByCourseId(courseId: string | ObjectId): Promise<LiveClass[]> {
  const db = await getDatabase();
  const objectId = typeof courseId === 'string' ? new ObjectId(courseId) : courseId;
  return db.collection<LiveClass>(COLLECTION_NAME)
    .find({ courseId: objectId })
    .sort({ scheduledAt: 1 })
    .toArray();
}

export async function getUpcomingLiveClasses(courseId?: string | ObjectId): Promise<LiveClass[]> {
  const db = await getDatabase();
  const now = new Date();
  const query: any = {
    scheduledAt: { $gt: now },
    status: 'scheduled'
  };
  
  if (courseId) {
    const objectId = typeof courseId === 'string' ? new ObjectId(courseId) : courseId;
    query.courseId = objectId;
  }
  
  return db.collection<LiveClass>(COLLECTION_NAME)
    .find(query)
    .sort({ scheduledAt: 1 })
    .toArray();
}

export async function updateLiveClass(
  id: string | ObjectId,
  updates: Partial<Omit<LiveClass, '_id' | 'createdAt'>>
): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<LiveClass>(COLLECTION_NAME).updateOne(
    { _id: objectId },
    { $set: { ...updates, updatedAt: new Date() } }
  );
  
  return result.modifiedCount > 0;
}
