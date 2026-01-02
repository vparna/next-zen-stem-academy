import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// GET - Get attendance analytics and reports
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get('type') || 'summary';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const childId = searchParams.get('childId');

    const db = await getDatabase();
    
    // Build date filter
    const dateFilter: any = {};
    if (startDate) {
      dateFilter.$gte = new Date(startDate);
    }
    if (endDate) {
      dateFilter.$lte = new Date(endDate);
    }

    const filter: any = {};
    if (Object.keys(dateFilter).length > 0) {
      filter.checkInTime = dateFilter;
    }
    if (childId) {
      filter.childId = new ObjectId(childId);
    }

    switch (reportType) {
      case 'summary':
        // Get summary statistics
        const totalAttendances = await db.collection('attendances').countDocuments(filter);
        const completedAttendances = await db.collection('attendances').countDocuments({
          ...filter,
          status: 'completed'
        });
        const activeAttendances = await db.collection('attendances').countDocuments({
          ...filter,
          status: 'checked-in'
        });

        // Calculate average duration using MongoDB aggregation
        const durationStats = await db.collection('attendances').aggregate([
          { 
            $match: { 
              ...filter, 
              status: 'completed', 
              checkOutTime: { $exists: true } 
            } 
          },
          {
            $project: {
              duration: {
                $subtract: ['$checkOutTime', '$checkInTime']
              }
            }
          },
          {
            $group: {
              _id: null,
              avgDuration: { $avg: '$duration' },
              count: { $sum: 1 }
            }
          }
        ]).toArray();

        const averageDurationMinutes = durationStats.length > 0 && durationStats[0].avgDuration
          ? Math.round(durationStats[0].avgDuration / 60000)
          : 0;

        return NextResponse.json({
          totalAttendances,
          completedAttendances,
          activeAttendances,
          averageDurationMinutes,
          completionRate: totalAttendances > 0 
            ? Math.round((completedAttendances / totalAttendances) * 100)
            : 0
        });

      case 'daily':
        // Get daily attendance counts
        const dailyStats = await db.collection('attendances').aggregate([
          { $match: filter },
          {
            $group: {
              _id: {
                $dateToString: { format: '%Y-%m-%d', date: '$checkInTime' }
              },
              count: { $sum: 1 },
              completed: {
                $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
              }
            }
          },
          { $sort: { _id: 1 } }
        ]).toArray();

        return NextResponse.json(dailyStats);

      case 'by-child':
        // Get attendance by child
        const byChild = await db.collection('attendances').aggregate([
          { $match: filter },
          {
            $lookup: {
              from: 'children',
              localField: 'childId',
              foreignField: '_id',
              as: 'child'
            }
          },
          { $unwind: '$child' },
          {
            $group: {
              _id: '$childId',
              childName: { $first: '$child.name' },
              count: { $sum: 1 },
              completed: {
                $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
              }
            }
          },
          { $sort: { count: -1 } }
        ]).toArray();

        return NextResponse.json(byChild);

      case 'monthly':
        // Get monthly attendance trends
        const monthlyStats = await db.collection('attendances').aggregate([
          { $match: filter },
          {
            $group: {
              _id: {
                year: { $year: '$checkInTime' },
                month: { $month: '$checkInTime' }
              },
              count: { $sum: 1 },
              completed: {
                $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
              }
            }
          },
          { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]).toArray();

        return NextResponse.json(monthlyStats);

      default:
        return NextResponse.json(
          { error: 'Invalid report type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
