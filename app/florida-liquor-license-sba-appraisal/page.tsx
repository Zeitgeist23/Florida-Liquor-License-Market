import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-sba-appraisal`;

export const metadata: Metadata = {
  title: "Florida Liquor License SBA Appraisal | 4COP & 3PS Valuation",
  description:
    "SBA 7(a) SOP 50 10 8.1 guidance and lender-review support for Florida 4COP and 3PS quota-license valuations in business purchases and eligible refinances.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Florida liquor license SBA appraisal",
    "SBA liquor license appraisal Florida",
    "Florida liquor license appraisal for SBA loan",
    "SBA lender liquor license valuation",
    "4COP SBA appraisal",
    "3PS SBA appraisal",
    "Florida liquor license collateral valuation",
  ],
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "Florida Liquor License SBA Appraisal | 4COP & 3PS Valuation",
    description:
      "How FLLM's Florida quota-license appraisal can support SBA 7(a) lender review under SOP 50 10 8.1, while remaining separate from a required business valuation.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "What changed with SBA SOP 50 10 8.1?",
    answer:
      "SBA SOP 50 10 8.1, Lender and Development Company Loan Programs, took effect October 1, 2026. It is the current SBA origination-procedure reference for 7(a) and 504 lending. The SOP does not make an FLLM report automatically SBA-approved or lender-accepted; the lender must confirm the requirements and report scope for the specific loan.",
  },
  {
    question: "Does an SBA lender always require a separate liquor license appraisal?",
    answer:
      "No single rule should be assumed for every transaction. The participating lender determines the required valuation scope based on the transaction, current SBA program requirements, its credit policy and the assets being financed. Borrowers should confirm the lender's exact appraisal and business-valuation requirements before ordering.",
  },
  {
    question: "Can FLLM provide a lender-review-ready quota-license appraisal?",
    answer:
      "FLLM offers a formal, license-specific report designed to document the market value of a Florida 4COP or 3PS quota license for lender consideration. The report can include subject-license research, county-specific market evidence, DBPR review, transfer and conversion considerations, a valuation date, methodology and a reconciled conclusion. The lender decides whether the report, its author qualifications and its scope meet that lender's requirements. FLLM does not claim SBA endorsement or automatic acceptance.",
  },
  {
    question: "Is a liquor license valuation the same as the SBA business valuation?",
    answer:
      "No. A liquor-license valuation addresses the market value of the quota-license interest. A business valuation addresses the operating enterprise and may include cash flow, goodwill, furniture, fixtures, equipment and other assets. An SBA lender may require one or both analyses depending on the transaction.",
  },
  {
    question: "What Florida license types can be valued?",
    answer:
      "FLLM's license-specific valuation work focuses on Florida quota licenses, principally 4COP quota and 3PS package-store series, using county-specific market evidence and the exact subject-license facts.",
  },
];

const reviewItems = [
  ["Subject license", "License number, county, series, holder of record, status and available DBPR history."],
  ["County market", "Current same-county 3PS and 4COP asking-price evidence, with exact-series evidence identified separately."],
  ["Transaction evidence", "Available verified sales, transfers and other market evidence appropriate to the assignment."],
  ["Collateral considerations", "Transferability, known liens or security interests, marketability and transaction-specific assumptions."],
  ["Value reconciliation", "A stated effective date, intended use, methodology and supported conclusion of market value."],
  ["Lender requirements", "Any lender-specified reliance language, credential requirement or supplemental scope should be confirmed before engagement."],
];

export default function FloridaLiquorLicenseSbaAppraisalPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "SBA 7(a) Florida Quota Liquor License Valuation Support",
      description:
        "FLLM lender-review support for Florida 4COP and 3PS quota-license values in SBA 7(a) business purchases and eligible refinances, with guidance on current SOP 50 10 8.1.",
      datePublished: "2026-08-30",
      dateModified: "2026-10-07",
      mainEntityOfPage: canonicalUrl,
      author: { "@type": "Organization", name: "Florida Liquor License Market" },
      publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      about: [
        { "@type": "Thing", name: "Florida liquor license SBA appraisal" },
        { "@type": "Thing", name: "SBA 7(a) lending" },
        { "@type": "Thing", name: "Florida 4COP quota liquor license" },
        { "@type": "Thing", name: "Florida 3PS quota liquor license" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Florida Liquor License Appraisal", item: `${siteUrl}/florida-liquor-license-appraisal` },
        { "@type": "ListItem", position: 3, name: "Florida Liquor License SBA Appraisal", item: canonicalUrl },
      ],
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
    <main className="seo-market-page sba-appraisal-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <style>{`
        .sba-appraisal-page{background:#f6f7f8;color:#111820}
        .sba-appraisal-page .seo-market-hero{background:radial-gradient(circle at 84% 16%,rgba(246,167,0,.18),transparent 30%),linear-gradient(135deg,#020b12 0%,#061728 56%,#0a2237 100%);border-top:1px solid rgba(246,167,0,.4);border-bottom:1px solid rgba(246,167,0,.46)}
        .sba-appraisal-page .seo-market-breadcrumbs,.sba-appraisal-page .seo-market-hero p{color:#dce5ec}
        .sba-appraisal-page .seo-market-breadcrumbs a,.sba-appraisal-page .seo-market-kicker,.sba-appraisal-page .seo-market-section-kicker{color:#f6a700}
        .sba-appraisal-page .seo-market-hero h1{color:#fff;text-shadow:0 3px 22px rgba(0,0,0,.42)}
        .sba-appraisal-page .seo-market-button{min-height:48px;padding:0 20px;border-radius:5px;font-size:12px;font-weight:900;letter-spacing:.02em;text-transform:uppercase}
        .sba-appraisal-page .seo-market-button-gold{border:1px solid #ffc12d;background:linear-gradient(145deg,#ffbd21,#ef9000);color:#07111a;box-shadow:0 8px 22px rgba(246,167,0,.24)}
        .sba-appraisal-page .seo-market-button-dark{border:1px solid rgba(255,255,255,.26);background:#071827;color:#fff}
        .sba-appraisal-summary{padding:24px;border:1px solid rgba(246,167,0,.48);border-radius:14px;background:#fff;box-shadow:0 20px 45px rgba(0,0,0,.25)}
        .sba-appraisal-summary span{display:block;color:#996500;font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
        .sba-appraisal-summary strong{display:block;margin-top:8px;color:#071827;font-size:22px;line-height:1.25}
        .sba-appraisal-summary p{margin:10px 0 0!important;color:#50616f!important;font-size:13px!important;line-height:1.65!important}
        .sba-appraisal-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:24px}
        .sba-appraisal-grid article{padding:22px;border:1px solid #dde3e7;border-radius:12px;background:#fff;box-shadow:0 10px 24px rgba(5,22,35,.08)}
        .sba-appraisal-grid h3{margin:0 0 9px;color:#0a2942;font-size:19px}.sba-appraisal-grid p{margin:0;color:#536571;line-height:1.65}
        .sba-appraisal-note{margin-top:22px;padding:18px 20px;border-left:4px solid #f6a700;background:#fff4d9;color:#43535f;font-size:13px;line-height:1.7}
        .sba-appraisal-steps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:22px}
        .sba-appraisal-steps article{padding:20px;border-radius:12px;background:linear-gradient(145deg,#0a2237,#04111c);color:#cbd7df;border:1px solid rgba(246,167,0,.28)}
        .sba-appraisal-steps h3{margin:0 0 9px;color:#fff}.sba-appraisal-steps p{margin:0;line-height:1.65}.sba-appraisal-steps strong{color:#ffb400}
        .sba-appraisal-faq{display:grid;gap:12px;margin-top:22px}.sba-appraisal-faq article{padding:20px;border:1px solid #dde3e7;border-radius:12px;background:#fff}.sba-appraisal-faq h3{margin:0 0 8px;color:#0a2942}.sba-appraisal-faq p{margin:0;color:#536571;line-height:1.68}
        .sba-appraisal-source{display:flex;flex-wrap:wrap;gap:12px;margin-top:20px}.sba-appraisal-source a{padding:12px 15px;border:1px solid #d89200;border-radius:7px;background:#fff;color:#0a2942;font-weight:800;text-decoration:none}
        .sba-change-table-wrap{margin-top:24px;overflow-x:auto;border:1px solid #cfd8df;border-radius:14px;background:#fff;box-shadow:0 12px 28px rgba(5,22,35,.1)}
        .sba-change-table{width:100%;min-width:760px;border-collapse:collapse;text-align:left}
        .sba-change-table th{padding:16px 18px;background:linear-gradient(145deg,#0a2942,#061827);color:#fff;font-size:13px;letter-spacing:.035em;text-transform:uppercase}
        .sba-change-table th:first-child{color:#ffbd21}
        .sba-change-table td{padding:17px 18px;border-top:1px solid #e3e8ec;color:#465966;line-height:1.58;vertical-align:top}
        .sba-change-table tbody tr:nth-child(even){background:#f7f9fa}
        .sba-change-table tbody tr:hover{background:#fff4d9}
        .sba-change-table td:first-child{width:20%;color:#0a2942;font-weight:900}
        .sba-change-table td:nth-child(2),.sba-change-table td:nth-child(3){width:40%}
        .sba-change-scope{margin-top:16px;padding:17px 19px;border:1px solid rgba(0,165,205,.38);border-radius:10px;background:#edfaff;color:#294654;line-height:1.65}
        .sba-change-scope strong{color:#087b9b}
        @media(max-width:820px){.sba-appraisal-grid,.sba-appraisal-steps{grid-template-columns:1fr}.sba-change-table th,.sba-change-table td{padding:14px}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/florida-liquor-license-appraisal#order-form" primaryActionLabel="Order Appraisal" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/florida-liquor-license-appraisal">Appraisal</Link><span>›</span><strong>SBA Appraisal</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">SBA 7(a) SOP 50 10 8.1 · Effective October 1, 2026</span>
              <h1>SBA 7(a) Liquor License Valuation Support for Florida 4COP &amp; 3PS Licenses</h1>
              <p>
                FLLM provides a formal, license-specific report for a Florida 4COP or 3PS quota license included in a business purchase or eligible refinance. It documents the license component for lender consideration and remains separate from any business valuation or other appraisal the lender requires.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/florida-liquor-license-appraisal#order-form">Order License Appraisal — $995</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/sba-7a-liquor-license-business-financing">SBA 7(a) Financing Guide</Link>
              </div>
            </div>
            <aside className="sba-appraisal-summary">
              <span>What FLLM Values</span>
              <strong>The quota-license component</strong>
              <p>A documented license-specific value analysis for lender consideration. The lender determines whether it meets the requirements for the loan file.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">The SBA Transaction Distinction</span>
          <h2>Liquor-license appraisal versus business valuation</h2>
          <div className="sba-appraisal-grid">
            <article>
              <h3>License-specific valuation</h3>
              <p>Determines a supported market value for the subject Florida quota license using exact-county and license-series evidence, DBPR research and transaction-specific assumptions.</p>
            </article>
            <article>
              <h3>Operating-business valuation</h3>
              <p>Addresses the value of the operating company and may consider earnings, cash flow, goodwill, equipment, inventory and other assets beyond the liquor license.</p>
            </article>
            <article>
              <h3>Lender acceptance</h3>
              <p>The SBA participating lender determines the required valuation work, accepted credentials, reliance language and supplemental reports for its particular loan file.</p>
            </article>
          </div>
          <p className="sba-appraisal-note">
            <strong>Important:</strong> FLLM&apos;s report addresses the liquor-license component only. It does not value the operating business, establish SBA eligibility, or guarantee lender acceptance. A lender may require a separate business valuation, a credentialed independent valuation professional, real-estate or equipment appraisals, or additional scope. Confirm the lender&apos;s requirements before ordering.
          </p>
        </div>
      </section>

      <section className="seo-market-counties" aria-labelledby="sop-change-heading">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Effective October 1, 2026</span>
          <h2 id="sop-change-heading">What SBA SOP 50 10 8.1 changes for business acquisitions</h2>
          <p>
            The new procedure places 7(a) changes of ownership into Appendix 15 and applies more specific underwriting standards according to the transaction type. The comparison below highlights the changes most relevant to Florida businesses purchased with a 4COP or 3PS quota license.
          </p>
          <div className="sba-change-table-wrap">
            <table className="sba-change-table">
              <thead>
                <tr>
                  <th scope="col">Area</th>
                  <th scope="col">Prior SOP 50 10 8 approach</th>
                  <th scope="col">SOP 50 10 8.1</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Transaction categories</td>
                  <td>Change-of-ownership rules appeared throughout the loan-program chapters.</td>
                  <td>Appendix 15 organizes transactions as Initial Acquisition, Business Expansion, Owner Buyout, or ESOP and Cooperative.</td>
                </tr>
                <tr>
                  <td>Debt-service coverage</td>
                  <td>Generally 1.15× for Standard 7(a) underwriting, with qualifying reliance on historical or projected cash flow.</td>
                  <td>Generally 1.25× for Initial Acquisitions, Owner Buyouts, and ESOP or Cooperative transactions; 1.15× for qualifying Business Expansions, based on historical or properly adjusted results.</td>
                </tr>
                <tr>
                  <td>Buyer equity</td>
                  <td>A 10% equity injection generally applied to complete changes of ownership, subject to the former transaction rules.</td>
                  <td>An Initial Acquisition requires at least 10% of total project cost, and the lender may not reduce or eliminate that requirement.</td>
                </tr>
                <tr>
                  <td>Business valuation</td>
                  <td>The lender could perform its own valuation when the financed amount, after specified real-estate or equipment deductions, was $250,000 or less.</td>
                  <td>The lender may perform its own valuation when the Business Purchase Price is $350,000 or less and the parties are not closely related. Above that amount, an independent Qualified Source is required.</td>
                </tr>
                <tr>
                  <td>Valuation shortfall</td>
                  <td>The former rules did not apply the new Appendix 15 acquisition-debt ceiling.</td>
                  <td>Total acquisition debt is limited by the supported business value. A purchase-price amount above that value generally must be covered by additional equity.</td>
                </tr>
                <tr>
                  <td>Quality of Earnings</td>
                  <td>No specific SBA Quality of Earnings requirement applied.</td>
                  <td>A lender-ordered independent Quality of Earnings report is required for qualifying Initial Acquisitions and Business Expansions with a Business Purchase Price of $3 million or more.</td>
                </tr>
                <tr>
                  <td>Mixed-use maturity</td>
                  <td>A transaction meeting the former real-estate percentage test could receive a 25-year maturity for the combined loan.</td>
                  <td>The real-estate and business-acquisition portions use separate permitted maturities or a weighted blended maturity.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="sba-change-scope">
            <strong>Scope for FLLM:</strong> These Appendix 15 changes principally concern changes of ownership. A pure refinance without an ownership change does not automatically trigger the acquisition rules shown above. In either transaction, a lender may request an FLLM quota-license appraisal to document the 4COP or 3PS component, subject to the lender&apos;s approval of the assignment and report.
          </p>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">Lender-Focused Evidence</span><h2>What a Florida quota-license appraisal can document</h2></div>
          </div>
          <div className="sba-appraisal-steps">
            {reviewItems.map(([title, text], index) => (
              <article key={title}>
                <h3><strong>{index + 1}.</strong> {title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Why County Evidence Matters</span>
          <h2>Florida 4COP and 3PS quota licenses are county-specific market assets</h2>
          <p>
            A useful Florida liquor license SBA appraisal should not rely on a generic statewide number. Quota-license supply, asking prices and transaction evidence vary by county. FLLM&apos;s formal license-specific report identifies the subject county and license series, reviews same-county evidence and separately explains any cross-series 3PS/4COP evidence used in the reconciliation.
          </p>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/florida-liquor-license-appraisal">Review FLLM Appraisal Methodology</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/florida-liquor-license-market-index">Florida Market Index</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/counties">County Market Data</Link>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Current SBA References</span>
          <h2>Current SBA SOP 50 10 8.1 and lender review</h2>
          <p>
            SBA SOP 50 10 8.1 became effective October 1, 2026, and governs lender and development-company origination procedures for 7(a) and 504 loans. For a 7(a) business purchase or refinance, the lender determines what business valuation, collateral analysis and supporting reports are required for that transaction. FLLM&apos;s report isolates the Florida quota-license component; it does not replace a separate business valuation or other appraisal the lender requires. Ask the lender to confirm the applicable SOP requirements and acceptability of the report before ordering.
          </p>
          <div className="sba-appraisal-source">
            <a href="https://www.sba.gov/loans/7a-loans" target="_blank" rel="noopener noreferrer">Official SBA 7(a) Program ↗</a>
            <a href="https://legacy.sba.gov/document/sop-50-10-lender-development-company-loan-programs" target="_blank" rel="noopener noreferrer">Official SBA SOP 50 10, including Version 8.1 ↗</a>
            <a href="https://www.sba.gov/sba-lenders" target="_blank" rel="noopener noreferrer">SBA Lender Guidance ↗</a>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Florida Liquor License SBA Appraisal FAQs</span>
          <h2>Questions from borrowers, brokers and lenders</h2>
          <div className="sba-appraisal-faq">
            {faqs.map((faq) => (
              <article key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
