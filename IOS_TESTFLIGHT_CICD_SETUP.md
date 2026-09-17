# iOS TestFlight CI/CD Setup Guide

This guide explains how to configure the GitHub Actions CI/CD pipeline to automatically build and deploy the NextGen STEAM Academy app to Apple TestFlight for testing on real iPhones.

## Overview

The pipeline (`.github/workflows/ios-testflight.yml`) automatically:
1. Builds the Next.js web assets
2. Syncs them into the Capacitor iOS project
3. Archives the iOS app with proper code signing
4. Uploads the IPA to TestFlight

**Triggers:**
- Push to `main` branch (excluding markdown files)
- Manual trigger via GitHub Actions UI (with optional build number override)

---

## Prerequisites

- **Apple Developer Program** membership ($99/year) — [Enroll here](https://developer.apple.com/programs/)
- **App Store Connect** app record created for bundle ID `com.nextzenstem.academy`
- **App Store Connect API Key** for automated uploads

---

## Required GitHub Secrets

Go to your repository **Settings → Secrets and variables → Actions** and add these secrets:

### Code Signing Secrets

| Secret Name | Description | How to Get It |
|---|---|---|
| `P12_CERTIFICATE_BASE64` | Base64-encoded `.p12` distribution certificate | See [Certificate Setup](#1-export-distribution-certificate) |
| `P12_PASSWORD` | Password for the `.p12` file | The password you set when exporting |
| `PROVISIONING_PROFILE_BASE64` | Base64-encoded provisioning profile | See [Provisioning Profile Setup](#2-create-provisioning-profile) |
| `CODE_SIGN_IDENTITY` | Code signing identity name | e.g., `Apple Distribution: Your Name (TEAM_ID)` |
| `PROVISIONING_PROFILE_NAME` | Provisioning profile name | e.g., `NextGen STEAM Academy AppStore` |
| `APPLE_TEAM_ID` | Your Apple Developer Team ID | Found in [developer.apple.com/account](https://developer.apple.com/account) → Membership |

### App Store Connect Secrets

| Secret Name | Description | How to Get It |
|---|---|---|
| `APP_STORE_CONNECT_API_KEY_ID` | API Key ID | See [API Key Setup](#3-create-app-store-connect-api-key) |
| `APP_STORE_CONNECT_ISSUER_ID` | Issuer ID | Found on the API Keys page |
| `APP_STORE_CONNECT_API_KEY_BASE64` | Base64-encoded `.p8` API key file | See [API Key Setup](#3-create-app-store-connect-api-key) |

### Build Environment Secrets

| Secret Name | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string for the build |
| `JWT_SECRET` | JWT secret for the build |
| `NEXT_PUBLIC_APP_URL` | Public app URL |

---

## Step-by-Step Secret Setup

### 1. Export Distribution Certificate

1. Open **Keychain Access** on your Mac
2. Find your **Apple Distribution** certificate
3. Right-click → **Export** → Save as `.p12` file with a password
4. Base64 encode it:
   ```bash
   base64 -i Certificates.p12 | pbcopy
   ```
5. Paste as `P12_CERTIFICATE_BASE64` secret
6. Save the export password as `P12_PASSWORD` secret

**To find your `CODE_SIGN_IDENTITY`:**
```bash
security find-identity -v -p codesigning
```
Look for the line containing `Apple Distribution` — the full quoted string is your identity.

### 2. Create Provisioning Profile

1. Go to [developer.apple.com](https://developer.apple.com/account/resources/profiles/list)
2. Click **+** to create a new profile
3. Select **App Store Connect** distribution
4. Choose App ID: `com.nextzenstem.academy`
5. Select your distribution certificate
6. Name it (e.g., `NextGen STEAM Academy AppStore`)
7. Download the `.mobileprovision` file
8. Base64 encode it:
   ```bash
   base64 -i profile.mobileprovision | pbcopy
   ```
9. Paste as `PROVISIONING_PROFILE_BASE64` secret
10. Save the profile name as `PROVISIONING_PROFILE_NAME` secret

### 3. Create App Store Connect API Key

1. Go to [App Store Connect → Users and Access → Integrations → App Store Connect API](https://appstoreconnect.apple.com/access/integrations/api)
2. Click **+** to generate a new key
3. Name: `GitHub Actions CI/CD`
4. Access: **App Manager** (minimum required role)
5. Download the `.p8` file (you can only download it once!)
6. Note the **Key ID** and **Issuer ID** shown on the page
7. Base64 encode the key:
   ```bash
   base64 -i AuthKey_XXXXXXXXXX.p8 | pbcopy
   ```
8. Save as secrets:
   - Key ID → `APP_STORE_CONNECT_API_KEY_ID`
   - Issuer ID → `APP_STORE_CONNECT_ISSUER_ID`
   - Base64 key → `APP_STORE_CONNECT_API_KEY_BASE64`

---

## Usage

### Automatic Deployment
Every push to the `main` branch will trigger a build and upload to TestFlight.

### Manual Deployment
1. Go to **Actions** tab in your GitHub repository
2. Select **Build & Deploy to TestFlight** workflow
3. Click **Run workflow**
4. Optionally enter a custom build number
5. Click **Run workflow**

### Testing on Your iPhone
1. After the build uploads, open the **TestFlight** app on your iPhone
2. If you're an internal tester (added in App Store Connect), the build will appear automatically
3. For external testers, submit the build for Beta App Review in App Store Connect first
4. Install and test the app

### Adding Testers in App Store Connect
1. Go to [App Store Connect](https://appstoreconnect.apple.com) → Your App → TestFlight
2. **Internal Testing:** Add team members (up to 100) — builds are available immediately
3. **External Testing:** Create a group, add testers by email (up to 10,000) — requires Beta App Review

---

## Troubleshooting

### Build fails at "Install Apple certificate"
- Verify `P12_CERTIFICATE_BASE64` is correctly base64-encoded
- Ensure the certificate hasn't expired
- Check that `P12_PASSWORD` matches

### Build fails at archive step
- Verify `CODE_SIGN_IDENTITY` matches your certificate exactly
- Ensure `PROVISIONING_PROFILE_NAME` matches the profile in Apple Developer portal
- Check that `APPLE_TEAM_ID` is correct

### Upload to TestFlight fails
- Verify all App Store Connect API key secrets are set
- Ensure the API key has sufficient permissions (App Manager or Admin)
- Check that the app record exists in App Store Connect with the correct bundle ID

### Build number conflicts
- Use the manual workflow trigger with a custom build number
- Each TestFlight upload must have a unique build number
- The pipeline uses `github.run_number` by default which auto-increments

---

## File Structure

```
.github/workflows/ios-testflight.yml   # CI/CD pipeline
ios/ExportOptions.plist                 # Xcode export configuration
ios/App/                               # Capacitor iOS project
capacitor.config.ts                    # Capacitor configuration
```
