import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import { validateCoupon, calculateDiscount } from '@/models/Coupon';
import { ObjectId } from 'mongodb';

async function handler(req: NextRequest) {
  try {
    const { code, courseId, amount } = await req.json();
    
    if (!code || !courseId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const validation = await validateCoupon(code, new ObjectId(courseId), amount);
    
    if (!validation.valid) {
      return NextResponse.json(
        { valid: false, error: validation.error },
        { status: 400 }
      );
    }
    
    const discount = await calculateDiscount(validation.coupon!, amount);
    const finalAmount = amount - discount;
    
    return NextResponse.json({
      valid: true,
      coupon: {
        code: validation.coupon!.code,
        discountType: validation.coupon!.discountType,
        discountValue: validation.coupon!.discountValue,
      },
      originalAmount: amount,
      discount,
      finalAmount,
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const POST = withAuth(handler);
