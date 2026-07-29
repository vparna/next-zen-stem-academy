# NextGen STEAM Academy — iOS Build Guide

## Project Info
- **App Name**: NextGen STEAM Academy
- **Bundle ID**: `com.nextzenstem.academy`
- **Min iOS Version**: 15.0
- **Capacitor Version**: 8.4.1
- **Swift Package Manager**: Used for Capacitor dependencies

---

## Prerequisites

Before opening the project, make sure you have:

1. **Mac with macOS 13 (Ventura) or later**
2. **Xcode 15 or later** — [Download from Mac App Store](https://apps.apple.com/app/xcode/id497799835)
3. **Apple Developer Account** — Required for device testing and App Store submission
   - Enroll at [developer.apple.com](https://developer.apple.com)
4. **CocoaPods** (optional, not required — project uses Swift Package Manager)

---

## How to Open the Project

> ⚠️ **Important**: Open the `.xcodeproj` file, NOT a `.xcworkspace` (no CocoaPods used here — SPM handles dependencies).

1. Launch **Xcode**
2. Choose **"Open a project or file"**
3. Navigate to `App/App.xcodeproj` inside this folder and click **Open**
4. Wait for **Swift Package Manager** to resolve dependencies automatically
   - It will download `capacitor-swift-pm` from GitHub (~30–60 seconds, requires internet)

---

## How to Build & Run

### On Simulator
1. Select a Simulator device from the toolbar (e.g., "iPhone 16")
2. Press **⌘ + R** (or click the ▶ Play button)

### On a Physical Device
1. Connect your iPhone via USB
2. Select your device from the toolbar
3. Go to **Xcode → Settings → Accounts** → sign in with your Apple ID
4. Select the project in the navigator → **Signing & Capabilities** tab
5. Under **Team**, select your Apple Developer Team
6. Enable **Automatically manage signing**
7. Press **⌘ + R** to build and run

### Build for App Store (Archive)
1. Select **"Any iOS Device (arm64)"** as the destination (not a simulator)
2. Go to **Product → Archive**
3. Once archived, the **Organizer** window opens automatically
4. Click **Distribute App** → follow the App Store Connect wizard
5. Submit for review on [appstoreconnect.apple.com](https://appstoreconnect.apple.com)

---

## Important Notes

### ✅ Web Assets Already Included
The pre-built web app is bundled at:
```
App/App/public/
```
No Node.js or web build steps needed — everything is ready.

### ✅ Capacitor Config Already Included
```
App/App/capacitor.config.json
```

### ✅ Capacitor Plugins via Swift Package Manager
Dependencies are managed via `CapApp-SPM/Package.swift`. Xcode will auto-download them on first open (internet required).

### ✅ Cordova Plugins Included
```
capacitor-cordova-ios-plugins/
```

### ⚠️ Do NOT delete `App/App/public/`
This folder contains the pre-built web app assets. Deleting it results in a blank white screen in the app.

### ⚠️ Signing Required for Device/Store Builds
Simulator builds work without a paid Apple Developer account. For physical device testing or App Store submission, a **paid Apple Developer account ($99/year)** is required.

---

## Project Structure
```
ios/
├── App/
│   ├── App/
│   │   ├── public/                 ← Web app assets (HTML/CSS/JS)
│   │   ├── AppDelegate.swift       ← App entry point
│   │   ├── Assets.xcassets/        ← App icons & splash images
│   │   ├── capacitor.config.json   ← Capacitor configuration
│   │   ├── config.xml
│   │   └── Info.plist              ← App metadata & permissions
│   ├── App.xcodeproj/              ← ⬅ Open THIS in Xcode
│   └── CapApp-SPM/
│       └── Package.swift           ← Swift Package Manager config
├── capacitor-cordova-ios-plugins/  ← Native Cordova plugins
├── debug.xcconfig
└── DEVELOPER_README.md             ← You are here
```

---

## App Permissions (already configured in Info.plist)
| Permission | Purpose |
|------------|---------|
| Camera | QR code scanning |
| Photo Library | Homework submission uploads |
| Location | Check-in verification |
| Push Notifications | Alerts for parents & students |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| SPM dependencies fail to resolve | Check internet connection; try File → Packages → Reset Package Caches |
| "No such module 'Capacitor'" | Let SPM finish resolving, then clean build (⌘+Shift+K) |
| App shows blank/white screen | Ensure `App/App/public/` folder exists and is not empty |
| Signing error | Go to Signing & Capabilities tab → select your Team → enable auto-signing |
| "Untrusted developer" on device | Go to iPhone Settings → General → VPN & Device Management → Trust your cert |
| Build fails with Xcode 14 or older | Upgrade to Xcode 15+ (project targets iOS 15, Capacitor 8 requires Xcode 15+) |

---

## Contact
If you encounter any issues or need updated web assets, contact the project owner for a re-sync.
