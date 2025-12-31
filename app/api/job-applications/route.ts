
import { NextRequest, NextResponse } from 'next/server';
import { createJobApplication, findAllApplications } from '@/models/JobApplication';
import { withAuth } from '@/middleware/auth';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// GET /api/job-applications - Get all applications (admin only)
async function getHandler(req: NextRequest) {
  try {
    const user = (req as any).user;
    
    // Check if user is admin
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }
    
    const searchParams = req.nextUrl.searchParams;
    const jobId = searchParams.get('jobId') || undefined;
    
    const applications = await findAllApplications(jobId);
    
    return NextResponse.json({ applications });
  } catch (error: any) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

// POST /api/job-applications - Submit a new job application
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      jobId,
      firstName,
      lastName,
      email,
      phone,
      resumeUrl,
      resumeFileName,
      coverLetter,
      linkedinUrl,
      portfolioUrl,
    } = body;
    
    // Validate required fields
    if (!jobId || !firstName || !lastName || !email || !phone || !resumeUrl || !resumeFileName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const applicationId = await createJobApplication({
      jobId,
      firstName,
      lastName,
      email,
      phone,
      resumeUrl,
      resumeFileName,
      coverLetter,
      linkedinUrl,
      portfolioUrl,
      status: 'pending',
    });
    
    return NextResponse.json(
      { message: 'Application submitted successfully', applicationId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
