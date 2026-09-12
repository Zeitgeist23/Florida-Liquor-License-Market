import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "./seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/listings`;

export const metadata: Metadata = {
  title: "Florida Liquor License for Sale | 4COP & 3PS Licenses | FLLM",
  description:
    "Find Florida liquor licenses for sale through FLLM. Explore statewide 4COP quota and 3PS opportunities, county market pages, financing, appraisals and confidential transaction resources.",
  alternates: { canonical: canonicalUrl },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License for Sale | 4COP & 3PS | FLLM",
    description:
      "Explore Florida 4COP quota and 3PS liquor licenses for sale, county markets, financing and transaction resources on Florida Liquor License Market.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Liquor License for Sale | FLLM",
    description:
      "Explore Florida 4COP quota and 3PS liquor licenses for sale, county markets, financing and transaction resources.",
  },
};

const faqs = [
  {
    question: "Where can I find a Florida liquor license for sale?",
    answer:
      "Florida Liquor License Market provides a statewide marketplace for transferable Florida liquor-license opportunities, including 4COP quota and 3PS package-store licenses. Buyers can browse the live marketplace and then use county market pages, financing, appraisal and transaction resources for additional research.",
  },
  {
    question: "Are Florida quota liquor licenses county-specific?",
    answer:
      "Yes. Florida quota liquor licenses are county-specific. Buyers should confirm the intended county, license series, proposed premises, zoning and applicable DBPR/ABT requirements before committing to a transaction.",
  },
  {
    question: "What is the difference between a 4COP quota license and a 3PS license?",
    answer:
      "A 4COP quota license generally permits beer, wine and spirits sales for on-premises consumption and package sales, subject to the licensed operation. A 3PS license is generally used for package-store sales for off-premises consumption. A 3PS quota license may be eligible to upgrade to a 4COP quota series subject to regulatory, premises and zoning approvals.",
  },
  {
    question: "Can a Florida liquor license purchase be financed?",
    answer:
      "Some Florida quota-license purchases and refinances may qualify for private or other transaction financing depending on license value, county, borrower qualifications, equity, collateral and lender underwriting.",
  },
];

export default function FloridaLiquorLicensesForSalePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Florida Liquor Licenses for Sale",
      url: canonicalUrl,
      description:
        "Statewide Florida 4COP quota and 3PS liquor-license marketplace, county market pages and transaction resources.",
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
      about: {
        "@type": "Thing",
        name: "Florida liquor licenses for sale",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Florida Liquor Licenses for Sale",
          item: canonicalUrl,
        },
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
    <main className="seo-market-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />

      <div className="abt-header-wrap">
        <FormsSiteHeader
          primaryActionHref="/sell-your-license"
          primaryActionLabel="List Your License"
        />
      </div>

      <section className="seo-market-hero">
        <div className="page-shell">
          <nav className="seo-market-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><strong>Florida Liquor Licenses for Sale</strong>
          </nav>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Statewide Liquor License Marketplace</span>
              <h1>Florida Liquor Licenses for Sale</h1>
              <p>
                Florida Liquor License Market brings together statewide <strong>4COP quota</strong> and <strong>3PS</strong> liquor-license opportunities with county market data, financing, appraisals and transaction resources. The live Listings page is FLLM&apos;s primary statewide marketplace for current inventory.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/listings">Browse Current Florida Liquor Licenses for Sale</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/license-alerts">Create a License Alert</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Florida liquor license market overview">
              <span>Statewide Market</span>
              <strong>4COP + 3PS</strong>
              <p>Search by county, compare current asking prices and move directly into financing, valuation and transaction resources.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-content">
        <div className="page-shell">
          <div className="seo-market-section-heading">
            <span>Primary Marketplace</span>
            <h2>Use the live Listings page for current Florida liquor licenses for sale</h2>
            <p>FLLM concentrates current inventory, listing filters and buyer actions on the Listings page so statewide search authority and buyer activity point to one primary marketplace destination.</p>
          </div>
          <div className="seo-market-card-grid">
            <article><span>Current Inventory</span><h3>Browse 4COP and 3PS listings</h3><p>Review available inventory by county, asking price, license type and availability.</p><Link href="/listings">View Florida liquor licenses for sale →</Link></article>
            <article><span>Financing</span><h3>Finance a Florida liquor license</h3><p>Review purchase and refinance financing, private lenders, payment calculations and underwriting considerations.</p><Link href="/financing">Florida liquor license financing →</Link></article>
            <article><span>Valuation</span><h3>Order a license appraisal</h3><p>Use county market evidence and comparable listings to support a purchase, refinance or sale decision.</p><Link href="/florida-liquor-license-appraisal">Florida liquor license appraisal →</Link></article>
            <article><span>County Research</span><h3>Compare county markets</h3><p>Move from statewide inventory into county-specific market pages and asking-price context.</p><Link href="/counties">Browse Florida county markets →</Link></article>
          </div>
        </div>
      </section>
    </main>
  );
}
