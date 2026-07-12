import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// GET - Get events calendar
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const centerId = searchParams.get('centerId');
    const classroomId = searchParams.get('classroomId');
    const month = searchParams.get('month');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const db = await getDatabase();
    const query: Record<string, unknown> = {};

    if (centerId) query.centerId = new ObjectId(centerId);
    if (classroomId) query.classroomIds = new ObjectId(classroomId);
    if (type) query.type = type;
    if (month) {
      const [year, m] = month.split('-').map(Number);
      const startDate = new Date(year, m - 1, 1);
      const endDate = new Date(year, m, 0, 23, 59, 59);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const total = await db.collection('event_calendar').countDocuments(query);
    const events = await db.collection('event_calendar')
      .find(query)
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      events,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST - Create event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { centerId, title, description, date, endDate, time, location, type, classroomIds, rsvpRequired, createdBy } = body;

    if (!centerId || !title || !date || !type || !createdBy) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDatabase();

    const event = {
      centerId: new ObjectId(centerId),
      title,
      description,
      date: new Date(date),
      endDate: endDate ? new Date(endDate) : undefined,
      time,
      location,
      type,
      classroomIds: classroomIds ? classroomIds.map((id: string) => new ObjectId(id)) : [],
      rsvpRequired: rsvpRequired || false,
      rsvps: [],
      createdBy: new ObjectId(createdBy),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('event_calendar').insertOne(event);

    return NextResponse.json({
      message: 'Event created',
      eventId: result.insertedId
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

// PUT - Update event, RSVP
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, action: eventAction, parentId, response, ...updates } = body;

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID required' }, { status: 400 });
    }

    const db = await getDatabase();

    if (eventAction === 'rsvp' && parentId && response) {
      await db.collection('event_calendar').updateOne(
        { _id: new ObjectId(eventId) },
        {
          $push: {
            rsvps: { parentId: new ObjectId(parentId), response, respondedAt: new Date() }
          } as Record<string, unknown>
        }
      );
      return NextResponse.json({ message: 'RSVP recorded' });
    }

    const result = await db.collection('event_calendar').updateOne(
      { _id: new ObjectId(eventId) },
      { $set: { ...updates, updatedAt: new Date() } }
    );

    return NextResponse.json({ message: 'Event updated', modified: result.modifiedCount > 0 });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}
