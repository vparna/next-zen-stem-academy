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
const isValidEmail = (value: string) => {
  const trimmed = value.trim();
  const atIndex = trimmed.indexOf('@');
  const lastAtIndex = trimmed.lastIndexOf('@');
  const dotIndex = trimmed.lastIndexOf('.');

  return atIndex > 0 && atIndex === lastAtIndex && dotIndex > atIndex + 1 && dotIndex < trimmed.length - 1;
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

export async function GET() {
  try {
    const db = await getDatabase();
    const now = new Date();

    const slots = await db
      .collection<TourSlotRecord>(COLLECTION_NAME)
      .find({ status: 'available', startAt: { $gte: now } })
      .sort({ startAt: 1 })
      .toArray();

    return NextResponse.json({
      slots: slots.map((slot) => ({
        id: slot._id?.toString(),
        startAt: slot.startAt.toISOString(),
        endAt: slot.endAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Error loading tour slots:', error);
    return NextResponse.json({ error: 'Failed to load tour slots' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { slotId, parentName, parentEmail, parentPhone, childAges } = await request.json();

    if (!slotId || !parentName || !parentEmail || !parentPhone || !childAges) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!ObjectId.isValid(slotId)) {
      return NextResponse.json({ error: 'Invalid slot selection' }, { status: 400 });
    }

    if (!isValidEmail(parentEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const db = await getDatabase();
    const now = new Date();

    const booking = await db.collection<TourSlotRecord>(COLLECTION_NAME).findOneAndUpdate(
      {
        _id: new ObjectId(slotId),
        status: 'available',
        startAt: { $gte: now },
      },
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

    if (!booking) {
      return NextResponse.json({ error: 'This slot is no longer available. Please choose another time.' }, { status: 409 });
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
