# FLLM v2 Page Blueprints

All future pages start from the locked component system, not from a blank stylesheet.

## 1. Market / data page
Use for county pricing, statewide inventory, valuation, market reports and research.

Required building blocks:
- `FllmPageShell`
- `fllm-template-hero`
- `fllm-ui-panel` + KPI tiles
- `fllm-ui-table`
- `fllm-ui-link-card`
- official footer through route registration

## 2. Educational / resource page
Use for license types, legal/regulatory explainers, financing and transaction guides.

Required building blocks:
- standard hero
- centered or left `fllm-ui-heading`
- `fllm-template-card` / gold variant
- `fllm-ui-step-card`
- `fllm-template-disclosure`
- `fllm-ui-faq`

## 3. Business-package page
Use for bars, restaurants, lounges, gentlemen's clubs and other operating businesses sold with quota licenses.

Required building blocks:
- standard hero
- `fllm-ui-panel` for business/license/value/transfer summary
- shared business inventory component
- `fllm-ui-step-card` for presale/closing/post-sale workflow
- `fllm-ui-table` for quota-vs-special-license comparisons
- `fllm-ui-faq`

## 4. Listing-detail page
Use the approved listing-detail shell and existing listing components. Do not invent a new listing-card or CTA treatment.

## Route stylesheet rule
The route stylesheet is allowed to describe geometry only. If a design request requires a new color, card, button, table, hover, font size or shadow, the change belongs in the shared design system after approval.

## New-page workflow
1. Copy `templates/fllm-v2-page-starter.tsx.txt`.
2. Choose one blueprint.
3. Replace content only.
4. Register the route in `SellPageOfficialFooter.tsx`.
5. Add sitemap entry.
6. Run `npm run check:fllm-design`.
7. Run `npm run build`.
8. Compare against the approved FLLM reference page before indexing.
