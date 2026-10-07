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
        .sba-appraisal-page{
          min-height:100vh;
          background:#082944;
          color:#eaf3f8;
          font-family:Arial,Helvetica,sans-serif;
        }
        .sba-appraisal-page .seo-market-hero,
        .sba-appraisal-page .seo-market-intro,
        .sba-appraisal-page .seo-market-counties{
          position:relative;
          padding:56px 0;
          border-top:1px solid rgba(246,167,0,.38);
          border-bottom:1px solid rgba(246,167,0,.28);
          background:
            radial-gradient(circle at 88% 12%,rgba(31,141,193,.14),transparent 30%),
            linear-gradient(145deg,#0b3658 0%,#082b49 54%,#061d32 100%);
          color:#eaf3f8;
        }
        .sba-appraisal-page .seo-market-hero{
          padding:54px 0 58px;
          background:
            linear-gradient(90deg,rgba(2,15,27,.96) 0%,rgba(4,24,40,.9) 45%,rgba(4,27,45,.7) 68%,rgba(4,27,45,.74) 100%),
            url("/assets/hero-skyline-clean.png") center right/cover no-repeat;
          border-top:1px solid rgba(246,167,0,.5);
          border-bottom:1px solid rgba(246,167,0,.62);
        }
        .sba-appraisal-page .seo-market-shell{
          width:min(1240px,calc(100% - 48px));
          margin:0 auto;
        }
        .sba-appraisal-page .seo-market-breadcrumbs{
          display:flex;
          gap:9px;
          align-items:center;
          margin-bottom:24px;
          color:#c8d9e4;
          font-size:12px;
        }
        .sba-appraisal-page .seo-market-breadcrumbs a,
        .sba-appraisal-page .seo-market-kicker,
        .sba-appraisal-page .seo-market-section-kicker{
          color:#f6a700!important;
          font-weight:900;
          letter-spacing:.11em;
          text-transform:uppercase;
        }
        .sba-appraisal-page .seo-market-hero-grid{
          display:grid;
          grid-template-columns:minmax(0,1.25fr) minmax(330px,.75fr);
          gap:46px;
          align-items:center;
        }
        .sba-appraisal-page .seo-market-hero h1,
        .sba-appraisal-page .seo-market-intro h2,
        .sba-appraisal-page .seo-market-counties h2{
          color:#fff!important;
          font-family:Georgia,"Times New Roman",serif;
          font-weight:700;
          letter-spacing:-.02em;
          text-shadow:0 3px 20px rgba(0,0,0,.28);
        }
        .sba-appraisal-page .seo-market-hero h1{
          max-width:800px;
          margin:12px 0 20px;
          font-size:clamp(48px,5.4vw,78px);
          line-height:.98;
        }
        .sba-appraisal-page .seo-market-hero p{
          max-width:790px;
          margin:0;
          color:#d8e7ef!important;
          font-size:17px;
          line-height:1.68;
        }
        .sba-appraisal-page .seo-market-intro h2,
        .sba-appraisal-page .seo-market-counties h2{
          margin:8px 0 17px;
          font-size:clamp(34px,4vw,52px);
          line-height:1.06;
        }
        .sba-appraisal-page .seo-market-intro>div>p,
        .sba-appraisal-page .seo-market-counties>div>p{
          color:#d7e5ed;
          font-size:15px;
          line-height:1.7;
        }
        .sba-appraisal-page .seo-market-actions{
          display:flex;
          flex-wrap:wrap;
          gap:12px;
          margin-top:26px;
        }
        .sba-appraisal-page .seo-market-button{
          display:inline-flex;
          min-height:48px;
          align-items:center;
          justify-content:center;
          padding:0 20px;
          border:1px solid #ffc12d!important;
          border-radius:5px;
          background:linear-gradient(145deg,#ffc43a 0%,#ee9a00 62%,#d78300 100%)!important;
          color:#07111a!important;
          box-shadow:inset 0 1px 0 rgba(255,244,197,.55),0 8px 20px rgba(0,0,0,.25),0 0 16px rgba(246,167,0,.12);
          font-size:11px;
          font-weight:950;
          letter-spacing:.025em;
          text-decoration:none;
          text-transform:uppercase;
          transition:transform .16s ease,filter .16s ease,box-shadow .16s ease;
        }
        .sba-appraisal-page .seo-market-button:hover,
        .sba-appraisal-page .seo-market-button:focus-visible{
          transform:translateY(-2px) scale(1.025);
          filter:brightness(1.08);
          box-shadow:inset 0 1px 0 rgba(255,244,197,.68),0 12px 24px rgba(0,0,0,.3),0 0 20px rgba(246,167,0,.22);
          outline:none;
        }
        .sba-hero-side{
          display:grid;
          gap:18px;
          justify-items:center;
        }
        .sba-hero-logo{
          display:flex;
          width:100%;
          min-height:150px;
          align-items:center;
          justify-content:center;
          padding:12px;
        }
        .sba-hero-logo img{
          width:min(100%,330px);
          height:auto;
          filter:drop-shadow(0 10px 25px rgba(0,0,0,.34));
        }
        .sba-appraisal-summary{
          width:100%;
          box-sizing:border-box;
          padding:24px;
          border:1px solid rgba(118,219,247,.7);
          border-radius:12px;
          background:linear-gradient(145deg,rgba(12,63,95,.96),rgba(5,32,54,.98));
          box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 18px 36px rgba(0,0,0,.3);
          transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease,filter .16s ease;
        }
        .sba-appraisal-summary:hover{
          transform:translateY(-3px);
          border-color:#86edff;
          filter:brightness(1.08);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 20px 40px rgba(0,0,0,.34),0 0 20px rgba(105,214,255,.14);
        }
        .sba-appraisal-summary span{
          display:block;
          color:#f6a700;
          font-size:10px;
          font-weight:950;
          letter-spacing:.09em;
          text-transform:uppercase;
        }
        .sba-appraisal-summary strong{
          display:block;
          margin-top:7px;
          color:#fff;
          font:700 23px/1.2 Georgia,"Times New Roman",serif;
        }
        .sba-appraisal-summary p{
          margin:10px 0 0!important;
          color:#d7e5ed!important;
          font-size:13px!important;
          line-height:1.6!important;
        }
        .sba-appraisal-grid{
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:16px;
          margin-top:24px;
        }
        .sba-appraisal-grid article,
        .sba-appraisal-steps article{
          position:relative;
          overflow:hidden;
          border:1px solid rgba(92,201,235,.52);
          border-radius:10px;
          background:linear-gradient(145deg,#0d3d61 0%,#082a46 58%,#061e33 100%);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 12px 24px rgba(0,0,0,.22);
          transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease,filter .16s ease;
        }
        .sba-appraisal-grid article{padding:24px 22px 24px 64px}
        .sba-appraisal-grid article:hover,
        .sba-appraisal-steps article:hover{
          transform:translateY(-3px) scale(1.015);
          border-color:#7ce6ff;
          filter:brightness(1.09);
          box-shadow:0 16px 30px rgba(0,0,0,.28),0 0 18px rgba(105,214,255,.12);
        }
        .sba-card-icon{
          position:absolute;
          left:20px;
          top:22px;
          display:flex;
          width:30px;
          height:30px;
          align-items:center;
          justify-content:center;
          color:#ffbe28;
          font-size:25px;
          line-height:1;
        }
        .sba-appraisal-grid h3,
        .sba-appraisal-steps h3{
          margin:0 0 8px;
          color:#fff;
          font-size:17px;
        }
        .sba-appraisal-grid p,
        .sba-appraisal-steps p{
          margin:0;
          color:#d2e0e8;
          font-size:13px;
          line-height:1.62;
        }
        .sba-appraisal-note,
        .sba-change-scope{
          margin-top:22px;
          padding:18px 20px;
          border:1px solid rgba(246,167,0,.58);
          border-left:5px solid #ffb400;
          border-radius:7px;
          background:linear-gradient(145deg,#0a314f,#071f35);
          color:#d7e5ed;
          font-size:13px;
          line-height:1.7;
          box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 9px 18px rgba(0,0,0,.18);
        }
        .sba-appraisal-note strong,
        .sba-change-scope strong{color:#ffbe28}
        .sba-change-table-wrap{
          margin-top:24px;
          overflow-x:auto;
          border:1px solid rgba(255,255,255,.22);
          border-radius:10px;
          background:#fff;
          box-shadow:0 16px 30px rgba(0,0,0,.24);
        }
        .sba-change-table{
          width:100%;
          min-width:760px;
          border-collapse:collapse;
          text-align:left;
        }
        .sba-change-table th{
          padding:15px 18px;
          background:linear-gradient(180deg,#092b46,#061c30);
          color:#fff;
          font-size:11px;
          letter-spacing:.04em;
          text-transform:uppercase;
        }
        .sba-change-table th:first-child{color:#ffbe28}
        .sba-change-table td{
          padding:17px 18px;
          border-top:1px solid #dfe6ea;
          color:#405461;
          font-size:13px;
          line-height:1.58;
          vertical-align:top;
        }
        .sba-change-table tbody tr:nth-child(even){background:#f4f7f8}
        .sba-change-table tbody tr:hover{background:#fff6dc}
        .sba-change-table td:first-child{
          width:20%;
          color:#082943;
          font-weight:900;
        }
        .sba-change-table td:nth-child(2),
        .sba-change-table td:nth-child(3){width:40%}
        .sba-appraisal-steps{
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:14px;
          margin-top:22px;
        }
        .sba-appraisal-steps article{padding:20px 20px 20px 58px}
        .sba-appraisal-steps article strong{color:#ffbe28}
        .sba-appraisal-source{
          display:flex;
          flex-wrap:wrap;
          gap:12px;
          margin-top:20px;
        }
        .sba-appraisal-source a{
          padding:12px 15px;
          border:1px solid #d99b10;
          border-radius:5px;
          background:#061e33;
          color:#fff;
          font-size:12px;
          font-weight:850;
          text-decoration:none;
          transition:transform .15s ease,border-color .15s ease,background .15s ease;
        }
        .sba-appraisal-source a:hover,
        .sba-appraisal-source a:focus-visible{
          transform:translateY(-2px);
          border-color:#ffc12d;
          background:#0c3558;
          outline:none;
        }
        .sba-appraisal-faq{
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:12px;
          margin-top:22px;
        }
        .sba-appraisal-faq details{
          overflow:hidden;
          border:1px solid rgba(83,199,235,.48);
          border-radius:8px;
          background:linear-gradient(145deg,#0b3658,#061f35);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 9px 18px rgba(0,0,0,.18);
        }
        .sba-appraisal-faq summary{
          position:relative;
          padding:16px 48px 16px 18px;
          color:#fff;
          font-size:13px;
          font-weight:900;
          list-style:none;
          cursor:pointer;
        }
        .sba-appraisal-faq summary::-webkit-details-marker{display:none}
        .sba-appraisal-faq summary::after{
          content:"⌄";
          position:absolute;
          right:18px;
          top:50%;
          transform:translateY(-50%);
          color:#f6a700;
          font-size:18px;
        }
        .sba-appraisal-faq details[open] summary::after{content:"⌃"}
        .sba-appraisal-faq details p{
          margin:0;
          padding:0 18px 18px;
          color:#cbdbe4;
          font-size:13px;
          line-height:1.65;
        }
        .sba-appraisal-page .seo-market-section-heading{
          display:flex;
          align-items:end;
          justify-content:space-between;
          gap:24px;
        }
        @media(max-width:900px){
          .sba-appraisal-page .seo-market-hero-grid,
          .sba-appraisal-grid,
          .sba-appraisal-steps,
          .sba-appraisal-faq{grid-template-columns:1fr}
          .sba-hero-side{justify-items:start}
          .sba-hero-logo{justify-content:flex-start}
          .sba-hero-logo img{max-width:280px}
        }
        @media(max-width:650px){
          .sba-appraisal-page .seo-market-shell{width:min(100% - 28px,1240px)}
          .sba-appraisal-page .seo-market-hero h1{font-size:44px}
          .sba-appraisal-page .seo-market-hero,
          .sba-appraisal-page .seo-market-intro,
          .sba-appraisal-page .seo-market-counties{padding:42px 0}
        }
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
                <Link className="seo-market-button seo-market-button-gold" href="/florida-liquor-license-appraisal#order-form">Order License Appraisal — $495</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/sba-7a-liquor-license-business-financing">SBA 7(a) Financing Guide</Link>
              </div>
            </div>
            <aside className="sba-hero-side" aria-label="SBA reference and FLLM valuation scope">
              <div className="sba-hero-logo">
                <a href="https://www.sba.gov/loans/7a-loans" target="_blank" rel="noopener noreferrer" aria-label="U.S. Small Business Administration 7(a) program">
                  <Image src="/assets/sba-logo-horizontal-blue.svg" alt="U.S. Small Business Administration" width={520} height={190} />
                </a>
              </div>
              <div className="sba-appraisal-summary">
                <span>What FLLM Values</span>
                <strong>The quota-license component</strong>
                <p>A documented license-specific value analysis for lender consideration. The lender determines whether it meets the requirements for the loan file.</p>
              </div>
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
              <span className="sba-card-icon" aria-hidden="true">⚖</span>
              <h3>License-specific valuation</h3>
              <p>Determines a supported market value for the subject Florida quota license using exact-county and license-series evidence, DBPR research and transaction-specific assumptions.</p>
            </article>
            <article>
              <span className="sba-card-icon" aria-hidden="true">▥</span>
              <h3>Operating-business valuation</h3>
              <p>Addresses the value of the operating company and may consider earnings, cash flow, goodwill, equipment, inventory and other assets beyond the liquor license.</p>
            </article>
            <article>
              <span className="sba-card-icon" aria-hidden="true">◆</span>
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
                <span className="sba-card-icon" aria-hidden="true">{["▤","●","▥","◇","▦","♟"][index]}</span>
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
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
