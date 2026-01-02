import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'parent' | 'teacher' | 'admin';
  qrCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Child {
  _id?: ObjectId;
  userId: ObjectId;
  name: string;
  age: number;
  grade?: string;
  qrCode?: string;
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
  lessons?: Lesson[];
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
  originalAmount?: number;
  discountApplied?: number;
  couponCode?: string;
  enrolledAt: Date;
  startDate?: Date;
  completedAt?: Date;
  progress?: number; // 0-100
  certificateIssued?: boolean;
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

export interface Attendance {
  _id?: ObjectId;
  childId: ObjectId;
  userId: ObjectId; // Parent ID
  courseId?: ObjectId;
  checkInTime: Date;
  checkOutTime?: Date;
  checkInTeacherId: ObjectId;
  checkOutTeacherId?: ObjectId;
  status: 'checked-in' | 'completed';
  notes?: string;
  checkInLocation?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  checkOutLocation?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  checkInPhotoUrl?: string;
  checkOutPhotoUrl?: string;
}

export interface Message {
  _id?: ObjectId;
  senderId: ObjectId;
  receiverId: ObjectId;
  courseId?: ObjectId;
  content: string;
  read: boolean;
  readAt?: Date;
  createdAt: Date;
  attachments?: MessageAttachment[];
  messageType?: 'text' | 'homework' | 'file';
}

export interface MessageAttachment {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

export interface Job {
  _id?: ObjectId;
  jobId: string; // Unique job identifier (e.g., "JOB-001")
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  department: string;
  experienceLevel: 'entry' | 'mid' | 'senior';
  salaryRange?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobApplication {
  _id?: ObjectId;
  jobId: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  resumeFileName: string;
  coverLetter?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  status: 'pending' | 'under-review' | 'shortlisted' | 'rejected' | 'accepted';
  reviewNotes?: string;
  createdAt: Date;
}

// Coupon System
export interface Coupon {
  _id?: ObjectId;
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // percentage (0-100) or fixed amount
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;
  usedCount: number;
  applicableCourses?: ObjectId[]; // Empty means all courses
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Lesson/Module System
export interface Lesson {
  _id?: ObjectId;
  courseId: ObjectId;
  title: string;
  description: string;
  order: number;
  duration?: number; // in minutes
  videoUrl?: string;
  videoProvider?: 'youtube' | 'vimeo' | 'custom';
  content?: string; // HTML or markdown content
  resources?: LessonResource[];
  assignmentId?: ObjectId;
  quizId?: ObjectId;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonResource {
  name: string;
  type: 'pdf' | 'link' | 'document' | 'other';
  url: string;
}

// Progress Tracking
export interface Progress {
  _id?: ObjectId;
  enrollmentId: ObjectId;
  userId: ObjectId;
  courseId: ObjectId;
  lessonId: ObjectId;
  status: 'not-started' | 'in-progress' | 'completed';
  completedAt?: Date;
  timeSpent?: number; // in seconds
  lastAccessedAt: Date;
  createdAt: Date;
}

// Certificate
export interface Certificate {
  _id?: ObjectId;
  enrollmentId: ObjectId;
  userId: ObjectId;
  childId?: ObjectId;
  courseId: ObjectId;
  certificateNumber: string;
  issuedDate: Date;
  certificateUrl?: string;
  createdAt: Date;
}

// Live Class Scheduling
export interface LiveClass {
  _id?: ObjectId;
  courseId: ObjectId;
  batchId?: ObjectId;
  title: string;
  description?: string;
  instructorId: ObjectId;
  scheduledAt: Date;
  duration: number; // in minutes
  meetingLink?: string;
  meetingPassword?: string;
  maxParticipants?: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  recordingUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Assignment System
export interface Assignment {
  _id?: ObjectId;
  courseId: ObjectId;
  lessonId?: ObjectId;
  title: string;
  description: string;
  instructions?: string;
  dueDate?: Date;
  maxScore: number;
  attachments?: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AssignmentSubmission {
  _id?: ObjectId;
  assignmentId: ObjectId;
  enrollmentId: ObjectId;
  userId: ObjectId;
  childId?: ObjectId;
  submittedFiles?: string[];
  submittedText?: string;
  submittedAt: Date;
  score?: number;
  feedback?: string;
  gradedBy?: ObjectId;
  gradedAt?: Date;
  status: 'submitted' | 'graded' | 'resubmit-requested';
}

// Quiz and Assessment System
export interface Quiz {
  _id?: ObjectId;
  courseId: ObjectId;
  lessonId?: ObjectId;
  title: string;
  description?: string;
  instructions?: string;
  duration?: number; // in minutes
  passingScore: number;
  maxAttempts?: number;
  questions: QuizQuestion[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[]; // for multiple-choice
  correctAnswer?: string | number; // index for multiple-choice, text for others
  points: number;
  explanation?: string;
}

export interface QuizAttempt {
  _id?: ObjectId;
  quizId: ObjectId;
  enrollmentId: ObjectId;
  userId: ObjectId;
  childId?: ObjectId;
  answers: QuizAnswer[];
  startedAt: Date;
  submittedAt?: Date;
  score?: number;
  totalPoints: number;
  passed: boolean;
  attemptNumber: number;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | number;
  isCorrect?: boolean;
  pointsEarned?: number;
}

// Email Notification Templates
export interface EmailNotification {
  _id?: ObjectId;
  userId: ObjectId;
  email: string;
  type: 'enrollment' | 'payment' | 'course-start' | 'assignment-due' | 'grade-posted' | 'certificate-issued' | 'live-class-reminder' | 'course-completion';
  subject: string;
  content: string;
  status: 'pending' | 'sent' | 'failed';
  sentAt?: Date;
  error?: string;
  createdAt: Date;
}
