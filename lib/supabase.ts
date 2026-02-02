import { createClient } from '@supabase/supabase-js'

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status: 'active' | 'canceled' | 'past_due' | 'inactive'
          created_at: string
        }
        Insert: {
          id: string
          email: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: 'active' | 'canceled' | 'past_due' | 'inactive'
          created_at?: string
        }
      }
      websites: {
        Row: {
          id: string
          user_id: string
          name: string
          domain: string
          tracking_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          domain: string
          tracking_id: string
          created_at?: string
        }
      }
      pageviews: {
        Row: {
          id: string
          website_id: string
          url: string
          referrer: string | null
          user_agent: string
          ip_hash: string
          country: string | null
          created_at: string
        }
        Insert: {
          id?: string
          website_id: string
          url: string
          referrer?: string | null
          user_agent: string
          ip_hash: string
          country?: string | null
          created_at?: string
        }
      }
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
