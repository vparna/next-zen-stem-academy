import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// GET - List attendance records with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('childId');
    const classroomId = searchParams.get('classroomId');
    const date = searchParams.get('date');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const db = await getDatabase();
    const query: Record<string, unknown> = {};

    if (childId) query.childId = new ObjectId(childId);
    if (classroomId) query.classroomId = new ObjectId(classroomId);
    if (status) query.status = status;
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.checkInTime = { $gte: startOfDay, $lte: endOfDay };
    }

    const total = await db.collection('attendance_records').countDocuments(query);
    const records = await db.collection('attendance_records')
      .find(query)
      .sort({ checkInTime: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      records,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    return NextResponse.json({ error: 'Failed to fetch attendance records' }, { status: 500 });
  }
}

// POST - Create check-in record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { childId, parentId, classroomId, checkInMethod, checkInBy, checkInPhotoUrl, checkInLocation, notes } = body;

    if (!childId || !parentId || !classroomId || !checkInMethod || !checkInBy) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDatabase();

    // Check if child is already checked in
    const existingCheckin = await db.collection('attendance_records').findOne({
      childId: new ObjectId(childId),
      status: 'checked_in'
    });

    if (existingCheckin) {
      return NextResponse.json({ error: 'Child is already checked in' }, { status: 409 });
    }

    // Update classroom ratio
    await db.collection('classrooms').updateOne(
      { _id: new ObjectId(classroomId) },
      { $inc: { currentCount: 1 } }
    );

    const record = {
      childId: new ObjectId(childId),
      parentId: new ObjectId(parentId),
      classroomId: new ObjectId(classroomId),
      checkInTime: new Date(),
      checkInMethod,
      checkInBy: new ObjectId(checkInBy),
      checkInPhotoUrl,
      checkInLocation,
      status: 'checked_in',
      notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('attendance_records').insertOne(record);

    return NextResponse.json({ 
      message: 'Check-in successful', 
      recordId: result.insertedId,
      record: { ...record, _id: result.insertedId }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating attendance record:', error);
    return NextResponse.json({ error: 'Failed to create attendance record' }, { status: 500 });
  }
}

// PUT - Check-out or update attendance record
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { recordId, checkOutBy, checkOutMethod, checkOutPhotoUrl, checkOutLocation } = body;

    if (!recordId || !checkOutBy) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDatabase();
    const record = await db.collection('attendance_records').findOne({ _id: new ObjectId(recordId) });

    if (!record) {
      return NextResponse.json({ error: 'Attendance record not found' }, { status: 404 });
    }

    if (record.status === 'checked_out') {
      return NextResponse.json({ error: 'Child is already checked out' }, { status: 409 });
    }

    // Update classroom ratio
    await db.collection('classrooms').updateOne(
      { _id: record.classroomId },
      { $inc: { currentCount: -1 } }
    );

    const result = await db.collection('attendance_records').updateOne(
      { _id: new ObjectId(recordId) },
      {
        $set: {
          checkOutTime: new Date(),
          checkOutBy: new ObjectId(checkOutBy),
          checkOutMethod: checkOutMethod || 'manual',
          checkOutPhotoUrl,
          checkOutLocation,
          status: 'checked_out',
          updatedAt: new Date()
        }
      }
    );

    return NextResponse.json({ message: 'Check-out successful', modified: result.modifiedCount > 0 });
  } catch (error) {
    console.error('Error updating attendance record:', error);
    return NextResponse.json({ error: 'Failed to update attendance record' }, { status: 500 });
  }
}
