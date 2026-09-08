import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { sendEmail } from '@/lib/email/service';

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
const SLOT_DURATION_MINUTES = 30;
const SLOT_START_HOUR = 10;
const SLOT_END_HOUR = 14;
const DEFAULT_NEAREST_LIMIT = 5;
const MAX_SEARCH_DAYS = 365;

const isValidEmail = (value: string) => {
  const trimmed = value.trim();
  const atIndex = trimmed.indexOf('@');
  const lastAtIndex = trimmed.lastIndexOf('@');
  const dotIndex = trimmed.lastIndexOf('.');

  return atIndex > 0 && atIndex === lastAtIndex && dotIndex > atIndex + 1 && dotIndex < trimmed.length - 1;
};

const getTimeZoneParts = (date: Date, timeZone: string) =>
  Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value])
  );

const getTimeZoneOffset = (date: Date, timeZone: string) => {
  const values = getTimeZoneParts(date, timeZone);
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

const getCampusDateString = (date: Date) => {
  const parts = getTimeZoneParts(date, CAMPUS_TIME_ZONE);
  return `${parts.year}-${parts.month}-${parts.day}`;
};

const getTomorrowCampusDateString = () => {
  const now = new Date();
  const todayCampus = getCampusDateString(now);
  const tomorrowUtc = new Date(`${todayCampus}T00:00:00Z`);
  tomorrowUtc.setUTCDate(tomorrowUtc.getUTCDate() + 1);
  return tomorrowUtc.toISOString().slice(0, 10);
};

const toSlotId = (startAt: Date) => startAt.toISOString();

const parseSlotId = (slotId: string) => {
  const parsed = new Date(slotId);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const getDailySlots = (date: string) => {
  const slots: { startAt: Date; endAt: Date }[] = [];
  for (let hour = SLOT_START_HOUR; hour < SLOT_END_HOUR; hour += 1) {
    for (const minute of [0, 30]) {
      const startAt = createCampusDate(date, `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
      const endAt = new Date(startAt.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
      slots.push({ startAt, endAt });
    }
  }
  return slots;
};

const isValidCampusDateInput = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

const isBookableSlot = (startAt: Date) => {
  const campusParts = getTimeZoneParts(startAt, CAMPUS_TIME_ZONE);
  const slotDate = `${campusParts.year}-${campusParts.month}-${campusParts.day}`;
  const tomorrow = getTomorrowCampusDateString();
  const hour = Number(campusParts.hour);
  const minute = Number(campusParts.minute);
  const minuteOfDay = hour * 60 + minute;
  const startMinute = SLOT_START_HOUR * 60;
  const endMinute = SLOT_END_HOUR * 60;
  return slotDate >= tomorrow && minuteOfDay >= startMinute && minuteOfDay < endMinute && minute % SLOT_DURATION_MINUTES === 0;
};

const formatSlotLabel = (startAt: Date, endAt: Date) => {
  const date = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: CAMPUS_TIME_ZONE,
  }).format(startAt);

  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: CAMPUS_TIME_ZONE,
  });

  return `${date} from ${time.format(startAt)} to ${time.format(endAt)} PT`;
};

const buildParentEmail = (parentName: string, childAges: string, slotLabel: string) => ({
  subject: 'Your NextZen Academy Campus Tour is Confirmed',
  html: `
    <h2>Campus Tour Confirmed</h2>
    <p>Hi ${parentName},</p>
    <p>Your daycare/preschool campus tour has been scheduled for <strong>${slotLabel}</strong>.</p>
    <p><strong>Kid age(s):</strong> ${childAges}</p>
    <p>If you need to make a change, please reply to this email or contact us at info@nextzenacademy.com.</p>
    <p>Best regards,<br />NextZen Academy</p>
  `,
  text: `Campus Tour Confirmed

Hi ${parentName},

Your daycare/preschool campus tour has been scheduled for ${slotLabel}.
Kid age(s): ${childAges}

If you need to make a change, please reply to this email or contact us at info@nextzenacademy.com.

Best regards,
NextZen Academy`,
});

const buildAdminEmail = (parentName: string, parentEmail: string, parentPhone: string, childAges: string, slotLabel: string) => ({
  subject: 'New Campus Tour Booking',
  html: `
    <h2>New Campus Tour Booking</h2>
    <p><strong>Tour slot:</strong> ${slotLabel}</p>
    <p><strong>Parent name:</strong> ${parentName}</p>
    <p><strong>Email:</strong> ${parentEmail}</p>
    <p><strong>Phone:</strong> ${parentPhone}</p>
    <p><strong>Kid age(s):</strong> ${childAges}</p>
  `,
  text: `New Campus Tour Booking

Tour slot: ${slotLabel}
Parent name: ${parentName}
Email: ${parentEmail}
Phone: ${parentPhone}
Kid age(s): ${childAges}`,
});

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const { searchParams } = new URL(request.url);
    const selectedDate = searchParams.get('date');
    const tomorrow = getTomorrowCampusDateString();
    const bookedCollection = db.collection<TourSlotRecord>(COLLECTION_NAME);

    if (selectedDate) {
      if (!isValidCampusDateInput(selectedDate)) {
        return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
      }

      if (selectedDate < tomorrow) {
        return NextResponse.json({ slots: [], selectedDate, mode: 'selected-date' });
      }

      const dayStart = createCampusDate(selectedDate, '00:00');
      const dayEnd = createCampusDate(selectedDate, '23:59');
      const booked = await bookedCollection
        .find({ status: 'booked', startAt: { $gte: dayStart, $lte: dayEnd } })
        .project({ startAt: 1 })
        .toArray();
      const bookedSet = new Set(booked.map((slot) => slot.startAt.toISOString()));
      const slots = getDailySlots(selectedDate)
        .filter((slot) => !bookedSet.has(slot.startAt.toISOString()))
        .map((slot) => ({
          id: toSlotId(slot.startAt),
          startAt: slot.startAt.toISOString(),
          endAt: slot.endAt.toISOString(),
        }));

      return NextResponse.json({ slots, selectedDate, mode: 'selected-date' });
    }

    const nearestSlots: { id: string; startAt: string; endAt: string }[] = [];
    const baseDate = new Date(`${tomorrow}T00:00:00Z`);
    let dayOffset = 0;

    while (nearestSlots.length < DEFAULT_NEAREST_LIMIT && dayOffset < MAX_SEARCH_DAYS) {
      const dayUtc = new Date(baseDate);
      dayUtc.setUTCDate(dayUtc.getUTCDate() + dayOffset);
      const dayDate = dayUtc.toISOString().slice(0, 10);
      const dayStart = createCampusDate(dayDate, '00:00');
      const dayEnd = createCampusDate(dayDate, '23:59');

      const booked = await bookedCollection
        .find({ status: 'booked', startAt: { $gte: dayStart, $lte: dayEnd } })
        .project({ startAt: 1 })
        .toArray();
      const bookedSet = new Set(booked.map((slot) => slot.startAt.toISOString()));

      const openSlots = getDailySlots(dayDate)
        .filter((slot) => !bookedSet.has(slot.startAt.toISOString()))
        .map((slot) => ({
          id: toSlotId(slot.startAt),
          startAt: slot.startAt.toISOString(),
          endAt: slot.endAt.toISOString(),
        }));

      nearestSlots.push(...openSlots);
      dayOffset += 1;
    }

    return NextResponse.json({
      slots: nearestSlots.slice(0, DEFAULT_NEAREST_LIMIT),
      selectedDate: null,
      mode: 'nearest',
    });
  } catch (error) {
    console.error('Error loading tour slots:', error);
    return NextResponse.json({ error: 'Failed to load tour slots' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { slotId, slotStartAt, parentName, parentEmail, parentPhone, childAges } = await request.json();
    const submittedSlot = (typeof slotStartAt === 'string' && slotStartAt) || (typeof slotId === 'string' && slotId) || '';

    if (!submittedSlot || !parentName || !parentEmail || !parentPhone || !childAges) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    if (!isValidEmail(parentEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const startAt = parseSlotId(submittedSlot);
    if (!startAt || !isBookableSlot(startAt)) {
      return NextResponse.json({ error: 'Invalid slot selection' }, { status: 400 });
    }

    const endAt = new Date(startAt.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
    const db = await getDatabase();
    const now = new Date();
    const collection = db.collection<TourSlotRecord>(COLLECTION_NAME);
    const existingSlot = await collection.findOne({ startAt, endAt });
    let booking: TourSlotRecord | null = null;

    if (existingSlot) {
      if (existingSlot.status === 'booked') {
        return NextResponse.json({ error: 'This slot is no longer available. Please choose another time.' }, { status: 409 });
      }

      const updateResult = await collection.findOneAndUpdate(
        { _id: existingSlot._id, status: 'available' },
        {
          $set: {
            status: 'booked',
            bookedAt: now,
            bookedBy: {
              parentName: parentName.trim(),
              parentEmail: parentEmail.trim(),
              parentPhone: parentPhone.trim(),
              childAges: childAges.trim(),
            },
          },
        },
        { returnDocument: 'after' }
      );

      if (!updateResult) {
        return NextResponse.json({ error: 'This slot is no longer available. Please choose another time.' }, { status: 409 });
      }

      booking = updateResult;
    } else {
      const inserted = await collection.insertOne({
        startAt,
        endAt,
        status: 'booked',
        createdAt: now,
        bookedAt: now,
        bookedBy: {
          parentName: parentName.trim(),
          parentEmail: parentEmail.trim(),
          parentPhone: parentPhone.trim(),
          childAges: childAges.trim(),
        },
      });

      booking = {
        _id: inserted.insertedId,
        startAt,
        endAt,
        status: 'booked',
        createdAt: now,
        bookedAt: now,
        bookedBy: {
          parentName: parentName.trim(),
          parentEmail: parentEmail.trim(),
          parentPhone: parentPhone.trim(),
          childAges: childAges.trim(),
        },
      };
    }

    const slotLabel = formatSlotLabel(booking.startAt, booking.endAt);

    await db.collection('interests').insertOne({
      name: parentName.trim(),
      email: parentEmail.trim(),
      phone: parentPhone.trim(),
      course: 'Daycare / Preschool Tour',
      childName: null,
      childAge: null,
      message: `Kid age(s): ${childAges.trim()}
Tour slot: ${slotLabel}`,
      status: 'scheduled',
      source: 'campus-tour',
      tourSlotId: booking._id,
      createdAt: now,
    });

    const adminEmail = process.env.TOUR_NOTIFICATION_EMAIL || 'info@nextzenacademy.com';
    const parentTemplate = buildParentEmail(parentName.trim(), childAges.trim(), slotLabel);
    const adminTemplate = buildAdminEmail(parentName.trim(), parentEmail.trim(), parentPhone.trim(), childAges.trim(), slotLabel);

    const emailResults = await Promise.allSettled([
      sendEmail(parentEmail.trim(), parentTemplate),
      sendEmail(adminEmail, adminTemplate),
    ]);

    const emailFailures = emailResults.filter((result) => result.status === 'rejected');

    return NextResponse.json({
      success: true,
      slotId: booking._id?.toString(),
      slotLabel,
      emailSent: emailFailures.length === 0,
      emailWarning: emailFailures.length ? 'Tour booked, but one or more confirmation emails could not be delivered.' : null,
    }, { status: 201 });
  } catch (error) {
    console.error('Error scheduling campus tour:', error);
    return NextResponse.json({ error: 'Failed to schedule campus tour' }, { status: 500 });
  }
}
