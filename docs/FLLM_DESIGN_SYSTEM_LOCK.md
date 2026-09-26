# FLLM Design System Lock

**Status:** LOCKED  
**Version:** v2  
**Effective:** September 20, 2026

The purpose of v2 is to stop page-by-page visual reinvention. New FLLM pages must be assembled from the shared design system rather than recreating buttons, cards, headings, tables, FAQs, header or footer styles in a route stylesheet.

## Sources of truth

1. `app/fllm-official-template.css` — global FLLM tokens and foundation primitives.
2. `app/fllm-market-page-template.css` — the canonical market-page visual layer. v2 inherits this exact approved header/hero/button/snapshot/footer language rather than approximating it.
3. `app/fllm-design-system.css` — shared v2 components layered on top of the canonical market-page visual system.
4. `components/FllmDesignSystem.tsx` — approved React primitives.
5. `components/FormsSiteHeader.tsx` — the only approved page header.
6. `app/fllm-official-header.css` — the locked sitewide header geometry and typography.
6. `components/SellPageOfficialFooter.tsx` — the approved footer implementation for registered routes.
7. `templates/fllm-design-system-v2.json` — machine-readable design contract.

## Mandatory rule for new pages

A new official page must:

- import `fllm-official-template.css` first and `fllm-design-system.css` second;
- include `fllm-official-page` on the page root;
- include `data-fllm-design-system="v2"`;
- use `FormsSiteHeader`;
- register the route for the shared official footer instead of creating local footer markup;
- use `FllmButton`, `FllmCard`, `FllmStepCard`, `FllmSectionHeading`, `FllmTable`, `FllmFaqGrid`, `FllmDisclosure`, `FllmStatCard` or their locked CSS classes.

## What route-specific CSS may control

Only content-specific geometry:

- grid column allocation;
- responsive stacking when the shared grid cannot express it;
- section-specific spacing that does not alter the global vertical rhythm;
- image/object positioning;
- content-specific width constraints;
- anchors and scroll offsets.

## What route-specific CSS may NOT control

- colors or gradients;
- fonts, font sizes, font weights or line heights;
- button appearance or hover/focus behavior;
- card appearance, borders, shadows, radii or hover/focus behavior;
- FAQ appearance or opening-state styling;
- table header/body appearance or sticky behavior;
- header or footer appearance;
- design-system breakpoints;
- white-background SEO strips.

If a page needs a new visual primitive, add it to the shared design system after approval. Do not create a local imitation.

## Official header standard

The compact header shown on the approved FLLM inventory pages is now the official sitewide standard.

- Shared component: `FormsSiteHeader`.
- Desktop header height: 82px.
- Logo: 150px × 61px.
- Top-level menu: white Arial, **10px**, **600** weight, uppercase.
- Top-level hover/open state: FLLM gold with 103% scale.
- Desktop menu spacing: 42px on wide screens and 27px on narrower desktop layouts.
- Contact Us and List Your License retain the approved compact 33px button treatment.
- Route-specific styles may not enlarge, embolden, recolor, or otherwise restyle the top-level menu.
- Any change to this header requires an explicit update to the locked design system and build gate.

## Approved content hierarchy

- Display/hero and section headings: Georgia.
- Body/control text: Arial.
- Eyebrows: gold, uppercase.
- Card/step labels: cyan, uppercase.
- Primary action: official dimensional gold button.
- Secondary action: official dark/gold outline button.
- Informational cards: approved navy/cyan or navy/gold surfaces.
- Data tables: approved sticky blue-to-teal header with gold labels.
- FAQ cards: approved navy surface with cyan edge and gold open/hover emphasis.

## Build gate

Run:

`npm run check:fllm-design`

The check scans v2 pages and rejects page-local CSS that attempts to redefine locked visual properties.

## Migration policy

Existing approved v1 pages remain valid. Migrate them deliberately, one route at a time. The first v2 reference routes are:

- `/businesses-with-quota-licenses/bars`
- `/are-florida-quota-liquor-licenses-worth-it`

Future pages should start from v2 rather than from blank CSS.
