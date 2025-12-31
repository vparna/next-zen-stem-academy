# Vercel Deployment - Environment Variables Configuration

This document lists all environment variables that must be configured in Vercel for successful deployment.

## Overview

The application is now ready for deployment to Vercel. All validation scripts have been created and tested. The following environment variables must be configured in the Vercel dashboard before deployment.

## Required Environment Variables

These MUST be set in Vercel dashboard (Settings → Environment Variables):

### 1. MONGODB_URI
**Description:** MongoDB database connection string  
**Format:** `mongodb+srv://username:password@cluster.mongodb.net/NextGen?retryWrites=true&w=majority`  
**Where to get:**
- Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas/register
- Create a cluster (M0 Free tier)
- Create a database user
- Set Network Access to 0.0.0.0/0 (allow all IPs for Vercel serverless)
- Get connection string from "Connect" → "Connect your application"
- Replace `<password>` with your actual password
- Ensure database name is `NextGen`

**Example:**
```
mongodb+srv://admin:MySecurePassword123@cluster0.abc123.mongodb.net/NextGen?retryWrites=true&w=majority
```

**Validation:** Must start with `mongodb://` or `mongodb+srv://`

---

### 2. JWT_SECRET
**Description:** Secret key for JWT token generation and verification  
**Format:** Random string (MINIMUM 32 characters)  
**Security:** Use a strong, random, unpredictable string  

**How to generate:**
```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online generator (use reputable source)
# https://www.random.org/strings/ - Generate 32+ character string
```

**Example:**
```
Y3JlYXRlLWEtdmVyeS1zdHJvbmctcmFuZG9tLXNlY3JldC1rZXktaGVyZS1mb3ItcHJvZHVjdGlvbg==
```

**Validation:** Must be at least 32 characters long

⚠️ **CRITICAL:** Never use the example value above or any value from documentation. Always generate a new unique secret.

---

### 3. NEXT_PUBLIC_APP_URL
**Description:** Your application's public URL  
**Format:** Full URL with protocol (https://)  
**Initial Value:** Use placeholder for first deployment  
**After Deployment:** Update with actual Vercel URL  

**Example (placeholder for first deployment):**
```
https://placeholder.vercel.app
```

**Example (after deployment):**
```
https://your-project-name.vercel.app
```

**Validation:** Must start with `http://` or `https://`

⚠️ **IMPORTANT:** After first deployment:
1. Copy your actual Vercel URL
2. Update this variable in Vercel dashboard
3. Redeploy the application

---

## Optional Environment Variables

These are optional but enable specific features:

### Stripe Payment Integration

Required if you want to enable course payments:

#### NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
**Description:** Stripe publishable API key  
**Format:** `pk_test_...` (test mode) or `pk_live_...` (production)  
**Where to get:** https://dashboard.stripe.com/test/apikeys  

**Example:**
```
pk_test_51234567890ABCDEFabcdefghijklmnopqrstuvwxyz1234567890
```

**Environment:**
- Development/Staging: Use `pk_test_...` keys
- Production: Use `pk_live_...` keys

---

#### STRIPE_SECRET_KEY
**Description:** Stripe secret API key  
**Format:** `sk_test_...` (test mode) or `sk_live_...` (production)  
**Where to get:** https://dashboard.stripe.com/test/apikeys  

**Example:**
```
sk_test_51234567890ABCDEFabcdefghijklmnopqrstuvwxyz1234567890
```

⚠️ **SECURITY:** This is a secret key. Never expose it in client-side code or commit to git.

---

#### STRIPE_WEBHOOK_SECRET
**Description:** Stripe webhook signing secret  
**Format:** `whsec_...`  
**Where to get:** 
1. Deploy your application first
2. Go to https://dashboard.stripe.com/test/webhooks
3. Click "Add endpoint"
4. Endpoint URL: `https://your-app.vercel.app/api/payments/webhook`
5. Select events: `checkout.session.completed`, `payment_intent.succeeded`
6. Copy the "Signing secret"

**Example:**
```
whsec_1234567890ABCDEFabcdefghijklmnopqrstuvwxyz1234567890ABC
```

---

### Email Notifications

Required if you want to send email notifications:

#### EMAIL_HOST
**Description:** SMTP server hostname  
**Example:** `smtp.gmail.com`

#### EMAIL_PORT
**Description:** SMTP server port  
**Example:** `587`

#### EMAIL_SECURE
**Description:** Use TLS/SSL  
**Example:** `false`

#### EMAIL_USER
**Description:** Email account username  
**Example:** `your-email@gmail.com`

#### EMAIL_PASSWORD
**Description:** Email account password or app-specific password  
**Example:** `your-app-specific-password`

**Note for Gmail:**
- You need to enable "Less secure app access" or use an "App Password"
- Get app password: Google Account → Security → 2-Step Verification → App passwords

---

## How to Add Environment Variables in Vercel

### During Initial Deployment:

1. Import project to Vercel
2. Before clicking "Deploy", scroll down to "Environment Variables"
3. Click "Add" for each variable
4. Enter **Name** (e.g., `MONGODB_URI`)
5. Enter **Value** (your actual secret)
6. Select environments (check all: Production, Preview, Development)
7. Click "Add"
8. Repeat for all required variables
9. Click "Deploy"

### After Deployment:

1. Go to your project in Vercel dashboard
2. Click "Settings" tab
3. Click "Environment Variables" in left sidebar
4. Click "Add New"
5. Enter Name and Value
6. Select environments
7. Click "Save"
8. Go to "Deployments" tab
9. Click "..." menu on latest deployment
10. Click "Redeploy" to apply changes

---

## Validation Commands

Before deploying, validate your setup locally:

### 1. Validate Environment Variables
```bash
npm run validate-env
```

This checks:
- All required variables are set
- Variables have correct format
- JWT_SECRET meets minimum length requirement

### 2. Pre-Deployment Check
```bash
npm run pre-deploy-check
```

This performs comprehensive checks:
- Required files exist
- Environment variables are valid
- Configuration files are correct
- vercel.json doesn't use deprecated syntax

### 3. Test Build
```bash
npm run build
```

This ensures the application builds successfully.

---

## Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] MongoDB database user created with password
- [ ] MongoDB Network Access set to 0.0.0.0/0
- [ ] MongoDB connection string copied
- [ ] JWT_SECRET generated (min 32 characters)
- [ ] All required environment variables ready
- [ ] Optional variables prepared (if using features)
- [ ] Project pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Environment variables added to Vercel
- [ ] Initial deployment successful
- [ ] NEXT_PUBLIC_APP_URL updated with actual URL
- [ ] Application redeployed after URL update
- [ ] Stripe webhooks configured (if using payments)
- [ ] Application tested (signup, login, features)

---

## Troubleshooting

### Build Fails
**Check:**
- All required environment variables are set in Vercel
- Variable names match exactly (case-sensitive)
- No typos in variable values
- MongoDB URI format is correct
- JWT_SECRET is at least 32 characters

**Solution:**
- View build logs in Vercel dashboard
- Verify each environment variable
- Test build locally with same values

### Application Works but Features Fail
**Check:**
- Vercel Function Logs for errors
- MongoDB Atlas IP whitelist includes 0.0.0.0/0
- JWT_SECRET is set and correct
- Database name in connection string is `NextGen`

**Solution:**
- Check Deployments → View Function Logs
- Test MongoDB connection separately
- Verify all required variables are set

### Stripe Payments Don't Work
**Check:**
- Stripe API keys are set
- Using test keys (pk_test_ and sk_test_) for testing
- Webhook endpoint configured in Stripe dashboard
- Webhook secret is set in Vercel

**Solution:**
- Verify Stripe variables in Vercel
- Check Stripe dashboard for webhook deliveries
- Use Stripe test card: 4242 4242 4242 4242

---

## Security Best Practices

✅ **DO:**
- Generate strong, random JWT_SECRET (min 32 chars)
- Use environment variables for all secrets
- Use test Stripe keys for non-production environments
- Rotate secrets regularly
- Monitor application logs
- Use MongoDB Atlas with authentication

❌ **DON'T:**
- Commit .env.local to git
- Share secrets publicly or in documentation
- Use example/placeholder secrets in production
- Use production Stripe keys in development
- Use short or predictable JWT_SECRET values
- Expose secret keys in client-side code

---

## Support Resources

- **Detailed Guide:** [VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md)
- **Quick Start:** [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)
- **Full Documentation:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Vercel Documentation:** https://vercel.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
- **Stripe Documentation:** https://stripe.com/docs

---

## Summary

✅ **Ready to Deploy:**
1. Configure all required environment variables in Vercel
2. Deploy application
3. Update NEXT_PUBLIC_APP_URL with actual URL
4. Redeploy
5. Test application functionality

🚀 **Your application is ready for Vercel deployment!**
