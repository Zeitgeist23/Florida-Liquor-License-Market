from pathlib import Path
import re


def get(path: str) -> str:
    return Path(path).read_text(encoding="utf-8")


def put(path: str, text: str) -> None:
    Path(path).write_text(text, encoding="utf-8")


def replace_exact(path: str, old: str, new: str, label: str) -> None:
    text = get(path)
    if old not in text:
        raise SystemExit(f"{label}: exact block not found in {path}")
    put(path, text.replace(old, new, 1))


def replace_regex(path: str, pattern: str, new: str, label: str) -> None:
    text = get(path)
    updated, count = re.subn(pattern, new, text, count=1, flags=re.S)
    if count != 1:
        raise SystemExit(f"{label}: expected one match in {path}, found {count}")
    put(path, updated)


def ensure_import(path: str, line: str) -> None:
    text = get(path)
    if line in text:
        return
    match = re.search(r"\n(?:const|export const|type) ", text)
    if not match:
        raise SystemExit(f"Cannot place import in {path}")
    put(path, text[: match.start() + 1] + line + "\n" + text[match.start() + 1 :])


# Use one stylesheet stack on the canonical inventory route.
replace_regex(
    "app/listings/page.tsx",
    r'import "\./listings-premium\.css";.*?import "\./listings-seo-footer\.css";',
    'import "./listing-card-system.css";',
    "main listing stylesheet stack",
)

# County inventory pages.
ensure_import(
    "app/counties/[slug]/page.tsx",
    'import MarketplaceListingCard from "@/components/MarketplaceListingCard";',
)
replace_regex(
    "app/counties/[slug]/page.tsx",
    r'import "\./county-page\.css";\n(?:import "\.\./\.\./listings/[^"\n]+\.css";\n)+',
    'import "./county-page.css";\nimport "../../listings/listing-card-system.css";\n',
    "county listing stylesheet stack",
)
replace_exact(
    "app/counties/[slug]/page.tsx",
    '''                {available.map((listing) => (
                  <article className="result-card result-card-available" id={listing.sourceRef} key={listingKey(listing)}>
                    <span className="result-type-badge">{listing.type}</span>
                    <div className="result-photo"><FloridaCountyMap county={listing.county} enlarged /></div>
                    <div className="result-body">
                      <p className="result-county-row"><span className="result-pin" aria-hidden="true">●</span><Link className="result-county-link" href={`/counties/${county.slug}`}>{listing.county}</Link></p>
                      <h2><Link href={listingPageHref(listing)} aria-label={`View ${listing.type} listing in ${listing.county}`} style={{ color: "inherit", textDecoration: "none" }}>{listing.priceLabel}</Link></h2>
                      <div className="result-facts">
                        <span className="availability-pill" title={listing.licenseStatus ? sellerReportedStatusLabel(listing.licenseStatus) : "Status to confirm"}><span className="availability-dot" aria-hidden="true" />Available</span>
                      </div>
                      <ListingDescription listing={listing} />
                      <div className="result-actions">
                        <Link className="btn btn-gold result-view-button" href={listingPageHref(listing)}>View License <span aria-hidden="true">›</span></Link>
                      </div>
                    </div>
                  </article>
                ))}''',
    '''                {available.map((listing) => (
                  <MarketplaceListingCard
                    id={listing.sourceRef}
                    key={listingKey(listing)}
                    listing={listing}
                  />
                ))}''',
    "county inventory cards",
)

# 4COP page inventory.
ensure_import(
    "app/florida-4cop-liquor-license-for-sale/page.tsx",
    'import MarketplaceListingCard from "@/components/MarketplaceListingCard";',
)
replace_regex(
    "app/florida-4cop-liquor-license-for-sale/page.tsx",
    r'import "\.\./listings/listings-premium\.css";.*?import "\.\./florida-liquor-licenses-for-sale/seo-market\.css";',
    'import "../listings/listing-card-system.css";\nimport "../florida-liquor-licenses-for-sale/seo-market.css";',
    "4COP listing stylesheet stack",
)
replace_exact(
    "app/florida-4cop-liquor-license-for-sale/page.tsx",
    '''              {previewListings.map((listing) => (
                <article className="result-card result-card-available" key={listing.sourceRef ?? `${listing.county}-${listing.price}`}>
                  <span className="result-type-badge">{listing.type}</span>
                  <div className="result-photo"><FloridaCountyMap county={listing.county} enlarged /></div>
                  <div className="result-body">
                    <p className="result-county-row"><span className="result-pin" aria-hidden="true">●</span><Link className="result-county-link" href={`/counties/${countySlug(listing.county)}`}>{listing.county}</Link></p>
                    <h2><Link href={listingPageHref(listing)} aria-label={`View ${listing.type} listing in ${listing.county}`} style={{ color: "inherit", textDecoration: "none" }}>{listing.priceLabel}</Link></h2>
                    <div className="result-facts">
                      <span className="availability-pill" title={listing.licenseStatus ? sellerReportedStatusLabel(listing.licenseStatus) : "Status to confirm"}><span className="availability-dot" aria-hidden="true" />Available</span>
                    </div>
                    <ListingDescription listing={listing} />
                    <div className="result-actions">
                      <Link className="btn btn-gold result-view-button" href={listingPageHref(listing)}>View License <span aria-hidden="true">›</span></Link>
                    </div>
                  </div>
                </article>
              ))}''',
    '''              {previewListings.map((listing) => (
                <MarketplaceListingCard
                  key={listing.sourceRef ?? `${listing.county}-${listing.type}-${listing.priceLabel}`}
                  listing={listing}
                />
              ))}''',
    "4COP inventory cards",
)
text = get("app/florida-4cop-liquor-license-for-sale/page.tsx")
text = text.replace(
    'className="results-page seo-market-preview-results"',
    'className="results-page embedded-listing-results seo-market-preview-results"',
    1,
)
put("app/florida-4cop-liquor-license-for-sale/page.tsx", text)

# 3PS page inventory.
ensure_import(
    "app/florida-3ps-liquor-license-for-sale/page.tsx",
    'import MarketplaceListingCard from "@/components/MarketplaceListingCard";',
)
replace_regex(
    "app/florida-3ps-liquor-license-for-sale/page.tsx",
    r'import "\.\./listings/listings-premium\.css";.*?import "\.\./florida-liquor-licenses-for-sale/seo-market\.css";',
    'import "../listings/listing-card-system.css";\nimport "../florida-liquor-licenses-for-sale/seo-market.css";',
    "3PS listing stylesheet stack",
)
replace_exact(
    "app/florida-3ps-liquor-license-for-sale/page.tsx",
    '''                {previewListings.map((listing) => (
                  <article className="result-card" key={listing.sourceRef ?? `${listing.county}-${listing.price}`}>
                    <div className="result-photo">
                      <FloridaCountyMap county={listing.county} />
                      <span className="result-type-badge">3PS Package Store</span>
                    </div>
                    <div className="result-body">
                      <p>● <Link className="result-county-link" href={`/counties/${countySlug(listing.county)}`}>{listing.county}</Link></p>
                      <h2><Link href={listingPageHref(listing)} style={{ color: "inherit", textDecoration: "none" }}>{listing.priceLabel}</Link></h2>
                      <div className="result-facts">
                        <span>{listing.type}</span>
                        <span>{listing.licenseStatus ? `${sellerReportedStatusLabel(listing.licenseStatus)} / Available` : "Available / Status to confirm"}</span>
                      </div>
                      <ListingDescription listing={listing} />
                      <div className="result-actions">
                        <Link className="btn btn-gold" href={`/contact?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${listing.sourceRef}`}>Inquire</Link>
                        <Link className="btn offer-button" href={`/submit-offer?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${listing.sourceRef}`}>Submit an Offer</Link>
                      </div>
                    </div>
                  </article>
                ))}''',
    '''                {previewListings.map((listing) => (
                  <MarketplaceListingCard
                    key={listing.sourceRef ?? `${listing.county}-${listing.type}-${listing.priceLabel}`}
                    listing={listing}
                  />
                ))}''',
    "3PS inventory cards",
)
text = get("app/florida-3ps-liquor-license-for-sale/page.tsx")
text = text.replace(
    'className="results-page seo-market-preview-results"',
    'className="results-page embedded-listing-results seo-market-preview-results"',
    1,
)
text = text.replace('import InventoryCardExpansion from "@/components/InventoryCardExpansion";\n', "")
text = text.replace("      <InventoryCardExpansion />\n", "")
put("app/florida-3ps-liquor-license-for-sale/page.tsx", text)

# Value estimator comparable listings.
text = get("components/LiquorLicenseValueEstimator.tsx")
for unused in [
    'import Link from "next/link";\n',
    'import { useRouter } from "next/navigation";\n',
    'import { listingPageHref } from "@/lib/listing-page-urls";\n',
    'import interactionStyles from "./ComparableListingRows.module.css";\n',
    "  const router = useRouter();\n",
]:
    text = text.replace(unused, "")
put("components/LiquorLicenseValueEstimator.tsx", text)
ensure_import(
    "components/LiquorLicenseValueEstimator.tsx",
    'import MarketplaceListingCard from "./MarketplaceListingCard";',
)
replace_regex(
    "components/LiquorLicenseValueEstimator.tsx",
    r'\{guidance\.comparables\.length > 0 \? \(\s*<div className=\{styles\.tableWrap\}>.*?</div>\s*\) : \(',
    '''{guidance.comparables.length > 0 ? (
            <div className="results-page embedded-listing-results listing-cards-two">
              <div className="results-grid">
                {guidance.comparables.map((listing, index) => (
                  <MarketplaceListingCard
                    key={`${listing.reference}-${listing.askingPrice}-${index}`}
                    listing={{
                      county: listing.county,
                      type: listing.licenseType,
                      price: listing.askingPrice,
                      priceLabel: currency(listing.askingPrice),
                      sourceRef: listing.reference,
                      licenseStatus: listing.status,
                      image: "/assets/license-market/license-01.png",
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (''',
    "value estimator comparable cards",
)
ensure_import(
    "app/florida-liquor-license-value/page.tsx",
    'import "@/app/listings/listing-card-system.css";',
)

# County value-guide comparable listings.
ensure_import(
    "app/counties/[slug]/liquor-license-value/page.tsx",
    'import MarketplaceListingCard from "@/components/MarketplaceListingCard";',
)
ensure_import(
    "app/counties/[slug]/liquor-license-value/page.tsx",
    'import "@/app/listings/listing-card-system.css";',
)
replace_regex(
    "app/counties/[slug]/liquor-license-value/page.tsx",
    r'\{comparables\.length \? \(\s*<div className="county-value-table-wrap">.*?</div>\s*\) : \(',
    '''{comparables.length ? (
          <div className="results-page embedded-listing-results">
            <div className="results-grid">
              {comparables.map((listing) => (
                <MarketplaceListingCard key={listing.sourceRef} listing={listing} />
              ))}
            </div>
          </div>
        ) : (''',
    "county value-guide comparable cards",
)

# Seller market-pricing guidance.
ensure_import(
    "components/MarketPricingGuidance.tsx",
    'import type { Listing } from "@/data/listings";',
)
ensure_import(
    "components/MarketPricingGuidance.tsx",
    'import MarketplaceListingCard from "./MarketplaceListingCard";',
)
text = get("components/MarketPricingGuidance.tsx")
text = text.replace('  licenseType: string;\n', '  licenseType: Listing["type"];\n', 1)
put("components/MarketPricingGuidance.tsx", text)
replace_regex(
    "components/MarketPricingGuidance.tsx",
    r'\{guidance\.comparables\.length \? \(\s*<div className=\{styles\.tableWrap\}>.*?</div>\s*\) : \(',
    '''{guidance.comparables.length ? (
                <div className="results-page embedded-listing-results listing-cards-one">
                  <div className="results-grid">
                    {guidance.comparables.map((listing, index) => (
                      <MarketplaceListingCard
                        key={`${listing.reference}-${listing.askingPrice}-${index}`}
                        listing={{
                          county: listing.county,
                          type: listing.licenseType,
                          price: listing.askingPrice,
                          priceLabel: currency(listing.askingPrice),
                          sourceRef: listing.reference,
                          licenseStatus: listing.status,
                          image: "/assets/license-market/license-01.png",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (''',
    "seller pricing-guidance comparable cards",
)
ensure_import(
    "app/sell-your-license/page.tsx",
    'import "@/app/listings/listing-card-system.css";',
)

print("Canonical listing-card replacements applied.")
