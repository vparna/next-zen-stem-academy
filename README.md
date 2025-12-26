# Next Zen STEM Academy

A modern, scalable ed-tech platform where parents and students can discover courses, enroll, pay online, and manage their learning journey. Built with Next.js, TypeScript, MongoDB, and integrated with Stripe for payments.

## 🎯 Features

- **Modern Web Application**: Built with Next.js 16 and React 19 for optimal performance and SEO
- **3S Philosophy**: Skills, Science, and Success - our unique approach to STEM education
- **Course Management**: Browse and enroll in Robotics, Mathematics, and Chess courses
- **User Authentication**: Secure JWT-based authentication system
- **Payment Integration**: Stripe integration for secure online payments
- **User Dashboard**: Manage profile, children, and enrolled courses
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **TypeScript**: Full type safety across the application

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Forms**: React Hook Form
- **State Management**: React hooks and local state

### Backend
- **Runtime**: Node.js
- **API Routes**: Next.js API routes
- **Database**: MongoDB with native driver
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

### Payment
- **Payment Gateway**: Stripe
- **Features**: One-time course payments, webhooks support

## 📋 Prerequisites

- Node.js 20 or higher
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager
- Stripe account (for payment processing)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vparna/next-zen-stem-academy.git
   cd next-zen-stem-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/next-zen-stem-academy
   # For MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/next-zen-stem-academy
   
   # JWT Secret (generate a secure random string)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Stripe Keys
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   STRIPE_SECRET_KEY=sk_test_your_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   
   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
next-zen-stem-academy/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── courses/              # Course management
│   │   ├── enrollments/          # Enrollment management
│   │   ├── profile/              # User profile
│   │   └── children/             # Children management
│   ├── about/                    # About page
│   ├── courses/                  # Courses listing page
│   ├── login/                    # Login page
│   ├── signup/                   # Signup page
│   ├── dashboard/                # User dashboard
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── Navbar.tsx                # Navigation bar
│   └── Footer.tsx                # Footer component
├── lib/                          # Utility libraries
│   ├── db/                       # Database utilities
│   │   └── mongodb.ts            # MongoDB connection
│   └── auth/                     # Authentication utilities
│       └── jwt.ts                # JWT functions
├── models/                       # Data models
│   ├── User.ts                   # User model
│   ├── Course.ts                 # Course model
│   ├── Enrollment.ts             # Enrollment model
│   └── Child.ts                  # Child model
├── types/                        # TypeScript type definitions
│   └── index.ts                  # Shared types
├── middleware/                   # Custom middleware
│   └── auth.ts                   # Authentication middleware
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind configuration
└── next.config.ts                # Next.js configuration
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses?category=Robotics` - Filter courses by category
- `GET /api/courses/[id]` - Get course details

### Enrollments (Protected)
- `POST /api/enrollments` - Create new enrollment

### Profile (Protected)
- `GET /api/profile` - Get user profile
- `PATCH /api/profile` - Update user profile

### Children (Protected)
- `GET /api/children` - Get user's children
- `POST /api/children` - Add a child

## 🗄️ Database Schema

### Users Collection
```typescript
{
  _id: ObjectId,
  email: string,
  password: string (hashed),
  firstName: string,
  lastName: string,
  phone: string?,
  createdAt: Date,
  updatedAt: Date
}
```

### Courses Collection
```typescript
{
  _id: ObjectId,
  name: string,
  category: 'Robotics' | 'Maths' | 'Chess' | 'Other',
  description: string,
  fullDescription: string,
  price: number,
  duration: string,
  ageGroup: string,
  features: string[],
  active: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Enrollments Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  childId: ObjectId?,
  courseId: ObjectId,
  batchId: ObjectId?,
  status: 'pending' | 'active' | 'completed' | 'cancelled',
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded',
  paymentId: string?,
  amount: number,
  enrolledAt: Date
}
```

### Children Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  name: string,
  age: number,
  grade: string?,
  createdAt: Date
}
```

## 🎨 Key Pages

1. **Home Page** (`/`) - Hero section, 3S philosophy, course preview
2. **About Page** (`/about`) - Detailed information about the academy
3. **Courses Page** (`/courses`) - Browse and filter courses
4. **Login Page** (`/login`) - User authentication
5. **Signup Page** (`/signup`) - New user registration
6. **Dashboard** (`/dashboard`) - User dashboard with enrolled courses

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes with middleware
- Input validation
- Secure environment variables

## 🚢 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables
   - Deploy

3. **Set up MongoDB Atlas**
   - Create a cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Get connection string
   - Add to Vercel environment variables

4. **Configure Stripe**
   - Get API keys from [stripe.com](https://stripe.com)
   - Add to Vercel environment variables

## 🧪 Development

### Running the Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📝 Environment Variables

Required environment variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_APP_URL` - Application URL

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For questions or support, please contact:
- Email: info@nextzenstem.com
- Website: [nextzenstem.com](http://localhost:3000)

## 🔮 Future Enhancements

- [ ] Multi-child discount support
- [ ] Coupon system
- [ ] Email notifications
- [ ] Course completion certificates
- [ ] Progress tracking
- [ ] Video lessons integration
- [ ] Live class scheduling
- [ ] Parent-teacher messaging
- [ ] Assignment submissions
- [ ] Quiz and assessments

---

Built with ❤️ using Next.js and TypeScript
