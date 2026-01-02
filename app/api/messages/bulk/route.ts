import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// POST - Send bulk message to multiple recipients
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { content, recipientIds, courseId } = body;

    if (!content || !recipientIds || !Array.isArray(recipientIds)) {
      return NextResponse.json(
        { error: 'Content and recipientIds array are required' },
        { status: 400 }
      );
    }

    if (recipientIds.length === 0) {
      return NextResponse.json(
        { error: 'At least one recipient is required' },
        { status: 400 }
      );
    }

    if (recipientIds.length > 100) {
      return NextResponse.json(
        { error: 'Cannot send to more than 100 recipients at once' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const senderId = new ObjectId(decoded.userId);
    const now = new Date();

    // Create message documents for each recipient
    const messages = recipientIds.map(recipientId => ({
      senderId,
      receiverId: new ObjectId(recipientId),
      courseId: courseId ? new ObjectId(courseId) : undefined,
      content,
      read: false,
      createdAt: now,
    }));

    // Insert all messages
    const result = await db.collection('messages').insertMany(messages);

    return NextResponse.json(
      {
        success: true,
        messagesSent: result.insertedCount,
        recipientCount: recipientIds.length,
        message: `Bulk message sent to ${result.insertedCount} recipients`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Bulk message error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
