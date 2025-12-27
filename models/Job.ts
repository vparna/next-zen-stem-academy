import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Job } from '@/types';

const COLLECTION_NAME = 'jobs';

export async function createJob(jobData: Omit<Job, '_id' | 'createdAt' | 'updatedAt'>): Promise<ObjectId> {
  const db = await getDatabase();
  const now = new Date();
  
  const result = await db.collection<Job>(COLLECTION_NAME).insertOne({
    ...jobData,
    createdAt: now,
    updatedAt: now,
  });
  
  return result.insertedId;
}

export async function findAllJobs(activeOnly: boolean = false): Promise<Job[]> {
  const db = await getDatabase();
  const query = activeOnly ? { active: true } : {};
  return db.collection<Job>(COLLECTION_NAME).find(query).sort({ createdAt: -1 }).toArray();
}

export async function findJobById(id: string | ObjectId): Promise<Job | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<Job>(COLLECTION_NAME).findOne({ _id: objectId });
}

export async function findJobByJobId(jobId: string): Promise<Job | null> {
  const db = await getDatabase();
  return db.collection<Job>(COLLECTION_NAME).findOne({ jobId });
}

export async function updateJob(
  id: string | ObjectId,
  updates: Partial<Omit<Job, '_id' | 'createdAt'>>
): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<Job>(COLLECTION_NAME).updateOne(
    { _id: objectId },
    { $set: { ...updates, updatedAt: new Date() } }
  );
  
  return result.modifiedCount > 0;
}

export async function deleteJob(id: string | ObjectId): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<Job>(COLLECTION_NAME).deleteOne({ _id: objectId });
  
  return result.deletedCount > 0;
}
