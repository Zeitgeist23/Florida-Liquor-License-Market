import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/how-to-buy-florida-liquor-license`;

export const metadata: Metadata = {
  title: "How to Buy a Florida Liquor License | 7-Step Buyer Guide",
  description:
    "Learn how to buy a Florida liquor license in 7 steps: choose the license type and county, find available licenses, compare market value and financing, verify the license and seller, negotiate a purchase agreement, prepare ABT-6002, and close the transfer.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "How to Buy a Florida Liquor License | 7-Step Buyer Guide",
    description:
      "A practical 7-step Florida liquor license buyer guide covering license type, county selection, listings, market value, financing, due diligence, purchase agreements, ABT-6002 and closing.",
    siteName: "Florida Liquor License Market",
  },
};

const steps = [
  {
    title: "Choose the license type your business actually needs",
    text: "Start with the privileges your business needs. A 4COP-family quota license is commonly used for full-liquor on-premises concepts, while a 3PS-family quota license is generally used for package sales. Beer-and-wine and qualifying special restaurant licenses may follow a different application path and may not require buying quota inventory.",
    href: "/resources/florida-liquor-license-types",
    link: "Compare Florida liquor license types",
  },
  {
    title: "Choose the Florida county and confirm the proposed location",
    text: "Florida quota licenses are county-specific. Confirm the county, proposed premises, zoning, right of occupancy and intended use before negotiating for a license. Do not assume a quota license purchased in one county can simply be used in another.",
    href: "/counties",
    link: "Compare Florida county markets",
  },
  {
    title: "Find available licenses and compare market value",
    text: "Search active inventory in the county you need and compare multiple asking prices when possible. Quota-license purchase prices are private-market prices, not fixed government fees, and can vary materially by county, series, status, supply and buyer demand.",
    href: "/listings",
    link: "Browse Florida liquor licenses for sale",
  },
  {
    title: "Verify the exact license and seller before you commit",
    text: "Confirm the license number, series, county, current owner, status and renewal information. Investigate disclosed liens or security interests, active or escrow status, seller authority and any conditions that could affect transfer approval or closing.",
    href: "/dbpr-abt-6002",
    link: "Review the FLLM transfer guide",
  },
  {
    title: "Arrange financing and negotiate the purchase agreement",
    text: "Decide how the purchase will be funded and negotiate a written agreement identifying the license, purchase price, deposit, closing conditions, responsibility for fees, seller cooperation, liens and what happens if required approvals are delayed or denied.",
    href: "/financing",
    link: "Explore liquor license financing",
  },
  {
    title: "Prepare the ABT-6002 transfer application and supporting documents",
    text: "Florida DBPR identifies ABT-6002 as the application used for transfer of ownership of an existing alcoholic beverage license. Depending on the transaction, supporting materials may include applicant and ownership information, fingerprints, fees, zoning or occupancy information and other documents required by the current checklist.",
    href: "/dbpr-abt-6002",
    link: "Review ABT-6002 requirements",
  },
  {
    title: "Complete the transfer, closing and post-closing compliance",
    text: "Coordinate the purchase agreement, funds, transfer filing and any approved location or series changes so they match the actual transaction. After approval, keep the license current and comply with the renewal, ownership, location and operating requirements that apply to the license.",
    href: "/resources",
    link: "Use FLLM transfer and compliance resources",
  },
];

const faqs = [
  {
    question: "How do I buy a Florida liquor license?",
    answer:
      "For an existing transferable quota license, first choose the license type and county, find available licenses, compare market pricing and financing, verify the exact license and seller, negotiate a written purchase agreement, prepare the required ABT-6002 transfer filing and supporting materials, and coordinate closing with the required DBPR approval.",
  },
  {
    question: "How much does it cost to buy a Florida liquor license?",
    answer:
      "The purchase price of a transferable Florida quota liquor license is a private-market price that can vary substantially by county, license type, available inventory, status and demand. Buyers should separate the negotiated purchase price from DBPR fees, quota transfer fees, professional costs, financing costs and other transaction expenses.",
  },
  {
    question: "What is the difference between a 4COP and 3PS liquor license?",
    answer:
      "A 4COP-family quota license is commonly used for full-liquor on-premises concepts such as bars, lounges and nightclubs, while a 3PS-family quota license is generally used for package sales of beer, wine and spirits for off-premises consumption. Confirm the exact series and approved privileges for the specific license and business plan.",
  },
  {
    question: "Can I buy a Florida liquor license in one county and use it in another?",
    answer:
      "Florida quota licensing is county-specific. Buyers should not assume a quota license purchased in one county can simply be moved to another. Confirm the specific license, county and proposed location with DBPR before committing to a purchase.",
  },
  {
    question: "What should I check before buying a Florida liquor license?",
    answer:
      "Verify the license number, series, county, ownership, status, renewal history, disclosed liens or security interests, intended use and any escrow or inactive status. Also confirm buyer qualifications, zoning, right of occupancy, transfer fees and the documents required for the DBPR transfer filing.",
  },
  {
    question: "Which form is used to transfer ownership of a Florida alcoholic beverage license?",
    answer:
      "Florida DBPR identifies Form ABT-6002 as the application used for transfer of ownership of an existing alcoholic beverage license. Buyers should review the current checklist and instructions because required supporting documents and fees depend on the applicant, license type and transaction.",
  },
  {
    question: "Can I finance the purchase of a Florida liquor license?",
    answer:
      "Financing may be available depending on the buyer, license, collateral, transaction structure and lender underwriting. Buyers should evaluate financing before signing a purchase agreement if the closing depends on borrowed funds.",
  },
  {
    question: "Do I have to buy an existing Florida quota liquor license?",
    answer:
      "Not always. Some beer-and-wine licenses and qualifying special licenses may be obtained through an application rather than a secondary-market purchase. Florida may also conduct a quota drawing when population growth creates new quota licenses. The correct path depends on the privileges and county your business needs.",
  },
];

export default function HowToBuyFloridaLiquorLicensePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "How to Buy a Florida Liquor License: 7-Step Buyer Guide",
      description:
        "A practical seven-step guide to buying an existing Florida liquor license, from choosing the license type and county through listings, pricing, financing, due diligence, ABT-6002 and closing.",
      datePublished: "2026-08-18",
      dateModified: "2026-09-06",
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
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Buy", item: `${siteUrl}/buy-florida-liquor-license` },
        { "@type": "ListItem", position: 3, name: "How to Buy a Florida Liquor License", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="seo-market-page buyer-guide-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <style>{`
        .buyer-guide-page{background:#04111d}
        .buyer-quick{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr);gap:24px;align-items:start}
        .buyer-quick-card{padding:22px;border:1px solid rgba(237,169,26,.35);border-radius:14px;background:#071d33}
        .buyer-quick-card strong{display:block;margin-bottom:9px;color:#eda91a;font-size:12px;letter-spacing:.08em;text-transform:uppercase}
        .buyer-quick-card p{margin:0;color:#d8e1e9;line-height:1.7}
        .buyer-seven-summary{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px;margin-top:24px}
        .buyer-seven-summary a{display:flex;flex-direction:column;gap:7px;min-height:98px;padding:13px 11px;border:1px solid rgba(237,169,26,.28);border-radius:9px;background:#071d33;color:#fff;text-decoration:none;line-height:1.3}
        .buyer-seven-summary b{color:#eda91a;font-size:18px}
        .buyer-seven-summary span{font-size:12px;font-weight:800}
        .buyer-seven-summary a:hover{border-color:#eda91a}
        .buyer-steps{display:grid;gap:14px;margin-top:24px}
        .buyer-step{display:grid;grid-template-columns:54px 1fr;gap:17px;padding:22px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:#071d33}
        .buyer-step-number{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:#eda91a;color:#061728;font-weight:900;font-size:18px}
        .buyer-step h3{margin:0 0 8px;color:#f6f3ed;font-size:20px}
        .buyer-step p{margin:0;color:#aebdca;line-height:1.72}
        .buyer-step a{display:inline-block;margin-top:10px;color:#eda91a;font-weight:850;text-decoration:none}
        .buyer-resource-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:22px}
        .buyer-resource-grid a{padding:18px;border:1px solid rgba(237,169,26,.3);border-radius:11px;background:#071d33;color:#f6f3ed;text-decoration:none;font-weight:850;line-height:1.35}
        .buyer-resource-grid span{display:block;margin-top:7px;color:#9fb2c4;font-size:12px;font-weight:500;line-height:1.5}
        .buyer-path-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:24px}
        .buyer-path{padding:23px;border:1px solid rgba(237,169,26,.28);border-radius:13px;background:linear-gradient(145deg,#0a2237,#04111c)}
        .buyer-path h3{margin:0 0 9px;color:#fff;font-size:20px}
        .buyer-path p{margin:0;color:#c6d2dc;line-height:1.65}
        .buyer-path a{display:inline-block;margin-top:14px;color:#eda91a;font-weight:850;text-decoration:none}
        .buyer-checklist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:22px;padding:0;list-style:none}
        .buyer-checklist li{position:relative;padding:16px 16px 16px 45px;border:1px solid rgba(255,255,255,.08);border-radius:11px;background:#071d33;color:#cbd6df;line-height:1.55}
        .buyer-checklist li::before{content:"✓";position:absolute;left:16px;top:15px;color:#eda91a;font-weight:900}
        .buyer-note{margin-top:22px;padding:16px 18px;border-left:3px solid #eda91a;background:rgba(237,169,26,.06);color:#aebdca;font-size:12px;line-height:1.7}
        @media(max-width:1050px){.buyer-seven-summary{grid-template-columns:repeat(4,minmax(0,1fr))}}
        @media(max-width:820px){.buyer-quick{grid-template-columns:1fr}.buyer-path-grid,.buyer-resource-grid{grid-template-columns:1fr}.buyer-checklist{grid-template-columns:1fr}.buyer-seven-summary{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:560px){.buyer-step{grid-template-columns:1fr}.buyer-step-number{width:42px;height:42px}.buyer-seven-summary{grid-template-columns:1fr}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/listings" primaryActionLabel="Browse Licenses" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/buy-florida-liquor-license">Buy</Link><span>›</span><strong>7-Step Buyer Guide</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Liquor License Buyer Guide</span>
              <h1>How to Buy a Florida Liquor License</h1>
              <p>
                To buy an existing Florida liquor license, first choose the license type and county, then find available inventory, compare market value and financing, verify the exact license and seller, negotiate a written purchase agreement, prepare the ABT-6002 transfer filing, and coordinate closing with the required DBPR approval. This 7-step guide walks through that purchase process from start to finish.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/listings">Browse Florida Licenses</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/counties">Compare County Markets</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/financing">Explore Financing</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Florida liquor license buying process">
              <span>7-Step Purchase Process</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>1</strong><small>license type</small></div>
                <div><strong>2</strong><small>county</small></div>
                <div><strong>3</strong><small>inventory & value</small></div>
                <div><strong>4–7</strong><small>verify, contract, transfer & close</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell buyer-quick">
          <article>
            <span className="seo-market-section-kicker">Quick Answer</span>
            <h2>Buying an existing Florida liquor license in 7 steps</h2>
            <p>
              For a transferable quota license, the purchase process is primarily a private-market transaction followed by the required state transfer process. The buyer identifies the correct license type and county, finds a specific license, evaluates price and financing, verifies the license and seller, negotiates the contract, prepares the transfer application and then closes in coordination with the required approval.
            </p>
            <p>
              FLLM separates this informational buyer guide from its commercial <Link href="/buy-florida-liquor-license">Buy a Florida Liquor License</Link> page so buyers can first understand the process and then move directly into listings, county market data, valuation, financing and transfer resources.
            </p>
          </article>
          <aside className="buyer-quick-card">
            <strong>Before you shop</strong>
            <p>Know the county, the alcohol privileges you need, whether consumption will be on or off premises, and whether your business may qualify for a non-quota or special license instead of purchasing quota inventory.</p>
          </aside>
        </div>
        <div className="seo-market-shell">
          <div className="buyer-seven-summary" aria-label="Seven steps to buy a Florida liquor license">
            {steps.map((step, index) => (
              <a key={step.title} href={`#buy-step-${index + 1}`}><b>{index + 1}</b><span>{step.title}</span></a>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">Step by Step</span>
              <h2>How to buy a Florida liquor license in 7 steps</h2>
            </div>
          </div>
          <div className="buyer-steps">
            {steps.map((step, index) => (
              <article className="buyer-step" id={`buy-step-${index + 1}`} key={step.title}>
                <div className="buyer-step-number">{index + 1}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <Link href={step.href}>{step.link} →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Buyer Research</span>
          <h2>Move from the buyer guide into the actual Florida market</h2>
          <p>Use these FLLM pages after you understand the purchase process. They are designed for commercial search, current inventory, county comparisons, valuation, financing and transaction preparation.</p>
          <div className="buyer-resource-grid">
            <Link href="/buy-florida-liquor-license">Buy a Florida Liquor License<span>Commercial buying page for moving from research into active purchase options.</span></Link>
            <Link href="/listings">Florida Liquor Licenses for Sale<span>Browse current marketplace inventory by county and license type.</span></Link>
            <Link href="/counties">Florida County Markets<span>Compare supply and market information county by county.</span></Link>
            <Link href="/florida-quota-liquor-license-cost">Quota License Cost by County<span>Compare disclosed 4COP and 3PS asking-price information.</span></Link>
            <Link href="/florida-liquor-license-appraisal">Liquor License Appraisal<span>Review license-specific valuation options when a supported opinion of value is needed.</span></Link>
            <Link href="/financing">Liquor License Financing<span>Explore financing before structuring the purchase agreement.</span></Link>
            <Link href="/dbpr-abt-6002">ABT-6002 Transfer Guide<span>Prepare for the ownership-transfer process and current checklist requirements.</span></Link>
            <Link href="/resources/quota-transfer-fee-calculator">Quota Transfer Fee Calculator<span>Estimate the statutory quota transfer-fee component.</span></Link>
            <Link href="/free-guide">Free Buyer’s & Seller’s Guide<span>Download FLLM’s broader transaction guide for buying, selling, financing and closing.</span></Link>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">Other Acquisition Paths</span><h2>Not every Florida liquor license has to be bought on the secondary market</h2></div>
          </div>
          <div className="buyer-path-grid">
            <article className="buyer-path">
              <h3>Apply for a non-quota or qualifying special license</h3>
              <p>Some beer-and-wine licenses and qualifying special restaurant licenses may be obtained through an application rather than by purchasing an existing quota license.</p>
              <Link href="/resources/florida-liquor-license-types">Compare license types →</Link>
            </article>
            <article className="buyer-path">
              <h3>Enter the Florida quota license drawing</h3>
              <p>When population growth creates new quota licenses, DBPR may open a drawing for eligible counties. Selection establishes priority to apply; it does not itself issue the license.</p>
              <Link href="/florida-liquor-license-lottery">Review the quota lottery →</Link>
            </article>
            <article className="buyer-path">
              <h3>Use a broker or transaction professional</h3>
              <p>A broker or experienced licensing professional may help locate inventory, contact sellers, compare pricing, negotiate terms and coordinate a purchase. Confirm representation and fees before engaging one.</p>
              <Link href="/contact">Request FLLM buyer assistance →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Buyer Due Diligence</span>
          <h2>Florida liquor license buyer checklist</h2>
          <ul className="buyer-checklist">
            <li>Confirm the exact license number, series and county.</li>
            <li>Verify the current owner and seller’s authority to transfer.</li>
            <li>Check current status, expiration and renewal information.</li>
            <li>Review disclosed liens, mortgages or security interests.</li>
            <li>Confirm whether the license is active, inactive or held in escrow.</li>
            <li>Confirm the proposed premises and local zoning support the intended use.</li>
            <li>Confirm buyer ownership, background and qualification requirements.</li>
            <li>Separate the negotiated purchase price from state fees and transfer costs.</li>
            <li>Determine responsibility for taxes, fees, commissions and closing expenses.</li>
            <li>Use a written agreement addressing approvals, due diligence and closing conditions.</li>
            <li>Review the current ABT-6002 instructions and DBPR checklist before filing.</li>
            <li>Coordinate closing timing with required approval and any location or series changes.</li>
          </ul>
          <p className="buyer-note">This guide is general educational information, not legal, tax, licensing, brokerage or investment advice. Rules, forms, fees and transaction requirements can change. Confirm current requirements and obtain transaction-specific professional advice when appropriate.</p>
        </div>
      </section>

      <section className="seo-market-faq">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">Buyer Questions</span><h2>How to buy a Florida liquor license FAQ</h2></div>
          </div>
          <div className="seo-market-faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-market-cta">
        <div className="seo-market-shell seo-market-cta-inner">
          <div>
            <span className="seo-market-section-kicker">Ready to Buy?</span>
            <h2>Move from the 7-step buyer guide into active Florida liquor license opportunities.</h2>
            <p>Browse current listings, compare county markets, review financing or prepare for the transfer process.</p>
          </div>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/listings">Browse Licenses</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/counties">Compare Counties</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/financing">Explore Financing</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
