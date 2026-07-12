import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// GET - Get compliance logs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const centerId = searchParams.get('centerId');
    const type = searchParams.get('type');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const db = await getDatabase();
    const query: Record<string, unknown> = {};

    if (centerId) query.centerId = new ObjectId(centerId);
    if (type) query.type = type;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) (query.date as Record<string, Date>).$gte = new Date(startDate);
      if (endDate) (query.date as Record<string, Date>).$lte = new Date(endDate);
    }

    const total = await db.collection('compliance_logs').countDocuments(query);
    const logs = await db.collection('compliance_logs')
      .find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      logs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Error fetching compliance logs:', error);
    return NextResponse.json({ error: 'Failed to fetch compliance logs' }, { status: 500 });
  }
}

// POST - Create compliance log entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { centerId, type, details, completedBy } = body;

    if (!centerId || !type || !completedBy) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const validTypes = ['attendance', 'ratio', 'food_program', 'incident', 'medication', 'immunization', 'health_check', 'emergency_contact', 'safe_sleep', 'room_checklist', 'fire_drill', 'visitor'];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: 'Invalid compliance log type' }, { status: 400 });
    }

    const db = await getDatabase();

    const log = {
      centerId: new ObjectId(centerId),
      type,
      date: new Date(),
      details: details || {},
      completedBy: new ObjectId(completedBy),
      verified: false,
      createdAt: new Date()
    };

    const result = await db.collection('compliance_logs').insertOne(log);

    return NextResponse.json({
      message: 'Compliance log created',
      logId: result.insertedId
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating compliance log:', error);
    return NextResponse.json({ error: 'Failed to create compliance log' }, { status: 500 });
  }
}

// PUT - Verify compliance log
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { logId, verifiedBy } = body;

    if (!logId || !verifiedBy) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDatabase();

    const result = await db.collection('compliance_logs').updateOne(
      { _id: new ObjectId(logId) },
      { $set: { verified: true, verifiedBy: new ObjectId(verifiedBy), verifiedAt: new Date() } }
    );

    return NextResponse.json({ message: 'Compliance log verified', modified: result.modifiedCount > 0 });
  } catch (error) {
    console.error('Error verifying compliance log:', error);
    return NextResponse.json({ error: 'Failed to verify compliance log' }, { status: 500 });
  }
}
