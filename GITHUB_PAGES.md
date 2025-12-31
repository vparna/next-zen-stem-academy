# GitHub Pages Deployment - DEPRECATED

⚠️ **IMPORTANT NOTICE**: GitHub Pages deployment is no longer supported for this application.

## Why This Changed

As of the latest version, this application requires server-side rendering and API routes to function properly, specifically for:

- User authentication (signup/login)
- MongoDB database operations
- Payment processing
- Dynamic data operations

**GitHub Pages only supports static file hosting and cannot run server-side code.**

## Recommended Alternative: Vercel

This application is now configured for **Vercel deployment** which provides:
- ✅ Full Next.js server-side rendering support
- ✅ API routes that work properly
- ✅ MongoDB database connectivity
- ✅ Environment variable management
- ✅ Automatic deployments from GitHub

**Please see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.**

## What Happened to GitHub Pages?

The previous GitHub Pages deployment configuration has been removed because:

1. The signup form would fail with "An error occurred" because `/api/auth/signup` doesn't exist in static exports
2. Login functionality would not work
3. Database operations would fail
4. Payment processing would be impossible
5. Users would have a broken experience

## Quick Start: Deploy to Vercel

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and import your repository
3. Add environment variables (MongoDB URI, JWT secret, Stripe keys)
4. Deploy

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete instructions.

---

## Legacy Information (For Reference Only)

<details>
<summary>Old GitHub Pages Configuration (No Longer Used)</summary>

The previous configuration included:
- `output: 'export'` in next.config.ts
- `basePath: '/next-zen-stem-academy'` for GitHub Pages subdirectory
- Build script that removed API routes before deployment
- GitHub Actions workflow for automated deployment

These have been removed because they prevented core functionality from working.

</details>
