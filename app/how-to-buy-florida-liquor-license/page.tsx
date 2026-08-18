import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/how-to-buy-florida-liquor-license`;

export const metadata: Metadata = {
  title: "How to Buy a Florida Liquor License | Step-by-Step Guide",
  description:
    "Learn how to buy a Florida liquor license step by step. Compare 4COP, 3PS and other license types, review county markets, due diligence, DBPR transfer requirements, fees and financing.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "How to Buy a Florida Liquor License | Step-by-Step Guide",
    description:
      "A practical Florida buyer guide covering license type, county selection, pricing, due diligence, DBPR transfer requirements and closing.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "How do I buy a Florida liquor license?",
    answer:
      "Start by determining the license privileges your business needs and the county where it will operate. If you need a transferable quota license, compare available licenses in that county, perform due diligence on the specific license and seller, negotiate a purchase agreement with appropriate contingencies, and submit the required transfer application and supporting materials to Florida's Division of Alcoholic Beverages and Tobacco for approval.",
  },
  {
    question: "Do I have to buy an existing Florida quota liquor license?",
    answer:
      "Not always. Beer-and-wine licenses are generally non-quota, and certain businesses may qualify for special full-liquor licenses such as an eligible restaurant license. If your business needs full-liquor privileges and does not qualify for a special license, purchasing an existing quota license from a current holder is often the practical route. Florida also periodically awards newly created quota licenses through a public drawing.",
  },
  {
    question: "What is the difference between a 4COP and 3PS liquor license?",
    answer:
      "A 4COP-family quota license is commonly used for full-liquor consumption on premises, such as bars, lounges, nightclubs and qualifying hospitality concepts, while a 3PS-family quota license is used for package sales of beer, wine and liquor for off-premises consumption. The exact privileges and series should be confirmed for the specific license and business plan.",
  },
  {
    question: "Can I buy a Florida liquor license in one county and use it in another?",
    answer:
      "Florida quota licensing is controlled on a county-by-county basis. Do not assume a quota license purchased in one county can simply be used in another. Buyers should confirm the specific license, county and proposed location with DBPR before committing to a purchase or relocation.",
  },
  {
    question: "What should I check before buying a Florida liquor license?",
    answer:
      "Verify the license number, series, county, ownership, status, renewal history, disclosed liens or security interests, intended use, location requirements and any escrow or inactive status. Also confirm buyer qualifications, zoning, right of occupancy, Department of Revenue requirements, transfer fees and the documents required for the DBPR application. Transaction-specific legal and licensing advice may be appropriate before closing.",
  },
  {
    question: "Which form is used to transfer ownership of a Florida alcoholic beverage license?",
    answer:
      "Florida DBPR identifies Form ABT-6002 as the application used for a transfer of ownership of an existing alcoholic beverage license. The current checklist and form instructions should be reviewed because the supporting documents and fees can depend on the applicant, license type and transaction.",
  },
];

export default function HowToBuyFloridaLiquorLicensePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "How to Buy a Florida Liquor License: Step-by-Step Guide",
      description:
        "A practical guide to buying a Florida liquor license, including license selection, county markets, pricing, due diligence, DBPR transfer requirements and closing.",
      datePublished: "2026-08-18",
      dateModified: "2026-08-18",
      mainEntityOfPage: canonicalUrl,
      author: {
        "@type": "Organization",
        name: "Florida Liquor License Market",
      },
      publisher: {
        "@type": "Organization",
        name: "Florida Liquor License Market",
        url: siteUrl,
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
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Buy", item: `${siteUrl}/listings` },
        { "@type": "ListItem", position: 3, name: "How to Buy a Florida Liquor License", item: canonicalUrl },
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
        .buy-guide-quick{display:grid;grid-template-columns:1.25fr .75fr;gap:24px;align-items:start}
        .buy-guide-quick-card{padding:22px;border:1px solid rgba(237,169,26,.3);border-radius:14px;background:#071d33}
        .buy-guide-quick-card strong{display:block;color:#eda91a;font-size:13px;letter-spacing:.07em;text-transform:uppercase;margin-bottom:10px}
        .buy-guide-quick-card p{margin:0;color:#d8e1e9;line-height:1.7}
        .buy-guide-steps{display:grid;gap:14px;margin-top:24px}
        .buy-guide-step{display:grid;grid-template-columns:54px 1fr;gap:17px;padding:22px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:#071d33}
        .buy-guide-step-number{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:#eda91a;color:#061728;font-weight:900;font-size:18px}
        .buy-guide-step h3{margin:0 0 8px;color:#f6f3ed;font-size:20px}
        .buy-guide-step p{margin:0;color:#aebdca;line-height:1.72}
        .buy-guide-step p+p{margin-top:10px}
        .buy-guide-step a{color:#eda91a;font-weight:800;text-decoration:none}
        .buy-guide-step a:hover{text-decoration:underline}
        .buy-guide-table-wrap{overflow-x:auto;margin-top:22px;border:1px solid rgba(237,169,26,.25);border-radius:14px;background:#071d33}
        .buy-guide-table{width:100%;min-width:820px;border-collapse:collapse;color:#eef3f8}
        .buy-guide-table th,.buy-guide-table td{padding:14px 15px;border-bottom:1px solid rgba(255,255,255,.07);text-align:left;vertical-align:top;font-size:13px;line-height:1.55}
        .buy-guide-table thead th{background:#051a2e;color:#eda91a;font-size:11px;letter-spacing:.06em;text-transform:uppercase}
        .buy-guide-table tbody tr:hover{background:rgba(237,169,26,.05)}
        .buy-guide-table strong{color:#fff}
        .buy-guide-checklist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:22px;padding:0;list-style:none}
        .buy-guide-checklist li{position:relative;padding:16px 16px 16px 45px;border:1px solid rgba(255,255,255,.08);border-radius:11px;background:#071d33;color:#cbd6df;line-height:1.55}
        .buy-guide-checklist li::before{content:"✓";position:absolute;left:16px;top:15px;color:#eda91a;font-weight:900}
        .buy-guide-links{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:22px}
        .buy-guide-links a{padding:18px;border:1px solid rgba(237,169,26,.3);border-radius:11px;background:#071d33;color:#f6f3ed;text-decoration:none;font-weight:800;line-height:1.35}
        .buy-guide-links a span{display:block;margin-top:7px;color:#9fb2c4;font-size:12px;font-weight:500;line-height:1.5}
        .buy-guide-official{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:22px}
        .buy-guide-official a{display:block;padding:19px;border:1px solid rgba(255,255,255,.09);border-radius:11px;background:#071d33;color:#f6f3ed;text-decoration:none;font-weight:800}
        .buy-guide-official a span{display:block;margin-top:6px;color:#9fb2c4;font-size:12px;font-weight:500;line-height:1.5}
        .buy-guide-disclaimer{margin-top:22px;padding:16px 18px;border-left:3px solid #eda91a;background:rgba(237,169,26,.06);color:#aebdca;font-size:12px;line-height:1.7}
        @media(max-width:820px){.buy-guide-quick{grid-template-columns:1fr}.buy-guide-links{grid-template-columns:1fr}.buy-guide-official{grid-template-columns:1fr}.buy-guide-checklist{grid-template-columns:1fr}}
        @media(max-width:560px){.buy-guide-step{grid-template-columns:1fr}.buy-guide-step-number{width:42px;height:42px}.buy-guide-step h3{font-size:18px}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/listings" primaryActionLabel="Browse Licenses" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/listings">Buy</Link><span>›</span><strong>Buyer Guide</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Liquor License Buyer Guide</span>
              <h1>How to Buy a Florida Liquor License</h1>
              <p>
                Buying a Florida liquor license starts with the right license type and county—not with a price. This step-by-step guide explains how to identify the license you need, compare available quota licenses, perform due diligence, structure the purchase and complete the DBPR transfer process.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/listings">Browse Florida Licenses</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/counties">Compare County Markets</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Florida liquor license buying process">
              <span>Buying Process at a Glance</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>1</strong><small>choose license type</small></div>
                <div><strong>2</strong><small>choose county</small></div>
                <div><strong>3</strong><small>verify license</small></div>
                <div><strong>4</strong><small>apply for transfer</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell buy-guide-quick">
          <article>
            <span className="seo-market-section-kicker">Quick Answer</span>
            <h2>There are two different ways to “get” a Florida liquor license</h2>
            <p>
              If your business only needs beer and wine, or qualifies for a special license such as an eligible restaurant license, you may be able to apply directly through Florida’s Division of Alcoholic Beverages and Tobacco. If your business needs full-liquor privileges that fall under Florida’s quota system, you may need to <strong>buy an existing quota license from a current holder</strong> and obtain DBPR approval of the transfer.
            </p>
            <p>
              Florida law limits quota licenses on a county-by-county basis. The current statutory formula generally allows no more than one quota license for each 7,500 county residents, which is why existing 4COP- and 3PS-family quota licenses trade in a private secondary market.
            </p>
          </article>
          <aside className="buy-guide-quick-card">
            <strong>Before shopping</strong>
            <p>
              Know the county, the alcoholic beverages you intend to sell, whether customers will consume them on or off premises, and whether your business may qualify for a non-quota or special license. Buying the wrong series can be an expensive mistake.
            </p>
          </aside>
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

          <div className="buy-guide-steps">
            <article className="buy-guide-step">
              <div className="buy-guide-step-number">1</div>
              <div>
                <h3>Determine which license type your business actually needs</h3>
                <p>
                  Start with the privileges, not the listing. A 4COP-family quota license is commonly used for full-liquor on-premises concepts such as bars, lounges and nightclubs. A 3PS-family quota license is generally used for liquor-store package sales. Beer-and-wine licenses such as 2COP and 2APS are not quota licenses, and qualifying restaurants may be eligible for a special full-liquor restaurant license instead of buying a quota license.
                </p>
                <p><Link href="/resources/florida-liquor-license-types">Compare Florida liquor license types →</Link></p>
              </div>
            </article>

            <article className="buy-guide-step">
              <div className="buy-guide-step-number">2</div>
              <div>
                <h3>Choose the county and confirm the proposed location</h3>
                <p>
                  Florida’s quota system is administered county by county. Before negotiating for a license, confirm that the specific license and series fit the county where your business will operate and that your proposed premises can satisfy applicable zoning, right-of-occupancy and location requirements. Do not assume a quota license can simply be moved from one county to another.
                </p>
                <p><Link href="/counties">Browse all Florida county markets →</Link></p>
              </div>
            </article>

            <article className="buy-guide-step">
              <div className="buy-guide-step-number">3</div>
              <div>
                <h3>Compare available licenses and current asking prices</h3>
                <p>
                  Quota license prices are market prices, not fixed government fees. Asking prices can vary materially by county, license type, status, seller urgency, available inventory and buyer demand. Compare multiple listings in the same county whenever possible and separate the private-market purchase price from DBPR fees, transfer-related costs and professional fees.
                </p>
                <p><Link href="/florida-quota-liquor-license-cost">Compare quota license asking prices by county →</Link></p>
              </div>
            </article>

            <article className="buy-guide-step">
              <div className="buy-guide-step-number">4</div>
              <div>
                <h3>Perform due diligence on the exact license before you commit</h3>
                <p>
                  Verify the license number, current owner, series, county, status and renewal information. Investigate disclosed liens or security interests, whether the license is active or in escrow, and whether the seller has authority to transfer it. Confirm the transaction structure, the intended location and any conditions that could affect DBPR approval or closing.
                </p>
                <p>
                  A listing card or asking price is not proof that a particular license is free of liens, immediately transferable or suitable for your business. Independent verification matters.
                </p>
              </div>
            </article>

            <article className="buy-guide-step">
              <div className="buy-guide-step-number">5</div>
              <div>
                <h3>Negotiate the purchase agreement and protect the closing</h3>
                <p>
                  The agreement should clearly identify the license and purchase price and address deposits, closing conditions, responsibility for fees, seller cooperation, liens and what happens if the transfer is delayed or not approved. Buyers commonly make closing subject to required government approvals and satisfactory due diligence. An attorney or experienced licensing professional can help structure transaction-specific protections.
                </p>
              </div>
            </article>

            <article className="buy-guide-step">
              <div className="buy-guide-step-number">6</div>
              <div>
                <h3>Prepare the DBPR transfer application and supporting documents</h3>
                <p>
                  Florida DBPR identifies <strong>ABT-6002</strong> as the application for transfer of ownership of an existing alcoholic beverage license. Depending on the applicant and transaction, the submission may involve fingerprints, applicant and ownership information, fees, zoning or right-of-occupancy information, Department of Revenue clearance and other supporting materials required by the current checklist and form instructions.
                </p>
                <p><Link href="/dbpr-abt-6002">Review FLLM’s ABT-6002 transfer form guide →</Link></p>
              </div>
            </article>

            <article className="buy-guide-step">
              <div className="buy-guide-step-number">7</div>
              <div>
                <h3>Complete the transfer, closing and post-closing compliance</h3>
                <p>
                  The buyer’s ability to operate under the license depends on the transaction structure and DBPR approval. Coordinate the closing documents, funds, transfer application and any location or series changes so they match the actual deal. After approval, keep the license current and comply with renewal, location, ownership and operating requirements that apply to the license.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Choose the Right Category</span>
          <h2>Common Florida licenses buyers compare</h2>
          <div className="buy-guide-table-wrap">
            <table className="buy-guide-table">
              <thead>
                <tr><th>License</th><th>Typical use</th><th>Alcohol privileges</th><th>Quota?</th><th>Typical acquisition path</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>4COP family</strong></td><td>Bars, lounges, nightclubs, full-liquor hospitality</td><td>Beer, wine and spirits; on-premises privileges with package privileges depending on the series and approval</td><td>Yes</td><td>Buy an existing quota license or obtain a newly created quota license through the state drawing process</td></tr>
                <tr><td><strong>3PS family</strong></td><td>Liquor stores / package stores</td><td>Beer, wine and spirits for off-premises consumption</td><td>Yes</td><td>Buy an existing quota license or obtain a newly created quota license through the state drawing process</td></tr>
                <tr><td><strong>2COP</strong></td><td>Restaurants, cafés, beer-and-wine venues</td><td>Beer and wine for consumption on premises, subject to approved privileges</td><td>No</td><td>Apply through DBPR rather than buying quota inventory</td></tr>
                <tr><td><strong>2APS</strong></td><td>Grocery, convenience and specialty retail</td><td>Beer and wine package sales for off-premises consumption</td><td>No</td><td>Apply through DBPR rather than buying quota inventory</td></tr>
                <tr><td><strong>4COP-SFS / SRX</strong></td><td>Qualifying restaurants</td><td>Full liquor for an eligible restaurant subject to special-license requirements</td><td>Special exception</td><td>Apply if the restaurant satisfies the current statutory and DBPR qualifications</td></tr>
              </tbody>
            </table>
          </div>
          <p className="buy-guide-disclaimer">
            License terminology and privileges can be transaction-specific. Confirm the current DBPR classification, the exact series shown on the license and the requirements for your proposed business before relying on a general description.
          </p>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">Buyer Due Diligence</span>
              <h2>Florida liquor license buyer checklist</h2>
            </div>
          </div>
          <ul className="buy-guide-checklist">
            <li>Confirm the exact license number, series and county.</li>
            <li>Verify the current license owner and seller’s authority to transfer.</li>
            <li>Check current license status, expiration and renewal information.</li>
            <li>Review recorded or disclosed liens, mortgages or security interests.</li>
            <li>Confirm whether the license is active, inactive or held in escrow.</li>
            <li>Confirm your proposed premises and local zoning can support the intended use.</li>
            <li>Confirm buyer ownership, background and qualification requirements.</li>
            <li>Separate the negotiated purchase price from state fees and transfer costs.</li>
            <li>Determine who is responsible for taxes, fees, professional costs and closing expenses.</li>
            <li>Use a written agreement that addresses approval, due diligence and closing conditions.</li>
            <li>Review the current ABT-6002 instructions and DBPR checklist before filing.</li>
            <li>Coordinate closing timing with DBPR approval and any location or series changes.</li>
          </ul>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Budgeting the Purchase</span>
          <h2>How much does it cost to buy a Florida liquor license?</h2>
          <p>
            For a transferable quota license, the largest cost is often the private-market purchase price negotiated with the seller. That price can vary dramatically by county and market conditions. On top of the purchase price, a buyer should budget for applicable DBPR licensing or transfer fees, possible quota transfer fees, fingerprinting or application costs, legal or brokerage expenses, financing costs, and any zoning, premises or local permitting work required for the business.
          </p>
          <p>
            Do not confuse the <strong>market value of the license</strong> with the <strong>government fee to process or maintain the license</strong>. They are separate costs.
          </p>
          <div className="buy-guide-links">
            <Link href="/florida-quota-liquor-license-cost">Quota License Cost by County<span>Compare current disclosed 4COP and 3PS asking-price ranges.</span></Link>
            <Link href="/resources/quota-transfer-fee-calculator">Quota Transfer Fee Calculator<span>Estimate the statutory transfer-fee component using FLLM’s calculator.</span></Link>
            <Link href="/financing">Liquor License Financing<span>Review financing options for license purchases and refinances.</span></Link>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">Official Florida Sources</span>
              <h2>Verify the rules before you close</h2>
            </div>
          </div>
          <p>
            Florida Liquor License Market is a marketplace and information resource, not the licensing authority. Current application requirements should be confirmed with the Florida Division of Alcoholic Beverages and Tobacco and the current Florida Statutes.
          </p>
          <div className="buy-guide-official">
            <a href="https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/" target="_blank" rel="noopener noreferrer">Florida Division of Alcoholic Beverages &amp; Tobacco<span>Official DBPR licensing, applications, forms and account access.</span></a>
            <a href="https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=13356&clientCode=4008&xactCode=1060" target="_blank" rel="noopener noreferrer">DBPR Transfer-of-Ownership Checklist<span>Official checklist for transfer of ownership of an alcoholic beverage license.</span></a>
            <a href="https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/quota-license-information/" target="_blank" rel="noopener noreferrer">DBPR Quota License Information<span>Official quota drawing information and active/inactive quota license resources.</span></a>
            <a href="https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.20.html" target="_blank" rel="noopener noreferrer">Florida Statute § 561.20<span>Official county quota limitation for applicable alcoholic beverage licenses.</span></a>
            <a href="https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.32.html" target="_blank" rel="noopener noreferrer">Florida Statute § 561.32<span>Official statutory provisions governing transfer of alcoholic beverage licenses and interests.</span></a>
            <a href="https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.15.html" target="_blank" rel="noopener noreferrer">Florida Statute § 561.15<span>Official applicant qualification requirements for licenses under the Beverage Law.</span></a>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Start Shopping</span>
          <h2>Go from research to current Florida inventory</h2>
          <div className="buy-guide-links">
            <Link href="/listings">Florida Liquor Licenses for Sale<span>Browse current marketplace inventory across Florida.</span></Link>
            <Link href="/florida-4cop-liquor-license-for-sale">4COP Licenses for Sale<span>Review full-liquor quota opportunities for on-premises concepts.</span></Link>
            <Link href="/florida-3ps-liquor-license-for-sale">3PS Licenses for Sale<span>Review package-store quota opportunities.</span></Link>
            <Link href="/counties">Florida County Markets<span>Compare inventory and pricing county by county.</span></Link>
            <Link href="/resources/florida-liquor-license-types">License Types Guide<span>Compare 4COP, 3PS, 2COP, 2APS and specialty licenses.</span></Link>
            <Link href="/dbpr-abt-6002">ABT-6002 Transfer Guide<span>Review the state transfer application used for ownership changes.</span></Link>
          </div>
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
          <p className="buy-guide-disclaimer">
            This guide is general educational information, not legal, tax, licensing or investment advice. Rules, forms, fees and transaction requirements can change. Verify the current requirements with DBPR and appropriate professional advisers for the specific license and transaction.
          </p>
        </div>
      </section>

      <section className="seo-market-cta">
        <div className="seo-market-shell seo-market-cta-inner">
          <div>
            <span className="seo-market-section-kicker">Ready to Compare Licenses?</span>
            <h2>Browse Florida liquor licenses by county and type.</h2>
            <p>Start with current marketplace inventory, then verify the exact license before making an offer.</p>
          </div>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/listings">Browse Licenses</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/contact">Contact FLLM</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
