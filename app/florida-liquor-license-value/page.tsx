import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import LiquorLicenseValueEstimator from "@/components/LiquorLicenseValueEstimator";
import "@/app/resources/forms/abt-forms.css";
import "./value-page.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-value`;

export const metadata: Metadata = {
  title: "How Much Is My Florida Liquor License Worth? | Market Value Guide",
  description:
    "Estimate a Florida 4COP or 3PS liquor license using current asking-price comparables by county. See the low, median and high disclosed asking prices in the FLLM marketplace.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "How Much Is My Florida Liquor License Worth?",
    description: "Compare current Florida quota liquor-license asking prices by county and license type.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Much Is My Florida Liquor License Worth?",
    description: "Check current Florida 4COP and 3PS asking-price comparables by county.",
  },
};

const faqs = [
  {
    question: "How much is my Florida liquor license worth?",
    answer:
      "A Florida quota liquor license does not have one statewide market value. Pricing can differ materially by county, license type, supply, active asking prices, seller timing, transaction structure and current buyer demand. The FLLM estimator compares disclosed asking prices for active marketplace listings in the selected county and license category.",
  },
  {
    question: "Is the FLLM estimate an appraisal?",
    answer:
      "No. The tool is market pricing guidance based on advertised asking prices for active marketplace listings. It is not an appraisal, broker price opinion, verified closed-sale report or guarantee of the price a license will sell for.",
  },
  {
    question: "Why does Florida liquor license value vary by county?",
    answer:
      "Quota licenses are county-specific and their open-market prices are influenced by local supply and demand. Florida does not set the open-market purchase price for an existing quota license.",
  },
  {
    question: "Can I list my license after checking the market?",
    answer:
      "Yes. Florida Liquor License Market provides self-directed and broker-assisted listing paths for Florida quota-license sellers.",
  },
];

export default function FloridaLiquorLicenseValuePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "How Much Is My Florida Liquor License Worth?",
      url: canonicalUrl,
      description: "Florida liquor-license market pricing guidance using active asking-price comparables by county and license type.",
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
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Florida Liquor License Value", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="license-value-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="Sell Your License" />
      </div>

      <section className="value-hero">
        <div className="page-shell">
          <nav className="value-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><strong>Florida Liquor License Value</strong>
          </nav>
          <span className="value-eyebrow">Florida Quota License Market Data</span>
          <h1>How Much Is My Florida Liquor License Worth?</h1>
          <p>
            Start with the market evidence. Select a Florida county and a 4COP or 3PS quota-license type to compare current disclosed asking prices in the FLLM marketplace.
          </p>
          <div className="value-hero-actions">
            <a href="#estimate">Check My License Market</a>
            <Link href="/sell-your-license">Sell or List My License</Link>
          </div>
        </div>
      </section>

      <section className="value-explainer page-shell">
        <article>
          <span>What the tool measures</span>
          <h2>Current asking-price comparables—not a made-up statewide number</h2>
          <p>
            Florida quota-license prices can vary sharply from one county to another. FLLM uses the active marketplace inventory it has available for the selected county and license type, then reports the number of disclosed comparables together with the low, median and high asking prices.
          </p>
        </article>
        <aside>
          <strong>Important distinction</strong>
          <p>Advertised asking price is not the same thing as a verified closing price. This page provides market pricing guidance, not an appraisal or guarantee of value.</p>
        </aside>
      </section>

      <div id="estimate" className="value-estimator-wrap">
        <LiquorLicenseValueEstimator />
      </div>

      <section className="value-factors page-shell">
        <div className="value-heading">
          <span>What affects price?</span>
          <h2>Why two Florida liquor licenses can have very different market values</h2>
        </div>
        <div className="value-factor-grid">
          <article><strong>County</strong><p>Quota licenses are county-specific, so local supply and buyer demand matter.</p></article>
          <article><strong>License type</strong><p>A 4COP on-premise/full-liquor opportunity and a 3PS package-store opportunity serve different buyer needs.</p></article>
          <article><strong>Current inventory</strong><p>The number of competing licenses being marketed—and their asking prices—can influence seller expectations.</p></article>
          <article><strong>Timing and terms</strong><p>Seller urgency, financing, deposits, closing conditions and transaction structure can affect the negotiated result.</p></article>
        </div>
      </section>

      <section className="value-market-links">
        <div className="page-shell">
          <span>Compare the Florida market</span>
          <h2>Go from an estimate to live opportunities</h2>
          <div className="value-link-grid">
            <Link href="/florida-liquor-licenses-for-sale"><strong>Florida Liquor Licenses for Sale</strong><small>Browse current statewide inventory</small></Link>
            <Link href="/florida-4cop-liquor-license-for-sale"><strong>Florida 4COP Licenses for Sale</strong><small>Compare current 4COP opportunities</small></Link>
            <Link href="/florida-3ps-liquor-license-for-sale"><strong>Florida 3PS Licenses for Sale</strong><small>Compare package-store opportunities</small></Link>
            <Link href="/counties"><strong>Florida Liquor Licenses by County</strong><small>Open a county-specific market page</small></Link>
          </div>
        </div>
      </section>

      <section className="value-faq page-shell">
        <div className="value-heading"><span>Seller Questions</span><h2>Florida liquor license value FAQs</h2></div>
        <div className="value-faq-grid">
          {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      <section className="value-final-cta">
        <div className="page-shell">
          <div><span>Ready to test the market?</span><h2>Put your Florida liquor license in front of buyers</h2><p>Choose a self-directed marketplace listing or request broker-assisted marketing.</p></div>
          <Link href="/sell-your-license">Sell or List My Florida Liquor License</Link>
        </div>
      </section>
    </main>
  );
}
