import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// GET - Health records, illness tracking, medication logs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('childId');
    const centerId = searchParams.get('centerId');
    const resource = searchParams.get('resource') || 'health_checks'; // health_checks, illness, medications, immunizations
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const db = await getDatabase();
    const query: Record<string, unknown> = {};

    if (childId) query.childId = new ObjectId(childId);
    if (centerId) query.centerId = new ObjectId(centerId);

    const collections: Record<string, string> = {
      health_checks: 'health_check_logs',
      illness: 'illness_tracking',
      medications: 'medication_authorizations',
      immunizations: 'immunization_records',
      safety: 'safety_checklists'
    };

    const collection = collections[resource] || 'health_check_logs';
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
    console.error('Error fetching health data:', error);
    return NextResponse.json({ error: 'Failed to fetch health data' }, { status: 500 });
  }
}

// POST - Create health check, illness report, medication auth
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    const db = await getDatabase();

    switch (action) {
      case 'health_check': {
        const { childId, classroomId, checkedBy, temperature, symptoms, actionResult, notes } = body;
        if (!childId || !classroomId || !checkedBy) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const check = {
          childId: new ObjectId(childId),
          classroomId: new ObjectId(classroomId),
          date: new Date(),
          checkedBy: new ObjectId(checkedBy),
          temperature,
          symptoms: symptoms || [],
          action: actionResult || 'admitted',
          notes,
          parentNotified: actionResult === 'sent_home' || actionResult === 'parent_contacted',
          createdAt: new Date()
        };

        const result = await db.collection('health_check_logs').insertOne(check);
        return NextResponse.json({ message: 'Health check logged', checkId: result.insertedId }, { status: 201 });
      }

      case 'report_illness': {
        const { childId: illChildId, centerId, symptoms: illSymptoms, temperature: illTemp, diagnosis, sentHome, contagious, reportedBy } = body;
        if (!illChildId || !centerId || !reportedBy) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const illness = {
          childId: new ObjectId(illChildId),
          centerId: new ObjectId(centerId),
          reportedDate: new Date(),
          symptoms: illSymptoms || [],
          temperature: illTemp,
          diagnosis,
          sentHome: sentHome || false,
          sentHomeTime: sentHome ? new Date() : undefined,
          doctorNoteRequired: false,
          doctorNoteReceived: false,
          contagious: contagious || false,
          otherChildrenNotified: false,
          reportedBy: new ObjectId(reportedBy),
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await db.collection('illness_tracking').insertOne(illness);
        return NextResponse.json({ message: 'Illness reported', recordId: result.insertedId }, { status: 201 });
      }

      case 'medication_auth': {
        const { childId: medChildId, parentId, medicationName, dosage, frequency, administrationRoute, startDate, endDate, specialInstructions, physicianName, physicianPhone, parentSignature } = body;
        if (!medChildId || !parentId || !medicationName || !dosage || !parentSignature) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const auth = {
          childId: new ObjectId(medChildId),
          parentId: new ObjectId(parentId),
          medicationName,
          dosage,
          frequency,
          administrationRoute: administrationRoute || 'oral',
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          specialInstructions,
          physicianName,
          physicianPhone,
          parentSignature,
          parentSignatureDate: new Date(),
          active: true,
          administrationLogs: [],
          createdAt: new Date()
        };

        const result = await db.collection('medication_authorizations').insertOne(auth);
        return NextResponse.json({ message: 'Medication authorization created', authId: result.insertedId }, { status: 201 });
      }

      case 'log_medication': {
        const { authorizationId, dosageGiven, administeredBy, witnessedBy, notes: medNotes, childReaction } = body;
        if (!authorizationId || !dosageGiven || !administeredBy) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const logEntry = {
          date: new Date(),
          time: new Date(),
          dosageGiven,
          administeredBy: new ObjectId(administeredBy),
          witnessedBy: witnessedBy ? new ObjectId(witnessedBy) : undefined,
          notes: medNotes,
          childReaction
        };

        await db.collection('medication_authorizations').updateOne(
          { _id: new ObjectId(authorizationId) },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { $push: { administrationLogs: logEntry } } as any
        );

        return NextResponse.json({ message: 'Medication administered and logged' });
      }

      case 'safety_checklist': {
        const { centerId: safetyCenterId, classroomId: safetyClassroom, type: checklistType, items, completedBy: checklistUser } = body;
        if (!safetyCenterId || !checklistType || !items || !checklistUser) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const checklist = {
          centerId: new ObjectId(safetyCenterId),
          classroomId: safetyClassroom ? new ObjectId(safetyClassroom) : undefined,
          type: checklistType,
          date: new Date(),
          items,
          completedBy: new ObjectId(checklistUser),
          status: items.every((item: { checked: boolean }) => item.checked) ? 'completed' : 'incomplete',
          completedAt: items.every((item: { checked: boolean }) => item.checked) ? new Date() : undefined,
          createdAt: new Date()
        };

        const result = await db.collection('safety_checklists').insertOne(checklist);
        return NextResponse.json({ message: 'Safety checklist saved', checklistId: result.insertedId }, { status: 201 });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in health operation:', error);
    return NextResponse.json({ error: 'Failed to process health operation' }, { status: 500 });
  }
}
