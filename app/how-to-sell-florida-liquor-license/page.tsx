import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/how-to-sell-florida-liquor-license`;

export const metadata: Metadata = {
  title: "How to Sell a Florida Liquor License | Seller Guide",
  description:
    "Learn how to sell a Florida liquor license step by step. Compare self-directed and broker-assisted selling, set an asking-price strategy, prepare your listing, negotiate terms, and coordinate transfer and closing.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "How to Sell a Florida Liquor License | Seller Guide",
    description:
      "A practical Florida seller guide covering pricing strategy, self-directed and broker-assisted selling, marketing, buyer inquiries, negotiation, transfer preparation and closing.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "How do I sell a Florida liquor license?",
    answer:
      "Start by confirming the exact license, county, ownership and status, then establish a realistic asking-price range. Decide whether to market the license yourself or use a broker, prepare the listing information, screen and respond to buyer inquiries, negotiate a written agreement, and coordinate the ownership-transfer and closing process with the buyer and appropriate professionals.",
  },
  {
    question: "Should I use a liquor license broker to sell my Florida license?",
    answer:
      "That depends on how much transaction support you want. A self-directed seller controls the listing, buyer communications and negotiations. A broker-assisted seller can obtain help with pricing strategy, marketing, buyer communications, negotiation and transaction coordination. Brokerage services and compensation should be confirmed in a separate written agreement before representation begins.",
  },
  {
    question: "How do I know what my Florida liquor license is worth?",
    answer:
      "Quota-license value varies by county, license type, available inventory, current asking prices, transaction history, status and buyer demand. Current pricing guidance should be treated as a market reference rather than a guaranteed sale price. FLLM provides county-level market information and a license value tool to help establish a starting range.",
  },
  {
    question: "Can I list my license on FLLM without using a broker?",
    answer:
      "Yes. FLLM offers a self-directed listing path in which the seller sets the asking price and listing details and manages buyer communications and the transaction. FLLM also offers a broker-assisted consultation path for sellers who want professional transaction support under a separate agreement.",
  },
  {
    question: "What should I prepare before listing a Florida liquor license for sale?",
    answer:
      "Be prepared to identify the license number, series, county, current ownership, status, asking price and preferred timing. Sellers should also know about any liens, security interests, pending transfers or other issues that could affect a buyer's due diligence or the closing process.",
  },
  {
    question: "What happens after I find a buyer?",
    answer:
      "The parties typically document the agreed terms in writing, complete transaction-specific due diligence, coordinate deposits and closing conditions, and prepare the materials required for the ownership-transfer process. The buyer and seller should confirm current DBPR requirements and use appropriate legal, tax or licensing professionals when needed.",
  },
];

export default function HowToSellFloridaLiquorLicensePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "How to Sell a Florida Liquor License: Step-by-Step Seller Guide",
      description:
        "A practical guide to selling a Florida liquor license, including pricing strategy, self-directed and broker-assisted marketing, buyer inquiries, negotiation, transfer preparation and closing.",
      datePublished: "2026-08-18",
      dateModified: "2026-08-24",
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
        @media(max-width:820px){.seller-guide-paths{grid-template-columns:1fr}.seller-guide-links{grid-template-columns:1fr}.seller-guide-checklist{grid-template-columns:1fr}}
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
                Selling a Florida liquor license starts with knowing what you own, what the market may pay, and how much transaction support you want. This guide covers pricing strategy, self-directed and broker-assisted selling, listing preparation, buyer inquiries, negotiation, transfer preparation and closing.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/sell-your-license">Sell Your License</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/florida-liquor-license-value">Check License Value</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Florida liquor license selling process">
              <span>Selling Process at a Glance</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>1</strong><small>verify license</small></div>
                <div><strong>2</strong><small>estimate value</small></div>
                <div><strong>3</strong><small>choose selling path</small></div>
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
            <h2>You can sell directly or request broker-assisted support</h2>
            <p>
              A self-directed seller controls the asking price, listing details, buyer communications and negotiation. A broker-assisted seller can request professional help with pricing strategy, marketing, buyer communications, negotiation and transaction coordination under a separate written brokerage agreement.
            </p>
            <p>
              In either case, the seller should understand the exact license being sold, disclose issues that may affect the transaction, use a written agreement, and coordinate the ownership-transfer and closing process carefully.
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
              <h2>Self-directed or broker-assisted?</h2>
            </div>
          </div>
          <div className="seller-guide-paths">
            <article className="seller-guide-path">
              <span>1</span>
              <h3>Self-Directed Listing</h3>
              <p>
                Set the asking price and listing details, receive buyer inquiries directly, and manage negotiation, professional advisers, transfer documents and closing coordination yourself. This path is designed for sellers who want direct control of the transaction.
              </p>
              <Link href="/sell-your-license">Start a self-directed listing →</Link>
            </article>
            <article className="seller-guide-path">
              <span>2</span>
              <h3>Broker-Assisted Sale</h3>
              <p>
                Request a consultation about pricing, marketing strategy, buyer communications, negotiation and transaction coordination. Brokerage representation and compensation begin only under a separate written agreement that defines the services and fees.
              </p>
              <Link href="/sell-your-license">Request a broker consultation →</Link>
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
              </div>
            </article>
            <article className="seller-guide-step">
              <div className="seller-guide-step-number">3</div>
              <div>
                <h3>Choose self-directed or broker-assisted selling</h3>
                <p>Decide whether you want to control the buyer communications and negotiation yourself or request professional transaction support. If using a broker, understand the scope of representation, exclusivity if any, compensation and termination terms before signing an agreement.</p>
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
                <h3>Coordinate the transfer and closing</h3>
                <p>Work with the buyer and the professionals involved so the purchase agreement, closing funds, transfer materials and any location or ownership changes reflect the actual transaction. Confirm current DBPR requirements before closing and retain records of the completed sale.</p>
                <p><Link href="/dbpr-abt-6002">Review FLLM&apos;s ABT-6002 transfer guide →</Link></p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-intro" id="fllm-seller-help">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">FLLM Seller Services & Resources</span>
          <h2>Use FLLM to price, market and prepare your sale</h2>
          <p>
            Florida Liquor License Market gives sellers both a self-directed marketplace path and access to broker-assisted consultation, together with market and transaction resources that can help before and during a sale.
          </p>
          <div className="seller-guide-links">
            <Link href="/sell-your-license">List Your License<span>Choose self-directed selling or request a broker-assisted consultation.</span></Link>
            <Link href="/florida-liquor-license-value">License Value<span>Estimate a market-value range using county and license-type data.</span></Link>
            <Link href="/florida-liquor-license-appraisal">Florida Liquor License Appraisal<span>Review the dedicated license-specific appraisal and valuation report page.</span></Link>
            <Link href="/resources/quota-transfer-fee-calculator">Transfer Fee Calculator<span>Estimate the statutory quota transfer-fee component as part of transaction planning.</span></Link>
            <Link href="/dbpr-abt-6002">Transfer Resources<span>Review the ownership-transfer guide and related preparation information.</span></Link>
            <Link href="/contact">Seller Assistance<span>Contact FLLM with questions about listing, pricing or broker-assisted options.</span></Link>
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
            <li>Choice of self-directed or broker-assisted selling.</li>
            <li>Any existing brokerage or listing agreement.</li>
            <li>Information a buyer may reasonably request for due diligence.</li>
            <li>A plan for legal, tax, licensing and closing support if needed.</li>
            <li>Current DBPR transfer requirements before closing.</li>
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
            <h2>Price the license, choose your selling path and reach the market.</h2>
            <p>Start with a self-directed listing, request broker-assisted support, or estimate the license&apos;s current market range first.</p>
          </div>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/sell-your-license">Sell Your License</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/florida-liquor-license-value">Check License Value</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/contact">Contact FLLM</Link>
          </div>
        </div>
      </section>
    </main>
  );
}