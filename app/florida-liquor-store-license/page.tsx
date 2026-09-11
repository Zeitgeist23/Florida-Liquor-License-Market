import type { Metadata } from "next";
import Link from "next/link";

import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-store-license`;

export const metadata: Metadata = {
  title: "Florida Liquor Store License: Requirements, Application, Rules, Cost & Lookup | FLLM",
  description:
    "Florida liquor store license guide covering 3PS requirements, application steps, package-store rules, license costs, lookup tools, 4COP comparisons, financing and county markets.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "Florida Liquor Store License: Requirements, Application, Rules, Cost & Lookup",
    description:
      "A practical Florida liquor store licensing hub for 3PS requirements, application steps, package-store rules, costs, lookup resources and current market links.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "What liquor license does a liquor store need in Florida?",
    answer:
      "A Florida liquor store selling beer, wine and spirits for off-premises consumption generally uses a 3PS-family quota package-store license. The exact series designation can vary with county population. A 2APS license is limited to beer and wine package sales, while a 4COP quota license carries broader full-liquor privileges that can include on-premises consumption when the approved premises and use allow it.",
  },
  {
    question: "What are the requirements for a Florida liquor store license?",
    answer:
      "Requirements depend on the license type, applicant, premises, ownership structure and local approvals. A 3PS transaction typically requires a qualifying applicant and ownership structure, an approved Florida premises, state transfer or application approval, and compliance with package-store, zoning, building, fire, signage and other applicable rules.",
  },
  {
    question: "How do I apply for a Florida liquor store license?",
    answer:
      "Applications and transfers are administered by the Florida Department of Business and Professional Regulation through the Division of Alcoholic Beverages and Tobacco. Buyers of an existing quota license generally coordinate the purchase contract, due diligence, ownership and premises information, required application forms, fingerprints or background requirements where applicable, local approvals, and the state transfer process before closing or operation.",
  },
  {
    question: "How much does a Florida liquor store license cost?",
    answer:
      "There are two different cost concepts: state licensing and transfer fees, and the private-market purchase price of a quota license. State fees vary by license series and county population. Market prices for transferable 3PS and 4COP quota licenses vary substantially by county, supply, demand, license status and seller terms.",
  },
  {
    question: "How can I look up a Florida liquor license?",
    answer:
      "Use FLLM's license fee and license-number resources to review available public-record information, then confirm current status and transfer details with the Florida Division of Alcoholic Beverages and Tobacco before relying on a license in a transaction.",
  },
];

export default function FloridaLiquorStoreLicensePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Florida Liquor Store License: Requirements, Application, Rules, Cost & Lookup",
      description:
        "Florida liquor store licensing guide focused on 3PS package-store licenses, application steps, rules, costs, lookup resources and related marketplace tools.",
      mainEntityOfPage: canonicalUrl,
      dateModified: "2026-09-10",
      author: { "@type": "Organization", name: "Florida Liquor License Market" },
      publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
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
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Resources", item: `${siteUrl}/resources` },
        { "@type": "ListItem", position: 3, name: "Florida Liquor Store License", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="seo-market-page liquor-store-hub">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <style>{`
        .liquor-store-hub .hub-header { background:#f7f5f0; border-bottom:1px solid #e7e0d2; }
        .liquor-store-hub .hub-header-inner { width:min(1180px,calc(100% - 40px)); margin:0 auto; min-height:86px; display:flex; align-items:center; justify-content:space-between; gap:24px; }
        .liquor-store-hub .hub-logo img { display:block; width:173px; height:auto; }
        .liquor-store-hub .hub-nav { display:flex; flex-wrap:wrap; align-items:center; gap:22px; }
        .liquor-store-hub .hub-nav a { color:#15283e; font-weight:800; text-decoration:none; }
        .liquor-store-hub .hub-nav a:last-child { border:1px solid #b68a2e; border-radius:999px; padding:10px 16px; color:#7a5818; }
        .liquor-store-hub .store-hero-card { min-height:300px; border:1px solid rgba(236,207,130,.35); border-radius:18px; background:linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.02)); padding:24px; display:flex; flex-direction:column; justify-content:flex-end; box-shadow:0 20px 45px rgba(0,0,0,.18); }
        .liquor-store-hub .store-hero-visual { flex:1; min-height:150px; border-radius:13px; background:linear-gradient(135deg,#af7d24 0%,#e0bb63 30%,#24374a 30%,#15283e 100%); position:relative; overflow:hidden; }
        .liquor-store-hub .store-hero-visual:before { content:""; position:absolute; inset:22px 24px 26px; background:repeating-linear-gradient(90deg,rgba(255,255,255,.9) 0 12px,transparent 12px 22px); opacity:.17; border-top:5px solid rgba(255,255,255,.45); border-bottom:5px solid rgba(255,255,255,.25); }
        .liquor-store-hub .store-hero-card strong { display:block; color:#f1d48a; margin-top:18px; font-size:20px; }
        .liquor-store-hub .store-hero-card p { margin-top:6px; font-size:14px; color:#bdc8d3; line-height:1.55; }
        .liquor-store-hub .intent-nav { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:10px; margin-top:26px; }
        .liquor-store-hub .intent-nav a { border:1px solid rgba(246,167,0,.48); border-radius:999px; padding:10px 12px; text-align:center; color:#f6c04d; font-size:12px; font-weight:900; text-decoration:none; }
        .liquor-store-hub .content-block { padding:64px 0; }
        .liquor-store-hub .content-block.alt { background:#fff; border-top:1px solid #e8e3d9; border-bottom:1px solid #e8e3d9; }
        .liquor-store-hub .content-grid { display:grid; grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr); gap:44px; align-items:start; }
        .liquor-store-hub .content-block h2 { margin:8px 0 15px; color:#132237; font-family:Georgia,'Times New Roman',serif; font-size:clamp(31px,4vw,45px); line-height:1.08; font-weight:500; }
        .liquor-store-hub .content-block h3 { color:#15283e; font-size:21px; margin:24px 0 8px; }
        .liquor-store-hub .content-block p, .liquor-store-hub .content-block li { color:#4b5563; line-height:1.75; font-size:16px; }
        .liquor-store-hub .content-block ul, .liquor-store-hub .content-block ol { padding-left:22px; }
        .liquor-store-hub .info-card { padding:24px; background:#f8f5ee; border:1px solid #dfd5bd; border-radius:14px; }
        .liquor-store-hub .info-card strong { display:block; color:#15283e; font-size:20px; margin-bottom:10px; }
        .liquor-store-hub .link-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:16px; margin-top:26px; }
        .liquor-store-hub .link-grid a { display:block; padding:20px; border:1px solid #ded5c5; border-radius:12px; background:#fff; text-decoration:none; box-shadow:0 8px 20px rgba(21,31,44,.05); }
        .liquor-store-hub .link-grid strong { display:block; color:#14263b; margin-bottom:6px; font-size:17px; }
        .liquor-store-hub .link-grid span { color:#657180; font-size:14px; line-height:1.45; }
        .liquor-store-hub .compare-table { width:100%; border-collapse:collapse; margin-top:24px; background:#fff; border:1px solid #ddd5c6; }
        .liquor-store-hub .compare-table th, .liquor-store-hub .compare-table td { padding:15px 16px; border-bottom:1px solid #ebe5da; text-align:left; vertical-align:top; }
        .liquor-store-hub .compare-table th { background:#10263c; color:#fff; }
        .liquor-store-hub .compare-table td:first-child { font-weight:900; color:#183047; }
        .liquor-store-hub .faq-list details { border-top:1px solid #ddd6c8; padding:17px 0; }
        .liquor-store-hub .faq-list summary { cursor:pointer; font-weight:900; color:#14263b; }
        .liquor-store-hub .hub-final { padding:56px 0; background:#0b2238; color:#fff; }
        .liquor-store-hub .hub-final h2 { color:#fff; }
        .liquor-store-hub .hub-final p { color:#ccd5df; }
        @media (max-width:900px){
          .liquor-store-hub .hub-header-inner,.liquor-store-hub .content-grid,.seo-market-hero-grid{grid-template-columns:1fr;}
          .liquor-store-hub .hub-header-inner{padding:16px 0;align-items:flex-start;flex-direction:column;}
          .liquor-store-hub .intent-nav{grid-template-columns:repeat(2,minmax(0,1fr));}
          .liquor-store-hub .link-grid{grid-template-columns:1fr;}
        }
      `}</style>

      <header className="hub-header">
        <div className="hub-header-inner">
          <Link className="hub-logo" href="/" aria-label="Florida Liquor License Market home">
            <img src="/assets/logo.png" alt="Florida Liquor License Market" />
          </Link>
          <nav className="hub-nav" aria-label="Primary">
            <Link href="/listings">Licenses for Sale</Link>
            <Link href="/counties">County Markets</Link>
            <Link href="/florida-quota-liquor-license-cost">License Prices</Link>
            <Link href="/sell-your-license">List Your License</Link>
          </nav>
        </div>
      </header>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <nav className="seo-market-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/resources">Resources</Link><span>›</span><b>Florida Liquor Store License</b>
          </nav>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida package-store licensing guide</span>
              <h1>Florida Liquor Store License</h1>
              <p>
                Understand Florida liquor store license requirements, the application process, package-store rules, license costs and lookup resources—then connect directly to current 3PS and 4COP inventory, financing and county market data.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/florida-3ps-liquor-license-for-sale">Browse 3PS Licenses for Sale</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/listings">Browse All Listings</Link>
              </div>
              <div className="intent-nav" aria-label="Page topics">
                <a href="#requirements">Requirements</a>
                <a href="#application">Application</a>
                <a href="#rules">Rules</a>
                <a href="#cost">Cost</a>
                <a href="#lookup">Lookup</a>
              </div>
            </div>
            <aside className="store-hero-card" aria-label="Liquor store licensing overview">
              <div className="store-hero-visual" aria-hidden="true" />
              <strong>3PS is the core full-liquor package-store license</strong>
              <p>For sealed beer, wine and spirits sold for consumption away from the licensed premises, subject to the exact series and approved location.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="content-block">
        <div className="seo-market-shell content-grid">
          <div>
            <span className="seo-market-section-kicker">Start with the right license type</span>
            <h2>What license does a Florida liquor store need?</h2>
            <p>
              A stand-alone Florida liquor store that sells beer, wine and spirits in sealed containers for off-premises consumption generally operates under a <strong>3PS-family quota package-store license</strong>. The exact 3PS-series code may vary by county population.
            </p>
            <p>
              A <strong>2APS</strong> license is for beer-and-wine package sales only. A transferable <strong>4COP quota license</strong> is a broader full-liquor license that can include on-premises consumption and package privileges, but it is not the same license type as a 3PS package-store license.
            </p>
          </div>
          <aside className="info-card">
            <strong>Compare the core license paths</strong>
            <p>Use FLLM's dedicated license pages before choosing a county or negotiating a purchase.</p>
            <p><Link href="/license-types/3ps-package-store">What is a 3PS package-store license? →</Link></p>
            <p><Link href="/license-types/4cop-quota">What is a 4COP quota license? →</Link></p>
            <p><Link href="/resources/florida-liquor-license-types">Compare Florida license types →</Link></p>
          </aside>
        </div>
      </section>

      <section id="requirements" className="content-block alt">
        <div className="seo-market-shell content-grid">
          <div>
            <span className="seo-market-section-kicker">Florida liquor store license requirements</span>
            <h2>Requirements depend on the applicant, premises and license series</h2>
            <p>
              There is no single checklist that applies identically to every transaction. A buyer should verify the exact series, county, current license status, ownership structure and proposed premises before assuming the license can be transferred or activated at a particular location.
            </p>
            <ul>
              <li>Use the correct package-store or quota license series for the beverages and sales privileges required.</li>
              <li>Confirm the applicant and ownership structure satisfy Florida licensing requirements.</li>
              <li>Identify an approved premises and confirm zoning, building, fire, signage, distance and local requirements that may apply.</li>
              <li>Confirm whether the transaction is a new application, ownership transfer, location transfer or other change requiring state approval.</li>
              <li>Complete the applicable application, disclosure, fingerprint/background and supporting-document requirements.</li>
            </ul>
          </div>
          <aside className="info-card">
            <strong>Useful FLLM resources</strong>
            <p><Link href="/resources/application-center">Alcohol License Application Center →</Link></p>
            <p><Link href="/resources/florida-division-alcoholic-beverages-tobacco">Florida DABT guide →</Link></p>
            <p><Link href="/resources/florida-department-of-revenue">Florida Department of Revenue clearance resources →</Link></p>
          </aside>
        </div>
      </section>

      <section id="application" className="content-block">
        <div className="seo-market-shell content-grid">
          <div>
            <span className="seo-market-section-kicker">Florida liquor store license application</span>
            <h2>From selecting the license to state transfer approval</h2>
            <ol>
              <li><strong>Choose the license type and county.</strong> A quota license is tied to its county market.</li>
              <li><strong>Find an available license or determine whether a non-quota application fits.</strong> FLLM organizes current 3PS and 4COP opportunities by county.</li>
              <li><strong>Perform due diligence.</strong> Verify the license number, seller, status, ownership, tax issues, premises and proposed transaction structure.</li>
              <li><strong>Prepare the state application or transfer package.</strong> The required forms and supporting material depend on the transaction.</li>
              <li><strong>Coordinate local and state approvals before operation.</strong> The purchase of a license does not by itself approve every proposed premises or use.</li>
            </ol>
          </div>
          <aside className="info-card">
            <strong>Buying an existing quota license?</strong>
            <p>Review the FLLM buyer process alongside the application requirements.</p>
            <p><Link href="/how-to-buy-florida-liquor-license">How to buy a Florida liquor license →</Link></p>
            <p><Link href="/dbpr-abt-6002">ABT-6002 transfer guide →</Link></p>
          </aside>
        </div>
      </section>

      <section id="rules" className="content-block alt">
        <div className="seo-market-shell content-grid">
          <div>
            <span className="seo-market-section-kicker">Florida liquor store license rules</span>
            <h2>Package-store operation has rules beyond simply owning the license</h2>
            <p>
              Florida alcoholic-beverage law distinguishes package-store privileges from consumption-on-premises privileges. Package-store operators should review the rules applicable to the premises, merchandise, access, ownership, location and approved alcoholic-beverage activity before opening or relocating.
            </p>
            <p>
              FLLM's legal-resource pages organize the major Florida statutes and regulatory topics so buyers can understand the issues before relying on a license or proposed location.
            </p>
          </div>
          <aside className="info-card">
            <strong>Read the rules inside FLLM</strong>
            <p><Link href="/resources/florida-liquor-license-laws">Florida liquor license laws & statutes →</Link></p>
            <p><Link href="/resources/florida-liquor-license-system">How Florida's quota system works →</Link></p>
            <p><Link href="/resources/liquor-license-attorneys">Find a Florida liquor-license attorney →</Link></p>
          </aside>
        </div>
      </section>

      <section id="cost" className="content-block">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Florida liquor store license cost</span>
          <h2>Separate the state fee from the market price</h2>
          <p>
            A common source of confusion is treating the annual state license fee and the private-market value of a transferable quota license as the same thing. They are different. State fees are determined by the license series and applicable fee schedule, while quota-license asking prices are set in the private market and can vary dramatically from county to county.
          </p>
          <table className="compare-table">
            <thead><tr><th>Cost</th><th>What it means</th><th>Where to compare it</th></tr></thead>
            <tbody>
              <tr><td>State license fee</td><td>Regulatory fee associated with the license series and county population.</td><td><Link href="/resources/license-fees">FLLM license fee & lookup tools</Link></td></tr>
              <tr><td>Quota-license purchase price</td><td>Private-market asking or negotiated price for the transferable quota license.</td><td><Link href="/florida-quota-liquor-license-cost">Florida liquor license cost by county</Link></td></tr>
              <tr><td>Transfer / closing costs</td><td>May include transfer fees, legal work, escrow, due diligence, appraisal and financing costs.</td><td><Link href="/transaction-services">FLLM transaction services</Link></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="lookup" className="content-block alt">
        <div className="seo-market-shell content-grid">
          <div>
            <span className="seo-market-section-kicker">Florida liquor store license lookup</span>
            <h2>Verify the license before relying on the transaction</h2>
            <p>
              Before purchasing or financing a liquor-store license, verify the exact license number, license type, owner or licensed entity, county, current status and any information relevant to the proposed transfer. A listing description should never substitute for transaction-level verification.
            </p>
            <p>
              FLLM's license-fee resource includes license-number tools and fee information, while the application and DABT resource pages explain the state licensing process and records buyers should confirm.
            </p>
          </div>
          <aside className="info-card">
            <strong>Lookup and verification</strong>
            <p><Link href="/resources/license-fees">Florida license fee & license-number lookup →</Link></p>
            <p><Link href="/resources/florida-division-alcoholic-beverages-tobacco">DABT licensing resources →</Link></p>
            <p><Link href="/resources/application-center">Application Center →</Link></p>
          </aside>
        </div>
      </section>

      <section className="content-block">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Marketplace connections</span>
          <h2>Move from licensing research to the Florida market</h2>
          <div className="link-grid">
            <Link href="/florida-3ps-liquor-license-for-sale"><strong>Florida 3PS Licenses for Sale</strong><span>Compare current package-store quota licenses by county and asking price.</span></Link>
            <Link href="/florida-4cop-liquor-license-for-sale"><strong>Florida 4COP Licenses for Sale</strong><span>Review transferable full-liquor 4COP inventory across Florida.</span></Link>
            <Link href="/listings"><strong>All FLLM Listings</strong><span>Browse current 3PS and 4COP marketplace inventory in one place.</span></Link>
            <Link href="/counties"><strong>Florida County Markets</strong><span>Compare availability and asking-price context across all 67 counties.</span></Link>
            <Link href="/finance-a-license"><strong>Finance a Liquor License</strong><span>Review purchase and refinance options for qualifying transactions.</span></Link>
            <Link href="/florida-quota-liquor-license-cost"><strong>Florida Liquor License Prices</strong><span>Compare disclosed quota-license asking prices by county.</span></Link>
          </div>
        </div>
      </section>

      <section className="content-block alt">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Quick comparison</span>
          <h2>3PS vs 4COP vs 2APS</h2>
          <table className="compare-table">
            <thead><tr><th>License</th><th>Alcohol</th><th>Typical sales privilege</th><th>Typical use</th></tr></thead>
            <tbody>
              <tr><td>3PS family</td><td>Beer, wine & spirits</td><td>Sealed package sales for off-premises consumption</td><td>Liquor / package store</td></tr>
              <tr><td>4COP quota</td><td>Beer, wine & spirits</td><td>Broader on-premises and package privileges, subject to approved use</td><td>Bar, lounge, nightclub, full-liquor hospitality concept</td></tr>
              <tr><td>2APS</td><td>Beer & wine</td><td>Sealed package sales for off-premises consumption</td><td>Grocery, convenience, specialty retail</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-block">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Frequently asked questions</span>
          <h2>Florida liquor store license FAQ</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="hub-final">
        <div className="seo-market-shell content-grid">
          <div>
            <span className="seo-market-section-kicker">Florida Liquor License Market</span>
            <h2>Compare the license, county and financing before you buy</h2>
            <p>Use FLLM's statewide market pages to move from licensing research into current inventory and county-level pricing.</p>
          </div>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/listings">Browse Current Listings</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/counties">Compare County Markets</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
