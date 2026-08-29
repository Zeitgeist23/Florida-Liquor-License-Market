import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "./resources.css";

const canonicalUrl = "https://www.floridaliquorlicensemarket.com/resources";

export const metadata: Metadata = {
  title: "Florida Liquor License Resources | Guides, Forms & Laws",
  description:
    "Access FLLM’s buyer and seller guide, Florida ABT forms, liquor-license laws, fees, calculators, attorney directory and official agency resources.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Resource Center",
    description: "Guides, forms, laws, calculators and professional resources for Florida liquor-license transactions.",
  },
};

const resourceGroups = [
  {
    title: "Buying, selling and market guidance",
    items: [
      { href: "/how-to-buy-florida-liquor-license", title: "How to Buy a Florida Liquor License", copy: "Compare quota-market purchases, state-issued options and professional brokerage support." },
      { href: "/how-to-sell-florida-liquor-license", title: "How to Sell a Florida Liquor License", copy: "Understand valuation, listing choices, buyer qualification, contracting and transfer preparation." },
      { href: "/florida-liquor-license-value", title: "License Value Estimator", copy: "Review county-level asking-price data and request a more specific valuation or appraisal." },
      { href: "/listings", title: "Current License Listings", copy: "Search available Florida licenses by county, license type, price and listing status." },
    ],
  },
  {
    title: "Applications, forms and state agencies",
    items: [
      { href: "/resources/application-center", title: "Alcohol License Application Center", copy: "Start with the right application path and review common preparation requirements." },
      { href: "/resources/forms", title: "Florida ABT Forms", copy: "Locate ABT-6002 and other commonly used Florida alcoholic-beverage forms." },
      { href: "/dbpr-abt-6002", title: "ABT-6002 Transfer Guide", copy: "Review ownership-transfer paperwork, fingerprints and background-screening considerations." },
      { href: "/resources/florida-department-of-revenue", title: "Florida Department of Revenue", copy: "Understand the tax-clearance role and access relevant FDOR resources." },
    ],
  },
  {
    title: "License rules, costs and professional help",
    items: [
      { href: "/resources/florida-liquor-license-types", title: "Florida License Types", copy: "Compare 2APS, 2COP, 3PS, 4COP quota, SFS and other license categories." },
      { href: "/resources/florida-liquor-license-laws", title: "Florida Liquor License Laws", copy: "Browse FLLM’s plain-language statutory and legal reference center." },
      { href: "/resources/license-fees", title: "License Fees", copy: "Review annual state fee information and county-based license-fee differences." },
      { href: "/resources/quota-transfer-fee-calculator", title: "Quota Transfer Fee Calculator", copy: "Estimate Florida’s quota-license transfer surcharge based on the transaction value." },
      { href: "/resources/liquor-license-attorneys", title: "Liquor License Attorneys", copy: "Find independent Florida attorneys who work with alcoholic-beverage licensing matters." },
      { href: "/florida-liquor-license-court-decisions", title: "Court Decisions and Case Law", copy: "Review selected Florida decisions affecting quota licenses and alcoholic-beverage regulation." },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <main className="resources-page">
      <div className="resources-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="resources-hero">
        <div className="page-shell resources-hero-inner">
          <div>
            <p className="resources-eyebrow">Florida licensing reference center</p>
            <h1>Florida Liquor License Resources</h1>
            <p>
              Practical guides, official forms, legal references, calculators and professional directories
              for buyers, sellers, applicants, investors and advisers.
            </p>
          </div>
          <nav aria-label="Resources page sections">
            <a href="#featured-guide">Free guide</a>
            <a href="#resource-library">Resource library</a>
          </nav>
        </div>
      </section>

      <section className="featured-guide page-shell" id="featured-guide">
        <div className="featured-guide-cover">
          <img
            src="/assets/fllm-buyers-sellers-guide-cover.jpg"
            alt="The Official Florida Liquor License Market Buyer’s and Seller’s Guide, 2026 Edition"
          />
        </div>
        <div className="featured-guide-copy">
          <span className="featured-label">Featured free resource · 48-page PDF</span>
          <h2>The Official FLLM Buyer’s &amp; Seller’s Guide</h2>
          <p>
            A clear, illustrated introduction to Florida’s quota-license market, buying and selling,
            brokerage versus self-directed transactions, applications, ABT-6002, background checks,
            financing, investing, food-sales requirements and FLLM’s market resources.
          </p>
          <ul>
            <li>Buying, selling, applying, financing and investing</li>
            <li>3PS, 4COP, 2APS, 2COP, SFS and SRX terminology</li>
            <li>Heat maps, listings, laws, forms and professional directories</li>
          </ul>
          <Link className="featured-guide-button" href="/free-guide">Get the free guide</Link>
        </div>
      </section>

      <section className="resource-library" id="resource-library">
        <div className="page-shell">
          <div className="resource-library-heading">
            <p className="resources-eyebrow">Browse the library</p>
            <h2>Tools and information for every stage</h2>
          </div>

          {resourceGroups.map((group) => (
            <section className="resource-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="resource-card-grid">
                {group.items.map((item) => (
                  <Link href={item.href} className="resource-card" key={item.href}>
                    <strong>{item.title}</strong>
                    <span>{item.copy}</span>
                    <em>Open resource →</em>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          <aside className="official-agency-card">
            <div>
              <span>Official state agency</span>
              <h2>Florida Division of Alcoholic Beverages &amp; Tobacco</h2>
              <p>Verify current requirements, license records, application procedures and official notices directly with DBPR/DABT.</p>
            </div>
            <a href="https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/" target="_blank" rel="noopener noreferrer">Visit the DABT website ↗</a>
          </aside>
        </div>
      </section>

      <footer className="resources-footer">
        <div className="page-shell">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
          <p>FLLM provides market information and transaction resources; it is not the licensing agency. Confirm current requirements with DBPR/DABT and appropriate professional advisers.</p>
        </div>
      </footer>
    </main>
  );
}
