import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { withAuth } from '@/middleware/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-12-15.clover',
});

async function handler(req: NextRequest) {
  try {
    const user = (req as any).user;
    const { amount, courseId, courseName, couponCode, childrenCount } = await req.json();

    if (!amount || !courseId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let finalAmount = amount;
    let discountApplied = 0;
    let appliedCoupon = couponCode;

    // Apply multi-child discount (10% off for 2+ children, 15% off for 3+ children)
    if (childrenCount && childrenCount >= 2) {
      const multiChildDiscount = childrenCount >= 3 ? 0.15 : 0.10;
      discountApplied += amount * multiChildDiscount;
      finalAmount = amount - (amount * multiChildDiscount);
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        userId: user.userId,
        courseId,
        courseName: courseName || 'Course',
        originalAmount: amount.toString(),
        discountApplied: discountApplied.toString(),
        couponCode: appliedCoupon || '',
        childrenCount: childrenCount?.toString() || '0',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      originalAmount: amount,
      discountApplied,
      finalAmount,
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}

export const POST = withAuth(handler);
