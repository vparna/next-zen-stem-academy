# MongoDB URI Truncation - Troubleshooting Guide

## Issue Description

If you're seeing this error in your Vercel deployment logs:

```
MongoDB connection error: Error: Invalid MongoDB URI format. 
Must start with "mongodb://" or "mongodb+srv://". 
Current value starts with: "mongodb+s"
```

This means your `MONGODB_URI` environment variable in Vercel is being truncated or contains invalid characters.

## Root Causes

The most common causes of this issue are:

1. **Incomplete Copy-Paste**: The MongoDB URI was not fully copied when pasting into Vercel
2. **Line Breaks**: The URI contains newline characters (pressing Enter while typing)
3. **Whitespace**: Extra spaces or tabs at the beginning or end of the URI
4. **Special Characters in Password**: Unencoded special characters in the password part of the URI
5. **Quotes**: The URI was pasted with surrounding quotes

## How to Fix in Vercel

### Step 1: Access Environment Variables

1. Go to your project in the Vercel Dashboard
2. Click **Settings** tab
3. Click **Environment Variables** in the left sidebar
4. Find the `MONGODB_URI` variable

### Step 2: Check the Current Value

Click on the `MONGODB_URI` variable to view its current value. Look for:
- Is it incomplete? (e.g., `mongodb+s` instead of full URI)
- Are there any line breaks or extra spaces?
- Does it have quotes around it?

### Step 3: Update the Value

1. Click **Edit** on the `MONGODB_URI` variable
2. **Delete** the current value completely
3. Go to MongoDB Atlas and copy your connection string fresh:
   - Log in to [MongoDB Atlas](https://cloud.mongodb.com)
   - Click **Connect** on your cluster
   - Choose **Connect your application**
   - Copy the connection string (it should look like `mongodb+srv://username:password@cluster.mongodb.net/NextGen?retryWrites=true&w=majority`)
4. **Paste** the connection string into Vercel (ensure you paste it in one go without pressing Enter)
5. **Verify** the complete URI is there:
   - Starts with `mongodb://` or `mongodb+srv://`
   - Contains your username and password
   - Contains your cluster address
   - Ends with `/NextGen?retryWrites=true&w=majority`
6. **Do NOT add quotes** around the URI
7. Click **Save**

### Step 4: Check Password Encoding

If your password contains special characters (e.g., `@`, `#`, `$`, `%`, `&`, `/`, `?`), they need to be URL-encoded:

| Character | Encoded |
|-----------|---------|
| @         | %40     |
| #         | %23     |
| $         | %24     |
| %         | %25     |
| &         | %26     |
| /         | %2F     |
| ?         | %3F     |
| :         | %3A     |

**Example:**
- Password: `MyP@ss#123`
- Encoded: `MyP%40ss%23123`
- URI: `mongodb+srv://username:MyP%40ss%23123@cluster.mongodb.net/NextGen?retryWrites=true&w=majority`

### Step 5: Redeploy

1. Go to the **Deployments** tab
2. Click the **three dots (...)** on the latest deployment
3. Click **Redeploy**
4. Wait for the deployment to complete

## Example of Correct MONGODB_URI

### For MongoDB Atlas (Cloud):
```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/NextGen?retryWrites=true&w=majority
```

### For Local MongoDB:
```
mongodb://localhost:27017/NextGen
```

## Verification

After redeploying, check your Vercel Function Logs:

1. Go to your project in Vercel
2. Click **Deployments** tab
3. Click on the latest deployment
4. Click **View Function Logs**
5. Look for successful MongoDB connection messages

You should see:
```
MongoDB: Using database: NextGen
```

Instead of:
```
MongoDB connection error: Error: Invalid MongoDB URI format...
```

## Common Mistakes to Avoid

❌ **Don't do this:**
```
MONGODB_URI="mongodb+srv://user:pass@cluster.net/NextGen"  # Has quotes
MONGODB_URI=mongodb+srv://user:pass@cluster.net/NextGen
?retryWrites=true  # Split across lines
MONGODB_URI=  mongodb+srv://user:pass@cluster.net/NextGen  # Leading space
```

✅ **Do this:**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.net/NextGen?retryWrites=true&w=majority
```

## Testing Locally

Before deploying to Vercel, test your connection string locally:

1. Create a `.env.local` file (if it doesn't exist)
2. Add your MONGODB_URI:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/NextGen?retryWrites=true&w=majority
   ```
3. Run the validation script:
   ```bash
   npm run validate-env
   ```
4. You should see:
   ```
   ✅ Required Variables:
     ✓ MONGODB_URI: OK
   ```

## Still Having Issues?

### Check MongoDB Atlas Network Access

1. Go to MongoDB Atlas
2. Click **Network Access** in the left sidebar
3. Make sure you have `0.0.0.0/0` in the IP Access List (allows access from anywhere, including Vercel serverless functions)

### Check MongoDB Atlas Database User

1. Go to **Database Access**
2. Make sure your database user exists
3. Make sure the password is correct
4. Make sure the user has **Read and write to any database** privileges (or at least access to the `NextGen` database)

### Check Database Name

The URI **must** include the database name `/NextGen` before the query parameters:

```
mongodb+srv://user:pass@cluster.net/NextGen?retryWrites=true
                                        ^^^^^^^ Database name here
```

### Enable Debug Logging

Add this environment variable to Vercel temporarily:
```
NODE_ENV=development
```

This will show more detailed error messages in the logs. Remember to remove it or set it to `production` after troubleshooting.

## Quick Fix Checklist

- [ ] Remove the old `MONGODB_URI` from Vercel
- [ ] Copy connection string fresh from MongoDB Atlas
- [ ] Replace `<password>` with your actual password
- [ ] URL-encode special characters in password if needed
- [ ] Paste URI into Vercel without quotes or line breaks
- [ ] Ensure URI includes `/NextGen` database name
- [ ] Save and redeploy
- [ ] Check Function Logs for success

## Prevention

To avoid this issue in the future:

1. ✅ Always copy the full connection string in one go
2. ✅ Test locally with `npm run validate-env` before deploying
3. ✅ Use URL-encoded passwords to avoid special character issues
4. ✅ Keep backups of working environment variables
5. ✅ Document your environment setup

## Related Documentation

- [VERCEL_ENV_VARIABLES.md](./VERCEL_ENV_VARIABLES.md) - Complete guide to all environment variables
- [MONGODB_SETUP_GUIDE.md](./MONGODB_SETUP_GUIDE.md) - MongoDB Atlas setup instructions
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Full deployment guide

---

## Summary

The MongoDB URI truncation issue is almost always caused by improper copy-paste or special characters in the environment variable. The fix is simple:

1. **Delete** the old MONGODB_URI in Vercel
2. **Copy** the full connection string from MongoDB Atlas
3. **Paste** it carefully (no quotes, no line breaks)
4. **Encode** special characters in password if needed
5. **Redeploy** your application

Your deployment should now work correctly! 🚀
