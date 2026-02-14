# 🔧 Fix Local Login Issue After Changing NEXTAUTH_URL

## The Problem

After changing `NEXTAUTH_URL`, local login with credentials stopped working.

## Quick Fix Steps

### Step 1: Verify Your `.env` File

Your `.env` should have:

```env
NEXTAUTH_URL=http://localhost:3000
```

**NOT:**
```env
NEXTAUTH_URL=https://carexyz-six.vercel.app/
```

### Step 2: Clear Next.js Cache

```bash
cd hero-kidz-full
rmdir /s /q .next
npm run dev
```

### Step 3: Clear Browser Data

1. Open DevTools (F12)
2. Go to Application tab
3. Clear:
   - Cookies (especially `next-auth.session-token`)
   - Local Storage
   - Session Storage
4. Refresh the page (Ctrl + Shift + R)

### Step 4: Test Login

1. Go to http://localhost:3000/login
2. Try logging in with your credentials
3. Check browser console for errors

---

## Still Not Working? Debug Steps

### Check 1: Verify Environment Variable is Loaded

Create a test API route:

**File:** `src/app/api/test-env/route.js`

```javascript
export async function GET() {
  return Response.json({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
    hasMongoUri: !!process.env.MONGODB_URI,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
  });
}
```

Visit: http://localhost:3000/api/test-env

Should show:
```json
{
  "NEXTAUTH_URL": "http://localhost:3000",
  "NODE_ENV": "development",
  "hasMongoUri": true,
  "hasNextAuthSecret": true
}
```

### Check 2: Test Database Connection

**File:** `src/app/api/test-db/route.js`

```javascript
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

Visit: http://localhost:3000/api/test-db

### Check 3: Test User Exists

Open MongoDB Compass or Atlas and verify:
1. Database: `herokidz`
2. Collection: `users`
3. Find your user by email
4. Check if `password` field exists (should be a hashed string)

### Check 4: Check Console Logs

When you try to login, check:

**Browser Console (F12):**
- Any errors?
- Network tab → Check the POST request to `/api/auth/callback/credentials`
- What's the response status? (401, 500, etc.)

**Terminal (where `npm run dev` is running):**
- Look for console.log outputs from `loginUser` function
- Any error messages?

---

## Common Issues & Solutions

### Issue 1: "Email password not Matched"

**Cause:** User doesn't exist or password is wrong

**Solution:**
1. Register a new account at http://localhost:3000/register
2. Use those exact credentials to login

### Issue 2: User registered with Google, trying credentials login

**Cause:** User account was created via Google OAuth (no password set)

**Solution:**
- Use Google login button instead
- OR register a new account with email/password

### Issue 3: NEXTAUTH_URL still showing production URL

**Cause:** Environment variable not reloaded

**Solution:**
```bash
# Stop dev server (Ctrl + C)
# Delete .next folder
rmdir /s /q .next
# Start again
npm run dev
```

### Issue 4: MongoDB connection timeout

**Cause:** Network issue or wrong credentials

**Solution:**
- Check MongoDB Atlas is accessible
- Verify MONGODB_URI in `.env`
- Check Network Access in MongoDB Atlas

---

## Complete Reset (Nuclear Option)

If nothing works, do a complete reset:

```bash
# 1. Stop dev server (Ctrl + C)

# 2. Delete cache and dependencies
rmdir /s /q .next
rmdir /s /q node_modules

# 3. Reinstall
npm install

# 4. Verify .env file
type .env

# 5. Start fresh
npm run dev
```

Then:
1. Clear all browser data
2. Register a NEW test account
3. Login with that account

---

## Environment Variable Priority

Next.js loads environment variables in this order (highest priority first):

1. `.env.local` (highest priority, git-ignored)
2. `.env.development` (when NODE_ENV=development)
3. `.env.production` (when NODE_ENV=production)
4. `.env` (lowest priority)

**Recommendation:** Use `.env.local` for local development:

```bash
# Create .env.local
copy .env .env.local
```

Then edit `.env.local` for local settings, and keep `.env` as a template.

---

## Vercel vs Local Setup

### Local Development (.env or .env.local)
```env
NEXTAUTH_URL=http://localhost:3000
```

### Vercel Production (Environment Variables in Dashboard)
```env
NEXTAUTH_URL=https://carexyz-six.vercel.app
```

**Never commit `.env.local` to git!** It's already in `.gitignore`.

---

## Need More Help?

If you're still stuck, provide these details:

1. **Browser console error** (F12 → Console tab)
2. **Network request details** (F12 → Network tab → POST to `/api/auth/callback/credentials`)
3. **Terminal output** (from `npm run dev`)
4. **Environment check** (visit http://localhost:3000/api/test-env)
5. **Database check** (visit http://localhost:3000/api/test-db)

