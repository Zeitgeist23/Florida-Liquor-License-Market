create index if not exists listings_source_url_idx
  on public.listings (source_url)
  where source_url is not null;

create index if not exists listings_source_ref_idx
  on public.listings (source_ref)
  where source_ref is not null;

create index if not exists listings_last_seen_idx
  on public.listings (last_seen_at);
