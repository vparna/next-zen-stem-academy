
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import { getLiveClassesByCourseId, getUpcomingLiveClasses } from '@/models/LiveClass';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    const upcoming = searchParams.get('upcoming');
    
    let liveClasses;
    
    if (upcoming === 'true') {
      liveClasses = await getUpcomingLiveClasses(courseId || undefined);
    } else if (courseId) {
      liveClasses = await getLiveClassesByCourseId(courseId);
    } else {
      liveClasses = await getUpcomingLiveClasses();
    }
    
    return NextResponse.json({ liveClasses });
  } catch (error) {
    console.error('Error fetching live classes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handler);
