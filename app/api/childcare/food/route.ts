import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// GET - Get menu plans, dietary profiles, CACFP logs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const centerId = searchParams.get('centerId');
    const childId = searchParams.get('childId');
    const resource = searchParams.get('resource') || 'menus'; // menus, dietary, cacfp
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const db = await getDatabase();
    const query: Record<string, unknown> = {};

    if (centerId) query.centerId = new ObjectId(centerId);
    if (childId) query.childId = new ObjectId(childId);

    const collections: Record<string, string> = {
      menus: 'menu_plans',
      dietary: 'child_dietary_profiles',
      cacfp: 'cacfp_logs'
    };

    const collection = collections[resource] || 'menu_plans';
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
    console.error('Error fetching food data:', error);
    return NextResponse.json({ error: 'Failed to fetch food data' }, { status: 500 });
  }
}

// POST - Create menu plan, dietary profile, CACFP log
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    const db = await getDatabase();

    switch (action) {
      case 'create_menu': {
        const { centerId, weekStartDate, meals, createdBy } = body;
        if (!centerId || !weekStartDate || !meals || !createdBy) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const menu = {
          centerId: new ObjectId(centerId),
          weekStartDate: new Date(weekStartDate),
          meals,
          createdBy: new ObjectId(createdBy),
          status: 'draft',
          cacfpCompliant: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await db.collection('menu_plans').insertOne(menu);
        return NextResponse.json({ message: 'Menu plan created', menuId: result.insertedId }, { status: 201 });
      }

      case 'create_dietary_profile': {
        const { childId, allergies, dietaryRestrictions, preferences, specialInstructions, updatedBy } = body;
        if (!childId || !updatedBy) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Upsert dietary profile
        const result = await db.collection('child_dietary_profiles').updateOne(
          { childId: new ObjectId(childId) },
          {
            $set: {
              childId: new ObjectId(childId),
              allergies: allergies || [],
              dietaryRestrictions: dietaryRestrictions || [],
              preferences: preferences || [],
              specialInstructions,
              parentApproved: true,
              lastUpdated: new Date(),
              updatedBy: new ObjectId(updatedBy)
            }
          },
          { upsert: true }
        );

        return NextResponse.json({ message: 'Dietary profile saved', upserted: result.upsertedCount > 0 }, { status: 201 });
      }

      case 'log_cacfp': {
        const { centerId: cacfpCenter, mealType, childrenServed, menuItemsServed, componentsMet, notes, recordedBy } = body;
        if (!cacfpCenter || !mealType || !childrenServed || !recordedBy) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const log = {
          centerId: new ObjectId(cacfpCenter),
          date: new Date(),
          mealType,
          childrenServed,
          menuItemsServed: menuItemsServed || [],
          componentsMet: componentsMet || { grain: false, meat_alternate: false, vegetable: false, fruit: false, milk: false },
          notes,
          recordedBy: new ObjectId(recordedBy),
          createdAt: new Date()
        };

        const result = await db.collection('cacfp_logs').insertOne(log);
        return NextResponse.json({ message: 'CACFP log recorded', logId: result.insertedId }, { status: 201 });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in food operation:', error);
    return NextResponse.json({ error: 'Failed to process food operation' }, { status: 500 });
  }
}
