import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// GET - Get staff profiles, schedules, timecards
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const centerId = searchParams.get('centerId');
    const staffId = searchParams.get('staffId');
    const resource = searchParams.get('resource') || 'profiles'; // profiles, schedules, timecards
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const db = await getDatabase();
    const query: Record<string, unknown> = {};

    if (centerId) query.centerId = new ObjectId(centerId);
    if (staffId) query.staffId = new ObjectId(staffId);

    let collection = 'staff_profiles';
    if (resource === 'schedules') collection = 'staff_schedules';
    if (resource === 'timecards') collection = 'staff_timecards';

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
    console.error('Error fetching staff data:', error);
    return NextResponse.json({ error: 'Failed to fetch staff data' }, { status: 500 });
  }
}

// POST - Create staff profile, clock in/out, create schedule
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    const db = await getDatabase();

    switch (action) {
      case 'create_profile': {
        const { userId, centerId, position, department, hireDate, payType, hourlyRate, salary, emergencyContact } = body;
        if (!userId || !centerId || !position) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const profile = {
          userId: new ObjectId(userId),
          centerId: new ObjectId(centerId),
          position,
          department: department || 'General',
          hireDate: new Date(hireDate || Date.now()),
          classroomAssignments: [],
          certifications: [],
          trainingRecords: [],
          performanceNotes: [],
          emergencyContact,
          hourlyRate,
          salary,
          payType: payType || 'hourly',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await db.collection('staff_profiles').insertOne(profile);
        return NextResponse.json({ message: 'Staff profile created', profileId: result.insertedId }, { status: 201 });
      }

      case 'clock_in': {
        const { staffId, centerId: clockCenterId, clockInMethod } = body;
        if (!staffId || !clockCenterId) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if already clocked in
        const existing = await db.collection('staff_timecards').findOne({
          staffId: new ObjectId(staffId),
          status: 'clocked_in'
        });

        if (existing) {
          return NextResponse.json({ error: 'Already clocked in' }, { status: 409 });
        }

        const timecard = {
          staffId: new ObjectId(staffId),
          centerId: new ObjectId(clockCenterId),
          clockInTime: new Date(),
          clockInMethod: clockInMethod || 'manual',
          status: 'clocked_in',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await db.collection('staff_timecards').insertOne(timecard);
        return NextResponse.json({ message: 'Clocked in', timecardId: result.insertedId }, { status: 201 });
      }

      case 'clock_out': {
        const { staffId: outStaffId, clockOutMethod } = body;
        if (!outStaffId) {
          return NextResponse.json({ error: 'Missing staff ID' }, { status: 400 });
        }

        const activeCard = await db.collection('staff_timecards').findOne({
          staffId: new ObjectId(outStaffId),
          status: 'clocked_in'
        });

        if (!activeCard) {
          return NextResponse.json({ error: 'No active timecard found' }, { status: 404 });
        }

        const clockOutTime = new Date();
        const totalHours = (clockOutTime.getTime() - new Date(activeCard.clockInTime).getTime()) / (1000 * 60 * 60);

        await db.collection('staff_timecards').updateOne(
          { _id: activeCard._id },
          {
            $set: {
              clockOutTime,
              clockOutMethod: clockOutMethod || 'manual',
              totalHours: Math.round(totalHours * 100) / 100,
              overtimeHours: totalHours > 8 ? Math.round((totalHours - 8) * 100) / 100 : 0,
              status: 'clocked_out',
              updatedAt: new Date()
            }
          }
        );

        return NextResponse.json({ message: 'Clocked out', totalHours: Math.round(totalHours * 100) / 100 });
      }

      case 'create_schedule': {
        const { staffId: schedStaffId, centerId: schedCenterId, weekStartDate, shifts } = body;
        if (!schedStaffId || !schedCenterId || !weekStartDate || !shifts) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const schedule = {
          staffId: new ObjectId(schedStaffId),
          centerId: new ObjectId(schedCenterId),
          weekStartDate: new Date(weekStartDate),
          shifts,
          totalHours: shifts.reduce((sum: number, shift: { startTime: string; endTime: string }) => {
            const start = parseInt(shift.startTime.split(':')[0]);
            const end = parseInt(shift.endTime.split(':')[0]);
            return sum + (end - start);
          }, 0),
          status: 'draft',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await db.collection('staff_schedules').insertOne(schedule);
        return NextResponse.json({ message: 'Schedule created', scheduleId: result.insertedId }, { status: 201 });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in staff operation:', error);
    return NextResponse.json({ error: 'Failed to process staff operation' }, { status: 500 });
  }
}
