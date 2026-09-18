import type { Metadata } from "next";
import Link from "next/link";

import FloridaCountyMap from "@/components/FloridaCountyMap";
import HeaderNavMenus from "@/components/HeaderNavMenus";
import ListingViewCount from "@/components/ListingViewCount";

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

const listingReference = "FLLM-JULIE-MOCKUP";
const county = "Miami-Dade County";
const countyHref = "/counties/miami-dade";
const licenseValue = "$250,000";
const packagePrice = "$3,500,000";
const brokerPhone = "(305) 389-5800";
const brokerWebsite = "https://www.patburnsiderealty.com/";
const brokerProfile = "https://www.bizbuysell.com/business-broker/julie-negovan/patricia-burnside-realty/895/";
const sourceListing = "https://www.bizbuysell.com/business-opportunity/premium-miami-adult-nightclub/2506980/";
const brokerPhoto = "https://images.bizbuysell.com/shared/brokerdirectory/images/2638/pf_prs_Julie_headshot.jpg";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mockup | Miami-Dade 4COP + Adult Nightclub | FLLM",
  description: "Private noindex mockup of an FLLM Featured third-party broker listing.",
  robots: { index: false, follow: false },
};

export default function JulieNegovanFeaturedListingMockup() {
  const statusLabel = "Available / Broker confirmation required";

  return (
    <main
      className="results-page marketplace-listing-page"
      data-featured-broker-listing="FLLM-ANTEZZA"
    >
      <style>{`
        .julie-mockup-note{margin:14px 0 0;color:#8ea3b1;font-size:10px;line-height:1.5}
        .package-business-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:17px 0}
        .package-business-grid div{padding:16px;border:1px solid rgba(226,165,30,.25);border-radius:8px;background:rgba(4,23,39,.72)}
        .package-business-grid span{display:block;color:#95a9b8;font-size:10px;font-weight:900;letter-spacing:.06em;text-transform:uppercase}
        .package-business-grid strong{display:block;margin-top:6px;color:#fff;font-size:15px}
        .package-total{margin:18px 0;padding:16px 18px;border-left:4px solid #efa916;background:rgba(239,169,22,.07);color:#cbd6dd;line-height:1.7}
        .package-total strong{color:#f1b53a}
        .package-listing-link{color:#48cfff!important;font-weight:850;text-decoration:none;border-bottom:1px solid rgba(72,207,255,.38)}
        .marketplace-listing-broker-license{display:block;margin-top:4px;color:#9fb0bd;font-size:11px;font-weight:750}
        .marketplace-listing-broker-photo img{object-fit:cover}
        .package-confidential{font-size:12px;color:#9eb0be;line-height:1.6}
        .package-source-disclosure{font-size:11px;color:#8398a8;line-height:1.6}
        @media(max-width:760px){.package-business-grid{grid-template-columns:1fr}}
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
              <Link href={countyHref}>Miami-Dade County</Link>
              <span>›</span>
              <strong>{listingReference}</strong>
            </div>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 27,
                marginBottom: 10,
                padding: "0 11px",
                border: "1px solid #79ddff",
                borderRadius: 5,
                color: "#ffffff",
                background: "linear-gradient(180deg,#22bde9,#087ba5)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,.35),0 5px 14px rgba(0,160,210,.18)",
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: ".065em",
                textTransform: "uppercase",
              }}
            >
              Featured Listing
            </span>

            <span className="marketplace-listing-kicker">Featured Third-Party Broker Listing</span>

            <h1>
              <span className="marketplace-listing-title-line">Miami-Dade County</span>
              <span className="marketplace-listing-title-line marketplace-listing-title-type">
                <span className="marketplace-license-series">4COP</span> Quota Liquor License
              </span>
              <span className="marketplace-listing-title-line">with Adult Nightclub</span>
            </h1>

            <p className="marketplace-listing-price">{licenseValue}</p>

            <div className="antezza-package-alert">
              <span className="antezza-package-badge">Business Purchase Required</span>
              <span>
                License included with Premium Miami Adult Nightclub · <strong>Total package {packagePrice}</strong>
              </span>
            </div>

            <div className="marketplace-listing-availability">
              <span className="availability-pill" title={statusLabel}>
                <span className="availability-dot" aria-hidden="true" />
                Available
              </span>
              <span className="marketplace-listing-hero-reference">Listing {listingReference}</span>
              <ListingViewCount listingRef={listingReference} />
              <span className="marketplace-listing-broker-badge">Featured · Third-Party Broker</span>
            </div>

            <p className="marketplace-listing-summary">
              Miami-Dade County 4COP quota liquor license offered only with the acquisition of the associated
              Premium Miami Adult Nightclub. Broker-reported package asking price is {packagePrice}; the included
              4COP quota license is represented at an estimated value of {licenseValue}.
            </p>

            <div className="marketplace-listing-actions">
              <a className="marketplace-listing-primary" href={`tel:${brokerPhone.replace(/[^\d+]/g, "")}`}>
                Call Listing Broker
              </a>
              <Link className="marketplace-listing-secondary" href={countyHref}>
                View Miami-Dade License Market
              </Link>
            </div>

            <p className="julie-mockup-note">Mockup only · not a live FLLM listing</p>
          </div>

          <div className="marketplace-listing-map" aria-label="Miami-Dade County map">
            <FloridaCountyMap county={county} enlarged />
            <strong>{county}</strong>
            <span>Miami · Miami Beach · Doral · Coral Gables · North Miami</span>
          </div>
        </div>
      </section>

      <section className="marketplace-listing-body">
        <div className="marketplace-listing-shell">
          <div className="marketplace-listing-grid">
            <article className="marketplace-listing-main">
              <div className="marketplace-listing-heading">
                <span>Specific License Details</span>
                <h2><span className="marketplace-license-series">4COP</span> Quota in Miami-Dade County</h2>
              </div>

              <div className="marketplace-listing-facts" aria-label="Specific listing details">
                <div><span>License Component</span><strong>{licenseValue}</strong></div>
                <div><span>License Type</span><strong>4COP Quota</strong></div>
                <div><span>County</span><strong>Miami-Dade County</strong></div>
                <div><span>Marketplace Status</span><strong>{statusLabel}</strong></div>
              </div>

              <section className="marketplace-listing-highlights" aria-labelledby="julie-license-highlights">
                <h3 id="julie-license-highlights">License Highlights</h3>
                <div className="marketplace-listing-highlight-grid">
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 42h13V18H11zM15 18V8h5v10M11 26h13M29 25h12l-2 9a5 5 0 0 1-4 3.5A5 5 0 0 1 31 34zM35 37.5V42M30 42h10" /></svg>
                    <strong>Full-liquor<br />privileges</strong>
                  </div>
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 18h32l-4-9H12zM11 18v22h26V18M17 40V27h14v13M9 18c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0" /></svg>
                    <strong>Nightclub / hospitality<br />package use</strong>
                  </div>
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M15 9h18v33H10V9h5M18 6h12v7H18zM16 21l3 3 6-7M16 31l3 3 6-7M29 21h5M29 31h5" /></svg>
                    <strong>Broker-reported<br />active license</strong>
                  </div>
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="14" r="7" /><circle cx="10" cy="22" r="5" /><circle cx="38" cy="22" r="5" /><path d="M13 42v-6c0-7 5-12 11-12s11 5 11 12v6zM2 42v-5c0-5 4-9 9-9 2 0 4 1 6 2M46 42v-5c0-5-4-9-9-9-2 0-4 1-6 2" /></svg>
                    <strong>Limited Miami-Dade<br />County quota supply</strong>
                  </div>
                </div>
              </section>

              <div className="marketplace-listing-note">
                <strong>Third-party broker disclosure</strong>
                <p>
                  This mockup is based on a broker-represented business listing by Julie Negovan of Patricia Burnside Realty.
                  Florida Liquor License Market would provide marketplace exposure only and would not replace the listing broker.
                  Availability, business terms, license status, transferability and all transaction information would remain subject
                  to confirmation directly with the listing broker.
                </p>
              </div>

              <section className="marketplace-listing-section">
                <h2>About This License Listing</h2>
                <p>
                  This mockup presents the Miami-Dade County 4COP quota liquor-license component associated with the
                  Premium Miami Adult Nightclub opportunity. The broker-reported business package asking price is {packagePrice},
                  and the included 4COP quota license is represented as having a value of {licenseValue}.
                </p>
                <p>
                  <strong>Business purchase required:</strong> the liquor license is included as part of the nightclub acquisition
                  and is not represented in the source listing as a standalone sale.
                </p>
                <p>
                  The source listing also states that the transaction includes FF&amp;E, goodwill and operating licenses.
                  Buyers should independently verify all licensing, zoning, adult-entertainment, lease and transfer requirements.
                </p>
              </section>

              <section className="marketplace-listing-section marketplace-listing-seller-details">
                <h2>Additional Seller Details</h2>
                <p>
                  Broker-reported opportunity to acquire an established Miami-Dade adult-entertainment venue with a full-liquor
                  license, commercial kitchen, VIP areas, private rooms and extended operating hours.
                </p>

                <p>
                  The total asking price for the{" "}
                  <a className="package-listing-link" href={sourceListing} target="_blank" rel="noopener noreferrer">
                    business and license package
                  </a>{" "}
                  is {packagePrice}. The source listing states that the package includes the operating business, FF&amp;E, goodwill
                  and licenses for operation, including a Miami-Dade County 4COP quota liquor license represented at {licenseValue}.
                </p>

                <div className="package-total">
                  <strong>Business + license package: {packagePrice}.</strong> 4COP quota license component represented at {licenseValue}.
                  Purchase of the operating business is required in the source listing.
                </div>

                <h3>Broker-reported business details</h3>
                <div className="package-business-grid" aria-label="Broker-reported business metrics">
                  <div><span>Gross Revenue</span><strong>Not Disclosed</strong></div>
                  <div><span>Seller Discretionary Earnings</span><strong>Not Disclosed</strong></div>
                  <div><span>EBITDA</span><strong>Not Disclosed</strong></div>
                  <div><span>Established</span><strong>Not Disclosed</strong></div>
                  <div><span>Premises</span><strong>Approx. 8,500 SF</strong></div>
                  <div><span>Monthly Rent</span><strong>$15,250</strong></div>
                  <div><span>Lease</span><strong>Through 2030</strong></div>
                  <div><span>Renewal Options</span><strong>Two 5-year options</strong></div>
                  <div><span>Operating Hours</span><strong>Noon–5:00 AM</strong></div>
                  <div><span>Parking</span><strong>Ample on-site parking</strong></div>
                </div>

                <h3>Business features identified by the listing broker</h3>
                <ul>
                  <li>Full-liquor sales through an included Miami-Dade County 4COP quota license.</li>
                  <li>Commercial kitchen supporting food-service operations.</li>
                  <li>Private rooms and VIP bottle-service areas.</li>
                  <li>Standalone facility on a high-visibility Miami-Dade thoroughfare.</li>
                  <li>Extended operating hours and established entertainment infrastructure.</li>
                </ul>

                <p className="package-confidential">
                  <strong>Confidentiality:</strong> additional business information, financial details and tour access may require
                  buyer qualification and direct coordination with the listing broker.
                </p>
                <p className="package-source-disclosure">
                  Business and financial figures shown in this mockup are based on broker-provided marketplace information and have not
                  been independently audited or verified by FLLM. Buyers should conduct independent financial, legal, lease, licensing,
                  zoning, regulatory and operational due diligence.
                </p>
              </section>

              <section className="marketplace-listing-section">
                <h2>Miami-Dade County Market Context</h2>
                <p>
                  Miami-Dade County supports a large hospitality, nightlife, tourism and entertainment market. Quota-license values can
                  vary materially based on supply, seller terms, intended premises, zoning, operating concept and transaction structure.
                </p>
                <p><Link href={countyHref}>View the Miami-Dade County liquor license market →</Link></p>
                <p><Link href="/counties/miami-dade/liquor-license-value">Review current Miami-Dade County liquor license values →</Link></p>
              </section>
            </article>

            <aside className="marketplace-listing-aside marketplace-listing-aside-broker">
              <div className="marketplace-listing-action-card">
                <span>Independent Listing Broker</span>
                <div className="marketplace-listing-broker-profile">
                  <h2>Julie Negovan</h2>
                  <a
                    className="marketplace-listing-broker-photo"
                    href={brokerProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Julie Negovan broker profile"
                  >
                    <img src={brokerPhoto} alt="Julie Negovan, listing broker" referrerPolicy="no-referrer" />
                  </a>
                  <div className="marketplace-listing-broker-contact">
                    <strong>Patricia Burnside Realty</strong>
                    <span className="marketplace-listing-broker-license">Florida Broker License BK3449363</span>
                    <a href={`tel:${brokerPhone.replace(/[^\d+]/g, "")}`}>☎ {brokerPhone}</a>
                    <a href={brokerWebsite} target="_blank" rel="noopener noreferrer">Broker Website ↗</a>
                  </div>
                </div>

                <a className="marketplace-listing-primary" href={`tel:${brokerPhone.replace(/[^\d+]/g, "")}`}>
                  Call Listing Broker
                </a>
                <a className="marketplace-listing-text-link" href={sourceListing} target="_blank" rel="noopener noreferrer">
                  Visit Broker Listing Website →
                </a>

                <div className="marketplace-listing-broker-inquiry" aria-label="Mockup request information form">
                  <h3>Request Information</h3>
                  <div className="marketplace-listing-broker-inquiry-row">
                    <label><span>First name</span><input type="text" placeholder="First Name" /></label>
                    <label><span>Last name</span><input type="text" placeholder="Last Name" /></label>
                  </div>
                  <div className="marketplace-listing-broker-inquiry-row">
                    <label><span>Phone number</span><input type="tel" placeholder="(555)555-5555" /></label>
                    <label><span>Email</span><input type="email" placeholder="Email" /></label>
                  </div>
                  <label><span>Message</span><textarea placeholder="Message" rows={6} /></label>
                  <button type="button">Send Inquiry</button>
                  <small>Mockup only. No inquiry is sent from this preview page.</small>
                </div>
              </div>

              <section className="marketplace-listing-appraisal-card" aria-labelledby="julie-appraisal-title">
                <img src="/assets/fllm-formal-appraisal-preview-v1.webp" alt="Sample FLLM formal liquor license appraisal report" />
                <div>
                  <span>Professional License Valuation</span>
                  <h2 id="julie-appraisal-title">Order a Liquor License Appraisal</h2>
                  <p>Get a license-specific valuation supported by county market evidence and regulatory research.</p>
                  <Link className="marketplace-listing-appraisal-button" href="/florida-liquor-license-appraisal#order-form">Order an Appraisal</Link>
                  <Link className="marketplace-listing-heat-map-link" href="/?open=heat-map">Explore the Florida License Heat Map →</Link>
                </div>
              </section>

              <section className="marketplace-listing-finance-promo" aria-labelledby="julie-finance-title">
                <span>Liquor License Purchase Financing</span>
                <h2 id="julie-finance-title">Finance the License Component</h2>
                <p>Request financing consideration through the FLLM Private Lender Network for the qualifying liquor-license component of a transaction.</p>
                <Link className="marketplace-listing-finance-button" href="/financing#request-financing">Request Financing</Link>
                <small>All financing is subject to independent lender review, underwriting, collateral eligibility, transaction structure, and approval.</small>
              </section>
            </aside>
          </div>

          <div className="marketplace-listing-disclaimer">
            Mockup based on publicly available broker-provided listing information. Florida Liquor License Market does not guarantee
            business performance, license status, availability, transfer approval, package price, license value, lease terms or transaction terms.
            Independent legal, tax, financial, licensing, zoning and regulatory review is recommended.
          </div>
        </div>
      </section>
    </main>
  );
}
