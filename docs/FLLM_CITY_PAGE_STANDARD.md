# FLLM City Page Standard

**Status:** LOCKED  
**Version:** v1  
**Effective:** October 4, 2026  
**Reference implementation:** `/cities/saint-augustine`

This is the official FLLM method for building future city liquor-license market pages. New city pages should preserve this structure and visual treatment unless the standard is explicitly revised.

## Required page shell

- Root must include `fllm-official-page`.
- Use `FormsSiteHeader`.
- Header background must use the official FLLM header color `#020b12`.
- Header divider uses the approved FLLM gold treatment.
- Do not create a city-specific header color or alternate navigation treatment.

## Hero structure

The city hero is a single integrated composition, not a stacked text section above a photo and not a narrow isolated left panel.

Required structure:

1. Full hero container with navy background and gold bottom divider.
2. City image positioned on the right side of the hero.
3. Navy-to-transparent horizontal fade extending from the text area into the image.
4. Large white Georgia headline embedded into the hero.
5. Gold uppercase eyebrow.
6. Short supporting paragraph.
7. Three concise market bullets.
8. Optional city wordmark in the lower-right when appropriate.

## Hero proportions

Desktop reference:

- Hero minimum height: approximately 390px.
- Image begins around 34% from the left edge.
- Image uses `background-size: cover`.
- Image focal point may be adjusted per city, but the subject should remain recognizable.
- Copy area: approximately 58% width, max about 820px.
- Copy should not be pinned to the far-left edge; use modest inset spacing.
- Headline max width: about 780px.
- The hero should balance text and image; neither should dominate the full composition.

## Hero typography

- Eyebrow: gold, uppercase, compact.
- H1: Georgia / Times New Roman fallback, white, high contrast.
- Desktop H1 target: roughly `clamp(53px, 4.9vw, 74px)`.
- H1 line height: approximately `.94`.
- Paragraph: approximately 16.5px, line height about 1.6.
- Bullets: approximately 13.5px, bold.
- Use subtle dark text shadow only for readability over the photo.

## Official fade treatment

Use the Saint Augustine hero as the reference balance:

```css
linear-gradient(
  90deg,
  #061a2a 0%,
  #061a2a 31%,
  rgba(6,26,42,.97) 40%,
  rgba(6,26,42,.84) 50%,
  rgba(6,26,42,.60) 60%,
  rgba(6,26,42,.32) 70%,
  rgba(6,26,42,.10) 79%,
  rgba(6,26,42,0) 88%
)
```

The exact image focal point may vary by city, but the fade should remain soft and should extend far enough behind the white headline to keep it readable.

## Image handling

- Use one normal image asset or one verified direct image URL.
- Do **not** use multi-file image chunks.
- Do **not** assemble base64 image fragments at runtime.
- Do **not** wrap raster hero images in an SVG merely to avoid normal asset handling.
- Prefer a single optimized WebP/JPEG asset in `public/assets/<city>/` when possible.
- Preserve enough resolution for desktop hero display.

## Required hero copy pattern

Eyebrow:

`FLORIDA MARKET DATA`

Headline pattern:

`[City] Liquor License Market Data`

Supporting paragraph should explicitly mention:
- city name,
- county name,
- standalone liquor licenses for sale,
- businesses + liquor licenses for sale,
- local pricing / market context.

## Required three bullets

Use this structure, customized for the city/county:

- Standalone liquor licenses for sale.
- Businesses + liquor licenses for sale.
- [County] liquor-license pricing and market data.

These bullets are the default city-page hero bullets and should remain market-focused.

## SEO requirements

Each city page should:
- include the city and county in title/metadata,
- use the city name in the H1,
- mention the county in visible hero copy,
- include the phrases “standalone liquor licenses for sale” and “businesses + liquor licenses for sale” naturally,
- preserve factual city/county labeling and not imply a nearby listing is physically in the city when it is not.

## Change control

The Saint Augustine page is the locked visual reference for future FLLM city pages. New city pages should copy the method, not reinvent the hero.

Any change to:
- header treatment,
- hero composition,
- typography scale,
- bullet structure,
- image method,
- fade behavior,
- or city-page spacing

should be treated as a change to this standard rather than a one-off city-page exception.
