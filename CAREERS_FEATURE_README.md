# Careers Page Feature Documentation

This document describes the newly implemented careers page feature that allows NextGen STEM Academy to post job openings and manage applications.

## Overview

The careers page system consists of:
- **Public-facing careers page** (`/careers`) - Displays active job listings
- **Job detail and application page** (`/careers/[id]`) - Shows job details and application form
- **Admin job management** (`/admin/jobs`) - Create, edit, and manage job postings
- **Admin applications review** (`/admin/applications`) - Review and manage job applications

## Features

### For Job Seekers

1. **Browse Jobs** - Visit `/careers` to see all active job openings
2. **Filter Jobs** - Filter by department and job type
3. **View Job Details** - Click on any job to see full details including:
   - Job description
   - Requirements
   - Responsibilities
   - Location
   - Job type (full-time, part-time, contract, internship)
   - Experience level
   - Salary range (optional)
4. **Apply for Jobs** - Fill out the application form with:
   - Personal information (name, email, phone)
   - Resume upload (PDF, DOC, DOCX - max 5MB)
   - Cover letter (optional)
   - LinkedIn profile URL (optional)
   - Portfolio/website URL (optional)

### For Administrators

1. **Manage Jobs** - Access via `/admin/jobs` or Dashboard admin tools
   - Create new job postings
   - Edit existing jobs
   - Activate/deactivate jobs
   - Delete jobs
   - View all jobs in a table

2. **Review Applications** - Access via `/admin/applications` or Dashboard admin tools
   - View all applications with filtering by status
   - Review candidate details
   - Download resumes
   - Update application status:
     - Pending
     - Under Review
     - Shortlisted
     - Rejected
     - Accepted
   - Add internal review notes

## Database Schema

### Job Model
```typescript
{
  _id: ObjectId
  jobId: string           // Unique identifier (e.g., "JOB-001")
  title: string           // Job title
  description: string     // Full job description
  requirements: string[]  // List of requirements
  responsibilities: string[] // List of responsibilities
  location: string        // Job location
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship'
  department: string      // Department name
  experienceLevel: 'entry' | 'mid' | 'senior'
  salaryRange?: string    // Optional salary range
  active: boolean         // Whether job is visible
  createdAt: Date
  updatedAt: Date
}
```

### JobApplication Model
```typescript
{
  _id: ObjectId
  jobId: ObjectId         // Reference to Job
  firstName: string
  lastName: string
  email: string
  phone: string
  resumeUrl: string       // URL to download resume
  resumeFileName: string  // Original filename
  coverLetter?: string    // Optional cover letter
  linkedinUrl?: string    // Optional LinkedIn URL
  portfolioUrl?: string   // Optional portfolio URL
  status: 'pending' | 'under-review' | 'shortlisted' | 'rejected' | 'accepted'
  reviewNotes?: string    // Internal admin notes
  createdAt: Date
}
```

### Resume Storage
Resumes are stored in a `resumes` collection with:
```typescript
{
  _id: ObjectId
  fileName: string
  fileType: string
  fileSize: number
  fileData: string        // Base64 encoded file
  uploadedAt: Date
}
```

## API Endpoints

### Public Endpoints

- **GET /api/jobs** - Get all jobs (add `?active=true` for active only)
- **GET /api/jobs/[id]** - Get specific job details
- **POST /api/job-applications** - Submit a job application
- **POST /api/upload-resume** - Upload a resume file
- **GET /api/upload-resume/[id]** - Download a resume file

### Admin-Only Endpoints (Requires Authentication)

- **POST /api/jobs** - Create a new job posting
- **PUT /api/jobs/[id]** - Update a job posting
- **DELETE /api/jobs/[id]** - Delete a job posting
- **GET /api/job-applications** - Get all applications
- **GET /api/job-applications/[id]** - Get specific application
- **PUT /api/job-applications/[id]** - Update application status
- **DELETE /api/job-applications/[id]** - Delete an application

## Admin Access

To access admin features, users must:
1. Be logged in
2. Have `role: 'admin'` in their user profile

Admin users will see additional "Admin Tools" on their dashboard with links to:
- Manage Jobs
- Review Applications

## Navigation

The careers page is accessible from:
- Main navigation bar (Careers link)
- Homepage (can add a CTA section if needed)

## Usage Instructions

### For Administrators

#### Creating a New Job
1. Log in with an admin account
2. Go to Dashboard → Admin Tools → Manage Jobs
3. Click "Create New Job"
4. Fill in the job details:
   - Job ID (unique identifier)
   - Job Title
   - Description
   - Department
   - Location
   - Job Type
   - Experience Level
   - Salary Range (optional)
   - Requirements (add multiple)
   - Responsibilities (add multiple)
5. Check "Set job as active" to make it visible immediately
6. Click "Create Job"

#### Managing Applications
1. Log in with an admin account
2. Go to Dashboard → Admin Tools → Review Applications
3. Filter applications by status if needed
4. Click "Review" on any application to:
   - View candidate details
   - Download resume
   - View cover letter and additional information
   - Update application status
   - Add review notes
5. Click "Update Status" to save changes

### For Job Seekers

#### Applying for a Job
1. Visit `/careers` or click Careers in the navigation
2. Browse available jobs or use filters
3. Click "View Details & Apply" on a job
4. Read the job details carefully
5. Click "Apply for this Position"
6. Fill out the application form:
   - Enter your personal information
   - Upload your resume (PDF, DOC, or DOCX)
   - Add a cover letter (optional but recommended)
   - Add LinkedIn/portfolio links if applicable
7. Click "Submit Application"
8. You'll see a confirmation message

## Security Considerations

- Resume files are validated for type (PDF, DOC, DOCX) and size (max 5MB)
- Admin endpoints are protected with JWT authentication
- Only users with `role: 'admin'` can access admin features
- File uploads are stored as base64 in MongoDB (consider moving to cloud storage for production)

## Future Enhancements

Potential improvements:
1. Email notifications for new applications
2. Application tracking for candidates
3. Advanced search and filtering
4. Bulk actions for applications
5. Integration with cloud storage (S3, GCS) for resumes
6. Analytics dashboard for hiring metrics
7. Automated application screening
8. Interview scheduling system

## Testing

To test the feature:
1. Create an admin user in the database with `role: 'admin'`
2. Log in with the admin account
3. Create a test job posting
4. Log out and view the careers page
5. Submit a test application
6. Log back in as admin and review the application

## Notes

- The feature is fully integrated with the existing authentication system
- All pages are responsive and mobile-friendly
- The UI follows the existing design system
- TypeScript types are defined in `/types/index.ts`
- Database models are in `/models/Job.ts` and `/models/JobApplication.ts`
