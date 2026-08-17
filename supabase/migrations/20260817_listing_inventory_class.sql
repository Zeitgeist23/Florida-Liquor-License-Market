-- FLLM's marketplace has exactly three inventory classes:
--   market          = third-party market inventory used for price/availability intelligence
--   direct_seller   = self-directed seller listings submitted directly to FLLM
--   fllm_exclusive  = proprietary inventory for which FLLM controls the listing relationship

alter table public.listings
  add column if not exists inventory_class text;

-- Backfill conservatively. Legacy FLLM-* references are NOT assumed to be
-- proprietary. Only the dedicated direct-seller and exclusive reference
-- conventions receive those classifications automatically.
update public.listings
set inventory_class = case
  when source_ref ilike 'FLLM-EXCLUSIVE-%' then 'fllm_exclusive'
  when source_ref ilike 'FLLM-PAID-%' then 'direct_seller'
  else 'market'
end
where inventory_class is null
   or inventory_class not in ('market', 'direct_seller', 'fllm_exclusive');

alter table public.listings
  alter column inventory_class set default 'market';

alter table public.listings
  alter column inventory_class set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'listings_inventory_class_check'
      and conrelid = 'public.listings'::regclass
  ) then
    alter table public.listings
      add constraint listings_inventory_class_check
      check (inventory_class in ('market', 'direct_seller', 'fllm_exclusive'));
  end if;
end $$;

create index if not exists listings_inventory_class_idx
  on public.listings(inventory_class);

comment on column public.listings.inventory_class is
  'FLLM inventory class: market, direct_seller, or fllm_exclusive.';
