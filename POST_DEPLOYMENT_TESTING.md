# Post-Deployment Testing Checklist

After deploying to Vercel, use this checklist to verify that everything is working correctly.

## 🔍 Immediate Checks (Right After Deployment)

### 1. Deployment Success
- [ ] Vercel build completed without errors
- [ ] Deployment shows "Ready" status in Vercel dashboard
- [ ] Deployment URL is accessible

### 2. Homepage Test
- [ ] Navigate to your deployment URL
- [ ] Homepage loads without errors
- [ ] All navigation links are visible
- [ ] Images and styles load correctly
- [ ] No console errors in browser DevTools

### 3. Environment Variables Verification
- [ ] Go to Vercel → Settings → Environment Variables
- [ ] Verify `MONGODB_URI` is set
- [ ] Verify `JWT_SECRET` is set (at least 32 chars)
- [ ] Verify `NEXT_PUBLIC_APP_URL` matches deployment URL
- [ ] Optional: Verify Stripe keys if using payments

---

## 🧪 Functional Testing

### Authentication Tests

#### Sign Up Test
1. Navigate to `/signup`
   - [ ] Signup form loads correctly
   - [ ] All input fields are visible
   - [ ] Form validation works

2. Create a test account
   - [ ] Fill out form with test data
   - [ ] Click "Sign Up"
   - [ ] Success: Redirected to dashboard
   - [ ] Error message is clear if signup fails

3. Verify in MongoDB Atlas
   - [ ] Go to MongoDB Atlas → Database → Browse Collections
   - [ ] Find `users` collection
   - [ ] Verify new user exists with correct data
   - [ ] Password is hashed (not plain text)

#### Login Test
1. Logout (if logged in)
   - [ ] Click logout in navigation
   - [ ] Redirected to homepage or login

2. Navigate to `/login`
   - [ ] Login form loads correctly
   - [ ] Username/email and password fields visible

3. Login with test account
   - [ ] Enter credentials from signup test
   - [ ] Click "Login"
   - [ ] Success: Redirected to dashboard
   - [ ] User info displayed correctly

4. Test wrong credentials
   - [ ] Try login with wrong password
   - [ ] Error message is displayed
   - [ ] User stays on login page

### Course Browsing Tests

#### Courses Page
1. Navigate to `/courses`
   - [ ] Courses page loads
   - [ ] Course cards are displayed
   - [ ] Images load correctly
   - [ ] Prices are shown correctly

2. Click on a course
   - [ ] Course detail page loads
   - [ ] Course information is complete
   - [ ] Enroll button is visible (if not enrolled)

#### Course Enrollment (Without Payment)
1. While logged in, view a course
   - [ ] Enroll button is visible
   - [ ] Click "Enroll" (if free courses exist)
   - [ ] Enrollment confirmed
   - [ ] Course appears in dashboard

### Dashboard Tests

1. Navigate to `/dashboard`
   - [ ] Dashboard loads successfully
   - [ ] User information displayed
   - [ ] Enrolled courses shown (if any)
   - [ ] Navigation works

2. Profile Management
   - [ ] View profile information
   - [ ] Edit profile (if feature exists)
   - [ ] Changes are saved

### API Tests

#### API Health Check
1. Test API endpoints in browser DevTools Network tab
   - [ ] `/api/auth/login` - POST request works
   - [ ] `/api/auth/signup` - POST request works
   - [ ] `/api/courses` - GET request returns data
   - [ ] `/api/profile` - GET request returns user data (when logged in)

---

## 💳 Payment Tests (If Stripe Configured)

### Stripe Checkout Test
1. Prerequisites
   - [ ] Stripe test keys configured
   - [ ] Test mode active

2. Initiate payment
   - [ ] Select a paid course
   - [ ] Click "Enroll" or "Buy Now"
   - [ ] Stripe Checkout opens

3. Complete test payment
   - [ ] Use test card: `4242 4242 4242 4242`
   - [ ] Expiry: Any future date
   - [ ] CVC: Any 3 digits
   - [ ] Submit payment
   - [ ] Success: Redirected to success page

4. Verify enrollment
   - [ ] Course appears in dashboard
   - [ ] Enrollment record in database
   - [ ] Payment record exists

5. Check Stripe Dashboard
   - [ ] Go to Stripe Dashboard → Payments
   - [ ] Verify payment appears
   - [ ] Check webhook deliveries

### Webhook Test (If Configured)
1. Check webhook endpoint
   - [ ] Stripe Dashboard → Webhooks
   - [ ] Endpoint URL is correct
   - [ ] Events are being delivered
   - [ ] No failed deliveries

---

## 🚨 Error Testing

### Error Handling
1. Test invalid inputs
   - [ ] Signup with existing email
   - [ ] Login with wrong password
   - [ ] Access protected routes while logged out
   - [ ] Error messages are user-friendly

2. Network simulation
   - [ ] Open DevTools → Network
   - [ ] Throttle to "Slow 3G"
   - [ ] Navigate around site
   - [ ] Loading states work correctly

---

## 📊 Performance Checks

### Load Time
- [ ] Homepage loads in < 3 seconds
- [ ] Course pages load in < 3 seconds
- [ ] API responses are < 1 second

### Vercel Analytics
- [ ] Go to Vercel → Analytics
- [ ] Check Core Web Vitals
- [ ] Verify metrics are in good range

---

## 🔐 Security Checks

### Environment Variables
- [ ] No secrets exposed in client-side code
- [ ] JWT_SECRET is not visible in browser
- [ ] Database credentials not exposed

### Authentication
- [ ] Protected routes redirect to login
- [ ] JWT tokens are httpOnly (if using cookies)
- [ ] Password is hashed in database
- [ ] Session expires after expected time

---

## 📝 Logging and Monitoring

### Vercel Function Logs
1. Check logs for errors
   - [ ] Go to Vercel → Deployments → Latest
   - [ ] Click "View Function Logs"
   - [ ] Look for any errors or warnings
   - [ ] Address any issues found

2. Monitor during testing
   - [ ] Keep logs open while testing
   - [ ] Watch for real-time errors
   - [ ] Note any performance issues

### MongoDB Atlas
- [ ] Check connection metrics
- [ ] Verify queries are working
- [ ] No authentication errors
- [ ] Database size is reasonable

---

## 🎨 Visual Testing

### Responsive Design
Test on different devices/screen sizes:

1. Desktop (1920x1080)
   - [ ] Layout is correct
   - [ ] No horizontal scroll
   - [ ] All elements visible

2. Tablet (768px)
   - [ ] Mobile menu works
   - [ ] Cards stack properly
   - [ ] Images resize correctly

3. Mobile (375px)
   - [ ] Touch targets are large enough
   - [ ] Text is readable
   - [ ] Forms are usable

### Browser Testing
Test on major browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

---

## 🔄 Continuous Deployment Test

### Git Push Test
1. Make a small change
   - [ ] Edit a file (e.g., README)
   - [ ] Commit and push to main branch
   - [ ] Vercel auto-deploys
   - [ ] New deployment is successful
   - [ ] Changes are live

---

## ✅ Final Verification

### Production Readiness
- [ ] All critical features work
- [ ] No console errors
- [ ] No 404 errors for existing routes
- [ ] All API endpoints respond correctly
- [ ] Database operations work
- [ ] Authentication is secure
- [ ] Payment processing works (if applicable)
- [ ] Error handling is graceful
- [ ] Performance is acceptable
- [ ] Monitoring is in place

### Documentation
- [ ] Deployment URL documented
- [ ] Environment variables documented
- [ ] Any issues or limitations noted
- [ ] Team members informed of deployment

---

## 🚨 Rollback Plan

If critical issues are found:

1. **Immediate Actions**
   - [ ] Note the issue in Vercel dashboard
   - [ ] Check if it's a critical user-facing bug
   - [ ] Determine if rollback is necessary

2. **Rollback Process**
   - [ ] Go to Vercel → Deployments
   - [ ] Find previous working deployment
   - [ ] Click "..." menu → "Promote to Production"
   - [ ] Verify previous version is live

3. **Issue Resolution**
   - [ ] Fix the issue locally
   - [ ] Test thoroughly
   - [ ] Deploy fix
   - [ ] Verify fix works in production

---

## 📞 Support Resources

If issues are found:
- Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for troubleshooting
- Review Vercel function logs for errors
- Check MongoDB Atlas logs
- Verify environment variables
- Review [VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md)

---

## Success Criteria

Deployment is successful when:
- ✅ All critical features work without errors
- ✅ Authentication (signup/login) works
- ✅ Database operations are successful
- ✅ No security vulnerabilities exposed
- ✅ Performance meets expectations
- ✅ Monitoring is active

---

**🎉 Congratulations!** If all items are checked, your deployment is successful!
