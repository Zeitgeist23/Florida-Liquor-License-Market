# FLLM Business Market View — Permanent Template and Data-Method Standards

Effective: 2026-10-08. Applies to every current and future independent Business Market View and all dynamically generated Market View content.

## A. Authorization governs buyer inquiries
- **Featured Broker Listing:** Only when a broker has expressly authorized publication of the specific business. The form may invite a specific-business inquiry and route it to the authorized broker. Never misrepresent FLLM as the business broker.
- **Independent Market View:** Public market observations only, with no seller or broker authorization implied. A buyer may inquire about county, observed category, license classification, and market opportunity. Do not promise introductions, seller access, negotiations, or information FLLM is not authorized to provide. Leads belong to FLLM's market-intelligence/buyer-matching workflow; they must not be routed as authorized broker leads.
- The presence of publicly observed listing facts **does not** change the authorization status. Separate lead templates and acknowledgement text must respect that distinction.

## B. License classification governs valuations and metrics
| Market View license class | Quota component value | Page treatment | Statistical inclusion |
|---|---|---|---|
| 4COP Quota | Dynamically calculate from FLLM same-county standalone 4COP asking-price median | Green **FLLM Est. License Value** strip with explanation | Quota valuation stats and business inventory are separate |
| 3PS Quota / Package Store | Dynamically calculate same-county standalone 3PS median; if none, use FLLM's established 4COP series proxy factor | Same green quota estimate treatment, with basis explained | Quota valuation stats and business inventory are separate |
| 4COP SFS/SRX | **No separately transferable quota-license asset value** | **License Classification — 4COP SFS/SRX** and location-specific explanatory text; no dollar-valued quota estimate | Business inventory only; exclude from quota medians |
| 2COP Beer & Wine | **No separately transferable quota-license asset value** | **License Classification — 2COP Beer & Wine** and location-specific explanatory text; no dollar-valued quota estimate | Business inventory only; exclude from quota medians |

Never compute a quota median from operating business-and-license package asking prices. Market observations, including SFS/SRX and 2COP, never contribute to standalone quota-license median calculations. Do not use 0 as a fictitious license asset valuation.

## C. Required presentation standards
- Six equal, centered header cards in two rows of three: **Business Category; County Location; Business + License Price; Liquor License Type; Gross Annual Revenue; SDE / Cash Flow** (or EBITDA, when that precise metric is disclosed). Do not conflate SDE, EBITDA, or cash flow.
- For Quota Market Views only, a compact seventh horizontal strip labeled **FLLM Est. License Value**, derived from the *current* FLLM county market source. Not an appraisal, not an offer to buy the license separately. Its hover/focus tooltip must explain these distinctions.
- For SFS/SRX and 2COP Market Views, instead show classification information and explicitly no standalone quota component valuation. No green dollar estimate, zero-valued asset, standalone quota calculator or quota-financing claim.
- Business + License Price means the observed *complete business package* asking price, not a standalone liquor-license offer.
- Gross revenue and financial metrics display verified-to-source observed figures only; use **Not Disclosed** in the absence of supported records. These figures are not independently audited.
- Preserve FLLM dark navy/gold cards, category color badges, green quota category wording, hover lighting, accessible tooltips, and responsive layout.
- Distinguish the Market View and any broker-authorized Featured listing in copy, disclosure, inquiry routing and lead records.
- For market observations, keep underlying source/evidence privately for auditing. Do not copy third-party photographs or creative broker advertising copy.

## D. Engineering invariants
- Switch on `licenseClass` for valuation and financing—not substring matching against `licenseType`.
- `withMarketLicenseValues` must clear `allocatedLicenseValue`, `marketMedianLicenseValue` and mark `licenseValueBasis: "unavailable"` for location-specific records.
- Quota estimates must use FLLM's data method, not hard-coded values or manual external verification.
- The record's `listingTier` and authorization metadata control contact behavior. An unauthorised market observation must never inherit featured-broker copy, specific-seller contact routing, or broker commissions.
- Preserve consistent canonical URLs and content templates; classifications may change by record without manual page editing.
