import type { Metadata } from "next";
import Link from "next/link";

import FormalLicenseAppraisalOrder from "@/components/FormalLicenseAppraisalOrder";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import { floridaCounties } from "@/data/florida-counties";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";
import "./appraisal-report.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-appraisal`;

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export const metadata: Metadata = {
  title: "Florida Liquor License Appraisal | 4COP & 3PS Valuation",
  description:
    "Order a license-specific Florida liquor license appraisal for lender, buyer, seller, legal or estate review, with DBPR research and same-county 3PS/4COP evidence.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Appraisal | 4COP & 3PS Valuation",
    description:
      "A license-specific Florida liquor license appraisal and market valuation report for lender, buyer, seller, legal, estate and fiduciary review.",
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

const reportEvidenceOrder = [
  ["Primary evidence", "Same-county listings and verified recent sales for the subject license series: 3PS for a 3PS subject or 4COP for a 4COP subject."],
  ["Cross-series quota evidence", "Same-county 3PS and 4COP listings and verified recent sales, shown in separate tables so package-store and consumption-on-premises evidence is not blended without explanation."],
  ["Conversion analysis", "The report evaluates whether the subject quota license may be changed or increased in series, the applicable DBPR application path, premises qualification, fees, timing and approval risk."],
  ["Reconciliation", "The indicated value explains the weight assigned to exact-series evidence, cross-series evidence and verified sale evidence, including any supported conversion adjustment."],
];

const appraisalServiceHighlights = [
  ["Lender and collateral review", "A defined intended use, effective date, subject-license verification, market evidence and a signed value reconciliation organized for bank or private-lender review."],
  ["Buyer, seller and fiduciary decisions", "License-specific support for purchase, sale, estate, legal, accounting and financial-reporting decisions when a general county estimate is not enough."],
  ["Signed electronic report delivery", "The completed report is delivered electronically as a signed PDF with applicable exhibits after the assignment scope and required subject records are complete."],
];

const requiredReportSections = [
  "Subject-license identity, county, current series, status and holder of record",
  "Effective valuation date, intended use and report assumptions",
  "DBPR record review, transfer history and available lien or security-interest information",
  "Same-county 3PS active asking-price comparables",
  "Same-county 4COP active asking-price comparables",
  "Verified same-county recent 3PS and 4COP sales or transfers, when available",
  "Quota-series conversion analysis and supported conversion-cost or timing adjustment",
  "Reconciled indicated market-value range and conclusion",
  "Analyst identity, signature, independence statement, assumptions and limiting conditions",
  "Regulatory exhibit displaying page 1 of DBPR ABT-6014",
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
      "No. The free estimator and $195 preliminary market report are separate market-guidance products. The $995 FLLM formal appraisal is a distinct subject-license assignment with a defined intended use, broader evidence, exhibits and a signed value reconciliation.",
  },
  {
    question: "What information may a liquor-license appraiser review?",
    answer:
      "The analysis may include the county, license series, license number, ownership, status, comparable market evidence, transaction history, liens or security interests, market conditions and the purpose and effective date of the appraisal.",
  },
  {
    question: "Should a 3PS appraisal consider 4COP quota-license evidence?",
    answer:
      "Yes, when the licenses are in the same county and the report explains the series difference. Exact 3PS evidence remains primary for a 3PS subject, but same-county 4COP offerings and verified recent sales may provide relevant secondary quota-market evidence because a series change or increase may be requested through DBPR. The reverse analysis also applies to a 4COP subject.",
  },
  {
    question: "Can a lender or bank use the FLLM formal appraisal?",
    answer:
      "The report is designed for lender and professional review and can be submitted for underwriting or collateral analysis. The receiving institution makes the final decision on acceptance and may require a particular appraiser credential, reliance statement, format or additional scope. Those requirements should be confirmed before ordering whenever possible.",
  },
  {
    question: "Where can I check current asking-price evidence instead?",
    answer:
      "Use the FLLM Florida Liquor License Value page for current county-specific asking-price guidance and the Listings page to review active marketplace inventory. Those tools are useful market references but do not replace a formal appraisal when one is required.",
  },
];

export default async function FloridaLiquorLicenseAppraisalPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const requestedCounty = firstParam(query.county);
  const requestedLicenseType = firstParam(query.license_type);
  const initialCounty = floridaCounties.some((county) => county.name === requestedCounty) ? requestedCounty : "";
  const initialLicenseType = ["4COP Quota", "3PS Quota / Package Store"].includes(requestedLicenseType)
    ? requestedLicenseType
    : "";
  const initialLicenseNumber = firstParam(query.license_number).slice(0, 80);
  const initialHolder = firstParam(query.current_holder_of_record).slice(0, 180);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Florida Liquor License Appraisal and Valuation Report",
      url: canonicalUrl,
      description:
        "Florida liquor license appraisal and valuation information for 4COP and 3PS quota licenses, including county comparables, DBPR research, transaction evidence and value reconciliation.",
      datePublished: "2026-08-22",
      dateModified: "2026-08-25",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
      about: { "@type": "Thing", name: "Florida liquor license appraisal" },
      mainEntityOfPage: canonicalUrl,
      author: { "@type": "Organization", name: "Florida Liquor License Market" },
      publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Florida Liquor License Appraisal and Market Valuation Report",
      description:
        "A license-specific Florida 3PS or 4COP quota liquor-license appraisal and market valuation report with DBPR research, same-county market evidence and a signed value reconciliation.",
      serviceType: "Florida quota liquor license appraisal and market valuation",
      areaServed: { "@type": "State", name: "Florida" },
      provider: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      url: canonicalUrl,
      offers: {
        "@type": "Offer",
        price: "995",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${canonicalUrl}#order-form`,
      },
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
    <main className="seo-market-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="#order-form" primaryActionLabel="Order Appraisal" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/florida-liquor-license-value">License Value</Link><span>›</span><strong>Formal Appraisal</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">License-Specific Valuation</span>
              <h1>Florida Liquor License Appraisal and Market Valuation Reports</h1>
              <p>
                FLLM can prepare a detailed market valuation for a specific Florida 3PS or 4COP quota license using DBPR research, same-county cross-series evidence, available recent transactions, regulatory conversion analysis and a reconciled value conclusion.
              </p>
              <div className="seo-market-actions">
                <a className="seo-market-button seo-market-button-gold" href="#order-form">Order Formal Appraisal — $995</a>
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
            <h2>FLLM valuation report versus a credentialed appraisal</h2>
            <p>
              FLLM’s paid report is a formal, license-specific market valuation in its research, organization and value reconciliation. It is not represented as a USPAP-certified or credentialed independent appraisal. A lender, court, estate, tax authority or auditor may impose separate appraiser-qualification or scope requirements.
            </p>
          </article>
          <aside className="seo-market-callout">
            <strong>Use the right page for the right question</strong>
            <ul>
              <li>“What is my specific license worth?” → order the FLLM valuation report.</li>
              <li>“What licenses are currently for sale?” → use Listings.</li>
              <li>“Does a third party require a credential?” → confirm its appraisal requirements before ordering.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="appraisal-service-path" aria-labelledby="appraisal-service-path-title">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Decision-Ready License Analysis</span>
          <h2 id="appraisal-service-path-title">When a county estimate is not enough</h2>
          <p className="appraisal-service-path-lead">
            A general asking-price range can help orient a transaction. A formal assignment goes further by identifying one subject license, one intended use and one effective date, then reconciling the evidence into a signed conclusion.
          </p>
          <div className="appraisal-service-path-grid">
            {appraisalServiceHighlights.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="appraisal-market-examples">
            <strong>Review county-level evidence that supports the appraisal process:</strong>
            <Link href="/counties/hillsborough-county/liquor-license-value">Hillsborough County</Link>
            <Link href="/counties/orange-county/liquor-license-value">Orange County</Link>
            <Link href="/counties/osceola-county/liquor-license-value">Osceola County</Link>
          </div>
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

      <section className="appraisal-standard">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">FLLM Report Standard</span>
          <h2>Cross-series valuation for a specific 3PS or 4COP quota license</h2>
          <p className="appraisal-standard-lead">
            An FLLM license-specific valuation report should not conclude that a subject has no useful market evidence merely because no exact-series listing is currently advertised. It should analyze both quota series within the subject county, while preserving the distinction between asking prices and verified closed transactions.
          </p>

          <div className="appraisal-evidence-grid">
            {reportEvidenceOrder.map(([title, text], index) => (
              <article key={title}>
                <span>{index + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>

          <div className="appraisal-report-outline">
            <div>
              <span className="seo-market-section-kicker">Required Report Contents</span>
              <h3>What the completed report should contain</h3>
              <ol>
                {requiredReportSections.map((section) => <li key={section}>{section}</li>)}
              </ol>
            </div>
            <aside>
              <strong>Important terminology</strong>
              <p>
                The quota package-store series is <b>3PS</b>, not “3COP.” A 3PS-to-4COP request is not completed merely by checking a box. The form initiates a DBPR review; approval, premises qualification and applicable supporting documents and fees remain required.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="appraisal-regulatory-exhibit">
        <div className="seo-market-shell">
          <div className="appraisal-exhibit-heading">
            <div>
              <span className="seo-market-section-kicker">Regulatory Exhibit</span>
              <h2>DBPR ABT-6014 — page 1</h2>
              <p>
                The completed appraisal should reproduce this page as an exhibit when a same-owner change or increase in series is relevant. The narrative must explain that ABT-6014 is an application for DBPR approval—not an automatic conversion.
              </p>
            </div>
            <a href="/abt-forms/abt-6014.pdf" target="_blank" rel="noreferrer">Open official form</a>
          </div>
          <div className="appraisal-pdf-frame">
            <iframe
              title="Page 1 of DBPR ABT-6014 change of location or series application"
              src="/abt-forms/abt-6014.pdf#page=1&view=FitH&toolbar=0&navpanes=0"
            />
          </div>
          <p className="appraisal-exhibit-note">
            If ownership is transferred at the same time, the report should also address ABT-6002 and identify the transfer-of-ownership and increase/change-in-series request as separate approval components.
          </p>
        </div>
      </section>

      <FormalLicenseAppraisalOrder
        initialCounty={initialCounty}
        initialLicenseType={initialLicenseType}
        initialLicenseNumber={initialLicenseNumber}
        initialHolder={initialHolder}
      />

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
            <p>Choose the $195 preliminary market report for general guidance or the separate $995 formal appraisal for a lender-oriented, license-specific valuation assignment.</p>
          </div>
          <div className="seo-market-actions">
            <a className="seo-market-button seo-market-button-gold" href="#order-form">Order Formal Appraisal</a>
            <Link className="seo-market-button seo-market-button-dark" href="/listings">Browse Listings</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
