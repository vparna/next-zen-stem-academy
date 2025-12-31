
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import { findUserById, updateUser } from '@/models/User';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

async function getHandler(req: NextRequest) {
  try {
    const user = (req as any).user;
    const userDoc = await findUserById(user.userId);
    
    if (!userDoc) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const { password, ...userWithoutPassword } = userDoc;
    
    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function patchHandler(req: NextRequest) {
  try {
    const user = (req as any).user;
    const updates = await req.json();
    
    // Don't allow updating email or password through this endpoint
    delete updates.email;
    delete updates.password;
    delete updates._id;
    delete updates.createdAt;
    
    const success = await updateUser(user.userId, updates);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
export const PATCH = withAuth(patchHandler);
