import type { Metadata } from "next";
import Link from "next/link";

import BusinessQuotaListingCard from "@/components/BusinessQuotaListingCard";
import { FllmPageShell } from "@/components/FllmDesignSystem";
import { BUSINESS_LISTING_DISPLAY_LIMIT, businessQuotaListings } from "@/lib/business-quota-listings";

import "../../fllm-official-template.css";
import "../../fllm-design-system.css";
import "../../listings/listings-premium.css";
import "../business-inventory.css";
import "./bars.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/businesses-with-quota-licenses/bars`;

const allBarPackageListings = businessQuotaListings.filter((listing) =>
  /bar|pub|tavern|lounge|nightclub/i.test(`${listing.title} ${listing.businessType}`),
);
const barPackageListings = allBarPackageListings.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);

const faqs = [
  {
    question: "What does it mean when a Florida bar is sold with a 4COP quota license?",
    answer:
      "It means the operating business acquisition includes a transferable county quota liquor license as part of the package. The business, furniture, leasehold rights, goodwill and other assets may have separate value from the license component, and the exact transaction structure should be documented in the purchase and transfer materials.",
  },
  {
    question: "Is the liquor license automatically transferred when the bar closes?",
    answer:
      "No. A Florida quota-license transfer remains subject to the applicable DBPR Division of Alcoholic Beverages and Tobacco process, buyer qualification, supporting documentation, fees and approval. The business closing and the regulatory transfer need to be coordinated rather than treated as the same event.",
  },
  {
    question: "Can FLLM value the liquor-license component separately from the bar?",
    answer:
      "Yes. FLLM provides county market-value resources and separate quota-license appraisal services. A license-specific valuation can be useful before a sale, during purchase-price allocation and financing, and after closing when the parties, lender or professional advisers need updated support for the liquor-license component.",
  },
  {
    question: "How can FLLM assist a business broker or attorney handling a bar sale?",
    answer:
      "FLLM can provide quota-license market data, valuation and appraisal resources, transfer-process references, FDOR and ABT preparation resources, financing coordination and independent professional referrals. The broker or attorney remains responsible for the business transaction and any professional services within their scope.",
  },
];

export const metadata: Metadata = {
  title: "Bars for Sale With 4COP Quota Licenses in Florida | FLLM",
  description:
    "Florida bars for sale with included 4COP quota liquor licenses. Learn how FLLM supports brokers, attorneys, buyers and sellers with presale valuation, transfer and closing resources, and post-sale license valuation.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Bars for Sale With 4COP Quota Licenses | FLLM",
    description:
      "Browse bar and lounge business packages that include Florida 4COP quota licenses and review FLLM transaction services for the liquor-license component.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bars for Sale With 4COP Quota Licenses in Florida | FLLM",
    description:
      "Business + 4COP quota-license packages, presale valuation, transfer and closing resources, and post-sale license valuation.",
  },
};

export default function BarsWithQuotaLicensesPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Bars for Sale With 4COP Quota Licenses in Florida",
      url: canonicalUrl,
      description:
        "Florida bars and lounges for sale with included 4COP quota liquor licenses, plus transaction resources for valuing and transferring the license component.",
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
        { "@type": "ListItem", position: 3, name: "Bars With 4COP Quota Licenses", item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida bar and lounge packages with included 4COP quota licenses",
      numberOfItems: barPackageListings.length,
      itemListElement: barPackageListings.map((listing, index) => ({
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
              <strong>Bars</strong>
            </div>
            <span className="seo-market-kicker">Florida Business + 4COP Quota License Packages</span>
            <h1 >Bars for Sale With <em>4COP Quota Licenses</em> in Florida</h1>
            <p >
              A bar acquisition can combine an operating hospitality business with a valuable, transferable
              county quota liquor license. FLLM keeps these business packages separate from standalone license
              inventory while giving brokers, attorneys, buyers and sellers tools to identify, value, transfer
              and document the liquor-license component of the transaction.
            </p>
            <div className="seo-market-actions">
              <a className="seo-market-button seo-market-button-gold" href="#current-packages">View Bar + License Packages</a>
              <Link className="seo-market-button seo-market-button-dark" href="/transaction-services">
                Explore Transaction Services
              </Link>
            </div>
          </div>

          <aside className="seo-market-snapshot" aria-label="Bar and quota license package overview">
            <span>What FLLM Separates</span>
            <div className="seo-market-snapshot-grid">
              <div><strong>Business</strong><small>Operations, goodwill, equipment and other negotiated assets</small></div>
              <div><strong>4COP</strong><small>Transferable county quota license included in the package</small></div>
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
              <h2>What a bar + quota-license sale actually includes</h2>
            </div>
          </div>

          <div className="fllm-template-card-grid">
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Operating Business</span>
              <strong className="fllm-template-card-title">The bar transaction</strong>
              <p className="fllm-template-card-copy">
                The purchase price may include the operating business, goodwill, furniture, fixtures,
                equipment, inventory, leasehold rights and other negotiated assets. Those items are distinct
                from the alcoholic-beverage license even when everything closes as one coordinated deal.
              </p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Quota License Component</span>
              <strong className="fllm-template-card-title">The transferable 4COP asset</strong>
              <p className="fllm-template-card-copy">
                A 4COP quota license is a county-specific full-liquor quota license commonly used by bars,
                pubs, taverns, lounges and nightclubs. Its transfer remains subject to Florida licensing
                requirements and approval; buying the business alone does not automatically transfer the license.
              </p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Allocated Value</span>
              <strong className="fllm-template-card-title">The license can be valued separately</strong>
              <p className="fllm-template-card-copy">
                Brokers and parties can identify an allocated license value inside the total business package.
                FLLM county data and appraisal resources can support that analysis without treating the package
                as though the liquor license were necessarily offered for separate sale.
              </p>
            </article>
          </div>

          <div className="fllm-template-disclosure bar-package-disclosure">
            <strong>Important distinction:</strong> a 4COP quota license is not the same as a 4COP-SFS / SRX
            restaurant license. A quota license is a transferable county quota asset; an SFS/SRX license depends
            on the qualifying restaurant and premises requirements that apply to that license category.
          </div>
        </div>
      </section>

      <section className="bar-package-inventory business-quota-inventory" id="current-packages">
        <div className="business-quota-shell">
          <div className="business-quota-heading">
            <div>
              <span>Current FLLM Business Inventory</span>
              <h2>Bars & Lounges Offered With 4COP Quota Licenses</h2>
            </div>
            <strong>
              {barPackageListings.length}
              {allBarPackageListings.length > BUSINESS_LISTING_DISPLAY_LIMIT ? ` of ${allBarPackageListings.length}` : ""} Active Package
              {allBarPackageListings.length === 1 ? "" : "s"}
            </strong>
          </div>

          <div className="business-quota-separation-note">
            <strong>Business package ≠ standalone license listing</strong>
            <span>
              These listings require acquisition of the associated operating business unless the broker expressly
              authorizes a separate license offering.
            </span>
            <Link href="/listings">Standalone licenses ›</Link>
          </div>

          {barPackageListings.length > 0 ? (
            <div className="business-quota-grid">
              {barPackageListings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="fllm-ui-panel bar-package-empty">
              <strong>No published bar packages are active at this moment.</strong>
              <p>FLLM keeps this page live for market guidance and will display qualifying bar + 4COP packages here as they are published.</p>
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
              <h2>Support the liquor-license component before, during and after the bar sale</h2>
            </div>
            <Link className="fllm-template-button" href="/transaction-services">Transaction Services</Link>
          </div>

          <div className="fllm-ui-grid fllm-ui-grid--3">
            <article className="fllm-ui-step-card">
              <span className="fllm-ui-step-kicker">01 · Presale</span>
              <h3>Identify and value the license before marketing the bar</h3>
              <p>
                FLLM can help the broker, seller and counsel separate the liquor-license component from the rest
                of the business package before an asking price is presented.
              </p>
              <ul>
                <li>Confirm the quoted license type, county and market category</li>
                <li>Compare current county asking-price evidence and available inventory</li>
                <li>Prepare a preliminary market value or license-specific appraisal when appropriate</li>
                <li>Present the allocated license value clearly in a broker or FLLM package listing</li>
              </ul>
              <div className="fllm-ui-step-actions">
                <Link className="fllm-template-button" href="/florida-liquor-license-value">License Value</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/florida-liquor-license-appraisal">Appraisal</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/brokers/list-your-license">Broker Listings</Link>
              </div>
            </article>

            <article className="fllm-ui-step-card">
              <span className="fllm-ui-step-kicker">02 · Contract & Closing</span>
              <h3>Coordinate the bar closing with the quota-license transfer</h3>
              <p>
                The business purchase agreement, escrow and closing schedule should account for the separate
                regulatory transfer process rather than assuming the license changes hands automatically.
              </p>
              <ul>
                <li>ABT-6002 transfer preparation and application resources</li>
                <li>Quota transfer-fee calculation and transaction checklists</li>
                <li>FDOR clearance and DR-835 resource coordination</li>
                <li>Financing, appraisal, escrow and independent professional referral resources</li>
              </ul>
              <div className="fllm-ui-step-actions">
                <Link className="fllm-template-button" href="/dbpr-abt-6002">ABT-6002 Guide</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/resources/florida-department-of-revenue">FDOR Resources</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/resources/quota-transfer-fee-calculator">Transfer Fee</Link>
              </div>
            </article>

            <article className="fllm-ui-step-card">
              <span className="fllm-ui-step-kicker">03 · Post-Sale</span>
              <h3>Document the license component after the business changes hands</h3>
              <p>
                After closing, an updated license-specific valuation can help the new owner, lender and professional
                advisers understand the current market evidence supporting the quota-license component.
              </p>
              <ul>
                <li>Updated county market-value analysis after the closing date</li>
                <li>License-specific appraisal for qualifying lender or refinance needs</li>
                <li>Market support for purchase-price allocation review by the parties and their advisers</li>
                <li>Ongoing county-market monitoring for future sale, refinance or strategic planning</li>
              </ul>
              <div className="fllm-ui-step-actions">
                <Link className="fllm-template-button" href="/florida-liquor-license-appraisal">Order Appraisal</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/counties">County Markets</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/financing">Financing & Refinance</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="fllm-template-section bar-package-audiences">
        <div className="fllm-template-shell">
          <div className="fllm-template-heading">
            <div>
              <span className="fllm-template-eyebrow">Built Around the Deal Team</span>
              <h2>How FLLM can assist each party to a bar transaction</h2>
            </div>
          </div>

          <div className="fllm-ui-grid fllm-ui-grid--4">
            <article className="fllm-template-card">
              <span className="fllm-ui-card-kicker">Business Brokers</span>
              <strong className="fllm-template-card-title">Market the license component intelligently</strong>
              <p className="fllm-template-card-copy">
                Use county data, allocated-value analysis and FLLM package listings while keeping the broker as
                the client-facing transaction professional and lead recipient.
              </p>
            </article>
            <article className="fllm-template-card">
              <span className="fllm-ui-card-kicker">Attorneys</span>
              <strong className="fllm-template-card-title">Connect legal drafting to market and transfer facts</strong>
              <p className="fllm-template-card-copy">
                FLLM can supply market, appraisal, transfer-process and agency-resource information that counsel
                can incorporate into the broader legal and closing workflow.
              </p>
            </article>
            <article className="fllm-template-card">
              <span className="fllm-ui-card-kicker">Buyers</span>
              <strong className="fllm-template-card-title">Understand what portion of the package is the license</strong>
              <p className="fllm-template-card-copy">
                Compare county market evidence, review financing and transfer resources, and avoid treating the
                bar's total asking price as though it were the market value of the 4COP license alone.
              </p>
            </article>
            <article className="fllm-template-card">
              <span className="fllm-ui-card-kicker">Sellers</span>
              <strong className="fllm-template-card-title">Support pricing before the bar reaches market</strong>
              <p className="fllm-template-card-copy">
                Establish a defensible license allocation, organize transfer readiness and give prospective
                buyers clearer information about the asset included with the operating business.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--gradient bar-package-compare">
        <div className="fllm-template-shell">
          <div className="fllm-ui-heading fllm-ui-heading--center">
            <div>
              <span className="fllm-template-eyebrow">4COP Quota vs Restaurant License</span>
              <h2>Do not assume every Florida bar or restaurant package contains a quota license</h2>
            </div>
          </div>
          <div className="fllm-template-table-wrap">
            <table className="fllm-ui-table">
              <thead>
                <tr><th>Issue</th><th>4COP Quota</th><th>4COP-SFS / SRX</th></tr>
              </thead>
              <tbody>
                <tr><td>Core concept</td><td>Transferable county quota asset</td><td>Qualification-based restaurant license</td></tr>
                <tr><td>Typical use</td><td>Bars, pubs, taverns, lounges, nightclubs and other full-liquor concepts</td><td>Qualifying restaurants that satisfy current statutory and regulatory requirements</td></tr>
                <tr><td>Business sale</td><td>Can represent a separately valued asset included in the acquisition</td><td>Value and transfer considerations remain tied more closely to the qualifying operation and premises</td></tr>
                <tr><td>FLLM business-package inventory</td><td>Eligible when an operating business is sold with the included transferable quota license</td><td>Not treated as FLLM quota-license inventory merely because the business serves full liquor</td></tr>
              </tbody>
            </table>
          </div>
          <div className="fllm-ui-actions">
            <Link className="fllm-template-button" href="/license-types/4cop-quota">4COP Quota Guide</Link>
            <Link className="fllm-template-button fllm-template-button--outline" href="/license-types/4cop-sfs-restaurant">
              4COP-SFS / SRX Guide
            </Link>
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep bar-package-faq">
        <div className="fllm-template-shell">
          <div className="fllm-template-heading">
            <div>
              <span className="fllm-template-eyebrow">Common Questions</span>
              <h2>Bars, business sales and quota-license transfers</h2>
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
            financing and transaction-resource services. FLLM is not acting as the parties' law firm, tax adviser,
            escrow agent or governmental licensing authority. Legal, tax, accounting and escrow questions should
            be handled by the appropriate independent professionals. DBPR/DABT makes licensing and transfer decisions.
          </div>
        </div>
      </section>

      <section className="fllm-ui-final-cta">
        <div className="fllm-template-shell">
          <div>
            <span className="fllm-template-eyebrow">From Marketing to Transfer</span>
            <h2>Keep the bar sale and the quota-license component connected</h2>
            <p>
              Use FLLM to market qualifying business packages, analyze the license value and connect the transfer,
              financing, appraisal and closing workstreams.
            </p>
          </div>
          <div className="fllm-ui-final-actions">
            <Link className="fllm-template-button" href="/transaction-services">Explore Transaction Services</Link>
            <Link className="fllm-template-button fllm-template-button--outline" href="/businesses-with-quota-licenses">
              All Business Packages
            </Link>
          </div>
        </div>
      </section>


    </FllmPageShell>
  );
}
