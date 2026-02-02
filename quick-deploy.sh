#!/bin/bash

echo "🚀 Cabin Analytics Deployment Script"
echo "===================================="
echo ""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "Installing GitHub CLI..."
    brew install gh
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "Step 1: Authenticate with GitHub"
echo "--------------------------------"
echo "A browser window will open. Click 'Authorize'"
gh auth login --web

echo ""
echo "Step 2: Create GitHub Repository"
echo "--------------------------------"
cd /Users/henry/.openclaw/workspace/cabin-analytics
gh repo create cabin-analytics --public --source=. --push

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "Step 3: Deploy to Vercel"
echo "------------------------"
echo "A browser window will open. Select your GitHub repo."
vercel

echo ""
echo "Step 4: Add Environment Variables"
echo "----------------------------------"
echo "When deployment finishes, run this to add env vars:"
echo ""
echo "vercel env add NEXT_PUBLIC_SUPABASE_URL"
echo "  Value: https://lbdkwmguhlrbvtvldozn.supabase.co"
echo ""
echo "vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "  Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZGt3bWd1aGxyYnZ0dmxkb3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MzgxMzMsImV4cCI6MjA4NTUxNDEzM30.l4PV_9E35n7CXq_U_HhC2sY_y_33vtQ9SY1-vizTU8w"
echo ""
echo "vercel env add SUPABASE_SERVICE_ROLE_KEY"
echo "  Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZGt3bWd1aGxyYnZ0dmxkb3puIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTkzODEzMywiZXhwIjoyMDg1NTE0MTMzfQ.fNFTw34JLla36xqBOMe5D37w6Wdo6vM63UlTXJhoJuI"
echo ""
echo "Then redeploy: vercel --prod"
echo ""
echo "🎉 Done! Your app will be live!"
