import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Child } from '@/types';

const COLLECTION_NAME = 'children';

export async function createChild(childData: Omit<Child, '_id'>): Promise<ObjectId> {
  const db = await getDatabase();
  
  const result = await db.collection<Child>(COLLECTION_NAME).insertOne(childData);
  
  return result.insertedId;
}

export async function getChildrenByUserId(userId: string | ObjectId): Promise<Child[]> {
  const db = await getDatabase();
  const objectId = typeof userId === 'string' ? new ObjectId(userId) : userId;
  return db.collection<Child>(COLLECTION_NAME).find({ userId: objectId }).toArray();
}

export async function getChildById(id: string | ObjectId): Promise<Child | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<Child>(COLLECTION_NAME).findOne({ _id: objectId });
}

export async function updateChild(
  id: string | ObjectId,
  updates: Partial<Omit<Child, '_id' | 'userId'>>
): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<Child>(COLLECTION_NAME).updateOne(
    { _id: objectId },
    { $set: updates }
  );
  
  return result.modifiedCount > 0;
}

export async function deleteChild(id: string | ObjectId): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<Child>(COLLECTION_NAME).deleteOne({ _id: objectId });
  
  return result.deletedCount > 0;
}
