import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "./resources.css";

const canonicalUrl = "https://www.floridaliquorlicensemarket.com/resources";

export const metadata: Metadata = {
  title: "Florida Liquor License Resource Center | Guides, Forms, Laws & Market Tools",
  description:
    "Browse FLLM guides for opening, buying, selling, financing and valuing Florida liquor licenses, plus ABT forms, laws, county markets, lookup tools and professional resources.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Resource Center | FLLM",
    description:
      "A categorized library of Florida liquor-license guides, forms, laws, pricing, financing, county-market tools and transaction resources.",
  },
};

const resourceGroups = [
  {
    title: "Opening & operating a liquor store",
    copy: "Start with the license type, operating rules, application process and market before committing to a location or purchase.",
    items: [
      { href: "/florida-liquor-store-license", title: "Florida Liquor Store License", copy: "Requirements, application steps, package-store rules, costs, lookup resources and links to 3PS, 4COP, financing and county markets." },
      { href: "/how-to-open-a-liquor-store-in-florida", title: "How to Open a Liquor Store in Florida", copy: "A start-to-finish guide covering business planning, 3PS licensing, location diligence, financing, valuation, transfer and opening steps." },
      { href: "/license-types/3ps-package-store", title: "3PS Package-Store License Guide", copy: "Understand Florida's full-liquor package-store quota license and how it differs from 4COP and beer-and-wine licenses." },
      { href: "/resources/florida-liquor-license-laws", title: "Package-Store Rules & Florida Liquor Laws", copy: "Review FLLM's plain-language statutory reference center, including package-store and quota-license topics." },
      { href: "/resources/application-center", title: "Alcohol License Application Center", copy: "Identify the correct application path, forms and preparation steps for a Florida alcoholic-beverage license." },
      { href: "/resources/license-fees", title: "License Fees & License Lookup", copy: "Review annual license-fee information and use FLLM's license-number lookup resources." },
    ],
  },
  {
    title: "Buying, selling & transaction guidance",
    copy: "Move from market search through valuation, negotiation, transfer preparation and closing.",
    items: [
      { href: "/how-to-buy-florida-liquor-license", title: "How to Buy a Florida Liquor License", copy: "Compare quota-market purchases, state-issued options, due diligence, financing and transfer steps." },
      { href: "/how-to-sell-florida-liquor-license", title: "How to Sell a Florida Liquor License", copy: "Understand valuation, listing choices, buyer qualification, contracting and transfer preparation." },
      { href: "/resources/selling-florida-quota-liquor-license-to-trust", title: "Selling to a Trust: Seller Due Diligence", copy: "What quota-license sellers should verify when a purchase contract names a trust, including trustee authority, assignment rights, indirect interests and the proposed DABT transferee." },
      { href: "/transaction-services", title: "FLLM Transaction Services", copy: "Connect valuation, financing, FDOR clearance, ABT transfer support, closing resources and professional referrals." },
      { href: "/listings", title: "Current License Listings", copy: "Search available Florida 4COP and 3PS licenses by county, price and listing status." },
      { href: "/florida-3ps-liquor-license-for-sale", title: "Florida 3PS Licenses for Sale", copy: "Compare current package-store quota-license inventory across Florida counties." },
      { href: "/florida-4cop-liquor-license-for-sale", title: "Florida 4COP Licenses for Sale", copy: "Browse current transferable full-liquor 4COP quota licenses and statewide market data." },
    ],
  },
  {
    title: "Pricing, valuation & appraisal",
    copy: "Compare county markets, asking prices and professional valuation resources before negotiating or financing a license.",
    items: [
      { href: "/florida-quota-liquor-license-cost", title: "Florida Liquor License Cost by County", copy: "Compare disclosed 3PS and 4COP asking prices, county supply and market differences." },
      { href: "/florida-liquor-license-value", title: "Florida Liquor License Value Estimator", copy: "Use county-level market data to establish an initial value range before ordering a formal appraisal." },
      { href: "/florida-liquor-license-appraisal", title: "Liquor License Appraisal", copy: "Review appraisal options for purchases, refinances, lender files and transaction support." },
      { href: "/florida-liquor-license-sba-appraisal", title: "SBA Liquor License Appraisal", copy: "Understand how liquor-license value may be documented in an SBA-financed business transaction." },
      { href: "/resources/quota-transfer-fee-calculator", title: "Quota Transfer Fee Calculator", copy: "Estimate Florida's quota-license transfer surcharge based on transaction value." },
      { href: "/florida-liquor-license-market-index", title: "Florida Liquor License Market Index", copy: "Review FLLM's statewide market index, inventory concentration and county pricing context." },
    ],
  },
  {
    title: "Financing a liquor license",
    copy: "Explore purchase and refinance structures for qualified Florida liquor-license transactions.",
    items: [
      { href: "/finance-a-license", title: "Finance a Liquor License", copy: "Start with FLLM's financing page for purchase and refinance options." },
      { href: "/how-to-finance-florida-liquor-license", title: "How to Finance a Florida Liquor License", copy: "Compare bank, private-lender, seller-financing and transaction-structure considerations." },
      { href: "/private-liquor-license-lenders", title: "Private Liquor License Lenders", copy: "Learn how private lenders may underwrite quota-license collateral, value and borrower strength." },
      { href: "/sba-7a-liquor-license-business-financing", title: "SBA 7(a) Liquor License & Business Financing", copy: "Review SBA financing considerations when a liquor license is part of a business acquisition or refinance." },
    ],
  },
  {
    title: "County market guides",
    copy: "Florida quota licenses are county-specific, so local inventory and asking-price context matter.",
    items: [
      { href: "/counties", title: "All 67 Florida County Markets", copy: "Browse county-by-county liquor-license inventory, asking-price context and market pages." },
      { href: "/counties/miami-dade-county", title: "Miami-Dade County Market", copy: "Review current Miami-Dade 3PS and 4COP inventory and disclosed asking prices." },
      { href: "/counties/broward-county", title: "Broward County Market", copy: "Compare active Broward County quota-license inventory and market conditions." },
      { href: "/counties/orange-county", title: "Orange County Market", copy: "Review Orlando-area quota-license availability, pricing and current listings." },
    ],
  },
  {
    title: "Applications, transfers & state agencies",
    copy: "Use FLLM's plain-language guides, then verify current requirements with the appropriate Florida agency.",
    items: [
      { href: "/resources/application-center", title: "Alcohol License Application Center", copy: "Start with the right application path and review common preparation requirements." },
      { href: "/resources/florida-division-alcoholic-beverages-tobacco", title: "Florida DABT Guide", copy: "Understand DBPR/DABT, quota-license issuance, transfers, applicant qualification and agency contacts." },
      { href: "/resources/forms", title: "Florida ABT Forms", copy: "Locate ABT-6002 and other commonly used Florida alcoholic-beverage forms." },
      { href: "/dbpr-abt-6002", title: "ABT-6002 Transfer Guide", copy: "Review ownership-transfer paperwork, fingerprints and background-screening considerations." },
      { href: "/resources/florida-department-of-revenue", title: "Florida Department of Revenue", copy: "Understand tax-clearance issues and access FLLM's FDOR resources." },
    ],
  },
  {
    title: "License types, laws & professional help",
    copy: "Compare license privileges and use legal and professional resources for transaction-specific questions.",
    items: [
      { href: "/resources/florida-liquor-license-types", title: "Florida License Types", copy: "Compare 2APS, 2COP, 3PS, 4COP quota, SFS/SRX and other license categories." },
      { href: "/license-types/4cop-quota", title: "4COP Quota License Guide", copy: "Understand transferable full-liquor quota privileges, county limits and operating considerations." },
      { href: "/license-types/3ps-package-store", title: "3PS Package-Store License Guide", copy: "Understand the full-liquor package-store license used by liquor retailers." },
      { href: "/resources/florida-liquor-license-laws", title: "Florida Liquor License Laws", copy: "Browse FLLM's plain-language statutory and legal reference center." },
      { href: "/resources/florida-liquor-license-age-property-rights", title: "Age & Quota License Property Rights", copy: "Learn the age-21 licensing rule and how Florida cases distinguish DABT transfer status from private property, contract and creditor rights." },
      { href: "/florida-liquor-license-court-decisions", title: "Court Decisions and Case Law", copy: "Review selected Florida decisions affecting quota licenses and alcoholic-beverage regulation." },
      { href: "/resources/liquor-license-attorneys", title: "Liquor License Attorneys", copy: "Find independent Florida attorneys who work with alcoholic-beverage licensing matters." },
    ],
  },
  {
    title: "Lookup, verification & recurring compliance",
    copy: "Check license identity, fees, renewal information and state records before relying on a license in a transaction.",
    items: [
      { href: "/resources/license-fees", title: "Florida Liquor License Lookup & Fees", copy: "Use FLLM's license-number lookup resources and review annual fee information." },
      { href: "/resources/florida-division-alcoholic-beverages-tobacco", title: "DABT License Records & Agency Guide", copy: "Use FLLM's DABT guide to understand state records, licensing functions and official verification steps." },
      { href: "/resources/florida-department-of-revenue", title: "FDOR Clearance Resources", copy: "Review tax-clearance and certificate-of-compliance issues that can affect alcoholic-beverage transactions." },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <main className="resources-page">
      <div className="resources-header-wrap"><FormsSiteHeader /></div>

      <section className="resources-hero">
        <div className="page-shell resources-hero-inner">
          <div>
            <p className="resources-eyebrow">FLLM guide & resource library</p>
            <h1>Florida Liquor License Resource Center</h1>
            <p>Browse practical guides, market data, forms, laws, financing, valuation tools, county resources and professional directories for every stage of a Florida liquor-license transaction.</p>
          </div>
          <nav aria-label="Resources page sections"><a href="#resource-library">Browse all resources</a><a href="#featured-guide">Free guide</a></nav>
        </div>
      </section>

      <section className="featured-guide page-shell" id="featured-guide">
        <div className="featured-guide-cover"><img src="/assets/fllm-buyers-sellers-guide-cover.jpg" alt="The Official Florida Liquor License Market Buyer’s and Seller’s Guide, 2026 Edition" /></div>
        <div className="featured-guide-copy">
          <span className="featured-label">Featured free publication · 48-page PDF</span>
          <h2>The Official FLLM Buyer’s &amp; Seller’s Guide</h2>
          <p>The downloadable Buyer’s &amp; Seller’s Guide remains one featured resource inside the larger FLLM library. Use the categorized sections below for specific topics such as opening a liquor store, 3PS licensing, financing, valuation, county markets, applications and legal rules.</p>
          <ul><li>Buying, selling, applying, financing and investing</li><li>3PS, 4COP, 2APS, 2COP, SFS and SRX terminology</li><li>Heat maps, listings, laws, forms and professional directories</li></ul>
          <Link className="featured-guide-button" href="/free-guide">Download the free guide</Link>
        </div>
      </section>

      <section className="resource-library" id="resource-library">
        <div className="page-shell">
          <div className="resource-library-heading"><p className="resources-eyebrow">Browse by topic</p><h2>FLLM guides, tools and market resources</h2><p>Choose the subject that matches what you are trying to do. Each guide links back into FLLM's listings, financing, appraisal, county-market and transaction resources where relevant.</p></div>
          {resourceGroups.map((group) => (
            <section className="resource-group" key={group.title}>
              <h3>{group.title}</h3>
              <p style={{ maxWidth: "820px", margin: "6px 0 18px", color: "#66717f", lineHeight: 1.65 }}>{group.copy}</p>
              <div className="resource-card-grid">
                {group.items.map((item) => (
                  <Link href={item.href} className="resource-card" key={`${group.title}-${item.href}`}><strong>{item.title}</strong><span>{item.copy}</span><em>Open resource →</em></Link>
                ))}
              </div>
            </section>
          ))}
          <aside className="official-agency-card"><div><span>Official state agency</span><h2>Florida Division of Alcoholic Beverages &amp; Tobacco</h2><p>Use FLLM's DABT guide for a plain-language overview, then verify current requirements, license records, application procedures and official notices directly with DBPR/DABT.</p></div><a href="https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/" target="_blank" rel="noopener noreferrer">Visit the DABT website ↗</a></aside>
        </div>
      </section>

      <footer className="resources-footer"><div className="page-shell"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /><p>FLLM provides market information and transaction resources; it is not the licensing agency. Confirm current requirements with DBPR/DABT and appropriate professional advisers.</p></div></footer>
    </main>
  );
}
