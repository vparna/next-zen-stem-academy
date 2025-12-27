import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { JobApplication } from '@/types';

const COLLECTION_NAME = 'job_applications';

export async function createJobApplication(
  applicationData: Omit<JobApplication, '_id' | 'createdAt'>
): Promise<ObjectId> {
  const db = await getDatabase();
  
  const result = await db.collection<JobApplication>(COLLECTION_NAME).insertOne({
    ...applicationData,
    createdAt: new Date(),
  });
  
  return result.insertedId;
}

export async function findAllApplications(jobId?: string): Promise<JobApplication[]> {
  const db = await getDatabase();
  const query = jobId ? { jobId: new ObjectId(jobId) } : {};
  return db.collection<JobApplication>(COLLECTION_NAME)
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();
}

export async function findApplicationById(id: string | ObjectId): Promise<JobApplication | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<JobApplication>(COLLECTION_NAME).findOne({ _id: objectId });
}

export async function updateApplicationStatus(
  id: string | ObjectId,
  status: JobApplication['status'],
  reviewNotes?: string
): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const updates: any = { status };
  if (reviewNotes !== undefined) {
    updates.reviewNotes = reviewNotes;
  }
  
  const result = await db.collection<JobApplication>(COLLECTION_NAME).updateOne(
    { _id: objectId },
    { $set: updates }
  );
  
  return result.modifiedCount > 0;
}

export async function deleteApplication(id: string | ObjectId): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<JobApplication>(COLLECTION_NAME).deleteOne({ _id: objectId });
  
  return result.deletedCount > 0;
}
