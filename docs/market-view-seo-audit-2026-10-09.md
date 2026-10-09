# FLLM Market View SEO & source-field audit — 2026-10-09

Scope: static `lib/business-quota-listings.ts` registry and individual public `app/business-market/[reference]/page.tsx` template, not a live crawl and not a direct Supabase audit.

## Verified registry findings
- 125 parsed registry entries; 117 explicitly marked `listingTier: "market"` in the static source.
- 117/117 Market View entries have a `packagePriceNumber` field in the registry. A numeric field is not proof that the source advertisement displays a valid asking price.
- 0/117 static Market View records contain `grossRevenueNumber`, `sdeNumber`, or `ebitdaNumber` in the parsed entry. **This does not mean all live Market View pages lack earnings:** the detail template separately enriches financials from `business_quota_market_observations` via `getSourcedObservedFinancials`.
- 12/117 Market View registry entries have `sourceListingUrls` encoded directly. The remainder may be associated with private observation-table provenance, which was not checked in this static audit.
- 27 county-and-business-category combinations were repeated, involving 94 records. Previously, these pages shared identical SEO title patterns. The detail template has now been updated to include license class and record reference, making titles distinct.
- Registry market categories: Restaurant 61; Bar 30; Liquor Store 11; Gentlemen's Club 6; Nightclub 5; Cocktail Lounge 2; Other Hospitality 2. No Market View is explicitly categorized as Marina in this static registry.

## Important remaining work
1. Compare the 117 public static Market View records against the claimed 127-record inventory and `business_quota_market_observations` records. Reconcile missing, inactive, unpublished or private-only references before describing all 127 as public listings.
2. Audit each observation-table record for observed gross revenue, SDE/cash flow, EBITDA, source provenance, and active status. Do **not** substitute guessed financials, publicly expose private identity research, or display the source link on public Market Views.
3. Check canonical and indexability of each accessible `/business-market/{reference}` URL with a real production crawl and Search Console, including HTTP codes, server-rendered financial values and internal links.
4. Keep one semantic earnings search field that accepts source-ad labels SDE, cash flow or EBITDA, but retain the original disclosed label for the detail display where possible.
5. Record future snapshots by reference, inspection date, category, source confidence, and changes in observed asking price. Do not automatically add `Offer`/`Product` structured data unless the page is an authorized offering and its actual terms are supported.
6. Audit completeness in the main private system rather than inventing missing financial fields.

## Changes implemented
- Revised individual Market View page titles/descriptions/H1 to incorporate county, business category, license type and unique listing reference; wording clearly distinguishes market observation from FLLM business brokerage.
- Existing canonical paths and market source-policy filters remain unchanged.

This document reports a **static code audit only**. It does not certify deployed production state, live Supabase completeness, or Google AI Overview inclusion.
