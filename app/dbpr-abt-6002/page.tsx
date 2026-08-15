import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/dbpr-abt-6002`;

export const metadata: Metadata = {
  title: "DBPR ABT-6002 | Florida Liquor License Transfer Form & Guide",
  description:
    "DBPR ABT-6002 guide for transferring ownership of a Florida alcoholic beverage license. Learn when the form is used, open the official form workspace, review seller and buyer steps, and find related transfer resources.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "DBPR ABT-6002 | Florida Liquor License Transfer Form & Guide",
    description:
      "Florida ABT-6002 transfer-of-ownership guide with official-form access and related liquor-license transfer resources.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "What is DBPR ABT-6002?",
    answer:
      "DBPR ABT-6002 is Florida's Application for Transfer of Ownership used in connection with transferring ownership of an existing alcoholic beverage license. The Florida Division of Alcoholic Beverages and Tobacco publishes the official form and instructions.",
  },
  {
    question: "Is ABT-6002 used for a Florida quota liquor license sale?",
    answer:
      "A transfer of ownership of an existing Florida alcoholic beverage license uses the ABT-6002 process. DBPR's forms guidance also identifies ABT-6002 as the form used to place a quota liquor license into escrow when the license is not in a location. The exact filing package depends on the transaction.",
  },
  {
    question: "Who completes ABT-6002 in a liquor license transfer?",
    answer:
      "The transfer application contains information and certifications relevant to the applicant and the existing license. Buyers and sellers should review the official instructions and transaction requirements carefully and obtain professional advice when appropriate.",
  },
  {
    question: "Where can I get the official ABT-6002 form?",
    answer:
      "FLLM provides a guided workspace that loads the current official DBPR/ABT PDF, and this page also links directly to the Florida DBPR transfer checklist and official form source.",
  },
];

export default function DbprAbt6002GuidePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "DBPR ABT-6002 Florida Liquor License Transfer Form & Guide",
      url: canonicalUrl,
      description:
        "Guide to Florida DBPR ABT-6002 for transfer of ownership of an existing alcoholic beverage license, with official-form access and related seller resources.",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
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
    <main className="seo-market-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <style>{`
        .abt6002-step-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:20px}
        .abt6002-step{padding:20px;border:1px solid rgba(237,169,26,.28);border-radius:12px;background:#071d33}
        .abt6002-step b{display:grid;place-items:center;width:30px;height:30px;margin-bottom:12px;border-radius:50%;background:#eda91a;color:#071d33}
        .abt6002-step strong{display:block;color:#fff}.abt6002-step p{margin:7px 0 0;color:#9fb2c4;font-size:13px;line-height:1.55}
        .abt6002-links{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:20px}
        .abt6002-links a{padding:18px;border:1px solid rgba(237,169,26,.32);border-radius:11px;background:#071d33;color:#f6f3ed;text-decoration:none;font-weight:800}
        .abt6002-links a span{display:block;margin-top:6px;color:#9fb2c4;font-size:12px;font-weight:500;line-height:1.45}
        @media(max-width:760px){.abt6002-step-grid,.abt6002-links{grid-template-columns:1fr}}
      `}</style>

      <div className="abt-header-wrap"><FormsSiteHeader /></div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/resources/forms">Florida ABT Forms</Link><span>›</span><strong>ABT-6002</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Liquor License Transfer Resource</span>
              <h1>DBPR ABT-6002: Florida Liquor License Transfer Form & Guide</h1>
              <p>
                DBPR ABT-6002 is the Florida transfer-of-ownership application used when ownership of an existing alcoholic beverage license is being transferred. Use this guide to understand where the form fits in a Florida liquor-license transaction and then open FLLM’s guided workspace for the current official PDF.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/resources/forms/abt-6002">Open ABT-6002 Form Workspace</Link>
                <a className="seo-market-button seo-market-button-dark" href="https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=13356&clientCode=4008&xactCode=1060" target="_blank" rel="noreferrer">Official DBPR Transfer Checklist ↗</a>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="ABT-6002 quick facts">
              <span>ABT-6002 Quick Facts</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>6002</strong><small>DBPR/ABT form number</small></div>
                <div><strong>Transfer</strong><small>ownership of existing license</small></div>
                <div><strong>Quota</strong><small>also referenced by DBPR for escrow use</small></div>
                <div><strong>Official PDF</strong><small>available in FLLM workspace</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell seo-market-intro-grid">
          <article>
            <span className="seo-market-section-kicker">What the Form Does</span>
            <h2>When is DBPR ABT-6002 used?</h2>
            <p>
              Florida DBPR’s transfer-of-ownership checklist identifies <strong>DBPR ABT-6002</strong> as the application for transferring ownership of an existing alcoholic beverage license. DBPR’s Alcoholic Beverages & Tobacco forms page also states that ABT-6002 is used to place a quota liquor license into escrow when the license is not in a location.
            </p>
            <p>
              That makes ABT-6002 directly relevant to many Florida 4COP and 3PS quota-license purchases and sales. The actual filing package can include additional information, supporting documents, fees, fingerprints or other requirements depending on the applicant and transaction, so the official instructions should control.
            </p>
          </article>
          <aside className="seo-market-callout">
            <strong>Official sources</strong>
            <ul>
              <li><a href="https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=13356&clientCode=4008&xactCode=1060" target="_blank" rel="noreferrer">DBPR transfer-of-ownership checklist ↗</a></li>
              <li><a href="https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/forms-and-publications/" target="_blank" rel="noreferrer">ABT Forms & Publications ↗</a></li>
              <li><a href="https://www2.myfloridalicense.com/abt/forms/documents/abt-6002formonly.pdf" target="_blank" rel="noreferrer">Official ABT-6002 PDF ↗</a></li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">Transaction Roadmap</span><h2>Where ABT-6002 fits in a Florida liquor license sale</h2></div></div>
          <div className="abt6002-step-grid">
            <article className="abt6002-step"><b>1</b><strong>Agree on the transaction</strong><p>Buyer and seller identify the license, county, purchase terms, timing and any conditions that apply to the proposed transfer.</p></article>
            <article className="abt6002-step"><b>2</b><strong>Prepare the transfer filing</strong><p>Use the current official ABT-6002 instructions and assemble the applicant information, disclosures and supporting materials required for the transaction.</p></article>
            <article className="abt6002-step"><b>3</b><strong>Submit and complete approval</strong><p>File with the Division, respond to any additional requirements and coordinate closing or escrow terms with the appropriate professionals.</p></article>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Related Seller & Transfer Tools</span>
          <h2>Continue your Florida liquor-license transaction</h2>
          <div className="abt6002-links">
            <Link href="/sell-your-license">Sell My Florida Liquor License<span>Start a self-directed listing or request broker-assisted selling support.</span></Link>
            <Link href="/florida-quota-liquor-license-cost">Florida Quota License Cost by County<span>Compare current 4COP and 3PS asking-price data before setting or evaluating a price.</span></Link>
            <Link href="/resources/quota-transfer-fee-calculator">Quota Transfer Fee Calculator<span>Estimate the statutory quota transfer fee using FLLM’s calculator.</span></Link>
            <Link href="/resources/forms/abt-6002">Complete ABT-6002 Online<span>Open the guided FLLM workspace for the current official transfer form.</span></Link>
          </div>
        </div>
      </section>

      <section className="seo-market-faq">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">ABT-6002 Questions</span><h2>Florida liquor license transfer form FAQ</h2></div></div>
          <div className="seo-market-faq-list">
            {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="seo-market-cta">
        <div className="seo-market-shell seo-market-cta-inner">
          <div><span className="seo-market-section-kicker">Ready to Prepare the Form?</span><h2>Open the current ABT-6002 workspace.</h2><p>FLLM’s form tool loads the official PDF for guided preparation, review, download and printing. FLLM is not DBPR and does not provide legal advice.</p></div>
          <div className="seo-market-actions"><Link className="seo-market-button seo-market-button-gold" href="/resources/forms/abt-6002">Open ABT-6002</Link><Link className="seo-market-button seo-market-button-dark" href="/resources/forms">All Florida ABT Forms</Link></div>
        </div>
      </section>
    </main>
  );
}
