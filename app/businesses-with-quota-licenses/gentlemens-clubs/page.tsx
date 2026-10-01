import type { Metadata } from "next";
import Link from "next/link";

import BusinessQuotaListingCard from "@/components/BusinessQuotaListingCard";
import BusinessPackageLocalMarkets from "@/components/BusinessPackageLocalMarkets";
import { FllmPageShell } from "@/components/FllmDesignSystem";
import { BUSINESS_LISTING_DISPLAY_LIMIT, businessMarketDisplayTitle, businessQuotaListings } from "@/lib/business-quota-listings";
import { withMarketLicenseValues } from "@/lib/business-quota-market-values";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../../fllm-official-template.css";
import "../../fllm-design-system.css";
import "../../listings/listings-premium.css";
import "../business-inventory.css";
import "../bars/bars.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/businesses-with-quota-licenses/gentlemens-clubs`;

const faqs = [
  {
    question: "Where can I find gentlemen's clubs for sale in Florida?",
    answer:
      "FLLM's Florida Gentlemen's Clubs for Sale page displays active adult-entertainment business packages classified as Gentlemen's Club, including opportunities with transferable 4COP quota liquor licenses, leasehold interests, real estate, and other negotiated business assets when disclosed.",
  },
  {
    question: "Does FLLM broker the sale of gentlemen's clubs or adult-entertainment businesses?",
    answer:
      "No. Florida Liquor License Market is not a business broker and does not broker gentlemen's clubs, adult-entertainment businesses, nightclubs, restaurants, or other operating businesses. The business sale remains with the owner and/or the owner's licensed business broker. FLLM brokerage services are limited to standalone transferable 4COP Quota and 3PS liquor licenses.",
  },
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
  title: "Gentlemen's Clubs for Sale in Florida | Businesses & 4COP Licenses | FLLM",
  description:
    "Browse gentlemen's clubs for sale in Florida, adult-entertainment businesses and nightlife venues, including opportunities with 4COP quota liquor licenses, real estate and leasehold interests.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Gentlemen's Clubs for Sale | Businesses & 4COP Licenses | FLLM",
    description:
      "Browse Florida gentlemen's clubs, adult-entertainment venues and related nightlife businesses for sale, including packages with transferable 4COP quota liquor licenses.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gentlemen's Clubs for Sale in Florida | Businesses & 4COP Licenses | FLLM",
    description:
      "Florida gentlemen's clubs and adult-entertainment businesses for sale, including opportunities with 4COP quota licenses and FLLM transaction resources.",
  },
};

export default async function GentlemensClubsWithQuotaLicensesPage() {
  const standaloneListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );
  const quotaListingsWithValues = withMarketLicenseValues(
    businessQuotaListings,
    standaloneListings,
  );
  const allListings = quotaListingsWithValues.filter(
    (listing) => listing.businessCategory === "Gentlemen's Club",
  );
  const listings = allListings.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Gentlemen's Clubs for Sale in Florida | 4COP Quota License Business Packages",
      url: canonicalUrl,
      description:
        "Florida gentlemen's clubs, adult-entertainment venues and related nightlife businesses for sale, including opportunities with 4COP quota liquor licenses.",
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
        { "@type": "ListItem", position: 3, name: "Gentlemen's Clubs for Sale in Florida", item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Gentlemen's clubs for sale in Florida with included 4COP quota licenses",
      numberOfItems: listings.length,
      itemListElement: listings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: businessMarketDisplayTitle(listing),
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
            <span className="seo-market-kicker">Florida Gentlemen's Clubs & Adult-Entertainment Businesses for Sale</span>
            <h1>Gentlemen's Clubs for Sale in Florida <em>With 4COP Quota License Opportunities</em></h1>
            <p>
              Browse gentlemen's clubs for sale in Florida, adult-entertainment venues, strip-club businesses and
              related nightlife opportunities. FLLM displays active business packages separately from standalone
              liquor-license inventory, including opportunities with transferable 4COP quota liquor licenses, disclosed
              real estate or leasehold interests, and other negotiated operating-business assets.
            </p>
            <div className="seo-market-actions">
              <a className="seo-market-button seo-market-button-gold" href="#current-packages">View Florida Gentlemen's Clubs for Sale</a>
              <Link className="seo-market-button seo-market-button-dark" href="/transaction-services">
                Explore Transaction Services
              </Link>
            </div>
          </div>

          <aside className="seo-market-snapshot" aria-label="Florida gentlemen's clubs for sale and quota license package overview">
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
              <h2>Florida Gentlemen's Clubs for Sale: What Buyers Are Evaluating</h2>
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
            <strong>Important distinction:</strong> FLLM is not a business broker and does not broker gentlemen's clubs
            or other operating businesses. Business-sale negotiations remain with the owner and/or the independent
            licensed business broker representing the business. FLLM brokerage services are limited to standalone
            transferable 4COP Quota and 3PS liquor licenses. FLLM's separate
            <Link href="/license-types/gentlemens-clubs-4cop-quota"> 4COP Gentlemen's Club license guide</Link> explains
            the licensing framework in more detail.
          </div>
        </div>
      </section>

      <section className="bar-package-inventory business-quota-inventory" id="current-packages">
        <div className="business-quota-shell">
          <div className="business-quota-heading">
            <div>
              <span>Current Florida Business Opportunities</span>
              <h2>Current Gentlemen's Clubs for Sale in Florida</h2>
            </div>
            <strong>
              {listings.length}
              {allListings.length > BUSINESS_LISTING_DISPLAY_LIMIT ? ` of ${allListings.length}` : ""} Active Package
              {allListings.length === 1 ? "" : "s"}
            </strong>
          </div>

          <BusinessPackageLocalMarkets listings={allListings} label="Florida markets for gentlemen's clubs in current inventory" />

          <div className="business-quota-separation-note">
            <strong>Business package ≠ standalone license listing</strong>
            <span>
              These cards represent gentlemen's clubs and adult-entertainment businesses for sale in Florida that
              are classified as Gentlemen's Club in FLLM's Businesses With Quota Licenses inventory.
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
            <strong>Scope of FLLM services:</strong> FLLM provides marketplace advertising, market-data, valuation/appraisal,
            financing and transaction-resource services for business packages, but does not broker the operating business.
            FLLM brokerage is limited to standalone transferable 4COP Quota and 3PS liquor licenses. Legal, zoning, adult-use, tax, accounting and escrow questions
            should be handled by the appropriate independent professionals and local authorities. DBPR/DABT makes
            alcoholic-beverage licensing and transfer decisions.
          </div>
        </div>
      </section>

      <section className="fllm-ui-final-cta">
        <div className="fllm-template-shell">
          <div>
            <span className="fllm-template-eyebrow">Business + License Market</span>
            <h2>Compare Gentlemen's Clubs for Sale in Florida Without Mixing Business Prices With Standalone License Values</h2>
            <p>Use FLLM to compare Florida gentlemen's clubs, adult-entertainment businesses, county license markets and transaction resources in one place.</p>
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
