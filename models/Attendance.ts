import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Attendance } from '@/types';

const COLLECTION_NAME = 'attendances';

export async function createAttendance(attendanceData: Omit<Attendance, '_id'>): Promise<ObjectId> {
  const db = await getDatabase();
  
  const result = await db.collection<Attendance>(COLLECTION_NAME).insertOne(attendanceData);
  
  return result.insertedId;
}

export async function getAttendanceById(id: string | ObjectId): Promise<Attendance | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<Attendance>(COLLECTION_NAME).findOne({ _id: objectId });
}

export async function getAttendancesByChildId(childId: string | ObjectId): Promise<Attendance[]> {
  const db = await getDatabase();
  const objectId = typeof childId === 'string' ? new ObjectId(childId) : childId;
  return db.collection<Attendance>(COLLECTION_NAME)
    .find({ childId: objectId })
    .sort({ checkInTime: -1 })
    .toArray();
}

export async function getAttendancesByDate(date: Date): Promise<Attendance[]> {
  const db = await getDatabase();
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return db.collection<Attendance>(COLLECTION_NAME)
    .find({ 
      checkInTime: { 
        $gte: startOfDay, 
        $lte: endOfDay 
      } 
    })
    .sort({ checkInTime: -1 })
    .toArray();
}

export async function updateAttendance(
  id: string | ObjectId,
  updates: Partial<Omit<Attendance, '_id'>>
): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<Attendance>(COLLECTION_NAME).updateOne(
    { _id: objectId },
    { $set: updates }
  );
  
  return result.modifiedCount > 0;
}

export async function checkOut(
  id: string | ObjectId,
  checkOutTime: Date,
  teacherId: ObjectId,
  location?: { latitude: number; longitude: number; accuracy: number },
  photoUrl?: string
): Promise<boolean> {
  const updates: Partial<Omit<Attendance, '_id'>> = {
    checkOutTime,
    checkOutTeacherId: teacherId,
    status: 'completed'
  };
  
  if (location) {
    updates.checkOutLocation = location;
  }
  
  if (photoUrl) {
    updates.checkOutPhotoUrl = photoUrl;
  }
  
  return updateAttendance(id, updates);
}

export async function getActiveAttendances(): Promise<Attendance[]> {
  const db = await getDatabase();
  return db.collection<Attendance>(COLLECTION_NAME)
    .find({ status: 'checked-in' })
    .sort({ checkInTime: -1 })
    .toArray();
}
