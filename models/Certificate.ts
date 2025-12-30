import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Certificate } from '@/types';

const COLLECTION_NAME = 'certificates';

export async function createCertificate(certificateData: Omit<Certificate, '_id'>): Promise<ObjectId> {
  const db = await getDatabase();
  
  const result = await db.collection<Certificate>(COLLECTION_NAME).insertOne(certificateData);
  
  return result.insertedId;
}

export async function getCertificateById(id: string | ObjectId): Promise<Certificate | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<Certificate>(COLLECTION_NAME).findOne({ _id: objectId });
}

export async function getCertificateByEnrollment(enrollmentId: string | ObjectId): Promise<Certificate | null> {
  const db = await getDatabase();
  const objectId = typeof enrollmentId === 'string' ? new ObjectId(enrollmentId) : enrollmentId;
  return db.collection<Certificate>(COLLECTION_NAME).findOne({ enrollmentId: objectId });
}

export async function getCertificatesByUserId(userId: string | ObjectId): Promise<Certificate[]> {
  const db = await getDatabase();
  const objectId = typeof userId === 'string' ? new ObjectId(userId) : userId;
  return db.collection<Certificate>(COLLECTION_NAME).find({ userId: objectId }).toArray();
}

export async function generateCertificateNumber(): Promise<string> {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `CERT-${timestamp}-${random}`;
}
