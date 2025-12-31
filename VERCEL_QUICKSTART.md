# Vercel Deployment Quick Start

This guide will help you deploy the NextGen STEM Academy website to Vercel in just a few minutes.

## Prerequisites

Before you begin, make sure you have:

1. ✅ A GitHub account with this repository
2. ✅ A [Vercel account](https://vercel.com/signup) (free tier is fine)
3. ✅ A [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) (free tier is fine)
4. ✅ A [Stripe account](https://dashboard.stripe.com/register) (optional, but needed for payments)

## Step 1: Set Up MongoDB Atlas (5 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up/sign in
2. Create a new project (e.g., "NextGen STEM Academy")
3. Build a database:
   - Choose **M0 FREE** tier
   - Select your preferred cloud provider and region
   - Click "Create Cluster"
4. Set up database access:
   - Click "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Authentication Method: Password
   - Username: `nextgen-admin` (or your choice)
   - Password: Generate a secure password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"
5. Set up network access:
   - Click "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
6. Get your connection string:
   - Click "Database" in the left sidebar
   - Click "Connect" button on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://nextgen-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your actual password
   - Add your database name: `mongodb+srv://nextgen-admin:your-password@cluster0.xxxxx.mongodb.net/NextGen?retryWrites=true&w=majority`

## Step 2: Deploy to Vercel (3 minutes)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New..." → "Project"
3. Find and import the `next-zen-stem-academy` repository
4. Click "Import"
5. Configure your project:
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should be auto-filled)
   - **Output Directory**: `.next` (should be auto-filled)
6. **IMPORTANT**: Before clicking "Deploy", add environment variables (see Step 3 below)

## Step 3: Configure Environment Variables

In the Vercel project configuration (before deployment), scroll down to "Environment Variables" and add:

### Required Variables:

| Variable Name | Value | Where to Get It |
|--------------|-------|----------------|
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/NextGen?retryWrites=true&w=majority` | Your MongoDB Atlas connection string from Step 1 |
| `JWT_SECRET` | Any random string (min 32 chars) | Generate one: `openssl rand -base64 32` or use [random.org](https://www.random.org/strings/) |
| `NEXT_PUBLIC_APP_URL` | Leave empty for now | Will be filled after deployment |

### Optional Variables (for Stripe payments):

| Variable Name | Value | Where to Get It |
|--------------|-------|----------------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` | [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) → Developers → API keys |
| `STRIPE_SECRET_KEY` | `sk_test_...` | [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks) → Add endpoint → Copy signing secret |

**Note**: For initial deployment, you can skip Stripe variables. Add them later when you need payment functionality.

## Step 4: Deploy!

1. Click "Deploy" button
2. Wait 2-3 minutes for the build to complete
3. Once deployed, you'll see your live URL (e.g., `https://your-project-name.vercel.app`)

## Step 5: Update Environment Variable

1. Copy your deployed URL from Vercel
2. Go to your project Settings → Environment Variables
3. Edit `NEXT_PUBLIC_APP_URL` and set it to your deployed URL (e.g., `https://your-project-name.vercel.app`)
4. Click "Save"
5. Go to Deployments tab and click "Redeploy" on the latest deployment

## Step 6: Test Your Deployment

1. Visit your deployed URL
2. Click "Sign Up" in the navigation
3. Fill out the form and submit
4. If successful, you should be redirected to the dashboard
5. Check MongoDB Atlas → Database → Browse Collections → You should see a new user in the `users` collection

## Troubleshooting

### Build Failed

**Check these:**
- All required environment variables are set
- MongoDB URI format is correct (includes database name)
- No typos in environment variable names

**View logs:**
- Vercel Dashboard → Deployments → Click on failed deployment → View Function Logs

### "An error occurred. Please try again." on Signup

**Possible causes:**
1. **MongoDB connection failed**
   - Check if MongoDB IP whitelist includes 0.0.0.0/0
   - Verify MongoDB URI is correct
   - Test connection string locally

2. **JWT_SECRET not set**
   - Verify JWT_SECRET environment variable exists
   - Make sure it's at least 32 characters long

3. **Check logs:**
   - Vercel Dashboard → Deployments → Latest Deployment → View Function Logs
   - Look for error messages related to MongoDB or JWT

### 404 on API Routes

**Cause:** Build didn't include API routes

**Solution:**
- Verify build output shows API routes as "ƒ (Dynamic)"
- Check that `vercel.json` exists and is configured correctly
- Redeploy the application

## Next Steps

Once your deployment is working:

1. **Custom Domain** (Optional):
   - Vercel Dashboard → Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

2. **Set up Stripe Webhooks**:
   - Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://your-domain.vercel.app/api/payments/webhook`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy webhook signing secret
   - Add as `STRIPE_WEBHOOK_SECRET` in Vercel
   - Redeploy

3. **Seed Initial Data**:
   - Run seed scripts to add courses and jobs
   - See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for details

4. **Monitor**:
   - Vercel Dashboard → Analytics
   - MongoDB Atlas → Metrics
   - Check application logs regularly

## Getting Help

If you encounter issues:

1. Check the [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed troubleshooting
2. Review Vercel function logs
3. Verify all environment variables are set correctly
4. Check MongoDB connection separately

## Automatic Deployments

From now on, Vercel will automatically deploy your app:
- **Push to `main` branch** → Production deployment
- **Open a Pull Request** → Preview deployment with unique URL

Enjoy your deployment! 🚀
