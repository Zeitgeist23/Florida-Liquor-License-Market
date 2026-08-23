import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import LiquorLicenseValueEstimator from "@/components/LiquorLicenseValueEstimator";
import { countyValuationGuideHref, countyValuationGuideSlugs } from "@/data/county-valuation-guides";
import { getCountyBySlug } from "@/data/florida-counties";
import "@/app/resources/forms/abt-forms.css";
import "./value-page.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-value`;
const majorCountyValueGuides = countyValuationGuideSlugs
  .map((slug) => getCountyBySlug(slug))
  .filter((county): county is NonNullable<typeof county> => Boolean(county));

export const metadata: Metadata = {
  title: "Florida Liquor License Value | How Much Is My License Worth?",
  description:
    "Estimate the current Florida liquor license value for a 4COP or 3PS quota license using county-specific disclosed asking-price comparables from FLLM.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Value | How Much Is My License Worth?",
    description: "Estimate a Florida quota liquor-license market range using current county-specific asking-price comparables.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "How much is my Florida liquor license worth?",
    answer:
      "There is no single statewide value. Florida quota-license pricing varies by county, license type, current supply, buyer demand, seller timing and transaction terms. FLLM uses disclosed active asking-price comparables to provide a current market range.",
  },
  {
    question: "Is the FLLM market estimate a formal appraisal?",
    answer:
      "No. The free estimate and $195 preliminary market report are not formal appraisals. FLLM separately offers a $995 lender-oriented quota-license appraisal with subject-license research, same-county 3PS and 4COP evidence, available verified recent sales, regulatory conversion analysis, exhibits and a reconciled value conclusion. The receiving institution determines its acceptance and credential requirements.",
  },
  {
    question: "Why does liquor-license value vary by Florida county?",
    answer:
      "Quota licenses are county-specific, so supply and buyer demand differ from one county to another. County-level comparables are therefore more useful than a single statewide number.",
  },
];

export default function FloridaLiquorLicenseValuePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Florida Liquor License Value: How Much Is My License Worth?",
      url: canonicalUrl,
      description: "Florida liquor-license market pricing guidance using current asking-price comparables by county and license type.",
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
    <main className="license-value-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="List Your License" />
      </div>

      <section className="value-hero">
        <div className="page-shell">
          <nav className="value-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><strong>Florida Liquor License Value</strong>
          </nav>
          <span className="value-eyebrow">Florida Quota License Market Value</span>
          <h1>Florida Liquor License Value: How Much Is My License Worth?</h1>
          <p>
            Estimate a current market range from disclosed asking-price comparables for the same Florida county and quota-license category.
          </p>
          <div className="value-hero-actions">
            <a href="#estimate">Calculate My Market Range</a>
            <Link href="/listings">Browse Current Listings</Link>
          </div>
        </div>
      </section>

      <section className="value-explainer page-shell">
        <article>
          <span>What this page owns</span>
          <h2>Current market value and “what is my license worth?”</h2>
          <p>
            FLLM compares current disclosed asking prices by county and license type. Asking prices are marketplace evidence, not verified closing prices, and the result is guidance rather than a guaranteed valuation.
          </p>
        </article>
        <aside>
          <strong>Need a lender-oriented formal appraisal?</strong>
          <p>The separate $995 FLLM appraisal covers one identified license, same-county 3PS and 4COP market evidence, available verified recent transactions, conversion analysis and supporting exhibits.</p>
          <Link href="/florida-liquor-license-appraisal#order-form">Review or order the formal appraisal →</Link>
        </aside>
      </section>

      <div id="estimate" className="value-estimator-wrap">
        <LiquorLicenseValueEstimator />
      </div>

      <section className="value-market-links">
        <div className="page-shell">
          <span>Related market pages</span>
          <h2>Compare current Florida liquor-license opportunities</h2>
          <div className="value-link-grid">
            <Link href="/listings"><strong>Florida Liquor Licenses for Sale</strong><small>Browse current statewide marketplace inventory</small></Link>
            <Link href="/florida-4cop-liquor-license-for-sale"><strong>Florida 4COP Licenses for Sale</strong><small>Compare current 4COP opportunities</small></Link>
            <Link href="/florida-3ps-liquor-license-for-sale"><strong>Florida 3PS Licenses for Sale</strong><small>Compare current package-store opportunities</small></Link>
            <Link href="/counties"><strong>Florida Liquor Licenses by County</strong><small>Browse all 67 county markets and current data</small></Link>
            <Link href="/florida-liquor-license-appraisal"><strong>Formal Appraisal — $995</strong><small>Order a separate lender-oriented, license-specific valuation</small></Link>
          </div>
        </div>
      </section>

      <section className="value-county-guides page-shell">
        <div className="value-heading">
          <span>County Value Guides</span>
          <h2>Liquor-license value evidence in major Florida counties</h2>
          <p>Open a county-specific guide for disclosed asking-price ranges and current comparable listings.</p>
        </div>
        <div className="value-county-guide-grid">
          {majorCountyValueGuides.map((county) => (
            <Link key={county.slug} href={countyValuationGuideHref(county.slug)}>
              <strong>{county.name}</strong>
              <span>{county.primaryCities.slice(0, 3).join(" · ")}</span>
              <small>View current value evidence ›</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="value-faq page-shell">
        <div className="value-heading"><span>Market Value Questions</span><h2>Florida liquor-license value FAQs</h2></div>
        <div className="value-faq-grid">
          {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      <section className="value-final-cta">
        <div className="page-shell">
          <div><span>Ready to test the market?</span><h2>List your Florida liquor license for sale</h2><p>Use current market evidence as a starting point, then create a self-directed listing or request broker-assisted support.</p></div>
          <Link href="/sell-your-license">List My Florida Liquor License</Link>
        </div>
      </section>
    </main>
  );
}
