
import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/models/User';
import { hashPassword, generateToken } from '@/lib/auth/jwt';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone, role } = await req.json();
    
    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const userId = await createUser({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      role: role || 'parent',
    });
    
    // Generate token
    const token = generateToken({
      userId: userId.toString(),
      email,
    });
    
    return NextResponse.json({
      token,
      user: {
        id: userId.toString(),
        email,
        firstName,
        lastName,
        phone,
        role: role || 'parent',
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    
    // Provide more detailed error information in development
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { details: errorMessage })
      },
      { status: 500 }
    );
  }
}
