# Mobile App Configuration Guide

This guide provides detailed instructions for configuring the NextGen STEM Academy mobile app for production deployment.

## Table of Contents

1. [Environment Configuration](#environment-configuration)
2. [Feature Configuration](#feature-configuration)
3. [Security Configuration](#security-configuration)
4. [Service Integration](#service-integration)
5. [PWA Configuration](#pwa-configuration)
6. [Native App Configuration](#native-app-configuration)
7. [Testing Configuration](#testing-configuration)

## Environment Configuration

### 1. Create Environment Files

Create `.env.local` for development and `.env.production` for production:

```bash
# .env.production

# App Configuration
NEXT_PUBLIC_APP_NAME="NextGen STEM Academy"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_BASE_URL="https://nextzenstem.com"

# API Configuration
NEXT_PUBLIC_API_URL="https://nextzenstem.com/api"

# MongoDB
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/nextzenstem"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Feature Flags
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_LOCATION=true
NEXT_PUBLIC_ENABLE_PHOTO_CAPTURE=true
NEXT_PUBLIC_ENABLE_VIDEO_CALLS=true
NEXT_PUBLIC_ENABLE_OFFLINE_MODE=true

# Location Verification
NEXT_PUBLIC_SCHOOL_LATITUDE="37.7749"
NEXT_PUBLIC_SCHOOL_LONGITUDE="-122.4194"
NEXT_PUBLIC_LOCATION_RADIUS_METERS="100"

# File Upload
NEXT_PUBLIC_MAX_FILE_SIZE_MB="5"
NEXT_PUBLIC_ALLOWED_FILE_TYPES="image/*,application/pdf,.doc,.docx"

# Video Call (Choose your provider)
# ZOOM_API_KEY=""
# ZOOM_API_SECRET=""
# TWILIO_ACCOUNT_SID=""
# TWILIO_AUTH_TOKEN=""
# NEXT_PUBLIC_VIDEO_PROVIDER="jitsi"  # jitsi, zoom, twilio

# Push Notifications (if using FCM or similar)
# NEXT_PUBLIC_FIREBASE_API_KEY=""
# NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
# NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
# NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
# NEXT_PUBLIC_FIREBASE_APP_ID=""

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-specific-password"
SMTP_FROM="NextGen STEM Academy <noreply@nextzenstem.com>"

# Analytics (optional)
# NEXT_PUBLIC_GA_TRACKING_ID=""
# NEXT_PUBLIC_SENTRY_DSN=""
```

### 2. Security Configuration

**IMPORTANT**: Never commit sensitive credentials to version control!

Update `.gitignore`:
```
.env
.env.local
.env.production
*.keystore
key.properties
```

## Feature Configuration

### Push Notifications

#### Option 1: Browser Native Notifications (Current Implementation)

Already implemented in `lib/notifications.ts`. No additional configuration needed.

Features:
- ✅ Works in modern browsers
- ✅ No external dependencies
- ❌ Limited functionality
- ❌ No server-side push

#### Option 2: Firebase Cloud Messaging (Recommended for Production)

**Setup:**

1. Create Firebase project: https://console.firebase.google.com

2. Install Firebase:
```bash
npm install firebase
```

3. Create `lib/firebase.ts`:
```typescript
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
```

4. Create `public/firebase-messaging-sw.js`:
```javascript
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
});

const messaging = firebase.messaging();
```

### Offline Mode

Already implemented in `lib/offline-qr.ts`. Configuration options:

```typescript
// In your app initialization
import { setOfflineMode } from '@/lib/offline-qr';

// Enable/disable offline mode
setOfflineMode(true);

// Configure QR code validity period (hours)
const QR_CODE_VALIDITY_HOURS = 24; // Default
```

### Geolocation

Already implemented in `lib/geolocation.ts`. Configure school location:

```typescript
import { storeSchoolLocation, setLocationVerificationEnabled } from '@/lib/geolocation';

// Set school location (do this in admin panel)
storeSchoolLocation(
  parseFloat(process.env.NEXT_PUBLIC_SCHOOL_LATITUDE!),
  parseFloat(process.env.NEXT_PUBLIC_SCHOOL_LONGITUDE!)
);

// Enable location verification
setLocationVerificationEnabled(true);
```

### Photo Capture

Already implemented in `lib/photo-capture.ts`. Configuration:

```typescript
import { setPhotoCaptureEnabled } from '@/lib/photo-capture';

// Enable/disable photo capture
setPhotoCaptureEnabled(true);
```

### Video Calls

Already implemented in `lib/video-call.ts`. Choose your provider:

#### Option 1: Jitsi Meet (Free, No Setup Required)

```typescript
import { VideoServiceIntegration } from '@/lib/video-call';

const meetingLink = VideoServiceIntegration.jitsi.createMeeting('room-name');
// Opens: https://meet.jit.si/room-name
```

#### Option 2: Zoom (Requires Paid Account)

1. Create Zoom app: https://marketplace.zoom.us/develop/create
2. Get API credentials
3. Implement:

```typescript
// Install Zoom SDK
npm install @zoom/meetingsdk

// Use Zoom integration
const meetingLink = await VideoServiceIntegration.zoom.createMeeting(
  'Parent-Teacher Meeting',
  new Date()
);
```

#### Option 3: Twilio Video (Pay-as-you-go)

1. Sign up: https://www.twilio.com/console/video
2. Get credentials
3. Implement:

```bash
npm install twilio
```

```typescript
const meetingLink = await VideoServiceIntegration.twilio.createRoom('room-name');
```

## PWA Configuration

### 1. Create Web App Manifest

Create `public/manifest.json`:

```json
{
  "name": "NextGen STEM Academy",
  "short_name": "NextGen STEM",
  "description": "Mobile attendance and chat for NextGen STEM Academy",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#4F46E5",
  "theme_color": "#4F46E5",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["education", "productivity"],
  "screenshots": [
    {
      "src": "/screenshots/screenshot1.png",
      "sizes": "540x720",
      "type": "image/png"
    }
  ]
}
```

### 2. Update HTML Head

In your root layout (`app/layout.tsx`):

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="description" content="NextGen STEM Academy Mobile App" />
        
        {/* PWA Configuration */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        
        {/* iOS Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NextGen STEM" />
        
        <title>NextGen STEM Academy</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 3. Create Service Worker

Create `public/sw.js`:

```javascript
const CACHE_NAME = 'nextgen-stem-v1';
const urlsToCache = [
  '/',
  '/mobile',
  '/mobile/qr-code',
  '/mobile/scanner',
  '/mobile/attendance',
  '/mobile/chat',
  '/offline',
];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Update service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

### 4. Register Service Worker

Create `lib/register-sw.ts`:

```typescript
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });
    });
  }
}
```

## Native App Configuration (Capacitor)

### 1. Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npx cap init "NextGen STEM Academy" "com.nextzenstem.academy"
```

### 2. Add Platforms

```bash
npm install @capacitor/android @capacitor/ios
npx cap add android
npx cap add ios
```

### 3. Configure Capacitor

Update `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nextzenstem.academy',
  appName: 'NextGen STEM Academy',
  webDir: 'out',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#4F46E5",
      showSpinner: false,
    },
    Camera: {
      ios: {
        permissions: {
          camera: "This app needs camera access to scan QR codes.",
          photos: "This app needs photo library access for homework submission.",
        },
      },
    },
    Geolocation: {
      ios: {
        permissions: {
          location: "This app needs location access to verify check-ins.",
        },
      },
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
```

### 4. Install Required Plugins

```bash
npm install @capacitor/camera
npm install @capacitor/geolocation
npm install @capacitor/push-notifications
npm install @capacitor/app
npm install @capacitor/network
```

### 5. Sync Web Assets

```bash
npm run build
npx cap sync
```

## Testing Configuration

### 1. Create Test Accounts

Create test accounts for review:

```sql
-- Parent Account
INSERT INTO users (email, password, firstName, lastName, role)
VALUES ('parent@test.com', 'hashed_password', 'Test', 'Parent', 'parent');

-- Teacher Account
INSERT INTO users (email, password, firstName, lastName, role)
VALUES ('teacher@test.com', 'hashed_password', 'Test', 'Teacher', 'teacher');

-- Add test child
INSERT INTO children (userId, name, age, grade)
VALUES (parent_user_id, 'Test Child', 10, '5th Grade');
```

### 2. Configure Test Environment

Create `.env.test`:

```bash
MONGODB_URI="mongodb://localhost:27017/nextzenstem-test"
JWT_SECRET="test-secret-key"
NODE_ENV="test"
```

### 3. Mobile Testing Checklist

- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Test offline functionality
- [ ] Test QR code generation
- [ ] Test QR code scanning
- [ ] Test camera permissions
- [ ] Test location permissions
- [ ] Test notifications
- [ ] Test file upload
- [ ] Test video calls
- [ ] Test on slow network
- [ ] Test on 3G/4G
- [ ] Test app installation (PWA)
- [ ] Test home screen icon

## Performance Optimization

### 1. Enable Compression

In `next.config.js`:

```javascript
module.exports = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};
```

### 2. Optimize Images

```bash
npm install sharp
```

### 3. Enable Caching

Configure caching headers in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## Security Best Practices

### 1. Content Security Policy

Add to `next.config.js`:

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 2. API Rate Limiting

Implement rate limiting for API endpoints (optional but recommended).

### 3. Input Validation

Always validate and sanitize user input on both client and server.

## Deployment Checklist

- [ ] Set all environment variables
- [ ] Configure domain/SSL
- [ ] Test all features
- [ ] Enable analytics
- [ ] Set up error monitoring (Sentry)
- [ ] Configure backup strategy
- [ ] Test performance
- [ ] Review security
- [ ] Create user documentation
- [ ] Prepare app store assets
- [ ] Submit for review

## Monitoring & Analytics

### Google Analytics (Optional)

```bash
npm install @next/third-parties
```

In `app/layout.tsx`:

```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}
```

### Sentry Error Monitoring (Optional)

```bash
npm install @sentry/nextjs
```

Follow: https://docs.sentry.io/platforms/javascript/guides/nextjs/

## Support & Resources

- Next.js Documentation: https://nextjs.org/docs
- Capacitor Documentation: https://capacitorjs.com/docs
- PWA Guidelines: https://web.dev/progressive-web-apps/
- Firebase Documentation: https://firebase.google.com/docs

## Troubleshooting

### PWA Not Installing

1. Check HTTPS is enabled
2. Verify manifest.json is accessible
3. Ensure service worker is registered
4. Check browser console for errors

### Camera Not Working

1. Verify HTTPS connection
2. Check camera permissions
3. Test on different browsers
4. Verify camera is not used by another app

### Location Not Working

1. Check HTTPS connection
2. Verify location permissions
3. Test on device (not emulator)
4. Check location services are enabled

## Conclusion

This configuration guide covers all aspects of setting up the NextGen STEM Academy mobile app. Follow each section carefully and test thoroughly before deployment.

For support, contact: support@nextzenstem.com
