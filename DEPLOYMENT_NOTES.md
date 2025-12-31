# Deployment Notes - MongoDB Configuration

## Database Information

- **Database Name**: `NextGen`
- **MongoDB Atlas Cluster**: `nextgen.3wpuxv4.mongodb.net`

## Local Development Setup

For local development, copy `.env.example` to `.env.local` and update the MongoDB URI:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and set:
```env
MONGODB_URI=mongodb://localhost:27017/NextGen
# OR for MongoDB Atlas development:
# MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/NextGen?retryWrites=true&w=majority
```

## Production Deployment (Vercel)

For production deployment on Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add/Update the following environment variable:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://Vercel-Admin-NextGen:1yLXJlV42S5rdzgc@nextgen.3wpuxv4.mongodb.net/NextGen?retryWrites=true&w=majority`
   - **Environments**: Select Production, Preview, and Development as needed

4. Redeploy your application for the changes to take effect

## Vercel Environment Variables Reference

The `vercel.json` file references environment variables using the `@` syntax:
- `@mongodb_uri` - Should be configured in Vercel dashboard as `MONGODB_URI`

## Security Notes

- **Never commit** actual credentials to version control
- The `.env.local` file is git-ignored and safe for local credentials
- Production credentials should only be configured in Vercel's dashboard
- Example files (`.env.example`, README.md) use placeholder values only

## Database Structure

The application uses MongoDB with the database name `NextGen`. The database is automatically selected from the connection URI. All collections are created automatically when data is first inserted:

- `users` - User accounts
- `courses` - Course catalog
- `enrollments` - Student enrollments
- `jobs` - Job postings
- `job-applications` - Job applications
- Other collections as needed by the application

## Migration from Old Database

If you're migrating from a previous database name (e.g., `next-zen-stem-academy` or `next-gen-stem-academy`), you'll need to:

1. Export data from the old database
2. Import data into the new `NextGen` database
3. Or update the connection string to point to the new database and let the application recreate collections

For MongoDB Atlas, you can use MongoDB Compass or the MongoDB CLI tools to migrate data between databases.
