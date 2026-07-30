# NextGen STEAM Academy - iOS App Store Deployment Guide

This package contains the native iOS project for **NextGen STEAM Academy** configured to load the live production server **https://www.nextzenacademy.com** (matching the Android configuration).

---

## 📱 App Specifications
- **App Name:** NextGen STEAM Academy
- **Bundle Identifier:** `com.nextzenstem.academy`
- **Minimum iOS Target:** iOS 14.0+
- **Production Server Endpoint:** `https://www.nextzenacademy.com`
- **Platform/Framework:** Capacitor 8 (Swift / SPM)

---

## 🚀 Xcode Deployment Instructions

### Step 1: Open the Project in Xcode
1. Unzip the package on a Mac running macOS with Xcode installed.
2. Double-click **`App.xcodeproj`** inside `App/App.xcodeproj` (or run `npx cap open ios`).

---

### Step 2: Configure Code Signing & Apple Developer Team
1. In Xcode, select the **App** project in the left Navigator panel.
2. Under **Targets**, select **App**.
3. Go to the **Signing & Capabilities** tab.
4. Check **"Automatically manage signing"**.
5. Select your **Apple Developer Team** from the dropdown menu.
6. Verify that the **Bundle Identifier** is set to `com.nextzenstem.academy`.

---

### Step 3: Verify Server Endpoint Configuration
The iOS app is configured in `App/App/capacitor.config.json` to load the live web platform (`https://www.nextzenacademy.com`):
```json
{
  "appId": "com.nextzenstem.academy",
  "appName": "NextGen STEAM Academy",
  "webDir": "public",
  "server": {
    "url": "https://www.nextzenacademy.com",
    "cleartext": false,
    "iosScheme": "https"
  }
}
```

---

### Step 4: Info.plist Permissions Check
Privacy permissions are declared in `App/App/Info.plist`:
- `NSCameraUsageDescription`: Required for scanning student QR codes for check-in/check-out.
- `NSPhotoLibraryUsageDescription`: Required for submitting student homework assignments.
- `NSLocationWhenInUseUsageDescription`: Required for verifying student check-in locations.

---

### Step 5: Build, Archive & Submit to App Store Connect

1. Select **Any iOS Device (arm64)** as the target device in the top bar.
2. Go to Xcode menu: **Product → Scheme → Edit Scheme...**
   - Ensure Build Configuration is set to **Release**.
3. Go to Xcode menu: **Product → Archive**.
4. Once archiving completes, the **Organizer** window will open.
5. Select your archive and click **Validate App** to run pre-submission validation checks.
6. Click **Distribute App** → Select **App Store Connect** → **Upload**.
7. Complete the prompts to upload the build to App Store Connect / TestFlight.

---

## 📄 Demo Credentials for App Store Reviewer
In App Store Connect under **App Review Information**, provide these credentials:
- **Test Parent Account:**
  - Email: `parent@test.com`
  - Password: `TestPassword123!`
- **Test Teacher Account:**
  - Email: `teacher@test.com`
  - Password: `TestPassword123!`

---

For technical assistance or backend URL updates, contact the engineering team at `support@nextzenstem.com`.
