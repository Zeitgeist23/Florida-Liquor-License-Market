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
const canonicalUrl = `${siteUrl}/businesses-with-quota-licenses/marinas`;

const allListings = businessQuotaListings.filter(
  (listing) => listing.businessCategory === "Marina",
);
const listings = allListings.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);
const hasInventory = listings.length > 0;

const faqs = [
  {
    question: "Can a Florida marina business include a 4COP quota liquor license?",
    answer:
      "Yes, a marina or waterfront hospitality business may be offered with a transferable county quota liquor license when the licensed operation and premises are approved for the applicable privileges. The business acquisition and the liquor-license transfer remain separate parts of the transaction.",
  },
  {
    question: "Does owning a 4COP quota license automatically authorize alcohol service at a marina?",
    answer:
      "No. The license does not replace zoning, premises approval, local land-use requirements or other approvals that may apply to the waterfront operation. The specific license, premises and business plan should be reviewed together.",
  },
  {
    question: "Can FLLM value a marina's liquor-license component separately from the business?",
    answer:
      "Yes. FLLM provides county market data and license-specific valuation and appraisal resources that can help identify the quota-license component separately from the total marina or waterfront-business package price.",
  },
  {
    question: "Why might the marina inventory be empty?",
    answer:
      "FLLM only displays businesses actually classified as Marina in the current business-package inventory. If no qualifying marina packages are active, the category remains available for market guidance and future inventory without mixing unrelated hospitality listings into the page.",
  },
];

export const metadata: Metadata = {
  title: "Marinas for Sale With Quota Liquor Licenses in Florida | FLLM",
  description:
    "Florida marina and waterfront business packages with included quota liquor licenses. Review FLLM licensing, valuation and transaction resources for marina acquisitions.",
  alternates: { canonical: canonicalUrl },
  robots: hasInventory ? { index: true, follow: true } : { index: false, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Marinas for Sale With Quota Liquor Licenses | FLLM",
    description:
      "Florida marina and waterfront business packages with included quota liquor licenses and FLLM transaction resources.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marinas for Sale With Quota Liquor Licenses in Florida | FLLM",
    description:
      "Marina business packages with included Florida quota liquor licenses and FLLM transaction resources.",
  },
};

export default function MarinasWithQuotaLicensesPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Marinas for Sale With Quota Liquor Licenses in Florida",
      url: canonicalUrl,
      description:
        "Florida marina and waterfront business packages with included quota liquor licenses.",
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
        { "@type": "ListItem", position: 3, name: "Marinas With Quota Liquor Licenses", item: canonicalUrl },
      ],
    },
    ...(hasInventory
      ? [{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Florida marinas with included quota liquor licenses",
          numberOfItems: listings.length,
          itemListElement: listings.map((listing, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: listing.title,
            url: `${siteUrl}${listing.href}`,
          })),
        }]
      : []),
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
              <strong>Marinas</strong>
            </div>
            <span className="seo-market-kicker">Florida Marina + Quota License Packages</span>
            <h1>Marinas for Sale With <em>Quota Liquor Licenses</em> in Florida</h1>
            <p>
              FLLM separates marina and waterfront-business acquisitions from standalone liquor-license inventory.
              This category is reserved for businesses actually classified as Marina in FLLM's business-package data
              so future inventory can be indexed cleanly without mixing unrelated hospitality listings into the page.
            </p>
            <div className="seo-market-actions">
              <a className="seo-market-button seo-market-button-gold" href="#current-packages">View Marina Packages</a>
              <Link className="seo-market-button seo-market-button-dark" href="/transaction-services">
                Explore Transaction Services
              </Link>
            </div>
          </div>

          <aside className="seo-market-snapshot" aria-label="Marina and quota license package overview">
            <span>What FLLM Separates</span>
            <div className="seo-market-snapshot-grid">
              <div><strong>Business</strong><small>Marina, waterfront and operating-business assets</small></div>
              <div><strong>License</strong><small>Quota liquor-license component included in the package</small></div>
              <div><strong>Value</strong><small>License component can be analyzed separately from total package price</small></div>
              <div><strong>Premises</strong><small>Waterfront, zoning and premises approvals remain separate</small></div>
            </div>
          </aside>
        </div></div>
      </section>

      <section className="fllm-template-section bar-package-overview">
        <div className="fllm-template-shell">
          <div className="fllm-template-heading">
            <div>
              <span className="fllm-template-eyebrow">Understanding the Package</span>
              <h2>How FLLM treats marina + liquor-license transactions</h2>
            </div>
          </div>

          <div className="fllm-template-card-grid">
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Operating Business</span>
              <strong className="fllm-template-card-title">The marina or waterfront operation</strong>
              <p className="fllm-template-card-copy">
                The package may include the operating marina, hospitality operation, equipment, leasehold or real-estate
                interests, goodwill and other negotiated assets depending on the transaction.
              </p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Quota License Component</span>
              <strong className="fllm-template-card-title">The alcoholic-beverage license remains a separate asset question</strong>
              <p className="fllm-template-card-copy">
                A transferable quota license can have its own county-market value inside a larger marina acquisition.
                Its transfer remains subject to Florida licensing requirements and approval.
              </p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Premises & Use</span>
              <strong className="fllm-template-card-title">Waterfront use and alcohol privileges must line up</strong>
              <p className="fllm-template-card-copy">
                The liquor license does not replace local zoning, premises approval, waterfront land-use or other
                requirements that may apply to the specific marina business.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bar-package-inventory business-quota-inventory" id="current-packages">
        <div className="business-quota-shell">
          <div className="business-quota-heading">
            <div>
              <span>Current FLLM Business Inventory</span>
              <h2>Marinas Offered With Quota Liquor Licenses</h2>
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
              This category only displays operating-business opportunities classified as Marina in FLLM's
              Businesses With Quota Licenses inventory.
            </span>
            <Link href="/listings">Standalone licenses ›</Link>
          </div>

          {listings.length > 0 ? (
            <div className="business-quota-grid">
              {listings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="fllm-ui-panel bar-package-empty">
              <strong>No published marina packages are active at this moment.</strong>
              <p>
                FLLM is keeping the permanent marina category ready for qualifying inventory. Until a Marina-classified
                package is published, this page remains available to users but is not submitted for Google indexing.
              </p>
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
              <h2>Support the liquor-license component of a marina acquisition</h2>
            </div>
            <Link className="fllm-template-button" href="/transaction-services">Transaction Services</Link>
          </div>

          <div className="fllm-ui-grid fllm-ui-grid--3">
            <article className="fllm-ui-step-card">
              <span className="fllm-ui-step-kicker">01 · Presale</span>
              <h3>Identify the license and its county-market value</h3>
              <p>Use FLLM valuation and county-market resources to separate the liquor-license component from the operating-business package.</p>
              <div className="fllm-ui-step-actions">
                <Link className="fllm-template-button" href="/florida-liquor-license-value">License Value</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/florida-liquor-license-appraisal">Appraisal</Link>
              </div>
            </article>

            <article className="fllm-ui-step-card">
              <span className="fllm-ui-step-kicker">02 · Transfer & Closing</span>
              <h3>Coordinate the business transaction with the liquor-license transfer</h3>
              <p>Review ABT, FDOR and transfer-fee resources while keeping the regulatory transfer separate from the business closing.</p>
              <div className="fllm-ui-step-actions">
                <Link className="fllm-template-button" href="/dbpr-abt-6002">ABT-6002 Guide</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/resources/florida-department-of-revenue">FDOR Resources</Link>
              </div>
            </article>

            <article className="fllm-ui-step-card">
              <span className="fllm-ui-step-kicker">03 · Market Readiness</span>
              <h3>Publish qualifying marina inventory without mixing categories</h3>
              <p>When Marina-classified inventory is added, the page will automatically display it using the same official FLLM business-card format.</p>
              <div className="fllm-ui-step-actions">
                <Link className="fllm-template-button" href="/brokers/list-your-license">List a Client Package</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/businesses-with-quota-licenses">All Business Packages</Link>
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
              <h2>Marinas, business sales and quota liquor licenses</h2>
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
            financing and transaction-resource services. Legal, zoning, waterfront land-use, tax, accounting and
            escrow questions should be handled by the appropriate independent professionals and local authorities.
            DBPR/DABT makes alcoholic-beverage licensing and transfer decisions.
          </div>
        </div>
      </section>

      <section className="fllm-ui-final-cta">
        <div className="fllm-template-shell">
          <div>
            <span className="fllm-template-eyebrow">Business + License Market</span>
            <h2>Keep marina business value and liquor-license value separate</h2>
            <p>Use FLLM to review qualifying business packages, county license markets and transaction resources in one place.</p>
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
