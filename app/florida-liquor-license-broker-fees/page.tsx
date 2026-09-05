import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-broker-fees`;

export const metadata: Metadata = {
  title: "Florida Liquor License Broker Fees & Commissions | FLLM",
  description:
    "How much does a broker charge to sell a Florida liquor license? Learn broker fee structures, commission illustrations and full-service broker-assisted representation, plus how FLLM marketplace listing fees differ from brokerage compensation.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Broker Fees & Commissions | FLLM",
    description:
      "A practical guide to Florida liquor license broker compensation, full-service representation, percentage commission examples, flat-fee structures and FLLM marketplace listing fees.",
    siteName: "Florida Liquor License Market",
  },
};

const commissionRows = [
  { price: "$200,000", five: "$10,000", eight: "$16,000", ten: "$20,000" },
  { price: "$300,000", five: "$15,000", eight: "$24,000", ten: "$30,000" },
  { price: "$500,000", five: "$25,000", eight: "$40,000", ten: "$50,000" },
  { price: "$750,000", five: "$37,500", eight: "$60,000", ten: "$75,000" },
];

const faqs = [
  {
    question: "How much does a broker charge to sell a Florida liquor license?",
    answer:
      "There is no single commission rate that applies to every Florida liquor-license transaction. Broker compensation may be structured as a percentage of the sale price, a flat fee, a minimum fee, or another negotiated arrangement. The actual fee should be stated in the written brokerage agreement before services begin.",
  },
  {
    question: "What is a typical Florida liquor license broker commission?",
    answer:
      "FLLM does not publish or endorse one statewide typical commission because fees can vary materially by broker, license value, county, transaction complexity, marketing scope and services provided. Percentage-based fees are common enough that sellers should compare the dollar impact of several possible rates before signing an agreement.",
  },
  {
    question: "Does FLLM offer full-service broker-assisted representation?",
    answer:
      "Yes. FLLM is not limited to self-service marketplace listings. Florida liquor-license owners can request full-service broker-assisted representation under a separate written brokerage agreement. Depending on the engagement, services may include pricing strategy, confidential or public marketing, buyer outreach and screening, buyer communications, negotiation, transaction coordination, document organization, and coordination with attorneys, accountants, lenders, escrow agents, licensing professionals or other advisers involved in the transfer and closing.",
  },
  {
    question: "Are Florida liquor license broker commissions negotiable?",
    answer:
      "Broker compensation is commonly established by agreement between the broker and client. Sellers should review the fee structure, when the fee becomes earned, any minimum fee, exclusivity provisions, reimbursable expenses and post-termination obligations before signing.",
  },
  {
    question: "Who pays the broker fee in a Florida liquor license sale?",
    answer:
      "The party responsible for brokerage compensation depends on the written agreement and transaction structure. The agreement should identify who owes the fee, how it is calculated and when it is payable.",
  },
  {
    question: "What services may be included in a liquor license broker fee?",
    answer:
      "Depending on the engagement, full-service broker-assisted representation may include pricing strategy, county-market positioning, confidential or public marketing, buyer outreach, inquiry screening, buyer communications, negotiation, transaction coordination, document organization and coordination with attorneys, accountants, lenders, escrow agents, licensing professionals or other advisers. The exact scope should be stated in writing.",
  },
  {
    question: "Is the FLLM $14.95 or $24.95 marketplace fee a broker commission?",
    answer:
      "No. FLLM marketplace listing fees are advertising and marketplace-access charges, not a percentage of the license sale price. Independent brokers may list a client license while remaining the listing representative and transaction contact. Any commission between the broker and client is separate from FLLM. Sellers who want full-service broker-assisted representation use a separate written brokerage agreement rather than the advertising-only listing path.",
  },
  {
    question: "Can an independent broker list a client license on FLLM and keep the broker commission?",
    answer:
      "Yes. Under FLLM's independent-broker marketplace listing path, the broker remains the listing representative and transaction contact, and FLLM does not take a share of the broker's commission for the advertising-only marketplace listing.",
  },
  {
    question: "Can a Florida liquor license owner sell without hiring a broker?",
    answer:
      "Yes. FLLM also offers self-directed marketplace listings for owners who want to set their own asking price, receive buyer inquiries directly and manage their own transaction, subject to obtaining any legal, tax, licensing or other professional advice they need.",
  },
];

export default function FloridaLiquorLicenseBrokerFeesPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Florida Liquor License Broker Fees & Commissions",
      description:
        "A guide to Florida liquor license broker fee structures, full-service broker-assisted representation, commission examples, negotiable compensation and the difference between brokerage compensation and FLLM marketplace listing fees.",
      url: canonicalUrl,
      datePublished: "2026-09-05",
      dateModified: "2026-09-05",
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
        {
          "@type": "ListItem",
          position: 2,
          name: "Florida Liquor License Broker",
          item: `${siteUrl}/florida-liquor-license-broker`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Broker Fees & Commissions",
          item: canonicalUrl,
        },
      ],
    },
  ];

  return (
    <main className="seo-market-page broker-fees-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />

      <style>{`
        .broker-fees-page{background:#04111d;color:#eef3f7}
        .broker-fees-page .seo-market-hero{padding-bottom:64px}
        .broker-fees-page .seo-market-hero-grid{grid-template-columns:minmax(0,1.2fr) minmax(320px,.8fr)}
        .broker-fees-page .seo-market-hero h1{max-width:900px}
        .broker-fees-page .seo-market-hero p{max-width:850px}
        .fee-answer-strip{margin-top:22px;padding:18px 20px;border:1px solid rgba(237,169,26,.34);border-radius:12px;background:rgba(237,169,26,.07);color:#dce6ed;line-height:1.7}
        .fee-answer-strip strong{color:#eda91a}
        .fee-section{padding:72px 20px;background:#061827}
        .fee-section.alt{background:#04111d}
        .fee-shell{width:min(1120px,100%);margin:0 auto}
        .fee-heading{max-width:900px}
        .fee-kicker{color:#eda91a;font-size:12px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .fee-heading h2{margin:9px 0 14px;color:#fff;font-size:clamp(30px,4vw,44px);line-height:1.1}
        .fee-heading p{margin:0;color:#bdcad4;line-height:1.78;font-size:17px}
        .fee-card-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:30px}
        .fee-card{padding:24px;border:1px solid rgba(255,255,255,.09);border-radius:14px;background:linear-gradient(150deg,#0a263e,#061827);box-shadow:0 14px 34px rgba(0,0,0,.16)}
        .fee-card b{display:grid;width:38px;height:38px;place-items:center;border-radius:50%;background:#eda91a;color:#061728;font-size:14px}
        .fee-card h3{margin:15px 0 9px;color:#fff;font-size:20px}
        .fee-card p{margin:0;color:#c5d1da;line-height:1.68;font-size:15px}
        .commission-wrap{margin-top:30px;overflow:hidden;border:1px solid rgba(237,169,26,.28);border-radius:15px;background:#071d33}
        .commission-table{width:100%;border-collapse:collapse}
        .commission-table th,.commission-table td{padding:17px 18px;border-bottom:1px solid rgba(255,255,255,.08);text-align:right}
        .commission-table th:first-child,.commission-table td:first-child{text-align:left}
        .commission-table thead th{background:#0a263e;color:#eda91a;font-size:13px;text-transform:uppercase;letter-spacing:.05em}
        .commission-table tbody td{color:#e4ebf0}
        .commission-table tbody td:not(:first-child){font-weight:800;color:#fff}
        .commission-table tbody tr:last-child td{border-bottom:0}
        .table-note{margin:14px 0 0;color:#9fb0bd;font-size:13px;line-height:1.65}
        .comparison-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:30px}
        .comparison-card{padding:28px;border-radius:16px;border:1px solid rgba(255,255,255,.1);background:#071d33}
        .comparison-card.highlight{border-color:rgba(237,169,26,.45);background:linear-gradient(145deg,#0b2841,#071d33)}
        .comparison-card span{color:#eda91a;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.09em}
        .comparison-card h3{margin:8px 0 10px;color:#fff;font-size:26px}
        .comparison-card p{margin:0;color:#c4d0d9;line-height:1.75}
        .comparison-card ul{display:grid;gap:11px;margin:20px 0 0;padding:0;list-style:none}
        .comparison-card li{position:relative;padding-left:24px;color:#e0e8ee;line-height:1.55}
        .comparison-card li:before{content:"✓";position:absolute;left:0;color:#eda91a;font-weight:900}
        .fee-warning{margin-top:24px;padding:18px 20px;border-left:4px solid #eda91a;background:#071d33;color:#cbd6de;line-height:1.7}
        .questions-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:28px}
        .question-card{padding:22px;border:1px solid rgba(255,255,255,.09);border-radius:12px;background:#071d33}
        .question-card h3{margin:0 0 8px;color:#fff;font-size:18px}
        .question-card p{margin:0;color:#c3cfd8;line-height:1.68;font-size:15px}
        .broker-fee-cta{padding:70px 20px;background:#071d33;border-top:1px solid rgba(237,169,26,.2);border-bottom:1px solid rgba(237,169,26,.2)}
        .broker-fee-cta-shell{width:min(1120px,100%);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:18px}
        .cta-card{padding:30px;border-radius:16px;background:#04111d;border:1px solid rgba(255,255,255,.1)}
        .cta-card h3{margin:0 0 10px;color:#fff;font-size:27px}
        .cta-card p{margin:0 0 22px;color:#bdcad4;line-height:1.7}
        .cta-card a{display:inline-flex;min-height:46px;align-items:center;padding:0 18px;border-radius:8px;font-weight:900;text-decoration:none}
        .cta-card .gold{background:#eda91a;color:#061728}
        .cta-card .outline{border:1px solid rgba(255,255,255,.3);color:#fff}
        .fee-faq{padding:70px 20px;background:#061827}
        .fee-faq-shell{width:min(920px,100%);margin:0 auto}
        .fee-faq h2{margin:8px 0 22px;color:#fff;font-size:38px}
        .fee-faq details{border-bottom:1px solid rgba(255,255,255,.1)}
        .fee-faq summary{padding:19px 0;color:#fff;font-weight:850;cursor:pointer;font-size:17px}
        .fee-faq details p{margin:0;padding:0 0 19px;color:#bdcad4;line-height:1.75}
        .fee-related{padding:56px 20px;background:#04111d}
        .fee-related-shell{width:min(1120px,100%);margin:0 auto}
        .fee-related-links{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:22px}
        .fee-related-links a{padding:17px;border:1px solid rgba(255,255,255,.09);border-radius:10px;background:#071d33;color:#fff;font-weight:850;text-decoration:none;line-height:1.4}
        .fee-related-links a:hover{border-color:#eda91a;color:#eda91a}
        .fee-disclaimer{margin-top:24px;color:#879aa9;font-size:12px;line-height:1.7}
        @media(max-width:900px){.broker-fees-page .seo-market-hero-grid,.comparison-grid,.broker-fee-cta-shell{grid-template-columns:1fr}.fee-card-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.fee-related-links{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:620px){.fee-section,.broker-fee-cta,.fee-faq,.fee-related{padding-left:16px;padding-right:16px}.fee-card-grid,.questions-grid,.fee-related-links{grid-template-columns:1fr}.commission-wrap{overflow-x:auto}.commission-table{min-width:650px}.broker-fees-page .seo-market-hero h1{font-size:38px}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader
          primaryActionHref="/sell-your-license"
          primaryActionLabel="Sell Your License"
        />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/florida-liquor-license-broker">Florida Liquor License Broker</Link><span>›</span>
            <strong>Broker Fees & Commissions</strong>
          </div>

          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Broker Fee Guide</span>
              <h1>How Much Does a Florida Liquor License Broker Charge?</h1>
              <p>
                There is no single broker commission that applies to every Florida liquor-license sale. Compensation can vary by broker, license value, county, transaction complexity, marketing scope and the services included in the engagement. The fee should be clearly defined in the written brokerage agreement before work begins.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/sell-your-license">
                  Seller — Request Full-Service Representation
                </Link>
                <Link className="seo-market-button seo-market-button-dark" href="/brokers/list-your-license">
                  Broker — List a Client License
                </Link>
              </div>
              <div className="fee-answer-strip">
                <strong>Short answer:</strong> Florida liquor-license broker fees may be percentage-based, flat-fee, minimum-fee or otherwise negotiated. FLLM does not publish or endorse one statewide “typical” commission rate. FLLM is also not limited to low-cost self-service listings: sellers can request full-service broker-assisted representation under a separate written brokerage agreement.
              </div>
            </div>

            <aside className="seo-market-snapshot" aria-label="Broker fee quick facts">
              <span>Broker Fee Quick Facts</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>Full</strong><small>representation available</small></div>
                <div><strong>Varies</strong><small>compensation by agreement</small></div>
                <div><strong>% / $</strong><small>multiple fee structures</small></div>
                <div><strong>FLLM</strong><small>listing fee ≠ commission</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="fee-section">
        <div className="fee-shell">
          <div className="fee-heading">
            <span className="fee-kicker">Common Compensation Structures</span>
            <h2>How liquor license broker fees may be structured</h2>
            <p>
              A seller should evaluate the fee formula together with the services, exclusivity, term, minimum compensation and closing conditions. Two brokers quoting different percentages may be offering materially different scopes of work.
            </p>
          </div>

          <div className="fee-card-grid">
            <article className="fee-card">
              <b>1</b>
              <h3>Percentage commission</h3>
              <p>A percentage of the final sale price or other agreed transaction value. The agreement should define the calculation base and when the fee is earned.</p>
            </article>
            <article className="fee-card">
              <b>2</b>
              <h3>Flat fee</h3>
              <p>A fixed dollar amount for an agreed scope of brokerage or transaction services, regardless of the final license sale price.</p>
            </article>
            <article className="fee-card">
              <b>3</b>
              <h3>Minimum fee</h3>
              <p>A percentage arrangement may include a stated minimum dollar fee, which can matter significantly on lower-value transactions.</p>
            </article>
            <article className="fee-card">
              <b>4</b>
              <h3>Negotiated structure</h3>
              <p>Compensation may combine elements such as a base fee, success fee, reimbursable expenses or other terms agreed by the parties.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="fee-section alt">
        <div className="fee-shell">
          <div className="fee-heading">
            <span className="fee-kicker">Commission Cost Examples</span>
            <h2>What percentage commissions mean in actual dollars</h2>
            <p>
              Percentage quotes can sound small until they are applied to a six-figure liquor license. The examples below are illustrations only — not a statement that any particular percentage is customary, required or recommended.
            </p>
          </div>

          <div className="commission-wrap">
            <table className="commission-table">
              <thead>
                <tr>
                  <th>License Sale Price</th>
                  <th>5% Illustration</th>
                  <th>8% Illustration</th>
                  <th>10% Illustration</th>
                </tr>
              </thead>
              <tbody>
                {commissionRows.map((row) => (
                  <tr key={row.price}>
                    <td>{row.price}</td>
                    <td>{row.five}</td>
                    <td>{row.eight}</td>
                    <td>{row.ten}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="table-note">
            Illustrative commission examples only. Actual compensation depends on the written agreement between the broker and client and may use a different percentage, a flat fee, a minimum fee or another structure.
          </p>
        </div>
      </section>

      <section className="fee-section">
        <div className="fee-shell">
          <div className="fee-heading">
            <span className="fee-kicker">FLLM Service Levels</span>
            <h2>Full-service broker representation and marketplace advertising are separate FLLM paths</h2>
            <p>
              FLLM is a specialized Florida liquor-license marketplace and transaction-services ecosystem, not merely a low-cost listing board. License owners can request full-service broker-assisted representation, while experienced sellers and independent brokers can also choose advertising-only marketplace paths when that better fits the transaction.
            </p>
          </div>

          <div className="comparison-grid">
            <article className="comparison-card highlight">
              <span>Full-Service Broker-Assisted Representation</span>
              <h3>Professional representation under a written brokerage agreement</h3>
              <p>
                Sellers who want hands-on professional help can request representation covering the commercial stages agreed in writing.
              </p>
              <ul>
                <li>County-market review, valuation context and pricing strategy</li>
                <li>Confidential or public marketing and buyer outreach</li>
                <li>Buyer screening and communications</li>
                <li>Negotiation of price and other business terms</li>
                <li>Due-diligence and transaction milestone coordination</li>
                <li>Coordination with legal, licensing, financing, escrow and closing professionals</li>
              </ul>
            </article>

            <article className="comparison-card">
              <span>Marketplace Advertising</span>
              <h3>Advertising-only listing fees are not brokerage commissions</h3>
              <p>
                Experienced owners can choose a self-directed listing, and independent brokers can advertise client licenses while remaining the listing representative and transaction contact.
              </p>
              <ul>
                <li>Standard marketplace listings begin at $14.95 one time</li>
                <li>Featured listings are available at $24.95 with priority exposure</li>
                <li>No recurring marketplace charge</li>
                <li>No FLLM share of an independent broker&apos;s commission for an advertising-only listing</li>
              </ul>
            </article>
          </div>

          <div className="fee-warning">
            <strong style={{ color: "#fff" }}>Important:</strong> FLLM is not limited to self-service. Full-service broker-assisted representation is available under a separate written brokerage agreement. Paying a marketplace listing fee alone does not create a brokerage relationship.
          </div>
        </div>
      </section>

      <section className="fee-section alt">
        <div className="fee-shell">
          <div className="fee-heading">
            <span className="fee-kicker">Before You Sign</span>
            <h2>Questions to ask about a liquor license broker fee</h2>
            <p>
              The commission percentage is only one part of the economics. A clear written agreement should answer the questions that determine the seller&apos;s actual cost and the broker&apos;s actual obligations.
            </p>
          </div>

          <div className="questions-grid">
            <article className="question-card"><h3>How is the fee calculated?</h3><p>Ask whether compensation is based on the gross sale price, net proceeds, a fixed amount, a minimum fee or another formula.</p></article>
            <article className="question-card"><h3>When is the fee earned?</h3><p>Clarify whether the fee is due only at closing or can become payable after a qualifying buyer is produced or another contractual event occurs.</p></article>
            <article className="question-card"><h3>Is the agreement exclusive?</h3><p>Understand whether the owner can market the license independently, use other brokers or sell to an existing contact during the agreement term.</p></article>
            <article className="question-card"><h3>Are there additional expenses?</h3><p>Ask whether advertising, legal work, filing fees, travel, escrow, appraisals or other third-party costs are included or billed separately.</p></article>
            <article className="question-card"><h3>What full-service work is actually included?</h3><p>Compare pricing strategy, confidential marketing, buyer screening, communications, negotiation, due-diligence coordination and closing support — not just the quoted percentage.</p></article>
            <article className="question-card"><h3>What happens after termination?</h3><p>Review any protection period, tail provision or fee obligation that may survive after the brokerage agreement ends.</p></article>
          </div>
        </div>
      </section>

      <section className="broker-fee-cta">
        <div className="broker-fee-cta-shell">
          <article className="cta-card">
            <h3>Want full-service representation for your license sale?</h3>
            <p>
              Request a broker consultation through FLLM for professional help with pricing, marketing, buyer communications, negotiation and transaction coordination under a separate written brokerage agreement.
            </p>
            <Link className="gold" href="/sell-your-license">Request Full-Service Representation</Link>
          </article>
          <article className="cta-card">
            <h3>Already represent the seller?</h3>
            <p>
              Add your client&apos;s license to the FLLM marketplace while you remain the listing representative and transaction contact.
            </p>
            <Link className="outline" href="/brokers/list-your-license">List a Client License on FLLM</Link>
          </article>
        </div>
      </section>

      <section className="fee-faq">
        <div className="fee-faq-shell">
          <span className="fee-kicker">Frequently Asked Questions</span>
          <h2>Florida liquor license broker fees</h2>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="fee-related">
        <div className="fee-related-shell">
          <div className="fee-heading">
            <span className="fee-kicker">Related FLLM Resources</span>
            <h2>Continue your Florida liquor license research</h2>
          </div>
          <nav className="fee-related-links" aria-label="Related Florida liquor license resources">
            <Link href="/sell-your-license">Full-Service or Self-Directed Selling</Link>
            <Link href="/florida-liquor-license-broker">Florida Liquor License Broker</Link>
            <Link href="/brokers/list-your-license">Broker Marketplace Listings</Link>
            <Link href="/how-to-sell-florida-liquor-license">How to Sell a Florida Liquor License</Link>
            <Link href="/florida-liquor-license-value">Florida Liquor License Value</Link>
            <Link href="/florida-quota-liquor-license-cost">Florida Quota License Cost</Link>
            <Link href="/florida-liquor-license-appraisal">Florida Liquor License Appraisal</Link>
            <Link href="/listings">Florida Liquor Licenses for Sale</Link>
          </nav>
          <p className="fee-disclaimer">
            FLLM provides marketplace information and general educational content. Full-service broker-assisted representation, when requested, begins only under a separate written brokerage agreement. This page does not establish a customary commission rate, quote a specific broker&apos;s fee, create a brokerage relationship, or provide legal, tax or accounting advice. Compensation and services should be confirmed in the applicable written agreement.
          </p>
        </div>
      </section>
    </main>
  );
}