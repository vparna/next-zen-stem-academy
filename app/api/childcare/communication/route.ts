import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// GET - Get messages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const childId = searchParams.get('childId');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const db = await getDatabase();
    const query: Record<string, unknown> = {};

    if (userId) {
      query.$or = [
        { senderId: new ObjectId(userId) },
        { receiverId: new ObjectId(userId) }
      ];
    }
    if (childId) query.childId = new ObjectId(childId);
    if (type) query.type = type;

    const total = await db.collection('parent_messages').countDocuments(query);
    const messages = await db.collection('parent_messages')
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      messages,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// POST - Send message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { senderId, receiverId, childId, classroomId, centerId, content, type, attachments } = body;

    if (!senderId || !content || !centerId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDatabase();

    const message = {
      senderId: new ObjectId(senderId),
      receiverId: receiverId ? new ObjectId(receiverId) : undefined,
      childId: childId ? new ObjectId(childId) : undefined,
      classroomId: classroomId ? new ObjectId(classroomId) : undefined,
      centerId: new ObjectId(centerId),
      content,
      type: type || 'direct',
      attachments: attachments || [],
      read: false,
      createdAt: new Date()
    };

    const result = await db.collection('parent_messages').insertOne(message);

    return NextResponse.json({
      message: 'Message sent',
      messageId: result.insertedId
    }, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

// PUT - Mark messages as read
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { messageIds, userId } = body;

    if (!messageIds || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDatabase();

    const result = await db.collection('parent_messages').updateMany(
      { 
        _id: { $in: messageIds.map((id: string) => new ObjectId(id)) },
        receiverId: new ObjectId(userId)
      },
      { $set: { read: true, readAt: new Date() } }
    );

    return NextResponse.json({ message: 'Messages marked as read', modified: result.modifiedCount });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return NextResponse.json({ error: 'Failed to update messages' }, { status: 500 });
  }
}
