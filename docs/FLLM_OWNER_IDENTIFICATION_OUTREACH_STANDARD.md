# FLLM Business Identification & Owner Outreach Standard

**Status:** OFFICIAL / PRIVATE ADMIN WORKFLOW  
**Implemented:** 2026-09-29  
**Admin route:** `/admin/owner-outreach`

## Purpose

FLLM may independently research public business-for-sale advertisements to identify the underlying restaurant, bar, liquor store, nightclub, hospitality business, or other business package; verify the relevant Florida alcoholic-beverage license classification; identify public corporate ownership; and introduce FLLM's marketplace services to the owner through a neutral corporate outreach email.

The workflow is an independent public-record research process. It does not represent that a broker disclosed a confidential business identity to FLLM.

## Required workflow

1. **Capture the public source listing.**
   - Store the source platform, source URL, listing title, county, business type, advertised license description, broker and brokerage when known.
   - Record useful matching clues such as revenue, SDE, square footage, lease terms, establishment year, cuisine, distinctive equipment and operational details.

2. **Research the likely business identity.**
   - Use public sources only.
   - Relevant sources include the source listing, Florida DBPR/ABT, Sunbiz, county property records, the business website, USPTO records and other reputable public sources.
   - Do not buy reports, contact the business during the research step, or seek private residential contact information.

3. **Verify the liquor-license classification.**
   - Never classify a license as quota solely because DBPR displays a 4COP rank.
   - A 4COP SFS/SRX record is a non-quota restaurant license.
   - A quota conclusion must be supported by the official record or other reliable evidence identifying a transferable quota license.
   - Store the exact license number when available.

4. **Score identification confidence.**
   - 80%+ may be marked verified by the automated research workflow, but remains subject to human review.
   - If multiple candidates remain plausible, store candidates instead of asserting one business as fact.
   - Broker confirmation and independent identification are distinct evidence sources.

5. **Identify public owner contact information.**
   - Prefer business/professional contact information from corporate filings, company websites, trademark records or other public business sources.
   - Do not use private residential contact information.

6. **Prepare neutral owner outreach.**
   - The email must not state that FLLM knows the business is currently for sale unless that fact is independently public and appropriate to state.
   - Approved framing: "If [business] or any affiliated operation is considering a future sale..."
   - Do not say or imply that a broker disclosed the owner's identity.
   - Send from `listings@floridaliquorlicensemarket.com` through the FLLM production email transport.

7. **Track outreach and opt-outs.**
   - All owner outreach messages are stored in `owner_outreach_messages`.
   - Owner research/prospect records are stored in `owner_outreach_prospects`.
   - Every email contains an owner-outreach opt-out link.
   - A do-not-contact record blocks future sends.

## Integrated research

When `TINYFISH_API_KEY` is configured, the admin workflow can start a single-record public-web research run from the source listing URL. The agent is instructed to return structured evidence, confidence, candidate identities, public business-owner contact information, DBPR license classification and source URLs.

The automated result is evidence for review, not a substitute for judgment. The UI keeps the confidence score and research status visible.

## Outreach template

The current owner template is intentionally corporate and non-accusatory. It introduces FLLM's business-package marketplace and license-market services, references the identified business only conditionally, and does not reveal or rely on a broker's confidential information.

## Initial record

Zona Blu Italian Deli & Restaurant was seeded as the first research record with an 88% independent-match confidence and `needs_review` status because the business identity has not been confirmed by the listing broker.
