# ⚡ ULTRA-FAST DEPLOY (3 Minutes)

## Step 1: Create GitHub Repo (30 seconds)

1. Go to **github.com/new**
2. **Repository name**: `cabin-analytics`
3. **Public** (selected by default)
4. Click **"Create repository"**
5. ✅ You'll see a page with instructions

---

## Step 2: Upload Code (60 seconds)

On that GitHub page:

1. Look for **"uploading an existing file"** link → Click it
2. Click **"choose your files"**
3. Select this entire `cabin-analytics` folder
4. Wait for upload (shows progress)
5. Scroll down, click **"Commit changes"**

✅ Your code is now on GitHub!

---

## Step 3: Deploy to Vercel (90 seconds)

1. Go to **vercel.com/new**
2. Sign in with **GitHub** (one click)
3. Find **"cabin-analytics"** in the list → Click **"Import"**
4. Click **"Deploy"** (blue button)
5. ⏳ Wait ~1 minute for build

✅ You'll get a URL like: `https://cabin-analytics-abc123.vercel.app`

---

## Step 4: Add Environment Variables (30 seconds)

1. In Vercel dashboard, click your project
2. Click **"Settings"** tab (top)
3. Click **"Environment Variables"** (left menu)
4. Add these 3 (copy-paste exactly):

### Variable 1:
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://lbdkwmguhlrbvtvldozn.supabase.co`

### Variable 2:
- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZGt3bWd1aGxyYnZ0dmxkb3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MzgxMzMsImV4cCI6MjA4NTUxNDEzM30.l4PV_9E35n7CXq_U_HhC2sY_y_33vtQ9SY1-vizTU8w`

### Variable 3:
- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZGt3bWd1aGxyYnZ0dmxkb3puIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTkzODEzMywiZXhwIjoyMDg1NTE0MTMzfQ.fNFTw34JLla36xqBOMe5D37w6Wdo6vM63UlTXJhoJuI`

5. Click **"Save"** for each
6. Go to **"Deployments"** tab → Click **"Redeploy"** on latest

---

## ✅ DONE!

Your app is now live at the Vercel URL!

### Test It:
1. Visit the URL
2. Click "Get Started"
3. Create an account
4. Add a test website
5. Copy tracking code
6. Open any HTML file, paste the script, open in browser
7. Refresh dashboard → see your pageview!

---

## Next Steps (Later):
- [ ] Buy **cabin.so** domain ($50)
- [ ] Add domain to Vercel settings
- [ ] Set up Stripe for payments
- [ ] Launch! 🚀

**Questions? Just ask!**
