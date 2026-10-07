import type { Metadata } from "next";
import Image from "next/image";
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
  ["Subject license", "License number, county, series, holder of record, status and available DBPR history.", "doc"],
  ["County market", "Current same-county 3PS and 4COP asking-price evidence, with exact-series evidence identified separately.", "pin"],
  ["Transaction evidence", "Available verified sales, transfers and other market evidence appropriate to the assignment.", "chart"],
  ["Collateral considerations", "Transferability, known liens or security interests, marketability and transaction-specific assumptions.", "shield"],
  ["Value reconciliation", "A stated effective date, intended use, methodology and supported conclusion of market value.", "calc"],
  ["Lender requirements", "Any lender-specified reliance language, credential requirement or supplemental scope should be confirmed before engagement.", "people"],
] as const;

function Icon({ name }: { name: (typeof reviewItems)[number][2] | "license" | "business" | "lender" | "info" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "doc" || name === "license") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M7 3h7l4 4v14H7z"/><path {...common} d="M14 3v5h5M10 12h5M10 16h5"/></svg>;
  if (name === "pin") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 21s6-5.6 6-11A6 6 0 1 0 6 10c0 5.4 6 11 6 11z"/><circle {...common} cx="12" cy="10" r="2"/></svg>;
  if (name === "chart" || name === "business") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 20V9h4v11M10 20V4h4v16M16 20v-7h4v7M3 20h18"/></svg>;
  if (name === "shield") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 3l7 3v5c0 4.8-3 8.2-7 10-4-1.8-7-5.2-7-10V6z"/></svg>;
  if (name === "calc") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="5" y="3" width="14" height="18" rx="2"/><path {...common} d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M16 15h0M8 19h2M12 19h4"/></svg>;
  if (name === "people" || name === "lender") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="9" cy="8" r="3"/><circle {...common} cx="16" cy="9" r="2.5"/><path {...common} d="M3.5 20c.6-4 3-6 5.5-6s5 2 5.5 6M13.5 20c.4-2.8 1.9-4.5 4-4.5 1.6 0 3 1 3.8 2.7"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="12" cy="12" r="9"/><path {...common} d="M12 10v6M12 7h.01"/></svg>;
}

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
    <main className="sba-mockup-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
      <style>{`
        .sba-mockup-page{min-height:100vh;background:#082a46;color:#f2f7fa;font-family:Arial,Helvetica,sans-serif}
        .sba-mockup-page *{box-sizing:border-box}
        .sba-shell{width:min(1240px,calc(100% - 44px));margin:0 auto}
        .sba-section{padding:46px 0;border-top:1px solid rgba(238,166,18,.62);background:linear-gradient(145deg,#0c3b60 0%,#082d4c 58%,#06243e 100%)}
        .sba-kicker{display:block;margin-bottom:8px;color:#f5a900;font-size:11px;font-weight:950;letter-spacing:.12em;text-transform:uppercase}
        .sba-title{margin:0;color:#fff;font:700 42px/1.08 Georgia,"Times New Roman",serif;letter-spacing:-.02em}
        .sba-copy{margin:12px 0 0;color:#d7e6ef;font-size:14px;line-height:1.7}
        .sba-hero{padding:26px 0 30px;border-top:1px solid rgba(238,166,18,.56);border-bottom:1px solid rgba(238,166,18,.65);background:
          linear-gradient(90deg,rgba(4,27,45,.96) 0%,rgba(4,27,45,.93) 42%,rgba(4,27,45,.55) 68%,rgba(4,27,45,.7) 100%),
          url("/assets/hero-skyline-clean.png") center right/cover no-repeat}
        .sba-breadcrumbs{display:flex;gap:8px;align-items:center;margin-bottom:16px;color:#d2e3ec;font-size:11px}
        .sba-breadcrumbs a{color:#f5a900;text-decoration:none}
        .sba-hero-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(330px,.85fr);gap:44px;align-items:center}
        .sba-hero h1{max-width:760px;margin:8px 0 16px;color:#fff;font:700 clamp(46px,5.4vw,72px)/.96 Georgia,"Times New Roman",serif;letter-spacing:-.03em}
        .sba-hero p{max-width:720px;margin:0;color:#dce9f0;font-size:15px;line-height:1.66}
        .sba-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:20px}
        .sba-btn{display:inline-flex;min-height:43px;align-items:center;justify-content:center;padding:0 18px;border:1px solid #ffc32d;border-radius:4px;background:linear-gradient(145deg,#ffc443,#ed9a00);color:#06131f!important;font-size:11px;font-weight:950;letter-spacing:.02em;text-decoration:none;text-transform:uppercase;box-shadow:inset 0 1px 0 rgba(255,246,204,.62),0 8px 18px rgba(0,0,0,.24);transition:transform .16s ease,filter .16s ease}
        .sba-btn:hover{transform:translateY(-2px);filter:brightness(1.07)}
        .sba-hero-side{display:grid;gap:14px;justify-items:center}
        .sba-logo-card{display:flex;width:100%;align-items:center;justify-content:center}
        .sba-logo-card img{width:min(100%,330px);height:auto;filter:drop-shadow(0 10px 24px rgba(0,0,0,.34))}
        .sba-summary{width:100%;padding:22px 24px;border:1px solid rgba(116,225,255,.72);border-radius:10px;background:linear-gradient(145deg,#0c456c,#082d4b);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 14px 30px rgba(0,0,0,.24)}
        .sba-summary .mini-icon{float:left;width:38px;height:38px;margin:1px 16px 0 0;color:#ffbd27}.sba-summary .mini-icon svg{width:100%;height:100%}
        .sba-summary span{display:block;color:#f5a900;font-size:10px;font-weight:950;letter-spacing:.09em;text-transform:uppercase}
        .sba-summary strong{display:block;margin-top:5px;color:#fff;font-size:17px}.sba-summary p{margin:6px 0 0!important;color:#d7e5ed!important;font-size:12px!important;line-height:1.5!important}
        .sba-three{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:20px}
        .sba-card{position:relative;min-height:130px;padding:19px 18px 19px 62px;border:1px solid rgba(94,210,242,.46);border-radius:8px;background:linear-gradient(145deg,#0d3e62,#072943);box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 10px 22px rgba(0,0,0,.2)}
        .sba-card .ico{position:absolute;left:18px;top:20px;width:28px;height:28px;color:#ffbe2a}.sba-card .ico svg{width:100%;height:100%}
        .sba-card h3{margin:0 0 7px;color:#fff;font-size:15px}.sba-card p{margin:0;color:#d3e1e9;font-size:12px;line-height:1.55}
        .sba-note{margin-top:16px;padding:14px 16px 14px 48px;border:1px solid rgba(246,167,0,.6);border-left:5px solid #ffb400;border-radius:6px;background:#0a304e;color:#dce8ee;font-size:12px;line-height:1.55;position:relative}
        .sba-note .ico{position:absolute;left:16px;top:14px;width:22px;height:22px;color:#ffbf2f}.sba-note .ico svg{width:100%;height:100%}
        .sba-table-wrap{margin-top:20px;overflow-x:auto;border:1px solid rgba(255,255,255,.22);border-radius:8px;background:#fff;box-shadow:0 14px 28px rgba(0,0,0,.2)}
        .sba-table{width:100%;min-width:780px;border-collapse:collapse}.sba-table th{padding:13px 14px;background:#092a45;color:#fff;font-size:10px;text-align:left;text-transform:uppercase;letter-spacing:.04em}.sba-table th:first-child{color:#ffbc26}.sba-table td{padding:13px 14px;border-top:1px solid #dfe6ea;color:#40515d;font-size:12px;line-height:1.5;vertical-align:top}.sba-table tbody tr:nth-child(even){background:#f2f5f6}.sba-table td:first-child{width:21%;color:#082844;font-weight:900}.sba-table td:nth-child(2),.sba-table td:nth-child(3){width:39.5%}
        .sba-scope{margin-top:12px;padding:14px 16px;border:1px solid rgba(75,207,241,.48);border-radius:7px;background:#eaf8fd;color:#264754;font-size:12px;line-height:1.55}.sba-scope strong{color:#007c9c}
        .sba-six{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:20px}.sba-six .sba-card{min-height:118px}
        .sba-inline-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
        .sba-link-btn{display:inline-flex;min-height:42px;align-items:center;padding:0 17px;border:1px solid #f5a900;border-radius:4px;background:linear-gradient(145deg,#ffc33c,#e89300);color:#06131f!important;font-size:10px;font-weight:950;text-decoration:none;text-transform:uppercase}
        .sba-reference-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:17px}.sba-reference-links a{display:inline-flex;min-height:38px;align-items:center;padding:0 13px;border:1px solid #d79c16;border-radius:4px;background:#062239;color:#fff;text-decoration:none;font-size:10px;font-weight:850}
        .sba-faq{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:18px}
        .sba-faq details{border:1px solid rgba(74,205,239,.46);border-radius:6px;background:#0a3556;overflow:hidden}.sba-faq summary{position:relative;padding:13px 42px 13px 16px;color:#fff;font-size:11px;font-weight:900;cursor:pointer;list-style:none}.sba-faq summary::-webkit-details-marker{display:none}.sba-faq summary::after{content:"⌄";position:absolute;right:15px;color:#f5a900}.sba-faq details[open] summary::after{content:"⌃"}.sba-faq details p{margin:0;padding:0 16px 15px;color:#cfdde6;font-size:12px;line-height:1.6}
        .sba-map-accent{position:absolute;right:6%;bottom:8%;width:120px;height:120px;opacity:.18;filter:saturate(.8)}
        .sba-section.is-relative{position:relative;overflow:hidden}
        @media(max-width:900px){.sba-hero-grid,.sba-three,.sba-six,.sba-faq{grid-template-columns:1fr}.sba-logo-card{justify-content:flex-start}.sba-logo-card img{max-width:280px}.sba-card{min-height:auto}}
        @media(max-width:650px){.sba-shell{width:min(100% - 26px,1240px)}.sba-hero h1{font-size:43px}.sba-section{padding:38px 0}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/florida-liquor-license-appraisal#order-form" primaryActionLabel="Order Appraisal" />
      </div>

      <section className="sba-hero">
        <div className="sba-shell">
          <div className="sba-breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href="/florida-liquor-license-appraisal">Appraisal</Link><span>›</span><strong>SBA Appraisal</strong></div>
          <div className="sba-hero-grid">
            <div>
              <span className="sba-kicker">SBA 7(a) SOP 50 10 8.1 · Effective October 1, 2026</span>
              <h1>SBA 7(a) Liquor License Valuation Support for Florida 4COP &amp; 3PS Licenses</h1>
              <p>FLLM provides a formal, license-specific report for a Florida 4COP or 3PS quota license included in a business purchase or eligible refinance. It documents the license component for lender consideration and remains separate from any business valuation or other appraisal the lender requires.</p>
              <div className="sba-actions">
                <Link className="sba-btn" href="/florida-liquor-license-appraisal#order-form">Order License Appraisal — $495</Link>
                <Link className="sba-btn" href="/sba-7a-liquor-license-business-financing">SBA 7(a) Financing Guide</Link>
              </div>
            </div>
            <aside className="sba-hero-side">
              <div className="sba-logo-card">
                <a href="https://www.sba.gov/loans/7a-loans" target="_blank" rel="noopener noreferrer">
                  <Image src="/assets/sba-logo-horizontal-blue.svg" alt="U.S. Small Business Administration" width={520} height={190} />
                </a>
              </div>
              <div className="sba-summary">
                <span className="mini-icon"><Icon name="license" /></span>
                <span>What FLLM Values</span>
                <strong>The quota-license component</strong>
                <p>A documented license-specific value analysis for lender consideration. The lender determines whether it meets the requirements for the loan file.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="sba-section">
        <div className="sba-shell">
          <span className="sba-kicker">The SBA Transaction Distinction</span>
          <h2 className="sba-title">Liquor-license appraisal versus business valuation</h2>
          <div className="sba-three">
            <article className="sba-card"><span className="ico"><Icon name="license" /></span><h3>License-specific valuation</h3><p>FLLM values the Florida liquor license (4COP or 3PS) as a separate asset for lender consideration.</p></article>
            <article className="sba-card"><span className="ico"><Icon name="business" /></span><h3>Operating-business valuation</h3><p>A separate business valuation addresses the operating business, financials, and other assets and liabilities.</p></article>
            <article className="sba-card"><span className="ico"><Icon name="lender" /></span><h3>Lender acceptance</h3><p>The lender determines what appraisals and documentation are required for the loan file.</p></article>
          </div>
          <div className="sba-note"><span className="ico"><Icon name="info" /></span><strong>Important:</strong> FLLM&apos;s report addresses the liquor-license component only. It does not value the operating business, establish SBA eligibility, or guarantee lender acceptance. A lender may require a separate business valuation, a credentialed independent valuation professional, real-estate or equipment appraisals, or additional scope. Confirm the lender&apos;s requirements before ordering.</div>
        </div>
      </section>

      <section className="sba-section">
        <div className="sba-shell">
          <span className="sba-kicker">Effective October 1, 2026</span>
          <h2 className="sba-title">What SBA SOP 50 10 8.1 changes for business acquisitions</h2>
          <p className="sba-copy">The new procedure places 7(a) changes of ownership into Appendix 15 and applies more specific underwriting standards according to the transaction type. The comparison below highlights the changes most relevant to Florida businesses purchased with a 4COP or 3PS quota license.</p>
          <div className="sba-table-wrap">
            <table className="sba-table">
              <thead><tr><th>Area</th><th>Prior SOP 50 10 8 approach</th><th>SOP 50 10 8.1</th></tr></thead>
              <tbody>
                <tr><td>Transaction categories</td><td>Change-of-ownership rules appeared throughout the loan-program chapters.</td><td>Appendix 15 organizes transactions as Initial Acquisition, Business Expansion, Owner Buyout, or ESOP and Cooperative.</td></tr>
                <tr><td>Debt-service coverage</td><td>Generally 1.15× for Standard 7(a) underwriting, with qualifying reliance on historical or projected cash flow.</td><td>Generally 1.25× for Initial Acquisitions, Owner Buyouts, and ESOP or Cooperative transactions; 1.15× for qualifying Business Expansions, based on historical or properly adjusted results.</td></tr>
                <tr><td>Buyer equity</td><td>A 10% equity injection generally applied to complete changes of ownership, subject to the former transaction rules.</td><td>An Initial Acquisition requires at least 10% of total project cost, and the lender may not reduce or eliminate that requirement.</td></tr>
                <tr><td>Business valuation</td><td>The lender could perform its own valuation when the financed amount, after specified real-estate or equipment deductions, was $250,000 or less.</td><td>The lender may perform its own valuation when the Business Purchase Price is $350,000 or less and the parties are not closely related. Above that amount, an independent Qualified Source is required.</td></tr>
                <tr><td>Valuation shortfall</td><td>The former rules did not apply the new Appendix 15 acquisition-debt ceiling.</td><td>Total acquisition debt is limited by the supported business value. A purchase-price amount above that value generally must be covered by additional equity.</td></tr>
                <tr><td>Quality of Earnings</td><td>No specific SBA Quality of Earnings requirement applied.</td><td>A lender-ordered independent Quality of Earnings report is required for qualifying Initial Acquisitions and Business Expansions with a Business Purchase Price of $3 million or more.</td></tr>
                <tr><td>Mixed-use maturity</td><td>A transaction meeting the former real-estate percentage test could receive a 25-year maturity for the combined loan.</td><td>The real-estate and business-acquisition portions use separate permitted maturities or a weighted blended maturity.</td></tr>
              </tbody>
            </table>
          </div>
          <div className="sba-scope"><strong>Scope for FLLM:</strong> These Appendix 15 changes principally concern changes of ownership. A pure refinance without an ownership change does not automatically trigger the acquisition rules shown above. In either transaction, a lender may request an FLLM quota-license appraisal to document the 4COP or 3PS component, subject to the lender&apos;s approval of the assignment and report.</div>
        </div>
      </section>

      <section className="sba-section">
        <div className="sba-shell">
          <span className="sba-kicker">Lender-Focused Evidence</span>
          <h2 className="sba-title">What a Florida quota-license appraisal can document</h2>
          <div className="sba-six">
            {reviewItems.map(([title,text,icon],index)=><article className="sba-card" key={title}><span className="ico"><Icon name={icon} /></span><h3>{index+1}. {title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="sba-section is-relative">
        <div className="sba-shell">
          <span className="sba-kicker">Why County Evidence Matters</span>
          <h2 className="sba-title">Florida 4COP and 3PS quota licenses are county-specific market assets</h2>
          <p className="sba-copy">A useful Florida liquor license SBA appraisal should not rely on a generic statewide number. Quota-license supply, asking prices and transaction evidence vary by county. FLLM&apos;s formal license-specific report identifies the subject county and license series, reviews same-county evidence and separately explains any cross-series 3PS/4COP evidence used in the reconciliation.</p>
          <div className="sba-inline-actions">
            <Link className="sba-link-btn" href="/florida-liquor-license-appraisal">Review FLLM Appraisal Methodology</Link>
            <Link className="sba-link-btn" href="/florida-liquor-license-market-index">Florida Market Index</Link>
            <Link className="sba-link-btn" href="/counties">County Market Data</Link>
          </div>
          <Image className="sba-map-accent" src="/assets/listing-miami.png" alt="" width={220} height={220} aria-hidden="true" />
        </div>
      </section>

      <section className="sba-section">
        <div className="sba-shell">
          <span className="sba-kicker">Current SBA References</span>
          <h2 className="sba-title">Current SBA SOP 50 10 8.1 and lender review</h2>
          <p className="sba-copy">SBA SOP 50 10 8.1 became effective October 1, 2026, and governs lender and development-company origination procedures for 7(a) and 504 loans. For a 7(a) business purchase or refinance, the lender determines what business valuation, collateral analysis and supporting reports are required for that transaction. FLLM&apos;s report isolates the Florida quota-license component; it does not replace a separate business valuation or other appraisal the lender requires. Ask the lender to confirm the applicable SOP requirements and acceptability of the report before ordering.</p>
          <div className="sba-reference-links">
            <a href="https://www.sba.gov/loans/7a-loans" target="_blank" rel="noopener noreferrer">Official SBA 7(a) Program ↗</a>
            <a href="https://legacy.sba.gov/document/sop-50-10-lender-development-company-loan-programs" target="_blank" rel="noopener noreferrer">Official SBA SOP 50 10, including Version 8.1 ↗</a>
            <a href="https://www.sba.gov/sba-lenders" target="_blank" rel="noopener noreferrer">SBA Lender Guidance ↗</a>
          </div>
        </div>
      </section>

      <section className="sba-section">
        <div className="sba-shell">
          <span className="sba-kicker">Florida Liquor License SBA Appraisal FAQs</span>
          <h2 className="sba-title">Questions from borrowers, brokers and lenders</h2>
          <div className="sba-faq">
            {faqs.map(faq=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </div>
        </div>
      </section>
    </main>
  );
}
