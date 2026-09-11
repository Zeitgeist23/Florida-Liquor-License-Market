import type { Metadata } from "next";
import Link from "next/link";

import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/how-to-open-a-liquor-store-in-florida`;

export const metadata: Metadata = {
  title: "How to Open a Liquor Store in Florida | 3PS License, Cost & Steps | FLLM",
  description:
    "Learn how to open a liquor store in Florida, including 3PS licensing, location diligence, package-store rules, license costs, financing, appraisal, transfer and opening steps.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "How to Open a Liquor Store in Florida | FLLM",
    description:
      "A practical start-to-finish guide to Florida liquor-store licensing, location, financing, valuation and transfer planning.",
    siteName: "Florida Liquor License Market",
  },
};

const steps = [
  ["Choose the right license", "A full-liquor package store generally uses a 3PS-family quota license. Beer-and-wine-only retail may use a different non-quota license such as 2APS."],
  ["Choose the county before the license", "Florida quota licenses are county-specific. Compare county inventory, asking prices, demand and available locations before negotiating a purchase."],
  ["Confirm the proposed premises", "Review zoning, building, fire, signage, access, distance and package-store requirements that may apply to the location."],
  ["Find and verify the license", "Compare active inventory, verify the exact license number, seller, status and county, and determine whether the transaction is an ownership transfer, location transfer or another application path."],
  ["Value the license and negotiate", "Use current county-market evidence, disclosed asking prices and, where appropriate, a professional appraisal before setting purchase terms."],
  ["Arrange financing", "Consider bank, private-lender, seller-financing or other transaction structures based on the buyer, license value, collateral and lender requirements."],
  ["Prepare the application and transfer", "Coordinate the required ABT application or transfer package, supporting ownership information, background requirements, tax issues and local approvals."],
  ["Close only after due diligence", "Use appropriate escrow, legal, tax and transfer support so the purchase documents, payment and licensing process remain coordinated."],
];

export default function HowToOpenALiquorStoreInFloridaPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Open a Liquor Store in Florida",
      description:
        "A practical guide to choosing a Florida liquor-store license, county, location, financing, valuation and transfer process.",
      totalTime: "P60D",
      step: steps.map(([name, text], index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name,
        text,
      })),
      mainEntityOfPage: canonicalUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Resources", item: `${siteUrl}/resources` },
        { "@type": "ListItem", position: 3, name: "How to Open a Liquor Store in Florida", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="seo-market-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />

      <header className="seo-market-header seo-market-shell">
        <Link className="seo-market-brand" href="/"><img src="/assets/logo.png" alt="Florida Liquor License Market" /></Link>
        <nav aria-label="Guide navigation">
          <Link href="/resources">Resources</Link>
          <Link href="/listings">Licenses for Sale</Link>
          <Link href="/counties">County Markets</Link>
          <Link className="seo-market-nav-cta" href="/sell-your-license">List Your License</Link>
        </nav>
      </header>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <nav className="seo-market-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/resources">Resources</Link><span>›</span><b>How to Open a Liquor Store in Florida</b>
          </nav>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida liquor store startup guide</span>
              <h1>How to Open a Liquor Store in Florida</h1>
              <p>
                Opening a Florida liquor store is not just a storefront decision. The license type, county, location, market price, financing and state transfer process all have to fit together. This guide connects each step to the FLLM tools built for it.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/florida-3ps-liquor-license-for-sale">Browse 3PS Licenses</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/florida-liquor-store-license">Liquor Store License Guide</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot">
              <span>Start with four decisions</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>1</strong><small>License type</small></div>
                <div><strong>2</strong><small>County market</small></div>
                <div><strong>3</strong><small>Premises</small></div>
                <div><strong>4</strong><small>Financing & transfer</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-guide">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Step-by-step</span>
          <h2>Eight steps from idea to opening</h2>
          <div style={{ display: "grid", gap: 18, marginTop: 28 }}>
            {steps.map(([title, copy], index) => (
              <article key={title} style={{ background: "white", border: "1px solid #ded7ca", borderRadius: 14, padding: 24, boxShadow: "0 10px 25px rgba(21,31,44,.05)" }}>
                <span style={{ color: "#b48524", fontWeight: 900, letterSpacing: ".08em", textTransform: "uppercase", fontSize: 12 }}>Step {index + 1}</span>
                <h3 style={{ margin: "8px 0 8px", color: "#14263b", fontSize: 23 }}>{title}</h3>
                <p style={{ margin: 0 }}>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-market-inventory">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">FLLM market tools</span>
              <h2>Use the marketplace before you sign a lease or purchase contract</h2>
            </div>
          </div>
          <div className="seo-market-card-grid">
            <Link href="/florida-3ps-liquor-license-for-sale" className="seo-market-callout"><strong>3PS Licenses for Sale</strong><p>Compare current Florida package-store quota-license inventory.</p></Link>
            <Link href="/counties" className="seo-market-callout"><strong>County Markets</strong><p>Compare inventory and asking-price context across Florida counties.</p></Link>
            <Link href="/florida-quota-liquor-license-cost" className="seo-market-callout"><strong>License Cost by County</strong><p>Review disclosed asking-price ranges and county differences.</p></Link>
            <Link href="/florida-liquor-license-value" className="seo-market-callout"><strong>Value Estimator</strong><p>Establish an initial market range before negotiating.</p></Link>
            <Link href="/florida-liquor-license-appraisal" className="seo-market-callout"><strong>Liquor License Appraisal</strong><p>Order valuation support for financing or transaction use.</p></Link>
            <Link href="/finance-a-license" className="seo-market-callout"><strong>Finance a License</strong><p>Review financing options for qualifying purchases and refinances.</p></Link>
          </div>
        </div>
      </section>

      <section className="seo-market-guide">
        <div className="seo-market-shell seo-market-intro-grid">
          <div>
            <span className="seo-market-section-kicker">Licensing & compliance</span>
            <h2>Do not treat the license purchase as the whole opening process</h2>
            <p>
              The license has to match the applicant, county and approved premises. A buyer should coordinate transaction due diligence with the state application, local approvals, tax-clearance issues and any professional advice required for the specific deal.
            </p>
          </div>
          <aside className="seo-market-callout">
            <strong>Application and legal resources</strong>
            <ul>
              <li><Link href="/resources/application-center">Alcohol License Application Center</Link></li>
              <li><Link href="/dbpr-abt-6002">ABT-6002 Transfer Guide</Link></li>
              <li><Link href="/resources/florida-liquor-license-laws">Florida Liquor License Laws</Link></li>
              <li><Link href="/resources/florida-department-of-revenue">FDOR Resources</Link></li>
              <li><Link href="/resources/liquor-license-attorneys">Liquor License Attorneys</Link></li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="seo-market-faq" style={{ background: "#fff", borderTop: "1px solid #e8e3d9" }}>
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Next step</span>
          <h2>Start with the county and the license</h2>
          <p>
            If you plan to sell spirits for off-premises consumption, begin with the <Link href="/florida-liquor-store-license">Florida Liquor Store License Guide</Link> and current <Link href="/florida-3ps-liquor-license-for-sale">3PS inventory</Link>. Then compare <Link href="/counties">county markets</Link>, <Link href="/finance-a-license">financing</Link> and <Link href="/florida-liquor-license-appraisal">appraisal options</Link> before committing capital.
          </p>
        </div>
      </section>
    </main>
  );
}
