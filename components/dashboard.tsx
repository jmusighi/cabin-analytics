'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, ExternalLink, Trash2, Plus, TrendingUp, Users, Eye, MousePointer } from 'lucide-react'
import { generateTrackingScript } from '@/lib/tracking'
import { format, subDays, startOfDay } from 'date-fns'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

interface Website {
  id: string
  name: string
  domain: string
  tracking_id: string
  created_at: string
}

interface Pageview {
  id: string
  url: string
  referrer: string | null
  created_at: string
  ip_hash: string
}

interface DashboardStats {
  totalViews: number
  uniqueVisitors: number
  avgTime: string
  bounceRate: string
  dailyData: { date: string; views: number; visitors: number }[]
  topPages: { url: string; views: number }[]
  topReferrers: { referrer: string; views: number }[]
}

export default function Dashboard() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null)
  const [pageviews, setPageviews] = useState<Pageview[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [newSiteName, setNewSiteName] = useState('')
  const [newSiteDomain, setNewSiteDomain] = useState('')
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState(7)

  useEffect(() => {
    fetchWebsites()
  }, [])

  useEffect(() => {
    if (selectedWebsite) {
      fetchPageviews()
      const interval = setInterval(fetchPageviews, 30000) // Refresh every 30s
      return () => clearInterval(interval)
    }
  }, [selectedWebsite, dateRange])

  async function fetchWebsites() {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching websites:', error)
      return
    }

    setWebsites(data || [])
    if (data && data.length > 0 && !selectedWebsite) {
      setSelectedWebsite(data[0])
    }
    setLoading(false)
  }

  async function fetchPageviews() {
    if (!selectedWebsite) return

    const startDate = startOfDay(subDays(new Date(), dateRange))
    
    const { data, error } = await supabase
      .from('pageviews')
      .select('*')
      .eq('website_id', selectedWebsite.id)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching pageviews:', error)
      return
    }

    setPageviews(data || [])
    calculateStats(data || [])
  }

  function calculateStats(views: Pageview[]) {
    const totalViews = views.length
    const uniqueVisitors = new Set(views.map(v => v.ip_hash)).size
    
    // Group by day
    const dailyMap = new Map<string, { views: number; visitors: Set<string> }>()
    views.forEach(view => {
      const date = format(new Date(view.created_at), 'MMM dd')
      if (!dailyMap.has(date)) {
        dailyMap.set(date, { views: 0, visitors: new Set() })
      }
      const day = dailyMap.get(date)!
      day.views++
      day.visitors.add(view.ip_hash)
    })

    const dailyData = Array.from(dailyMap.entries()).map(([date, data]) => ({
      date,
      views: data.views,
      visitors: data.visitors.size,
    }))

    // Top pages
    const pageMap = new Map<string, number>()
    views.forEach(view => {
      const url = new URL(view.url).pathname || '/'
      pageMap.set(url, (pageMap.get(url) || 0) + 1)
    })
    const topPages = Array.from(pageMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([url, views]) => ({ url, views }))

    // Top referrers
    const refMap = new Map<string, number>()
    views.forEach(view => {
      if (view.referrer) {
        try {
          const refUrl = new URL(view.referrer)
          const domain = refUrl.hostname
          refMap.set(domain, (refMap.get(domain) || 0) + 1)
        } catch {}
      }
    })
    const topReferrers = Array.from(refMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([referrer, views]) => ({ referrer, views }))

    setStats({
      totalViews,
      uniqueVisitors,
      avgTime: '2:34', // Placeholder - would calculate from session data
      bounceRate: '42%', // Placeholder
      dailyData,
      topPages,
      topReferrers,
    })
  }

  async function addWebsite() {
    if (!newSiteName || !newSiteDomain) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const trackingId = crypto.randomUUID().replace(/-/g, '').slice(0, 16)

    const { data, error } = await supabase
      .from('websites')
      .insert({
        name: newSiteName,
        domain: newSiteDomain,
        tracking_id: trackingId,
        user_id: user.id,
      } as any)
      .select()
      .single()

    if (error) {
      console.error('Error adding website:', error)
      return
    }

    setWebsites([data, ...websites])
    setSelectedWebsite(data)
    setNewSiteName('')
    setNewSiteDomain('')
  }

  async function deleteWebsite(id: string) {
    const { error } = await supabase.from('websites').delete().eq('id', id)
    if (error) {
      console.error('Error deleting website:', error)
      return
    }
    setWebsites(websites.filter(w => w.id !== id))
    if (selectedWebsite?.id === id) {
      setSelectedWebsite(websites.find(w => w.id !== id) || null)
    }
  }

  function copyTrackingCode() {
    if (!selectedWebsite) return
    const code = generateTrackingScript(selectedWebsite.tracking_id)
    navigator.clipboard.writeText(code)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Cabin</span>
          </div>
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button><Plus className="w-4 h-4 mr-2" /> Add Website</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Website</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm font-medium">Site Name</label>
                    <Input
                      placeholder="My Blog"
                      value={newSiteName}
                      onChange={(e) => setNewSiteName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Domain</label>
                    <Input
                      placeholder="example.com"
                      value={newSiteDomain}
                      onChange={(e) => setNewSiteDomain(e.target.value)}
                    />
                  </div>
                  <Button onClick={addWebsite} className="w-full">Add Website</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {websites.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No websites yet</h2>
              <p className="text-muted-foreground mb-4">Add your first website to start tracking analytics</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Your First Website</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Website</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="text-sm font-medium">Site Name</label>
                      <Input
                        placeholder="My Blog"
                        value={newSiteName}
                        onChange={(e) => setNewSiteName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Domain</label>
                      <Input
                        placeholder="example.com"
                        value={newSiteDomain}
                        onChange={(e) => setNewSiteDomain(e.target.value)}
                      />
                    </div>
                    <Button onClick={addWebsite} className="w-full">Add Website</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Website Selector */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                {websites.map((site) => (
                  <Button
                    key={site.id}
                    variant={selectedWebsite?.id === site.id ? 'default' : 'outline'}
                    onClick={() => setSelectedWebsite(site)}
                    className="gap-2"
                  >
                    {site.name}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteWebsite(site.id)
                      }}
                      className="ml-2 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </Button>
                ))}
              </div>

              {selectedWebsite && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">{selectedWebsite.name}</h2>
                        <p className="text-sm text-muted-foreground">{selectedWebsite.domain}</p>
                      </div>
                      <Button variant="outline" onClick={copyTrackingCode}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Tracking Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Date Range */}
            <div className="flex items-center gap-2 mb-6">
              {[7, 30, 90].map((days) => (
                <Button
                  key={days}
                  variant={dateRange === days ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDateRange(days)}
                >
                  Last {days} days
                </Button>
              ))}
            </div>

            {stats && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Pageviews
                      </CardTitle>
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Unique Visitors
                      </CardTitle>
                      <Users className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.uniqueVisitors.toLocaleString()}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Avg. Time on Site
                      </CardTitle>
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.avgTime}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Bounce Rate
                      </CardTitle>
                      <MousePointer className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.bounceRate}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts */}
                <Tabs defaultValue="traffic" className="mb-8">
                  <TabsList>
                    <TabsTrigger value="traffic">Traffic</TabsTrigger>
                    <TabsTrigger value="pages">Top Pages</TabsTrigger>
                    <TabsTrigger value="referrers">Referrers</TabsTrigger>
                  </TabsList>

                  <TabsContent value="traffic">
                    <Card>
                      <CardHeader>
                        <CardTitle>Traffic Overview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.dailyData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" name="Pageviews" />
                              <Line type="monotone" dataKey="visitors" stroke="hsl(var(--muted-foreground))" name="Visitors" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="pages">
                    <Card>
                      <CardHeader>
                        <CardTitle>Top Pages</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.topPages} layout="vertical">
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis type="number" />
                              <YAxis dataKey="url" type="category" width={150} />
                              <Tooltip />
                              <Bar dataKey="views" fill="hsl(var(--primary))" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="referrers">
                    <Card>
                      <CardHeader>
                        <CardTitle>Top Referrers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.topReferrers} layout="vertical">
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis type="number" />
                              <YAxis dataKey="referrer" type="category" width={150} />
                              <Tooltip />
                              <Bar dataKey="views" fill="hsl(var(--primary))" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
