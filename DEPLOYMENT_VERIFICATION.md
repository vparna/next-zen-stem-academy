# Deployment Verification Checklist

## Before Merging This PR

- [ ] Review the code changes in this PR
- [ ] Ensure all commits are appropriate
- [ ] Verify CI/CD passes (if configured)

## After Merging - Vercel Deployment

### 1. Verify Environment Variables in Vercel
Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Ensure these are set:

#### Required Variables:
- [ ] `MONGODB_URI` - MongoDB connection string (e.g., `mongodb+srv://...`)
  - Must start with `mongodb://` or `mongodb+srv://`
  - Should point to your MongoDB Atlas cluster
  - Network access should allow 0.0.0.0/0 for Vercel serverless functions

- [ ] `JWT_SECRET` - Random string for JWT token signing
  - **Must be at least 32 characters long**
  - Generate with: `openssl rand -base64 32`
  - NEVER use example values from documentation

- [ ] `NEXT_PUBLIC_APP_URL` - Your Vercel deployment URL
  - Format: `https://your-project.vercel.app`
  - Update after first deployment if using placeholder

#### Optional Variables (for additional features):
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - For payment processing
- [ ] `STRIPE_SECRET_KEY` - For payment processing
- [ ] `STRIPE_WEBHOOK_SECRET` - For payment webhooks

### 2. Deploy to Vercel

- [ ] Merge this PR to main branch
- [ ] Vercel will automatically deploy
- [ ] Wait for deployment to complete (check Vercel dashboard)
- [ ] Note the deployment URL

### 3. Test Signup Functionality

#### Navigate to Signup Page:
- [ ] Go to `https://your-project.vercel.app/signup`
- [ ] Verify page loads without errors
- [ ] Check browser console for any JavaScript errors

#### Create Test Account:
- [ ] Fill in the signup form:
  - First Name: Test
  - Last Name: User
  - Email: test@example.com (use a unique email each time)
  - Phone: 1234567890 (optional)
  - Role: Parent/Guardian
  - Password: TestPassword123!
  - Confirm Password: TestPassword123!

- [ ] Click "Sign up" button
- [ ] Watch for error messages

#### Expected Behavior:
- [ ] ✅ Form submits successfully (no "Internal Server Error")
- [ ] ✅ Redirected to `/dashboard`
- [ ] ✅ User is logged in
- [ ] ✅ Can see user information in dashboard

#### If Signup Still Fails:

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Deployments → Latest
   - Click "View Function Logs"
   - Look for errors from `/api/auth/signup`

2. **Common Issues:**
   - Missing `JWT_SECRET` → Error: "JWT_SECRET environment variable is required"
   - JWT_SECRET too short → Error: "JWT_SECRET must be at least 32 characters"
   - Missing `MONGODB_URI` → Error: "MONGODB_URI environment variable is not set"
   - Invalid MongoDB URI → Error: "Invalid MongoDB URI format"
   - MongoDB connection failed → Check MongoDB Atlas IP whitelist

3. **Verify in MongoDB:**
   - Go to MongoDB Atlas Dashboard
   - Navigate to Database → Browse Collections
   - Check if `users` collection exists
   - Verify new user was created with test email

### 4. Test Login Functionality

- [ ] Logout (if logged in)
- [ ] Go to `/login`
- [ ] Login with the test account credentials
- [ ] Verify successful login and redirect to dashboard

### 5. Additional Verification

- [ ] Check that other pages load correctly
- [ ] Verify navigation works
- [ ] Test that protected routes redirect to login when not authenticated
- [ ] Check browser console for any errors

## Troubleshooting

### Issue: "Internal Server Error" persists

**Solution:**
1. Check Vercel function logs for specific error message
2. Verify all environment variables are set correctly
3. Ensure MongoDB connection string is correct and accessible
4. Check MongoDB Atlas IP whitelist includes 0.0.0.0/0

### Issue: "JWT_SECRET environment variable is required"

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Add `JWT_SECRET` with a value of at least 32 characters
3. Redeploy the application

### Issue: MongoDB connection fails

**Solution:**
1. Verify `MONGODB_URI` is set correctly in Vercel
2. Check MongoDB Atlas:
   - Database user exists
   - Password is correct in connection string
   - Network access allows 0.0.0.0/0
   - Cluster is running

### Issue: User created but not redirected

**Solution:**
1. Check browser console for JavaScript errors
2. Verify token is being stored in localStorage
3. Check that `/dashboard` route exists and is accessible

## Success Criteria

✅ Signup page loads without errors
✅ Users can create accounts successfully
✅ No "Internal Server Error" message
✅ Users are redirected to dashboard after signup
✅ Users can login with created accounts
✅ Function logs show no errors

## Documentation

For detailed information about the fix, see:
- `SIGNUP_FIX_SUMMARY.md` - Technical details about the fix
- `VERCEL_ENV_VARIABLES.md` - Complete guide to environment variables
- `POST_DEPLOYMENT_TESTING.md` - Comprehensive testing checklist

## Support

If you encounter any issues not covered here:
1. Check Vercel function logs
2. Check MongoDB Atlas logs
3. Review environment variables
4. Consult the documentation files mentioned above
