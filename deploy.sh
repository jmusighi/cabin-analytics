#!/bin/bash

echo "🚀 Cabin Analytics Deployment Script"
echo "===================================="
echo ""

# Check for required env vars
echo "Checking environment variables..."

if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  echo "❌ NEXT_PUBLIC_SUPABASE_URL is not set"
  exit 1
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
  echo "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not set"
  exit 1
fi

echo "✅ Environment variables configured"
echo ""

# Build
echo "Building application..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

echo "✅ Build successful"
echo ""

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Configure your domain (cabin.so) in Vercel dashboard"
echo "2. Set up Stripe products and webhooks"
echo "3. Test the tracking script"
echo "4. Launch! 🚀"
