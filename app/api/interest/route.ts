import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, course, childName, childAge, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !course) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Create interest record
    const interest = {
      name,
      email,
      phone,
      course,
      childName: childName || null,
      childAge: childAge ? parseInt(childAge) : null,
      message: message || null,
      status: 'new',
      createdAt: new Date(),
      source: 'marketing-flyer'
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
