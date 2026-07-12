import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// GET - Get daily activity reports
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('childId');
    const classroomId = searchParams.get('classroomId');
    const date = searchParams.get('date');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const db = await getDatabase();
    const query: Record<string, unknown> = {};

    if (childId) query.childId = new ObjectId(childId);
    if (classroomId) query.classroomId = new ObjectId(classroomId);
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    const total = await db.collection('daily_activity_reports').countDocuments(query);
    const reports = await db.collection('daily_activity_reports')
      .find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      reports,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Error fetching daily reports:', error);
    return NextResponse.json({ error: 'Failed to fetch daily reports' }, { status: 500 });
  }
}

// POST - Create daily activity report
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { childId, classroomId, teacherId, meals, naps, bathroomLogs, activities, mood, photos, videos, teacherNotes } = body;

    if (!childId || !classroomId || !teacherId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDatabase();

    const report = {
      childId: new ObjectId(childId),
      classroomId: new ObjectId(classroomId),
      teacherId: new ObjectId(teacherId),
      date: new Date(),
      meals: meals || [],
      naps: naps || [],
      bathroomLogs: bathroomLogs || [],
      activities: activities || [],
      mood: mood || 'happy',
      photos: photos || [],
      videos: videos || [],
      teacherNotes,
      sentToParent: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('daily_activity_reports').insertOne(report);

    return NextResponse.json({
      message: 'Daily report created',
      reportId: result.insertedId,
      report: { ...report, _id: result.insertedId }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating daily report:', error);
    return NextResponse.json({ error: 'Failed to create daily report' }, { status: 500 });
  }
}

// PUT - Update daily activity report
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { reportId, ...updates } = body;

    if (!reportId) {
      return NextResponse.json({ error: 'Report ID required' }, { status: 400 });
    }

    const db = await getDatabase();

    const result = await db.collection('daily_activity_reports').updateOne(
      { _id: new ObjectId(reportId) },
      { $set: { ...updates, updatedAt: new Date() } }
    );

    return NextResponse.json({ message: 'Report updated', modified: result.modifiedCount > 0 });
  } catch (error) {
    console.error('Error updating daily report:', error);
    return NextResponse.json({ error: 'Failed to update daily report' }, { status: 500 });
  }
}
