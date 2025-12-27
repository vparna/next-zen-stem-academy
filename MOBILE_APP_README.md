# Mobile Attendance & Chat App

## Overview

NextGen STEM Academy's mobile attendance and chat application provides a comprehensive solution for attendance tracking and communication between parents, students, and teachers.

## Features

### 1. QR Code-Based Attendance

#### For Parents/Guardians
- Generate unique QR codes for each child
- Display QR codes on mobile device for check-in/check-out
- View attendance history for all children
- See check-in and check-out times

#### For Teachers
- Scan student QR codes using device camera
- Support for both check-in and check-out modes
- Instant confirmation of attendance recording
- View active attendance records

### 2. Course-Based Messaging

#### For Parents/Students
- Send messages to teachers for enrolled courses
- View message history grouped by course
- Real-time message updates (auto-refresh every 5 seconds)
- Simple, mobile-friendly chat interface

#### For Teachers
- Receive and respond to messages from parents/students
- Organize conversations by course
- Track read/unread messages
- Professional communication channel

## Mobile Pages

### `/mobile` - Home Page
- Welcome screen with user information
- Quick access to all mobile features
- Role-specific navigation (Parent vs Teacher)
- Instructions for using the app

### `/mobile/qr-code` - Parent QR Display
- Select child from list
- Generate QR code for selected child
- Display large, scannable QR code
- Instructions for check-in/check-out process

### `/mobile/scanner` - Teacher Scanner
- Camera-based QR code scanner
- Toggle between check-in and check-out modes
- Real-time scanning feedback
- Success/error notifications

### `/mobile/attendance` - Attendance History
- View all attendance records
- Filter by child (for parents)
- See check-in and check-out times
- Status indicators (checked-in, completed)

### `/mobile/chat` - Messaging Interface
- Course-based chat rooms
- Send and receive messages
- Message timestamps
- Visual distinction between sent/received messages

## Technical Implementation

### QR Code System

**Format**: `TYPE:ID:TIMESTAMP`
- TYPE: CHILD or USER
- ID: MongoDB ObjectId
- TIMESTAMP: Unix timestamp for uniqueness

**Security Features**:
- QR codes validated against database
- Teacher authentication required for scanning
- Parent verification for QR generation

### API Endpoints

#### Attendance
- `POST /api/attendance` - Check in student
- `POST /api/attendance/checkout` - Check out student
- `GET /api/attendance?childId=<id>` - Get attendance for child
- `GET /api/attendance?active=true` - Get active attendance

#### QR Codes
- `GET /api/qrcode?childId=<id>` - Generate QR code for child

#### Messages
- `POST /api/messages` - Send a message
- `GET /api/messages?courseId=<id>` - Get messages for course
- `GET /api/messages?otherUserId=<id>` - Get conversation with user
- `GET /api/messages?unreadCount=true` - Get unread message count
- `POST /api/messages/read` - Mark message as read

### Database Collections

#### `attendances`
```typescript
{
  childId: ObjectId,
  userId: ObjectId,           // Parent ID
  courseId?: ObjectId,
  checkInTime: Date,
  checkOutTime?: Date,
  checkInTeacherId: ObjectId,
  checkOutTeacherId?: ObjectId,
  status: 'checked-in' | 'completed',
  notes?: string
}
```

#### `messages`
```typescript
{
  senderId: ObjectId,
  receiverId: ObjectId,
  courseId?: ObjectId,
  content: string,
  read: boolean,
  readAt?: Date,
  createdAt: Date
}
```

## User Roles

### Parent
- Default role for new registrations
- Can manage children
- Can generate QR codes
- Can view attendance history
- Can message teachers

### Teacher
- Selected during registration
- Can scan QR codes
- Can check in/out students
- Can view all attendance
- Can message parents/students

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install qrcode @types/qrcode html5-qrcode
   ```

2. **Environment Variables**
   No additional environment variables required beyond the existing setup.

3. **Database**
   The attendance and messages collections will be created automatically on first use.

## Usage Instructions

### For Parents

1. **First Time Setup**
   - Sign up and select "Parent/Guardian" role
   - Add your children in the dashboard
   - Navigate to Mobile → QR Code

2. **Daily Check-In/Out**
   - Open `/mobile/qr-code`
   - Select your child
   - Generate QR code
   - Show QR code to teacher

3. **View Attendance**
   - Open `/mobile/attendance`
   - Filter by child to see specific history
   - View check-in and check-out times

4. **Chat with Teachers**
   - Open `/mobile/chat`
   - Select course
   - Send message to teacher

### For Teachers

1. **First Time Setup**
   - Sign up and select "Teacher" role
   - Enroll in courses you teach
   - Navigate to Mobile → Scanner

2. **Daily Attendance**
   - Open `/mobile/scanner`
   - Select Check In or Check Out mode
   - Start scanner
   - Point camera at student QR code
   - Confirm success message

3. **View Attendance**
   - Open `/mobile/attendance`
   - View all active check-ins
   - Filter by specific students

4. **Chat with Parents**
   - Open `/mobile/chat`
   - Select course
   - View and respond to messages

## Mobile Optimization

- **Responsive Design**: All pages optimized for mobile screens
- **Touch-Friendly**: Large buttons and touch targets
- **Camera Access**: Native camera integration for QR scanning
- **Progressive Web App Ready**: Can be added to home screen
- **Offline-First Considerations**: Local storage for user data

## Security Features

- **JWT Authentication**: All API calls require valid JWT token
- **Role-Based Access**: Teachers and parents have different permissions
- **QR Code Validation**: Server-side validation of all QR scans
- **Child Verification**: Parents can only generate QR codes for their children
- **Teacher Authorization**: Only teachers can scan QR codes

## Future Enhancements

- [ ] Push notifications for check-in/out confirmations
- [ ] Offline QR code generation
- [ ] Geolocation verification for check-ins
- [ ] Photo capture during check-in
- [ ] Attendance reports and analytics
- [ ] Bulk messaging capabilities
- [ ] Video call integration
- [ ] Homework submission via chat

## Browser Compatibility

- **Recommended**: Chrome, Safari, Edge (latest versions)
- **Camera Required**: Device must have camera for QR scanning
- **LocalStorage**: Required for authentication tokens

## Troubleshooting

### QR Scanner Not Working
- Ensure camera permissions are granted
- Check browser compatibility
- Try refreshing the page
- Verify good lighting conditions

### Messages Not Sending
- Check internet connection
- Verify course enrollment
- Ensure valid authentication token
- Try logging in again

### QR Code Not Generating
- Verify child is added to account
- Check authentication status
- Ensure valid child ID

## Support

For technical support or feature requests:
- Email: support@nextzenstem.com
- Documentation: See main README.md

---

Built with ❤️ for NextGen STEM Academy
