import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/middleware/adminAuth';
import { getDatabase } from '@/lib/db/mongodb';
import { Payment, User, Course, Enrollment } from '@/types';
import { ObjectId } from 'mongodb';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

async function handler(req: NextRequest) {
  try {
    const db = await getDatabase();
    
    // Get all payments or from enrollments if payments collection doesn't have data
    let payments = await db.collection<Payment>('payments')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    // If no payments in collection, get from enrollments
    if (payments.length === 0) {
      const enrollments = await db.collection<Enrollment>('enrollments')
        .find({ paymentStatus: { $in: ['paid', 'pending'] } })
        .sort({ enrolledAt: -1 })
        .toArray();
      
      // Fetch related data for each enrollment
      const paymentsData = await Promise.all(
        enrollments.map(async (enrollment) => {
          const user = await db.collection<User>('users')
            .findOne({ _id: enrollment.userId });
          
          const course = await db.collection<Course>('courses')
            .findOne({ _id: enrollment.courseId });
          
          return {
            id: enrollment._id?.toString(),
            userName: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
            userEmail: user?.email || 'N/A',
            courseName: course?.name || 'Unknown Course',
            amount: enrollment.amount,
            originalAmount: enrollment.originalAmount || enrollment.amount,
            discountApplied: enrollment.discountApplied || 0,
            couponCode: enrollment.couponCode || null,
            status: enrollment.paymentStatus,
            paymentId: enrollment.paymentId || null,
            date: enrollment.enrolledAt,
          };
        })
      );
      
      return NextResponse.json({
        payments: paymentsData,
        total: paymentsData.length,
        totalRevenue: paymentsData
          .filter(p => p.status === 'paid')
          .reduce((sum, p) => sum + p.amount, 0),
      });
    }
    
    // Fetch related data for each payment
    const paymentsData = await Promise.all(
      payments.map(async (payment) => {
        const user = await db.collection<User>('users')
          .findOne({ _id: payment.userId });
        
        const enrollment = await db.collection<Enrollment>('enrollments')
          .findOne({ _id: payment.enrollmentId });
        
        let course = null;
        if (enrollment) {
          course = await db.collection<Course>('courses')
            .findOne({ _id: enrollment.courseId });
        }
        
        return {
          id: payment._id?.toString(),
          userName: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
          userEmail: user?.email || 'N/A',
          courseName: course?.name || 'Unknown Course',
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          paymentMethod: payment.paymentMethod,
          paymentIntentId: payment.paymentIntentId,
          date: payment.createdAt,
        };
      })
    );
    
    return NextResponse.json({
      payments: paymentsData,
      total: paymentsData.length,
      totalRevenue: paymentsData
        .filter(p => p.status === 'succeeded' || p.status === 'paid')
        .reduce((sum, p) => sum + p.amount, 0),
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);
