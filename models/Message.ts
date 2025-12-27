import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Message } from '@/types';

const COLLECTION_NAME = 'messages';

export async function createMessage(messageData: Omit<Message, '_id'>): Promise<ObjectId> {
  const db = await getDatabase();
  
  const result = await db.collection<Message>(COLLECTION_NAME).insertOne(messageData);
  
  return result.insertedId;
}

export async function getMessageById(id: string | ObjectId): Promise<Message | null> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return db.collection<Message>(COLLECTION_NAME).findOne({ _id: objectId });
}

export async function getMessagesByCourse(
  courseId: string | ObjectId,
  limit: number = 100
): Promise<Message[]> {
  const db = await getDatabase();
  const objectId = typeof courseId === 'string' ? new ObjectId(courseId) : courseId;
  return db.collection<Message>(COLLECTION_NAME)
    .find({ courseId: objectId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
}

export async function getConversationMessages(
  senderId: string | ObjectId,
  receiverId: string | ObjectId,
  limit: number = 100
): Promise<Message[]> {
  const db = await getDatabase();
  const senderObjId = typeof senderId === 'string' ? new ObjectId(senderId) : senderId;
  const receiverObjId = typeof receiverId === 'string' ? new ObjectId(receiverId) : receiverId;
  
  return db.collection<Message>(COLLECTION_NAME)
    .find({
      $or: [
        { senderId: senderObjId, receiverId: receiverObjId },
        { senderId: receiverObjId, receiverId: senderObjId }
      ]
    })
    .sort({ createdAt: 1 })
    .limit(limit)
    .toArray();
}

export async function markMessageAsRead(id: string | ObjectId): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<Message>(COLLECTION_NAME).updateOne(
    { _id: objectId },
    { $set: { read: true, readAt: new Date() } }
  );
  
  return result.modifiedCount > 0;
}

export async function getUnreadMessageCount(userId: string | ObjectId): Promise<number> {
  const db = await getDatabase();
  const objectId = typeof userId === 'string' ? new ObjectId(userId) : userId;
  
  return db.collection<Message>(COLLECTION_NAME).countDocuments({
    receiverId: objectId,
    read: false
  });
}
