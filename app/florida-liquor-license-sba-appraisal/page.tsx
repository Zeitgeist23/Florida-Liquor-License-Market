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
    "Florida liquor license SBA appraisal and lender valuation guidance for 4COP and 3PS quota licenses used in SBA 7(a) business acquisitions, refinancing and collateral review.",
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
      "How Florida quota-license valuation can support SBA lender review while remaining distinct from any separate business valuation or credentialed appraisal the lender may require.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "What is a Florida liquor license SBA appraisal?",
    answer:
      "In an SBA-financed Florida business transaction, a lender may need reliable support for the value of a 3PS or 4COP quota liquor license included in the transaction or considered in collateral analysis. A license-specific market appraisal or valuation focuses on the license itself, its county, series, market evidence, transferability and related regulatory facts. It is separate from any broader business valuation required for the operating company.",
  },
  {
    question: "Does an SBA lender always require a separate liquor license appraisal?",
    answer:
      "No single rule should be assumed for every transaction. The participating lender determines the required valuation scope based on the transaction, current SBA program requirements, its credit policy and the assets being financed. Borrowers should confirm the lender's exact appraisal and business-valuation requirements before ordering.",
  },
  {
    question: "Can FLLM prepare a Florida liquor license valuation for lender review?",
    answer:
      "Yes. FLLM can prepare a license-specific market valuation report using the subject license, county-specific 3PS and 4COP evidence, available transaction data, DBPR research and a reconciled value conclusion. The receiving lender decides whether the report satisfies its requirements and may require different credentials or additional scope.",
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
      headline: "Florida Liquor License SBA Appraisal",
      description:
        "Florida liquor license appraisal and valuation guidance for SBA 7(a) lender review of 4COP and 3PS quota licenses.",
      datePublished: "2026-08-30",
      dateModified: "2026-08-30",
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
        @media(max-width:820px){.sba-appraisal-grid,.sba-appraisal-steps{grid-template-columns:1fr}}
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
              <span className="seo-market-kicker">SBA 7(a) & Lender Valuation Support</span>
              <h1>Florida Liquor License SBA Appraisal</h1>
              <p>
                A Florida liquor license SBA appraisal or license-specific market valuation can help document the standalone market value of a 4COP or 3PS quota license when the license is part of an SBA-financed business acquisition, refinance or lender collateral review. The liquor-license analysis is distinct from any separate operating-business valuation the lender may require.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/florida-liquor-license-appraisal#order-form">Order License Appraisal — $995</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/sba-7a-liquor-license-business-financing">SBA 7(a) Financing Guide</Link>
              </div>
            </div>
            <aside className="sba-appraisal-summary">
              <span>What FLLM Values</span>
              <strong>The Florida quota liquor license itself</strong>
              <p>County-specific 4COP or 3PS market evidence, subject-license research and a reconciled license-value conclusion prepared for professional review.</p>
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
              <p>The SBA participating lender determines what valuation work, credentials, reliance language and supplemental reports are required for its particular loan file.</p>
            </article>
          </div>
          <p className="sba-appraisal-note">
            <strong>Important:</strong> FLLM does not represent that its license-specific market valuation automatically satisfies every SBA or lender appraisal requirement. A lender may require a credentialed independent appraiser, a separate business valuation, real-estate or equipment appraisals, or other scope. Confirm the lender&apos;s requirements before ordering whenever possible.
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
          <h2>SBA 7(a) policy is administered through participating lenders</h2>
          <p>
            The SBA describes 7(a) as its primary business loan program and permits eligible uses that include changes of ownership and multiple-purpose loans. Current origination requirements are governed by SBA SOP 50 10 and related lender guidance. Because lender and SBA requirements can change, transaction-specific appraisal requirements should be confirmed with the participating lender.
          </p>
          <div className="sba-appraisal-source">
            <a href="https://www.sba.gov/loans/7a-loans" target="_blank" rel="noopener noreferrer">Official SBA 7(a) Program ↗</a>
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
