import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      course,
      childName,
      childAge,
      message,
      source,
    } = body;

    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const trimmedPhone = typeof phone === 'string' ? phone.trim() : '';
    const trimmedCourse = typeof course === 'string' ? course.trim() : '';

    // Validate required fields
    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedCourse) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to database
    const db = await getDatabase();

    // Create interest record
    const interest = {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      course: trimmedCourse,
      childName: typeof childName === 'string' && childName.trim() ? childName.trim() : null,
      childAge: childAge ? parseInt(childAge) : null,
      message: typeof message === 'string' && message.trim() ? message.trim() : null,
      status: 'new',
      createdAt: new Date(),
      source: typeof source === 'string' && source.trim() ? source.trim() : 'marketing-flyer'
    };

    // Insert into database
    const result = await db.collection('interests').insertOne(interest);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Interest recorded successfully',
        id: result.insertedId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error recording interest:', error);
    return NextResponse.json(
      { error: 'Failed to record interest' },
      { status: 500 }
    );
  }
}
