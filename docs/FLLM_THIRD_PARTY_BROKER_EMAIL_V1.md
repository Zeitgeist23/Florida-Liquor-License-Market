# FLLM Third-Party Broker Listing Outreach Email v1

**Status:** LOCKED / OFFICIAL  
**Approved:** September 18, 2026  
**Canonical builder:** `lib/broker-outreach.ts -> buildBrokerOutreachMessage()`  
**Production sender:** `listings@floridaliquorlicensemarket.com`  
**Production delivery:** `sendFllmEmail()`

This is the approved, reusable FLLM outreach email for third-party brokers who are marketing either:

- a Florida quota liquor license only, or
- a business package that includes a Florida 4COP Quota or 3PS-family quota liquor license.

The template must be reused for future broker outreach unless the user explicitly approves a new version.

## Locked content order

1. Personalized greeting and broker-specific introductory paragraph.
2. Full broker-listing hero modeled on the locked `/brokers/list-your-license` page.
3. Full **Built for Florida Brokers** section with six cards.
4. **Listing referenced for this outreach:** blue **View the current listing** link.
5. Blue **Visit the FLLM Broker Listing Program** link.
6. Blue **Browse FLLM Marketplace Listings** link.
7. Featured-listing SEO disclosure.
8. Broker-outreach / unsubscribe line.
9. Official FLLM Client Services corporate signature.

The two blue FLLM links belong **directly under the referenced-listing link**. They must not be moved into the hero, into the white benefit section, above the referenced-listing line, or into a separate detached block.

## Locked personalized introduction

The opening paragraph may vary only according to the broker/listing data.

### License-only prospect
The message identifies that FLLM noticed a client quota liquor license listing and invites the broker to add specialized exposure while remaining the listing broker and transaction contact.

### Business + quota-license prospect
The message identifies that FLLM noticed a client business listing that includes a Florida quota liquor license and invites the broker to give the liquor-license component additional specialized exposure while remaining broker for the complete business package.

Broker name, listing title, county, license type and source listing URL may be personalized from the prospect record. The page design and remaining structure are not personalized.

## Locked hero

The email hero must retain the visual language and content of the locked broker-listing page.

**Hero image:**  
`https://www.floridaliquorlicensemarket.com/assets/hero-bar-clean.png`

**Required elements:**
- Breadcrumbs: Home › Broker Services › List a Client License
- Eyebrow: **INDEPENDENT BROKER MARKETPLACE**
- Headline: **Add Your Client’s Florida Liquor License to FLLM**
- Copy: **Reach buyers searching Florida’s specialized quota-license market while you remain the listing representative and transaction contact.**
- ✓ Quota Liquor License Only
- ✓ Quota Liquor License + Business Package
- **CHOOSE A LISTING OPTION**
- **VIEW MARKETPLACE LISTINGS**
- Listings from $14.95 · No share of your commission · Statewide exposure
- Right-side **CHOOSE YOUR EXPOSURE** card
- Standard $14.95
- Featured $24.95
- One-time fee
- No recurring charge
- No FLLM commission

## Locked broker-benefit section

The white section immediately after the hero must remain:

**BUILT FOR FLORIDA BROKERS**

**More exposure without giving up the broker relationship**

Supporting copy:
**Use FLLM as an additional marketing channel while keeping your client, transaction contact role and commission structure intact.**

Six cards, in this order:
1. Increase statewide exposure and buyer traffic
2. You remain the broker and client relationship owner
3. Buyer inquiries route directly to your designated contact
4. FLLM does not take a share of your broker commission
5. List license-only or business + liquor-license packages
6. Featured listings add priority exposure and FLLM listing SEO

The gold **VIEW THE FLLM BROKER LISTING PROGRAM** button remains at the bottom of the section.

## Locked links below the visual section

Immediately after the white benefit section:

**Listing referenced for this outreach:**  
[View the current listing] — links to the identified source listing.

Directly below it, on separate lines:

[Visit the FLLM Broker Listing Program]  
→ `https://www.floridaliquorlicensemarket.com/brokers/list-your-license`

[Browse FLLM Marketplace Listings]  
→ `https://www.floridaliquorlicensemarket.com/listings`

These are ordinary blue underlined HTML links so they remain obvious and clickable across major email clients.

## Locked email effects

Email-client CSS is not relied upon for browser-style hover behavior.

The approved email uses **static dimensional styling**:
- raised gold CTA buttons,
- dimensional dark marketplace button,
- dimensional Standard / Featured pricing boxes,
- dimensional six benefit cards.

The normal appearance must communicate the intended visual hierarchy even when the recipient's email client strips interactive CSS.

Do not make future versions dependent on hover, animation, transforms or browser-only effects.

## Locked corporate signature

Use the FLLM Client Services corporate signature currently generated by `corporateSignatureHtml()` in `lib/fllm-email.ts`.

Required presentation:
- 60×60 official FLLM email logo
- gold vertical separator
- **Florida Liquor License Market**
- **Client Services**
- *Florida’s marketplace for buying, selling and financing liquor licenses*
- `clientservices@floridaliquorlicensemarket.com`
- `www.floridaliquorlicensemarket.com`

This signature is visually distinct from the sender mailbox.

## Locked sender and delivery method

Third-party broker outreach must be sent through the FLLM production email system:

`buildBrokerOutreachMessage(prospect)`  
→ `sendFllmEmail(...)`

Visible production sender:
`Florida Liquor License Market <listings@floridaliquorlicensemarket.com>`

Do not use the ChatGPT Gmail connector as the canonical sending path for broker outreach.

The production FLLM transport may use Resend or the configured Gmail API fallback internally, but the FLLM application owns the sender identity and email construction.

## Broker database workflow

The reusable one-step workflow remains:

1. Add or update the broker prospect.
2. Classify as `license_only` or `business_with_license`.
3. Build this exact locked template.
4. Send through the FLLM production email transport.
5. Store the generated message in `broker_outreach_messages`.
6. Record provider message ID and sent timestamp.
7. Mark the prospect contacted and schedule the next-contact date.
8. Respect opt-out / do-not-contact status.
9. Prevent accidental duplicate sends within the configured duplicate window unless deliberately overridden.

## Change control

Do not:
- move the two blue FLLM links away from directly under the current-listing link,
- replace the hero image,
- alter the hero hierarchy,
- remove or reorder the six benefit cards,
- change Standard / Featured pricing,
- change the sender mailbox,
- substitute a different corporate signature,
- change the production send method,
- reintroduce hover-dependent presentation,
- or restructure the email based on a one-off broker.

Any approved future redesign should be released as a new version rather than silently changing v1.
