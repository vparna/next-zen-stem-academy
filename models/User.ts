import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { User } from '@/types';

const COLLECTION_NAME = 'users';

export async function createUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<ObjectId> {
  const db = await getDatabase();
  const now = new Date();
  
  const result = await db.collection<User>(COLLECTION_NAME).insertOne({
    ...userData,
    createdAt: now,
    updatedAt: now,
  });
  
  return result.insertedId;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const db = await getDatabase();
  return db.collection<User>(COLLECTION_NAME).findOne({ email });
}

export async function findUserById(id: string | ObjectId): Promise<User | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<User>(COLLECTION_NAME).findOne({ _id: objectId });
}

export async function updateUser(
  id: string | ObjectId,
  updates: Partial<Omit<User, '_id' | 'createdAt'>>
): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<User>(COLLECTION_NAME).updateOne(
    { _id: objectId },
    { $set: { ...updates, updatedAt: new Date() } }
  );
  
  return result.modifiedCount > 0;
}
