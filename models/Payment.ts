import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Payment } from '@/types';

const COLLECTION_NAME = 'payments';

export async function createPayment(paymentData: Omit<Payment, '_id'>): Promise<ObjectId> {
  const db = await getDatabase();
  
  const result = await db.collection<Payment>(COLLECTION_NAME).insertOne(paymentData);
  
  return result.insertedId;
}

export async function getPaymentById(id: string | ObjectId): Promise<Payment | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<Payment>(COLLECTION_NAME).findOne({ _id: objectId });
}

export async function getPaymentsByUserId(userId: string | ObjectId): Promise<Payment[]> {
  const db = await getDatabase();
  const objectId = typeof userId === 'string' ? new ObjectId(userId) : userId;
  return db.collection<Payment>(COLLECTION_NAME).find({ userId: objectId }).sort({ createdAt: -1 }).toArray();
}

export async function getAllPayments(): Promise<Payment[]> {
  const db = await getDatabase();
  return db.collection<Payment>(COLLECTION_NAME).find({}).sort({ createdAt: -1 }).toArray();
}

export async function updatePayment(
  id: string | ObjectId,
  updates: Partial<Omit<Payment, '_id'>>
): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<Payment>(COLLECTION_NAME).updateOne(
    { _id: objectId },
    { $set: { ...updates, updatedAt: new Date() } }
  );
  
  return result.modifiedCount > 0;
}
