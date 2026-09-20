# FLLM Official Page Template

**Status:** Approved and locked  
**Version:** County v1  
**Visual reference:** [Florida Liquor License Market Data by County](https://www.floridaliquorlicensemarket.com/counties)

The county market-data page is the official reference for future FLLM page refinements. Its current appearance must not be changed when the template is applied elsewhere.

## Applying the template

1. Import `@/app/fllm-official-template.css` before the target page's local stylesheet.
2. Add `fllm-official-page` to the target page's outermost element.
3. Continue using `FormsSiteHeader`; the template supplies the approved desktop header geometry and Contact button treatment.
4. Replace page-local equivalents with the matching `fllm-template-*` classes gradually.
5. Preserve the target page's content and functionality. The template governs visual language, not page-specific information architecture.
6. Verify desktop, tablet and mobile before publishing.

## Reusable class contract

| Purpose | Class |
| --- | --- |
| Page root and design tokens | `fllm-official-page` |
| 1240px content shell | `fllm-template-shell` |
| Hero surface | `fllm-template-hero` |
| Gold uppercase eyebrow | `fllm-template-eyebrow` |
| Hero title | `fllm-template-hero-title` |
| Hero supporting copy | `fllm-template-hero-copy` |
| Standard/deep/gradient sections | `fllm-template-section`, `--deep`, `--gradient` |
| Section heading row | `fllm-template-heading` |
| Gold/outline buttons | `fllm-template-button`, `--outline` |
| Three-column card grid | `fllm-template-card-grid` |
| Navy card | `fllm-template-card` |
| Gold-border card | `fllm-template-card--gold` |
| Card title/copy | `fllm-template-card-title`, `fllm-template-card-copy` |
| Four-column data grid | `fllm-template-stat-grid` |
| Data card | `fllm-template-stat-card` |
| Disclosure bar | `fllm-template-disclosure` |
| Data-table surface | `fllm-template-table-wrap` |
| Gold divider | `fllm-template-divider` |
| Footer surface | `fllm-template-footer` |

## Locked visual values

- Content width: 1240px; desktop side allowance: 20px; mobile side allowance: 12px.
- Type: Georgia for display headings and figures; Arial for navigation, body text, controls and labels.
- Core colors: page blue `#0d3152`, deep navy `#061f35`, section navy `#0a2947`, card blue `#123d65`.
- Accents: gold `#f1a600`, bright gold `#ffc13b`, cyan `#69d6ff`.
- Standard radius: 7px.
- Standard card gap: 14px; stat-card gap: 12px.
- Standard interaction: 180ms; cards rise 4px; gold buttons rise 2px and scale to 103%.
- Desktop breakpoint: 981px; compact layout: 760px; mobile layout: 650px.

## Guardrails

- Do not edit the county page merely to make another page match it.
- Do not globally replace existing FLLM styles.
- Apply the template to one named page at a time.
- Keep page-specific layouts when they serve a distinct function.
- Do not add inventory-based color tiers to ordinary cards.
- Compare the adapted page directly against the county page before approval.


## v2 default for new pages

The County v1 contract remains a valid historical reference, but **all new FLLM pages must use the locked v2 component system** documented in `docs/FLLM_DESIGN_SYSTEM_LOCK.md`.

Do not start new pages from page-local visual CSS. Start with `templates/fllm-v2-page-starter.tsx.txt`, use `FllmPageShell`, and run `npm run check:fllm-design` before deployment.
