import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { t: trackingId, u: url, r: referrer, w, h, d } = body

    if (!trackingId || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Find website by tracking ID
    const { data: website, error: websiteError } = await supabase
      .from('websites')
      .select('id')
      .eq('tracking_id', trackingId)
      .single()

    if (websiteError || !website) {
      return NextResponse.json({ error: 'Invalid tracking ID' }, { status: 404 })
    }

    // Get IP hash for unique visitor tracking
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16)

    // Get user agent
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Simple country detection (would use a GeoIP service in production)
    const country = null

    // Insert pageview
    const { error } = await supabase.from('pageviews').insert({
      website_id: website.id,
      url: url,
      referrer: referrer || null,
      user_agent: userAgent,
      ip_hash: ipHash,
      country: country,
    })

    if (error) {
      console.error('Error inserting pageview:', error)
      return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
    }

    // Return 204 No Content for tracking pixel
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Tracking error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
