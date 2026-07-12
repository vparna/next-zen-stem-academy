import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// GET - Get enrollment forms, waitlist, tours, leads
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const centerId = searchParams.get('centerId');
    const resource = searchParams.get('resource') || 'forms'; // forms, waitlist, tours, leads
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const db = await getDatabase();
    const query: Record<string, unknown> = {};

    if (centerId) query.centerId = new ObjectId(centerId);
    if (status) query.status = status;

    const collections: Record<string, string> = {
      forms: 'enrollment_forms',
      waitlist: 'waitlist_entries',
      tours: 'tour_schedules',
      leads: 'lead_tracking'
    };

    const collection = collections[resource] || 'enrollment_forms';
    const total = await db.collection(collection).countDocuments(query);
    const results = await db.collection(collection)
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      data: results,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Error fetching enrollment data:', error);
    return NextResponse.json({ error: 'Failed to fetch enrollment data' }, { status: 500 });
  }
}

// POST - Submit enrollment form, add to waitlist, schedule tour, create lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    const db = await getDatabase();

    switch (action) {
      case 'submit_enrollment': {
        const { centerId, parentInfo, secondaryParent, childInfo, emergencyContacts, authorizedPickups, medicalInfo, documents, programRequested, scheduleRequested, startDateRequested, digitalSignature } = body;

        if (!centerId || !parentInfo || !childInfo || !emergencyContacts) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const form = {
          centerId: new ObjectId(centerId),
          parentInfo,
          secondaryParent,
          childInfo: { ...childInfo, dateOfBirth: new Date(childInfo.dateOfBirth) },
          emergencyContacts,
          authorizedPickups: authorizedPickups || [],
          medicalInfo,
          documents: documents || [],
          programRequested,
          scheduleRequested,
          startDateRequested: new Date(startDateRequested),
          status: 'submitted',
          digitalSignature,
          signedAt: digitalSignature ? new Date() : undefined,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await db.collection('enrollment_forms').insertOne(form);
        return NextResponse.json({ message: 'Enrollment form submitted', formId: result.insertedId }, { status: 201 });
      }

      case 'add_to_waitlist': {
        const { centerId: wlCenterId, enrollmentFormId, childName, parentName, parentEmail, parentPhone, programRequested: wlProgram, requestedStartDate } = body;

        if (!wlCenterId || !childName || !parentName || !parentEmail) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Get current position
        const currentCount = await db.collection('waitlist_entries').countDocuments({
          centerId: new ObjectId(wlCenterId),
          status: 'waiting'
        });

        const entry = {
          centerId: new ObjectId(wlCenterId),
          enrollmentFormId: enrollmentFormId ? new ObjectId(enrollmentFormId) : undefined,
          childName,
          parentName,
          parentEmail,
          parentPhone,
          programRequested: wlProgram,
          requestedStartDate: new Date(requestedStartDate),
          priority: currentCount + 1,
          status: 'waiting',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await db.collection('waitlist_entries').insertOne(entry);
        return NextResponse.json({ message: 'Added to waitlist', position: currentCount + 1, entryId: result.insertedId }, { status: 201 });
      }

      case 'schedule_tour': {
        const { centerId: tourCenterId, parentName: tourParent, parentEmail: tourEmail, parentPhone: tourPhone, scheduledDate, scheduledTime } = body;

        if (!tourCenterId || !tourParent || !tourEmail || !scheduledDate || !scheduledTime) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const tour = {
          centerId: new ObjectId(tourCenterId),
          parentName: tourParent,
          parentEmail: tourEmail,
          parentPhone: tourPhone,
          scheduledDate: new Date(scheduledDate),
          scheduledTime,
          status: 'scheduled',
          followUpSent: false,
          convertedToEnrollment: false,
          createdAt: new Date()
        };

        const result = await db.collection('tour_schedules').insertOne(tour);
        return NextResponse.json({ message: 'Tour scheduled', tourId: result.insertedId }, { status: 201 });
      }

      case 'create_lead': {
        const { centerId: leadCenterId, parentName: leadParent, email, phone, source, childAge, programInterest } = body;

        if (!leadCenterId || !leadParent || !email) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const lead = {
          centerId: new ObjectId(leadCenterId),
          parentName: leadParent,
          email,
          phone,
          source: source || 'website',
          childAge,
          programInterest,
          status: 'new',
          followUpDates: [],
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await db.collection('lead_tracking').insertOne(lead);
        return NextResponse.json({ message: 'Lead created', leadId: result.insertedId }, { status: 201 });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in enrollment operation:', error);
    return NextResponse.json({ error: 'Failed to process enrollment operation' }, { status: 500 });
  }
}

// PUT - Update enrollment status, waitlist position, etc.
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { resource, id, ...updates } = body;

    if (!resource || !id) {
      return NextResponse.json({ error: 'Missing resource type or ID' }, { status: 400 });
    }

    const db = await getDatabase();
    const collections: Record<string, string> = {
      form: 'enrollment_forms',
      waitlist: 'waitlist_entries',
      tour: 'tour_schedules',
      lead: 'lead_tracking'
    };

    const collection = collections[resource];
    if (!collection) {
      return NextResponse.json({ error: 'Invalid resource type' }, { status: 400 });
    }

    const result = await db.collection(collection).updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    );

    return NextResponse.json({ message: 'Updated successfully', modified: result.modifiedCount > 0 });
  } catch (error) {
    console.error('Error updating enrollment data:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
