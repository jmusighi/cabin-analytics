import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Shield, Zap, BarChart3, Lock, Eye } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Cabin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth" className="text-sm text-muted-foreground hover:text-foreground">
              Sign In
            </Link>
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span>GDPR Compliant & Cookie-Free</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Website analytics that respect your visitors' privacy
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Cabin is a privacy-first, lightweight alternative to Google Analytics. 
            No cookies, no tracking, just insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="gap-2">
                <Zap className="w-4 h-4" />
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">No credit card required. 14-day free trial.</p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why choose Cabin?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We built Cabin because we were tired of invasive analytics tools that slowed down our sites and violated our visitors' privacy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
                <p className="text-muted-foreground">
                  No cookies, no personal data collection. Fully GDPR, CCPA, and PECR compliant.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Our tracking script is under 1KB. Your site stays fast, your visitors stay happy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Simple & Clear</h3>
                <p className="text-muted-foreground">
                  No overwhelming dashboards. Just the metrics that matter, presented beautifully.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">No hidden fees. No surprises.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg">Starter</h3>
                <div className="text-3xl font-bold my-4">$0</div>
                <p className="text-muted-foreground text-sm mb-6">Perfect for side projects</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    1 website
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    10K pageviews/month
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    30 days data retention
                  </li>
                </ul>
                <Link href="/auth">
                  <Button variant="outline" className="w-full">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro */}
            <Card className="border-primary relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </div>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg">Pro</h3>
                <div className="text-3xl font-bold my-4">$9<span className="text-lg text-muted-foreground">/mo</span></div>
                <p className="text-muted-foreground text-sm mb-6">For growing businesses</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    5 websites
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    100K pageviews/month
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    1 year data retention
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    Email reports
                  </li>
                </ul>
                <Link href="/auth">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Business */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg">Business</h3>
                <div className="text-3xl font-bold my-4">$29<span className="text-lg text-muted-foreground">/mo</span></div>
                <p className="text-muted-foreground text-sm mb-6">For larger teams</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    Unlimited websites
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    1M pageviews/month
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    Unlimited retention
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    Priority support
                  </li>
                </ul>
                <Link href="/auth">
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to respect your visitors' privacy?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join thousands of websites that switched to privacy-first analytics. Start your free trial today.
          </p>
          <Link href="/auth">
            <Button size="lg" variant="secondary">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Cabin</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Cabin Analytics. Privacy-first website analytics.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
