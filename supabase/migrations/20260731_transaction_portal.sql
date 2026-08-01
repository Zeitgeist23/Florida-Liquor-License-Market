create extension if not exists pgcrypto;

create table if not exists public.portal_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text not null,
  password_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portal_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.portal_users(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists portal_sessions_user_id_idx on public.portal_sessions(user_id);
create index if not exists portal_sessions_expires_at_idx on public.portal_sessions(expires_at);

create table if not exists public.portal_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.portal_users(id) on delete cascade,
  reference text not null unique,
  transaction_name text not null,
  participant_role text not null,
  county text not null,
  license_type text not null,
  license_number text,
  financed_purchase boolean not null default false,
  representative_assistance boolean not null default false,
  status text not null default 'Getting started',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portal_transactions_user_id_idx on public.portal_transactions(user_id);
create index if not exists portal_transactions_updated_at_idx on public.portal_transactions(updated_at desc);

alter table public.portal_users enable row level security;
alter table public.portal_sessions enable row level security;
alter table public.portal_transactions enable row level security;

-- No public policies are created. These tables are accessible only through the
-- server-side FLLM portal routes using the Supabase service role.


