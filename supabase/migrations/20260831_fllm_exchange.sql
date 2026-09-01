create extension if not exists pgcrypto;

create table if not exists public.exchange_orders (
  id uuid primary key default gen_random_uuid(),
  listing_ref text not null,
  side text not null check (side in ('bid','ask')),
  actor_role text not null check (actor_role in ('buyer','seller')),
  actor_name text not null,
  actor_email text not null,
  actor_phone text,
  price bigint not null check (price > 0),
  status text not null default 'active' check (status in ('active','superseded','accepted','matched','withdrawn')),
  parent_order_id uuid references public.exchange_orders(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists exchange_orders_listing_idx
  on public.exchange_orders (listing_ref, status, side, price desc, created_at desc);

create table if not exists public.exchange_access_tokens (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique,
  listing_ref text not null,
  order_id uuid references public.exchange_orders(id) on delete cascade,
  actor_role text not null check (actor_role in ('buyer','seller')),
  actor_email text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists exchange_access_tokens_listing_idx
  on public.exchange_access_tokens (listing_ref, actor_role, expires_at desc);

create table if not exists public.exchange_transactions (
  id uuid primary key default gen_random_uuid(),
  transaction_ref text not null unique,
  listing_ref text not null,
  buyer_order_id uuid not null references public.exchange_orders(id) on delete restrict,
  seller_order_id uuid references public.exchange_orders(id) on delete restrict,
  matched_price bigint not null check (matched_price > 0),
  status text not null default 'price_matched' check (status in ('price_matched','terms_pending','under_contract','cancelled','closed')),
  buyer_email text not null,
  seller_email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists exchange_transactions_listing_idx
  on public.exchange_transactions (listing_ref, created_at desc);

alter table public.exchange_orders enable row level security;
alter table public.exchange_access_tokens enable row level security;
alter table public.exchange_transactions enable row level security;

-- All exchange reads/writes are performed by server routes with the service-role key.
-- No anonymous policies are intentionally created.
