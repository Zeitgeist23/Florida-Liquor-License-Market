# FLLM City Page Standard

The Saint Augustine City page is the canonical model for all FLLM City pages.

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
