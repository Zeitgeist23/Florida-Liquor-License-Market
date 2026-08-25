import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/how-to-finance-florida-liquor-license`;

export const metadata: Metadata = {
  title: "How to Finance a Florida Quota Liquor License | FLLM",
  description:
    "Learn how Florida 4COP and 3PS quota-license financing works, including private lenders, seller financing, promissory notes, security interests and ABT-6022.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "how to finance a Florida quota liquor license",
    "Florida quota liquor license financing",
    "Florida 4COP financing",
    "Florida 3PS financing",
    "Florida liquor license private lenders",
    "Florida liquor license seller financing",
    "Florida liquor license promissory note",
    "Florida liquor license security interest",
    "ABT-6022",
  ],
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "How to Finance a Florida Quota Liquor License | FLLM",
    description:
      "A practical guide to 4COP and 3PS quota-license financing, including private lenders, seller financing, promissory notes, security interests and ABT-6022.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "Which Florida liquor licenses can usually be financed?",
    answer:
      "The financing market is concentrated on transferable Florida quota licenses that have measurable secondary-market value, especially 4COP-family full-liquor licenses and 3PS-family package-store licenses. Non-quota beer-and-wine licenses and qualification-based specialty licenses generally do not have the same stand-alone resale value and therefore usually do not support the same type of license-backed financing.",
  },
  {
    question: "Why do traditional banks often avoid stand-alone liquor license loans?",
    answer:
      "A quota liquor license is a specialized regulatory asset rather than conventional real estate, equipment or accounts receivable. Its value depends on county supply and demand, transfers require state approval, enforcement of a security interest is specialized, and the resale market is narrower than for conventional bank collateral. Those factors can place a stand-alone license loan outside a bank’s normal collateral and underwriting policies.",
  },
  {
    question: "Who finances Florida quota liquor licenses?",
    answer:
      "Transactions are commonly funded by specialty private lenders, private-credit investors, family offices, individual private lenders, or sellers willing to carry part of the purchase price. A conventional business lender may also participate when the liquor license is only one asset within a larger operating-business acquisition.",
  },
  {
    question: "What interest rate should I expect?",
    answer:
      "FLLM’s current private-lender network generally targets an indicative range around 10% to 12% for qualifying transactions, but actual rates can be lower or higher. Pricing depends on the license, county, loan-to-value, borrower qualifications, transaction structure, collateral package, term and market conditions. Rates are not guaranteed until a lender completes underwriting and issues final terms.",
  },
  {
    question: "Can a liquor license be used as collateral?",
    answer:
      "Florida law recognizes security interests and liens involving alcoholic-beverage licenses, but enforcement and transfer remain subject to Florida Beverage Law and DBPR requirements. A lender should use transaction documents and filing procedures appropriate to the license and the specific financing structure.",
  },
  {
    question: "How is a Florida quota liquor-license loan documented and perfected?",
    answer:
      "The loan is generally evidenced by a promissory note, while a separate security agreement grants the lender a contractual security interest in the quota license. For an interest against a qualifying spirituous alcoholic-beverage license to be perfected under section 561.65, it must be recorded with the Division within 90 days after creation, generally using ABT-6022. Additional documents or filings may be appropriate depending on the complete collateral package and transaction.",
  },
];

export default function HowToFinanceFloridaLiquorLicensePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "How to Finance a Florida Quota Liquor License",
      description:
        "A practical guide to financing Florida 4COP and 3PS quota liquor licenses through private lenders, seller financing, promissory notes and properly recorded security interests.",
      datePublished: "2026-08-18",
      dateModified: "2026-08-25",
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
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Finance", item: `${siteUrl}/financing` },
        { "@type": "ListItem", position: 3, name: "How to Finance a Florida Quota Liquor License", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="seo-market-page finance-guide-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <style>{`
        .finance-guide-page{background:#f7f7f5;color:#111820}
        .finance-guide-page .seo-market-hero{background:radial-gradient(circle at 84% 16%,rgba(246,167,0,.18),transparent 30%),linear-gradient(135deg,#020b12 0%,#061728 55%,#0a2237 100%);border-top:1px solid rgba(246,167,0,.38);border-bottom:1px solid rgba(246,167,0,.46)}
        .finance-guide-page .seo-market-breadcrumbs,.finance-guide-page .seo-market-hero p{color:#dce5ec}
        .finance-guide-page .seo-market-breadcrumbs a,.finance-guide-page .seo-market-kicker,.finance-guide-page .seo-market-section-kicker{color:#f6a700}
        .finance-guide-page .seo-market-hero h1{color:#fff;text-shadow:0 3px 22px rgba(0,0,0,.42)}
        .finance-guide-page .seo-market-button{min-height:48px;padding:0 20px;border-radius:5px;font-size:12px;font-weight:900;letter-spacing:.02em;text-transform:uppercase;transition:transform .18s ease,filter .18s ease,box-shadow .18s ease}
        .finance-guide-page .seo-market-button-gold,.finance-guide-page .seo-market-button-dark{border:1px solid #ffc12d;background:linear-gradient(145deg,#ffbd21 0%,#ef9000 100%);color:#07111a;box-shadow:inset 0 1px 0 rgba(255,255,255,.45),inset 0 -1px 0 rgba(132,76,0,.28),0 8px 22px rgba(246,167,0,.24),0 2px 5px rgba(0,0,0,.25)}
        .finance-guide-page .seo-market-button:hover,.finance-guide-page .seo-market-button:focus-visible{filter:brightness(1.08);transform:translateY(-2px);outline:none}
        .finance-guide-page .seo-market-snapshot{border:1px solid rgba(246,167,0,.48);background:rgba(2,11,18,.72);box-shadow:0 20px 45px rgba(0,0,0,.32)}
        .finance-guide-page .seo-market-snapshot>span{color:#ffb400}
        .finance-guide-page .seo-market-snapshot-grid div{border-color:rgba(246,167,0,.18);background:rgba(10,34,55,.72)}
        .finance-guide-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:24px}
        .finance-guide-card{padding:24px;border:1px solid rgba(246,167,0,.32);border-radius:13px;background:linear-gradient(145deg,#0a2237,#04111c);box-shadow:0 12px 26px rgba(0,0,0,.16);color:#c9d5df}
        .finance-guide-card h3{margin:0 0 10px;color:#fff;font-size:21px}
        .finance-guide-card p{margin:0;line-height:1.68}
        .finance-guide-card strong{color:#ffb400}
        .finance-guide-card a{display:inline-block;margin-top:15px;color:#ffb400;font-weight:900;text-decoration:none}
        .finance-guide-table-wrap{overflow-x:auto;margin-top:22px;border:1px solid rgba(246,167,0,.32);border-radius:14px;background:#061728}
        .finance-guide-table{width:100%;min-width:780px;border-collapse:collapse;color:#eef3f8}
        .finance-guide-table th,.finance-guide-table td{padding:15px;border-bottom:1px solid rgba(255,255,255,.08);text-align:left;vertical-align:top;font-size:13px;line-height:1.55}
        .finance-guide-table th{background:#020b12;color:#ffb400;font-size:11px;letter-spacing:.06em;text-transform:uppercase}
        .finance-guide-checklist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:22px;padding:0;list-style:none}
        .finance-guide-checklist li{position:relative;padding:16px 16px 16px 45px;border:1px solid rgba(246,167,0,.18);border-radius:11px;background:linear-gradient(145deg,#0a2237,#061728);color:#d7e0e7;line-height:1.55}
        .finance-guide-checklist li::before{content:"✓";position:absolute;left:16px;top:15px;color:#ffb400;font-weight:900}
        .finance-guide-note{margin-top:22px;padding:17px 19px;border-left:3px solid #f6a700;background:rgba(246,167,0,.08);color:#526171;font-size:12px;line-height:1.7}
        .finance-guide-links{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:22px}
        .finance-guide-links a{padding:18px;border:1px solid rgba(246,167,0,.45);border-radius:11px;background:linear-gradient(145deg,#0a2237,#04111c);color:#fff;text-decoration:none;font-weight:800;line-height:1.35;box-shadow:0 8px 18px rgba(2,11,18,.14)}
        .finance-guide-links a span{display:block;margin-top:7px;color:#b9c8d4;font-size:12px;font-weight:500;line-height:1.5}
        .finance-guide-page .seo-market-counties{background:radial-gradient(circle at 90% 10%,rgba(246,167,0,.08),transparent 26%),linear-gradient(145deg,#0a2237 0%,#020b12 74%);border-top:1px solid rgba(246,167,0,.38);border-bottom:1px solid rgba(246,167,0,.38)}
        .finance-guide-page .seo-market-counties h2{color:#fff}
        @media(max-width:820px){.finance-guide-grid,.finance-guide-checklist,.finance-guide-links{grid-template-columns:1fr}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/financing#request-financing" primaryActionLabel="Request Financing" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/financing">Finance</Link><span>›</span><strong>Financing Guide</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Quota Liquor License Financing Guide</span>
              <h1>How to Finance a Florida Quota Liquor License</h1>
              <p>
                Transferable Florida 4COP and 3PS quota liquor licenses can have substantial stand-alone market value, but financing them is different from financing real estate, equipment or ordinary business assets. This guide explains private lenders, seller financing, promissory notes, security interests, ABT-6022 recording, underwriting, rates and terms.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/private-liquor-license-lenders">Private Lenders</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/financing#request-financing">Request Financing</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Florida liquor license financing snapshot">
              <span>Financing at a Glance</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>4COP</strong><small>primary quota collateral</small></div>
                <div><strong>3PS</strong><small>primary quota collateral</small></div>
                <div><strong>10–12%</strong><small>FLLM network indicative range</small></div>
                <div><strong>Private</strong><small>specialty lender market</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">What Has Financeable Value?</span>
          <h2>Quota licenses are different because scarcity creates a secondary market</h2>
          <p>
            Florida limits quota beverage licenses by county. When a county needs another quota license, new availability is created through the state quota process; otherwise buyers generally acquire existing licenses from current holders. Because supply is restricted and existing quota licenses can change hands subject to DBPR approval, 4COP-family and 3PS-family quota licenses commonly carry separate market value.
          </p>
          <div className="finance-guide-table-wrap">
            <table className="finance-guide-table">
              <thead><tr><th>License category</th><th>Typical market value</th><th>Stand-alone financing potential</th><th>Why</th></tr></thead>
              <tbody>
                <tr><td><strong>4COP-family quota</strong></td><td>Often substantial and county-dependent</td><td><strong>Primary financing category</strong></td><td>Transferable quota scarcity, established resale market, and measurable county-level value.</td></tr>
                <tr><td><strong>3PS-family quota</strong></td><td>Often substantial and county-dependent</td><td><strong>Primary financing category</strong></td><td>Quota package-store rights trade in the secondary market and can support specialized collateral underwriting.</td></tr>
                <tr><td><strong>2COP / 2APS / beer-wine</strong></td><td>Generally tied to state licensing fees rather than scarcity value</td><td>Usually limited as stand-alone collateral</td><td>These are non-quota licenses and generally do not trade like scarce county quota assets.</td></tr>
                <tr><td><strong>Special restaurant / qualification-based licenses</strong></td><td>Primarily tied to the qualifying business and premises</td><td>Usually not financed as a stand-alone license asset</td><td>Eligibility depends on statutory business qualifications rather than a transferable quota position.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="finance-guide-note">
            A particular license can still have transfer, status, lien or eligibility issues that affect collateral value. A lender will underwrite the exact license, not merely the series name.
          </p>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">Why Banks Often Say No</span><h2>A quota license is valuable collateral, but it is specialized collateral</h2></div></div>
          <div className="finance-guide-grid">
            <article className="finance-guide-card"><h3>It is an intangible regulatory asset</h3><p>Traditional commercial banks are built to lend against familiar collateral such as real estate, equipment, inventory and receivables. A liquor license does not fit neatly into those standard collateral categories.</p></article>
            <article className="finance-guide-card"><h3>Transfers require state approval</h3><p>A lender cannot treat a quota license exactly like a vehicle title or warehouse full of equipment. Any ownership transfer remains subject to Florida Beverage Law and DBPR approval.</p></article>
            <article className="finance-guide-card"><h3>The market is county-specific</h3><p>License value can differ materially from one county to another. A lender needs local market knowledge to determine what the collateral might sell for if the loan must be worked out or refinanced.</p></article>
            <article className="finance-guide-card"><h3>Enforcement is specialized</h3><p>Florida law recognizes liens and security interests involving alcoholic-beverage licenses, but the lender must understand the licensing rules, disclosure requirements and practical process for protecting and enforcing its position.</p></article>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Who Makes These Loans?</span>
          <h2>Specialty private lenders fill the gap left by conventional banks</h2>
          <p>
            The typical financing market includes specialty liquor-license lenders, private-credit investors, family offices, individual private lenders and, in some transactions, seller financing. A conventional business-acquisition lender may also finance a transaction when the liquor license is only one part of a broader operating-business purchase with cash flow, equipment, leasehold value or other collateral.
          </p>
          <div className="finance-guide-links">
            <Link href="/private-liquor-license-lenders">Private Lender Guide<span>See how specialty lenders evaluate quota-license collateral and structure transactions.</span></Link>
            <Link href="/florida-liquor-license-value">Estimate License Value<span>Start with the county and license type because collateral value drives the financing conversation.</span></Link>
            <Link href="/financing#request-financing">Request Financing<span>Submit the license, county, purchase price or value, requested loan amount and transaction timeline.</span></Link>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">Rates & Terms</span><h2>What private liquor-license financing usually looks like</h2></div></div>
          <div className="finance-guide-grid">
            <article className="finance-guide-card"><h3>Interest rate</h3><p><strong>FLLM’s current private-lender network generally targets an indicative 10%–12% range</strong> for qualifying transactions. Actual pricing depends on underwriting and can be outside that range.</p></article>
            <article className="finance-guide-card"><h3>Borrower equity</h3><p>Private lenders usually expect meaningful borrower equity or down payment rather than financing the full purchase price. The stronger the collateral coverage, borrower liquidity and transaction structure, the more financeable the request generally becomes.</p></article>
            <article className="finance-guide-card"><h3>Term and repayment</h3><p>Terms vary by lender and can include amortizing payments, shorter private-credit maturities, balloon structures or other negotiated repayment schedules. Refinancing at maturity may be part of the borrower’s longer-term plan.</p></article>
            <article className="finance-guide-card"><h3>Fees and protections</h3><p>Origination, documentation, legal, valuation or closing costs may apply. Lenders may also require personal or business guarantees, lien documentation, insurance or additional collateral depending on the transaction.</p></article>
          </div>
          <p className="finance-guide-note">
            The 10%–12% range is informational and is not a commitment, quote or guarantee. Loan amount, rate, fees, term, collateral, guarantees and repayment structure are determined by the actual lender after underwriting.
          </p>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">What Lenders Underwrite</span>
          <h2>The license value matters, but the borrower and transaction matter too</h2>
          <ul className="finance-guide-checklist">
            <li>Exact liquor-license number, series, county and current status.</li>
            <li>Current estimated market value and comparable county inventory.</li>
            <li>Purchase price or refinance value and requested loan amount.</li>
            <li>Borrower down payment or existing equity in the license.</li>
            <li>Borrower credit, liquidity and financial strength.</li>
            <li>Business cash flow when the operating business is part of the credit.</li>
            <li>Existing liens, security interests or debt against the license.</li>
            <li>Transaction structure, purchase agreement and closing timeline.</li>
            <li>DBPR transfer requirements and buyer qualification issues.</li>
            <li>Any additional collateral or guarantees supporting the loan.</li>
          </ul>
        </div>
      </section>

      <section className="seo-market-faq">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">Financing Questions</span><h2>Florida quota liquor license financing FAQ</h2></div></div>
          <div className="seo-market-faq-list">
            {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </div>
          <p className="finance-guide-note">
            This guide is general educational information, not a lending commitment, legal opinion, appraisal or investment recommendation. Financing terms and regulatory requirements can change. Borrowers and lenders should confirm current DBPR requirements and obtain transaction-specific professional advice where appropriate.
          </p>
        </div>
      </section>

      <section className="seo-market-cta">
        <div className="seo-market-shell seo-market-cta-inner">
          <div><span className="seo-market-section-kicker">Ready to Explore Financing?</span><h2>Start with the license, county, value and amount you need.</h2><p>FLLM can use those details to determine whether a private-lender introduction may fit the transaction.</p></div>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/financing#request-financing">Request Financing</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/private-liquor-license-lenders">Private Lenders</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
