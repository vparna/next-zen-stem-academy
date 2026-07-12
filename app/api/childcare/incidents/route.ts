import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// GET - Get incident reports
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('childId');
    const centerId = searchParams.get('centerId');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const db = await getDatabase();
    const query: Record<string, unknown> = {};

    if (childId) query.childId = new ObjectId(childId);
    if (centerId) query.centerId = new ObjectId(centerId);
    if (type) query.type = type;

    const total = await db.collection('incident_reports').countDocuments(query);
    const reports = await db.collection('incident_reports')
      .find(query)
      .sort({ incidentDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      reports,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Error fetching incident reports:', error);
    return NextResponse.json({ error: 'Failed to fetch incident reports' }, { status: 500 });
  }
}

// POST - Create incident report
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { childId, classroomId, centerId, reportedBy, type, severity, description, actionTaken, firstAidGiven, bodyPartAffected, photos } = body;

    if (!childId || !classroomId || !centerId || !reportedBy || !type || !description || !actionTaken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDatabase();

    const report = {
      childId: new ObjectId(childId),
      classroomId: new ObjectId(classroomId),
      centerId: new ObjectId(centerId),
      reportedBy: new ObjectId(reportedBy),
      incidentDate: new Date(),
      incidentTime: new Date(),
      type,
      severity: severity || 'minor',
      description,
      actionTaken,
      firstAidGiven,
      bodyPartAffected,
      parentNotified: false,
      followUpRequired: severity !== 'minor',
      photos: photos || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('incident_reports').insertOne(report);

    return NextResponse.json({
      message: 'Incident report created',
      reportId: result.insertedId,
      report: { ...report, _id: result.insertedId }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating incident report:', error);
    return NextResponse.json({ error: 'Failed to create incident report' }, { status: 500 });
  }
}

// PUT - Update incident report (parent notification, director review, etc.)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { reportId, ...updates } = body;

    if (!reportId) {
      return NextResponse.json({ error: 'Report ID required' }, { status: 400 });
    }

    const db = await getDatabase();

    if (updates.parentNotified) {
      updates.parentNotifiedAt = new Date();
    }
    if (updates.directorReview) {
      updates.directorReviewDate = new Date();
    }

    const result = await db.collection('incident_reports').updateOne(
      { _id: new ObjectId(reportId) },
      { $set: { ...updates, updatedAt: new Date() } }
    );

    return NextResponse.json({ message: 'Incident report updated', modified: result.modifiedCount > 0 });
  } catch (error) {
    console.error('Error updating incident report:', error);
    return NextResponse.json({ error: 'Failed to update incident report' }, { status: 500 });
  }
}
