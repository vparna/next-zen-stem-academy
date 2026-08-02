import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      studentName,
      age,
      parentName,
      parentEmail,
      parentPhone,
      address,
      emergencyContact,
      priorExperience,
      earlyBird,
      campType,
    } = body;

    // Validate required fields
    if (!studentName || !age || !parentName || !parentEmail || !parentPhone || !address || !emergencyContact || !campType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to database
    const db = await getDatabase();

    // Determine course label for admin panel
    const courseLabel = campType === 'ftc' ? 'FTC Camp' : 'Robotics Camp';

    // Create interest record so it shows in admin Interest Submissions
    // regardless of whether the user pays the $100 deposit
    const interest = {
      name: parentName,
      email: parentEmail,
      phone: parentPhone,
      course: courseLabel,
      childName: studentName,
      childAge: age ? parseInt(age) : null,
      message: priorExperience || null,
      status: 'new',
      source: 'robotics-enrollment',
      earlyBird: !!earlyBird,
      campType,
      address,
      emergencyContact,
      paymentStatus: 'unpaid',
      createdAt: new Date(),
    };

    // Insert into the interests collection (same collection the admin panel reads)
    const result = await db.collection('interests').insertOne(interest);

    return NextResponse.json(
      {
        success: true,
        message: 'Enrollment interest recorded successfully',
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error recording robotics enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to record enrollment' },
      { status: 500 }
    );
  }
}
