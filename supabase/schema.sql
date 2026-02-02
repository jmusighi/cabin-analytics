-- Supabase schema for Cabin Analytics

-- Enable RLS
alter table auth.users enable row level security;

-- Users table (extends auth.users)
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text default 'inactive',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Websites table
create table public.websites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete cascade not null,
  name text not null,
  domain text not null,
  tracking_id text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Pageviews table
create table public.pageviews (
  id uuid default gen_random_uuid() primary key,
  website_id uuid references public.websites on delete cascade not null,
  url text not null,
  referrer text,
  user_agent text not null,
  ip_hash text not null,
  country text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for performance
create index idx_pageviews_website_id on public.pageviews(website_id);
create index idx_pageviews_created_at on public.pageviews(created_at);
create index idx_websites_user_id on public.websites(user_id);
create index idx_pageviews_website_created on public.pageviews(website_id, created_at);

-- RLS Policies
alter table public.users enable row level security;
alter table public.websites enable row level security;
alter table public.pageviews enable row level security;

-- Users can only see their own data
create policy "Users can view own data" on public.users
  for select using (auth.uid() = id);

create policy "Users can view own websites" on public.websites
  for select using (auth.uid() = user_id);

create policy "Users can insert own websites" on public.websites
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own websites" on public.websites
  for delete using (auth.uid() = user_id);

create policy "Users can view own pageviews" on public.pageviews
  for select using (
    website_id in (
      select id from public.websites where user_id = auth.uid()
    )
  );

-- Enable realtime for pageviews
alter publication supabase_realtime add table public.pageviews;
