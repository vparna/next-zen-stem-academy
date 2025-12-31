# Quick Vercel Deployment Guide

This is a quick reference for deploying the Next.js application to Vercel. For detailed instructions, see [VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md).

## Prerequisites Checklist

Before deploying, ensure you have:

- [ ] GitHub account with this repository
- [ ] [Vercel account](https://vercel.com/signup) (free tier)
- [ ] [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) (free tier)
- [ ] MongoDB connection string ready
- [ ] JWT_SECRET generated (min 32 characters)

## Quick Deployment Steps

### 1. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New..." → "Project"
3. Import `next-zen-stem-academy` repository
4. Click "Import"

### 2. Configure Environment Variables

Before deploying, add these **required** environment variables in Vercel:

```env
# Required Variables
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/NextGen?retryWrites=true&w=majority
JWT_SECRET=your-32-character-or-longer-secret-key
NEXT_PUBLIC_APP_URL=https://placeholder.vercel.app  # Update after deployment
```

**Optional** (for payments):
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Deploy

1. Click "Deploy" button
2. Wait 2-5 minutes for build to complete
3. Copy your deployment URL

### 4. Post-Deployment

1. Update `NEXT_PUBLIC_APP_URL` in Vercel settings with your actual URL
2. Redeploy the application
3. Test signup functionality

## Validation

Validate environment variables locally before deploying:

```bash
# Copy example environment file
cp .env.example .env.local

# Edit .env.local with your actual values

# Validate configuration
npm install
npm run validate-env
```

## Troubleshooting

### Build Fails
- Verify all required environment variables are set
- Check MongoDB URI format is correct
- Ensure JWT_SECRET is at least 32 characters

### Signup/Login Doesn't Work
- Check Vercel Function Logs in dashboard
- Verify MongoDB connection string
- Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Verify JWT_SECRET is set

### Need Help?
- See [VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md) for detailed guide
- Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for troubleshooting
- Review Vercel function logs in dashboard

## MongoDB Atlas Setup

Quick MongoDB Atlas setup:

1. Create free cluster (M0 tier)
2. Create database user with password
3. Set Network Access to 0.0.0.0/0 (allow all)
4. Get connection string from "Connect" button
5. Replace `<password>` and add database name `NextGen`

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/NextGen?retryWrites=true&w=majority
```

## Generate JWT Secret

Generate a secure JWT secret (minimum 32 characters):

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Automatic Deployments

Once configured:
- Push to `main` branch → Production deployment
- Open Pull Request → Preview deployment

## Security Notes

✅ **DO:**
- Use strong JWT_SECRET (min 32 chars)
- Use test Stripe keys for non-production
- Keep secrets in Vercel dashboard only
- Monitor application logs

❌ **DON'T:**
- Commit .env.local to git
- Use production Stripe keys in test environment
- Share JWT_SECRET publicly
- Use weak or short JWT secrets

---

**Ready to deploy?** Follow the steps above or see the [Complete Deployment Checklist](VERCEL_DEPLOYMENT_CHECKLIST.md) 🚀
