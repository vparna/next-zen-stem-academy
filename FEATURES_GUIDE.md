# Advanced Features Implementation Guide

This document provides comprehensive information about the newly implemented features in NextGen STEM Academy.

## Table of Contents

1. [Multi-Child Discount Support](#multi-child-discount-support)
2. [Coupon System](#coupon-system)
3. [Email Notifications](#email-notifications)
4. [Course Completion Certificates](#course-completion-certificates)
5. [Progress Tracking](#progress-tracking)
6. [Video Lessons Integration](#video-lessons-integration)
7. [Live Class Scheduling](#live-class-scheduling)
8. [Assignment Submissions](#assignment-submissions)
9. [Quiz and Assessments](#quiz-and-assessments)

---

## Multi-Child Discount Support

### Overview
Parents enrolling multiple children in courses automatically receive discounts:
- **2 children**: 10% discount
- **3+ children**: 15% discount

### Implementation

**API Endpoint**: `POST /api/payments/create-intent`

**Request Body**:
```json
{
  "amount": 299.99,
  "courseId": "course_id_here",
  "courseName": "Robotics for Beginners",
  "childrenCount": 2
}
```

**Response**:
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx",
  "originalAmount": 299.99,
  "discountApplied": 30.00,
  "finalAmount": 269.99
}
```

### Database Fields
The `Enrollment` model now includes:
- `originalAmount`: The original course price
- `discountApplied`: Total discount amount
- `amount`: Final amount after discounts

---

## Coupon System

### Overview
Flexible coupon system supporting percentage and fixed-amount discounts with various validation rules.

### Coupon Model

```typescript
interface Coupon {
  code: string;                    // Unique coupon code (e.g., "SUMMER2024")
  discountType: 'percentage' | 'fixed';
  discountValue: number;           // Percentage (0-100) or fixed amount
  minPurchaseAmount?: number;      // Minimum purchase required
  maxDiscountAmount?: number;      // Maximum discount cap
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;             // Total usage limit
  usedCount: number;               // Current usage count
  applicableCourses?: ObjectId[];  // Empty = all courses
  active: boolean;
}
```

### API Endpoints

#### Validate Coupon
**Endpoint**: `POST /api/coupons/validate`

**Request Body**:
```json
{
  "code": "SUMMER2024",
  "courseId": "course_id_here",
  "amount": 299.99
}
```

**Response** (Success):
```json
{
  "valid": true,
  "coupon": {
    "code": "SUMMER2024",
    "discountType": "percentage",
    "discountValue": 20
  },
  "originalAmount": 299.99,
  "discount": 60.00,
  "finalAmount": 239.99
}
```

**Response** (Error):
```json
{
  "valid": false,
  "error": "Coupon has expired or is not yet valid"
}
```

### Creating Coupons

Use the Coupon model in your admin interface:

```typescript
import { createCoupon } from '@/models/Coupon';

await createCoupon({
  code: 'SUMMER2024',
  description: 'Summer 2024 Promotion',
  discountType: 'percentage',
  discountValue: 20,
  validFrom: new Date('2024-06-01'),
  validUntil: new Date('2024-08-31'),
  usageLimit: 100,
  usedCount: 0,
  active: true,
});
```

---

## Email Notifications

### Overview
Automated email notifications for key events in the learning journey.

### Configuration

Add to your `.env.local`:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Email Types

1. **Enrollment Confirmation**: Sent when a student enrolls in a course
2. **Payment Confirmation**: Sent when payment is successfully processed
3. **Course Start Reminder**: Sent before a course begins
4. **Assignment Due**: Reminder sent before assignment deadline
5. **Grade Posted**: Notification when assignment is graded
6. **Certificate Issued**: Sent when course completion certificate is ready
7. **Live Class Reminder**: Reminder before scheduled live class
8. **Course Completion**: Congratulations email on course completion

### Usage

```typescript
import { sendNotificationEmail } from '@/lib/email/service';
import { ObjectId } from 'mongodb';

await sendNotificationEmail(
  new ObjectId(userId),
  'user@example.com',
  'enrollment',
  {
    userName: 'John Doe',
    courseName: 'Robotics for Beginners',
  }
);
```

### Email Service

The email service automatically:
- Logs all emails to the database
- Handles failures gracefully
- Works in development mode without SMTP configuration
- Provides both HTML and plain text versions

---

## Course Completion Certificates

### Overview
Automatically generate and issue certificates when students complete courses.

### Certificate Model

```typescript
interface Certificate {
  enrollmentId: ObjectId;
  userId: ObjectId;
  childId?: ObjectId;
  courseId: ObjectId;
  certificateNumber: string;      // Unique identifier (e.g., "CERT-ABC123-XYZ")
  issuedDate: Date;
  certificateUrl?: string;        // URL to certificate PDF/image
}
```

### API Endpoints

#### Get User Certificates
**Endpoint**: `GET /api/certificates`

**Response**:
```json
{
  "certificates": [
    {
      "_id": "cert_id",
      "certificateNumber": "CERT-ABC123-XYZ",
      "courseId": "course_id",
      "issuedDate": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

#### Issue Certificate
**Endpoint**: `POST /api/certificates`

**Request Body**:
```json
{
  "enrollmentId": "enrollment_id_here"
}
```

**Response**:
```json
{
  "message": "Certificate issued successfully",
  "certificateId": "cert_id",
  "certificateNumber": "CERT-ABC123-XYZ"
}
```

### Features

- Unique certificate numbers generated automatically
- Email notification sent on certificate issuance
- Prevents duplicate certificates for same enrollment
- Requires course completion before issuance

---

## Progress Tracking

### Overview
Track student progress through course lessons and modules.

### Progress Model

```typescript
interface Progress {
  enrollmentId: ObjectId;
  userId: ObjectId;
  courseId: ObjectId;
  lessonId: ObjectId;
  status: 'not-started' | 'in-progress' | 'completed';
  completedAt?: Date;
  timeSpent?: number;             // in seconds
  lastAccessedAt: Date;
}
```

### API Endpoints

#### Get Progress
**Endpoint**: `GET /api/progress?enrollmentId={enrollmentId}`

**Response**:
```json
{
  "progress": [
    {
      "lessonId": "lesson_id",
      "status": "completed",
      "completedAt": "2024-01-10T00:00:00.000Z",
      "timeSpent": 1800
    }
  ]
}
```

#### Update Progress
**Endpoint**: `POST /api/progress`

**Request Body**:
```json
{
  "enrollmentId": "enrollment_id",
  "lessonId": "lesson_id",
  "status": "completed",
  "timeSpent": 1800
}
```

### Features

- Track time spent on each lesson
- Automatic progress calculation (percentage)
- Support for multiple lesson statuses
- Integration with enrollment model

---

## Video Lessons Integration

### Overview
Support for video-based learning with multiple video providers.

### Lesson Model

```typescript
interface Lesson {
  courseId: ObjectId;
  title: string;
  description: string;
  order: number;                   // Lesson order in course
  duration?: number;               // in minutes
  videoUrl?: string;
  videoProvider?: 'youtube' | 'vimeo' | 'custom';
  content?: string;                // HTML or markdown content
  resources?: LessonResource[];    // Additional resources (PDFs, links)
  assignmentId?: ObjectId;
  quizId?: ObjectId;
  active: boolean;
}
```

### API Endpoints

#### Get Course Lessons
**Endpoint**: `GET /api/lessons?courseId={courseId}`

**Response**:
```json
{
  "lessons": [
    {
      "_id": "lesson_id",
      "title": "Introduction to Robotics",
      "order": 1,
      "duration": 45,
      "videoUrl": "https://youtube.com/watch?v=...",
      "videoProvider": "youtube"
    }
  ]
}
```

### Features

- Support for YouTube, Vimeo, and custom video hosting
- Ordered lesson sequence
- Additional resources per lesson
- Link to assignments and quizzes
- Progress tracking integration

---

## Live Class Scheduling

### Overview
Schedule and manage live online classes with meeting links.

### LiveClass Model

```typescript
interface LiveClass {
  courseId: ObjectId;
  batchId?: ObjectId;
  title: string;
  description?: string;
  instructorId: ObjectId;
  scheduledAt: Date;
  duration: number;                // in minutes
  meetingLink?: string;            // Zoom, Google Meet, etc.
  meetingPassword?: string;
  maxParticipants?: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  recordingUrl?: string;           // Recording after class
}
```

### API Endpoints

#### Get Live Classes
**Endpoint**: `GET /api/live-classes?courseId={courseId}&upcoming=true`

**Response**:
```json
{
  "liveClasses": [
    {
      "_id": "class_id",
      "title": "Robotics Lab Session",
      "scheduledAt": "2024-01-20T15:00:00.000Z",
      "duration": 60,
      "meetingLink": "https://zoom.us/j/...",
      "status": "scheduled"
    }
  ]
}
```

### Features

- Schedule classes with date/time
- Store meeting links and passwords
- Filter upcoming classes
- Support for class recordings
- Email reminders before classes

---

## Assignment Submissions

### Overview
Create assignments and accept student submissions with grading.

### Assignment Model

```typescript
interface Assignment {
  courseId: ObjectId;
  lessonId?: ObjectId;
  title: string;
  description: string;
  instructions?: string;
  dueDate?: Date;
  maxScore: number;
  attachments?: string[];          // Teacher-provided files
  active: boolean;
}

interface AssignmentSubmission {
  assignmentId: ObjectId;
  enrollmentId: ObjectId;
  userId: ObjectId;
  submittedFiles?: string[];       // Student-uploaded files
  submittedText?: string;          // Text submission
  submittedAt: Date;
  score?: number;
  feedback?: string;
  gradedBy?: ObjectId;
  gradedAt?: Date;
  status: 'submitted' | 'graded' | 'resubmit-requested';
}
```

### API Endpoints

#### Get Assignments
**Endpoint**: `GET /api/assignments?courseId={courseId}`

**Response**:
```json
{
  "assignments": [
    {
      "_id": "assignment_id",
      "title": "Build a Simple Robot",
      "dueDate": "2024-01-25T23:59:59.000Z",
      "maxScore": 100
    }
  ]
}
```

#### Submit Assignment
**Endpoint**: `POST /api/assignments`

**Request Body**:
```json
{
  "assignmentId": "assignment_id",
  "enrollmentId": "enrollment_id",
  "submittedText": "My solution...",
  "submittedFiles": ["url1", "url2"]
}
```

### Features

- Support for text and file submissions
- Due date tracking
- Grading with feedback
- Resubmission support
- Email notifications on grading

---

## Quiz and Assessments

### Overview
Create quizzes with automatic grading and multiple question types.

### Quiz Model

```typescript
interface Quiz {
  courseId: ObjectId;
  lessonId?: ObjectId;
  title: string;
  description?: string;
  duration?: number;               // in minutes
  passingScore: number;
  maxAttempts?: number;
  questions: QuizQuestion[];
  active: boolean;
}

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[];              // for multiple-choice
  correctAnswer?: string | number;
  points: number;
  explanation?: string;
}

interface QuizAttempt {
  quizId: ObjectId;
  enrollmentId: ObjectId;
  userId: ObjectId;
  answers: QuizAnswer[];
  startedAt: Date;
  submittedAt?: Date;
  score?: number;
  totalPoints: number;
  passed: boolean;
  attemptNumber: number;
}
```

### API Endpoints

#### Get Quizzes
**Endpoint**: `GET /api/quizzes?courseId={courseId}`

**Response**:
```json
{
  "quizzes": [
    {
      "_id": "quiz_id",
      "title": "Robotics Fundamentals Quiz",
      "passingScore": 70,
      "maxAttempts": 3
    }
  ]
}
```

#### Submit Quiz
**Endpoint**: `POST /api/quizzes`

**Request Body**:
```json
{
  "quizId": "quiz_id",
  "enrollmentId": "enrollment_id",
  "answers": [
    {
      "questionId": "q1",
      "answer": 0
    }
  ]
}
```

**Response**:
```json
{
  "message": "Quiz submitted successfully",
  "attemptId": "attempt_id",
  "score": 85,
  "totalPoints": 100,
  "passed": true
}
```

### Features

- Multiple question types
- Automatic grading
- Attempt limits
- Passing score requirements
- Detailed feedback
- Quiz history tracking

---

## Integration Example

Here's how these features work together in a typical user flow:

1. **Enrollment**: User enrolls in a course (with multi-child discount if applicable)
2. **Payment**: Payment processed with coupon code → Email confirmation sent
3. **Course Access**: User can view video lessons and track progress
4. **Live Classes**: User attends scheduled live classes
5. **Assignments**: User completes and submits assignments
6. **Quizzes**: User takes quizzes to test knowledge
7. **Completion**: When progress reaches 100% → Certificate issued → Email sent

---

## Database Collections

The following MongoDB collections are used:

- `coupons`: Coupon definitions
- `lessons`: Course lessons and content
- `progress`: Student progress tracking
- `certificates`: Issued certificates
- `live_classes`: Scheduled live classes
- `assignments`: Assignment definitions
- `assignment_submissions`: Student submissions
- `quizzes`: Quiz definitions
- `quiz_attempts`: Student quiz attempts
- `email_notifications`: Email log

---

## Future Enhancements

Potential improvements:
- PDF certificate generation
- Advanced analytics dashboard
- Mobile app integration
- Calendar integration for live classes
- Discussion forums
- Peer review for assignments
- Adaptive learning paths

---

## Support

For questions or issues:
- Check the API documentation
- Review type definitions in `/types/index.ts`
- Check model implementations in `/models/`
- Review API routes in `/app/api/`
