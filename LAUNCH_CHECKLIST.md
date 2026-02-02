# Cabin Analytics - Launch Checklist

## Domain & Infrastructure

- [ ] **Purchase cabin.so domain** (~$50)
  - Go to porkbun.com or namecheap.com
  - Search "cabin.so"
  - Complete purchase
  
- [ ] **Set up Supabase project**
  - Create account at supabase.com
  - New project: "cabin-analytics"
  - Run SQL from `supabase/schema.sql`
  - Copy Project URL and Anon Key
  
- [ ] **Set up Stripe account**
  - Create account at stripe.com
  - Create products:
    - Pro Plan - $9/month
    - Business Plan - $29/month
  - Copy Price IDs
  - Configure webhook: `https://cabin.so/api/webhooks/stripe`
  
- [ ] **Deploy to Vercel**
  - Push code to GitHub
  - Import repo to vercel.com
  - Add environment variables
  - Deploy
  
- [ ] **Connect custom domain**
  - In Vercel: Add domain "cabin.so"
  - Configure DNS records (A + CNAME)
  - Wait for SSL certificate

## Environment Variables

Create `.env.local` with real values:

```env
# Supabase (from Supabase dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe (from Stripe dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=https://cabin.so
```

## Pre-Launch Testing

- [ ] Sign up flow works
- [ ] Add website generates tracking code
- [ ] Tracking script captures pageviews
- [ ] Dashboard displays stats correctly
- [ ] Checkout flow works (test mode)
- [ ] Subscription status updates correctly
- [ ] All pages load correctly
- [ ] Mobile responsive
- [ ] No console errors

## Launch Assets

- [ ] **Product Hunt listing**
  - Title: Cabin — Privacy-first website analytics
  - Tagline: Simple, GDPR-compliant analytics without the surveillance
  - Images: Screenshots of dashboard
  - First comment explaining the "why"
  
- [ ] **Twitter thread**
  - Hook: "I built a $9/mo alternative to Google Analytics"
  - Story: Why privacy matters
  - CTA: Try it free
  
- [ ] **Indie Hackers post**
  - Title: "Launching Cabin — Privacy-first analytics"
  - Share journey and metrics
  
- [ ] **Reddit posts**
  - r/webdev: "Showoff Saturday"
  - r/analytics: "GDPR compliant alternative"
  - r/entrepreneur: "From idea to launch in 48 hours"

## Post-Launch Actions

**Hour 1:**
- [ ] Respond to all Product Hunt comments
- [ ] Engage on Twitter replies
- [ ] Check for any critical bugs

**Day 1:**
- [ ] Personal emails to first 10 sign-ups
- [ ] Post launch recap on Twitter
- [ ] Update Indie Hackers with Day 1 stats

**Week 1:**
- [ ] Collect feedback from 20 users
- [ ] Fix any critical issues
- [ ] Publish "Why I built Cabin" blog post
- [ ] Reach out to 5 potential affiliates

## Success Metrics (Track Daily)

| Metric | Day 1 | Week 1 | Month 1 |
|--------|-------|--------|---------|
| Sign-ups | 50 | 200 | 1,000 |
| Active sites | 20 | 80 | 400 |
| Paying customers | 5 | 20 | 100 |
| MRR | $45 | $180 | $900 |

## Emergency Contacts

- **Hosting issues**: Vercel support
- **Payment issues**: Stripe support  
- **Database issues**: Supabase support
- **Domain issues**: Porkbun/Namecheap support

## Budget

| Item | Cost |
|------|------|
| Domain (cabin.so) | $50/year |
| Supabase (start free) | $0 → $25/mo |
| Vercel (start free) | $0 → $20/mo |
| Stripe fees | 2.9% + $0.30 per transaction |
| **Total monthly** | ~$50-100 |

## Revenue Targets

| Milestone | MRR | Customers | Timeline |
|-----------|-----|-----------|----------|
| ramen profitable | $500 | 55 | Month 2 |
| quit day job | $3,000 | 330 | Month 6 |
| **target** | **$5,000** | **550** | **Month 9** |
| thriving | $10,000 | 1,100 | Month 12 |

## Next Steps (Immediate)

1. **Purchase cabin.so** (5 min)
2. **Create Supabase project** (10 min)
3. **Set up Stripe** (15 min)
4. **Deploy to Vercel** (10 min)
5. **Test everything** (30 min)
6. **Launch!** 🚀

**Total time to launch**: ~90 minutes

---

**Ready to go? Start with step 1: Purchase the domain!**
