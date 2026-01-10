# Deployment Guide for Next Zen Academy

## Overview

This application requires server-side rendering and database connectivity to function properly. The signup, login, and other dynamic features depend on API routes that run on a Node.js server.

## ✅ Recommended Deployment: Vercel

Vercel is the recommended platform for deploying this Next.js application because it:
- Natively supports Next.js server-side rendering and API routes
- Provides automatic deployments from GitHub
- Includes built-in environment variable management
- Offers zero-configuration setup

### Step-by-Step Vercel Deployment

#### 1. Prepare MongoDB Database

**Option A: MongoDB Atlas (Recommended for Production)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster or use an existing one
3. Create a database user with read/write permissions
4. Whitelist all IP addresses (0.0.0.0/0) for Vercel serverless functions
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/NextGen?retryWrites=true&w=majority`

**Important**: Make sure the database name `NextGen` is included in the connection string.

**Option B: Local MongoDB (Development Only)**
1. Install MongoDB locally
2. Start MongoDB: `mongod --dbpath /path/to/data`
3. Connection string: `mongodb://localhost:27017/NextGen`

#### 1.5. Database Schema Initialization

**Good news!** The database initialization now happens **automatically during deployment**. When you deploy to Vercel, all database collections will be created automatically.

The deployment build process will:
- ✅ Create all 16 required collections
- ✅ Set up indexes for optimized queries
- ✅ Seed initial data (6 courses and 5 job listings)
- ✅ Validate the database structure

**Manual initialization (optional)**: If you need to initialize the database manually for local development or testing:

```bash
# Set your MongoDB connection string
export MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/NextGen?retryWrites=true&w=majority"

# Run the initialization script
npm run init-db
```

**See [MONGODB_SETUP_GUIDE.md](MONGODB_SETUP_GUIDE.md) for detailed instructions and troubleshooting.**

#### 2. Deploy to Vercel

1. **Push your code to GitHub** (if not already done)
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "Add New Project"
   - Import your `next-zen-stem-academy` repository
   - Click "Import"

3. **Configure Environment Variables**
   
   Before deploying, add these environment variables in Vercel:
   
   | Variable Name | Value | Description |
   |--------------|-------|-------------|
   | `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/YourDatabaseName?retryWrites=true&w=majority` | Your MongoDB connection string. Replace `YourDatabaseName` with your preferred database name (e.g., `NextGen` or any name you choose) |
   | `JWT_SECRET` | `your-secret-key-here` | A random secret key for JWT tokens (use a strong random string, minimum 32 characters) |
   | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` (dev) or `pk_live_...` (prod) | Stripe publishable key. Use test keys for development/staging, live keys for production only |
   | `STRIPE_SECRET_KEY` | `sk_test_...` (dev) or `sk_live_...` (prod) | Stripe secret key. Use test keys for development/staging, live keys for production only |
   | `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Stripe webhook secret (optional for basic testing) |
   | `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | Your Vercel deployment URL |
   
   **How to add environment variables in Vercel:**
   - In your project dashboard, go to "Settings" → "Environment Variables"
   - Add each variable with its value
   - Select which environments (Production, Preview, Development) should use each variable

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)
   - Your app will be live at `https://your-project-name.vercel.app`

#### 3. Configure Stripe Webhooks (Optional but Recommended)

1. Go to your Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-project-name.vercel.app/api/payments/webhook`
3. Select events to listen for: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy the webhook signing secret
5. Add it as `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
6. Redeploy your application

#### 4. Test Your Deployment

1. **Verify Database Setup**
   - Log in to [MongoDB Atlas](https://cloud.mongodb.com)
   - Navigate to your cluster → Browse Collections
   - Confirm the "NextGen" database exists
   - Confirm all 16 collections are visible
   - Check that courses (6) and jobs (5) are seeded

2. **Test the Application**
   - Visit your deployed URL
   - Try to sign up with a new account
   - Verify that:
     - ✅ Signup form submits successfully
     - ✅ User is redirected to dashboard
     - ✅ User data is stored in MongoDB (check users collection)
     - ✅ JWT token is generated and stored
   - Navigate to `/courses` to see seeded courses
   - Navigate to `/careers` to see job listings

3. **Troubleshooting**
   - If collections don't appear, check Vercel deployment logs to see if the database initialization ran successfully
   - If connection fails, verify MONGODB_URI environment variable in Vercel settings
   - If no data appears, check MongoDB Atlas network access settings (ensure 0.0.0.0/0 is whitelisted)
   - See [MONGODB_SETUP_GUIDE.md](MONGODB_SETUP_GUIDE.md) for detailed troubleshooting

### Continuous Deployment

Once set up, Vercel automatically deploys your app whenever you push to GitHub:
- Pushes to `main` branch → Production deployment
- Pull requests → Preview deployments

## 🚫 Why Not GitHub Pages?

GitHub Pages **cannot** be used for this application because:

1. **No Server-Side Rendering**: GitHub Pages only serves static HTML/CSS/JS files
2. **No API Routes**: The `/api/auth/signup` and other API endpoints cannot run
3. **No Database Connection**: Cannot connect to MongoDB
4. **No Server-Side Logic**: Authentication, payments, and data processing require a server

### What Happens on GitHub Pages?

If you try to use the signup form on GitHub Pages:
- Frontend displays correctly ✅
- User fills out the form ✅
- Form submits to `/api/auth/signup` ❌
- API route doesn't exist (returns 404) ❌
- Error: "An error occurred. Please try again." ❌

## 📊 Alternative Platforms

If you prefer not to use Vercel, these platforms also support Next.js with server-side rendering:

### Netlify
- Supports Next.js via `@netlify/plugin-nextjs`
- Configure in `netlify.toml`
- Add environment variables in Netlify dashboard

### AWS Amplify
- Full support for Next.js SSR
- Integrated with AWS services
- Configure via Amplify Console

### Render
- Native Next.js support
- Simple deployment process
- Add environment variables in dashboard

### Railway
- One-click Next.js deployment
- Built-in database support
- Environment variable management

## 🧪 Local Development

For local development with full functionality:

1. **Start MongoDB**
   ```bash
   mongod --dbpath /path/to/data
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/NextGen
   JWT_SECRET=your-dev-secret-key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Install & Run**
   ```bash
   npm install
   npm run dev
   ```

4. **Test Signup**
   - Visit http://localhost:3000/signup
   - Fill out the form
   - Submit and verify it works

## 🔒 Security Checklist

Before deploying to production:

- [ ] Use a strong, random `JWT_SECRET` (min 32 characters)
- [ ] Use production Stripe keys for production environment only (use test keys for development/staging)
- [ ] Whitelist Vercel IP addresses (0.0.0.0/0) in MongoDB Atlas for serverless functions
- [ ] Enable MongoDB authentication with strong passwords
- [ ] Use environment variables for all secrets (never commit them to git)
- [ ] Set up Stripe webhooks for payment verification
- [ ] Test signup and login functionality in staging before production
- [ ] Test payment processing with test keys before using live keys
- [ ] Monitor application logs for errors

## 📈 Monitoring

After deployment, monitor:
- Vercel Dashboard → Analytics
- MongoDB Atlas → Metrics
- Stripe Dashboard → Events & Logs
- Application logs in Vercel → Deployments → View Function Logs

## 🆘 Troubleshooting

### Signup Returns "An error occurred"

**Possible causes:**
1. MongoDB connection string is incorrect
2. MongoDB Atlas IP whitelist doesn't include 0.0.0.0/0
3. JWT_SECRET is not set
4. MongoDB user doesn't have permissions

**Solution:**
- Check Vercel logs: Dashboard → Deployments → View Function Logs
- Verify all environment variables are set correctly
- Test MongoDB connection string locally

### "User already exists" Error

**Cause:** Email is already registered in the database

**Solution:**
- Use a different email address
- Or delete the user from MongoDB and try again

### 404 on API Routes

**Cause:** Application is deployed to a static hosting platform

**Solution:**
- Deploy to Vercel or another server-side platform
- Verify the build includes API routes (check build output)

## 📞 Support

If you encounter issues:
1. Check Vercel function logs
2. Verify environment variables are set
3. Test MongoDB connection separately
4. Check this repository's Issues page
