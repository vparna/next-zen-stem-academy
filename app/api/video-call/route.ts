import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

interface VideoCallRequest {
  participantId: string;
  courseId?: string;
  scheduledTime?: string;
  duration?: number;
}

// POST - Create a video call session
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

    const body: VideoCallRequest = await request.json();
    const { participantId, courseId, scheduledTime, duration = 60 } = body;

    if (!participantId) {
      return NextResponse.json(
        { error: 'participantId is required' },
        { status: 400 }
      );
    }

    // Generate unique room name
    const roomName = `room-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const sessionId = new ObjectId();

    // Create video call record
    const db = await getDatabase();
    const videoCall = {
      _id: sessionId,
      hostId: new ObjectId(decoded.userId),
      participantId: new ObjectId(participantId),
      courseId: courseId ? new ObjectId(courseId) : undefined,
      roomName,
      scheduledTime: scheduledTime ? new Date(scheduledTime) : new Date(),
      duration,
      status: scheduledTime ? 'scheduled' : 'pending',
      meetingLink: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/video-call/${roomName}`,
      createdAt: new Date(),
    };

    await db.collection('video_calls').insertOne(videoCall);

    // Send notification to participant
    await db.collection('messages').insertOne({
      senderId: new ObjectId(decoded.userId),
      receiverId: new ObjectId(participantId),
      courseId: courseId ? new ObjectId(courseId) : undefined,
      content: `Video call invitation: ${videoCall.meetingLink}`,
      messageType: 'video-call',
      read: false,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      sessionId: sessionId.toString(),
      roomName,
      meetingLink: videoCall.meetingLink,
      scheduledTime: videoCall.scheduledTime,
    }, { status: 201 });
  } catch (error) {
    console.error('Video call creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get video call sessions
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
    const status = searchParams.get('status');
    const sessionId = searchParams.get('sessionId');

    const db = await getDatabase();
    const userId = new ObjectId(decoded.userId);

    // Get specific session
    if (sessionId) {
      const session = await db.collection('video_calls').findOne({
        _id: new ObjectId(sessionId),
        $or: [
          { hostId: userId },
          { participantId: userId },
        ],
      });

      if (!session) {
        return NextResponse.json(
          { error: 'Video call session not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(session);
    }

    // Get all sessions for user
    const filter: any = {
      $or: [
        { hostId: userId },
        { participantId: userId },
      ],
    };

    if (status) {
      filter.status = status;
    }

    const sessions = await db.collection('video_calls')
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Get video calls error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Update video call status
export async function PATCH(request: NextRequest) {
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
    const { sessionId, status } = body;

    if (!sessionId || !status) {
      return NextResponse.json(
        { error: 'sessionId and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'scheduled', 'active', 'ended', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const userId = new ObjectId(decoded.userId);

    // Update session
    const result = await db.collection('video_calls').updateOne(
      {
        _id: new ObjectId(sessionId),
        $or: [
          { hostId: userId },
          { participantId: userId },
        ],
      },
      {
        $set: {
          status,
          ...(status === 'active' ? { startedAt: new Date() } : {}),
          ...(status === 'ended' ? { endedAt: new Date() } : {}),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Video call session not found or unauthorized' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Video call status updated to ${status}`,
    });
  } catch (error) {
    console.error('Update video call error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
