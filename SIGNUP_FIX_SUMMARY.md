# Sign Up Page Fix - Internal Server Error

## Problem
After deploying to Vercel, the sign up page was returning "Internal Server Error" when users tried to create an account.

## Root Cause
The issue was caused by **module-level validation** in the JWT authentication library (`lib/auth/jwt.ts`). 

### What was happening:
1. The JWT module had validation code that ran immediately when the module was imported:
   ```typescript
   // This runs at import time, not function call time
   if (!process.env.JWT_SECRET) {
     throw new Error('JWT_SECRET environment variable is required...');
   }
   ```

2. In serverless environments like Vercel, environment variables may not be available during:
   - Build time
   - Module initialization
   - Cold starts

3. This caused the module to throw an error before any API function could even run, resulting in a 500 Internal Server Error.

## Solution
Moved the validation from module-level to function-level (runtime validation):

### Before:
```typescript
// lib/auth/jwt.ts
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required...');
}
const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}
```

### After:
```typescript
// lib/auth/jwt.ts
function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required...');
  }
  if (secret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long...');
  }
  return secret;
}

export function generateToken(payload: JWTPayload): string {
  const JWT_SECRET = getJWTSecret(); // Validation happens here, at runtime
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}
```

## Additional Improvements

1. **Better Error Messages**: Updated error messages to mention both local development (`.env.local`) and Vercel deployment scenarios.

2. **Enhanced Logging**: Added detailed error logging in the signup and login routes to help debug future issues:
   ```typescript
   catch (error) {
     console.error('Signup error:', error);
     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
     console.error('Error details:', errorMessage);
     // ...
   }
   ```

3. **MongoDB Connection Error**: Improved error message to be more helpful for deployment scenarios.

## Files Changed
- `lib/auth/jwt.ts` - Moved JWT_SECRET validation to runtime
- `lib/db/mongodb.ts` - Improved error messages
- `app/api/auth/signup/route.ts` - Enhanced error logging
- `app/api/auth/login/route.ts` - Enhanced error logging

## Testing
- ✅ Local build succeeds with environment variables
- ✅ No linting errors
- ✅ All changed files pass linting
- ✅ TypeScript compilation succeeds

## Deployment Checklist
When deploying to Vercel, ensure these environment variables are set:

### Required:
- `MONGODB_URI` - MongoDB connection string (must start with `mongodb://` or `mongodb+srv://`)
- `JWT_SECRET` - Random string (minimum 32 characters)
- `NEXT_PUBLIC_APP_URL` - Your Vercel deployment URL

### Optional:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - For payments
- `STRIPE_SECRET_KEY` - For payments
- `STRIPE_WEBHOOK_SECRET` - For payment webhooks

## How to Verify the Fix
1. Deploy to Vercel with all required environment variables set
2. Navigate to `/signup`
3. Fill out the signup form with test data
4. Click "Sign up"
5. **Expected Result**: User should be created and redirected to dashboard
6. **Previous Result**: "Internal Server Error" message

## Why This Pattern is Important for Serverless
In serverless/edge environments like Vercel:
- Functions are stateless and can have cold starts
- Environment variables should be accessed at runtime, not at import time
- Module-level code runs in unpredictable contexts
- Always prefer lazy evaluation for environment-dependent configuration

## References
- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Runtime Configuration](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration)
- [Serverless Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
