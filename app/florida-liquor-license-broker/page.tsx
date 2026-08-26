import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-broker`;

export const metadata: Metadata = {
  title: "Florida Liquor License Broker Services | FLLM",
  description:
    "FLLM provides Florida liquor license brokerage services for buyers and sellers, including sourcing, pricing, confidential marketing, negotiation and transaction coordination.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Broker Services | FLLM",
    description:
      "FLLM provides Florida liquor license brokerage services for buyers and sellers, with self-directed marketplace listings also available.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "What does a Florida liquor license broker do?",
    answer:
      "FLLM provides Florida liquor license brokerage services that may include locating or marketing license inventory, comparing county-level pricing, communicating with buyers or sellers, negotiating business terms and coordinating transaction milestones. The exact scope, representation and compensation are stated in a written agreement.",
  },
  {
    question: "Is every listing on FLLM brokered by FLLM?",
    answer:
      "FLLM provides brokerage services on matters accepted under a written brokerage agreement. The site also includes self-directed marketplace listings and advertising-only listings submitted by independent brokers. The applicable listing contact and representation are identified for the specific opportunity.",
  },
  {
    question: "Can I list a Florida liquor license without brokerage representation?",
    answer:
      "Yes. The FLLM self-directed listing path has a $14.95 one-time listing-submission fee. The seller controls the asking price, buyer communications, negotiation, advisers and transaction. No brokerage representation is included in that option.",
  },
  {
    question: "How does broker-assisted selling through FLLM begin?",
    answer:
      "A seller may request a consultation. Brokerage representation does not begin merely by selecting that option or submitting information. The parties must first accept a separate written agreement defining the representative, services, compensation, exclusivity if any and other material terms.",
  },
  {
    question: "Can an independent Florida liquor license broker advertise on FLLM?",
    answer:
      "Yes. An independent broker may submit a license for marketplace exposure. The broker remains the listing representative and transaction contact, retains control of the client relationship and receives routed buyer inquiries. FLLM's marketplace fee does not convert that listing into an FLLM-brokered transaction.",
  },
  {
    question: "Can FLLM help a buyer locate a Florida quota liquor license?",
    answer:
      "FLLM provides statewide inventory, county-market data, asking-price comparisons, license alerts and buyer-assistance requests. Transaction-specific sourcing, negotiation or representation should be confirmed separately for the buyer's particular search.",
  },
  {
    question: "Does a liquor license broker approve the transfer?",
    answer:
      "No. Florida's Division of Alcoholic Beverages and Tobacco administers alcoholic-beverage licensing and transfer approval. A broker or transaction professional may help coordinate information and milestones, but cannot guarantee approval, transferability or closing.",
  },
  {
    question: "How are Florida liquor license broker fees determined?",
    answer:
      "Brokerage compensation depends on the services and transaction and should be disclosed in the written brokerage agreement. FLLM's $14.95 self-directed listing-submission fee is an advertising-marketplace fee and is not a brokerage commission.",
  },
];

const brokerServices = [
  ["Inventory sourcing", "Identify license opportunities in the required county and series."],
  ["Pricing context", "Compare current inventory, asking prices and relevant market evidence."],
  ["Confidential marketing", "Present the opportunity while controlling public and private information."],
  ["Inquiry management", "Screen and communicate with prospective buyers or sellers when included in the engagement."],
  ["Business-term negotiation", "Help the client evaluate and negotiate price and transaction terms within the agreed scope."],
  ["Transaction coordination", "Track due diligence, documentation, transfer preparation and closing milestones with the professionals involved."],
] as const;

export default function FloridaLiquorLicenseBrokerPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Florida Liquor License Broker Services",
      description:
        "Florida liquor license brokerage services for buyers and sellers, including sourcing, pricing, marketing, negotiation and transaction coordination.",
      url: canonicalUrl,
      datePublished: "2026-08-26",
      dateModified: "2026-08-26",
      publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Florida Liquor License Broker Services",
      serviceType: "Florida liquor license brokerage services",
      provider: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      areaServed: { "@type": "State", name: "Florida" },
      url: canonicalUrl,
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
        { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/sell-your-license` },
        { "@type": "ListItem", position: 3, name: "Florida Liquor License Broker", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="seo-market-page broker-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <style>{`
        .broker-hero-note{margin-top:18px;padding:13px 15px;border-left:3px solid #eda91a;background:rgba(237,169,26,.08);color:#d8e1e8;font-size:12px;line-height:1.65}
        .broker-path-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:24px}
        .broker-path{display:flex;flex-direction:column;padding:25px;border:1px solid rgba(237,169,26,.32);border-radius:13px;background:linear-gradient(145deg,#0a2237,#04111c);box-shadow:0 12px 26px rgba(0,0,0,.16)}
        .broker-path>span{align-self:flex-start;padding:6px 10px;border-radius:999px;background:#eda91a;color:#061728;font-size:10px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
        .broker-path h3{margin:16px 0 10px;color:#fff;font-size:22px}
        .broker-path p{margin:0;color:#c6d2dc;line-height:1.7}
        .broker-path ul{display:grid;gap:9px;margin:18px 0 0;padding:0;list-style:none}
        .broker-path li{position:relative;padding-left:23px;color:#d7e0e7;line-height:1.5}
        .broker-path li::before{content:"✓";position:absolute;left:0;color:#eda91a;font-weight:900}
        .broker-path a{margin-top:auto;padding-top:22px;color:#eda91a;font-weight:900;text-decoration:none}
        .broker-path a:hover{text-decoration:underline}
        .broker-service-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px;margin-top:24px}
        .broker-service-card{padding:21px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:#071d33}
        .broker-service-card span{display:grid;width:36px;height:36px;place-items:center;margin-bottom:13px;border-radius:50%;background:#eda91a;color:#061728;font-weight:900}
        .broker-service-card h3{margin:0 0 8px;color:#f6f3ed;font-size:18px}
        .broker-page .broker-service-card p{margin:0;color:#e4ebf1!important;font-size:15px;line-height:1.7}
        .broker-audience-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:23px}
        .broker-audience{padding:24px;border:1px solid rgba(255,255,255,.09);border-radius:13px;background:#071d33}
        .broker-audience h3{margin:0 0 10px;color:#eda91a;font-size:21px}
        .broker-page .broker-audience p{margin:0;color:#e4ebf1!important;font-size:15px;line-height:1.7}
        .broker-audience a{display:inline-block;margin-top:15px;color:#f6f3ed;font-weight:900;text-decoration:none}
        .broker-audience a:hover{color:#eda91a}
        .broker-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px;margin-top:23px;counter-reset:broker-step}
        .broker-step{position:relative;padding:24px 20px 20px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:#071d33;counter-increment:broker-step}
        .broker-step::before{content:counter(broker-step);display:grid;width:37px;height:37px;place-items:center;margin-bottom:14px;border-radius:50%;background:#eda91a;color:#061728;font-weight:900}
        .broker-step h3{margin:0 0 8px;color:#f6f3ed;font-size:18px}
        .broker-page .broker-step p{margin:0;color:#e4ebf1!important;font-size:15px;line-height:1.7}
        .broker-independent{display:grid;grid-template-columns:1fr .88fr;gap:24px;align-items:start;margin-top:24px}
        .broker-independent-card{padding:23px;border:1px solid rgba(237,169,26,.3);border-radius:13px;background:linear-gradient(145deg,#0a2237,#04111c)}
        .broker-independent-card strong{display:block;color:#eda91a;font-size:18px}
        .broker-page .broker-independent-card p{margin:10px 0 0;color:#e4ebf1!important;font-size:15px;line-height:1.68}
        .broker-checklist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px;margin-top:22px;padding:0;list-style:none}
        .broker-checklist li{position:relative;padding:15px 15px 15px 43px;border:1px solid rgba(255,255,255,.08);border-radius:11px;background:#071d33;color:#cad5de;line-height:1.55}
        .broker-checklist li::before{content:"✓";position:absolute;left:15px;top:14px;color:#eda91a;font-weight:900}
        .broker-disclosure{margin-top:22px;padding:17px 19px;border-left:3px solid #eda91a;background:rgba(237,169,26,.06);color:#aebdca;font-size:12px;line-height:1.72}
        @media(max-width:820px){.broker-path-grid,.broker-audience-grid,.broker-independent{grid-template-columns:1fr}.broker-service-grid,.broker-steps{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:560px){.broker-service-grid,.broker-steps,.broker-checklist{grid-template-columns:1fr}.broker-path,.broker-audience{padding:21px}.broker-page .seo-market-hero h1{font-size:36px}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="Sell Your License" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/sell-your-license">Sell</Link><span>›</span><strong>Florida Liquor License Broker</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Statewide Brokerage Services for Buyers & Sellers</span>
              <h1>Florida Liquor License Broker Services</h1>
              <p>
                Florida Liquor License Market provides brokerage services to buyers and sellers of Florida quota liquor licenses. FLLM can assist with license sourcing, pricing strategy, confidential marketing, buyer and seller communications, negotiation and transaction coordination across all 67 counties. Self-directed marketplace listings are also available for clients who do not need representation.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/sell-your-license">Sell Your License</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/contact">Request Buyer Help</Link>
              </div>
              <p className="broker-hero-note">
                Brokerage representation is available through a separate written agreement defining the client, services and compensation. Self-directed and independent-broker listings remain clearly separate from FLLM-represented transactions.
              </p>
            </div>
            <aside className="seo-market-snapshot" aria-label="Florida liquor license broker process">
              <span>Transaction Support at a Glance</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>1</strong><small>define the need</small></div>
                <div><strong>2</strong><small>compare the market</small></div>
                <div><strong>3</strong><small>confirm representation</small></div>
                <div><strong>4</strong><small>coordinate the transaction</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell buy-guide-quick">
          <article>
            <span className="seo-market-section-kicker">Quick Answer</span>
            <h2>What can a Florida liquor license broker help with?</h2>
            <p>
              FLLM provides Florida liquor license broker services for buyers and sellers who want professional help with sourcing or marketing a license, interpreting county-level pricing, communicating with prospective parties, negotiating business terms and coordinating transaction milestones. The written brokerage agreement defines who FLLM represents and which services are included.
            </p>
            <p>
              Brokerage support does not replace DBPR approval or transaction-specific legal, tax, licensing, title, escrow or accounting advice. Buyers and sellers should confirm the exact license, parties, liens, transfer requirements and closing conditions before relying on a proposed transaction.
            </p>
          </article>
          <aside className="buy-guide-quick-card">
            <strong>Start with the county</strong>
            <p>
              Florida quota licenses are county-specific. A useful broker search begins with the operating county, required license series, intended use, budget and timing—not simply the first available statewide listing.
            </p>
          </aside>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">Choose Your Level of Support</span><h2>Broker representation or self-directed marketplace access?</h2></div>
          </div>
          <div className="broker-path-grid">
            <article className="broker-path">
              <span>Broker-Assisted</span>
              <h3>Work with FLLM on a represented transaction</h3>
              <p>Designed for clients who want defined assistance with pricing, marketing, communications, negotiation or transaction coordination.</p>
              <ul>
                <li>Begin with a consultation about the license and objective</li>
                <li>Confirm who the broker represents</li>
                <li>Define services, compensation and exclusivity in writing</li>
                <li>Representation begins only after the agreement is accepted</li>
              </ul>
              <Link href="/sell-your-license">Request a broker-assisted consultation →</Link>
            </article>
            <article className="broker-path">
              <span>Self-Directed</span>
              <h3>Use FLLM as an advertising marketplace</h3>
              <p>Designed for sellers and buyers who want direct control over communications, negotiation and professional advisers.</p>
              <ul>
                <li>$14.95 one-time self-directed listing-submission fee</li>
                <li>Seller controls asking price and listing information</li>
                <li>Buyer inquiries are directed to the listing contact</li>
                <li>No FLLM brokerage representation or commission is included</li>
              </ul>
              <Link href="/sell-your-license">Start a self-directed listing →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">Potential Scope of Services</span><h2>How broker assistance may support a transaction</h2></div>
          </div>
          <div className="broker-service-grid">
            {brokerServices.map(([title, description], index) => (
              <article className="broker-service-card" key={title}>
                <span>{index + 1}</span><h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
          <p className="broker-disclosure">Not every engagement includes every service. The written agreement controls the actual scope, representation, compensation and responsibilities for the specific matter.</p>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">For Buyers & Sellers</span><h2>Different goals require different support</h2></div>
          </div>
          <div className="broker-audience-grid">
            <article className="broker-audience">
              <h3>Buyer Assistance</h3>
              <p>Identify the correct county and series, review available inventory, compare disclosed asking prices, reach listing contacts and decide whether transaction-specific sourcing or negotiation support is needed.</p>
              <Link href="/how-to-buy-florida-liquor-license">Read the Florida buyer guide →</Link>
            </article>
            <article className="broker-audience">
              <h3>Seller Assistance</h3>
              <p>Confirm the license and ownership, establish a realistic pricing range, choose the appropriate marketing path, respond to serious inquiries and coordinate negotiation, due diligence, transfer preparation and closing.</p>
              <Link href="/how-to-sell-florida-liquor-license">Read the Florida seller guide →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">A Defined Engagement</span><h2>How broker-assisted work begins</h2></div>
          </div>
          <div className="broker-steps">
            <article className="broker-step"><h3>Describe the objective</h3><p>Identify whether you are buying or selling, the county, license series, timing, budget or asking-price expectations and known transaction issues.</p></article>
            <article className="broker-step"><h3>Review the market</h3><p>Compare available inventory, county-level pricing and the amount of support needed to pursue the objective.</p></article>
            <article className="broker-step"><h3>Confirm representation</h3><p>Determine who would be represented and whether any existing broker, listing agreement or conflict affects the matter.</p></article>
            <article className="broker-step"><h3>Define the services</h3><p>State the work to be performed, confidentiality, communication responsibilities, exclusivity if any and compensation in writing.</p></article>
            <article className="broker-step"><h3>Market or source</h3><p>Present the seller&apos;s opportunity or pursue buyer inventory according to the accepted engagement and confidentiality instructions.</p></article>
            <article className="broker-step"><h3>Coordinate milestones</h3><p>Track agreed business terms, due diligence, professional work, transfer preparation and closing without guaranteeing regulatory approval or completion.</p></article>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">Independent Broker Listings</span><h2>FLLM also works as a statewide advertising marketplace</h2></div>
          </div>
          <div className="broker-independent">
            <div>
              <p>
                A Florida liquor license broker may place a client&apos;s license on FLLM for additional marketplace exposure. On those listings, the submitting broker remains the listing representative, controls the client relationship and transaction, and receives the buyer inquiries routed through FLLM.
              </p>
              <p>
                The $14.95 marketplace listing fee does not transfer the brokerage relationship to FLLM, make FLLM a party to the broker&apos;s agreement or entitle FLLM to that broker&apos;s commission.
              </p>
            </div>
            <aside className="broker-independent-card">
              <strong>Broker-submitted listing</strong>
              <p>FLLM provides exposure and inquiry routing. The independent broker remains the representative and transaction contact.</p>
              <Link className="seo-market-button seo-market-button-gold" href="/brokers/list-your-license">List a Client License</Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">Before You Engage a Broker</span><h2>Questions every buyer or seller should ask</h2></div>
          </div>
          <ul className="broker-checklist">
            <li>Who does the broker represent in this transaction?</li>
            <li>What services are included and expressly excluded?</li>
            <li>How is compensation calculated and when is it earned?</li>
            <li>Is the engagement exclusive, and for how long?</li>
            <li>Who will communicate with buyers, sellers and advisers?</li>
            <li>What county and license series fit the intended use?</li>
            <li>How will asking prices and market evidence be evaluated?</li>
            <li>Who is responsible for license, ownership and lien verification?</li>
            <li>Which attorney, escrow, tax or licensing professionals are needed?</li>
            <li>What happens if DBPR approval is delayed or not obtained?</li>
          </ul>
        </div>
      </section>

      <section className="seo-market-faq">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">Broker Questions</span><h2>Florida liquor license broker FAQ</h2></div>
          </div>
          <div className="seo-market-faq-list">
            {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </div>
          <p className="broker-disclosure">
            Florida Liquor License Market provides Florida liquor license brokerage services under separate written agreements that define representation, scope and compensation. FLLM also offers self-directed marketplace listings that do not include brokerage representation and advertising-only listings submitted by independent brokers who remain the listing representative and transaction contact. FLLM does not provide legal, tax, accounting, title or regulatory advice and does not guarantee availability, price, transfer approval or closing. Confirm current requirements with Florida DBPR and appropriate professionals.
          </p>
        </div>
      </section>

      <section className="seo-market-cta">
        <div className="seo-market-shell seo-market-cta-inner">
          <div>
            <span className="seo-market-section-kicker">Work With FLLM</span>
            <h2>Request Florida liquor license broker services.</h2>
            <p>Tell us whether you are buying or selling, the county, license series and objective. FLLM will help define the appropriate brokerage or self-directed path.</p>
          </div>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/sell-your-license">Sell Your License</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/listings">Browse Licenses</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/contact">Contact FLLM</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
