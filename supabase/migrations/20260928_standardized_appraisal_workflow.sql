create table if not exists public.appraisal_cases (
  id uuid primary key default gen_random_uuid(),
  case_ref text not null unique,
  order_ref text,
  methodology_version text not null default 'FLLM-QLA-1.0',
  status text not null default 'INTAKE'
    check (status in ('INTAKE','DBPR_VERIFIED','LIEN_RESEARCH','MARKET_RESEARCH','VALUATION','REVIEW','APPROVED','ISSUED')),
  client_name text,
  intended_use text,
  institution_name text,
  effective_date date,
  license_number text not null,
  license_type text,
  owner_name text,
  dba text,
  county text,
  city text,
  series text,
  modifier text,
  primary_status text,
  secondary_status text,
  expiration_date text,
  dbpr_verified_at timestamptz,
  dbpr_snapshot jsonb not null default '{}'::jsonb,
  market_snapshot jsonb not null default '{}'::jsonb,
  comparables jsonb not null default '[]'::jsonb,
  automated_value numeric,
  automated_value_basis text,
  reviewer_adjustment numeric not null default 0,
  adjustment_reason text,
  final_value numeric,
  reviewer_notes text,
  review_status text not null default 'pending'
    check (review_status in ('pending','ready','approved','changes_required')),
  approved_at timestamptz,
  issued_at timestamptz,
  revision integer not null default 0,
  issued_snapshot jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists appraisal_cases_status_idx on public.appraisal_cases(status, created_at desc);
create index if not exists appraisal_cases_license_number_idx on public.appraisal_cases(license_number);
create index if not exists appraisal_cases_order_ref_idx on public.appraisal_cases(order_ref);
alter table public.appraisal_cases enable row level security;

create table if not exists public.appraisal_case_events (
  id bigint generated always as identity primary key,
  appraisal_case_id uuid not null references public.appraisal_cases(id) on delete cascade,
  event_type text not null,
  event_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists appraisal_case_events_case_idx on public.appraisal_case_events(appraisal_case_id, created_at desc);
alter table public.appraisal_case_events enable row level security;

comment on table public.appraisal_cases is
  'Private FLLM formal liquor-license appraisal workfiles with fixed workflow stages, valuation evidence, reviewer controls, and issued snapshots.';
comment on table public.appraisal_case_events is
  'Immutable-style audit events for the FLLM appraisal workflow.';
