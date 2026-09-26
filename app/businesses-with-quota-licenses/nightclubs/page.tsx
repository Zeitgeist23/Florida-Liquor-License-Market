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
const canonicalUrl = `${siteUrl}/businesses-with-quota-licenses/nightclubs`;

const allNightclubListings = businessQuotaListings.filter(
  (listing) => listing.businessCategory === "Nightclub",
);
const nightclubListings = allNightclubListings.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);

const faqs = [
  {
    question: "What does it mean when a Florida nightclub is sold with a 4COP quota license?",
    answer:
      "It means the operating nightclub business is being offered with a transferable county quota full-liquor license as part of the acquisition. The operating business and the liquor-license component can have separate values even when they are marketed together.",
  },
  {
    question: "Does a 4COP quota license automatically authorize nightclub use at a property?",
    answer:
      "No. The liquor license and the premises approvals are separate. Zoning, occupancy, entertainment, late-hours and other local approvals may apply in addition to the alcoholic-beverage license and transfer requirements.",
  },
  {
    question: "Can FLLM value the 4COP license separately from the nightclub business?",
    answer:
      "Yes. FLLM provides county market data and license-specific valuation and appraisal resources that can help identify the quota-license component separately from the total business package price.",
  },
  {
    question: "Are nightclub listings the same as gentlemen's-club listings?",
    answer:
      "No. FLLM uses separate business categories. This page displays listings classified as Nightclub. Adult-entertainment and gentlemen's-club opportunities are categorized separately because additional land-use and operating approvals may apply.",
  },
];

export const metadata: Metadata = {
  title: "Nightclubs for Sale With 4COP Quota Licenses in Florida | FLLM",
  description:
    "Browse Florida nightclubs for sale with included 4COP quota liquor licenses. Compare current nightclub packages and review FLLM valuation, transfer, financing and transaction resources.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Nightclubs for Sale With 4COP Quota Licenses | FLLM",
    description:
      "Florida nightclub business packages with included transferable 4COP quota licenses, separated from standalone license inventory.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nightclubs for Sale With 4COP Quota Licenses in Florida | FLLM",
    description:
      "Nightclub business packages with included Florida 4COP quota licenses and FLLM transaction resources.",
  },
};

export default function NightclubsWithQuotaLicensesPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Nightclubs for Sale With 4COP Quota Licenses in Florida",
      url: canonicalUrl,
      description:
        "Florida nightclubs for sale with included 4COP quota liquor licenses and transaction resources for the liquor-license component.",
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
        { "@type": "ListItem", position: 3, name: "Nightclubs With 4COP Quota Licenses", item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida nightclubs with included 4COP quota licenses",
      numberOfItems: nightclubListings.length,
      itemListElement: nightclubListings.map((listing, index) => ({
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
              <strong>Nightclubs</strong>
            </div>
            <span className="seo-market-kicker">Florida Business + 4COP Quota License Packages</span>
            <h1>Nightclubs for Sale With <em>4COP Quota Licenses</em> in Florida</h1>
            <p>
              FLLM separates nightclub business acquisitions from standalone quota-license inventory.
              This page displays Florida business packages classified as Nightclub with an included 4COP quota
              license so buyers can evaluate the operating business and the transferable liquor-license component
              without mixing the two markets.
            </p>
            <div className="seo-market-actions">
              <a className="seo-market-button seo-market-button-gold" href="#current-packages">View Nightclub Packages</a>
              <Link className="seo-market-button seo-market-button-dark" href="/transaction-services">
                Explore Transaction Services
              </Link>
            </div>
          </div>

          <aside className="seo-market-snapshot" aria-label="Nightclub and quota license package overview">
            <span>What FLLM Separates</span>
            <div className="seo-market-snapshot-grid">
              <div><strong>Business</strong><small>Operations, goodwill, equipment and other negotiated assets</small></div>
              <div><strong>4COP</strong><small>Transferable county quota license included in the package</small></div>
              <div><strong>Value</strong><small>License component can be analyzed separately from total package price</small></div>
              <div><strong>Premises</strong><small>Zoning and operating approvals remain separate from the license</small></div>
            </div>
          </aside>
        </div></div>
      </section>

      <section className="fllm-template-section bar-package-overview">
        <div className="fllm-template-shell">
          <div className="fllm-template-heading">
            <div>
              <span className="fllm-template-eyebrow">Understanding the Package</span>
              <h2>What a nightclub + quota-license sale can include</h2>
            </div>
          </div>

          <div className="fllm-template-card-grid">
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Operating Business</span>
              <strong className="fllm-template-card-title">The nightclub transaction</strong>
              <p className="fllm-template-card-copy">
                The package may include the operating business, furniture, fixtures, sound and lighting equipment,
                leasehold rights, goodwill and other negotiated assets. Those components remain distinct from the
                quota license even when they are marketed together.
              </p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Quota License Component</span>
              <strong className="fllm-template-card-title">The transferable 4COP asset</strong>
              <p className="fllm-template-card-copy">
                A 4COP quota license is a county-limited transferable full-liquor quota asset commonly associated
                with bars, lounges and nightclubs. Transfer remains subject to Florida licensing requirements and approval.
              </p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold">
              <span className="fllm-ui-card-kicker">Premises & Approvals</span>
              <strong className="fllm-template-card-title">The license does not replace nightclub approvals</strong>
              <p className="fllm-template-card-copy">
                Local zoning, occupancy, entertainment, hours and other premises-specific approvals can remain
                separate from the alcoholic-beverage license. Buyers should evaluate both sides of the transaction.
              </p>
            </article>
          </div>

          <div className="fllm-template-disclosure bar-package-disclosure">
            <strong>Important distinction:</strong> this page displays listings classified as Nightclub in FLLM's
            business inventory. Gentlemen's clubs and adult-entertainment businesses remain separately categorized.
          </div>
        </div>
      </section>

      <section className="bar-package-inventory business-quota-inventory" id="current-packages">
        <div className="business-quota-shell">
          <div className="business-quota-heading">
            <div>
              <span>Current FLLM Business Inventory</span>
              <h2>Nightclubs Offered With 4COP Quota Licenses</h2>
            </div>
            <strong>
              {nightclubListings.length}
              {allNightclubListings.length > BUSINESS_LISTING_DISPLAY_LIMIT ? ` of ${allNightclubListings.length}` : ""} Active Package
              {allNightclubListings.length === 1 ? "" : "s"}
            </strong>
          </div>

          <div className="business-quota-separation-note">
            <strong>Business package ≠ standalone license listing</strong>
            <span>
              These cards represent operating-business opportunities classified as Nightclub in FLLM's
              Businesses With Quota Licenses inventory.
            </span>
            <Link href="/listings?type=4COP%20Quota">Standalone 4COP licenses ›</Link>
          </div>

          {nightclubListings.length > 0 ? (
            <div className="business-quota-grid">
              {nightclubListings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="fllm-ui-panel bar-package-empty">
              <strong>No published nightclub packages are active at this moment.</strong>
              <p>FLLM will display qualifying nightclub + 4COP quota-license packages here as they are published.</p>
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
              <h2>Support the liquor-license component before, during and after the nightclub sale</h2>
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
              <h3>Coordinate the business closing with the quota-license transfer</h3>
              <p>Review the ABT transfer process, FDOR resources, quota transfer fees and transaction checklists.</p>
              <div className="fllm-ui-step-actions">
                <Link className="fllm-template-button" href="/dbpr-abt-6002">ABT-6002 Guide</Link>
                <Link className="fllm-template-button fllm-template-button--outline" href="/resources/quota-transfer-fee-calculator">Transfer Fee</Link>
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
              <span className="fllm-template-eyebrow">License vs Premises</span>
              <h2>A nightclub acquisition requires more than possession of a liquor license</h2>
            </div>
          </div>
          <div className="fllm-template-table-wrap">
            <table className="fllm-ui-table">
              <thead><tr><th>Issue</th><th>4COP Quota License</th><th>Nightclub Premises / Operation</th></tr></thead>
              <tbody>
                <tr><td>Core role</td><td>Alcoholic-beverage authority within approved privileges</td><td>Business and premises approvals for the nightclub operation</td></tr>
                <tr><td>Transfer</td><td>Subject to DBPR/DABT transfer requirements and approval</td><td>Lease, zoning, occupancy and local operating rights require separate review</td></tr>
                <tr><td>Value</td><td>Can be analyzed as a separate transferable quota asset</td><td>Business value may include goodwill, equipment, location and operating history</td></tr>
                <tr><td>FLLM classification</td><td>Included quota-license component</td><td>Business package classified as Nightclub</td></tr>
              </tbody>
            </table>
          </div>
          <div className="fllm-ui-actions">
            <Link className="fllm-template-button" href="/license-types/4cop-quota">4COP Quota Guide</Link>
            <Link className="fllm-template-button fllm-template-button--outline" href="/businesses-with-quota-licenses">All Business Packages</Link>
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep bar-package-faq">
        <div className="fllm-template-shell">
          <div className="fllm-template-heading">
            <div>
              <span className="fllm-template-eyebrow">Common Questions</span>
              <h2>Nightclubs, business sales and 4COP quota licenses</h2>
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
            financing and transaction-resource services. Legal, zoning, tax, accounting and escrow questions should
            be handled by the appropriate independent professionals and local authorities. DBPR/DABT makes licensing
            and transfer decisions.
          </div>
        </div>
      </section>

      <section className="fllm-ui-final-cta">
        <div className="fllm-template-shell">
          <div>
            <span className="fllm-template-eyebrow">Business + License Market</span>
            <h2>Compare Florida nightclub packages without mixing business prices with standalone license values</h2>
            <p>Use FLLM to review qualifying nightclub packages, county license markets and transaction resources in one place.</p>
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
