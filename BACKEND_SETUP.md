# Listings backend activation

The listings page now reads from Supabase when the required environment variables are configured. Until then, it automatically uses the existing TypeScript inventory, so the page appearance and current listings remain unchanged.

## 1. Create the database table

Create a Supabase project and run `supabase/listings.sql` in the Supabase SQL editor.

## 2. Add Vercel environment variables

Add these variables to the Vercel project for Production, Preview, and Development as appropriate:

- `SUPABASE_URL` — the Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — the server-only service role key
- `CRON_SECRET` — a long random secret used by Vercel Cron
- `AUTHORIZED_LISTING_FEEDS` — comma-separated HTTPS URLs for authorized JSON listing feeds

Never expose `SUPABASE_SERVICE_ROLE_KEY` through a variable beginning with `NEXT_PUBLIC_`.

## 3. Feed format

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

## 4. Deployment behavior

- `vercel.json` calls `/api/cron/update-listings` once daily.
- The route accepts only requests carrying `Authorization: Bearer <CRON_SECRET>`.
- The first database-backed listings request seeds the database with the current static marketplace inventory when the table is empty.
- If the database is unavailable, the existing static inventory is served automatically.
- No verification or source-status text is added to the visible listing cards.

Only add feeds or APIs that authorize automated retrieval and republication. Restricted third-party listing websites should not be scraped without permission.

Deployment retriggered after backend verification on July 22, 2026.
