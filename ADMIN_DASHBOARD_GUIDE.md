# Admin Dashboard Guide

This guide explains how to use the admin dashboard to manage students, view payments, track attendance, and generate reports.

## Features

The admin dashboard provides the following functionality:

1. **Student Management** - View all registered students with their children and enrollment information
2. **Payment Tracking** - View all payments with filtering and search capabilities
3. **Attendance Reports** - Track student attendance with detailed statistics
4. **Comprehensive Reports** - Generate analytics and insights about the academy

## Accessing the Admin Dashboard

### Creating an Admin User

To create an admin user, run the following command:

```bash
npm run create-admin
```

This will create an admin user with the following credentials:
- Email: `admin@nextgen.com`
- Password: `admin123`

**Important:** Change the password after first login!

### Logging In

1. Navigate to `/login`
2. Enter the admin credentials
3. You will be automatically redirected to `/admin/dashboard`

## Admin Dashboard Pages

### 1. Dashboard Home (`/admin/dashboard`)

The main dashboard provides:
- Overview statistics (total students, active enrollments, revenue, attendance)
- Quick access links to all admin sections
- Links to existing admin tools (job management, applications)

### 2. Students List (`/admin/dashboard/students`)

View all registered students with:
- Name, email, and phone information
- Number of children registered
- Number of course enrollments
- Registration date
- Search functionality to find specific students

### 3. Payments (`/admin/dashboard/payments`)

Track all payments with:
- Student name and email
- Course purchased
- Payment amount (with discount information)
- Payment status (paid, pending, failed, refunded)
- Payment date
- Total revenue calculation
- Search and filter by status

### 4. Attendance Reports (`/admin/dashboard/attendance`)

Monitor attendance with:
- Child name and age
- Parent information
- Course name
- Check-in and check-out times
- Duration calculation
- Teacher information
- Statistics (total, completed, active, average duration)
- Search and filter by status

### 5. Detailed Reports (`/admin/dashboard/reports`)

Generate comprehensive analytics including:
- Overall statistics (students, enrollments, revenue, attendance)
- Enrollments by course (visual breakdown)
- Key metrics:
  - Enrollment rate per student
  - Completion rate
  - Average revenue per student
  - Attendance completion rate

## API Endpoints

The following admin API endpoints are available:

### Students
```
GET /api/admin/students
Authorization: Bearer {token}
```

Returns list of all students with their children and enrollment counts.

### Payments
```
GET /api/admin/payments
Authorization: Bearer {token}
```

Returns list of all payments with student and course information.

### Attendance
```
GET /api/admin/attendance
Authorization: Bearer {token}
Query Parameters:
  - startDate (optional): Filter by start date
  - endDate (optional): Filter by end date
  - childId (optional): Filter by specific child
```

Returns attendance records with statistics.

### Reports
```
GET /api/admin/reports
Authorization: Bearer {token}
Query Parameters:
  - userId (optional): Get detailed report for specific user
```

Returns summary statistics or detailed user report.

## Security

- All admin endpoints are protected by the `withAdminAuth` middleware
- Only users with `role: 'admin'` can access these endpoints
- JWT token authentication is required
- Unauthorized access returns 403 Forbidden

## Development

To add new admin features:

1. Create API endpoint in `/app/api/admin/`
2. Use `withAdminAuth` middleware for protection
3. Create UI page in `/app/admin/dashboard/`
4. Add role check in the page component
5. Link from main dashboard

## Notes

- The Payment model has been created to support payment tracking
- Payments are currently sourced from enrollments if no separate payment records exist
- All monetary values are stored in cents (divide by 100 for display)
- Dates are formatted using JavaScript's `toLocaleDateString()` and `toLocaleTimeString()`
