import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Coupon } from '@/types';

const COLLECTION_NAME = 'coupons';

export async function createCoupon(couponData: Omit<Coupon, '_id' | 'createdAt' | 'updatedAt'>): Promise<ObjectId> {
  const db = await getDatabase();
  const now = new Date();
  
  const result = await db.collection<Coupon>(COLLECTION_NAME).insertOne({
    ...couponData,
    createdAt: now,
    updatedAt: now,
  });
  
  return result.insertedId;
}

export async function getCouponByCode(code: string): Promise<Coupon | null> {
  const db = await getDatabase();
  return db.collection<Coupon>(COLLECTION_NAME).findOne({ 
    code: code.toUpperCase(),
    active: true 
  });
}

export async function validateCoupon(
  code: string,
  courseId: ObjectId,
  purchaseAmount: number
): Promise<{ valid: boolean; coupon?: Coupon; error?: string }> {
  const coupon = await getCouponByCode(code);
  
  if (!coupon) {
    return { valid: false, error: 'Invalid coupon code' };
  }
  
  const now = new Date();
  if (now < coupon.validFrom || now > coupon.validUntil) {
    return { valid: false, error: 'Coupon has expired or is not yet valid' };
  }
  
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    return { valid: false, error: 'Coupon usage limit reached' };
  }
  
  if (coupon.minPurchaseAmount && purchaseAmount < coupon.minPurchaseAmount) {
    return { 
      valid: false, 
      error: `Minimum purchase amount of $${coupon.minPurchaseAmount} required` 
    };
  }
  
  // Check if coupon is applicable to the course
  if (coupon.applicableCourses && coupon.applicableCourses.length > 0) {
    const isApplicable = coupon.applicableCourses.some(id => id.equals(courseId));
    if (!isApplicable) {
      return { valid: false, error: 'Coupon not applicable to this course' };
    }
  }
  
  return { valid: true, coupon };
}

export async function calculateDiscount(
  coupon: Coupon,
  amount: number
): Promise<number> {
  if (coupon.discountType === 'percentage') {
    const discount = (amount * coupon.discountValue) / 100;
    return coupon.maxDiscountAmount 
      ? Math.min(discount, coupon.maxDiscountAmount)
      : discount;
  } else {
    // Fixed discount
    return Math.min(coupon.discountValue, amount);
  }
}

export async function incrementCouponUsage(code: string): Promise<boolean> {
  const db = await getDatabase();
  const result = await db.collection<Coupon>(COLLECTION_NAME).updateOne(
    { code: code.toUpperCase() },
    { 
      $inc: { usedCount: 1 },
      $set: { updatedAt: new Date() }
    }
  );
  
  return result.modifiedCount > 0;
}

export async function getAllCoupons(activeOnly = true): Promise<Coupon[]> {
  const db = await getDatabase();
  const query = activeOnly ? { active: true } : {};
  return db.collection<Coupon>(COLLECTION_NAME).find(query).toArray();
}

export async function updateCoupon(
  id: string | ObjectId,
  updates: Partial<Omit<Coupon, '_id' | 'createdAt'>>
): Promise<boolean> {
  const db = await getDatabase();
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const result = await db.collection<Coupon>(COLLECTION_NAME).updateOne(
    { _id: objectId },
    { $set: { ...updates, updatedAt: new Date() } }
  );
  
  return result.modifiedCount > 0;
}
