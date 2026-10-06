# FLLM City Page Standard

The Saint Augustine City page is the canonical model for all FLLM City pages.

A City page standard has **two inseparable parts**:

1. **Presentation Standard** — the visual design, layout, interactions, hierarchy, hero, maps, cards, controls, tables, modal, header/footer, colors, dimensions, hover behavior, and responsive behavior.
2. **Data-Method Standard** — the method used to identify the correct county/city license population, classify license types and business types, distinguish active/inactive records, deduplicate records, calculate market metrics, validate the result, and prevent false zero counts.

A City page is not considered complete unless **both standards** are satisfied.

## Structural rule
All City pages must use:
- `CityMarketPageShell` for official header + hero treatment
- `CityMarketOverviewMaps` for business and standalone-license market maps
- `CityMarketScope` for market scope, listings, DBPR establishment table, filters, detail modal, growth context, and shared interactions
- `fllm-official-template.css`, `city-page-standard.css`, `city-market-overview.css`, and `city-market-scope.css`

Do not independently restyle a City page unless the shared template itself is intentionally changed.

## Locked visual system
- Navy/ink background with FLLM gold structural accents and cyan data accents.
- Gold = major structural eyebrows / section hierarchy.
- Cyan = data labels, interactive controls, map legends, badges, and selected states.
- White = primary headings and high-contrast values.
- Green = positive FLLM estimated value figures when used.
- Georgia / Times-style serif for major page and section headings.
- Dimensional cards with inset highlights, lower depth shadows, hover lift, internal illumination, and brighter borders.
- Hover targets must brighten internally, not only change the border.
- Large cards and data rows use restrained scale/lift, never disruptive movement.

## Header
- Official shared FLLM header.
- Sticky at the top.
- Dark background, gold lower border, subtle shadow.
- Existing official menu alignment, hover behavior, Contact Us button, and List Your License button remain unchanged.

## Hero
- Height: 390px desktop; 500px compact/tablet treatment.
- City image is embedded on the right side and uses cover sizing.
- Text occupies the left side.
- Approved left-to-right navy fade overlays the image so the copy remains legible while the photo remains visible.
- Gold eyebrow: “Florida Market Data.”
- White serif H1: `clamp(53px,4.9vw,74px)`, line-height .94.
- Supporting copy: 18px, line-height 1.62.
- Hero bullets: 15px bold white with gold dot.
- City mark sits at lower right in white italic serif with small uppercase location tagline.
- Mobile hides the city mark and increases image veil opacity.
- Each City page may change only the city-specific image, image focal position, title, description, bullets, city mark, and tagline.

## City market overview maps
- Same two-panel method as Saint Augustine.
- Business Market Overview and Quota License Market Overview.
- Gold major eyebrows.
- Florida county map with thin red location pin.
- City legend on the business map; county legend on the standalone-license map.
- Legend geography title centered.
- Color-band legends remain interactive: hover a band to isolate/highlight matching counties.
- Count cards are dimensional, cyan-bordered, and illuminate internally on hover.

## Market Scope
- Centered Market Scope heading.
- County License Market and City Operating License Landscape cards retain left-aligned bullet content with centered headings/eyebrows.
- Major structural eyebrows are gold.
- Individual data labels remain cyan.
- Active/inactive/count metrics are clickable drill-down controls into the table.

## Current For-Sale Market
- Centered gold eyebrow, centered white serif heading, centered disclosure below.
- Five stat cards under heading.
- Cards dimensional and hover-lit.
- Marketplace inventory remains explicitly separate from DBPR operating-license census.

## Operating Establishments
- Centered gold eyebrow and white serif heading.
- Four license summary cards: 4COP Quota, 3PS Quota, 4COP SFS/SRX, 2COP.
- Summary cards filter table and reset to first 10.
- Search + Business Type + License Type + License Status controls.
- Menus open on hover/click and stay open while traversing options.
- License Type priority order:
  1. All
  2. All Quota Licenses
  3. 4COP Quota Licenses
  4. 3PS Quota Licenses
  5. 4COP SFS/SRX Licenses
  6. 2COP Beer & Wine Licenses
  7. remaining license types
- Table loads 10 rows initially.
- Pagination button shows next 10, not all-at-once.
- Count reads “Showing X of Y establishments.”
- Rows highlight on hover and open a centered detail modal.
- Detail modal includes copyable license number, structured row data, status, entity, address, series/modifier, and market context.
- License box hover/click behavior and tooltip follow the shared component implementation.
- Business classification uses shared taxonomy, including Restaurant / Bar hybrids.

## Modal
- Approximately one-third of desktop screen width, centered in viewport.
- Blurred/dimmed backdrop.
- White serif establishment title.
- Centered license box with copy icon.
- Dimensional internal cards.
- Quota license tooltips show matching standalone count and FLLM estimated median value.
- Tooltip text must be concise and readable.

## Growth context
- Six dimensional cards.
- Stronger dimensional resting state with top highlight and lower depth shadow.
- Internal cyan illumination and lift on hover.
- Gold forecast emphasis retained.
- Data disclosure remains below cards.

## Footer
- Use the approved official FLLM footer treatment used across current City pages.
- Navy gradient / official branding / existing footer navigation.
- Do not introduce a City-specific footer style.

## Implementation rule
If a future City page needs a design change that would alter any of the above, change the shared component/style only after confirming that the new behavior should apply to every City page. City-specific pages should provide data and city-specific content, not fork the design system.


# Data-Method Standard

The data method is part of the City-page template and must carry over whenever a new City page is created.

## 1. Authoritative operating-license source
- Start from the Florida DBPR / Division of Alcoholic Beverages and Tobacco retail-license extract.
- Parse the same fields and status codes used by the Saint Augustine method.
- Preserve license number, DBA, legal licensee/public-record entity, series, modifier, city, address, ZIP, primary status, secondary status, active/inactive state, quota classification, and FLLM business classification.

## 2. County identification
- Identify the county using the DBPR county field.
- Also validate/fallback against the BEV license-number county prefix when available.
- Never rely on only one fragile CSV column when a second county signal exists.
- County counts must be based on unique license numbers after deduplication.

## 3. City identification
- Match the intended municipality using the DBPR city value or a stronger official city-membership source when available.
- City aliases may be supplied when DBPR uses more than one valid city spelling.
- When an official local-government license list, fee-distribution report, or comparable official city grouping is available, use it to reconcile the DBPR population, as Saint Augustine does.
- Do not silently substitute the whole county for the city.

## 4. False-zero protection
- A City page must not publish a zero operating-license census merely because city matching or source parsing failed.
- If the county loads but the city unexpectedly resolves to zero records, return an unavailable/refreshing state instead of publishing false zeros.
- A new City page must be checked for plausible nonzero operating counts before it is treated as complete.

## 5. Deduplication
- Deduplicate DBPR rows by license number before calculating headline totals.
- If DBPR exposes more than one row for a license number, prefer the current/active record and the record with the more complete DBA/address/entity information.
- Table counts and headline counts must refer to unique licenses, not raw duplicated rows.

## 6. License classification
- 4COP with no special modifier = **4COP Quota**.
- 3PS = **3PS Quota**.
- 4COP with SFS or SRX modifier = **4COP SFS/SRX**.
- 2COP remains its own beer-and-wine class.
- Other license series remain available in the detailed table and filters.
- Do not relabel a non-quota license as quota simply to attach quota-market context.

## 7. Active / inactive method
- Use the same DBPR status-code method used by the shared City data engine.
- Preserve inactive county records so the user can select License Status → Inactive.
- Clicking an active/inactive metric must set both license type and status in the table, not merely scroll to the table.
- Inactive counts shown in overview cards must reconcile with the inactive records accessible in the table.

## 8. Business-type classification
- Apply the shared FLLM classifier to DBA/business names.
- Food-led concepts such as restaurant, grill, cafe, kitchen, pizza, taco, sushi, BBQ, etc. classify as Restaurant.
- Restaurant/bar hybrids use **Restaurant / Bar** rather than being forced into pure Bar.
- The Restaurant filter includes both Restaurant and Restaurant / Bar.
- Pure bars, liquor stores, marinas, hotels/motels, nightclubs, country clubs, and genuine Other Hospitality remain separate.
- City-specific overrides may be used only when the business type is reasonably supportable; do not invent identities or categories.

## 9. Marketplace data separation
- DBPR operating-license census and FLLM marketplace inventory are separate datasets.
- Standalone-license counts, asking-price medians, business-package counts, and operating-license counts must never be blended into one total.
- The page must continue to state that marketplace inventory is separate from the DBPR operating-license census.

## 10. Standalone-license market method
- Pull visible/available marketplace listings for the City page's county.
- Separate 4COP Quota and 3PS Quota inventory.
- Calculate low, median, and high asking-price signals from current visible inventory.
- Calculate license-type medians separately.
- If a 3PS median uses the approved FLLM 4COP-to-3PS proxy, label it as an estimate/proxy in the tooltip rather than presenting it as a directly observed 3PS median.

## 11. Business + license market method
- Pull the shared FLLM business-market datasets for quota, SFS/SRX, and 2COP business packages.
- Restrict public City-page counts to the intended county/city market scope.
- Keep Market Listings / market observations separate from authorized Featured Broker Listings.
- Reuse the shared business/license category and presentation rules.

## 12. Growth and quota-drawing context
- Use the shared county population dataset where available.
- Use an identified city population estimate with the displayed estimate year.
- Use the same projection method for projected growth and projected population.
- Use the current FLLM quota-drawing dataset for the county.
- Clearly label FLLM future quota figures as forecasts, not announced DBPR allocations.

## 13. Required validation before a City page is considered complete
For every new City page, verify:
- county is correct;
- city/county DBPR records actually populate;
- city 4COP Quota count is plausible and nonzero where expected;
- city 3PS, SFS/SRX, and 2COP counts populate where present;
- inactive county records are available;
- duplicate license numbers do not inflate counts;
- Restaurant / Restaurant-Bar classification produces plausible results;
- standalone listings and market-price signals are county-specific;
- map marker points to the intended city/county;
- headline counts agree with the filterable table;
- no section displays a false zero because a source failed.

## 14. Shared implementation rule
- Use the shared City DBPR ingestion engine for ordinary City pages.
- A city may provide county code, city name/aliases, and optional stronger official city-membership evidence.
- Saint Augustine remains the reference for enhanced official city reconciliation.
- Do not create an ad-hoc City DBPR parser when the shared engine can support the city.
- If a new city exposes a source quirk, improve the shared engine so the fix benefits future City pages whenever appropriate.

## Command behavior
When the user says **“Make a City page for [City]”**, that instruction means:
- apply the full Presentation Standard;
- apply the full Data-Method Standard;
- populate and validate city/county data;
- use the shared components and data engine;
- do not stop after producing a visually correct shell.
