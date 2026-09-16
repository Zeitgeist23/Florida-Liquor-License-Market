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
const canonicalPath = "/listings/fllm-203";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const listingReference = "FLLM-203";
const county = "Pinellas County";
const countyHref = "/counties/pinellas";
const packagePrice = "$1,100,000";
const licenseValue = "$495,000";
const brokerPhone = "(941) 416-4580";
const brokerEmail = "info@sunshineagle.com";
const brokerWebsite = "https://sunshineagle.com/";
const brokerPhoto = "https://ap.rdcpix.com/3ca5d1e195f67fc572abd959304eafb5a-e1605096413rd-w260_h260.webp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pinellas County Cocktail Lounge with 4COP Quota License for Sale | $1.1M",
  description:
    "Featured Pinellas County cocktail lounge business package offered at $1.1 million, including a Florida 4COP quota liquor license with a stated value of $495,000. Contact listing broker Alessandro Antezza of SUNSHINEAGLE LLC.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Upscale Pinellas Cocktail Lounge + 4COP Quota License | $1.1M",
    description:
      "Featured third-party broker listing: established cocktail lounge package in Pinellas County with a 4COP quota liquor license included.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinellas Cocktail Lounge + 4COP Quota License | $1.1M",
    description:
      "Featured third-party broker listing represented by Alessandro Antezza of SUNSHINEAGLE LLC.",
  },
};

export default function AlessandroAntezzaFeaturedListingPage() {
  const statusLabel = "Available / Broker confirmation required";
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Pinellas County Cocktail Lounge with 4COP Quota License for Sale",
      url: canonicalUrl,
      description: metadata.description,
      isPartOf: {
        "@type": "CollectionPage",
        name: "Florida Liquor Licenses for Sale",
        url: `${siteUrl}/listings`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Upscale Cocktail Lounge with 4COP Quota License",
      sku: listingReference,
      identifier: listingReference,
      category: "Business + Florida 4COP Quota Liquor License",
      url: canonicalUrl,
      offers: {
        "@type": "Offer",
        price: 1100000,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: canonicalUrl,
      },
      additionalProperty: [
        { "@type": "PropertyValue", name: "County", value: county },
        { "@type": "PropertyValue", name: "License type", value: "4COP Quota" },
        { "@type": "PropertyValue", name: "Total package price", value: packagePrice },
        { "@type": "PropertyValue", name: "Stated liquor license value", value: licenseValue },
        { "@type": "PropertyValue", name: "Gross revenue", value: "$897,270" },
        { "@type": "PropertyValue", name: "Seller discretionary earnings", value: "$224,862" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Florida Liquor Licenses for Sale",
          item: `${siteUrl}/listings`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Pinellas County Liquor License Market",
          item: `${siteUrl}${countyHref}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Cocktail Lounge with 4COP Quota License",
          item: canonicalUrl,
        },
      ],
    },
  ];

  return (
    <main className="results-page marketplace-listing-page" data-featured-broker-listing={listingReference}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <style>{`
        .package-price-note{margin:8px 0 0;color:#d7e2e8;font-size:15px;font-weight:750;line-height:1.45}.package-price-note strong{color:#f1b53a}.package-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:18px 0 26px}.package-fact{padding:15px 14px;border:1px solid rgba(255,255,255,.11);border-radius:7px;background:#061a2b}.package-fact span{display:block;color:#98aaba;font-size:10px;font-weight:900;letter-spacing:.06em;text-transform:uppercase}.package-fact strong{display:block;margin-top:6px;color:#fff;font-size:16px}.package-business-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:17px 0}.package-business-grid div{padding:16px;border:1px solid rgba(226,165,30,.25);border-radius:8px;background:rgba(4,23,39,.72)}.package-business-grid span{display:block;color:#95a9b8;font-size:10px;font-weight:900;letter-spacing:.06em;text-transform:uppercase}.package-business-grid strong{display:block;margin-top:6px;color:#fff;font-size:15px}.package-license-value{margin-top:18px;padding:16px 18px;border-left:4px solid #efa916;background:rgba(239,169,22,.07);color:#cbd6dd;line-height:1.7}.package-license-value strong{color:#f1b53a}.marketplace-listing-broker-license{display:block;margin-top:4px;color:#9fb0bd;font-size:11px;font-weight:750}.marketplace-listing-broker-photo img{object-fit:cover}.package-confidential{font-size:12px;color:#9eb0be;line-height:1.6}.package-source-disclosure{font-size:11px;color:#8398a8;line-height:1.6}@media(max-width:760px){.package-facts{grid-template-columns:repeat(2,minmax(0,1fr))}.package-business-grid{grid-template-columns:1fr}}
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
              <span className="marketplace-listing-title-line marketplace-listing-title-type">Upscale Cocktail Lounge</span>
              <span className="marketplace-listing-title-line">with <span className="marketplace-license-series">4COP</span> Quota License</span>
            </h1>
            <p className="marketplace-listing-price">{packagePrice}</p>
            <p className="package-price-note">Total business package · included <strong>4COP license value {licenseValue}</strong></p>
            <div className="marketplace-listing-availability">
              <span className="availability-pill" title={statusLabel}>
                <span className="availability-dot" aria-hidden="true" />
                Available
              </span>
              <span className="marketplace-listing-hero-reference">Listing {listingReference}</span>
              <span className="marketplace-listing-broker-badge">Featured · Third-Party Broker</span>
            </div>
            <p className="marketplace-listing-summary">
              Established upscale cocktail-lounge opportunity in Pinellas County offered as a turnkey business package with its Florida 4COP quota liquor license included.
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
                <span>Business + License Package</span>
                <h2>Upscale Cocktail Lounge with 4COP Quota License</h2>
              </div>

              <div className="marketplace-listing-facts" aria-label="Featured package listing details">
                <div><span>Total Package Price</span><strong>{packagePrice}</strong></div>
                <div><span>4COP License Value</span><strong>{licenseValue}</strong></div>
                <div><span>License Type</span><strong>4COP Quota</strong></div>
                <div><span>County</span><strong>Pinellas County</strong></div>
              </div>

              <section className="marketplace-listing-highlights" aria-labelledby="package-highlights-heading">
                <h3 id="package-highlights-heading">Package Highlights</h3>
                <div className="marketplace-listing-highlight-grid">
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 42h13V18H11zM15 18V8h5v10M11 26h13M29 25h12l-2 9a5 5 0 0 1-4 3.5A5 5 0 0 1 31 34zM35 37.5V42M30 42h10" /></svg>
                    <strong>4COP quota<br />license included</strong>
                  </div>
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 18h32l-4-9H12zM11 18v22h26V18M17 40V27h14v13M9 18c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0" /></svg>
                    <strong>Turnkey lounge<br />operation</strong>
                  </div>
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 40V12h32v28M13 40V18h22v22M18 25h4M26 25h4M18 32h4M26 32h4" /></svg>
                    <strong>2,600 SF<br />leased premises</strong>
                  </div>
                  <div>
                    <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="14" r="7" /><circle cx="10" cy="22" r="5" /><circle cx="38" cy="22" r="5" /><path d="M13 42v-6c0-7 5-12 11-12s11 5 11 12v6zM2 42v-5c0-5 4-9 9-9 2 0 4 1 6 2M46 42v-5c0-5-4-9-9-9-2 0-4 1-6 2" /></svg>
                    <strong>Established team<br />8 employees</strong>
                  </div>
                </div>
              </section>

              <div className="marketplace-listing-note">
                <strong>Third-party broker disclosure</strong>
                <p>This featured listing is represented by Alessandro Antezza of SUNSHINEAGLE LLC. Florida Liquor License Market is providing marketplace exposure and is not acting as the seller&apos;s broker or transaction representative. All business, financial, license, lease, transfer, and transaction information should be confirmed directly with the listing broker.</p>
              </div>

              <section className="marketplace-listing-section marketplace-listing-seller-details">
                <h2>About the Business Opportunity</h2>
                <p>Rare opportunity to acquire an established and distinctive upscale cocktail lounge concept in a desirable Gulf Coast entertainment market. The offering is presented as a turnkey operating-business package and includes the associated Florida 4COP quota liquor license.</p>
                <p>The lounge features a professionally designed buildout, an extensive premium-spirit selection, an established customer following, branding and digital assets, leasehold improvements, selected inventory, furniture, fixtures and equipment, and business goodwill.</p>

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

                <div className="package-license-value">
                  <strong>4COP license value: {licenseValue}.</strong> This figure represents the stated value assigned to the liquor-license component within the {packagePrice} total business package. The license is not represented on this page as a separate standalone offering unless the listing broker confirms otherwise.
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
                <h2>Pinellas County License Context</h2>
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
                    <span className="marketplace-listing-broker-license">Florida license CQ1069175</span>
                    <a href={`tel:${brokerPhone.replace(/[^\d+]/g, "")}`}>☎ {brokerPhone}</a>
                    <a href={`mailto:${brokerEmail}`}>✉ {brokerEmail}</a>
                  </div>
                </div>
                <a className="marketplace-listing-primary" href={`tel:${brokerPhone.replace(/[^\d+]/g, "")}`}>Call Listing Broker</a>
                <a className="marketplace-listing-text-link" href={brokerWebsite} target="_blank" rel="noopener noreferrer">Visit Listing Broker Website →</a>
                <ListingBrokerInquiryForm
                  listingReference={listingReference}
                  listingRequested="Upscale Cocktail Lounge with 4COP Quota License"
                  listingCounty={county}
                  licenseType="4COP Quota"
                  askingPrice={`${packagePrice} total package; ${licenseValue} stated license value`}
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
            Marketplace information is provided for informational purposes and remains subject to seller or broker confirmation. Florida Liquor License Market does not guarantee business performance, license status, availability, transfer approval, package value, license value, price, lease terms, or transaction terms. Independent legal, tax, financial, licensing, zoning, and regulatory review is recommended.
          </div>
        </div>
      </section>
    </main>
  );
}
