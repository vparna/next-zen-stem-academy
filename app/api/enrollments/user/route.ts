
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

async function handler(req: NextRequest) {
  try {
    const user = (req as any).user;
    const db = await getDatabase();
    
    // Use aggregation to fetch enrollments with course details in a single query
    const enrollmentsWithCourses = await db.collection('enrollments').aggregate([
      {
        $match: { userId: new ObjectId(user.userId) }
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'courseId',
          foreignField: '_id',
          as: 'course'
        }
      },
      {
        $unwind: {
          path: '$course',
          preserveNullAndEmptyArrays: true
        }
      }
    ]).toArray();
    
    return NextResponse.json({ 
      enrollments: enrollmentsWithCourses,
      count: enrollmentsWithCourses.length 
    });
  } catch (error) {
    console.error('Error fetching user enrollments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handler);
