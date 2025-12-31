
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import { createChild, getChildrenByUserId } from '@/models/Child';
import { ObjectId } from 'mongodb';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

async function getHandler(req: NextRequest) {
  try {
    const user = (req as any).user;
    const children = await getChildrenByUserId(user.userId);
    
    return NextResponse.json({ children });
  } catch (error) {
    console.error('Error fetching children:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function postHandler(req: NextRequest) {
  try {
    const user = (req as any).user;
    const { name, age, grade } = await req.json();
    
    if (!name || !age) {
      return NextResponse.json(
        { error: 'Name and age are required' },
        { status: 400 }
      );
    }
    
    const childId = await createChild({
      userId: new ObjectId(user.userId),
      name,
      age,
      grade,
      createdAt: new Date(),
    });
    
    return NextResponse.json({
      childId: childId.toString(),
      message: 'Child added successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating child:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);
