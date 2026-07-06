# Admin Password Management Guide

This guide explains how to set up, change, and reset the admin password for NextZen Academy.

## Overview

The admin account uses a single, fixed email address: **admin@nextzenacademy.com**. All password reset emails are sent exclusively to this address. No other email address can receive admin password reset links.

---

## Initial Admin Setup (First-Time Password)

When deploying NextZen Academy for the first time, follow these steps to create and activate the admin account.

### Step 1: Create the Admin User

Run the admin creation script to insert the admin user into the database with a random, unusable password:

```bash
MONGODB_URI="your-mongodb-connection-string" tsx scripts/create-admin.ts
```

### Step 2: Send the Password Setup Email

Call the admin invite API endpoint to send a password setup email to **admin@nextzenacademy.com**:

```bash
curl -X POST https://www.nextzenacademy.com/api/admin/invite \
  -H "Content-Type: application/json" \
  -d '{"secret": "<your-ADMIN_INVITE_SECRET>"}'
```

> **Note:** Replace `<your-ADMIN_INVITE_SECRET>` with the value of the `ADMIN_INVITE_SECRET` environment variable configured in your deployment.

### Step 3: Set the Password

1. Check the inbox for **admin@nextzenacademy.com**.
2. Open the "Set Up Your Admin Account" email.
3. Click the **Set Up Your Password** button (link expires in 1 hour).
4. Enter and confirm your new password (minimum 8 characters).
5. Submit the form to activate the admin account.

### Step 4: Log In

Go to `/admin/login` and sign in with:

- **Email:** admin@nextzenacademy.com
- **Password:** the password you just set

---

## Resetting the Admin Password (Forgot Password)

If you forget the admin password, use the **Forgot Password** flow available on the admin login page.

### Using the Admin Login Page

1. Navigate to `/admin/login`.
2. Click the **Forgot password?** link below the sign-in button.
3. Enter the admin email address: **admin@nextzenacademy.com**.
4. Click **Send reset link**.
5. Check the inbox for **admin@nextzenacademy.com** for the password reset email.
6. Click the **Reset Password** button in the email (link expires in 1 hour).
7. Enter and confirm your new password (minimum 8 characters).
8. Submit the form. You will be redirected to the login page after 3 seconds.

### Direct URL

You can also navigate directly to `/admin/forgot-password` to access the admin password reset page.

### Important Security Notes

- The admin forgot-password flow **only** sends reset emails to **admin@nextzenacademy.com**. Entering any other email address will not trigger a reset email.
- Reset links expire after **1 hour**. If the link has expired, request a new one.
- The response message is intentionally generic ("If this is the admin account, a password reset link has been sent.") to prevent email enumeration.

---

## Re-sending the Setup Email (Alternative Method)

If you need to reset the admin password and do not have access to the forgot-password UI, you can re-send the setup email via the admin invite API:

```bash
curl -X POST https://www.nextzenacademy.com/api/admin/invite \
  -H "Content-Type: application/json" \
  -d '{"secret": "<your-ADMIN_INVITE_SECRET>"}'
```

This generates a new password setup link and sends it to **admin@nextzenacademy.com**. Follow the link to set a new password.

---

## Changing the Admin Password (While Logged In)

Currently, the admin dashboard does not include an in-app password change feature. To change the admin password:

1. Navigate to `/admin/forgot-password`.
2. Follow the "Resetting the Admin Password" steps above.

---

## Environment Variables Required

Ensure the following environment variables are configured for the password flows to work:

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT token generation (minimum 32 characters) |
| `ADMIN_INVITE_SECRET` | Secret required to call the admin invite API endpoint |
| `NEXT_PUBLIC_APP_URL` | Application URL used in email links (e.g., `https://www.nextzenacademy.com`) |
| `EMAIL_HOST` | SMTP server hostname (e.g., `smtp.gmail.com`) |
| `EMAIL_PORT` | SMTP server port (e.g., `587`) |
| `EMAIL_SECURE` | Set to `true` for port 465, `false` otherwise |
| `EMAIL_USER` | SMTP authentication email address |
| `EMAIL_PASSWORD` | SMTP authentication password or app password |

---

## Troubleshooting

### Reset email not received

- Verify email environment variables are correctly configured (`EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASSWORD`).
- Check the spam/junk folder in the **admin@nextzenacademy.com** inbox.
- Confirm the admin user exists in the database by running the `create-admin.ts` script.
- Check application logs for email delivery errors.

### Reset link expired

- Reset links are valid for 1 hour. Request a new one from `/admin/forgot-password`.

### "Invalid or expired reset token" error

- The token may have already been used or has expired. Request a new reset link.

### Admin user does not exist

- Run `tsx scripts/create-admin.ts` with the correct `MONGODB_URI` to create the admin user, then use the invite API or forgot-password flow to set the password.
