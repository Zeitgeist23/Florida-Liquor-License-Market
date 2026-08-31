# Listings backend activation

The listings page reads from Supabase when the required environment variables are configured. Until then, it automatically uses the existing TypeScript inventory, so the page appearance and current listings remain unchanged.

## 1. Create the database table

Create a Supabase project and run `supabase/listings.sql` in the Supabase SQL editor.

## 2. Add Vercel environment variables

Add these variables to the Vercel project for Production, Preview, and Development as appropriate:

- `SUPABASE_URL` — the Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — the server-only service role key
- `CRON_SECRET` — a long random secret used by Vercel Cron
- `AUTHORIZED_LISTING_FEEDS` — optional comma-separated HTTPS URLs for authorized JSON listing feeds
- `TAVILY_API_KEY` — enables daily domain-restricted public-web discovery through Tavily Search
- `AUTO_DISCOVERY_ENABLED` — optional kill switch; set to `false` to stop public-web discovery without removing the API key
- `LISTING_REFRESH_BATCH_SIZE` — optional number of known source URLs to recheck daily (default 15, maximum 20)

Never expose `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, or `TAVILY_API_KEY` through a variable beginning with `NEXT_PUBLIC_`.

## 3. Authorized feed format

Each authorized URL may return either a JSON array or an object with a `listings` array. Each listing should use this shape:

```json
{
  "county": "Orange County",
  "type": "4COP Quota",
  "price": 550000,
  "priceLabel": "$550,000",
  "sourceRef": "BROKER-12345",
  "sourceName": "Authorized Broker Feed",
  "sourceUrl": "https://broker.example/listing/12345",
  "note": "External broker listing. Price and availability subject to confirmation.",
  "image": "/assets/listing-miami.png"
}
```

`sourceRef` must be stable and unique within the source. The importer normalizes common 4COP and 3PS wording, rejects incomplete records, and upserts duplicates.

## 4. Daily public-source discovery

`vercel.json` calls `/api/cron/update-listings` once each day at 11:00 UTC. When `TAVILY_API_KEY` is present and `AUTO_DISCOVERY_ENABLED` is not `false`, the job:

1. Reads every configured direct-crawl sitemap, including nested sitemap indexes, without a search-result cap or county rotation.
2. Fetches and validates every matching individual listing page from sources that expressly permit direct crawling. Liquor License Auctioneers is currently reconciled this way against its complete published sitemap.
3. Deduplicates by the source's stable advertisement ID and canonical URL, so distinct licenses with the same county and price remain distinct.
4. Requires a Florida county, a 4COP or 3PS license type, active sale intent, and a valid individual-listing URL.
5. Rejects results containing terms such as sold, in escrow, under contract, sale pending, off market, or expired.
6. Refreshes existing records when an exact source URL or source reference reappears, including price and availability changes.
7. Uses Tavily domain-restricted searches only as supplemental discovery for sources that do not provide a crawlable complete inventory index or block direct retrieval.
8. Rechecks the least-recently-seen known source URLs through Tavily Extract each day; failed extraction never removes a listing.
9. Adds only genuinely new, high-confidence listings to Supabase, where they appear on the live listings page.

The source configuration is stored in `data/florida-liquor-license-auto-discovery.json`. Sources that do not expose reliable individual listing pages are checked but are not auto-published; their qualified results are reported as manual-review candidates in the cron response.

The crawler identifies itself as `FLLM-InventoryBot`, follows a source's published sitemap, and is enabled only for sources whose public crawling rules permit retrieval. Restricted marketplaces remain on compliant search/feed discovery unless the source authorizes direct access.

## 5. Deployment behavior

- Vercel invokes the cron route only on production deployments.
- The route accepts only requests carrying `Authorization: Bearer <CRON_SECRET>`.
- The first database-backed listings request seeds the database with the current static marketplace inventory when the table is empty.
- If the database is unavailable, the existing static inventory is served automatically.
- If Tavily is not configured, authorized JSON feeds are still checked.
- No verification or source-status text is added to the visible listing cards.
- The cron response reports checked sources, search results, qualified listings, inserted listings, refreshed prices/statuses, skipped duplicates, rejected results, known-URL refresh results, and source-specific errors.

For an existing database, run `supabase/migrations/20260802_listing_refresh_indexes.sql` once. The indexes are optional for correctness but keep exact source matching and oldest-first refresh selection fast as inventory grows.

Only add direct feeds or APIs that authorize automated retrieval and republication. Restricted third-party listing websites should not be scraped without permission.
