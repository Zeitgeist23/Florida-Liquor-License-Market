import type { Metadata } from "next";
import Link from "next/link";

import BusinessQuotaListingCard from "@/components/BusinessQuotaListingCard";
import { FllmPageShell } from "@/components/FllmDesignSystem";
import { BUSINESS_LISTING_DISPLAY_LIMIT, businessQuotaListings } from "@/lib/business-quota-listings";

import "../../fllm-official-template.css";
import "../../fllm-design-system.css";
import "../../listings/listings-premium.css";
import "../business-inventory.css";
import "../bars/bars.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/businesses-with-quota-licenses/gentlemens-clubs`;

const allListings = businessQuotaListings.filter(
  (listing) => listing.businessCategory === "Gentlemen's Club",
);
const listings = allListings.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);

const faqs = [
  {
    question: "What does it mean when a Florida gentlemen's club is sold with a 4COP quota license?",
    answer:
      "It means the operating adult-entertainment business is being offered with a transferable county quota full-liquor license as part of the acquisition. The business and the quota-license component can have separate values even when they are marketed together.",
  },
  {
    question: "Does a 4COP quota license authorize adult-entertainment use by itself?",
    answer:
      "No. Alcoholic-beverage licensing and adult-entertainment or land-use approvals are separate. Zoning, distance restrictions, occupancy, entertainment and local operating requirements may apply in addition to the liquor-license transfer.",
  },
  {
    question: "Can FLLM value the 4COP license separately from the business?",
    answer:
      "Yes. FLLM provides county market data and license-specific valuation and appraisal resources that can help identify the quota-license component separately from the total business package price.",
  },
  {
    question: "Are gentlemen's-club listings the same as general nightclub listings?",
    answer:
      "No. FLLM keeps Gentlemen's Club and Nightclub as separate business categories so buyers can distinguish adult-entertainment opportunities from general nightlife businesses.",
  },
];

export const metadata: Metadata = {
  title: "Gentlemen's Clubs for Sale With 4COP Quota Licenses in Florida | FLLM",
  description:
    "Browse Florida gentlemen's clubs and adult-entertainment businesses for sale with included 4COP quota liquor licenses. Compare current packages and FLLM valuation, transfer and transaction resources.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Gentlemen's Clubs for Sale With 4COP Quota Licenses | FLLM",
    description:
      "Florida gentlemen's-club business packages with included transferable 4COP quota licenses, separated from standalone license inventory.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gentlemen's Clubs for Sale With 4COP Quota Licenses in Florida | FLLM",
    description:
      "Adult-entertainment business packages with included Florida 4COP quota licenses and FLLM transaction resources.",
  },
};

export default function GentlemensClubsWithQuotaLicensesPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Gentlemen's Clubs for Sale With 4COP Quota Licenses in Florida",
      url: canonicalUrl,
      description:
        "Florida gentlemen's clubs and adult-entertainment businesses for sale with included 4COP quota liquor licenses.",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Businesses With Quota Licenses",
          item: `${siteUrl}/businesses-with-quota-licenses`,
        },
        { "@type": "ListItem", position: 3, name: "Gentlemen's Clubs With 4COP Quota Licenses", item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida gentlemen's clubs with included 4COP quota licenses",
      numberOfItems: listings.length,
      itemListElement: listings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: listing.title,
        url: `${siteUrl}${listing.href}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <FllmPageShell className="bar-package-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <section className="seo-market-hero">
        <div className="seo-market-shell"><div className="seo-market-hero-grid">
          <div>
            <div className="seo-market-breadcrumbs">
              <Link href="/">Home</Link><span>›</span>
              <Link href="/businesses-with-quota-licenses">Businesses With Quota Licenses</Link><span>›</span>
              <strong>Gentlemen's Clubs</strong>
            </div>
            <span className="seo-market-kicker">Florida Business + 4COP Quota License Packages</span>
            <h1>Gentlemen's Clubs for Sale With <em>4COP Quota Licenses</em> in Florida</h1>
            <p>
              FLLM separates adult-entertainment business acquisitions from standalone quota-license inventory.
              This page displays Florida business packages classified as Gentlemen's Club with an included 4COP quota
              license so buyers can evaluate the operating business, the liquor-license component and the separate
              premises or local approvals that may apply.
            </p>
            <div className="seo-market-actions">
              <a className="seo-market-button seo-market-button-gold" href="#current-packages">View Gentlemen's Club Packages</a>
              <Link className="seo-market-button seo-market-button-dark" href="/transaction-services">
                Explore Transaction Services
              </Link>
            </div>
          </div>

          <aside className="seo-market-snapshot" aria-label="Gentlemen's club and quota license package overview">
            <span>What FLLM Separates</span>
            <div className="seo-market-snapshot-grid">
              <div><strong>Business</strong><small>Operations, goodwill, equipment and other negotiated assets</small></div>
              <div><strong>4COP</strong><small>Transferable county quota license included in the package</small></div>
              <div><strong>Value</strong><small>License component can be analyzed separately from total package price</small></div>
              <div><strong>Approvals</strong><small>Adult-use, zoning and premises approvals remain separate</small></div>
            </div>
          </aside>
        </div></div>
      </section>

      <section className="fllm-template-section bar-package-overview">
        <div className="fllm-template-shell">
          <div className="fllm-template-heading">
            <div>
              <span className="fllm-template-eyebrow">Understanding the Package</span>
              <h2>What a gentlemen's-club + quota-license sale can include</h2>
            </div>
          </div>

          <div className="fllm-template-card-grid">
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Operating Business</span>
              <strong className="fllm-template-card-title">The adult-entertainment business transaction</strong>
              <p className="fllm-template-card-copy">
                The package may include the operating business, furniture, fixtures, equipment, leasehold rights,
                goodwill and other negotiated assets. Those components remain distinct from the quota license.
              </p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Quota License Component</span>
              <strong className="fllm-template-card-title">The transferable 4COP asset</strong>
              <p className="fllm-template-card-copy">
                A 4COP quota license is a county-limited transferable full-liquor quota asset. Its transfer remains
                subject to Florida alcoholic-beverage licensing requirements and approval.
              </p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Adult-Use Approvals</span>
              <strong className="fllm-template-card-title">The liquor license does not replace local approvals</strong>
              <p className="fllm-template-card-copy">
                Zoning, adult-entertainment approvals, distance rules, occupancy and other local requirements can
                remain separate from the liquor license and should be evaluated for the specific premises.
              </p>
            </article>
          </div>

          <div className="fllm-template-disclosure bar-package-disclosure">
            <strong>Important distinction:</strong> this page is transactional business inventory. FLLM's separate
            <Link href="/license-types/gentlemens-clubs-4cop-quota"> 4COP Gentlemen's Club license guide</Link> explains
            the licensing framework in more detail.
          </div>
        </div>
      </section>

      <section className="bar-package-inventory business-quota-inventory" id="current-packages">
        <div className="business-quota-shell">
          <div className="business-quota-heading">
            <div>
              <span>Current FLLM Business Inventory</span>
              <h2>Gentlemen's Clubs Offered With 4COP Quota Licenses</h2>
            </div>
            <strong>
              {listings.length}
              {allListings.length > BUSINESS_LISTING_DISPLAY_LIMIT ? ` of ${allListings.length}` : ""} Active Package
              {allListings.length === 1 ? "" : "s"}
            </strong>
          </div>

          <div className="business-quota-separation-note">
            <strong>Business package ≠ standalone license listing</strong>
            <span>
              These cards represent operating-business opportunities classified as Gentlemen's Club in FLLM's
              Businesses With Quota Licenses inventory.
            </span>
            <Link href="/listings?type=4COP%20Quota">Standalone 4COP licenses ›</Link>
          </div>

          {listings.length > 0 ? (
            <div className="business-quota-grid">
              {listings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="fllm-ui-panel bar-package-empty">
              <strong>No published gentlemen's-club packages are active at this moment.</strong>
              <p>FLLM will display qualifying business + 4COP packages here as they are published.</p>
              <Link className="fllm-template-button" href="/brokers/list-your-license">List a Client Package</Link>
            </div>
          )}
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep bar-package-services">
        <div className="fllm-template-shell">
          <div className="fllm-template-heading">
            <div>
              <span className="fllm-template-eyebrow">FLLM Transaction Services</span>
              <h2>Support the quota-license component before, during and after the business sale</h2>
            </div>
            <Link className="fllm-template-button" href="/transaction-services">Transaction Services</Link>
          </div>

          <div className="fllm-ui-grid fllm-ui-grid--3">
            <article className="fllm-ui-step-card">
              <span className="fllm-ui-step-kicker">01 · Presale</span>
              <h3>Identify and value the 4COP component</h3>
              <p>Use FLLM county market data and valuation resources to separate the quota license from the operating-business package.</p>
              <div className="fllm-ui-step-actions">
                <Link className="fllm-template-button" href="/florida-liquor-license-value">License Value</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/florida-liquor-license-appraisal">Appraisal</Link>
              </div>
            </article>

            <article className="fllm-ui-step-card">
              <span className="fllm-ui-step-kicker">02 · Transfer & Closing</span>
              <h3>Coordinate the closing with the quota-license transfer</h3>
              <p>Review ABT transfer, FDOR, quota-transfer-fee and transaction resources without treating the business closing as the license approval itself.</p>
              <div className="fllm-ui-step-actions">
                <Link className="fllm-template-button" href="/dbpr-abt-6002">ABT-6002 Guide</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/resources/quota-transfer-fee-calculator">Transfer Fee</Link>
              </div>
            </article>

            <article className="fllm-ui-step-card">
              <span className="fllm-ui-step-kicker">03 · Market & Compliance Context</span>
              <h3>Keep the license and premises questions separate</h3>
              <p>Use the FLLM license-type guide alongside local professional review of zoning, adult-use and premises requirements.</p>
              <div className="fllm-ui-step-actions">
                <Link className="fllm-template-button" href="/license-types/gentlemens-clubs-4cop-quota">License Guide</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/resources/lawyer-directory">Lawyer Directory</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep bar-package-faq">
        <div className="fllm-template-shell">
          <div className="fllm-template-heading">
            <div>
              <span className="fllm-template-eyebrow">Common Questions</span>
              <h2>Gentlemen's clubs, business sales and 4COP quota licenses</h2>
            </div>
          </div>
          <div className="fllm-ui-faq-grid fllm-ui-faq-grid--2">
            {faqs.map((faq) => (
              <details className="fllm-ui-faq" key={faq.question}>
                <summary>{faq.question}</summary>
                <div className="fllm-ui-faq-answer"><p>{faq.answer}</p></div>
              </details>
            ))}
          </div>
          <div className="fllm-template-disclosure">
            <strong>Scope of FLLM services:</strong> FLLM provides marketplace, market-data, valuation/appraisal,
            financing and transaction-resource services. Legal, zoning, adult-use, tax, accounting and escrow questions
            should be handled by the appropriate independent professionals and local authorities. DBPR/DABT makes
            alcoholic-beverage licensing and transfer decisions.
          </div>
        </div>
      </section>

      <section className="fllm-ui-final-cta">
        <div className="fllm-template-shell">
          <div>
            <span className="fllm-template-eyebrow">Business + License Market</span>
            <h2>Compare Florida gentlemen's-club packages without mixing business prices with standalone license values</h2>
            <p>Use FLLM to review qualifying packages, county license markets and transaction resources in one place.</p>
          </div>
          <div className="fllm-ui-final-actions">
            <Link className="fllm-template-button" href="/businesses-with-quota-licenses">All Business Packages</Link>
            <Link className="fllm-template-button fllm-template-button--outline" href="/listings">Standalone Licenses</Link>
          </div>
        </div>
      </section>
    </FllmPageShell>
  );
}
