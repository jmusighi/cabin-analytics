# Cabin Analytics

Privacy-first website analytics — a lightweight, GDPR-compliant alternative to Google Analytics.

## Features

- **Privacy First**: No cookies, no personal data collection, fully GDPR compliant
- **Lightweight**: Tracking script under 1KB
- **Real-time Dashboard**: Pageviews, unique visitors, referrers, top pages
- **Simple Pricing**: Free tier + affordable paid plans
- **Easy Integration**: Single script tag, works on any website

## Tech Stack

- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Payments**: Stripe
- **Charts**: Recharts

## Quick Start

### 1. Clone and Install

```bash
git clone <repo-url>
cd cabin-analytics
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase/schema.sql` in the SQL Editor
3. Copy your project URL and anon key

### 3. Configure Environment Variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (optional for initial setup)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Custom Domain (cabin.so)

1. Purchase domain at porkbun.com or namecheap.com
2. Add domain in Vercel dashboard
3. Configure DNS records as instructed
4. Wait for SSL propagation

## Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Create products:
   - Pro Plan: $9/month
   - Business Plan: $29/month
3. Copy price IDs to your app
4. Configure webhook endpoint: `https://cabin.so/api/webhooks/stripe`
5. Add webhook signing secret to env vars

## Tracking Script

Users add this to their website:

```html
<script>
(function() {
  var cabin = window.cabin || (window.cabin = {});
  cabin.t = 'YOUR_TRACKING_ID';
  
  function track() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://cabin.so/api/track', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      t: cabin.t,
      u: window.location.href,
      r: document.referrer,
      w: window.innerWidth,
      h: window.innerHeight,
      d: new Date().toISOString()
    }));
  }
  
  if (document.readyState === 'complete') {
    track();
  } else {
    window.addEventListener('load', track);
  }
})();
</script>
```

## Pricing

| Plan | Price | Websites | Pageviews | Features |
|------|-------|----------|-----------|----------|
| Starter | Free | 1 | 10K/month | 30-day retention |
| Pro | $9/mo | 5 | 100K/month | 1-year retention, email reports |
| Business | $29/mo | Unlimited | 1M/month | Unlimited retention, priority support |

## Roadmap to $5K MRR

### Week 1: Launch
- [ ] Deploy to cabin.so
- [ ] Create Product Hunt listing
- [ ] Post on Twitter/LinkedIn
- [ ] Submit to privacy-focused directories

### Week 2-4: SEO Content
- [ ] "Google Analytics alternatives" blog post
- [ ] "GDPR compliant analytics" guide
- [ ] Comparison posts (Plausible vs Fathom vs Cabin)

### Month 2: Growth
- [ ] Affiliate program
- [ ] Newsletter sponsorships
- [ ] Indie Hackers case study

### Month 3: Scale
- [ ] Add team features
- [ ] API access
- [ ] White-label option

## Marketing Copy

**Tagline**: Privacy-first analytics for your website

**Description**: Cabin is a lightweight, GDPR-compliant analytics tool that respects your visitors' privacy. No cookies, no tracking, just insights.

**Key Messages**:
- Your data's safe in the cabin
- Analytics without the surveillance
- Simple, private, powerful

## License

MIT
