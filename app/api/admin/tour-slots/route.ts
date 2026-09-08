import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { withAdminAuth } from '@/middleware/adminAuth';

interface TourSlotRecord {
  _id?: ObjectId;
  startAt: Date;
  endAt: Date;
  status: 'available' | 'booked';
  createdAt: Date;
  bookedAt?: Date;
  bookedBy?: {
    parentName: string;
    parentEmail: string;
    parentPhone: string;
    childAges: string;
  };
}

const COLLECTION_NAME = 'tour_slots';
const CAMPUS_TIME_ZONE = 'America/Los_Angeles';

const getTimeZoneOffset = (date: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second)
  );

  return asUtc - date.getTime();
};

const createCampusDate = (date: string, time: string) => {
  const utcGuess = new Date(`${date}T${time}:00Z`);
  const offset = getTimeZoneOffset(utcGuess, CAMPUS_TIME_ZONE);
  return new Date(utcGuess.getTime() - offset);
};

async function getHandler() {
  try {
    const db = await getDatabase();
    const slots = await db
      .collection<TourSlotRecord>(COLLECTION_NAME)
      .find({ startAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } })
      .sort({ startAt: 1 })
      .toArray();

    return NextResponse.json({
      slots: slots.map((slot) => ({
        id: slot._id?.toString(),
        startAt: slot.startAt.toISOString(),
        endAt: slot.endAt.toISOString(),
        status: slot.status,
        createdAt: slot.createdAt.toISOString(),
        bookedAt: slot.bookedAt?.toISOString() || null,
        bookedBy: slot.bookedBy || null,
      })),
    });
  } catch (error) {
    console.error('Error fetching admin tour slots:', error);
    return NextResponse.json({ error: 'Failed to fetch tour slots' }, { status: 500 });
  }
}

async function postHandler(request: NextRequest) {
  try {
    const { date, time } = await request.json();

    if (!date || !time) {
      return NextResponse.json({ error: 'Date and time are required' }, { status: 400 });
    }

    const startAt = createCampusDate(date, time);
    if (Number.isNaN(startAt.getTime())) {
      return NextResponse.json({ error: 'Invalid date or time' }, { status: 400 });
    }

    if (startAt <= new Date()) {
      return NextResponse.json({ error: 'Tour slots must be scheduled in the future.' }, { status: 400 });
    }

    const endAt = new Date(startAt.getTime() + 30 * 60 * 1000);
    const db = await getDatabase();

    const overlapping = await db.collection<TourSlotRecord>(COLLECTION_NAME).findOne({
      startAt: { $lt: endAt },
      endAt: { $gt: startAt },
    });

    if (overlapping) {
      return NextResponse.json({ error: 'This 30-minute window overlaps an existing slot.' }, { status: 409 });
    }

    const result = await db.collection<TourSlotRecord>(COLLECTION_NAME).insertOne({
      startAt,
      endAt,
      status: 'available',
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId.toString() }, { status: 201 });
  } catch (error) {
    console.error('Error creating admin tour slot:', error);
    return NextResponse.json({ error: 'Failed to create tour slot' }, { status: 500 });
  }
}

async function deleteHandler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'A valid slot id is required' }, { status: 400 });
    }

    const db = await getDatabase();
    const slot = await db.collection<TourSlotRecord>(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });

    if (!slot) {
      return NextResponse.json({ error: 'Slot not found' }, { status: 404 });
    }

    if (slot.status === 'booked') {
      return NextResponse.json({ error: 'Booked slots cannot be deleted.' }, { status: 409 });
    }

    await db.collection<TourSlotRecord>(COLLECTION_NAME).deleteOne({ _id: slot._id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting admin tour slot:', error);
    return NextResponse.json({ error: 'Failed to delete tour slot' }, { status: 500 });
  }
}

export const GET = withAdminAuth(getHandler);
export const POST = withAdminAuth(postHandler);
export const DELETE = withAdminAuth(deleteHandler);
