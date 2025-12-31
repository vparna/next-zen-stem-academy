# Automatic Database Collection Deployment

## Overview

All MongoDB database collections are now automatically deployed during the build process. You no longer need to manually run `npm run init-db` after deploying to Vercel or other hosting platforms.

## What Changed

**Previous Behavior:**
- Only the `users` collection was created automatically (when first user signed up)
- Other 15 collections had to be created manually by running `npm run init-db`
- This required manual intervention after each deployment

**New Behavior:**
- All 16 database collections are created automatically during the build process
- Indexes are set up automatically
- Initial seed data (courses and jobs) is inserted automatically
- No manual intervention required

## How It Works

The build process has been updated to run the database initialization script after the Next.js build completes:

```json
{
  "scripts": {
    "build": "next build && npm run postbuild",
    "postbuild": "tsx scripts/init-database.ts"
  }
}
```

When you deploy to Vercel:
1. Vercel runs `npm run build`
2. Next.js builds the application
3. The `postbuild` script runs automatically
4. Database collections are created (if they don't exist)
5. Indexes are created
6. Seed data is inserted (if collections are empty)

## Database Collections Created

All 16 collections are created automatically:

1. **users** - User accounts and authentication
2. **courses** - Available courses (6 sample courses included)
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
14. **jobs** - Career opportunities listings (5 sample jobs included)
15. **job_applications** - Job application submissions
16. **coupons** - Discount coupons

## Idempotent Design

The initialization script is designed to be idempotent, meaning:
- It can be run multiple times safely
- Existing collections are not modified
- Existing indexes are not duplicated
- Seed data is only inserted if collections are empty

This ensures that redeployments won't cause issues with existing data.

## Requirements

For automatic deployment to work, ensure you have:

1. ✅ `MONGODB_URI` environment variable configured in Vercel
2. ✅ MongoDB Atlas network access allows connections from `0.0.0.0/0` (for Vercel serverless functions)
3. ✅ Database user has read/write permissions

## Verifying Deployment

After deploying to Vercel, verify that all collections were created:

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to your cluster → Browse Collections
3. Select the "NextGen" database
4. Confirm all 16 collections are visible
5. Check that:
   - `courses` collection has 6 documents (sample courses)
   - `jobs` collection has 5 documents (sample jobs)

## Troubleshooting

If collections are not created after deployment:

1. **Check Vercel deployment logs:**
   - Go to Vercel Dashboard → Deployments → View Function Logs
   - Look for database initialization output
   - Check for any error messages

2. **Verify environment variables:**
   - Ensure `MONGODB_URI` is set in Vercel environment variables
   - Verify the URI includes the database name `NextGen`
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/NextGen?retryWrites=true&w=majority`

3. **Check MongoDB Atlas settings:**
   - Verify network access allows `0.0.0.0/0`
   - Ensure database user has read/write permissions
   - Check if there are any connection issues

4. **Manual initialization (fallback):**
   - If automatic initialization fails, you can still run it manually:
   ```bash
   export MONGODB_URI="your-mongodb-uri"
   npm run init-db
   ```

## Benefits

✅ **Automated Deployment:** No manual steps required after deployment
✅ **Consistent Database Schema:** All collections are created with proper indexes
✅ **Sample Data Included:** Courses and jobs are seeded automatically
✅ **Safe for Redeployment:** Idempotent design prevents data loss
✅ **Time Saving:** Eliminates manual database setup steps

## Related Documentation

- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete deployment instructions
- [MONGODB_SETUP_GUIDE.md](MONGODB_SETUP_GUIDE.md) - Detailed MongoDB setup guide
- [VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md) - Pre-deployment checklist
