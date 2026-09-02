import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/buy-florida-liquor-license`;

export const metadata: Metadata = {
  title: "Florida Liquor License Platform | Buy 4COP & 3PS Licenses",
  description:
    "Florida Liquor License Market is a statewide platform to buy and sell 4COP quota and 3PS liquor licenses, compare county prices, review financing and prepare for Florida DBPR transfers.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Platform | Buy 4COP & 3PS Licenses",
    description:
      "Use Florida Liquor License Market’s statewide platform to browse 4COP and 3PS licenses, compare county markets, review financing and prepare for DBPR transfers.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "What is the Florida Liquor License Market platform?",
    answer:
      "Florida Liquor License Market is a statewide online platform for Florida liquor license buyers, sellers, brokers, lenders and transaction professionals. It connects current 4COP quota and 3PS listings with county market data, valuation resources, financing information, license alerts and Florida DBPR transfer guidance.",
  },
  {
    question: "Where can I buy a Florida liquor license?",
    answer:
      "Florida Liquor License Market provides a statewide marketplace where buyers can browse liquor licenses offered for sale by county and license type. Buyers can compare current asking prices, open individual license pages, contact the listing party or request buyer assistance through FLLM.",
  },
  {
    question: "How much does it cost to buy a Florida liquor license?",
    answer:
      "There is no single statewide market price for a Florida quota liquor license. Asking prices vary substantially by county, license series, market supply, local demand and transaction circumstances. Buyers should compare current county inventory and recent market evidence rather than rely on one statewide average.",
  },
  {
    question: "What is the difference between a 4COP and a 3PS liquor license?",
    answer:
      "A 4COP-family quota license is generally associated with full-liquor consumption-on-premises privileges, while a 3PS-family quota license is used for package sales of beer, wine and spirits for off-premises consumption. Buyers should confirm the exact license series and privileges needed for the proposed business before entering a transaction.",
  },
  {
    question: "Can I buy a liquor license in one Florida county and move it to another county?",
    answer:
      "Florida quota licenses are county-specific. A buyer should not assume that a quota license purchased in one county can be transferred for use in another county. The intended county, proposed premises and license series should be confirmed before committing to a purchase.",
  },
  {
    question: "Can a Florida liquor license purchase be financed?",
    answer:
      "Financing may be available depending on the license, transaction structure, borrower qualifications and lender requirements. Stand-alone quota license purchases are often considered by private lenders, while SBA 7(a) financing generally relates to an eligible operating-business acquisition or refinance rather than a stand-alone license purchase by itself.",
  },
  {
    question: "What form is used to transfer a Florida alcoholic beverage license?",
    answer:
      "Florida DBPR identifies Form ABT-6002 as the application used for a transfer of ownership of an existing alcoholic beverage license. Buyers should review the current DBPR checklist and form instructions because required supporting documents and fees can vary by applicant and transaction.",
  },
];

const buyingSteps = [
  {
    title: "Choose the county",
    body: "Florida quota licenses trade within county markets. Start with the county where the business will operate so you are comparing relevant inventory and asking prices.",
    href: "/counties",
    link: "Compare county markets",
  },
  {
    title: "Choose the license type",
    body: "Determine whether the business needs full-liquor consumption-on-premises privileges, package-store privileges, beer-and-wine privileges or another Florida alcoholic beverage license series.",
    href: "/resources/florida-liquor-license-types",
    link: "Review Florida license types",
  },
  {
    title: "Compare licenses for sale",
    body: "Review current listings in the target county, asking prices, license series and listing details. Market value can vary widely from county to county.",
    href: "/listings",
    link: "Browse current licenses",
  },
  {
    title: "Verify the specific license",
    body: "Confirm the license number, ownership, county, series, status and disclosed liens or security interests before treating a listing as transaction-ready.",
    href: "/resources/application-center",
    link: "Open application resources",
  },
  {
    title: "Negotiate the transaction",
    body: "A purchase agreement should address price, closing conditions, transfer approval, lien or payoff matters, escrow terms and any location or licensing contingencies appropriate to the transaction.",
    href: "/resources/liquor-license-attorneys",
    link: "Find a Florida liquor license attorney",
  },
  {
    title: "Complete the DBPR transfer process",
    body: "The buyer must qualify for the license and complete the required state transfer process. The ABT-6002 transfer application is a central document for a transfer of ownership of an existing alcoholic beverage license.",
    href: "/dbpr-abt-6002",
    link: "Review ABT-6002",
  },
];

export default function BuyFloridaLiquorLicensePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Florida Liquor License Platform",
      headline: "Florida Liquor License Platform for 4COP and 3PS Licenses",
      description:
        "A statewide Florida liquor license marketplace platform with current listings, 4COP and 3PS resources, county market data, financing guidance and DBPR transfer information.",
      url: canonicalUrl,
      datePublished: "2026-08-31",
      dateModified: "2026-09-02",
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
      about: [
        { "@type": "Thing", name: "Florida liquor license platform" },
        { "@type": "Thing", name: "Florida liquor license marketplace" },
        { "@type": "Thing", name: "Florida liquor licenses" },
        { "@type": "Thing", name: "4COP quota licenses" },
        { "@type": "Thing", name: "3PS quota licenses" },
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
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Buy", item: `${siteUrl}/listings` },
        { "@type": "ListItem", position: 3, name: "Buy a Florida Liquor License", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="seo-market-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <style>{`
        .buy-license-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:24px}
        .buy-license-card{display:flex;flex-direction:column;min-height:230px;padding:24px;border:1px solid rgba(237,169,26,.32);border-radius:14px;background:linear-gradient(145deg,#0a2237,#04111c);box-shadow:0 14px 30px rgba(0,0,0,.16)}
        .buy-license-card span{color:#eda91a;font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
        .buy-license-card h3{margin:10px 0 10px;color:#fff;font-size:21px;line-height:1.2}
        .buy-license-card p{margin:0;color:#c5d2dd;line-height:1.68}
        .buy-license-card a{margin-top:auto;padding-top:18px;color:#eda91a;font-weight:900;text-decoration:none}
        .buy-license-card a:hover{text-decoration:underline}
        .buy-platform-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:24px}
        .buy-platform-card{padding:20px;border:1px solid rgba(237,169,26,.25);border-radius:12px;background:#071d33}
        .buy-platform-card strong{display:block;margin-bottom:8px;color:#fff;font-size:18px}
        .buy-platform-card p{margin:0;color:#bdcbd6;font-size:15px;line-height:1.65}
        .buy-platform-card a{display:inline-block;margin-top:12px;color:#eda91a;font-weight:900;text-decoration:none}
        .buy-platform-card a:hover{text-decoration:underline}
        .buy-license-steps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:24px}
        .buy-license-step{display:grid;grid-template-columns:44px 1fr;gap:14px;padding:21px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:#071d33}
        .buy-license-step-number{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#eda91a;color:#061728;font-weight:900}
        .buy-license-step h3{margin:0 0 8px;color:#fff;font-size:18px}
        .buy-license-step p{margin:0;color:#afbfcc;line-height:1.68}
        .buy-license-step a{display:inline-block;margin-top:10px;color:#eda91a;font-weight:800;text-decoration:none}
        .buy-license-step a:hover{text-decoration:underline}
        .buy-license-callout{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;margin-top:24px;padding:24px;border:1px solid rgba(237,169,26,.32);border-radius:14px;background:#071d33}
        .buy-license-callout h3{margin:0 0 8px;color:#fff;font-size:21px}
        .buy-license-callout p{margin:0;color:#bdcbd6;line-height:1.7}
        .buy-license-callout a{display:inline-flex;align-items:center;justify-content:center;min-height:45px;padding:0 20px;border-radius:8px;background:#eda91a;color:#061728;font-weight:900;text-decoration:none;white-space:nowrap}
        .buy-license-free-guide{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;margin-top:14px;padding:22px 24px;border:1px solid #d9c184;border-radius:14px;background:#fffaf0;box-shadow:0 10px 26px rgba(17,31,47,.07)}
        .buy-license-free-guide span{display:block;margin-bottom:6px;color:#8a651d;font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
        .buy-license-free-guide h3{margin:0 0 7px;color:#132237;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:500}
        .buy-license-free-guide p{margin:0;color:#4b5563;line-height:1.65}
        .buy-license-free-guide a{display:inline-flex;align-items:center;justify-content:center;min-height:45px;padding:0 20px;border-radius:8px;background:#102034;color:#fff;font-weight:900;text-decoration:none;white-space:nowrap}
        .buy-license-guide-inline{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:22px;padding:15px 17px;border:1px solid #ded6c3;border-radius:10px;background:#fffdf8;color:#4b5563!important}
        .buy-license-guide-inline strong{color:#132237}
        .buy-license-guide-inline a{color:#805d18;font-weight:900;text-decoration:none}
        .buy-license-guide-inline a:hover{text-decoration:underline}
        .buy-license-note{margin-top:20px;padding:17px 19px;border-left:3px solid #eda91a;background:rgba(237,169,26,.06);color:#afbfcc;font-size:12px;line-height:1.7}
        .buy-license-links{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:22px}
        .buy-license-links a{display:block;padding:18px;border:1px solid rgba(255,255,255,.08);border-radius:11px;background:#071d33;color:#f3f7fa;text-decoration:none;font-weight:800}
        .buy-license-links a span{display:block;margin-top:6px;color:#9fb0bf;font-size:12px;font-weight:500;line-height:1.5}
        @media(max-width:840px){.buy-platform-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.buy-license-grid{grid-template-columns:1fr}.buy-license-steps{grid-template-columns:1fr}.buy-license-callout,.buy-license-free-guide{grid-template-columns:1fr}.buy-license-callout a,.buy-license-free-guide a{justify-self:start}.buy-license-links{grid-template-columns:1fr}}
        @media(max-width:560px){.buy-platform-grid{grid-template-columns:1fr}.buy-license-step{grid-template-columns:1fr}.buy-license-step-number{width:38px;height:38px}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/listings" primaryActionLabel="Browse Licenses" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/listings">Buy</Link><span>›</span><strong>Buy a Florida Liquor License</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Statewide Marketplace and Transaction Resources</span>
              <h1>Florida Liquor License Platform for Buyers</h1>
              <p>
                Buy a Florida liquor license through a statewide platform built around current 4COP quota and 3PS listings. Search by county and license type, compare asking prices, review financing resources, and prepare for the Florida DBPR transfer process.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/listings">Browse Licenses for Sale</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/license-alerts">Create a License Alert</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/counties">Compare Counties</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Florida liquor license buyer options">
              <span>Buyer Marketplace</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>67</strong><small>Florida counties</small></div>
                <div><strong>4COP</strong><small>quota series</small></div>
                <div><strong>3PS</strong><small>package-store series</small></div>
                <div><strong>DBPR</strong><small>state transfer approval</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-section seo-market-section-alt" aria-labelledby="platform-heading">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Florida Liquor License Platform</span>
          <h2 id="platform-heading">A statewide marketplace for buying, selling, valuing, and financing quota licenses</h2>
          <p>
            Florida Liquor License Market brings the principal parts of a 4COP Quota or 3PS
            transaction into one platform. Buyers can find available licenses and compare county
            markets; sellers and brokers can publish listings; lenders and transaction
            professionals can review valuation, financing, and transfer resources.
          </p>
          <div className="buy-platform-grid">
            <article className="buy-platform-card">
              <strong>Buy a license</strong>
              <p>Search active Florida 4COP Quota and 3PS listings by county, type, price, and availability.</p>
              <Link href="/listings">Browse listings →</Link>
            </article>
            <article className="buy-platform-card">
              <strong>Sell a license</strong>
              <p>Submit a stand-alone quota license for statewide buyer visibility and direct inquiries.</p>
              <Link href="/list-your-license">List a license →</Link>
            </article>
            <article className="buy-platform-card">
              <strong>Compare value</strong>
              <p>Use county asking-price evidence, market reports, and formal appraisal resources.</p>
              <Link href="/florida-liquor-license-value">Review license values →</Link>
            </article>
            <article className="buy-platform-card">
              <strong>Finance a transaction</strong>
              <p>Review private-lender, commercial-bank, and transaction preparation resources.</p>
              <Link href="/financing">Explore financing →</Link>
            </article>
          </div>
        </div>

      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Start Here</span>
          <h2>Use one Florida liquor license platform from search through closing</h2>
          <p>
            A Florida liquor license purchase is not a single statewide market. Quota licenses are county-specific, and the correct license series depends on how the business will sell alcoholic beverages. A buyer looking for a bar or nightclub may be focused on a 4COP-family quota license, while a liquor-store buyer may be focused on a 3PS-family quota license.
          </p>
          <p>
            FLLM is designed to let a buyer move from statewide inventory to county-level market information, individual license listings, valuation data, financing resources and transfer information without treating every Florida license as interchangeable.
          </p>

          <div className="buy-license-grid">
            <article className="buy-license-card">
              <span>Current Inventory</span>
              <h3>Florida Liquor Licenses for Sale</h3>
              <p>Search current marketplace listings by county, license type, asking price and availability.</p>
              <Link href="/listings">View all Florida listings →</Link>
            </article>
            <article className="buy-license-card">
              <span>Consumption on Premises</span>
              <h3>4COP Quota Licenses</h3>
              <p>Review 4COP quota-series opportunities commonly associated with bars, lounges, nightclubs and other full-liquor consumption-on-premises uses.</p>
              <Link href="/florida-4cop-liquor-license-for-sale">Browse 4COP licenses →</Link>
            </article>
            <article className="buy-license-card">
              <span>Package Sales</span>
              <h3>3PS Quota Licenses</h3>
              <p>Review 3PS quota-series opportunities for package sales of beer, wine and spirits for off-premises consumption.</p>
              <Link href="/florida-3ps-liquor-license-for-sale">Browse 3PS licenses →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-section">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Buying Process</span>
          <h2>How to buy an existing Florida liquor license</h2>
          <p>
            The exact transaction can vary, but a buyer of an existing quota license should generally move through the following sequence before closing.
          </p>
          <div className="buy-license-steps">
            {buyingSteps.map((step, index) => (
              <article className="buy-license-step" key={step.title}>
                <div className="buy-license-step-number">{index + 1}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <Link href={step.href}>{step.link} →</Link>
                </div>
              </article>
            ))}
          </div>
          <div className="buy-license-callout">
            <div>
              <h3>Want the detailed step-by-step buyer guide?</h3>
              <p>The FLLM buyer guide explains direct purchases, broker-assisted transactions, due diligence, the quota lottery and transfer preparation in more detail.</p>
            </div>
            <Link href="/how-to-buy-florida-liquor-license">Read the Buyer Guide</Link>
          </div>
          <div className="buy-license-free-guide">
            <div>
              <span>Free Download</span>
              <h3>The Official Florida Liquor License Market Buyer’s & Seller’s Guide</h3>
              <p>Not ready to buy yet? Download the free guide to learn how Florida quota licenses are priced, transferred, financed and purchased before making an offer.</p>
            </div>
            <Link href="/free-guide">Download the Free Guide</Link>
          </div>
        </div>
      </section>

      <section className="seo-market-section seo-market-section-alt">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Price & Financing</span>
          <h2>Compare the county market before making an offer</h2>
          <p>
            Florida quota license asking prices can differ sharply by county. Supply, population, local business demand, available inventory, license series and seller circumstances can all affect the market. The most useful starting point is the current market for the county where the license will be used.
          </p>
          <div className="buy-license-links">
            <Link href="/florida-quota-liquor-license-cost">Florida Liquor License Cost<span>Compare quota-license market pricing and county differences.</span></Link>
            <Link href="/florida-liquor-license-value">Florida Liquor License Value<span>Review FLLM valuation tools and market evidence.</span></Link>
            <Link href="/financing">Liquor License Financing<span>Review private financing and other funding resources.</span></Link>
            <Link href="/florida-quota-liquor-license-market-report">Florida Market Report<span>Review statewide inventory and asking-price evidence.</span></Link>
            <Link href="/florida-liquor-license-market-index">Florida Market Index<span>Track Florida quota-license market data.</span></Link>
            <Link href="/license-alerts">License Alerts<span>Get notified when matching county or license-type inventory becomes available.</span></Link>
          </div>
        </div>
      </section>

      <section className="seo-market-section">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Buyer Due Diligence</span>
          <h2>Verify the license and the transaction before closing</h2>
          <p>
            A listing is a starting point, not a substitute for transaction-specific due diligence. Buyers should verify the license number, owner, county, series and status and identify any disclosed liens, security interests, payoff requirements or other transaction conditions. The buyer also needs to confirm that the proposed use and premises can support the intended license.
          </p>
          <p>
            Depending on the transaction, a buyer may also want assistance from a Florida liquor-license attorney, broker, licensing professional, lender, escrow agent or other qualified professional. FLLM provides marketplace and research resources but does not replace legal, tax, lending, zoning or DBPR advice for a specific transaction.
          </p>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/listings">Find a License to Buy</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/resources/liquor-license-attorneys">Find an Attorney</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/contact">Request Buyer Assistance</Link>
          </div>
          <p className="buy-license-guide-inline">
            <strong>Still researching?</strong>
            <span>Get the Official FLLM Buyer’s & Seller’s Guide before you make an offer.</span>
            <Link href="/free-guide">Download the Free Guide →</Link>
          </p>
          <div className="buy-license-note">
            Florida Liquor License Market is a marketplace, market-data and transaction-resource platform. Information on this page is general information and is not legal, tax, lending, zoning or regulatory advice. Buyers should confirm current requirements with the appropriate professionals and government agencies before closing a transaction.
          </div>
        </div>
      </section>

      <section className="seo-market-section seo-market-section-alt">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Buyer Questions</span>
          <h2>Frequently asked questions about buying a Florida liquor license</h2>
          <div className="seo-market-faqs">
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
