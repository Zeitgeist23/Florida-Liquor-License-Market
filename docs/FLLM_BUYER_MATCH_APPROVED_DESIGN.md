# FLLM Buyer Match — Approved Design Baseline

**Approval:** October 14, 2026 — owner-approved design based on live-page screenshots in the conversation.
**Page:** `/florida-business-buyer-match`
**Status:** VISUAL DESIGN LOCKED. Do not redesign, restyle, reorganize or change copy/layout without explicit owner approval.
**Scope:** This is a design specification, not a functional-completeness or deployed-build certification.

## Approved visual structure

1. **Official shared FLLM header** with logo, centered primary navigation, Contact Us, and gold **List a Business** button and business-listing dropdown.
2. **Compact navy hero** with gold eyebrow "FLLM ADVANCED BUSINESS BUYER SEARCH" and white/gold H1 "Florida Businesses for Sale With Liquor Licenses".
3. **Eight color-coded business-category pills** and four license-type pills. Hover has a color-matched neon glow and subtle expansion; selected states have a persistent matching-color illumination, without checkmarks. Both toggle synchronized dashboard filters.
4. **Wide four-column dashboard**, approximately 1580px max width with symmetric outer margins. No additional heading above filters. Panels in this order: **1. Business & Location**, **2. Liquor License**, **3. Financial Metrics**, **4. Deal Structure & Other**. Centered cyan panel headings, white subtitles, icons, equal compact header height. Input controls remain readable and left-aligned.
5. **Current compact notes and franchise layout**: horizontal Either/Yes/No Franchise options, unboxed icon-led License Search Notes with centered cyan subheading and left-aligned short lines.
6. **Bottom results/action console** under all four filter panels. Subtle navy depth, thin cyan divider, centered group. Horizontal cyan dimensional **Matching Businesses | —** status, **Activate Buyer Alerts**, **Reset Filters**, and dominant gold **Show Matching Businesses** button. No arrow appended to the gold label.
7. **Official FLLM footer**. Preserve mobile/responsive behavior and the existing hero/dashboard/footer spacing.

## Functional work is permitted without cosmetic regression

- Test and repair filter matching, backend data correctness, financial filters, results display, event synchronization, buyer-alert save and notification delivery, accessibility, and mobile usability.
- Keep independent Market View and authorized Featured Broker Listing workflows distinct.
- Buyer details remain internal to FLLM; no automated buyer-lead forwarding to outside sellers or brokers.
- Do not replace filters with a different UI, insert additional hero content, add new counters/placeholders, move action controls, or alter approved typography/colors as part of an unrelated fix.
- Any necessary visual change should be separately proposed and explicitly approved before modifying the locked presentation.

## Reference files at time of approval

- `app/florida-business-buyer-match/page.tsx`
- `app/florida-business-buyer-match/buyer-match.css`
- `components/MarketBuyerLeadForm.tsx`
- `components/BuyerMatchHeroPills.tsx`
- `components/FormsSiteHeader.tsx`
- `components/SellPageOfficialFooter.tsx`

Screenshots supplied October 14, 2026 are the visual reference. Do not assume this document itself enforces a technical branch-protection rule; it establishes the agreed baseline for subsequent development.
