import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-appraisal`;

export const metadata: Metadata = {
  title: "Formal Florida Liquor License Appraisal Guide | When One Is Needed",
  description:
    "Learn when a lender, court, estate, tax matter or financial report may require a formal Florida liquor license appraisal, what information an appraiser may review, and how a formal appraisal differs from FLLM market pricing guidance.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "Formal Florida Liquor License Appraisal Guide",
    description:
      "Understand when an independent formal liquor-license appraisal may be required and how it differs from marketplace asking-price guidance.",
    siteName: "Florida Liquor License Market",
  },
};

const appraisalInputs = [
  ["Purpose and effective date", "A formal appraisal is prepared for a defined purpose and valuation date, such as underwriting, litigation, estate administration, tax reporting or financial reporting."],
  ["Exact county and license series", "Florida quota-license markets are county-specific. The appraiser should identify the exact license category, series and county before evaluating market evidence."],
  ["Verified market evidence", "A formal assignment may consider verified transaction evidence, current offerings, historical sales, market conditions and other support appropriate to the appraisal methodology."],
  ["License status and ownership", "Active, inactive, escrowed or pending-transfer status, ownership, liens and security interests may affect the analysis or due-diligence scope."],
  ["Transaction and regulatory conditions", "Transfer restrictions, intended use, premises considerations and other transaction-specific conditions may be relevant to the valuation assignment."],
];

const faqs = [
  {
    question: "When might I need a formal Florida liquor license appraisal?",
    answer:
      "A bank, private lender, court, estate, tax professional, accountant, auditor or other third party may require an independent appraisal prepared for a specific purpose and effective date. The required credentials, scope and methodology depend on the requesting party and the assignment.",
  },
  {
    question: "Is the FLLM market-value estimator a formal appraisal?",
    answer:
      "No. FLLM market pricing guidance uses disclosed asking-price comparables and marketplace information. It is not a certified appraisal, USPAP appraisal, broker price opinion, verified closed-sale report or guarantee of value.",
  },
  {
    question: "What information may a liquor-license appraiser review?",
    answer:
      "The analysis may include the county, license series, license number, ownership, status, comparable market evidence, transaction history, liens or security interests, market conditions and the purpose and effective date of the appraisal.",
  },
  {
    question: "Where can I check current asking-price evidence instead?",
    answer:
      "Use the FLLM Florida Liquor License Value page for current county-specific asking-price guidance and the Listings page to review active marketplace inventory. Those tools are useful market references but do not replace a formal appraisal when one is required.",
  },
];

export default function FloridaLiquorLicenseAppraisalPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Formal Florida Liquor License Appraisal Guide",
      description:
        "A guide to when an independent formal Florida liquor-license appraisal may be required and the information commonly considered in the assignment.",
      datePublished: "2026-08-22",
      dateModified: "2026-08-23",
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
        { "@type": "ListItem", position: 3, name: "Formal Appraisal Guide", item: canonicalUrl },
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
        <FormsSiteHeader primaryActionHref="/florida-liquor-license-value" primaryActionLabel="Check Market Value" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/florida-liquor-license-value">License Value</Link><span>›</span><strong>Formal Appraisal</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Independent Formal Valuation</span>
              <h1>When a Formal Florida Liquor License Appraisal May Be Needed</h1>
              <p>
                A marketplace estimate and a formal appraisal serve different purposes. This guide explains when a lender, court, estate, tax matter or financial-reporting assignment may require an independent appraisal and what information may be considered.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/florida-liquor-license-value">Check Current Market Value</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/listings">View Current Listings</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Formal appraisal use cases">
              <span>Common Formal Uses</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>1</strong><small>loan underwriting</small></div>
                <div><strong>2</strong><small>litigation</small></div>
                <div><strong>3</strong><small>estate or tax</small></div>
                <div><strong>4</strong><small>financial reporting</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell seo-market-intro-grid">
          <article>
            <span className="seo-market-section-kicker">Key Distinction</span>
            <h2>Market pricing guidance is not a formal appraisal</h2>
            <p>
              FLLM can show active asking-price evidence and county-specific marketplace data. That information can help a buyer or seller understand the current market, but a third party may require an independent appraisal prepared under its own standards, credentials and scope requirements.
            </p>
          </article>
          <aside className="seo-market-callout">
            <strong>Use the right page for the right question</strong>
            <ul>
              <li>“What is my license worth?” → use the FLLM market-value page.</li>
              <li>“What licenses are currently for sale?” → use Listings.</li>
              <li>“Do I need an independent formal appraisal?” → use this guide.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="seo-market-guide">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Formal Appraisal Inputs</span>
          <h2>Information commonly relevant to an appraisal assignment</h2>
          <div className="seo-market-guide-grid">
            {appraisalInputs.map(([title, text], index) => (
              <article className="seo-market-guide-card" key={title}>
                <span>{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-market-faq">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Formal Appraisal Questions</span>
          <h2>Florida liquor license appraisal FAQs</h2>
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
            <h2>Need current marketplace evidence first?</h2>
            <p>Check county-specific asking-price comparables or browse current Florida liquor-license inventory.</p>
          </div>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/florida-liquor-license-value">Check Market Value</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/listings">Browse Listings</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
