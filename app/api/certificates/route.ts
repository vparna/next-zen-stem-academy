import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import { ObjectId } from 'mongodb';
import { 
  createCertificate, 
  getCertificateByEnrollment, 
  getCertificatesByUserId,
  generateCertificateNumber 
} from '@/models/Certificate';
import { getEnrollmentById, updateEnrollment } from '@/models/Enrollment';
import { findUserById } from '@/models/User';
import { getCourseById } from '@/models/Course';
import { sendNotificationEmail } from '@/lib/email/service';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

async function getHandler(req: NextRequest) {
  try {
    const user = (req as any).user;
    const { searchParams } = new URL(req.url);
    const enrollmentId = searchParams.get('enrollmentId');
    
    if (enrollmentId) {
      const certificate = await getCertificateByEnrollment(enrollmentId);
      return NextResponse.json({ certificate });
    }
    
    const certificates = await getCertificatesByUserId(user.userId);
    return NextResponse.json({ certificates });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function postHandler(req: NextRequest) {
  try {
    const user = (req as any).user;
    const { enrollmentId } = await req.json();
    
    if (!enrollmentId) {
      return NextResponse.json(
        { error: 'Enrollment ID is required' },
        { status: 400 }
      );
    }
    
    // Check if certificate already exists
    const existingCert = await getCertificateByEnrollment(enrollmentId);
    if (existingCert) {
      return NextResponse.json(
        { error: 'Certificate already issued for this enrollment' },
        { status: 400 }
      );
    }
    
    // Get enrollment details
    const enrollment = await getEnrollmentById(enrollmentId);
    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }
    
    // Verify enrollment is completed
    if (enrollment.status !== 'completed') {
      return NextResponse.json(
        { error: 'Course must be completed to issue certificate' },
        { status: 400 }
      );
    }
    
    // Generate certificate
    const certificateNumber = await generateCertificateNumber();
    const certificateId = await createCertificate({
      enrollmentId: new ObjectId(enrollmentId),
      userId: enrollment.userId,
      childId: enrollment.childId,
      courseId: enrollment.courseId,
      certificateNumber,
      issuedDate: new Date(),
      createdAt: new Date(),
    });
    
    // Update enrollment
    await updateEnrollment(enrollmentId, { certificateIssued: true });
    
    // Send email notification
    const userDetails = await findUserById(enrollment.userId);
    const course = await getCourseById(enrollment.courseId);
    
    if (userDetails && course) {
      const certificateUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/certificates/${certificateId}`;
      await sendNotificationEmail(
        enrollment.userId,
        userDetails.email,
        'certificate-issued',
        {
          userName: `${userDetails.firstName} ${userDetails.lastName}`,
          courseName: course.name,
          certificateUrl,
        }
      );
    }
    
    return NextResponse.json({
      message: 'Certificate issued successfully',
      certificateId: certificateId.toString(),
      certificateNumber,
    }, { status: 201 });
  } catch (error) {
    console.error('Error issuing certificate:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);
