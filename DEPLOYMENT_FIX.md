# 🔧 Fix Production Login Issue (401 Unauthorized)

## Problem
Login works on `localhost:3000` but fails on `https://carexyz-six.vercel.app/` with 401 error.

## Root Causes
1. Environment variables not properly set in Vercel
2. NEXTAUTH_URL mismatch
3. Possible MongoDB connection timeout in production

---

## ✅ Solution Steps

### Step 1: Update Local Environment

Update your local `.env` file:

```env
# MongoDB
MONGODB_URI=your_mongodb_uri_here
DBNAME=herokidz

# NextAuth - USE LOCALHOST FOR LOCAL DEVELOPMENT
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Email (Gmail SMTP)
EMAIL_USER=your@gmail.com
EMAIL_PASS=your-app-password-here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### Step 2: Configure Vercel Environment Variables

Go to your Vercel project dashboard:

1. Navigate to: **https://vercel.com/your-username/carexyz-six/settings/environment-variables**

2. Add/Update these environment variables:

```
MONGODB_URI = your_mongodb_uri_here
DBNAME = herokidz
NEXTAUTH_URL = https://carexyz-six.vercel.app
NEXTAUTH_SECRET = your_nextauth_secret_here
GOOGLE_CLIENT_ID = your_google_client_id_here
GOOGLE_CLIENT_SECRET = your_google_client_secret_here
EMAIL_USER = your@gmail.com
EMAIL_PASS = your_gmail_app_password
```

**IMPORTANT:** 
- Remove trailing slash from `NEXTAUTH_URL` in Vercel (use `https://carexyz-six.vercel.app` NOT `https://carexyz-six.vercel.app/`)
- Make sure all variables are set for "Production" environment

### Step 3: Update Google OAuth Redirect URIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services > Credentials**
4. Click on your OAuth 2.0 Client ID
5. Add these Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://carexyz-six.vercel.app/api/auth/callback/google`
6. Save changes

### Step 4: Check MongoDB Atlas Network Access

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your cluster
3. Go to **Network Access**
4. Ensure you have one of these:
   - IP Address: `0.0.0.0/0` (Allow access from anywhere) - Recommended for Vercel
   - OR add Vercel's IP ranges

### Step 5: Redeploy on Vercel

After setting environment variables:

```bash
# Option 1: Trigger redeploy from Vercel dashboard
# Go to Deployments tab > Click "..." on latest deployment > Redeploy

# Option 2: Push a commit to trigger auto-deploy
git add .
git commit -m "Fix: Update environment configuration"
git push origin main
```

---

## 🧪 Testing

### Test Credentials Login

1. Go to https://carexyz-six.vercel.app/register
2. Create a test account:
   - Email: test@example.com
   - Password: Test123456
   - Name: Test User
3. Go to https://carexyz-six.vercel.app/login
4. Login with the credentials
5. Should redirect to homepage successfully

### Test Google Login

1. Go to https://carexyz-six.vercel.app/login
2. Click "Sign in with Google"
3. Should authenticate successfully

---

## 🔍 Debugging

### Check Vercel Logs

1. Go to Vercel Dashboard > Your Project > Deployments
2. Click on the latest deployment
3. Go to "Functions" tab
4. Check logs for errors

### Common Error Messages

**"MongoDB connection failed"**
- Check MONGODB_URI is correct
- Verify MongoDB Atlas network access allows Vercel IPs

**"Invalid credentials"**
- User might not exist in database
- Password might be incorrect
- Check if user was created with Google OAuth (no password set)

**"NEXTAUTH_URL mismatch"**
- Ensure NEXTAUTH_URL in Vercel matches your domain exactly
- No trailing slash

---

## 📝 Quick Checklist

- [ ] Local `.env` has `NEXTAUTH_URL=http://localhost:3000`
- [ ] Vercel has `NEXTAUTH_URL=https://carexyz-six.vercel.app` (no trailing slash)
- [ ] All environment variables are set in Vercel
- [ ] MongoDB Atlas allows access from `0.0.0.0/0`
- [ ] Google OAuth redirect URIs include production URL
- [ ] Redeployed after setting environment variables
- [ ] Tested registration and login on production

---

## 🆘 Still Not Working?

### Enable Debug Mode

Add this to your Vercel environment variables:

```
NEXTAUTH_DEBUG = true
```

Then check Vercel function logs for detailed error messages.

### Test MongoDB Connection

Create a test API route to verify MongoDB connection:

```javascript
// src/app/api/test-db/route.js
import { dbConnect, collections } from "@/lib/dbConnect";

export async function GET() {
  try {
    const usersCollection = await dbConnect(collections.USERS);
    const count = await usersCollection.countDocuments();
    return Response.json({ 
      success: true, 
      message: "MongoDB connected", 
      userCount: count 
    });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
```

Visit: `https://carexyz-six.vercel.app/api/test-db`

---

## 📧 Need Help?

If the issue persists after following all steps:

1. Check Vercel function logs
2. Verify all environment variables are set correctly
3. Test MongoDB connection separately
4. Ensure NEXTAUTH_SECRET is the same in both environments

