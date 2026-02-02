# Quick Vercel Deployment Guide

## Option 1: Deploy via Vercel Dashboard (Easiest - 5 minutes)

### Step 1: Push to GitHub
```bash
cd cabin-analytics
git init
git add .
git commit -m "Initial commit"
git branch -M main
# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/cabin-analytics.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click **"Add New Project"**
4. Import your `cabin-analytics` repo
5. Click **"Deploy"**

### Step 3: Add Environment Variables
1. In Vercel dashboard, go to **Project Settings**
2. Click **Environment Variables**
3. Add these one by one:

| Name | Value |
|------|-------|
| NEXT_PUBLIC_SUPABASE_URL | https://lbdkwmguhlrbvtvldozn.supabase.co |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZGt3bWd1aGxyYnZ0dmxkb3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MzgxMzMsImV4cCI6MjA4NTUxNDEzM30.l4PV_9E35n7CXq_U_HhC2sY_y_33vtQ9SY1-vizTU8w |
| SUPABASE_SERVICE_ROLE_KEY | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZGt3bWd1aGxyYnZ0dmxkb3puIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTkzODEzMywiZXhwIjoyMDg1NTE0MTMzfQ.fNFTw34JLla36xqBOMe5D37w6Wdo6vM63UlTXJhoJuI |
| NEXT_PUBLIC_APP_URL | https://your-deployment-url.vercel.app |

4. Click **Save**
5. Go to **Deployments** and click **Redeploy**

### Done! 🎉
Your app will be live at: `https://cabin-analytics-xxx.vercel.app`

---

## Option 2: Deploy via CLI (If you prefer terminal)

```bash
# Install Vercel CLI
npm i -g vercel

# Login (opens browser)
vercel login

# Deploy
cd cabin-analytics
vercel

# Follow prompts, then add env vars:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY

# Redeploy
vercel --prod
```

---

## 🧪 Testing Your Deployment

Once live, test these flows:

1. **Landing page** - Visit the URL, should see marketing site
2. **Sign up** - Create a test account
3. **Add website** - Add a test site, copy tracking code
4. **Install tracking** - Add script to any HTML file and open it
5. **Check dashboard** - Refresh dashboard, should see pageview

---

## 🚨 Common Issues

### "Invalid Supabase credentials"
- Double-check env vars in Vercel dashboard
- Make sure no extra spaces in keys
- Redeploy after fixing

### "API routes not working"
- Make sure you're not using `output: 'export'` in next.config.ts
- Check that env vars are set for Production environment

### "Database connection failed"
- Verify Supabase project is active (not paused)
- Check RLS policies are correct

---

## 🎯 Next Steps After Deploy

1. **Test everything works**
2. **Buy cabin.so domain** (~$50)
3. **Connect domain** in Vercel settings
4. **Set up Stripe** for payments
5. **Launch!** 🚀

---

**Questions?** Just ask!
