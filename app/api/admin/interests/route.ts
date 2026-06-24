import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { withAdminAuth } from '@/middleware/adminAuth';
import { getDatabase } from '@/lib/db/mongodb';

interface InterestRecord {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  course: string;
  childName?: string | null;
  childAge?: number | null;
  message?: string | null;
  status?: string;
  source?: string;
  createdAt: Date;
}

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

async function handler() {
  try {
    const db = await getDatabase();

    const interests = await db
      .collection<InterestRecord>('interests')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const formattedInterests = interests.map((interest) => ({
      id: interest._id?.toString(),
      name: interest.name,
      email: interest.email,
      phone: interest.phone,
      course: interest.course,
      childName: interest.childName ?? null,
      childAge: interest.childAge ?? null,
      message: interest.message || null,
      status: interest.status || 'new',
      source: interest.source || 'unknown',
      createdAt: interest.createdAt,
    }));

    return NextResponse.json({
      interests: formattedInterests,
      total: formattedInterests.length,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching interests:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to fetch interests' },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);
