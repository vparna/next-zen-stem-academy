import { NextRequest, NextResponse } from 'next/server';
import { createJob, findAllJobs } from '@/models/Job';
import { withAuth } from '@/middleware/auth';

// GET /api/jobs - Get all jobs (optionally filter by active)
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const activeOnly = searchParams.get('active') === 'true';
    
    const jobs = await findAllJobs(activeOnly);
    
    return NextResponse.json({ jobs });
  } catch (error: any) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

// POST /api/jobs - Create a new job (admin only)
async function postHandler(req: NextRequest) {
  try {
    const user = (req as any).user;
    
    // Check if user is admin
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }
    
    const body = await req.json();
    const {
      jobId,
      title,
      description,
      requirements,
      responsibilities,
      location,
      jobType,
      department,
      experienceLevel,
      salaryRange,
      active = true,
    } = body;
    
    // Validate required fields
    if (!jobId || !title || !description || !location || !jobType || !department || !experienceLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const newJobId = await createJob({
      jobId,
      title,
      description,
      requirements: requirements || [],
      responsibilities: responsibilities || [],
      location,
      jobType,
      department,
      experienceLevel,
      salaryRange,
      active,
    });
    
    return NextResponse.json(
      { message: 'Job created successfully', jobId: newJobId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}

export const POST = withAuth(postHandler);
