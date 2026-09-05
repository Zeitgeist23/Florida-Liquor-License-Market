import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/how-to-sell-florida-liquor-license`;

export const metadata: Metadata = {
  title: "How to Sell a Florida Liquor License | 7-Step Seller Guide",
  description:
    "Learn how to sell a Florida liquor license in 7 steps. Choose full-service broker-assisted representation or self-directed selling, price the license, market it, negotiate terms, review ABT-6002 transfer requirements and coordinate closing.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "How to Sell a Florida Liquor License | 7-Step Seller Guide",
    description:
      "A practical Florida seller guide covering full-service broker-assisted representation, self-directed selling, pricing strategy, marketing, buyer inquiries, negotiation, ABT-6002 transfer preparation and closing.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "How do I sell a Florida liquor license?",
    answer:
      "Start by confirming the exact license, county, ownership and status, then establish a realistic asking-price range. Decide whether you want full-service broker-assisted representation or a self-directed sale, prepare the listing information, screen and respond to buyer inquiries, negotiate a written agreement, and coordinate the ownership-transfer and closing process with the buyer and appropriate professionals.",
  },
  {
    question: "Should I use a liquor license broker to sell my Florida license?",
    answer:
      "That depends on how much professional help you want. Full-service broker-assisted representation can include pricing strategy, confidential or public marketing, buyer screening and communications, negotiation, transaction coordination and coordination with the professionals involved in the transfer and closing. A self-directed seller keeps direct control of the listing, buyer communications and negotiations. Brokerage services and compensation should be confirmed in a separate written agreement before representation begins.",
  },
  {
    question: "How do I know what my Florida liquor license is worth?",
    answer:
      "Quota-license value varies by county, license type, available inventory, current asking prices, transaction history, status and buyer demand. Current pricing guidance should be treated as a market reference rather than a guaranteed sale price. FLLM provides county-level market information and a license value tool to help establish a starting range.",
  },
  {
    question: "Can I list my license on FLLM without using a broker?",
    answer:
      "Yes. FLLM offers a self-directed listing path in which the seller sets the asking price and listing details and manages buyer communications and the transaction. FLLM also offers a full-service broker-assisted representation path for sellers who want professional help under a separate written brokerage agreement.",
  },
  {
    question: "What should I prepare before listing a Florida liquor license for sale?",
    answer:
      "Be prepared to identify the license number, series, county, current ownership, status, asking price and preferred timing. Sellers should also know about any liens, security interests, pending transfers or other issues that could affect a buyer's due diligence or the closing process.",
  },
  {
    question: "What happens after I find a buyer?",
    answer:
      "The parties typically document the agreed terms in writing, complete transaction-specific due diligence, coordinate deposits and closing conditions, and prepare the materials required for the ownership-transfer process. Florida's Department of Business and Professional Regulation (DBPR), through its Division of Alcoholic Beverages and Tobacco (DABT), administers alcoholic-beverage licensing and transfer approval. The buyer and seller should confirm current DABT/DBPR requirements and use appropriate legal, tax or licensing professionals when needed.",
  },
  {
    question: "Does the seller complete the ABT-6002 when a Florida liquor license is sold?",
    answer:
      "The seller or transferor generally must complete and sign the seller-side transfer documents required for the transaction, including the applicable transferor information or affidavit. Seller-side paperwork does not replace the buyer or transferee's completed transfer application. The parties should use the current DBPR/DABT ABT-6002 checklist and instructions for the actual transaction.",
  },
];

export default function HowToSellFloridaLiquorLicensePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "How to Sell a Florida Liquor License: 7-Step Seller Guide",
      description:
        "A practical guide to selling a Florida liquor license, including full-service broker-assisted representation, self-directed marketing, pricing strategy, buyer inquiries, negotiation, ABT-6002 transfer preparation and closing.",
      datePublished: "2026-08-18",
      dateModified: "2026-09-05",
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
        { "@type": "ListItem", position: 2, name: "Sell", item: `${siteUrl}/sell-your-license` },
        { "@type": "ListItem", position: 3, name: "How to Sell a Florida Liquor License", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="seo-market-page seller-guide-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <style>{`
        .seller-guide-paths{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:24px}
        .seller-guide-path{padding:24px;border:1px solid rgba(237,169,26,.32);border-radius:13px;background:linear-gradient(145deg,#0a2237,#04111c);box-shadow:0 12px 26px rgba(0,0,0,.16)}
        .seller-guide-path>span{display:grid;width:38px;height:38px;place-items:center;margin-bottom:15px;border-radius:50%;background:#eda91a;color:#061728;font-weight:900}
        .seller-guide-path h3{margin:0 0 9px;color:#fff;font-size:21px}
        .seller-guide-path p{margin:0;color:#c6d2dc;line-height:1.68}
        .seller-guide-path a{display:inline-block;margin-top:15px;color:#eda91a;font-weight:900;text-decoration:none}
        .seller-guide-path a:hover{text-decoration:underline}
        .seller-guide-steps{display:grid;gap:14px;margin-top:24px}
        .seller-guide-step{display:grid;grid-template-columns:54px 1fr;gap:17px;padding:22px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:#071d33}
        .seller-guide-step-number{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:#eda91a;color:#061728;font-weight:900;font-size:18px}
        .seller-guide-step h3{margin:0 0 8px;color:#f6f3ed;font-size:20px}
        .seller-guide-step p{margin:0;color:#aebdca;line-height:1.72}
        .seller-guide-step p+p{margin-top:10px}
        .seller-guide-step a{color:#eda91a;font-weight:800;text-decoration:none}
        .seller-guide-links{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:22px}
        .seller-guide-links a{padding:18px;border:1px solid rgba(237,169,26,.3);border-radius:11px;background:#071d33;color:#f6f3ed;text-decoration:none;font-weight:800;line-height:1.35}
        .seller-guide-links a span{display:block;margin-top:7px;color:#9fb2c4;font-size:12px;font-weight:500;line-height:1.5}
        .seller-guide-checklist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:22px;padding:0;list-style:none}
        .seller-guide-checklist li{position:relative;padding:16px 16px 16px 45px;border:1px solid rgba(255,255,255,.08);border-radius:11px;background:#071d33;color:#cbd6df;line-height:1.55}
        .seller-guide-checklist li::before{content:"✓";position:absolute;left:16px;top:15px;color:#eda91a;font-weight:900}
        .seller-guide-note{margin-top:22px;padding:16px 18px;border-left:3px solid #eda91a;background:rgba(237,169,26,.06);color:#aebdca;font-size:12px;line-height:1.7}
        .seller-guide-free{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;margin-top:26px;padding:24px;border:1px solid rgba(237,169,26,.4);border-radius:14px;background:linear-gradient(135deg,#071d33,#0b2943)}
        .seller-guide-free span{display:block;margin-bottom:7px;color:#eda91a;font-size:11px;font-weight:900;letter-spacing:.09em;text-transform:uppercase}
        .seller-guide-free h3{margin:0 0 8px;color:#fff;font-size:22px}
        .seller-guide-free p{margin:0;color:#bdcbd6;line-height:1.7}
        .seller-guide-free a{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 20px;border-radius:8px;background:#eda91a;color:#061728;font-weight:900;text-decoration:none;white-space:nowrap}
        @media(max-width:820px){.seller-guide-paths{grid-template-columns:1fr}.seller-guide-links{grid-template-columns:1fr}.seller-guide-checklist{grid-template-columns:1fr}.seller-guide-free{grid-template-columns:1fr}.seller-guide-free a{justify-self:start}}
        @media(max-width:560px){.seller-guide-step{grid-template-columns:1fr}.seller-guide-step-number{width:42px;height:42px}.seller-guide-step h3{font-size:18px}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="Sell Your License" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/sell-your-license">Sell</Link><span>›</span><strong>Seller Guide</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Liquor License Seller Guide</span>
              <h1>How to Sell a Florida Liquor License</h1>
              <p>
                Selling a Florida liquor license starts with knowing what you own, what the market may pay, and how much professional help you want. FLLM supports both full-service broker-assisted representation and self-directed selling. This guide covers pricing strategy, marketing, buyer inquiries, negotiation, ABT-6002 transfer preparation and closing.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/sell-your-license">Compare Selling Options</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/florida-liquor-license-value">Check License Value</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/free-guide">Free Buyer’s & Seller’s Guide</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Florida liquor license selling process">
              <span>Selling Process at a Glance</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>1</strong><small>verify license</small></div>
                <div><strong>2</strong><small>estimate value</small></div>
                <div><strong>3</strong><small>choose service level</small></div>
                <div><strong>4</strong><small>market and close</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell buy-guide-quick">
          <article>
            <span className="seo-market-section-kicker">Quick Answer</span>
            <h2>Choose full-service broker representation or self-directed control</h2>
            <p>
              Full-service broker-assisted representation can include pricing strategy, confidential or public marketing, buyer screening and communications, negotiation, transaction coordination and coordination with the professionals involved in the transfer and closing. The exact scope and compensation are defined in a separate written brokerage agreement.
            </p>
            <p>
              Sellers who prefer to manage the process themselves can choose a self-directed marketplace listing and retain direct control of asking price, buyer communications, negotiation and transaction management.
            </p>
          </article>
          <aside className="buy-guide-quick-card">
            <strong>Before you list</strong>
            <p>
              Confirm the license number, series, county, owner, current status, asking-price expectations and whether any liens, security interests, pending transfers or other issues may affect a sale.
            </p>
          </aside>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">Choose Your Selling Path</span>
              <h2>Full-service broker representation or self-directed selling?</h2>
            </div>
          </div>
          <div className="seller-guide-paths">
            <article className="seller-guide-path">
              <span>1</span>
              <h3>Full-Service Broker-Assisted Representation</h3>
              <p>
                Request professional representation for pricing strategy, market positioning, confidential or public marketing, buyer screening and communications, negotiation and transaction coordination. The scope of representation, exclusivity if any, services and compensation begin only under a separate written brokerage agreement.
              </p>
              <Link href="/sell-your-license">Request full-service broker representation →</Link>
            </article>
            <article className="seller-guide-path">
              <span>2</span>
              <h3>Self-Directed Marketplace Listing</h3>
              <p>
                Set the asking price and listing details, receive buyer inquiries directly, and manage negotiation, professional advisers, transfer documents and closing coordination yourself. This path is designed for experienced sellers who want direct control of the transaction.
              </p>
              <Link href="/sell-your-license">Start a self-directed listing →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">Step by Step</span>
              <h2>How to sell a Florida liquor license in 7 steps</h2>
            </div>
          </div>
          <div className="seller-guide-steps">
            <article className="seller-guide-step">
              <div className="seller-guide-step-number">1</div>
              <div>
                <h3>Verify the exact license and ownership</h3>
                <p>Confirm the license number, series, county, current owner and status before marketing it. Identify anything that may affect a transaction, including inactive or escrow status, pending changes, liens or security interests, or uncertainty about the seller&apos;s authority to transfer.</p>
              </div>
            </article>
            <article className="seller-guide-step">
              <div className="seller-guide-step-number">2</div>
              <div>
                <h3>Establish a realistic market-value range</h3>
                <p>Quota-license prices vary by county, license type, available inventory, asking prices and buyer demand. Use current county-level information as a reference rather than assuming the highest advertised price represents realizable value.</p>
                <p><Link href="/florida-liquor-license-value">Use the FLLM license value tool →</Link></p>
                <p><Link href="/florida-liquor-license-appraisal">Need a license-specific report for a lender, legal matter or fiduciary review? Review the Florida liquor license appraisal service →</Link></p>
              </div>
            </article>
            <article className="seller-guide-step">
              <div className="seller-guide-step-number">3</div>
              <div>
                <h3>Choose full-service broker representation or self-directed selling</h3>
                <p>Decide whether you want professional representation across pricing, marketing, buyer communications, negotiation and transaction coordination, or whether you prefer to manage those responsibilities yourself. If using a broker, understand the scope of representation, exclusivity if any, compensation and termination terms before signing an agreement.</p>
              </div>
            </article>
            <article className="seller-guide-step">
              <div className="seller-guide-step-number">4</div>
              <div>
                <h3>Prepare the listing and marketing information</h3>
                <p>Present the license accurately: county, series, status, asking price and relevant transaction details. Decide what should be public and what should remain confidential until a serious buyer is identified. Avoid implying that a listing alone proves transferability or guarantees government approval.</p>
              </div>
            </article>
            <article className="seller-guide-step">
              <div className="seller-guide-step-number">5</div>
              <div>
                <h3>Manage buyer inquiries and due diligence</h3>
                <p>Respond to serious inquiries, confirm what information the buyer needs, and be prepared for verification of the license, ownership, status and transaction conditions. A buyer may also investigate liens, location issues, qualification requirements and the proposed transfer structure before committing.</p>
              </div>
            </article>
            <article className="seller-guide-step">
              <div className="seller-guide-step-number">6</div>
              <div>
                <h3>Negotiate the written agreement</h3>
                <p>The agreement should identify the license, price, deposit, closing conditions, responsibility for fees and professional costs, seller cooperation, treatment of liens and what happens if required approvals are delayed or not obtained. Transaction-specific legal advice may be appropriate.</p>
              </div>
            </article>
            <article className="seller-guide-step">
              <div className="seller-guide-step-number">7</div>
              <div>
                <h3>Coordinate the ABT-6002 transfer and closing</h3>
                <p>Work with the buyer and the professionals involved so the purchase agreement, closing funds, transfer materials and any location or ownership changes reflect the actual transaction. Florida&apos;s Department of Business and Professional Regulation (DBPR), through its Division of Alcoholic Beverages and Tobacco (DABT), administers alcoholic-beverage licensing and transfer approval. Confirm current DABT/DBPR requirements before closing and retain records of the completed sale.</p>
                <p>The seller or transferor generally completes the seller-side transfer information or affidavit required for the transaction. That seller-side document is not a substitute for the buyer or transferee&apos;s completed ABT-6002 transfer application. The current DBPR/DABT checklist and instructions should control the filing.</p>
                <p><Link href="/dbpr-abt-6002">Review FLLM&apos;s ABT-6002 transfer guide →</Link></p>
              </div>
            </article>
          </div>

          <div className="seller-guide-free">
            <div>
              <span>Free Download</span>
              <h3>The Official Florida Liquor License Market Buyer’s & Seller’s Guide</h3>
              <p>Review pricing, transfers, financing, due diligence, license types and transaction resources before you list or negotiate a sale.</p>
            </div>
            <Link href="/free-guide">Download the Free Guide</Link>
          </div>
        </div>
      </section>

      <section className="seo-market-intro" id="fllm-seller-help">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">FLLM Seller Services & Resources</span>
          <h2>Use FLLM for full-service representation or self-directed marketplace access</h2>
          <p>
            Florida Liquor License Market is not limited to self-service listings. Sellers can request full-service broker-assisted representation under a separate written agreement or choose a self-directed marketplace path, while using FLLM&apos;s market and transaction resources before and during a sale.
          </p>
          <div className="seller-guide-links">
            <Link href="/sell-your-license">Sell Your License<span>Choose full-service broker-assisted representation or a self-directed marketplace listing.</span></Link>
            <Link href="/florida-liquor-license-broker">Broker Representation<span>Review the full-service broker-assisted pathway and what representation may include.</span></Link>
            <Link href="/florida-liquor-license-value">License Value<span>Estimate a market-value range using county and license-type data.</span></Link>
            <Link href="/florida-liquor-license-appraisal">Florida Liquor License Appraisal<span>Review the dedicated license-specific appraisal and valuation report page.</span></Link>
            <Link href="/resources/quota-transfer-fee-calculator">Transfer Fee Calculator<span>Estimate the statutory quota transfer-fee component as part of transaction planning.</span></Link>
            <Link href="/dbpr-abt-6002">ABT-6002 Transfer Resources<span>Review the ownership-transfer guide and seller/buyer preparation information.</span></Link>
            <Link href="/free-guide">Free Buyer’s & Seller’s Guide<span>Download FLLM’s comprehensive transaction guide before listing or closing.</span></Link>
            <Link href="/contact">Seller Assistance<span>Contact FLLM with questions about listing, pricing or full-service broker-assisted representation.</span></Link>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">Seller Checklist</span>
              <h2>What to have ready before you market the license</h2>
            </div>
          </div>
          <ul className="seller-guide-checklist">
            <li>License number, series and county.</li>
            <li>Current legal owner and seller authority.</li>
            <li>Current license status and renewal information.</li>
            <li>Known liens, security interests or encumbrances.</li>
            <li>Whether the license is active, inactive or in escrow.</li>
            <li>A realistic asking-price range and target net proceeds.</li>
            <li>Preferred sale timing and confidentiality level.</li>
            <li>Choice of full-service broker-assisted representation or self-directed selling.</li>
            <li>Any existing brokerage or listing agreement.</li>
            <li>Information a buyer may reasonably request for due diligence.</li>
            <li>A plan for legal, tax, licensing and closing support if needed.</li>
            <li>Current DABT/DBPR and ABT-6002 transfer requirements before closing.</li>
          </ul>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Pricing & Net Proceeds</span>
          <h2>Asking price is only one part of the sale</h2>
          <p>
            A seller should consider not only the headline purchase price but also brokerage compensation if applicable, legal or professional costs, transfer-related expenses allocated to the seller, taxes, lien payoffs and other closing adjustments. The amount a seller receives at closing can differ materially from the advertised asking price.
          </p>
          <p className="seller-guide-note">
            FLLM market estimates and asking-price information are informational starting points, not appraisals or guarantees of a sale price. For a license-specific appraisal, use the dedicated <Link href="/florida-liquor-license-appraisal">Florida Liquor License Appraisal</Link> page. Transaction-specific tax, legal and licensing consequences should be reviewed with the appropriate professionals.
          </p>
        </div>
      </section>

      <section className="seo-market-faq">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">Seller Questions</span><h2>How to sell a Florida liquor license FAQ</h2></div>
          </div>
          <div className="seo-market-faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>
            ))}
          </div>
          <p className="seller-guide-note">
            This guide is general educational information, not legal, tax, licensing, brokerage or investment advice. Rules, forms, fees and transaction requirements can change. Confirm current requirements and obtain transaction-specific professional advice when appropriate.
          </p>
        </div>
      </section>

      <section className="seo-market-cta">
        <div className="seo-market-shell seo-market-cta-inner">
          <div>
            <span className="seo-market-section-kicker">Ready to Sell?</span>
            <h2>Choose the service level that fits your Florida liquor license sale.</h2>
            <p>Request full-service broker-assisted representation, use a self-directed marketplace listing, or estimate the license&apos;s current market range first.</p>
          </div>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/sell-your-license">Compare Selling Options</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/florida-liquor-license-broker">Full-Service Broker Representation</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/florida-liquor-license-value">Check License Value</Link>
          </div>
        </div>
      </section>
    </main>
  );
}