import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/middleware/adminAuth';
import { getDatabase } from '@/lib/db/mongodb';
import { User, Child, Enrollment } from '@/types';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

async function handler(req: NextRequest) {
  try {
    const db = await getDatabase();
    
    // Get all parent users
    const users = await db.collection<User>('users')
      .find({ role: 'parent' })
      .sort({ createdAt: -1 })
      .toArray();
    
    // For each user, get their children and enrollments
    const studentsData = await Promise.all(
      users.map(async (user) => {
        const children = await db.collection<Child>('children')
          .find({ userId: user._id })
          .toArray();
        
        const enrollments = await db.collection<Enrollment>('enrollments')
          .find({ userId: user._id })
          .toArray();
        
        return {
          id: user._id?.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          createdAt: user.createdAt,
          childrenCount: children.length,
          enrollmentsCount: enrollments.length,
          children: children.map(child => ({
            id: child._id?.toString(),
            name: child.name,
            age: child.age,
            grade: child.grade,
          })),
        };
      })
    );
    
    return NextResponse.json({
      students: studentsData,
      total: studentsData.length,
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);
