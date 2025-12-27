# GitHub Pages Deployment

This repository is configured to deploy to GitHub Pages using GitHub Actions.

## Deployment Status

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

**Live URL**: https://vparna.github.io/next-zen-stem-academy

## Important Limitations

GitHub Pages only supports **static file hosting**. This means:

- ✅ **Works**: Frontend pages (Home, About, Courses list, Login, Signup, Dashboard, Mobile pages)
- ❌ **Does NOT work**: API routes (authentication, course data, payments, etc.)

### What This Means

1. **Sample Data Mode**: The deployed site shows sample/demo data instead of real data from a database
2. **No Authentication**: Login/signup forms won't work (they require API routes)
3. **No Payments**: Payment processing requires server-side API routes
4. **No Real-Time Data**: All data is static and embedded in the pages

### Fallback Behavior

The application is designed to gracefully handle missing API endpoints:
- Course pages show sample course data
- Forms are displayed but submission won't work
- All frontend interactions and UI are fully functional

## For Full Functionality

For a fully functional deployment with authentication, payments, and dynamic data, deploy to a platform that supports server-side rendering:

- **Vercel** (recommended for Next.js): https://vercel.com
- **Netlify**: https://netlify.com
- **AWS Amplify**: https://aws.amazon.com/amplify
- **Render**: https://render.com

## Build Process

The GitHub Actions workflow:

1. Checks out the code
2. Installs dependencies
3. Temporarily removes API routes and dynamic routes
4. Builds the static site
5. Restores the removed routes (for local development)
6. Deploys the `out` directory to GitHub Pages

## Local Testing

To test the GitHub Pages build locally:

```bash
npm run build:gh-pages
```

This will create a static build in the `out` directory. You can serve it locally with:

```bash
npx serve out
```

## Configuration

The following files configure GitHub Pages deployment:

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `next.config.ts` - Next.js configuration with `output: 'export'` and `basePath`
- `scripts/build-gh-pages.sh` - Custom build script that excludes server-side code
- `public/.nojekyll` - Prevents GitHub Pages from processing files with Jekyll
