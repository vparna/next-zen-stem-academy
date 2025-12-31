# MongoDB Schema Setup Guide

## Overview

This guide explains how to properly set up and initialize your MongoDB database for the NextGen STEM Academy application. The database name should be **NextGen** as configured in the application.

## Automatic Initialization (Recommended)

**Good news!** As of the latest version, database initialization happens **automatically during deployment**. When you deploy to Vercel or run `npm run build`, all database collections will be created automatically.

The build process will:
1. ✅ Create all 16 required collections
2. ✅ Set up indexes for optimized queries
3. ✅ Seed initial data (6 courses and 5 job listings)
4. ✅ Validate the database structure

Simply deploy your application with the `MONGODB_URI` environment variable configured, and all collections will be created automatically!

## Manual Initialization (Optional)

If you need to initialize the database manually for local development or troubleshooting, follow the instructions below.

## Problem

MongoDB doesn't automatically create collections (tables) until data is inserted. This means when you first connect to MongoDB Atlas, you'll only see the default `admin` and `local` databases, and no application-specific collections in the `NextGen` database.

## Solution

We've created a comprehensive database initialization script that:

1. ✅ Creates all required collections
2. ✅ Sets up indexes for optimized queries
3. ✅ Seeds initial data (courses and jobs)
4. ✅ Validates the database structure

## Collections Created

The initialization script creates the following collections:

1. **users** - User accounts and authentication
2. **courses** - Available courses (Robotics, Maths, Chess)
3. **enrollments** - Student course enrollments
4. **children** - Parent-child relationships
5. **certificates** - Course completion certificates
6. **lessons** - Course lessons and content
7. **quizzes** - Quiz questions and assessments
8. **assignments** - Course assignments
9. **assignment_submissions** - Student assignment submissions
10. **attendances** - Class attendance tracking
11. **progress** - Student learning progress
12. **live_classes** - Live class schedules
13. **messages** - Internal messaging system
14. **jobs** - Career opportunities listings
15. **job_applications** - Job application submissions
16. **coupons** - Discount coupons

## Prerequisites (For Manual Initialization Only)

**Note**: Manual initialization is only needed if you want to initialize the database before deployment or for local development. During Vercel deployment, this happens automatically.

Before running the initialization script manually, ensure you have:

1. ✅ MongoDB Atlas cluster created (or local MongoDB installed)
2. ✅ Connection string with database name "NextGen"
3. ✅ Environment variables configured (`.env.local` file)
4. ✅ Node.js and npm installed

## Step-by-Step Manual Setup

**Note**: These steps are optional. The database will be initialized automatically during deployment.

### Option 1: Local Development

#### Step 1: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
MONGODB_URI=mongodb://localhost:27017/NextGen
JWT_SECRET=your-super-secret-jwt-key-change-this-must-be-at-least-32-characters-long
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Step 2: Start MongoDB

```bash
mongod --dbpath /path/to/your/data/directory
```

#### Step 3: Run Initialization Script

```bash
npm run init-db
```

#### Step 4: Verify Setup

The script will output:
- Number of collections created
- Number of indexes created
- Number of documents seeded
- Summary of all collections and document counts

### Option 2: MongoDB Atlas (Production/Staging)

#### Step 1: Configure MongoDB Atlas Connection String

Make sure your connection string includes the database name "NextGen":

```
mongodb+srv://username:password@cluster.mongodb.net/NextGen?retryWrites=true&w=majority
```

**Important Notes:**
- The database name `NextGen` must be specified in the URI path
- Network access must be configured (IP whitelist or allow all: `0.0.0.0/0`)
- Database user must have read/write permissions

#### Step 2: Set Environment Variables

**For Local Testing with Atlas:**

Create `.env.local`:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/NextGen?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-must-be-at-least-32-characters-long
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**For Vercel Deployment:**

1. Go to Vercel Dashboard
2. Select your project
3. Navigate to Settings → Environment Variables
4. Add the following:

| Variable | Value | Environment |
|----------|-------|-------------|
| `MONGODB_URI` | Your MongoDB Atlas connection string with `/NextGen` | Production, Preview, Development |
| `JWT_SECRET` | Strong random string (min 32 chars) | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | Your Vercel deployment URL | Production, Preview, Development |

#### Step 3: Run Initialization Script

**Locally (to initialize Atlas database):**

```bash
npm run init-db
```

**On Vercel (via one-time script):**

You can run the initialization script locally pointing to your Atlas database, or create a temporary API route to run it once:

1. Deploy your app to Vercel first
2. Run the script locally with the Atlas connection string
3. Verify in MongoDB Atlas that collections are created

#### Step 4: Verify in MongoDB Atlas

1. Go to MongoDB Atlas Dashboard
2. Click on "Browse Collections"
3. Select the "NextGen" database
4. You should now see all 16 collections with initial data

## What Gets Created

### Collections with Indexes

Each collection is created with appropriate indexes for optimal query performance:

- **users**: Indexed by email (unique), createdAt
- **courses**: Indexed by category, active status, createdAt
- **enrollments**: Indexed by userId, courseId, enrollmentDate
- **certificates**: Indexed by userId, enrollmentId (unique), certificateNumber (unique)
- **jobs**: Indexed by jobId (unique), department, jobType, active status
- And many more...

### Initial Seed Data

The script seeds:
- **6 Sample Courses**: 2 Robotics, 2 Maths, 2 Chess courses
- **5 Sample Jobs**: Various positions (Instructor, Teacher, Coach, Coordinator, Intern)

## Verification

After running the initialization script, verify the setup:

### Check Collections

The script outputs a summary showing:
```
📋 Database Summary
----------------------------------------------------------
  Total collections: 16
  - users: 0 documents
  - courses: 6 documents
  - enrollments: 0 documents
  - children: 0 documents
  - certificates: 0 documents
  - lessons: 0 documents
  - quizzes: 0 documents
  - assignments: 0 documents
  - assignment_submissions: 0 documents
  - attendances: 0 documents
  - progress: 0 documents
  - live_classes: 0 documents
  - messages: 0 documents
  - jobs: 5 documents
  - job_applications: 0 documents
  - coupons: 0 documents
```

### Test the Application

1. **Start the app**: `npm run dev`
2. **Test Signup**: Go to `/signup` and create a new user
3. **Test Login**: Log in with the created user
4. **View Courses**: Navigate to `/courses` to see seeded courses
5. **View Careers**: Navigate to `/careers` to see job listings

## Troubleshooting

### Issue: "Collection already exists" messages

**Solution**: This is normal. The script checks for existing collections and skips creation if they already exist. Your data is safe.

### Issue: Connection timeout or authentication error

**Solutions**:
- Verify your MongoDB URI is correct
- Check network access settings in MongoDB Atlas (whitelist your IP or use 0.0.0.0/0)
- Verify database user credentials and permissions
- Ensure the database name "NextGen" is in the connection string

### Issue: "Cannot find module" error

**Solution**: Install dependencies first:
```bash
npm install
```

### Issue: Collections created but no data

**Solution**: The script only seeds courses and jobs. Other collections will be populated as users interact with the application:
- **users**: Created when users sign up
- **enrollments**: Created when users enroll in courses
- **certificates**: Created when courses are completed
- etc.

## Manual Verification in MongoDB Atlas

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click on your cluster
3. Click "Browse Collections"
4. Select the "NextGen" database from the dropdown
5. You should see all collections listed
6. Click on "courses" to see the 6 seeded courses
7. Click on "jobs" to see the 5 seeded jobs

## Re-running the Script

The script is **idempotent**, meaning you can run it multiple times safely:

- Existing collections won't be recreated
- Existing indexes won't be duplicated
- Data won't be re-seeded if collections already have documents

To completely reset the database:

1. In MongoDB Atlas, delete the "NextGen" database
2. Run the initialization script again

## Additional Commands

### Seed Only Courses
```bash
npm run seed
```

### Seed Only Jobs
```bash
npm run seed-jobs
```

### Validate Environment Variables
```bash
npm run validate-env
```

### Pre-Deployment Check
```bash
npm run pre-deploy-check
```

## Production Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user with read/write permissions created
- [ ] Network access configured (0.0.0.0/0 for serverless functions)
- [ ] Connection string includes database name "NextGen"
- [ ] Environment variables set in Vercel
- [ ] Initialization script run successfully
- [ ] Collections visible in MongoDB Atlas
- [ ] Sample courses and jobs visible in collections
- [ ] Application deployed to Vercel
- [ ] Signup/Login tested on production

## Need Help?

If you encounter issues:

1. Check the MongoDB connection string format
2. Verify network access settings in MongoDB Atlas
3. Ensure environment variables are properly set
4. Check the console output for specific error messages
5. Verify Node.js and npm versions are up to date

## Next Steps

After successful initialization:

1. ✅ Deploy to Vercel (if not already done)
2. ✅ Test user signup and authentication
3. ✅ Test course enrollment flow
4. ✅ Configure Stripe for payments (optional)
5. ✅ Set up custom domain (optional)

---

**Note**: The database schema is flexible and will automatically accommodate new fields as the application evolves. MongoDB's schemaless nature means you don't need to modify the database structure for minor changes.
