# FLLM Third-Party Broker + Business Package Listing Standard

**Status:** LOCKED / OFFICIAL  
**Locked:** September 16, 2026  
**Canonical live reference:** `/listings/fllm-antezza`  
**Reference listing:** Alessandro Antezza / SUNSHINEAGLE LLC / Pinellas County 4COP Quota + operating cocktail-lounge package

This standard applies to every **featured third-party broker listing where the liquor license is offered only with, or as part of, the purchase of an operating business**. These pages must use the approved FLLM-ANTEZZA layout, design language, buttons, interaction effects, disclosure structure, broker presentation, and buyer-inquiry routing.

## Locked visual structure

1. Official FLLM header and footer.
2. Hero with county, license type, displayed license asking price, business-purchase-required treatment, package price, availability, FLLM listing reference, county map, and two primary actions.
3. Specific License Details section with four dimensional cards: Asking Price, License Type, County, Marketplace Status.
4. License Highlights panel with four dimensional icon cards.
5. Third-party broker disclosure directly below the license highlights.
6. About This License Listing section.
7. Additional Seller Details section with the business/package description and broker-reported business metrics.
8. Right rail with centered independent broker identity, broker photograph, brokerage/contact card, Call Listing Broker action, broker website link, FLLM request-information form, appraisal promotion, and financing promotion.
9. FLLM market/county context and the same disclaimer treatment used by the approved page.

## Locked colors and effects

- Dark FLLM navy/black page background with gold borders and accents.
- Featured Listing badge uses the approved cyan treatment.
- Cards use the approved FLLM dimensional depth, lower shadow, gradient surface, and subtle inner light/hover lift from FLLM-ANTEZZA.
- Do not flatten the detail, highlight, or broker-reported business metric cards.
- Important transaction conditions such as **Business purchase required** use gold emphasis.
- In the explanatory license-series paragraph only, `4COP Quota` uses the approved cyan treatment and `3PS Quota` uses the approved green treatment, both as FLLM license-type links and without hover underline.
- Third-party broker disclosure uses the approved gold-left-edge treatment.

## Locked button behavior

- Hero primary button: **Inquire About This License** and route to the FLLM inquiry screen with listing context prefilled.
- Hero secondary button: county-market navigation in the approved dark outlined style.
- Broker-rail primary button: **Call Listing Broker** using the approved Lawrence Moore-sized gold button geometry. On hover/focus, its text may swap to the broker phone number without changing button dimensions.
- Broker website link: **Visit Listing Broker Website →** and open the broker-provided listing URL in a new tab.
- Inquiry form button: **Send Inquiry** and route the lead to the listing broker with an FLLM tracking copy according to the featured-third-party-broker inquiry configuration.
- Appraisal and financing calls to action retain the approved gold FLLM treatment.

## Locked broker contact behavior

- Broker name is centered over the broker image.
- Brokerage/contact information remains in a separate bordered card below the image.
- Email remains clickable via `mailto:`.
- A small unboxed copy glyph sits immediately to the right of the email address and copies the broker email to the clipboard.
- Broker/company links may receive subtle approved hover/glint treatment but must not overpower the listing information.

## Business-package requirements

Where the liquor license is not offered separately:

- Explicitly show **Business Purchase Required** near the hero price.
- Display the total business + license package price separately from the displayed license component value.
- State that the license is not currently offered as a standalone sale.
- Provide broker-reported business metrics when supplied, using the same two-column dimensional card treatment.
- Identify broker-reported figures as such and preserve appropriate verification/confidentiality language.
- `Confidentiality:` should use the approved gold emphasis when present.

## Interaction and stability requirements

- Do not add continuous DOM-rewriting `MutationObserver` loops to listing pages. The FLLM-ANTEZZA freeze caused by a self-triggering observer is a prohibited pattern.
- Hover effects must not change card/button dimensions or cause layout shift.
- Copy-email feedback may temporarily change the glyph to a check mark without changing its placement.
- Desktop and mobile layouts must preserve the same content hierarchy.

## Implementation rule

The Alessandro page has now been converted into the reusable implementation.

Future qualifying pages must:

1. Import `app/listings/third-party-business-listing-standard.css`.
2. Render `components/FeaturedThirdPartyBusinessListingPage.tsx`.
3. Supply only a `FeaturedThirdPartyBusinessListingConfig` data object containing the listing-specific county, prices, broker identity/contact information, broker photo/URLs, business description, business metrics, opportunities, confidentiality language and county context.
4. Preserve `data-featured-broker-business-listing="true"`, which is the shared selector used by the locked visual system.
5. Use `ListingBrokerInquiryForm` through the template so the inquiry form and financing calculator remain identical across qualifying listings.

Do **not** copy the JSX into a new route and do not create route-specific visual overrides. Do **not** hard-code a listing reference, package price, broker name, email, phone number or company name into the shared styles.

The canonical live reference remains `/listings/fllm-antezza`, but its visible structure is now rendered by the same reusable component future listings must use. If a future page differs without a documented standard revision, the shared template controls.
