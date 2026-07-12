import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// GET - Get classrooms, rosters, behavior logs, rewards
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const centerId = searchParams.get('centerId');
    const classroomId = searchParams.get('classroomId');
    const resource = searchParams.get('resource') || 'classrooms';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const db = await getDatabase();
    const query: Record<string, unknown> = {};

    if (centerId) query.centerId = new ObjectId(centerId);
    if (classroomId) query.classroomId = new ObjectId(classroomId);

    const collections: Record<string, string> = {
      classrooms: 'classrooms',
      behavior: 'behavior_logs',
      rewards: 'reward_records',
      transfers: 'child_room_transfers'
    };

    const collection = collections[resource] || 'classrooms';
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
    console.error('Error fetching classroom data:', error);
    return NextResponse.json({ error: 'Failed to fetch classroom data' }, { status: 500 });
  }
}

// POST - Create classroom, log behavior, award reward, transfer child
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    const db = await getDatabase();

    switch (action) {
      case 'create_classroom': {
        const { centerId, name, ageGroup, capacity, maxRatio, leadTeacher } = body;
        if (!centerId || !name || !ageGroup || !capacity) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const classroom = {
          centerId: new ObjectId(centerId),
          name,
          ageGroup,
          capacity,
          currentCount: 0,
          assignedStaff: [],
          leadTeacher: leadTeacher ? new ObjectId(leadTeacher) : undefined,
          maxRatio: maxRatio || 4,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await db.collection('classrooms').insertOne(classroom);
        return NextResponse.json({ message: 'Classroom created', classroomId: result.insertedId }, { status: 201 });
      }

      case 'log_behavior': {
        const { childId, classroomId, type, category, description, actionTaken, reportedBy } = body;
        if (!childId || !classroomId || !type || !description || !reportedBy) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const log = {
          childId: new ObjectId(childId),
          classroomId: new ObjectId(classroomId),
          date: new Date(),
          type,
          category: category || 'behavior',
          description,
          actionTaken,
          reportedBy: new ObjectId(reportedBy),
          parentNotified: false,
          createdAt: new Date()
        };

        const result = await db.collection('behavior_logs').insertOne(log);
        return NextResponse.json({ message: 'Behavior logged', logId: result.insertedId }, { status: 201 });
      }

      case 'award_reward': {
        const { childId: rewardChildId, classroomId: rewardClassroom, type: rewardType, reason, points, awardedBy } = body;
        if (!rewardChildId || !rewardClassroom || !rewardType || !reason || !awardedBy) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const reward = {
          childId: new ObjectId(rewardChildId),
          classroomId: new ObjectId(rewardClassroom),
          type: rewardType,
          reason,
          points: points || 1,
          awardedBy: new ObjectId(awardedBy),
          date: new Date(),
          createdAt: new Date()
        };

        const result = await db.collection('reward_records').insertOne(reward);
        return NextResponse.json({ message: 'Reward awarded', rewardId: result.insertedId }, { status: 201 });
      }

      case 'transfer_child': {
        const { childId: transferChild, fromClassroomId, toClassroomId, reason: transferReason, permanent, approvedBy } = body;
        if (!transferChild || !fromClassroomId || !toClassroomId || !approvedBy) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Update classroom counts
        await db.collection('classrooms').updateOne(
          { _id: new ObjectId(fromClassroomId) },
          { $inc: { currentCount: -1 } }
        );
        await db.collection('classrooms').updateOne(
          { _id: new ObjectId(toClassroomId) },
          { $inc: { currentCount: 1 } }
        );

        const transfer = {
          childId: new ObjectId(transferChild),
          fromClassroomId: new ObjectId(fromClassroomId),
          toClassroomId: new ObjectId(toClassroomId),
          transferDate: new Date(),
          reason: transferReason || '',
          permanent: permanent !== false,
          approvedBy: new ObjectId(approvedBy),
          createdAt: new Date()
        };

        const result = await db.collection('child_room_transfers').insertOne(transfer);
        return NextResponse.json({ message: 'Child transferred', transferId: result.insertedId }, { status: 201 });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in classroom operation:', error);
    return NextResponse.json({ error: 'Failed to process classroom operation' }, { status: 500 });
  }
}
