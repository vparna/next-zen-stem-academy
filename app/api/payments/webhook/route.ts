import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateEnrollment, getEnrollmentById } from '@/models/Enrollment';
import { getCourseById } from '@/models/Course';
import { findUserById } from '@/models/User';
import { incrementCouponUsage } from '@/models/Coupon';
import { sendNotificationEmail } from '@/lib/email/service';
import { ObjectId } from 'mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-12-15.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);
        
        const { userId, courseId, courseName, couponCode } = paymentIntent.metadata;
        
        // If enrollment exists, update it
        // In production, you'd store enrollmentId in metadata during payment intent creation
        // For now, we'll send email notification
        
        if (userId && courseId) {
          const user = await findUserById(userId);
          const course = await getCourseById(courseId);
          
          if (user && course) {
            // Send payment confirmation email
            await sendNotificationEmail(
              new ObjectId(userId),
              user.email,
              'payment',
              {
                userName: `${user.firstName} ${user.lastName}`,
                courseName: course.name,
                amount: paymentIntent.amount / 100, // Convert from cents
              }
            );
            
            // Send enrollment confirmation email
            await sendNotificationEmail(
              new ObjectId(userId),
              user.email,
              'enrollment',
              {
                userName: `${user.firstName} ${user.lastName}`,
                courseName: course.name,
              }
            );
          }
          
          // Increment coupon usage if coupon was applied
          if (couponCode) {
            await incrementCouponUsage(couponCode);
          }
        }
        
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', paymentIntent.id);
        
        // Update enrollment to failed status if needed
        
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
