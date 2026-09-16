import type { Metadata } from "next";
import Link from "next/link";

import FloridaCountyMap from "@/components/FloridaCountyMap";
import HeaderNavMenus from "@/components/HeaderNavMenus";
import ListingBrokerInquiryForm from "@/components/ListingBrokerInquiryForm";

import "@/app/listings/listings-premium.css";
import "@/app/listings/listings-header-position.css";
import "@/app/listings/listings-map-size.css";
import "@/app/listings/listings-county-links.css";
import "@/app/listings/listings-navy-refresh.css";
import "@/app/listings/listings-card-gold-borders.css";
import "@/app/listings/listings-title-highlight.css";
import "@/app/listings/listings-regression-fix.css";
import "@/app/listings/listings-filter-depth.css";
import "@/app/listings/listings-logo-3pct-lock.css";
import "@/app/listings/listings-conversion-cards.css";
import "@/app/listings/listings-card-overlap-fix.css";
import "@/app/listings/listings-masthead-darker.css";
import "@/app/listings/listings-mobile-header-fix.css";
import "@/app/listings/listings-focused-card.css";
import "../[slug]/listing-detail.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalPath = "/listings/fllm-antezza";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const listingReference = "FLLM-ANTEZZA";
const county = "Pinellas County";
const countyHref = "/counties/pinellas";
const askingPrice = "$495,000";
const packagePrice = "$1,100,000";
const brokerPhone = "(941) 416-4580";
const brokerEmail = "info@sunshineagle.com";
const brokerWebsite = "https://sunshineagle.com/";
const brokerPhoto = "https://ap.rdcpix.com/3ca5d1e195f67fc572abd959304eafb5a-e1605096413rd-w260_h260.webp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pinellas County 4COP Quota Liquor License for Sale | $495,000",
  description:
    "Featured Pinellas County 4COP quota liquor license listing at $495,000. Business purchase required: the license is included with an associated upscale cocktail lounge offered as a $1.1 million total package. Contact listing broker Alessandro Antezza of SUNSHINEAGLE LLC.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Pinellas County 4COP Quota Liquor License | $495,000",
    description:
      "Featured third-party broker listing. Business purchase required; associated cocktail lounge and license package offered at $1.1 million total.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinellas County 4COP Quota Liquor License | $495,000",
    description:
      "Featured third-party broker listing represented by Alessandro Antezza of SUNSHINEAGLE LLC.",
  },
};

export default function AlessandroAntezzaFeaturedListingPage() {
  const statusLabel = "Available / Broker confirmation required";

  return (
    <main className="results-page marketplace-listing-page" data-featured-broker-listing={listingReference}>
      <style>{`
        .antezza-package-alert{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:10px 0 0;color:#d7e2e8;font-size:14px;font-weight:750;line-height:1.45}.antezza-package-badge{display:inline-flex;align-items:center;min-height:25px;padding:0 9px;border:1px solid #efaa10;border-radius:4px;color:#071a3a;background:#efaa10;font-size:9px;font-weight:950;letter-spacing:.07em;text-transform:uppercase}.antezza-package-alert strong{color:#f1b53a}.package-business-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:17px 0}.package-business-grid div{padding:16px;border:1px solid rgba(226,165,30,.25);border-radius:8px;background:rgba(4,23,39,.72)}.package-business-grid span{display:block;color:#95a9b8;font-size:10px;font-weight:900;letter-spacing:.06em;text-transform:uppercase}.package-business-grid strong{display:block;margin-top:6px;color:#fff;font-size:15px}.package-total{margin:18px 0;padding:16px 18px;border-left:4px solid #efa916;background:rgba(239,169,22,.07);color:#cbd6dd;line-height:1.7}.package-total strong{color:#f1b53a}.marketplace-listing-broker-license{display:block;margin-top:4px;color:#9fb0bd;font-size:11px;font-weight:750}.marketplace-listing-broker-photo img{object-fit:cover}.package-confidential{font-size:12px;color:#9eb0be;line-height:1.6}.package-source-disclosure{font-size:11px;color:#8398a8;line-height:1.6}@media(max-width:760px){.package-business-grid{grid-template-columns:1fr}}
      `}</style>

      <header className="results-header page-shell">
        <Link className="seller-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <HeaderNavMenus className="primary-nav listings-primary-nav" showContactLink />
      </header>

      <section className="marketplace-listing-hero">
        <div className="marketplace-listing-shell marketplace-listing-hero-grid">
          <div className="marketplace-listing-copy">
            <div className="marketplace-listing-breadcrumbs">
              <Link href="/listings">Florida Liquor Licenses for Sale</Link>
              <span>›</span>
              <Link href={countyHref}>Pinellas County</Link>
              <span>›</span>
              <strong>{listingReference}</strong>
            </div>
            <span className="marketplace-listing-kicker">Featured Third-Party Broker Listing</span>
            <h1>
              <span className="marketplace-listing-title-line">Pinellas County</span>
              <span className="marketplace-listing-title-line marketplace-listing-title-type">
                <span className="marketplace-license-series">4COP</span> Quota Liquor License
              </span>
              <span className="marketplace-listing-title-line">for Sale</span>
            </h1>
            <p className="marketplace-listing-price">{askingPrice}</p>
            <div className="antezza-package-alert">
              <span className="antezza-package-badge">Business Purchase Required</span>
              <span>License included with associated cocktail lounge · <strong>Total package {packagePrice}</strong></span>
            </div>
            <div className="marketplace-listing-availability">
              <span className="availability-pill" title={statusLabel}>
                <span className="availability-dot" aria-hidden="true" />
                Available
              </span>
              <span className="marketplace-listing-hero-reference">Listing {listingReference}</span>
              <span className="marketplace-listing-broker-badge">Featured · Third-Party Broker</span>
            </div>
            <p className="marketplace-listing-summary">
              Pinellas County 4COP quota liquor license available exclusively with the acquisition of the associated upscale cocktail lounge. The license is not currently offered separately.
            </p>
            <div className="marketplace-listing-actions">
              <a className="marketplace-listing-primary" href={`tel:${brokerPhone.replace(/[^\d+]/g, "")}`}>Call Listing Broker</a>
              <Link className="marketplace-listing-secondary" href={countyHref}>View Pinellas License Market</Link>
            </div>
          </div>

          <div className="marketplace-listing-map" aria-label="Pinellas County map">
            <FloridaCountyMap county={county} enlarged />
            <strong>Pinellas County</strong>
            <span>St. Petersburg · Clearwater · Largo · Gulf Beaches</span>
          </div>
        </div>
      </section>

      <section className="marketplace-listing-body">
        <div className="marketplace-listing-shell">
          <div className="marketplace-listing-grid">
            <article className="marketplace-listing-main">
              <div className="marketplace-listing-heading">
                <span>Specific License Details</span>
                <h2><span className="marketplace-license-series">4COP</span> Quota in Pinellas County</h2>
              </div>

              <div className="marketplace-listing-facts" aria-label="Specific listing details">
                <div><span>Asking Price</span><strong>{askingPrice}</strong></div>
                <div><span>License Type</span><strong>4COP Quota</strong></div>
                <div><span>County</span><strong>Pinellas County</strong></div>
                <div><span>Marketplace Status</span><strong>{statusLabel}</strong></div>
              </div>

              <section className="marketplace-listing-highlights" aria-labelledby="license-highlights-heading">
                <h3 id="license-highlights-heading">License Highlights</h3>
                <div className="marketplace-listing-highlight-grid">
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 42h13V18H11zM15 18V8h5v10M11 26h13M29 25h12l-2 9a5 5 0 0 1-4 3.5A5 5 0 0 1 31 34zM35 37.5V42M30 42h10" /></svg>
                    <strong>Full-liquor<br />privileges</strong>
                  </div>
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 18h32l-4-9H12zM11 18v22h26V18M17 40V27h14v13M9 18c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0" /></svg>
                    <strong>On- or<br />off-premises use</strong>
                  </div>
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M15 9h18v33H10V9h5M18 6h12v7H18zM16 21l3 3 6-7M16 31l3 3 6-7M29 21h5M29 31h5" /></svg>
                    <strong>Generally no SFS<br />food-sales percentage</strong>
                  </div>
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="14" r="7" /><circle cx="10" cy="22" r="5" /><circle cx="38" cy="22" r="5" /><path d="M13 42v-6c0-7 5-12 11-12s11 5 11 12v6zM2 42v-5c0-5 4-9 9-9 2 0 4 1 6 2M46 42v-5c0-5-4-9-9-9-2 0-4 1-6 2" /></svg>
                    <strong>Limited Pinellas<br />County quota supply</strong>
                  </div>
                </div>
              </section>

              <div className="marketplace-listing-note">
                <strong>Third-party broker disclosure</strong>
                <p>This featured listing is represented by Alessandro Antezza of SUNSHINEAGLE LLC. Florida Liquor License Market is providing marketplace exposure and is not acting as the seller&apos;s broker or transaction representative. Availability, package terms, license status, transferability, and all transaction information should be confirmed directly with the listing broker.</p>
              </div>

              <section className="marketplace-listing-section">
                <h2>About This License Listing</h2>
                <p>This individual marketplace page represents the Pinellas County 4COP quota liquor-license interest identified as {listingReference}. The displayed license asking price is {askingPrice}.</p>
                <p><strong>Business purchase required:</strong> the license is being offered only in connection with the acquisition of the associated upscale cocktail lounge. The liquor license is not currently offered as a standalone sale.</p>
                <p>A Florida quota license may generally be changed between the 3PS Quota series and the 4COP Quota series through a DBPR-approved change of license series, subject to applicable premises, zoning, applicant, and regulatory requirements.</p>
              </section>

              <section className="marketplace-listing-section marketplace-listing-seller-details">
                <h2>Additional Seller Details</h2>
                <p>Rare opportunity to acquire an established upscale cocktail lounge in Pinellas County together with its associated Florida 4COP quota liquor license.</p>
                <p>The <strong>total asking price for the business and license package is {packagePrice}</strong>. The package includes the operating cocktail-lounge business, the 4COP quota liquor license, leasehold improvements, furniture, fixtures and equipment, selected inventory, branding and business goodwill, subject to definitive transaction documents and broker confirmation.</p>

                <div className="package-total">
                  <strong>Business + license package: {packagePrice}.</strong> The 4COP quota liquor license is displayed on FLLM at {askingPrice}. Purchase of the associated business is required, and the license is not currently being offered separately.
                </div>

                <h3>Broker-reported business details</h3>
                <div className="package-business-grid" aria-label="Broker-reported business metrics">
                  <div><span>Gross Revenue</span><strong>$897,270</strong></div>
                  <div><span>Seller Discretionary Earnings</span><strong>$224,862</strong></div>
                  <div><span>EBITDA</span><strong>$172,862</strong></div>
                  <div><span>Established</span><strong>2019</strong></div>
                  <div><span>FF&amp;E Included</span><strong>$50,000</strong></div>
                  <div><span>Inventory Included</span><strong>$10,000</strong></div>
                  <div><span>Premises</span><strong>2,600 SF leased</strong></div>
                  <div><span>Monthly Rent</span><strong>$10,000</strong></div>
                  <div><span>Lease Expiration</span><strong>April 15, 2028</strong></div>
                  <div><span>Employees</span><strong>2 full-time · 6 part-time</strong></div>
                </div>

                <h3>Growth opportunities identified by the listing broker</h3>
                <ul>
                  <li>Private events and corporate functions.</li>
                  <li>Expanded marketing and premium tasting experiences.</li>
                  <li>Strategic local partnerships and event programming.</li>
                  <li>Additional operating and revenue-management improvements.</li>
                </ul>
                <p>Seller transition support is represented as two weeks of training. The stated reason for sale is a change of business interest.</p>
                <p className="package-confidential"><strong>Confidentiality:</strong> additional confidential business information may require buyer qualification, a signed nondisclosure agreement, and satisfactory proof of funds through the listing broker.</p>
                <p className="package-source-disclosure">Business and financial figures are broker-reported listing information and have not been independently audited or verified by FLLM. Buyers should conduct their own financial, legal, lease, licensing, zoning, regulatory, and operational due diligence.</p>
              </section>

              <section className="marketplace-listing-section">
                <h2>Pinellas County Market Context</h2>
                <p>Pinellas County supports a dense restaurant, nightlife, hospitality, tourism, and entertainment market across St. Petersburg, Clearwater, Largo, the Gulf Beaches, and surrounding communities. Quota-license values can vary materially based on supply, seller terms, intended premises, timing, and transaction structure.</p>
                <p><Link href={countyHref}>View the Pinellas County liquor license market →</Link></p>
                <p><Link href="/counties/pinellas/liquor-license-value">Review current Pinellas County liquor license values →</Link></p>
              </section>
            </article>

            <aside className="marketplace-listing-aside marketplace-listing-aside-broker">
              <div className="marketplace-listing-action-card">
                <span>Independent Listing Broker</span>
                <div className="marketplace-listing-broker-profile">
                  <h2>Alessandro Antezza</h2>
                  <a className="marketplace-listing-broker-photo" href={brokerWebsite} target="_blank" rel="noopener noreferrer" aria-label="Visit Alessandro Antezza and SUNSHINEAGLE LLC">
                    <img src={brokerPhoto} alt="Alessandro Antezza, listing broker" />
                  </a>
                  <div className="marketplace-listing-broker-contact">
                    <strong>SUNSHINEAGLE LLC</strong>
                    <span className="marketplace-listing-broker-license">Florida registration CQ1069175</span>
                    <a href={`tel:${brokerPhone.replace(/[^\d+]/g, "")}`}>☎ {brokerPhone}</a>
                    <a href={`mailto:${brokerEmail}`}>✉ {brokerEmail}</a>
                  </div>
                </div>
                <a className="marketplace-listing-primary" href={`tel:${brokerPhone.replace(/[^\d+]/g, "")}`}>Call Listing Broker</a>
                <a className="marketplace-listing-text-link" href={brokerWebsite} target="_blank" rel="noopener noreferrer">Visit Listing Broker Website →</a>
                <ListingBrokerInquiryForm
                  listingReference={listingReference}
                  listingRequested="Pinellas County 4COP Quota Liquor License — Business Purchase Required"
                  listingCounty={county}
                  licenseType="4COP Quota"
                  askingPrice={`${askingPrice} license asking price; ${packagePrice} total business package`}
                  listingStatus={statusLabel}
                  listingUrl={canonicalPath}
                />
              </div>

              <section className="marketplace-listing-appraisal-card" aria-labelledby="listing-appraisal-promo-title">
                <img src="/assets/fllm-formal-appraisal-preview-v1.webp" alt="Sample FLLM formal liquor license appraisal report" />
                <div>
                  <span>Professional License Valuation</span>
                  <h2 id="listing-appraisal-promo-title">Order a Liquor License Appraisal</h2>
                  <p>Get a license-specific valuation supported by county market evidence and regulatory research.</p>
                  <Link className="marketplace-listing-appraisal-button" href="/florida-liquor-license-appraisal#order-form">Order an Appraisal</Link>
                  <Link className="marketplace-listing-heat-map-link" href="/?open=heat-map">Explore the Florida License Heat Map →</Link>
                </div>
              </section>

              <section className="marketplace-listing-finance-promo" aria-labelledby="listing-financing-promo-title">
                <span>Liquor License Purchase Financing</span>
                <h2 id="listing-financing-promo-title">Finance the License Component</h2>
                <p>Request financing consideration through the FLLM Private Lender Network for the qualifying liquor-license component of a transaction.</p>
                <Link className="marketplace-listing-finance-button" href="/financing#request-financing">Request Financing</Link>
                <small>All financing is subject to independent lender review, underwriting, collateral eligibility, transaction structure, and approval.</small>
              </section>
            </aside>
          </div>

          <div className="marketplace-listing-disclaimer">
            Marketplace information is provided for informational purposes and remains subject to seller or broker confirmation. Florida Liquor License Market does not guarantee business performance, license status, availability, transfer approval, package price, license price, lease terms, or transaction terms. Independent legal, tax, financial, licensing, zoning, and regulatory review is recommended.
          </div>
        </div>
      </section>
    </main>
  );
}
