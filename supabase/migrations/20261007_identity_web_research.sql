create table if not exists public.identity_web_research_runs (
  id uuid primary key default gen_random_uuid(),
  listing_reference text not null,
  status text not null default 'running' check (status in ('running','completed','failed')),
  queries jsonb not null default '[]'::jsonb,
  pages_found integer not null default 0,
  candidates_discovered integer not null default 0,
  best_candidate text,
  best_confidence integer,
  auto_applied boolean not null default false,
  error_message text,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists identity_web_research_runs_listing_idx
  on public.identity_web_research_runs (listing_reference, started_at desc);

create table if not exists public.identity_web_evidence (
  id uuid primary key default gen_random_uuid(),
  listing_reference text not null,
  research_run_id uuid references public.identity_web_research_runs(id) on delete cascade,
  query text not null,
  url text not null,
  title text,
  snippet text,
  raw_text text,
  source_domain text,
  candidate_name text,
  tavily_score numeric,
  discovered_at timestamptz not null default now(),
  unique (listing_reference, url)
);

create index if not exists identity_web_evidence_listing_idx
  on public.identity_web_evidence (listing_reference, discovered_at desc);

alter table public.identity_web_research_runs enable row level security;
alter table public.identity_web_evidence enable row level security;

comment on table public.identity_web_research_runs is 'Private FLLM open-web identity research audit log.';
comment on table public.identity_web_evidence is 'Private FLLM web evidence collected during automated identity research.';
