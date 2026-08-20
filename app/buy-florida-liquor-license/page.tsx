import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/buy-florida-liquor-license`;

export const metadata: Metadata = {
  title: "Buy a Florida Liquor License | 4COP & 3PS Licenses for Sale",
  description:
    "Buy a Florida liquor license with current 4COP and 3PS listings, county market data, pricing guidance, financing resources, due-diligence steps and DBPR transfer information.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Buy a Florida Liquor License | 4COP & 3PS Licenses for Sale",
    description:
      "Find Florida liquor licenses for sale and learn the buying process, from choosing a county and license type through due diligence, financing and DBPR transfer.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy a Florida Liquor License | 4COP & 3PS",
    description:
      "Browse Florida liquor licenses for sale and use FLLM buyer resources for county markets, pricing, financing and transfer steps.",
  },
};

const faqs = [
  {
    question: "How do I buy a Florida liquor license?",
    answer:
      "Start by identifying the county and the privileges your business needs. Compare available licenses in that county, verify the license and seller, negotiate the transaction with appropriate contingencies, and complete the transfer application and supporting requirements with Florida's Division of Alcoholic Beverages and Tobacco.",
  },
  {
    question: "Where can I find Florida liquor licenses for sale?",
    answer:
      "Florida Liquor License Market organizes current marketplace inventory by county, license type, asking price and availability. Buyers can browse statewide listings, compare county markets, and open individual listing pages for more information.",
  },
  {
    question: "What is the difference between a 4COP and 3PS liquor license?",
    answer:
      "A 4COP-family quota license is commonly used for full-liquor on-premises concepts such as bars, lounges and other qualifying businesses, while a 3PS-family quota license is generally used for package sales of beer, wine and spirits for off-premises consumption. Buyers should confirm the exact series and privileges for the proposed business and location.",
  },
  {
    question: "How much does a Florida liquor license cost?",
    answer:
      "There is no single statewide market price for transferable quota licenses. Asking prices can vary materially by county, license category, supply, demand, license status, seller terms and market conditions. FLLM provides current listings and county-level market information to help buyers compare asking prices.",
  },
  {
    question: "Can I finance a Florida liquor license purchase?",
    answer:
      "Some transactions use seller financing, private lending or other financing structures. Terms vary by lender, borrower, license, collateral and transaction. Buyers should review financing terms carefully and confirm all transfer and closing requirements.",
  },
  {
    question: "What should I verify before buying a Florida liquor license?",
    answer:
      "Verify the license number, series, county, ownership, current status, renewal history, disclosed liens or security interests, intended use, buyer qualifications, proposed premises, zoning, Department of Revenue requirements, transfer fees and the documents required for the transaction.",
  },
  {
    question: "Which Florida form is used to transfer ownership of an alcoholic beverage license?",
    answer:
      "Florida DBPR identifies Form ABT-6002 as the application used for a transfer of ownership of an existing alcoholic beverage license. Buyers should use the current version and review the applicable checklist because supporting documents and fees can depend on the applicant and transaction.",
  },
  {
    question: "Can I buy a quota liquor license in one county and use it in another?",
    answer:
      "Florida quota licensing is county-specific. Buyers should select inventory for the county where the license will be used and confirm the proposed transaction and location with DBPR before committing to a purchase.",
  },
];

const buyerSteps = [
  {
    title: "Choose the county",
    text: "Quota-license supply and market pricing are county-specific. Start with the county where the business will operate and compare that county's available inventory.",
    href: "/counties",
    link: "Compare Florida county markets",
  },
  {
    title: "Choose the license type",
    text: "Determine whether the business needs a transferable 4COP quota license, a 3PS package-store license, or another license category before comparing prices.",
    href: "/resources/florida-liquor-license-types",
    link: "Review Florida license types",
  },
  {
    title: "Compare licenses for sale",
    text: "Review current asking prices, license status and listing details. Use individual listing pages and county pages to compare available opportunities.",
    href: "/listings",
    link: "Browse current listings",
  },
  {
    title: "Perform due diligence",
    text: "Verify the specific license, seller, status, liens or security interests, transfer requirements, proposed premises, zoning and transaction contingencies before closing.",
    href: "/dbpr-abt-6002",
    link: "Review ABT-6002 transfer resources",
  },
  {
    title: "Arrange financing if needed",
    text: "If the purchase is not all cash, compare available financing structures and understand the cost, security requirements, closing conditions and repayment terms.",
    href: "/financing",
    link: "Explore liquor-license financing",
  },
  {
    title: "Submit the transfer application",
    text: "Complete the required DBPR transfer process and supporting documentation. The license transaction and the buyer's proposed business location may involve separate approvals and requirements.",
    href: "/resources/forms",
    link: "View Florida ABT forms",
  },
];

export default function BuyFloridaLiquorLicensePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Buy a Florida Liquor License",
      url: canonicalUrl,
      description:
        "Florida buyer hub for current liquor-license listings, 4COP and 3PS inventory, county markets, pricing, financing, due diligence and DBPR transfer resources.",
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
      dateModified: "2026-08-20",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Buy a Florida Liquor License", item: canonicalUrl },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <style>{`
        .buy-hub-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:24px}
        .buy-hub-card{padding:24px;border:1px solid rgba(237,169,26,.32);border-radius:14px;background:linear-gradient(145deg,#0a2237,#04111c);box-shadow:0 12px 26px rgba(0,0,0,.16)}
        .buy-hub-card span{display:inline-flex;margin-bottom:12px;color:#eda91a;font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
        .buy-hub-card h3{margin:0 0 9px;color:#fff;font-size:22px}
        .buy-hub-card p{margin:0;color:#c6d2dc;line-height:1.7}
        .buy-hub-card a{display:inline-block;margin-top:16px;color:#eda91a;font-weight:900;text-decoration:none}
        .buy-hub-card a:hover{text-decoration:underline}
        .buy-steps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:24px}
        .buy-step{display:grid;grid-template-columns:46px 1fr;gap:15px;padding:22px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:#071d33}
        .buy-step-number{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:#eda91a;color:#061728;font-weight:900}
        .buy-step h3{margin:0 0 8px;color:#fff;font-size:19px}
        .buy-step p{margin:0;color:#aebdca;line-height:1.65}
        .buy-step a{display:inline-block;margin-top:10px;color:#eda91a;font-weight:800;text-decoration:none}
        .buy-step a:hover{text-decoration:underline}
        .buy-resource-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:22px}
        .buy-resource-grid a{padding:18px;border:1px solid rgba(237,169,26,.3);border-radius:11px;background:#071d33;color:#f6f3ed;text-decoration:none;font-weight:800;line-height:1.35}
        .buy-resource-grid a span{display:block;margin-top:7px;color:#9fb2c4;font-size:12px;font-weight:500;line-height:1.5}
        .buy-checklist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:22px;padding:0;list-style:none}
        .buy-checklist li{position:relative;padding:16px 16px 16px 45px;border:1px solid rgba(255,255,255,.08);border-radius:11px;background:#071d33;color:#cbd6df;line-height:1.55}
        .buy-checklist li::before{content:"✓";position:absolute;left:16px;top:15px;color:#eda91a;font-weight:900}
        .buy-disclaimer{margin-top:22px;padding:16px 18px;border-left:3px solid #eda91a;background:rgba(237,169,26,.06);color:#aebdca;font-size:12px;line-height:1.7}
        @media(max-width:820px){.buy-hub-grid,.buy-steps,.buy-resource-grid,.buy-checklist{grid-template-columns:1fr}}
        @media(max-width:560px){.buy-step{grid-template-columns:1fr}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/listings" primaryActionLabel="Browse Licenses" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><strong>Buy a Florida Liquor License</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Liquor License Buyer Hub</span>
              <h1>Buy a Florida Liquor License</h1>
              <p>
                Find Florida liquor licenses for sale and move from search to transfer with one buyer hub. Compare current 4COP and 3PS inventory, county markets, asking prices, license types, financing resources, due-diligence steps and DBPR transfer information.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/listings">Browse Florida Liquor Licenses for Sale</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/florida-4cop-liquor-license-for-sale">View 4COP Licenses</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/florida-3ps-liquor-license-for-sale">View 3PS Licenses</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Florida liquor license buyer resources">
              <span>Start Here</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>67</strong><small>Florida county markets</small></div>
                <div><strong>4COP</strong><small>full-liquor quota inventory</small></div>
                <div><strong>3PS</strong><small>package-store inventory</small></div>
                <div><strong>ABT</strong><small>transfer resources</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Current Marketplace</span>
          <h2>Choose the Florida liquor license you need</h2>
          <p>
            The fastest route to a useful search is to identify the county and license category first. Florida quota licenses are county-specific, and asking prices can differ substantially from one county to another. FLLM separates statewide inventory into buyer-focused marketplace pages so you can compare the right opportunities before contacting a seller or listing party.
          </p>
          <div className="buy-hub-grid">
            <article className="buy-hub-card">
              <span>Full Liquor</span>
              <h3>Florida 4COP liquor licenses for sale</h3>
              <p>Compare current transferable 4COP quota opportunities by county, asking price and availability for full-liquor concepts.</p>
              <Link href="/florida-4cop-liquor-license-for-sale">Browse Florida 4COP inventory ›</Link>
            </article>
            <article className="buy-hub-card">
              <span>Package Store</span>
              <h3>Florida 3PS liquor licenses for sale</h3>
              <p>Compare current 3PS-family quota opportunities for package-store sales of sealed beer, wine and spirits.</p>
              <Link href="/florida-3ps-liquor-license-for-sale">Browse Florida 3PS inventory ›</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-section">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Buyer Process</span>
          <h2>How to buy a Florida liquor license</h2>
          <p>Use these steps as a practical framework. The exact documents, approvals and transaction structure can vary by buyer, license, county and proposed premises.</p>
          <div className="buy-steps">
            {buyerSteps.map((step, index) => (
              <article className="buy-step" key={step.title}>
                <div className="buy-step-number">{index + 1}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <Link href={step.href}>{step.link} ›</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-market-section seo-market-section-alt">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Price & Market Research</span>
          <h2>What should you pay for a Florida liquor license?</h2>
          <p>
            There is no single statewide price for a transferable Florida quota license. Market value is driven heavily by county, license type, supply, current asking prices, seller terms, status and transaction conditions. Compare the license you are considering against current county inventory rather than relying on a statewide average alone.
          </p>
          <div className="buy-resource-grid">
            <Link href="/florida-liquor-license-value">Florida Liquor License Value Estimator<span>Estimate a county-level market range using current marketplace data.</span></Link>
            <Link href="/counties">Florida County Markets<span>Compare current inventory and market information across all 67 Florida counties.</span></Link>
            <Link href="/florida-quota-liquor-license-cost">Florida Quota License Cost Guide<span>Review factors that influence quota-license pricing and transaction cost.</span></Link>
          </div>
        </div>
      </section>

      <section className="seo-market-section">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Due Diligence</span>
          <h2>Buyer checklist before you commit</h2>
          <ul className="buy-checklist">
            <li>Confirm the license number, series and Florida county.</li>
            <li>Verify the current owner and seller authority.</li>
            <li>Check current status, renewal history and escrow or inactive status.</li>
            <li>Investigate disclosed liens, security interests and transaction encumbrances.</li>
            <li>Confirm the proposed premises, zoning and intended license use.</li>
            <li>Review buyer qualification and entity documentation requirements.</li>
            <li>Confirm Department of Revenue and DBPR transfer requirements.</li>
            <li>Use purchase contingencies appropriate to the transaction.</li>
          </ul>
          <div className="buy-resource-grid">
            <Link href="/dbpr-abt-6002">ABT-6002 Transfer Guide<span>Review the ownership-transfer application and buyer-focused transfer information.</span></Link>
            <Link href="/resources/forms">Florida ABT Forms<span>Open FLLM's organized library of Florida alcoholic-beverage forms.</span></Link>
            <Link href="/resources/florida-department-of-revenue">Florida Department of Revenue<span>Review FLLM's resource page for Florida tax-clearance and Department of Revenue information.</span></Link>
          </div>
        </div>
      </section>

      <section className="seo-market-section seo-market-section-alt">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Funding the Purchase</span>
          <h2>Florida liquor license financing</h2>
          <p>
            Buyers may encounter cash purchases, seller financing, private lending or other transaction structures. Financing terms can affect the practical purchase price, closing timeline and security requirements, so compare the full economics of the transaction rather than the asking price alone.
          </p>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/financing">Explore Financing</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/private-liquor-license-lenders">Private Liquor License Lenders</Link>
          </div>
        </div>
      </section>

      <section className="seo-market-section">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Frequently Asked Questions</span>
          <h2>Buying a Florida liquor license: common questions</h2>
          <div className="seo-market-faq-grid">
            {faqs.map((faq) => (
              <details className="seo-market-faq" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="buy-disclaimer">
            Florida Liquor License Market provides marketplace, educational and administrative information. It does not provide legal, tax or investment advice. Buyers should confirm transaction-specific requirements with the appropriate Florida agencies and qualified professionals before closing.
          </div>
        </div>
      </section>

      <section className="seo-market-cta">
        <div className="seo-market-shell">
          <span>Ready to compare inventory?</span>
          <h2>Browse Florida liquor licenses for sale</h2>
          <p>Search current marketplace inventory by county, license type, asking price and availability.</p>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/listings">View Current Listings</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/counties">Browse by County</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
