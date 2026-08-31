import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-value-expert-witness`;

export const metadata: Metadata = {
  title: "Florida Liquor License Value Expert Witness & Litigation Support",
  description:
    "Florida liquor license value expert-witness and litigation valuation support for 4COP and 3PS quota licenses, including county market evidence, DBPR research and transaction analysis.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Florida liquor license value expert witness",
    "Florida liquor license expert witness",
    "liquor license valuation expert witness Florida",
    "4COP quota license expert witness",
    "3PS liquor license expert witness",
    "Florida liquor license litigation valuation",
    "Florida liquor license damages valuation",
    "Florida quota license appraisal litigation",
  ],
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "Florida Liquor License Value Expert Witness & Litigation Support",
    description:
      "License-specific Florida 4COP and 3PS market valuation support for attorneys, litigants and professionals, with clear separation between market research and court-qualified expert testimony.",
    siteName: "Florida Liquor License Market",
  },
};

const useCases = [
  ["Business and partnership disputes", "Support for disputes involving ownership, buyouts, damages, dissolution or allocation of value where a Florida quota liquor license is a material asset."],
  ["Divorce and equitable-distribution matters", "County-specific market evidence can help counsel and retained valuation professionals evaluate a 3PS or 4COP quota-license interest separately from the operating business."],
  ["Bankruptcy, receivership and distressed matters", "Marketability, transferability, current asking-price evidence and available transaction history may be relevant when evaluating liquidation or going-concern scenarios."],
  ["Eminent domain, tax and estate disputes", "A defined effective date and documented market record can support professionals addressing historical or current value questions involving a quota-license interest."],
  ["Commercial damages and transaction disputes", "License-specific research can help establish the market context for claimed loss, failed transfer, impaired collateral or disputed transaction value."],
  ["Attorney and expert support", "FLLM can organize Florida liquor-license market evidence for review by counsel, a retained appraiser or another expert who will provide the ultimate litigation opinion or testimony."],
];

const evidenceItems = [
  ["Subject-license identity", "License number, county, series, holder of record, status and available DBPR transfer history."],
  ["Same-county market evidence", "Current 3PS and 4COP offerings, with exact-series evidence identified separately and cross-series evidence explained rather than blended."],
  ["Verified transaction evidence", "Available recent sales, transfers, recorded transaction information and other market evidence appropriate to the assignment."],
  ["Historical market context", "Where the effective date is in the past, the analysis can distinguish then-current evidence from present asking prices and later market developments."],
  ["Liens and marketability", "Available lien or security-interest information, transfer restrictions and other facts that may affect marketability or the scope of the valuation analysis."],
  ["Reconciliation", "A documented explanation of how the available evidence supports the indicated market-value range or conclusion for the specific license and effective date."],
];

const faqs = [
  {
    question: "What is a Florida liquor license value expert witness?",
    answer:
      "A Florida liquor license value expert witness is a person qualified by the court to offer opinion testimony concerning the value, marketability or transfer economics of a Florida alcoholic-beverage license. Qualification depends on the witness's knowledge, skill, experience, training, education and the court's evidentiary rulings; it is not created simply by publishing a valuation report.",
  },
  {
    question: "Does FLLM automatically act as a court-qualified expert witness?",
    answer:
      "No. FLLM provides Florida liquor-license market research, license-specific valuation analysis and litigation support. FLLM does not represent that every report, analyst or engagement is USPAP-compliant, credentialed, court-qualified or admissible as expert testimony. Counsel should determine the required witness qualifications and scope for the specific matter.",
  },
  {
    question: "Can FLLM support a retained appraiser or testifying expert?",
    answer:
      "Yes. FLLM can organize subject-license information, DBPR research, county-specific 3PS and 4COP market evidence, available transaction history and other Florida quota-license market data for review by counsel or a separately retained credentialed appraiser or expert witness.",
  },
  {
    question: "Can FLLM value a 4COP or 3PS license for litigation?",
    answer:
      "FLLM can prepare a license-specific market valuation for a Florida 4COP or 3PS quota license using a defined effective date and county-specific evidence. Whether that work product satisfies a court, opposing party, insurer, lender or retained expert depends on the engagement and the receiving party's requirements.",
  },
  {
    question: "What is the difference between a market valuation and expert testimony?",
    answer:
      "A market valuation analyzes evidence and reaches a value conclusion for a defined subject and date. Expert testimony is evidence offered in a legal proceeding by a witness who must satisfy the applicable qualification and admissibility standards. One may support the other, but they are not the same thing.",
  },
];

export default function FloridaLiquorLicenseValueExpertWitnessPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Florida Liquor License Value Expert Witness and Litigation Valuation Support",
      description:
        "Florida quota liquor-license valuation and litigation-support information for 4COP and 3PS licenses, including county market evidence, DBPR research and expert-witness qualification distinctions.",
      datePublished: "2026-08-30",
      dateModified: "2026-08-30",
      mainEntityOfPage: canonicalUrl,
      author: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      about: [
        { "@type": "Thing", name: "Florida liquor license valuation" },
        { "@type": "Thing", name: "Expert witness litigation support" },
        { "@type": "Thing", name: "4COP quota liquor license" },
        { "@type": "Thing", name: "3PS quota liquor license" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Florida Liquor License Litigation Valuation Support",
      serviceType: "Florida liquor-license market valuation and litigation support",
      areaServed: { "@type": "State", name: "Florida" },
      provider: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      url: canonicalUrl,
      description:
        "License-specific market research and valuation support for attorneys, litigants, appraisers and other professionals evaluating Florida 4COP and 3PS quota-license value.",
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
        { "@type": "ListItem", position: 2, name: "Florida Liquor License Appraisal", item: `${siteUrl}/florida-liquor-license-appraisal` },
        { "@type": "ListItem", position: 3, name: "Value Expert Witness & Litigation Support", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="seo-market-page litigation-value-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <style>{`
        .litigation-value-page{background:#f6f7f8;color:#101923}
        .litigation-value-page .seo-market-hero{background:radial-gradient(circle at 82% 18%,rgba(212,157,32,.18),transparent 31%),linear-gradient(135deg,#020b12 0%,#07192a 57%,#0b2942 100%);border-top:1px solid rgba(212,157,32,.42);border-bottom:1px solid rgba(212,157,32,.48)}
        .litigation-value-page .seo-market-breadcrumbs,.litigation-value-page .seo-market-hero p{color:#d9e4ec}
        .litigation-value-page .seo-market-breadcrumbs a,.litigation-value-page .seo-market-kicker,.litigation-value-page .seo-market-section-kicker{color:#e1ad39}
        .litigation-value-page .seo-market-hero h1{color:#fff;text-shadow:0 3px 22px rgba(0,0,0,.42)}
        .litigation-panel{padding:24px;border:1px solid rgba(225,173,57,.48);border-radius:14px;background:#fff;box-shadow:0 20px 45px rgba(0,0,0,.22)}
        .litigation-panel strong{display:block;color:#081b2a;font-size:18px;line-height:1.4}
        .litigation-panel p{margin:10px 0 0!important;color:#526370!important;font-size:13px!important;line-height:1.65!important}
        .litigation-distinction{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:24px}
        .litigation-distinction article{padding:25px;border-radius:14px;box-shadow:0 12px 28px rgba(2,11,18,.12)}
        .litigation-distinction article:first-child{border:1px solid #d7dfe5;background:#fff}
        .litigation-distinction article:last-child{border:1px solid #d5a136;background:linear-gradient(145deg,#0a2237,#04111c);color:#d7e0e7}
        .litigation-distinction h3{margin:0 0 12px;font-size:22px}.litigation-distinction article:last-child h3{color:#fff}.litigation-distinction p{margin:0;line-height:1.7}
        .litigation-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:24px}
        .litigation-card{padding:23px;border:1px solid rgba(212,157,32,.3);border-radius:13px;background:#fff;box-shadow:0 10px 25px rgba(0,0,0,.08)}
        .litigation-card h3{margin:0 0 10px;color:#0a2942;font-size:19px}.litigation-card p{margin:0;line-height:1.65;color:#455864}
        .litigation-evidence{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:22px}
        .litigation-evidence article{padding:20px;border:1px solid rgba(212,157,32,.3);border-radius:12px;background:linear-gradient(145deg,#0a2237,#04111c);color:#cfd9df}
        .litigation-evidence h3{margin:0 0 8px;color:#fff;font-size:18px}.litigation-evidence p{margin:0;line-height:1.65}.litigation-evidence b{color:#e7b64a}
        .litigation-note{margin-top:22px;padding:18px 20px;border-left:4px solid #d9a12d;background:#fff3d6;color:#40515d;font-size:13px;line-height:1.7}
        .litigation-links{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}.litigation-links a{padding:12px 15px;border:1px solid #bf8a1e;border-radius:7px;color:#0a2942;background:#fff;font-weight:800;text-decoration:none}
        @media(max-width:820px){.litigation-distinction,.litigation-grid,.litigation-evidence{grid-template-columns:1fr}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/contact" primaryActionLabel="Discuss Litigation Support" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/florida-liquor-license-appraisal">Appraisal</Link><span>›</span><strong>Expert Witness & Litigation Support</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida 4COP & 3PS Litigation Valuation</span>
              <h1>Florida Liquor License Value Expert Witness and Litigation Valuation Support</h1>
              <p>
                FLLM provides license-specific Florida quota-license market research and valuation support for attorneys, litigants, appraisers and other professionals evaluating the value, marketability or transfer economics of a 4COP or 3PS license in litigation.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/contact">Discuss Litigation Support</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/florida-liquor-license-appraisal">Review FLLM Appraisal Methodology</Link>
              </div>
            </div>
            <aside className="litigation-panel">
              <strong>Market valuation is not automatically expert testimony.</strong>
              <p>
                Courts determine whether a witness is qualified and whether an opinion is admissible. FLLM does not represent that every report or analyst is USPAP-compliant, credentialed, court-qualified or admissible as an expert witness.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">The Critical Distinction</span>
          <h2>Liquor-license market valuation versus court-qualified expert testimony</h2>
          <div className="litigation-distinction">
            <article>
              <h3>FLLM market valuation and litigation support</h3>
              <p>FLLM can research the subject license, county market, 3PS and 4COP comparables, DBPR history, available transactions, liens, transfer conditions and other evidence relevant to a supported market-value conclusion.</p>
            </article>
            <article>
              <h3>Testifying expert or credentialed appraisal</h3>
              <p>A court, attorney, insurer, tax authority or opposing party may require a separately qualified expert, credentialed appraiser, USPAP-compliant assignment, deposition testimony or trial testimony. Those requirements should be determined before the engagement is scoped.</p>
            </article>
          </div>
          <p className="litigation-note"><strong>Practical use:</strong> FLLM can provide the Florida liquor-license market evidence and subject-matter research that counsel or a separately retained expert may use in evaluating a disputed license value. The ultimate litigation opinion, qualification and testimony remain engagement-specific.</p>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">Common Legal Contexts</span><h2>When Florida liquor-license value becomes a disputed issue</h2></div>
          </div>
          <div className="litigation-grid">
            {useCases.map(([title, text]) => (
              <article className="litigation-card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Evidence Framework</span>
          <h2>What a defensible Florida liquor-license valuation record may include</h2>
          <div className="litigation-evidence">
            {evidenceItems.map(([title, text], index) => (
              <article key={title}>
                <h3><b>{String(index + 1).padStart(2, "0")}</b> {title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="litigation-links">
            <Link href="/florida-liquor-license-value">Florida Liquor License Value</Link>
            <Link href="/florida-liquor-license-appraisal">Formal Appraisal</Link>
            <Link href="/florida-liquor-license-court-decisions">Florida Court Decisions</Link>
            <Link href="/resources/florida-liquor-license-laws">Florida Liquor License Laws</Link>
            <Link href="/resources/liquor-license-attorneys">Liquor License Attorneys</Link>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">Attorney & Expert Workflow</span><h2>Build the market record before deciding who must testify</h2></div>
          </div>
          <div className="litigation-grid">
            <article className="litigation-card"><h3>1. Define the issue</h3><p>Identify the subject license, county, series, effective date, legal issue and the specific value question the matter requires.</p></article>
            <article className="litigation-card"><h3>2. Assemble the evidence</h3><p>Collect DBPR records, ownership and transfer history, county-specific comparables, available transactions, liens and other market evidence.</p></article>
            <article className="litigation-card"><h3>3. Confirm witness requirements</h3><p>Determine whether counsel needs market research only, an FLLM valuation report, a separately credentialed appraiser, deposition testimony, trial testimony or another expert scope.</p></article>
          </div>
          <div className="seo-market-actions" style={{ marginTop: 24 }}>
            <Link className="seo-market-button seo-market-button-gold" href="/contact">Discuss a Litigation Matter</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/florida-liquor-license-appraisal">Order / Review Appraisal Options</Link>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Questions</span>
          <h2>Florida liquor-license value expert-witness FAQs</h2>
          <div className="litigation-grid">
            {faqs.map((faq) => (
              <article className="litigation-card" key={faq.question}>
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
