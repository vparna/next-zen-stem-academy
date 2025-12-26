import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Child {
  _id?: ObjectId;
  userId: ObjectId;
  name: string;
  age: number;
  grade?: string;
  createdAt: Date;
}

export interface Course {
  _id?: ObjectId;
  name: string;
  category: 'Robotics' | 'Maths' | 'Chess' | 'Other';
  description: string;
  fullDescription: string;
  price: number;
  duration: string; // e.g., "12 weeks", "3 months"
  ageGroup: string; // e.g., "8-12 years"
  image?: string;
  features: string[];
  syllabus?: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Batch {
  _id?: ObjectId;
  courseId: ObjectId;
  name: string;
  startDate: Date;
  endDate: Date;
  schedule: string; // e.g., "Monday & Wednesday, 4-5 PM"
  maxStudents: number;
  enrolledStudents: number;
  active: boolean;
}

export interface Enrollment {
  _id?: ObjectId;
  userId: ObjectId;
  childId?: ObjectId;
  courseId: ObjectId;
  batchId?: ObjectId;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;
  amount: number;
  enrolledAt: Date;
  startDate?: Date;
  completedAt?: Date;
}

export interface Payment {
  _id?: ObjectId;
  userId: ObjectId;
  enrollmentId: ObjectId;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  paymentMethod: 'stripe' | 'razorpay';
  paymentIntentId?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}
