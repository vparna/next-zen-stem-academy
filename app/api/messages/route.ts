
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { createMessage, getMessagesByCourse, getConversationMessages, getUnreadMessageCount } from '@/models/Message';
import { ObjectId } from 'mongodb';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// POST - Send a message
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
    const { receiverId, content, courseId } = body;

    if (!receiverId || !content) {
      return NextResponse.json(
        { error: 'receiverId and content are required' },
        { status: 400 }
      );
    }

    if (content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message content cannot be empty' },
        { status: 400 }
      );
    }

    const messageId = await createMessage({
      senderId: new ObjectId(decoded.userId),
      receiverId: new ObjectId(receiverId),
      courseId: courseId ? new ObjectId(courseId) : undefined,
      content: content.trim(),
      read: false,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { 
        success: true, 
        messageId: messageId.toString(),
        message: 'Message sent successfully'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get messages
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const otherUserId = searchParams.get('otherUserId');
    const unreadCount = searchParams.get('unreadCount');

    // Get unread message count
    if (unreadCount === 'true') {
      const count = await getUnreadMessageCount(decoded.userId);
      return NextResponse.json({ unreadCount: count });
    }

    // Get conversation with specific user
    if (otherUserId) {
      const messages = await getConversationMessages(decoded.userId, otherUserId);
      return NextResponse.json(messages);
    }

    // Get messages by course
    if (courseId) {
      const messages = await getMessagesByCourse(courseId);
      return NextResponse.json(messages);
    }

    return NextResponse.json(
      { error: 'courseId, otherUserId, or unreadCount parameter is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
