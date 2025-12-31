# Vercel Deployment Checklist

This checklist ensures that all environment variables are properly configured and the application is ready for deployment on Vercel.

## Pre-Deployment Checklist

### 1. ✅ Environment Variables Setup

All required environment variables must be configured in Vercel Dashboard:

#### Required Variables (Must be set before deployment):

- [ ] **MONGODB_URI**
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/NextGen?retryWrites=true&w=majority`
  - Where to get: MongoDB Atlas → Clusters → Connect → Connect your application
  - ⚠️ Make sure to replace `<password>` with actual password
  - ⚠️ Ensure database name is `NextGen` at the end

- [ ] **JWT_SECRET**
  - Format: Random string (minimum 32 characters)
  - How to generate: `openssl rand -base64 32` or use [random.org](https://www.random.org/strings/)
  - ⚠️ Must be at least 32 characters for security
  - Example: `Y3JlYXRlLWEtc3Ryb25nLXJhbmRvbS1zZWNyZXQta2V5LWhlcmU=`

- [ ] **NEXT_PUBLIC_APP_URL**
  - Format: Your Vercel deployment URL
  - Example: `https://your-project-name.vercel.app`
  - ⚠️ Note: Set this to a placeholder initially (e.g., `https://placeholder.vercel.app`), then update it after first deployment with the actual URL

#### Optional Variables (For payment features):

- [ ] **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**
  - Format: `pk_test_...` (test) or `pk_live_...` (production)
  - Where to get: [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) → Developers → API keys
  - Note: Use test keys for development/staging

- [ ] **STRIPE_SECRET_KEY**
  - Format: `sk_test_...` (test) or `sk_live_...` (production)
  - Where to get: [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) → Developers → API keys
  - Note: Use test keys for development/staging

- [ ] **STRIPE_WEBHOOK_SECRET**
  - Format: `whsec_...`
  - Where to get: [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks) → Add endpoint
  - Note: Add endpoint after deployment: `https://your-app.vercel.app/api/payments/webhook`

#### Optional Variables (For email notifications):

- [ ] **EMAIL_HOST** (e.g., `smtp.gmail.com`)
- [ ] **EMAIL_PORT** (e.g., `587`)
- [ ] **EMAIL_SECURE** (e.g., `false`)
- [ ] **EMAIL_USER** (your email address)
- [ ] **EMAIL_PASSWORD** (app-specific password)

### 2. ✅ MongoDB Atlas Configuration

- [ ] MongoDB Atlas account created
- [ ] Database cluster created (M0 Free tier is sufficient)
- [ ] Database user created with read/write permissions
- [ ] Network Access configured:
  - [ ] IP whitelist set to `0.0.0.0/0` (allow all) for Vercel serverless functions
- [ ] Connection string copied and tested
- [ ] Database name is set to `NextGen` in the connection string

### 3. ✅ Stripe Configuration (Optional)

If using payment features:

- [ ] Stripe account created
- [ ] Test API keys obtained
- [ ] Webhook endpoint will be configured after deployment

### 4. ✅ Repository Configuration

- [ ] Code pushed to GitHub repository
- [ ] All changes committed
- [ ] Branch is ready for deployment (typically `main` or `master`)

## Deployment Steps

### Step 1: Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New..." → "Project"
3. Find and import the `next-zen-stem-academy` repository
4. Click "Import"

### Step 2: Configure Project Settings

1. **Framework Preset**: Next.js (should be auto-detected)
2. **Root Directory**: `./` (leave as default)
3. **Build Command**: `npm run build` (auto-filled)
4. **Output Directory**: `.next` (auto-filled)
5. **Install Command**: `npm install` (auto-filled)

### Step 3: Add Environment Variables

⚠️ **IMPORTANT**: Before clicking "Deploy", add all environment variables:

1. Scroll down to "Environment Variables" section
2. Add each required variable:
   - Click "Add" or expand the section
   - Enter **Name** (e.g., `MONGODB_URI`)
   - Enter **Value** (e.g., your MongoDB connection string)
   - Select environments: Check all (Production, Preview, Development)
3. Verify all required variables are added
4. Verify all values are correct (no typos!)

### Step 4: Deploy

1. Click "Deploy" button
2. Wait for build to complete (2-5 minutes)
3. Watch build logs for any errors
4. Once completed, you'll see "Congratulations!" message

### Step 5: Post-Deployment Configuration

1. **Copy your deployment URL** (e.g., `https://your-project-name.vercel.app`)

2. **Update NEXT_PUBLIC_APP_URL**:
   - Go to Project Settings → Environment Variables
   - Find `NEXT_PUBLIC_APP_URL`
   - Edit and set to your actual deployment URL
   - Click "Save"

3. **Redeploy**:
   - Go to Deployments tab
   - Click "..." menu on latest deployment
   - Click "Redeploy"

4. **Configure Stripe Webhooks** (if using payments):
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks)
   - Click "Add endpoint"
   - Endpoint URL: `https://your-project-name.vercel.app/api/payments/webhook`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`
   - Click "Add endpoint"
   - Copy the "Signing secret" (starts with `whsec_`)
   - Add it as `STRIPE_WEBHOOK_SECRET` in Vercel
   - Redeploy again

## Post-Deployment Validation

### Step 6: Test Your Deployment

1. **Visit your deployed URL**

2. **Test Homepage**:
   - [ ] Homepage loads correctly
   - [ ] Navigation works
   - [ ] Images and styles load properly

3. **Test Authentication**:
   - [ ] Click "Sign Up" in navigation
   - [ ] Fill out signup form with test data
   - [ ] Submit form
   - [ ] Verify successful signup and redirect to dashboard

4. **Verify Database Connection**:
   - [ ] Go to MongoDB Atlas → Database → Browse Collections
   - [ ] Check `users` collection
   - [ ] Verify new user was created

5. **Test Login**:
   - [ ] Logout (if logged in)
   - [ ] Click "Login"
   - [ ] Enter credentials from signup
   - [ ] Verify successful login

6. **Test Course Browsing**:
   - [ ] Navigate to courses page
   - [ ] Verify courses are displayed
   - [ ] Click on a course to view details

7. **Test Payments** (if Stripe configured):
   - [ ] Try to enroll in a course
   - [ ] Verify Stripe checkout opens
   - [ ] Use test card: `4242 4242 4242 4242`
   - [ ] Complete test payment
   - [ ] Verify enrollment is recorded

## Environment Variable Validation

You can validate environment variables locally before deployment:

```bash
# Install dependencies (if not already done)
npm install

# Run validation script
npm run validate-env
```

This will check:
- ✅ All required variables are set
- ✅ Variable formats are correct (MongoDB URI, JWT secret length, etc.)
- ⚠️ Optional variables (warnings only)

## Troubleshooting

### Build Failed

**Symptoms**: Deployment fails during build phase

**Possible Causes**:
1. Environment variables not set or incorrect format
2. Missing dependencies
3. TypeScript compilation errors

**Solutions**:
1. Check build logs in Vercel dashboard
2. Run `npm run build` locally to reproduce
3. Verify all environment variables are set correctly
4. Run `npm run validate-env` to check configuration

### "An error occurred. Please try again." on Signup

**Symptoms**: Signup form shows generic error

**Possible Causes**:
1. MongoDB connection failed
2. JWT_SECRET not set or too short
3. MongoDB IP whitelist doesn't include 0.0.0.0/0

**Solutions**:
1. Check Vercel Function Logs:
   - Dashboard → Deployments → Latest → View Function Logs
2. Verify MongoDB connection string in Vercel settings
3. Verify JWT_SECRET is at least 32 characters
4. Check MongoDB Atlas network access settings
5. Test MongoDB connection string locally

### Application Loads but Shows Errors

**Symptoms**: App loads but features don't work

**Possible Causes**:
1. Environment variables not updated after first deployment
2. Missing optional environment variables for specific features

**Solutions**:
1. Verify `NEXT_PUBLIC_APP_URL` is set to actual deployment URL
2. Check if missing optional variables are needed for the feature
3. Check browser console for client-side errors
4. Check Vercel Function Logs for server-side errors

### Stripe Payments Not Working

**Symptoms**: Checkout doesn't open or payments fail

**Possible Causes**:
1. Stripe keys not configured
2. Using production keys instead of test keys
3. Stripe webhook not configured

**Solutions**:
1. Verify Stripe environment variables are set
2. Ensure using `pk_test_` and `sk_test_` for testing
3. Check Stripe dashboard for errors
4. Configure webhook endpoint if needed

## Security Best Practices

- [ ] Use strong, random JWT_SECRET (min 32 characters)
- [ ] Use test Stripe keys for development/staging
- [ ] Use production Stripe keys only for production
- [ ] Never commit `.env.local` to git
- [ ] Rotate secrets regularly
- [ ] Monitor application logs for suspicious activity
- [ ] Use MongoDB user with minimal required permissions

## Monitoring

After successful deployment, monitor:

1. **Vercel Dashboard**:
   - Analytics → Track usage and performance
   - Deployments → View deployment history
   - Logs → Monitor for errors

2. **MongoDB Atlas**:
   - Metrics → Database performance
   - Database → Browse collections for data verification

3. **Stripe Dashboard** (if applicable):
   - Events → Monitor webhook deliveries
   - Payments → Track test/live transactions

## Next Steps

- [ ] Configure custom domain (optional)
- [ ] Set up production Stripe keys (when ready for live payments)
- [ ] Seed initial course data (see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md))
- [ ] Configure email notifications (optional)
- [ ] Set up monitoring and alerts
- [ ] Document deployment for team members

## Automatic Deployments

Once configured, Vercel will automatically deploy:
- **Push to `main` branch** → Production deployment
- **Pull Requests** → Preview deployments with unique URLs

## Getting Help

If you encounter issues:

1. Check this checklist for missed steps
2. Review [VERCEL_QUICKSTART.md](VERCEL_QUICKSTART.md) for detailed guide
3. Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for troubleshooting
4. View Vercel function logs for errors
5. Verify environment variables one more time
6. Test MongoDB connection separately

---

**Ready to deploy?** Start with Step 1: Import Project to Vercel 🚀
