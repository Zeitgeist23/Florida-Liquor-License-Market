# FLLM Market Page Template v1

**Status:** LOCKED  
**Approved:** September 14, 2026  
**Canonical page:** [Florida 4COP Quota Liquor Licenses for Sale](https://www.floridaliquorlicensemarket.com/florida-4cop-liquor-license-for-sale)  
**Template ID:** `market-page-v1`

This is the approved design system for long-form FLLM market, pricing, inventory and research pages. The canonical page is the visual and behavioral reference. New pages may change their subject matter and data, but must not approximate, reinterpret or locally override the locked design.

## Source of truth

Use these files together:

1. `app/fllm-official-template.css` — global FLLM tokens, header geometry and shared primitives.
2. The approved listing-card stylesheet stack recorded below and in the manifest.
3. `app/florida-liquor-licenses-for-sale/seo-market.css` — base market-page layout primitives.
4. `app/fllm-market-page-template.css` — final locked overrides, components, interactions, tables and footer.
5. `components/FormsSiteHeader.tsx` — approved logo, primary actions and mobile header.
6. `components/HeaderNavMenus.tsx` — approved navigation labels, menu contents, dimensions and menu behavior.
7. `app/florida-4cop-liquor-license-for-sale/page.tsx` — canonical section order and markup reference.
8. `templates/fllm-market-page-v1.json` — machine-readable lock manifest.

The legacy file `app/florida-4cop-liquor-license-for-sale/official-template.css` is only a compatibility entry point and imports the canonical stylesheet.

## Required page binding

Every page using this template must:

```tsx
import "../fllm-official-template.css";
import "../listings/listings-premium.css";
import "../listings/listings-map-size.css";
import "../listings/listings-county-links.css";
import "../listings/listings-navy-refresh.css";
import "../listings/listings-card-gold-borders.css";
import "../listings/listings-regression-fix.css";
import "../listings/listings-conversion-cards.css";
import "../listings/listings-card-overlap-fix.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";
import "../fllm-market-page-template.css";

<main
  className="seo-market-page fllm-official-page"
  data-fllm-template="market-page-v1"
>
```

Adjust relative import paths for the route depth. Preserve the import order: shared tokens first, market-page template last.

## Locked visual tokens

| Token | Approved value |
|---|---|
| Ink | `#03131f` |
| Deep navy | `#061f35` |
| Navy | `#0a2947` |
| Page blue | `#0d3152` |
| Card blue | `#123d65` |
| Card hover | `#164872` |
| Bright card blue | `#194f7c` |
| Gold | `#f1a600` |
| Bright gold | `#ffc13b` |
| Pale gold | `#ffd56b` |
| Cyan | `#69d6ff` |
| White | `#ffffff` |
| Muted text | `#d7e3ec` |
| Radius | `7px` |
| Content shell | `1240px` |
| Serif | `Georgia, "Times New Roman", serif` |
| Sans serif | `Arial, Helvetica, sans-serif` |

The CSS files—not this summary—are authoritative for every opacity, shadow layer, gradient stop, spacing value and responsive override.

## Locked geometry and typography

- Desktop content width: `min(1240px, calc(100% - 40px))`.
- Mobile content width: `min(calc(100% - 24px), 1240px)`.
- Desktop header logo: `168.7125 × 68.5075px`; brand column `184px`; navigation gap `42px`.
- Hero padding: `54px 0 58px`.
- Hero title: Georgia, `clamp(44px, 5.45vw, 69px)`, line-height `.98`.
- Section headings: Georgia, `clamp(30px, 3.8vw, 46px)`, line-height `1.05`.
- Body copy: approved 14–16px hierarchy with the exact line heights in the stylesheet.
- Standard major sections: `64px` vertical padding; mobile `48px`.
- Gold buttons: rendered minimum height `48px`, `4px` radius, uppercase 12px/900 text, layered gold gradient and dimensional inset/exterior shadows.
- Cards: `7px` radius with approved cyan or gold borders, blue gradients and layered depth.
- Footer: approved three-tone navy gradient, 130px logo, 12px navigation, gold upper border and separate national-marketplace band.

## Locked behavior

- All buttons use the approved 3% hover scale, 2px lift, brightness and glow.
- Resource cards lift 4px, brighten and gain the approved cyan edge glow.
- Pricing callout lifts 4px and brightens; statistic rows receive the light-gray translucent hover shade.
- Information-card values use lining/tabular numerals.
- Keyboard focus behavior must match hover behavior where the element is interactive.
- Reduced-motion preferences disable movement transitions.
- Header menus must use `HeaderNavMenus`; do not recreate or copy menu options locally.
- The List Your License and Contact Us actions must use `FormsSiteHeader`; do not restyle them per page.
- Footer markup and classes must follow the canonical page; do not substitute a legacy footer.

## Locked table behavior

- The county-market header uses the approved blue-to-teal gradient, gold labels, bright lower edge and depth shadow.
- Header cells use `position: sticky; top: 0; z-index: 3`.
- Desktop tables remain part of ordinary document scrolling.
- **Never add a vertical max-height or nested vertical scrollbar to the table wrapper.**
- Mobile may use horizontal overflow for the 760px minimum table width.
- Alternating row fills and row-hover contrast must remain intact.

## Responsive contract

Preserve the existing breakpoints at 980px, 820px, 760px and 650px. At these points the template controls:

- hero and intro grid stacking;
- authority, guide and resource-card grids;
- heading and CTA stacking;
- mobile button width;
- mobile shell width and section spacing;
- horizontal table access;
- footer and navigation alignment.

Do not introduce page-specific media queries that conflict with these rules.

## What may change

- Page title, eyebrow text, description and metadata.
- Market-specific data and data-source functions.
- Listing filters and county statistics.
- Section copy, internal links, FAQ content and structured data.
- The number of cards or rows when the existing component classes and hierarchy remain intact.

## What may not change without a new approved version

Fonts, type scale, dimensions, spacing rhythm, shell width, colors, gradients, shading, borders, radii, shadows, header, menu implementation, buttons, hover/focus behavior, card styling, table styling, sticky-header behavior, footer, responsive breakpoints or section-background sequence.

## Adoption checklist

1. Start from the canonical page structure.
2. Import the complete stylesheet stack in the required order.
3. Use `FormsSiteHeader` and `HeaderNavMenus`.
4. Apply the required root class and `data-fllm-template` marker.
5. Replace content and data only.
6. Verify desktop and mobile widths, hover/focus states, sticky table behavior and page scrolling.
7. Confirm no horizontal page overflow.
8. Compare the rendered page against the canonical URL before deployment.

## Change control

Any intentional visual change to a page using this template must be approved as a new version such as `market-page-v2`. Do not silently modify or fork v1.
