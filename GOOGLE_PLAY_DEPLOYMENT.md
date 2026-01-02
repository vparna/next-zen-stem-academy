# Google Play Store Deployment Guide

This guide will walk you through deploying the NextGen STEM Academy mobile app to the Google Play Store.

## Prerequisites

Before you begin, ensure you have:
- A Google Play Developer account ($25 one-time registration fee)
- Android Studio installed
- Node.js and npm installed
- A build machine (Windows, Mac, or Linux)

## Step 1: Prepare Your App for Production

### 1.1 Update App Configuration

Create or update `app.json` in your project root:

```json
{
  "name": "NextGen STEM Academy",
  "displayName": "NextGen STEM",
  "expo": {
    "name": "NextGen STEM Academy",
    "slug": "nextgen-stem-academy",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./public/logo-icon.svg",
    "splash": {
      "image": "./public/logo.svg",
      "resizeMode": "contain",
      "backgroundColor": "#4F46E5"
    },
    "android": {
      "package": "com.nextzenstem.academy",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./public/logo-icon.svg",
        "backgroundColor": "#4F46E5"
      },
      "permissions": [
        "CAMERA",
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "INTERNET"
      ]
    }
  }
}
```

### 1.2 Generate App Icons

You'll need icons in multiple sizes:
- 48x48 (mdpi)
- 72x72 (hdpi)
- 96x96 (xhdpi)
- 144x144 (xxhdpi)
- 192x192 (xxxhdpi)

Use online tools like:
- https://appicon.co/
- https://romannurik.github.io/AndroidAssetStudio/

### 1.3 Create Screenshots

Capture screenshots of your app in action (minimum 2, maximum 8):
- Phone: 1080x1920 or 1440x2560
- Tablet: 1200x1920 or 1600x2560

Required screens:
1. Login/Welcome screen
2. QR Code generation
3. Scanner in action
4. Attendance history
5. Chat interface

## Step 2: Build the Android App

### Option A: Using React Native (Recommended for this project)

Since this is a Next.js web app, we'll use Capacitor to create a native wrapper:

#### 2.1 Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npx cap init "NextGen STEM Academy" "com.nextzenstem.academy"
```

#### 2.2 Add Android Platform

```bash
npm install @capacitor/android
npx cap add android
```

#### 2.3 Build Web Assets

```bash
npm run build
npx cap sync
```

#### 2.4 Configure Android Project

Open `android/app/build.gradle` and update:

```gradle
android {
    compileSdkVersion 33
    defaultConfig {
        applicationId "com.nextzenstem.academy"
        minSdkVersion 22
        targetSdkVersion 33
        versionCode 1
        versionName "1.0.0"
    }
}
```

#### 2.5 Add Permissions

Update `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest>
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-feature android:name="android.hardware.camera" />
    
    <application>
        <!-- Your app configuration -->
    </application>
</manifest>
```

### Option B: Using PWA (Progressive Web App)

If you prefer a PWA approach:

#### 2.1 Create manifest.json

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
  "orientation": "portrait",
  "icons": [
    {
      "src": "/logo-icon.svg",
      "sizes": "192x192",
      "type": "image/svg+xml"
    },
    {
      "src": "/logo.svg",
      "sizes": "512x512",
      "type": "image/svg+xml"
    }
  ]
}
```

#### 2.2 Use Trusted Web Activity (TWA)

Google provides a tool to create an Android app wrapper:

```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest=https://yourdomain.com/manifest.json
bubblewrap build
```

## Step 3: Generate a Signed APK/AAB

### 3.1 Generate Keystore

```bash
keytool -genkey -v -keystore nextgen-stem.keystore -alias nextgen-stem -keyalg RSA -keysize 2048 -validity 10000
```

Save the keystore file securely and remember the passwords!

### 3.2 Configure Signing (Capacitor)

Create `android/key.properties`:

```properties
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=nextgen-stem
storeFile=../nextgen-stem.keystore
```

Add to `.gitignore`:
```
android/key.properties
*.keystore
```

Update `android/app/build.gradle`:

```gradle
def keystorePropertiesFile = rootProject.file("key.properties")
def keystoreProperties = new Properties()
keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

android {
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### 3.3 Build Release APK/AAB

```bash
cd android
./gradlew assembleRelease  # For APK
./gradlew bundleRelease     # For AAB (recommended)
```

Output files:
- APK: `android/app/build/outputs/apk/release/app-release.apk`
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`

## Step 4: Create Google Play Console Account

1. Go to https://play.google.com/console
2. Pay the $25 registration fee
3. Complete your account information
4. Accept the Developer Distribution Agreement

## Step 5: Create App Listing

### 5.1 Create New App

1. Click "Create app"
2. Fill in:
   - App name: "NextGen STEM Academy"
   - Default language: English (US)
   - App or game: App
   - Free or paid: Free
3. Accept declarations

### 5.2 Store Listing

Complete all required fields:

**App Details:**
- App name: NextGen STEM Academy
- Short description (80 chars): Mobile attendance tracking and communication for NextGen STEM Academy
- Full description (4000 chars):
```
NextGen STEM Academy is a comprehensive mobile application designed for seamless attendance tracking and communication between parents, students, and teachers.

KEY FEATURES:

📱 QR Code-Based Attendance
- Generate unique QR codes for each student
- Quick check-in and check-out with QR scanning
- View complete attendance history

💬 Course-Based Messaging
- Direct communication with teachers
- Organized by course enrollment
- Real-time message updates

📊 Attendance Analytics
- Track student attendance patterns
- View check-in and check-out times
- Generate attendance reports

🔔 Push Notifications
- Instant check-in/out confirmations
- Important updates from teachers

📍 Location Verification
- Ensure check-ins occur on school premises
- Enhanced security and accuracy

📸 Photo Capture
- Optional photo verification during check-in
- Visual attendance records

📤 Homework Submission
- Submit assignments via chat
- Share files and photos
- Track submission history

OFFLINE SUPPORT:
- Generate QR codes offline
- Access stored attendance data
- Sync automatically when online

SECURITY:
- Secure authentication
- Role-based access control
- Encrypted communications

Perfect for parents who want to stay connected with their child's education and teachers who need efficient attendance management.
```

**App Icon:** Upload 512x512 PNG icon

**Screenshots:** Upload at least 2 screenshots for each device type

**Feature Graphic:** 1024x500 PNG banner image

### 5.3 Categorization

- App category: Education
- Tags: education, attendance, stem, learning

### 5.4 Contact Details

- Email: support@nextzenstem.com
- Phone: (Optional)
- Website: https://nextzenstem.com

### 5.5 Privacy Policy

Required! Host your privacy policy on your website and provide the URL.

Example privacy policy should cover:
- What data you collect
- How you use the data
- Data security measures
- User rights
- Contact information

## Step 6: Content Rating

1. Go to "Content rating" section
2. Fill out the questionnaire
3. Categories typically include:
   - Violence
   - Sexuality
   - Language
   - Controlled substances
   - Gambling
   - etc.
4. For this educational app, most answers should be "No"

## Step 7: Set Up Pricing & Distribution

1. Go to "Pricing & distribution"
2. Select "Free"
3. Select countries/regions (or "All countries")
4. Confirm content guidelines
5. Target audience: Select appropriate age ranges (likely 4-18)

## Step 8: Upload Your App

### 8.1 Create Production Release

1. Go to "Production" → "Create new release"
2. Upload your AAB file
3. Add release name: "1.0.0"
4. Add release notes:
```
Initial release of NextGen STEM Academy mobile app

Features:
- QR code-based attendance tracking
- Course messaging system
- Attendance history and analytics
- Push notifications
- Offline QR code support
- Location verification
- Photo capture during check-in
- Homework submission
```

### 8.2 App Signing

- Option 1: Let Google manage signing (recommended)
- Option 2: Use your own signing key

For Google-managed signing:
1. Google will re-sign your APK/AAB
2. You get an upload certificate
3. Google handles the release certificate

## Step 9: Review and Publish

### 9.1 Complete All Sections

Ensure all required sections are complete:
- ✅ Store listing
- ✅ Content rating
- ✅ Pricing & distribution
- ✅ App content (Privacy policy, Ads, etc.)
- ✅ Production release

### 9.2 Submit for Review

1. Review your app details
2. Click "Submit for review"
3. Wait for Google to review (typically 1-7 days)

### 9.3 Review Process

Google will check:
- Compliance with policies
- App functionality
- Content appropriateness
- Security issues

If rejected, address the issues and resubmit.

## Step 10: Post-Publication

### 10.1 Monitor Performance

- Check crash reports
- Review user feedback
- Monitor download statistics
- Track ratings and reviews

### 10.2 Respond to Reviews

- Reply to user reviews
- Address concerns promptly
- Thank users for positive feedback

### 10.3 Update Your App

For updates:
1. Increment version code in build.gradle
2. Update version name
3. Build new AAB
4. Create new release in Play Console
5. Submit for review

## Troubleshooting

### Common Issues

**Build Failed:**
- Check Gradle version compatibility
- Ensure all dependencies are compatible
- Clean and rebuild: `./gradlew clean`

**App Rejected:**
- Review rejection reason carefully
- Fix all policy violations
- Ensure privacy policy is accessible
- Test thoroughly before resubmitting

**Signing Issues:**
- Verify keystore passwords
- Ensure keystore file is accessible
- Check signing configuration in build.gradle

### Resources

- Google Play Console Help: https://support.google.com/googleplay/android-developer
- Capacitor Documentation: https://capacitorjs.com/docs
- Android Developer Guide: https://developer.android.com/

## Maintenance Checklist

- [ ] Update app regularly (security patches, bug fixes)
- [ ] Monitor crash reports
- [ ] Respond to user reviews within 48 hours
- [ ] Test on multiple devices before release
- [ ] Keep documentation up-to-date
- [ ] Maintain privacy policy
- [ ] Track analytics and user feedback

## Security Best Practices

1. **Never commit sensitive data:**
   - Keystore files
   - Passwords
   - API keys

2. **Use environment variables:**
   - Store API URLs in environment config
   - Use different configs for dev/staging/production

3. **Regular updates:**
   - Update dependencies regularly
   - Apply security patches promptly
   - Test thoroughly after updates

4. **User data protection:**
   - Encrypt sensitive data
   - Use HTTPS for all communications
   - Implement proper authentication

## Conclusion

Following this guide will help you successfully deploy your mobile app to the Google Play Store. Remember to:
- Test thoroughly before submission
- Comply with all Google Play policies
- Respond to user feedback
- Keep your app updated

For technical support with NextGen STEM Academy, contact: support@nextzenstem.com

Good luck with your deployment! 🚀
