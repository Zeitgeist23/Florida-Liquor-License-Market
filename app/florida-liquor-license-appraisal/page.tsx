import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import LiquorLicenseValueEstimator from "@/components/LiquorLicenseValueEstimator";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";
import "../florida-liquor-license-value/value-page.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-appraisal`;

export const metadata: Metadata = {
  title: "Florida Liquor License Appraisal | Valuation Guide & Market Data",
  description:
    "Florida liquor license appraisal and valuation guide for 4COP and 3PS quota licenses. Learn what affects value, review county market factors, compare asking-price data, and calculate a current market range.",
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
  twitter: {
    card: "summary_large_image",
    title: "Florida Liquor License Appraisal & Valuation Guide",
    description: "Compare Florida quota-license market data and calculate a current county-specific asking-price range.",
  },
};

const appraisalFactors = [
  {
    title: "County market",
    text: "Florida quota licenses are county-specific. Supply, population, buyer activity and the number of licenses currently offered for sale can create substantial differences in value from one county to another.",
  },
  {
    title: "License series and permitted use",
    text: "4COP quota and 3PS quota licenses serve different business uses and buyer pools. The series being valued should be compared with the same or closely related license category whenever possible.",
  },
  {
    title: "Comparable market evidence",
    text: "Current asking prices, available inventory and verified transaction evidence can help establish a range. Advertised asking prices should not automatically be treated as completed-sale prices.",
  },
  {
    title: "License status and ownership",
    text: "Active, inactive, escrowed or pending-transfer status can affect due diligence and transaction timing. Ownership, liens, security interests and other title-related issues may also matter to a buyer or lender.",
  },
  {
    title: "Transaction terms",
    text: "Cash terms, seller financing, deposits, contingencies, closing timing and other negotiated conditions can affect the economic value of a particular transaction.",
  },
  {
    title: "Purpose of the valuation",
    text: "A seller pricing a listing may need a market estimate, while a lender, court, estate, tax adviser or financial institution may require an independent professional appraisal prepared under its own standards.",
  },
];

const faqs = [
  {
    question: "How do you appraise a Florida liquor license?",
    answer:
      "A Florida liquor license appraisal generally starts with the exact county and license series, then considers current supply, comparable licenses offered for sale, available transaction evidence, license status, buyer demand and transaction terms. Because quota licenses are county-specific, a statewide average may be misleading for a particular license.",
  },
  {
    question: "How much is a Florida 4COP liquor license worth?",
    answer:
      "There is no single statewide 4COP value. Market pricing can differ significantly by county based on quota-license supply, population, current inventory and buyer demand. Current county-specific comparables are usually more useful than a statewide figure.",
  },
  {
    question: "How much is a Florida 3PS liquor license worth?",
    answer:
      "A 3PS quota-license value also depends heavily on county-specific supply and demand. Package-store buyers may evaluate a 3PS differently from a 4COP because the permitted business uses and buyer pools are different.",
  },
  {
    question: "Is the FLLM market estimate a formal appraisal?",
    answer:
      "No. FLLM's estimator provides market pricing guidance from disclosed active asking-price comparables. It is not a USPAP appraisal, broker price opinion, certified appraisal, verified closed-sale report or guarantee of value.",
  },
  {
    question: "When might I need an independent liquor license appraisal?",
    answer:
      "An independent appraisal may be requested for lender underwriting, SBA or conventional financing, litigation, estate or tax matters, financial reporting, partnership disputes or other situations in which a third party requires a formal valuation prepared to specified standards.",
  },
  {
    question: "What information should I have before asking for a liquor license valuation?",
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
    <main className="seo-market-page appraisal-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
      <style>{`
        .appraisal-page .appraisal-answer{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(260px,.75fr);gap:24px;align-items:start}
        .appraisal-page .appraisal-callout{padding:22px;border:1px solid rgba(237,169,26,.34);border-radius:14px;background:linear-gradient(145deg,#0a2237,#04111c);box-shadow:0 14px 28px rgba(0,0,0,.16)}
        .appraisal-page .appraisal-callout strong{display:block;margin-bottom:8px;color:#eda91a;font-size:16px}
        .appraisal-page .appraisal-callout p{margin:0;color:#c5d1dc;line-height:1.7}
        .appraisal-page .appraisal-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:24px}
        .appraisal-page .appraisal-grid article{padding:22px;border:1px solid rgba(255,255,255,.09);border-radius:13px;background:#071d33}
        .appraisal-page .appraisal-grid strong{display:block;margin-bottom:8px;color:#f5f1e8;font-size:18px}
        .appraisal-page .appraisal-grid p{margin:0;color:#adbdca;line-height:1.67}
        .appraisal-page .appraisal-table{width:100%;margin-top:24px;border-collapse:separate;border-spacing:0;overflow:hidden;border:1px solid rgba(255,255,255,.1);border-radius:13px;background:#071d33}
        .appraisal-page .appraisal-table th,.appraisal-page .appraisal-table td{padding:16px 18px;text-align:left;vertical-align:top;border-bottom:1px solid rgba(255,255,255,.08);color:#c4d0da;line-height:1.55}
        .appraisal-page .appraisal-table th{background:#0a263f;color:#eda91a;font-size:13px;text-transform:uppercase;letter-spacing:.04em}
        .appraisal-page .appraisal-table tr:last-child td{border-bottom:0}
        .appraisal-page .appraisal-table td:first-child{color:#fff;font-weight:800;white-space:nowrap}
        .appraisal-page .appraisal-links{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:22px}
        .appraisal-page .appraisal-links a{padding:18px;border:1px solid rgba(237,169,26,.3);border-radius:11px;background:#071d33;color:#f6f3ed;text-decoration:none;font-weight:800;line-height:1.35}
        .appraisal-page .appraisal-links a span{display:block;margin-top:7px;color:#9fb2c4;font-size:12px;font-weight:500;line-height:1.45}
        .appraisal-page .appraisal-faq{display:grid;gap:10px;margin-top:24px}
        .appraisal-page .appraisal-faq details{border:1px solid rgba(255,255,255,.09);border-radius:11px;background:#071d33;padding:0 18px}
        .appraisal-page .appraisal-faq summary{cursor:pointer;padding:17px 0;color:#f7f4ed;font-weight:800}
        .appraisal-page .appraisal-faq p{margin:0 0 18px;color:#adbdca;line-height:1.72}
        .appraisal-page .appraisal-estimator{padding:54px 20px;background:#f5f7fa}
        .appraisal-page .appraisal-estimator>div{max-width:1120px;margin:0 auto}
        @media(max-width:900px){.appraisal-page .appraisal-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.appraisal-page .appraisal-links{grid-template-columns:repeat(2,minmax(0,1fr))}.appraisal-page .appraisal-answer{grid-template-columns:1fr}}
        @media(max-width:620px){.appraisal-page .appraisal-grid,.appraisal-page .appraisal-links{grid-template-columns:1fr}.appraisal-page .appraisal-table{display:block;overflow-x:auto}.appraisal-page .appraisal-table td:first-child{white-space:normal}}
      `}</style>

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
                What is a Florida quota liquor license worth? This guide explains the market evidence commonly considered when valuing 4COP and 3PS licenses, why values differ by county, and when a market estimate may not be enough for a lender, court, estate or other formal purpose.
              </p>
              <div className="seo-market-actions">
                <a className="seo-market-button seo-market-button-gold" href="#market-estimate">Calculate a Market Range</a>
                <Link className="seo-market-button seo-market-button-dark" href="/florida-liquor-license-value">View License Value Guide</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Florida liquor license appraisal factors">
              <span>Valuation Starts With</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>1</strong><small>county</small></div>
                <div><strong>2</strong><small>license type</small></div>
                <div><strong>3</strong><small>comparables</small></div>
                <div><strong>4</strong><small>status &amp; terms</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell appraisal-answer">
          <article>
            <span className="seo-market-section-kicker">Quick Answer</span>
            <h2>There is no single statewide Florida liquor license appraisal value</h2>
            <p>
              Florida quota liquor licenses trade in county-specific markets. A 4COP or 3PS license in one county can have a very different market value from the same license series in another county because quota supply, population, competing inventory and buyer demand differ.
            </p>
            <p>
              A useful market valuation therefore begins with the exact county and license type, then compares current market evidence. For a seller deciding on an asking price, active comparable listings may provide a practical starting point. For financing, litigation, estate, tax or financial-reporting purposes, a third party may require a formal independent appraisal instead.
            </p>
          </article>
          <aside className="appraisal-callout">
            <strong>Market estimate vs. formal appraisal</strong>
            <p>
              FLLM provides market pricing guidance from disclosed marketplace asking prices. It does not represent that this guidance is a USPAP appraisal, certified appraisal, broker price opinion or verified closed-sale report.
            </p>
          </aside>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">Appraisal Factors</span>
              <h2>What affects a Florida liquor license appraisal?</h2>
            </div>
          </div>
          <div className="appraisal-grid">
            {appraisalFactors.map((factor) => (
              <article key={factor.title}>
                <strong>{factor.title}</strong>
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
              <span className="seo-market-section-kicker">4COP vs. 3PS</span>
              <h2>Appraising the correct Florida quota-license category</h2>
            </div>
          </div>
          <table className="appraisal-table">
            <thead>
              <tr><th>License</th><th>Typical buyer use</th><th>Valuation focus</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>4COP Quota</td>
                <td>Restaurants, bars, clubs and other qualifying on-premise full-liquor operations, subject to applicable law and approvals.</td>
                <td>County 4COP supply, current 4COP listings, buyer demand, license status and transaction terms.</td>
              </tr>
              <tr>
                <td>3PS Quota</td>
                <td>Package-store retail sales of beer, wine and spirits for off-premise consumption, subject to applicable law and approvals.</td>
                <td>County 3PS inventory, comparable package-store license offerings, local demand and transaction conditions.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="market-estimate" className="appraisal-estimator">
        <div>
          <LiquorLicenseValueEstimator />
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">When a Formal Appraisal May Be Needed</span>
              <h2>The purpose of the valuation matters</h2>
            </div>
          </div>
          <div className="appraisal-grid">
            <article><strong>Loan underwriting</strong><p>A bank, SBA lender or private lender may specify who can prepare the valuation and what appraisal standard or supporting documentation it will accept.</p></article>
            <article><strong>Litigation or disputes</strong><p>Courts, attorneys or parties may require an independent expert opinion supported by a defined methodology and admissible evidence.</p></article>
            <article><strong>Estate or tax matters</strong><p>Estate administration, gifting, tax reporting or ownership changes may require a valuation prepared for a specific effective date and legal purpose.</p></article>
            <article><strong>Financial reporting</strong><p>Accountants, auditors, investors or business owners may need valuation support that follows their reporting requirements rather than marketplace asking prices alone.</p></article>
            <article><strong>Partner or shareholder transactions</strong><p>Buyouts, dissolutions and ownership disputes may call for a neutral valuation that addresses the parties' governing documents and valuation date.</p></article>
            <article><strong>Listing or sale planning</strong><p>A seller who is simply deciding where to price a license may begin with a current market range, then obtain additional professional advice if the transaction requires it.</p></article>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">Related Florida Market Research</span>
              <h2>Compare value, listings and county-specific evidence</h2>
            </div>
          </div>
          <div className="appraisal-links">
            <Link href="/florida-liquor-license-value">Florida Liquor License Value<span>Use the market-value estimator and explore county guides.</span></Link>
            <Link href="/florida-liquor-licenses-for-sale">Current Florida Listings<span>Compare active 4COP and 3PS licenses offered for sale.</span></Link>
            <Link href="/counties">Florida Counties<span>Open county-specific liquor-license market pages.</span></Link>
            <Link href="/how-to-sell-florida-liquor-license">Seller Guide<span>See how valuation fits into listing, negotiation and closing.</span></Link>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">Florida Liquor License Appraisal Questions</span>
              <h2>Frequently asked appraisal and valuation questions</h2>
            </div>
          </div>
          <div className="appraisal-faq">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="value-final-cta">
        <div className="page-shell">
          <div>
            <span>Ready to compare the market?</span>
            <h2>See what similar Florida liquor licenses are asking</h2>
            <p>Use current county-specific marketplace data as a starting point, then decide whether your transaction requires a formal independent appraisal.</p>
          </div>
          <Link href="/florida-liquor-license-value">Check My License Value</Link>
        </div>
      </section>
    </main>
  );
}
