create table if not exists public.appraisal_lien_searches (
  id uuid primary key default gen_random_uuid(),
  appraisal_ref text,
  license_number text not null,
  owner_name text,
  dba text,
  county text,
  series text,
  dbpr_primary_status text,
  dbpr_secondary_status text,
  ucc_status text not null default 'not_run'
    check (ucc_status in ('not_run','running','no_filings_reported','filings_found','error','configuration_required')),
  ucc_debtor_names text[] not null default '{}',
  ucc_searched_at timestamptz,
  ucc_result jsonb not null default '{}'::jsonb,
  abt_status text not null default 'not_requested'
    check (abt_status in ('not_requested','ready_to_request','requested','clear','lien_found','inconclusive')),
  abt_requested_at timestamptz,
  abt_received_at timestamptz,
  abt_result_summary text,
  review_status text not null default 'pending'
    check (review_status in ('pending','reviewed','needs_follow_up')),
  reviewed_at timestamptz,
  reviewer_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.appraisal_lien_searches enable row level security;

create index if not exists appraisal_lien_searches_license_number_idx
  on public.appraisal_lien_searches (license_number);

create index if not exists appraisal_lien_searches_created_at_idx
  on public.appraisal_lien_searches (created_at desc);

comment on table public.appraisal_lien_searches is
  'Private FLLM appraisal due-diligence ledger for DBPR identity, Florida UCC research, and official ABT-6023 lien-search status.';
