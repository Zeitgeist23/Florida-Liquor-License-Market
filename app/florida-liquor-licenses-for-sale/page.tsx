import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "./seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-licenses-for-sale`;

export const metadata: Metadata = {
  title: "Florida Liquor License for Sale | 4COP & 3PS Licenses | FLLM",
  description:
    "Find Florida liquor licenses for sale through FLLM. Explore statewide 4COP quota and 3PS opportunities, county market pages, financing, appraisals and confidential transaction resources.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
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
                Florida Liquor License Market brings together statewide <strong>4COP quota</strong> and <strong>3PS</strong> liquor-license opportunities with county market data, financing, appraisals and transaction resources. Use this page as the statewide starting point, then move into the live marketplace or a specific county market.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/listings">Browse Current Licenses</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/license-alerts">Create a License Alert</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Florida liquor license market overview">
              <span>Statewide Market</span>
              <strong>4COP + 3PS</strong>
              <p>Search by county, compare current asking prices and use FLLM transaction tools without changing the core Listings page.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-section">
        <div className="page-shell">
          <span className="seo-market-kicker">Search by License Type</span>
          <h2>Florida quota liquor licenses</h2>
          <div className="seo-market-card-grid">
            <article>
              <span>4COP Quota</span>
              <h3>Florida 4COP liquor licenses for sale</h3>
              <p>Review 4COP quota opportunities, county-specific supply and current marketplace inventory.</p>
              <Link href="/florida-4cop-liquor-license-for-sale">Explore Florida 4COP licenses</Link>
            </article>
            <article>
              <span>3PS Package Store</span>
              <h3>Florida 3PS liquor licenses for sale</h3>
              <p>Review 3PS package-store opportunities and learn how quota-series conversion may work subject to approvals.</p>
              <Link href="/florida-3ps-liquor-license-for-sale">Explore Florida 3PS licenses</Link>
            </article>
            <article>
              <span>License Types</span>
              <h3>Compare Florida liquor-license types</h3>
              <p>Understand quota and non-quota license categories before evaluating a purchase.</p>
              <Link href="/resources/florida-liquor-license-types">Compare license types</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-section seo-market-section-alt">
        <div className="page-shell">
          <span className="seo-market-kicker">County Market Pages</span>
          <h2>Start with counties already gaining Google visibility</h2>
          <div className="seo-market-card-grid">
            <article>
              <span>South Florida</span>
              <h3>Broward County liquor licenses for sale</h3>
              <p>View Broward County 4COP and 3PS inventory, asking-price context and Fort Lauderdale-area market information.</p>
              <Link href="/broward-county-liquor-license-for-sale">Broward County market</Link>
            </article>
            <article>
              <span>Space Coast</span>
              <h3>Brevard County liquor licenses for sale</h3>
              <p>Review current Brevard County opportunities serving Melbourne, Palm Bay, Cocoa and the Space Coast.</p>
              <Link href="/brevard-county-liquor-license-for-sale">Brevard County market</Link>
            </article>
            <article>
              <span>All Counties</span>
              <h3>Florida county liquor-license markets</h3>
              <p>Move from statewide research into county-level supply, asking prices and individual opportunities.</p>
              <Link href="/counties">Explore Florida counties</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-section">
        <div className="page-shell">
          <span className="seo-market-kicker">Transaction Tools</span>
          <h2>Research the license before you buy</h2>
          <div className="seo-market-card-grid">
            <article>
              <span>Financing</span>
              <h3>Finance a Florida liquor license</h3>
              <p>Review purchase and refinance financing, private lenders, payment calculations and underwriting considerations.</p>
              <Link href="/how-to-finance-florida-liquor-license">Florida liquor-license financing guide</Link>
            </article>
            <article>
              <span>Valuation</span>
              <h3>Florida liquor-license appraisals</h3>
              <p>Use county market evidence and comparable listings to support purchase, refinance and transaction decisions.</p>
              <Link href="/florida-liquor-license-appraisal">Explore appraisal services</Link>
            </article>
            <article>
              <span>Private Market</span>
              <h3>FLLM Exchange</h3>
              <p>Use FLLM's confidential transaction resources for buyers and sellers operating in a fragmented private market.</p>
              <Link href="/exchange">Explore the FLLM Exchange</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-section seo-market-section-alt">
        <div className="page-shell">
          <span className="seo-market-kicker">Buyer Questions</span>
          <h2>Florida liquor license for sale FAQ</h2>
          <div className="seo-market-faq">
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
