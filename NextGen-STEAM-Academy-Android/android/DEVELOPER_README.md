# NextGen STEAM Academy — Android Build Guide

## Project Info
- **App Name**: NextGen STEAM Academy
- **App ID**: `com.nextzenstem.academy`
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 36 (Android 16)
- **Capacitor Version**: 8.4.1
- **Live App URL**: `https://www.nextzenacademy.com`
- **AGP Version**: 8.10.0 (compatible with Android Studio Meerkat / Narwhal)

---

## Prerequisites

Before opening the project, make sure you have:

1. **Android Studio** (latest stable) — [Download here](https://developer.android.com/studio)
2. **JDK 17** — bundled with Android Studio (no separate install needed)
3. **Android SDK** with the following components (install via SDK Manager in Android Studio):
   - Android SDK Platform **36** (Android 16)
   - Android SDK Build-Tools **36.x.x**
   - Android Emulator (optional, for testing)

---

## How to Build

### Step 1 — Open Project in Android Studio
1. Launch **Android Studio**
2. Choose **"Open"** (NOT "New Project")
3. Navigate to this folder (`android/`) and click **Open**
4. Wait for Gradle sync to complete (may take a few minutes on first open)

### Step 2 — Build Debug APK
- Go to menu: **Build → Build Bundle(s)/APK(s) → Build APK(s)**
- The APK will be generated at:
  ```
  app/build/outputs/apk/debug/app-debug.apk
  ```

### Step 3 — Build Release APK (for Play Store)
- Go to menu: **Build → Generate Signed Bundle / APK**
- Choose **APK**
- Create or use an existing **Keystore** file
- Select **release** build variant
- The signed APK will be at:
  ```
  app/build/outputs/apk/release/app-release.apk
  ```

---

## Important Notes

### ✅ App Loads from Live Server
The app is configured to load content from the live deployed website:
```
https://www.nextzenacademy.com
```
This means **all features work fully** (login, enrollment forms, admin dashboard, MongoDB data, etc.).
The device must have **internet access** for the app to function — this is by design since it's a server-rendered Next.js app.

### ✅ Web Assets Already Included
Fallback static assets are bundled inside:
```
app/src/main/assets/public/
```

### ✅ Capacitor Config Already Included
The Capacitor configuration (including server URL) is at:
```
app/src/main/assets/capacitor.config.json
```

### ✅ Capacitor Plugins Already Included
Native Capacitor plugins are already compiled inside:
```
capacitor-cordova-android-plugins/
```

### ⚠️ Do NOT delete `app/src/main/assets/public/`
This folder contains the pre-built web app. It was generated from the Next.js project and synced using Capacitor. Deleting it will result in a blank app screen.

---

## Project Structure
```
android/
├── app/
│   ├── src/main/
│   │   ├── assets/
│   │   │   ├── public/              ← Web app assets (HTML/CSS/JS)
│   │   │   ├── capacitor.config.json
│   │   │   └── capacitor.plugins.json
│   │   ├── java/com/nextzenstem/academy/
│   │   │   └── MainActivity.java
│   │   ├── res/                     ← Icons, splash screens, drawables
│   │   └── AndroidManifest.xml
│   ├── build.gradle
│   └── capacitor.build.gradle
├── capacitor-cordova-android-plugins/   ← Native plugins
├── build.gradle
├── settings.gradle
├── variables.gradle                 ← SDK versions
└── gradle.properties
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "SDK not found" error | Open SDK Manager → install Android 36 platform + build tools |
| Gradle sync fails | File → Invalidate Caches and Restart, then sync again |
| App shows blank screen | Make sure `app/src/main/assets/public/` folder is present |
| Build tools version mismatch | Check `variables.gradle` for exact SDK versions required |

---

## Contact
If you have any issues, contact the project owner for the latest assets or a re-sync.
