create extension if not exists pgcrypto;

create table if not exists public.listing_submissions (
  id uuid primary key default gen_random_uuid(),
  submission_ref text not null unique,
  full_name text not null,
  first_name text not null,
  email text not null,
  phone text not null,
  county text not null,
  license_type text not null,
  asking_price bigint,
  asking_price_text text,
  license_status text not null,
  preferred_timing text,
  message text,
  status text not null default 'pending_payment'
    check (status in ('pending_payment','paid','approved','rejected','checkout_failed')),
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  stripe_customer_email text,
  paid_at timestamptz,
  payment_email_status text not null default 'pending'
    check (payment_email_status in ('pending','sending','sent','failed')),
  payment_email_sent_at timestamptz,
  listing_title text,
  approved_license_type text
    check (approved_license_type is null or approved_license_type in ('4COP Quota','3PS Quota / Package Store')),
  approved_asking_price bigint,
  live_listing_ref text,
  live_listing_url text,
  approved_at timestamptz,
  approval_email_status text not null default 'pending'
    check (approval_email_status in ('pending','sending','sent','failed')),
  approval_email_sent_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists listing_submissions_status_created_idx
  on public.listing_submissions (status, created_at desc);
create index if not exists listing_submissions_email_idx
  on public.listing_submissions (lower(email));
create index if not exists listing_submissions_live_ref_idx
  on public.listing_submissions (live_listing_ref);

alter table public.listing_submissions enable row level security;

comment on table public.listing_submissions is
  'Seller listing submissions, Stripe payment matching, approval state, and automated email delivery status.';
