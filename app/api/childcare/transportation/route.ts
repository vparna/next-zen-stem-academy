import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// GET - Get bus routes, tracking, driver logs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const centerId = searchParams.get('centerId');
    const routeId = searchParams.get('routeId');
    const resource = searchParams.get('resource') || 'routes'; // routes, tracking, driver_logs
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const db = await getDatabase();
    const query: Record<string, unknown> = {};

    if (centerId) query.centerId = new ObjectId(centerId);
    if (routeId) query.routeId = new ObjectId(routeId);

    const collections: Record<string, string> = {
      routes: 'bus_routes',
      tracking: 'bus_tracking',
      driver_logs: 'driver_logs'
    };

    const collection = collections[resource] || 'bus_routes';
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
    console.error('Error fetching transportation data:', error);
    return NextResponse.json({ error: 'Failed to fetch transportation data' }, { status: 500 });
  }
}

// POST - Create routes, start tracking, log driver activities
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    const db = await getDatabase();

    switch (action) {
      case 'create_route': {
        const { centerId, routeName, routeNumber, driverId, vehicleId, stops, schedule } = body;
        if (!centerId || !routeName || !routeNumber || !driverId) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const route = {
          centerId: new ObjectId(centerId),
          routeName,
          routeNumber,
          driverId: new ObjectId(driverId),
          vehicleId,
          stops: stops || [],
          schedule,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await db.collection('bus_routes').insertOne(route);
        return NextResponse.json({ message: 'Route created', routeId: result.insertedId }, { status: 201 });
      }

      case 'start_tracking': {
        const { routeId, driverId: trackDriverId } = body;
        if (!routeId || !trackDriverId) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const tracking = {
          routeId: new ObjectId(routeId),
          date: new Date(),
          driverId: new ObjectId(trackDriverId),
          status: 'in_progress',
          startTime: new Date(),
          stops: [],
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await db.collection('bus_tracking').insertOne(tracking);
        return NextResponse.json({ message: 'Tracking started', trackingId: result.insertedId }, { status: 201 });
      }

      case 'update_location': {
        const { trackingId, latitude, longitude, accuracy } = body;
        if (!trackingId) {
          return NextResponse.json({ error: 'Missing tracking ID' }, { status: 400 });
        }

        await db.collection('bus_tracking').updateOne(
          { _id: new ObjectId(trackingId) },
          {
            $set: {
              currentLocation: { latitude, longitude, accuracy, timestamp: new Date() },
              updatedAt: new Date()
            }
          }
        );

        return NextResponse.json({ message: 'Location updated' });
      }

      case 'driver_log': {
        const { driverId: logDriverId, routeId: logRouteId, preInspection, totalChildren, incidents, notes } = body;
        if (!logDriverId || !logRouteId || !preInspection) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const log = {
          driverId: new ObjectId(logDriverId),
          routeId: new ObjectId(logRouteId),
          date: new Date(),
          preInspection,
          totalChildren: totalChildren || 0,
          incidents,
          notes,
          createdAt: new Date()
        };

        const result = await db.collection('driver_logs').insertOne(log);
        return NextResponse.json({ message: 'Driver log created', logId: result.insertedId }, { status: 201 });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in transportation operation:', error);
    return NextResponse.json({ error: 'Failed to process transportation operation' }, { status: 500 });
  }
}
