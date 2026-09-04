import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/sba-7a-liquor-license-business-financing`;

export const metadata: Metadata = {
  title: "SBA 7(a) Loans for Florida Liquor License Businesses | FLLM",
  description:
    "Learn when SBA 7(a) financing may help purchase or refinance a Florida liquor store, restaurant, bar or nightclub holding a 3PS or 4COP Quota license.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "SBA loan for Florida liquor store",
    "SBA loan for bar purchase",
    "SBA 7(a) restaurant acquisition",
    "Florida liquor license business financing",
    "SBA lender Florida liquor license",
    "refinance liquor store SBA loan",
  ],
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "SBA 7(a) Financing for Florida Liquor License Businesses",
    description:
      "Understand the difference between financing a stand-alone Florida quota license and financing an operating licensed business through an SBA participating lender.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "Can an SBA 7(a) loan purchase a stand-alone 4COP or 3PS license?",
    answer:
      "Stand-alone quota-license purchases are generally financed with buyer cash, seller financing or specialty private lenders. SBA 7(a) financing is more commonly considered when the quota license is part of the acquisition or refinance of an eligible operating business with demonstrated repayment ability. A participating lender must evaluate the complete transaction.",
  },
  {
    question: "Does the SBA lend money directly to the buyer?",
    answer:
      "Generally, no. Under the 7(a) program, a participating lender makes and funds the loan. The SBA guarantees an eligible portion of the lender's exposure, subject to program requirements. The borrower applies through the lender, not directly to the SBA.",
  },
  {
    question: "What is an SBA Preferred Lender?",
    answer:
      "A Preferred Lender is an SBA-approved lending institution with delegated authority to process qualifying SBA loans. Preferred status can streamline processing, but it does not guarantee approval. The lender still applies its underwriting standards and SBA eligibility requirements.",
  },
  {
    question: "How can FLLM help?",
    answer:
      "FLLM can help distinguish a stand-alone license request from an operating-business transaction, provide license-market information and valuation services, organize relevant license information and, where appropriate, refer a prospective borrower to an SBA participating or Preferred Lender. All lending decisions remain with the lender and SBA where applicable.",
  },
];

export default function SbaSevenALiquorLicenseBusinessFinancingPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "SBA 7(a) Loans for Florida Liquor License Businesses",
      description:
        "A practical explanation of SBA 7(a) financing for operating Florida liquor stores, restaurants, bars and nightclubs holding quota liquor licenses.",
      datePublished: "2026-08-29",
      dateModified: "2026-09-04",
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
  ];

  return (
    <main className="seo-market-page sba-finance-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <style>{`
        .sba-finance-page{background:#f7f7f5;color:#111820}
        .sba-finance-page .seo-market-hero{background:radial-gradient(circle at 84% 16%,rgba(246,167,0,.18),transparent 30%),linear-gradient(135deg,#020b12 0%,#061728 55%,#0a2237 100%);border-top:1px solid rgba(246,167,0,.38);border-bottom:1px solid rgba(246,167,0,.46)}
        .sba-finance-page .seo-market-breadcrumbs,.sba-finance-page .seo-market-hero p{color:#dce5ec}
        .sba-finance-page .seo-market-breadcrumbs a,.sba-finance-page .seo-market-kicker,.sba-finance-page .seo-market-section-kicker{color:#f6a700}
        .sba-finance-page .seo-market-hero h1{color:#fff;text-shadow:0 3px 22px rgba(0,0,0,.42)}
        .sba-finance-page .seo-market-button{min-height:48px;padding:0 20px;border-radius:5px;font-size:12px;font-weight:900;letter-spacing:.02em;text-transform:uppercase}
        .sba-finance-page .seo-market-button-gold,.sba-finance-page .seo-market-button-dark{border:1px solid #ffc12d;background:linear-gradient(145deg,#ffbd21,#ef9000);color:#07111a;box-shadow:0 8px 22px rgba(246,167,0,.24)}
        .sba-identity{padding:24px;border:1px solid rgba(246,167,0,.48);border-radius:14px;background:#fff;box-shadow:0 20px 45px rgba(0,0,0,.25)}
        .sba-identity img{display:block;width:100%;height:auto;max-width:330px;margin:0 auto 18px}
        .sba-identity strong{display:block;color:#071827;font-size:14px;line-height:1.5}
        .sba-identity p{margin:10px 0 0!important;color:#50616f!important;font-size:12px!important;line-height:1.6!important}
        .sba-distinction{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:24px}
        .sba-distinction article{padding:25px;border-radius:14px;box-shadow:0 12px 28px rgba(2,11,18,.13)}
        .sba-distinction article:first-child{border:1px solid #d6dde2;background:#fff}
        .sba-distinction article:last-child{border:1px solid #f6a700;background:linear-gradient(145deg,#0a2237,#04111c);color:#d7e0e7}
        .sba-distinction h3{margin:0 0 12px;font-size:22px}
        .sba-distinction article:last-child h3{color:#fff}
        .sba-distinction p{margin:0;line-height:1.7}
        .sba-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:24px}
        .sba-card{padding:23px;border:1px solid rgba(246,167,0,.3);border-radius:13px;background:linear-gradient(145deg,#0a2237,#04111c);color:#cbd7df;box-shadow:0 12px 25px rgba(0,0,0,.16)}
        .sba-card h3{margin:0 0 10px;color:#fff;font-size:20px}.sba-card p{margin:0;line-height:1.65}.sba-card strong{color:#ffb400}
        .sba-table-wrap{overflow-x:auto;margin-top:22px;border:1px solid rgba(246,167,0,.32);border-radius:14px;background:#061728}
        .sba-table{width:100%;min-width:800px;border-collapse:collapse;color:#eef3f8}
        .sba-table th,.sba-table td{padding:15px;border-bottom:1px solid rgba(255,255,255,.08);text-align:left;vertical-align:top;font-size:13px;line-height:1.55}
        .sba-table th{background:#020b12;color:#ffb400;font-size:11px;letter-spacing:.06em;text-transform:uppercase}
        .sba-checklist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:22px;padding:0;list-style:none}
        .sba-checklist li{position:relative;padding:16px 16px 16px 45px;border:1px solid #d9e0e4;border-radius:11px;background:#fff;line-height:1.55}
        .sba-checklist li::before{content:"✓";position:absolute;left:16px;top:15px;color:#d89200;font-weight:900}
        .sba-note{margin-top:22px;padding:18px 20px;border-left:4px solid #f6a700;background:#fff4d9;color:#43535f;font-size:13px;line-height:1.7}
        .sba-source-links{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}.sba-source-links a{padding:12px 15px;border:1px solid #d89200;border-radius:7px;color:#0a2942;background:#fff;font-weight:800;text-decoration:none}
        .sba-appraisal-wrap{display:grid;grid-template-columns:minmax(260px,.72fr) minmax(0,1.28fr);gap:28px;align-items:center;margin-top:26px;padding:26px;border:1px solid rgba(246,167,0,.48);border-radius:16px;background:linear-gradient(145deg,#071d31,#03111d);box-shadow:0 18px 38px rgba(0,0,0,.2)}
        .sba-appraisal-image{display:block;width:100%;height:auto;max-width:390px;margin:0 auto;border:1px solid rgba(246,167,0,.5);border-radius:9px;box-shadow:0 14px 30px rgba(0,0,0,.32)}
        .sba-appraisal-copy>span{display:block;color:#ffb400;font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
        .sba-appraisal-copy h3{margin:8px 0 10px;color:#fff;font:700 30px/1.1 Georgia,'Times New Roman',serif}
        .sba-appraisal-copy p{margin:0 0 17px;color:#d7e0e7;line-height:1.7}
        .sba-appraisal-copy .seo-market-button{display:inline-flex;align-items:center;justify-content:center;text-decoration:none}
        .sba-appraisal-copy small{display:block;margin-top:12px;color:#aebdca;font-size:11px;line-height:1.5}
        .sba-finance-page .seo-market-counties{background:radial-gradient(circle at 90% 10%,rgba(246,167,0,.08),transparent 26%),linear-gradient(145deg,#0a2237,#020b12);border-top:1px solid rgba(246,167,0,.38);border-bottom:1px solid rgba(246,167,0,.38)}
        .sba-finance-page .seo-market-counties h2{color:#fff}
        @media(max-width:820px){.sba-distinction,.sba-grid,.sba-checklist,.sba-appraisal-wrap{grid-template-columns:1fr}.sba-appraisal-wrap{padding:20px}.sba-appraisal-copy h3{font-size:25px}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/financing#request-financing" primaryActionLabel="Discuss Financing" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href="/financing">Finance</Link><span>›</span><strong>SBA 7(a) Financing</strong></div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Operating-Business Acquisition & Refinance</span>
              <h1>SBA 7(a) Loans for Florida Liquor License Businesses</h1>
              <p>
                SBA 7(a) financing may help qualified borrowers purchase or refinance an operating Florida liquor store, restaurant, bar or nightclub that already holds a 3PS or 4COP Quota license. It is different from the private financing commonly used to purchase the stand-alone quota licenses advertised on FLLM.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/financing#request-financing">Discuss Your Transaction</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/listings">View Stand-Alone Licenses</Link>
              </div>
            </div>
            <aside className="sba-identity" aria-label="About the U.S. Small Business Administration">
              <a href="https://www.sba.gov/loans/7a-loans" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/sba-logo-horizontal-blue.svg" alt="U.S. Small Business Administration" width={520} height={190} />
              </a>
              <strong>The SBA is a federal agency—not the lender in a typical 7(a) transaction.</strong>
              <p>Independent educational reference. FLLM is not affiliated with, endorsed by or acting on behalf of the SBA.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">The Critical Distinction</span>
          <h2>Financing a stand-alone quota license is not the same as financing an operating licensed business</h2>
          <div className="sba-distinction">
            <article><h3>Stand-alone 3PS or 4COP Quota license</h3><p>The quota licenses shown on FLLM&apos;s Listings pages are generally offered as stand-alone license assets. These purchases are usually funded with buyer cash, seller financing or specialty private liquor-license lenders.</p></article>
            <article><h3>Operating business holding the license</h3><p>SBA 7(a) financing is more commonly considered when a buyer purchases—or an owner refinances—an eligible operating liquor store, restaurant, bar or nightclub that already holds the quota license and generates business cash flow.</p></article>
          </div>
          <p className="sba-note"><strong>Not an absolute prohibition:</strong> a participating lender evaluates the complete transaction. FLLM does not state that SBA rules categorically prohibit every license-focused transaction; it explains that stand-alone license financing usually belongs in the private-lender market.</p>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">How the Program Works</span><h2>The SBA guarantees part of an eligible lender&apos;s loan—it generally does not fund the borrower directly</h2></div></div>
          <div className="sba-grid">
            <article className="sba-card"><h3>1. The borrower applies</h3><p>The prospective buyer or existing business owner applies through an SBA participating lender and provides the financial, ownership and transaction documents the lender requires.</p></article>
            <article className="sba-card"><h3>2. The lender underwrites</h3><p>A commercial bank, credit union or qualified nonbank lender evaluates eligibility, credit, management, collateral, equity and the operating business&apos;s ability to repay.</p></article>
            <article className="sba-card"><h3>3. SBA provides a guaranty</h3><p>Subject to program requirements, the SBA guarantees an eligible portion of the lender&apos;s exposure. <strong>A guaranty is not automatic approval</strong> and does not eliminate lender underwriting.</p></article>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">What May Be Financed?</span>
          <h2>A 7(a) business-acquisition loan may combine several transaction components</h2>
          <div className="sba-table-wrap"><table className="sba-table"><thead><tr><th>Transaction component</th><th>How it may fit</th><th>Important qualification</th></tr></thead><tbody>
            <tr><td><strong>Operating business</strong></td><td>Complete or partial qualifying change of ownership</td><td>The business must satisfy SBA eligibility and lender underwriting requirements.</td></tr>
            <tr><td><strong>3PS or 4COP Quota license</strong></td><td>An asset held by or transferred with the operating business</td><td>Value, transferability, liens and DBPR approval remain transaction-specific.</td></tr>
            <tr><td><strong>Furniture, fixtures and equipment</strong></td><td>May be included in a multipurpose acquisition loan</td><td>The lender evaluates condition, value and useful life.</td></tr>
            <tr><td><strong>Inventory and working capital</strong></td><td>May support the business after closing</td><td>Amount and eligible use are established by the lender.</td></tr>
            <tr><td><strong>Goodwill and other intangible value</strong></td><td>May be part of the documented business purchase price</td><td>A business valuation and additional lender requirements may apply.</td></tr>
            <tr><td><strong>Eligible business debt</strong></td><td>May be refinanced when current program conditions are met</td><td>Not every debt or refinance structure is eligible.</td></tr>
          </tbody></table></div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">Preferred Lenders</span><h2>Preferred status provides delegated authority—not guaranteed approval</h2></div></div>
          <div className="sba-grid">
            <article className="sba-card"><h3>Commercial lending institutions</h3><p>Many SBA loans are originated by commercial banks. Credit unions and qualified nonbank institutions may also participate in SBA lending programs.</p></article>
            <article className="sba-card"><h3>Delegated processing authority</h3><p>An SBA Preferred Lender has delegated authority to process qualifying SBA loans under applicable program rules, which may streamline the lender&apos;s process.</p></article>
            <article className="sba-card"><h3>Independent credit decision</h3><p>Each lender applies its own credit standards along with SBA requirements. Preferred-lender status does not promise approval, terms, timing or funding.</p></article>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Preparing for Lender Review</span>
          <h2>Information commonly needed for an operating-business transaction</h2>
          <ul className="sba-checklist">
            <li>Business and personal tax returns and interim financial statements.</li>
            <li>Purchase agreement or documentation of the proposed refinance.</li>
            <li>Business valuation and allocation of the purchase price.</li>
            <li>Liquor-license number, series, county, status and ownership record.</li>
            <li>Existing loan, lien and security-interest information.</li>
            <li>Lease, real-estate and landlord documentation where applicable.</li>
            <li>Buyer résumé, management experience and ownership structure.</li>
            <li>Sources of borrower equity and post-closing liquidity.</li>
          </ul>

          <div className="sba-appraisal-wrap" aria-label="FLLM formal liquor license appraisal">
            <div>
              <Image
                className="sba-appraisal-image"
                src="/assets/fllm-formal-appraisal-preview-v1.webp"
                alt="Sample FLLM formal Florida quota liquor license appraisal report"
                width={900}
                height={1200}
              />
            </div>
            <div className="sba-appraisal-copy">
              <span>Professional License Valuation</span>
              <h3>Need a lender-ready liquor license value?</h3>
              <p>
                Order a formal FLLM liquor license appraisal for one identified Florida 3PS or 4COP quota license. The report is supported by county market evidence, comparable listings, available recent transactions, DBPR research and a reconciled value conclusion for lender and professional review.
              </p>
              <Link className="seo-market-button seo-market-button-gold" href="/florida-liquor-license-appraisal#order-form">Order Appraisal — $495</Link>
              <small>Acceptance and any appraiser-credential requirements are determined by the receiving lender or institution.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">How FLLM May Assist</span><h2>Match the transaction to the appropriate financing channel</h2></div></div>
          <div className="sba-grid">
            <article className="sba-card"><h3>Transaction classification</h3><p>FLLM can help distinguish a stand-alone quota-license purchase from an operating-business acquisition or refinance before a financing referral is considered.</p></article>
            <article className="sba-card"><h3>Market and valuation support</h3><p>FLLM can provide county-level license information, listing data and license valuation or appraisal services appropriate to the engagement.</p></article>
            <article className="sba-card"><h3>Lender referral</h3><p>Where appropriate, FLLM may refer a prospective borrower to an SBA participating or Preferred Lender. FLLM may instead reference private lenders when the request concerns a stand-alone quota license.</p></article>
          </div>
          <p className="sba-note">FLLM does not make SBA loans, represent the SBA, determine program eligibility or guarantee financing. Any referral is informational. All eligibility, underwriting, credit and approval decisions are made independently by the participating lender and, where applicable, the SBA. Any applicable referral or service relationship should be separately disclosed.</p>
          <div className="sba-source-links">
            <a href="https://www.sba.gov/loans/7a-loans" target="_blank" rel="noopener noreferrer">Official SBA 7(a) Program</a>
            <a href="https://www.sba.gov/sba-lenders" target="_blank" rel="noopener noreferrer">Official SBA Lender Information</a>
            <a href="https://www.sba.gov/funding-programs/loans/lender-match-connects-you-lenders" target="_blank" rel="noopener noreferrer">SBA Lender Match</a>
          </div>
        </div>
      </section>

      <section className="seo-market-faq">
        <div className="seo-market-shell"><div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">SBA Financing Questions</span><h2>Frequently asked questions</h2></div></div><div className="seo-market-faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div>
      </section>

      <section className="seo-market-cta">
        <div className="seo-market-shell seo-market-cta-inner"><div><span className="seo-market-section-kicker">Start With the Transaction Structure</span><h2>Is this a stand-alone license or an operating-business transaction?</h2><p>FLLM can review the basic facts and help identify the financing channel that may be appropriate.</p></div><div className="seo-market-actions"><Link className="seo-market-button seo-market-button-gold" href="/financing#request-financing">Discuss Financing</Link><Link className="seo-market-button seo-market-button-dark" href="/private-liquor-license-lenders">Private License Lenders</Link></div></div>
      </section>
    </main>
  );
}
