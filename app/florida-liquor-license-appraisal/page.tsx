import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-appraisal`;

export const metadata: Metadata = {
  title: "Florida Liquor License Appraisal | Valuation Guide & Market Data",
  description:
    "Florida liquor license appraisal and valuation guide for 4COP and 3PS quota licenses. Learn what affects value, compare county market evidence, and check a current market range.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "Florida Liquor License Appraisal | Valuation Guide & Market Data",
    description:
      "Understand Florida liquor license appraisal factors, county-specific value evidence, comparable listings and the difference between a market estimate and a formal appraisal.",
    siteName: "Florida Liquor License Market",
  },
};

const factors = [
  {
    title: "County",
    text: "Florida quota licenses are county-specific. Supply, population, active inventory and buyer demand can produce very different values from one county to another.",
  },
  {
    title: "License Type",
    text: "4COP quota and 3PS quota licenses serve different business uses and buyer pools, so valuation should begin with the correct license category.",
  },
  {
    title: "Comparable Listings",
    text: "Current asking prices can help establish a market range, but an advertised asking price should not automatically be treated as a verified closing price.",
  },
  {
    title: "License Status",
    text: "Active, inactive, escrowed or pending-transfer status can affect due diligence, transaction timing and how a buyer evaluates the license.",
  },
  {
    title: "Ownership and Liens",
    text: "Ownership, security interests, liens and other title-related issues may affect a transaction and can matter to buyers, lenders and attorneys.",
  },
  {
    title: "Transaction Terms",
    text: "Cash terms, seller financing, contingencies, deposits and closing timing can affect the economics of a particular liquor-license transaction.",
  },
];

const faqs = [
  {
    question: "How do you appraise a Florida liquor license?",
    answer:
      "A Florida liquor license appraisal generally starts with the exact county and license series, then considers current supply, comparable licenses offered for sale, available transaction evidence, license status, buyer demand and transaction terms. Because quota-license markets are county-specific, a statewide average may be misleading for a particular license.",
  },
  {
    question: "How much is a Florida 4COP liquor license worth?",
    answer:
      "There is no single statewide 4COP value. Pricing can differ significantly by county based on quota supply, population, current inventory and buyer demand. County-specific comparables are generally more useful than a statewide number.",
  },
  {
    question: "How much is a Florida 3PS liquor license worth?",
    answer:
      "A 3PS quota-license value also depends heavily on county-specific supply and demand. Package-store buyers may evaluate a 3PS differently from a 4COP because the permitted uses and buyer pools differ.",
  },
  {
    question: "Is the FLLM market estimate a formal appraisal?",
    answer:
      "No. FLLM provides market pricing guidance from disclosed active asking-price comparables. It is not a USPAP appraisal, certified appraisal, broker price opinion, verified closed-sale report or guarantee of value.",
  },
  {
    question: "When might I need an independent liquor license appraisal?",
    answer:
      "A lender, court, estate, tax adviser, accountant or other third party may require an independent formal appraisal prepared for a specific purpose and effective date. The required standard depends on the institution or legal matter involved.",
  },
  {
    question: "What information should I gather before a valuation?",
    answer:
      "Have the county, license series, license number if available, current holder of record, license status and intended transaction timing. Information about liens, pending transfers, financing terms or unusual transaction conditions may also be relevant.",
  },
];

export default function FloridaLiquorLicenseAppraisalPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Florida Liquor License Appraisal: Valuation Guide and Market Data",
      description:
        "A Florida liquor license appraisal and valuation guide covering 4COP and 3PS licenses, county-specific market factors, comparable asking prices and formal appraisal considerations.",
      datePublished: "2026-08-22",
      dateModified: "2026-08-22",
      mainEntityOfPage: canonicalUrl,
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
        { "@type": "ListItem", position: 2, name: "Florida Liquor License Value", item: `${siteUrl}/florida-liquor-license-value` },
        { "@type": "ListItem", position: 3, name: "Florida Liquor License Appraisal", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="seo-market-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/florida-liquor-license-value" primaryActionLabel="Check License Value" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/florida-liquor-license-value">License Value</Link><span>›</span><strong>Appraisal Guide</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Liquor License Appraisal</span>
              <h1>Florida Liquor License Appraisal &amp; Valuation Guide</h1>
              <p>
                Learn how Florida 4COP and 3PS quota licenses are evaluated, why values can differ sharply by county, and when a market estimate may not be enough for a lender, court, estate or other formal purpose.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/florida-liquor-license-value">Calculate a Market Range</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/florida-liquor-licenses-for-sale">View Current Listings</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Florida liquor license appraisal factors">
              <span>Valuation Starts With</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>1</strong><small>county</small></div>
                <div><strong>2</strong><small>license type</small></div>
                <div><strong>3</strong><small>comparables</small></div>
                <div><strong>4</strong><small>status and terms</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell seo-market-intro-grid">
          <article>
            <span className="seo-market-section-kicker">Quick Answer</span>
            <h2>There is no single statewide Florida liquor license appraisal value</h2>
            <p>
              Florida quota liquor licenses trade in county-specific markets. A 4COP or 3PS license in one county can have a very different market value from the same license series in another county because supply, population, competing inventory and buyer demand differ.
            </p>
            <p>
              A useful market valuation therefore begins with the exact county and license type, then compares current market evidence. Sellers may use active comparable listings as a practical starting point when deciding on an asking price.
            </p>
          </article>
          <aside className="seo-market-callout">
            <strong>Market estimate vs. formal appraisal</strong>
            <ul>
              <li>FLLM market guidance uses disclosed asking-price comparables.</li>
              <li>Asking prices are not the same as verified closing prices.</li>
              <li>Some lenders, courts and tax matters may require an independent formal appraisal.</li>
              <li>The required appraisal standard depends on the purpose of the valuation.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="seo-market-guide">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Appraisal Factors</span>
          <h2>What affects a Florida liquor license appraisal?</h2>
          <div className="seo-market-guide-grid">
            {factors.map((factor, index) => (
              <article className="seo-market-guide-card" key={factor.title}>
                <span>{index + 1}</span>
                <h3>{factor.title}</h3>
                <p>{factor.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">4COP and 3PS Valuation</span>
              <h2>Compare the correct Florida quota-license market</h2>
            </div>
          </div>
          <div className="seo-market-card-grid">
            <article className="seo-market-card">
              <div>
                <div className="seo-market-card-top"><span>4COP Quota</span><span>On-premise full liquor</span></div>
                <h3>4COP Liquor License Appraisal</h3>
                <p>Compare county 4COP supply, current listings, buyer demand, license status and transaction terms.</p>
              </div>
              <Link href="/florida-4cop-liquor-license-for-sale">View 4COP market evidence →</Link>
            </article>
            <article className="seo-market-card">
              <div>
                <div className="seo-market-card-top"><span>3PS Quota</span><span>Package-store use</span></div>
                <h3>3PS Liquor License Appraisal</h3>
                <p>Compare county 3PS inventory, package-store license offerings, local demand and transaction conditions.</p>
              </div>
              <Link href="/florida-3ps-liquor-license-for-sale">View 3PS market evidence →</Link>
            </article>
            <article className="seo-market-card">
              <div>
                <div className="seo-market-card-top"><span>County Markets</span><span>Local comparables</span></div>
                <h3>County-Specific License Value</h3>
                <p>Open county pages and value guides to see why Florida liquor-license pricing is local rather than statewide.</p>
              </div>
              <Link href="/counties">Browse Florida counties →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-guide">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">When a Formal Appraisal May Be Needed</span>
          <h2>The purpose of the valuation matters</h2>
          <div className="seo-market-guide-grid">
            <article className="seo-market-guide-card"><span>1</span><h3>Loan Underwriting</h3><p>A bank, SBA lender or private lender may specify who can prepare the valuation and what documentation it will accept.</p></article>
            <article className="seo-market-guide-card"><span>2</span><h3>Litigation or Disputes</h3><p>Courts, attorneys or parties may require an independent expert opinion supported by a defined methodology and evidence.</p></article>
            <article className="seo-market-guide-card"><span>3</span><h3>Estate or Tax Matters</h3><p>Estate administration, gifting or tax reporting may require a valuation prepared for a specific effective date and legal purpose.</p></article>
            <article className="seo-market-guide-card"><span>4</span><h3>Financial Reporting</h3><p>Accountants, auditors, investors or owners may need valuation support that follows their reporting requirements.</p></article>
            <article className="seo-market-guide-card"><span>5</span><h3>Ownership Transactions</h3><p>Buyouts, dissolutions and ownership disputes may call for a neutral valuation tied to the applicable valuation date.</p></article>
            <article className="seo-market-guide-card"><span>6</span><h3>Sale Planning</h3><p>A seller deciding where to price a license may begin with current market evidence and obtain additional professional advice if needed.</p></article>
          </div>
        </div>
      </section>

      <section className="seo-market-faq">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Florida Liquor License Appraisal Questions</span>
          <h2>Frequently asked appraisal and valuation questions</h2>
          <div className="seo-market-faq-grid">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-market-final-cta">
        <div className="seo-market-shell">
          <div>
            <h2>Check the current Florida liquor-license market</h2>
            <p>Use county-specific asking-price evidence as a starting point for a market-value range.</p>
          </div>
          <Link className="seo-market-button seo-market-button-dark" href="/florida-liquor-license-value">Check My License Value</Link>
        </div>
      </section>
    </main>
  );
}
