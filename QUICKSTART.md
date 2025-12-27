# Quick Start Guide - NextGen Stem Academy

This guide will help you get the NextGen Stem Academy platform up and running quickly.

## Prerequisites

- Node.js 20 or higher
- MongoDB (local or Atlas)
- npm or yarn
- Stripe account (for payments)

## Step 1: Clone and Install

```bash
git clone https://github.com/vparna/next-zen-stem-academy.git
cd next-gen-stem-academy
npm install
```

## Step 2: Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your credentials:
   ```env
   # MongoDB (use local or Atlas)
   MONGODB_URI=mongodb://localhost:27017/next-gen-stem-academy
   
   # Generate a secure random string for JWT
   JWT_SECRET=your-secure-random-string-here
   
   # Get these from your Stripe Dashboard
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   
   # Your app URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

## Step 3: Start MongoDB

### Option A: Local MongoDB
```bash
mongod
```

### Option B: MongoDB Atlas
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in `.env.local`

## Step 4: Seed the Database (Optional)

Populate your database with sample courses:

```bash
npm run seed
```

This creates 6 sample courses across Robotics, Mathematics, and Chess categories.

## Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 6: Test the Application

### Create an Account
1. Navigate to http://localhost:3000/signup
2. Fill in your details
3. Click "Sign up"
4. You'll be redirected to the dashboard

### Browse Courses
1. Go to http://localhost:3000/courses
2. Filter by category (Robotics, Maths, Chess)
3. Click on a course to view details

### Enroll in a Course
1. Click "Enroll Now" on a course detail page
2. You'll be taken to the checkout page
3. Click "Pay $XXX" to simulate enrollment
4. You'll be redirected to your dashboard

## Building for Production

```bash
npm run build
npm start
```

## Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_APP_URL`
5. Deploy!

## Key Features to Explore

### For Users
- **Home Page**: Learn about the 3S philosophy
- **About Page**: Detailed information about the academy
- **Courses**: Browse and filter courses by category
- **Authentication**: Sign up and log in
- **Dashboard**: View enrolled courses and manage profile
- **Checkout**: Enroll in courses (demo mode)

### For Developers
- **API Routes**: RESTful API in `/app/api`
- **Models**: Database models in `/models`
- **Components**: Reusable components in `/components`
- **Authentication**: JWT-based auth in `/lib/auth`
- **Database**: MongoDB utilities in `/lib/db`

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check your `MONGODB_URI` in `.env.local`
- For Atlas, whitelist your IP address

### Build Errors
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`

### Port Already in Use
- Change the port: `PORT=3001 npm run dev`
- Or kill the process using port 3000

## Next Steps

1. **Customize Content**: Update course information, images, and branding
2. **Set Up Real Payments**: Configure Stripe with your business details
3. **Add Email Service**: Integrate with SendGrid or similar for notifications
4. **Enhance Dashboard**: Add more features like progress tracking
5. **Add Admin Panel**: Create admin routes for course management

## Support

For issues or questions:
- Check the [README.md](./README.md) for detailed documentation
- Review the code comments in the source files
- Consult Next.js documentation at [nextjs.org](https://nextjs.org)

## License

MIT License - feel free to use this for your own projects!
