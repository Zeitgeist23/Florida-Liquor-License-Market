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
const canonicalUrl = `${siteUrl}/businesses-with-quota-licenses/liquor-stores`;

const allLiquorStoreListings = businessQuotaListings.filter(
  (listing) => listing.businessCategory === "Liquor Store",
);
const liquorStoreListings = allLiquorStoreListings.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);

const faqs = [
  {
    question: "What does it mean when a Florida liquor store is sold with a 3PS quota license?",
    answer:
      "It means the operating retail business is being offered with a county quota package-store license as part of the acquisition. The business assets and the quota-license component can have separate values even when they are marketed and closed together.",
  },
  {
    question: "Is a 3PS quota license the same as a 4COP quota license?",
    answer:
      "No. A 3PS-family quota license is generally used for sealed package sales for off-premises consumption, while a 4COP-family quota license is commonly used for full-liquor consumption-on-premises concepts. Exact privileges, series and transfer requirements should be confirmed for the specific license.",
  },
  {
    question: "Can FLLM value the liquor-license component separately from the liquor store?",
    answer:
      "Yes. FLLM provides county market data and license-specific valuation and appraisal resources that can help separate the quota-license component from the total business package price.",
  },
  {
    question: "Does buying the liquor store automatically transfer the quota license?",
    answer:
      "No. The business closing and the Florida alcoholic-beverage license transfer are separate processes. The license transfer remains subject to the applicable DBPR Division of Alcoholic Beverages and Tobacco filing, qualification, documentation, fees and approval.",
  },
];

export const metadata: Metadata = {
  title: "Liquor Stores for Sale With 3PS Quota Licenses in Florida | FLLM",
  description:
    "Browse Florida liquor stores for sale with included 3PS quota package-store licenses. Compare current business packages and review FLLM valuation, transfer, financing and transaction resources.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor Stores for Sale With 3PS Quota Licenses | FLLM",
    description:
      "Florida liquor-store business packages with included 3PS quota licenses, separated from FLLM standalone license inventory.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liquor Stores for Sale With 3PS Quota Licenses in Florida | FLLM",
    description:
      "Liquor-store business packages with included Florida 3PS quota licenses and FLLM transaction resources.",
  },
};

export default function LiquorStoresWithQuotaLicensesPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Liquor Stores for Sale With 3PS Quota Licenses in Florida",
      url: canonicalUrl,
      description:
        "Florida liquor stores for sale with included 3PS quota package-store licenses and transaction resources for the liquor-license component.",
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
        { "@type": "ListItem", position: 3, name: "Liquor Stores With 3PS Quota Licenses", item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida liquor stores with included 3PS quota licenses",
      numberOfItems: liquorStoreListings.length,
      itemListElement: liquorStoreListings.map((listing, index) => ({
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
              <strong>Liquor Stores</strong>
            </div>
            <span className="seo-market-kicker">Florida Business + 3PS Quota License Packages</span>
            <h1>Liquor Stores for Sale With <em>3PS Quota Licenses</em> in Florida</h1>
            <p>
              FLLM separates liquor-store business acquisitions from standalone quota-license inventory.
              This page shows Florida liquor-store packages classified with an included 3PS quota / package-store
              license so buyers can evaluate the operating business and the liquor-license component without mixing
              the two transaction types.
            </p>
            <div className="seo-market-actions">
              <a className="seo-market-button seo-market-button-gold" href="#current-packages">View Liquor Store Packages</a>
              <Link className="seo-market-button seo-market-button-dark" href="/transaction-services">
                Explore Transaction Services
              </Link>
            </div>
          </div>

          <aside className="seo-market-snapshot" aria-label="Liquor store and quota license package overview">
            <span>What FLLM Separates</span>
            <div className="seo-market-snapshot-grid">
              <div><strong>Business</strong><small>Retail operation, inventory, goodwill and other negotiated assets</small></div>
              <div><strong>3PS</strong><small>County quota package-store license included in the acquisition</small></div>
              <div><strong>Value</strong><small>License component can be analyzed separately from total package price</small></div>
              <div><strong>Transfer</strong><small>Regulatory approval remains separate from the business closing</small></div>
            </div>
          </aside>
        </div></div>
      </section>

      <section className="fllm-template-section bar-package-overview">
        <div className="fllm-template-shell">
          <div className="fllm-template-heading">
            <div>
              <span className="fllm-template-eyebrow">Understanding the Package</span>
              <h2>What a liquor-store + quota-license sale can include</h2>
            </div>
          </div>

          <div className="fllm-template-card-grid">
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Operating Business</span>
              <strong className="fllm-template-card-title">The retail liquor-store transaction</strong>
              <p className="fllm-template-card-copy">
                The package may include the operating business, inventory, furniture, fixtures, equipment,
                leasehold rights, goodwill and other negotiated assets. Those components remain distinct from
                the quota license even when they are marketed together.
              </p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Quota License Component</span>
              <strong className="fllm-template-card-title">The 3PS package-store license</strong>
              <p className="fllm-template-card-copy">
                A 3PS-family quota license is generally associated with sealed package sales for off-premises
                consumption. The exact series and privileges should be confirmed for the specific county and license,
                and transfer remains subject to Florida regulatory approval.
              </p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Allocated Value</span>
              <strong className="fllm-template-card-title">Separate the license value from the package price</strong>
              <p className="fllm-template-card-copy">
                FLLM county market data and appraisal resources can help buyers, sellers, brokers and lenders
                analyze the quota-license component without treating the total liquor-store asking price as the
                value of the license itself.
              </p>
            </article>
          </div>

          <div className="fllm-template-disclosure bar-package-disclosure">
            <strong>Important distinction:</strong> this page is for operating liquor-store business packages with
            an included quota license. Standalone 3PS quota licenses offered separately from an operating business
            remain in FLLM's standalone license inventory.
          </div>
        </div>
      </section>

      <section className="bar-package-inventory business-quota-inventory" id="current-packages">
        <div className="business-quota-shell">
          <div className="business-quota-heading">
            <div>
              <span>Current FLLM Business Inventory</span>
              <h2>Liquor Stores Offered With 3PS Quota Licenses</h2>
            </div>
            <strong>
              {liquorStoreListings.length}
              {allLiquorStoreListings.length > BUSINESS_LISTING_DISPLAY_LIMIT ? ` of ${allLiquorStoreListings.length}` : ""} Active Package
              {allLiquorStoreListings.length === 1 ? "" : "s"}
            </strong>
          </div>

          <div className="business-quota-separation-note">
            <strong>Business package ≠ standalone license listing</strong>
            <span>
              These cards represent operating-business opportunities classified as Liquor Store in FLLM's
              Businesses With Quota Licenses inventory.
            </span>
            <Link href="/listings?type=3PS%20Quota%20%2F%20Package%20Store">Standalone 3PS licenses ›</Link>
          </div>

          {liquorStoreListings.length > 0 ? (
            <div className="business-quota-grid">
              {liquorStoreListings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="fllm-ui-panel bar-package-empty">
              <strong>No published liquor-store packages are active at this moment.</strong>
              <p>FLLM will display qualifying liquor-store + quota-license packages here as they are published.</p>
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
              <h2>Support the liquor-license component before, during and after the liquor-store sale</h2>
            </div>
            <Link className="fllm-template-button" href="/transaction-services">Transaction Services</Link>
          </div>

          <div className="fllm-ui-grid fllm-ui-grid--3">
            <article className="fllm-ui-step-card">
              <span className="fllm-ui-step-kicker">01 · Presale</span>
              <h3>Identify and value the quota-license component</h3>
              <p>Use FLLM market data and valuation resources to separate the license component from the operating-business package.</p>
              <div className="fllm-ui-step-actions">
                <Link className="fllm-template-button" href="/florida-liquor-license-value">License Value</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/florida-liquor-license-appraisal">Appraisal</Link>
              </div>
            </article>

            <article className="fllm-ui-step-card">
              <span className="fllm-ui-step-kicker">02 · Transfer & Closing</span>
              <h3>Coordinate the business closing with the license transfer</h3>
              <p>Review the ABT transfer process, supporting transaction resources, FDOR materials and quota-transfer considerations.</p>
              <div className="fllm-ui-step-actions">
                <Link className="fllm-template-button" href="/dbpr-abt-6002">ABT-6002 Guide</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/resources/florida-department-of-revenue">FDOR Resources</Link>
              </div>
            </article>

            <article className="fllm-ui-step-card">
              <span className="fllm-ui-step-kicker">03 · Financing & Post-Sale</span>
              <h3>Keep the license value visible after acquisition</h3>
              <p>Use financing, appraisal and county-market resources for lender support, refinance analysis and future planning.</p>
              <div className="fllm-ui-step-actions">
                <Link className="fllm-template-button" href="/financing">Financing</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/counties">County Markets</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--gradient bar-package-compare">
        <div className="fllm-template-shell">
          <div className="fllm-ui-heading fllm-ui-heading--center">
            <div>
              <span className="fllm-template-eyebrow">3PS vs 4COP Quota</span>
              <h2>Match the quota-license series to the intended business use</h2>
            </div>
          </div>
          <div className="fllm-template-table-wrap">
            <table className="fllm-ui-table">
              <thead><tr><th>Issue</th><th>3PS / Package Store</th><th>4COP Quota</th></tr></thead>
              <tbody>
                <tr><td>Typical use</td><td>Liquor stores and other approved package-sales operations</td><td>Bars, lounges, nightclubs and other approved full-liquor hospitality concepts</td></tr>
                <tr><td>Consumption model</td><td>Generally sealed package sales for off-premises consumption</td><td>Commonly associated with on-premises full-liquor service and approved package privileges</td></tr>
                <tr><td>Quota concept</td><td>County-limited transferable quota license</td><td>County-limited transferable quota license</td></tr>
                <tr><td>FLLM business page</td><td>Liquor-store packages remain separate from standalone 3PS inventory</td><td>Hospitality packages remain separate from standalone 4COP inventory</td></tr>
              </tbody>
            </table>
          </div>
          <div className="fllm-ui-actions">
            <Link className="fllm-template-button" href="/license-types/3ps-package-store">3PS Package Store Guide</Link>
            <Link className="fllm-template-button fllm-template-button--outline" href="/license-types/4cop-quota">4COP Quota Guide</Link>
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep bar-package-faq">
        <div className="fllm-template-shell">
          <div className="fllm-template-heading">
            <div>
              <span className="fllm-template-eyebrow">Common Questions</span>
              <h2>Liquor stores, business sales and 3PS quota licenses</h2>
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
            financing and transaction-resource services. Legal, tax, accounting and escrow questions should be
            handled by the appropriate independent professionals. DBPR/DABT makes licensing and transfer decisions.
          </div>
        </div>
      </section>

      <section className="fllm-ui-final-cta">
        <div className="fllm-template-shell">
          <div>
            <span className="fllm-template-eyebrow">Business + License Market</span>
            <h2>Compare Florida liquor stores without mixing business prices with standalone license values</h2>
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
