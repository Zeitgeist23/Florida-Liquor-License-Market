import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../fllm-official-template.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";
import "../fllm-market-page-template.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-broker`;

export const metadata: Metadata = {
  title: "Florida Liquor License Broker | Sell Your License | FLLM",
  description:
    "Sell your Florida liquor license with FLLM broker-assisted representation. Get statewide marketing, pricing strategy, buyer outreach, negotiation and transaction coordination for 4COP and 3PS quota licenses.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Broker | Sell Your License | FLLM",
    description:
      "Florida liquor license broker-assisted representation for owners selling transferable 4COP and 3PS quota licenses statewide, with buyer assistance also available.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "Can FLLM help broker the sale of my Florida liquor license?",
    answer:
      "Yes. Florida liquor license owners can request broker-assisted representation through FLLM for pricing strategy, public or confidential marketing, buyer outreach and communications, negotiation, due-diligence coordination and transaction coordination under a separate written brokerage agreement.",
  },
  {
    question: "What does a Florida liquor license broker do for a seller?",
    answer:
      "Depending on the written engagement, a Florida liquor license broker may assist a seller with county-market analysis, pricing strategy, confidential or public marketing, buyer screening and communications, negotiation, due-diligence coordination, document organization and transaction coordination through closing.",
  },
  {
    question: "How do I list my Florida liquor license with FLLM as my broker?",
    answer:
      "Start by requesting seller representation through FLLM and providing the county, license type and basic sale information. FLLM can then discuss the proposed marketing approach, scope of services and compensation. Representation begins only after the parties enter into a separate written agreement.",
  },
  {
    question: "Can FLLM assist a buyer as well as a seller?",
    answer:
      "Yes. Buyer assistance remains available, but this page is primarily designed for Florida liquor license owners who want broker-assisted help marketing and selling a transferable license. Any buyer engagement is also defined by a separate written agreement.",
  },
  {
    question: "Does broker representation begin automatically when I contact FLLM?",
    answer:
      "No. Broker representation begins only after the parties enter into a separate written agreement defining the client, representative, scope of services, exclusivity if any, compensation and other material terms.",
  },
  {
    question: "Does a liquor license broker approve the transfer?",
    answer:
      "No. Florida's Department of Business and Professional Regulation, through its Division of Alcoholic Beverages and Tobacco, administers alcoholic-beverage licensing and transfer approval. A broker can help coordinate a transaction but cannot guarantee approval, transferability or closing.",
  },
  {
    question: "What if I am already a broker and only want to advertise my client's license?",
    answer:
      "Use FLLM's Independent Broker Marketplace. That program is advertising-only: your name and brokerage remain on the listing, buyer inquiries route to your designated contact, and FLLM does not take a share of your commission.",
  },
];

const sellerServices = [
  "County-market review and pricing strategy",
  "Public or confidential marketing",
  "Buyer screening and communications",
  "Negotiation of price and business terms",
  "Due-diligence and transaction coordination",
  "Coordination with licensing, legal, escrow and closing professionals",
];

const buyerServices = [
  "Identify the correct county and license series",
  "Locate public, confidential and broker-represented opportunities",
  "Compare asking prices and county-market evidence",
  "Coordinate communications with sellers and listing representatives",
  "Assist with negotiation and due diligence",
  "Coordinate financing, licensing, escrow and closing milestones",
];

const supportCards = [
  ["01", "County pricing strategy", "Review current inventory, asking prices and county-market evidence before positioning the license for sale."],
  ["02", "Listing & marketing strategy", "Choose a public or confidential marketing approach appropriate to the license, county and seller's objectives."],
  ["03", "Buyer outreach", "Present the opportunity through FLLM's statewide marketplace and appropriate direct outreach channels."],
  ["04", "Inquiry screening", "Organize buyer inquiries and communications within the agreed seller-representation scope."],
  ["05", "Negotiation", "Assist with price and business-term negotiations while the seller retains final decision authority."],
  ["06", "Transaction coordination", "Track diligence, transfer, financing, escrow and closing milestones with the appropriate professionals."],
];

export default function FloridaLiquorLicenseBrokerPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Florida Liquor License Broker",
      description:
        "Statewide Florida liquor license broker-assisted representation focused on owners selling transferable 4COP quota and 3PS licenses, with buyer assistance also available.",
      url: canonicalUrl,
      datePublished: "2026-08-26",
      dateModified: "2026-09-18",
      publisher: {
        "@type": "Organization",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Florida Liquor License Broker-Assisted Seller Representation",
      serviceType: "Florida liquor license brokerage, marketing and transaction representation",
      provider: {
        "@type": "Organization",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
      areaServed: { "@type": "State", name: "Florida" },
      audience: [
        { "@type": "Audience", audienceType: "Florida liquor license owners and sellers" },
        { "@type": "Audience", audienceType: "Florida liquor license buyers" },
      ],
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
  ];

  return (
    <main className="seo-market-page fllm-official-page broker-choice-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />

      <style>{`
        .broker-choice-page{background:#0d3152;color:#fff}
        .broker-choice-page .seo-market-hero{padding:54px 0 58px}
        .broker-choice-page .seo-market-hero::after{content:"BROKER";right:1vw;bottom:-34px;font-size:clamp(120px,15vw,220px)}
        .broker-choice-page .seo-market-hero h1{max-width:830px}
        .broker-choice-page .seo-market-hero p{max-width:800px}
        .broker-hero-clarifier{max-width:810px;margin:19px 0 0;padding:14px 16px;border-left:3px solid #f1a600;background:#0b2842;color:#d6e3eb;font-size:14px;line-height:1.65}
        .broker-jump-nav{display:flex;flex-wrap:wrap;gap:9px;margin-top:20px}
        .broker-jump-nav a{min-height:34px;display:inline-flex;align-items:center;padding:0 12px;border:1px solid rgba(241,166,0,.72);border-radius:999px;background:rgba(241,166,0,.06);color:#ffbd24;font-size:11px;font-weight:900;text-decoration:none;transition:.18s ease}
        .broker-jump-nav a:hover{background:#f1a600;color:#07101a;transform:translateY(-1px)}
        .broker-updated{margin:15px 0 0;color:#c4d4df;font-size:12px}
        .broker-service-section{padding:68px 0;background:#123b61;border-top:1px solid #72551b;border-bottom:1px solid #72551b}
        .broker-section-head{max-width:920px;margin-bottom:26px}
        .broker-section-head span{color:#f1a600;font-size:13px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
        .broker-section-head h2{margin:8px 0 13px;color:#fff;font-family:Georgia,"Times New Roman",serif;font-size:clamp(31px,4vw,46px);line-height:1.06}
        .broker-section-head p{margin:0;color:#d0dce4;font-size:16px;line-height:1.72}
        .broker-path-grid{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,.88fr);gap:18px}
        .broker-path-card.seller-primary{border-color:#d99a18;box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 18px 38px rgba(3,17,29,.32),0 0 0 1px rgba(241,166,0,.08)}
        .broker-path-card{display:flex;min-height:480px;flex-direction:column;padding:28px;border:1px solid #9c7019;border-radius:10px;background:linear-gradient(145deg,#15466f 0%,#0b3153 50%,#071f36 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 16px 34px rgba(3,17,29,.27);transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}
        .broker-path-card:hover{transform:translateY(-5px);border-color:#f1a600;box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 22px 44px rgba(3,17,29,.38),0 0 20px rgba(241,166,0,.16)}
        .broker-path-card .eyebrow{color:#f1a600;font-size:12px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .broker-path-card h3{margin:9px 0 12px;color:#fff;font-family:Georgia,"Times New Roman",serif;font-size:29px;line-height:1.12}
        .broker-path-card>p{margin:0;color:#d3dfe6;font-size:16px;line-height:1.7}
        .broker-path-card ul{display:grid;gap:11px;margin:22px 0 0;padding:0;list-style:none}
        .broker-path-card li{position:relative;padding-left:25px;color:#eef3f6;font-size:15px;line-height:1.5}
        .broker-path-card li::before{content:"✓";position:absolute;left:0;color:#f1a600;font-weight:900}
        .broker-card-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:auto;padding-top:27px}
        .broker-card-actions a{min-height:44px;display:inline-flex;align-items:center;justify-content:center;padding:0 17px;border-radius:4px;font-size:12px;font-weight:900;text-decoration:none;text-transform:uppercase;transition:.18s ease}
        .broker-card-actions .primary{border:1px solid #ffd468;background:linear-gradient(145deg,#ffd66f 0%,#ffbd24 42%,#e69a00 100%);color:#07101a;box-shadow:0 7px 15px rgba(3,17,29,.32)}
        .broker-card-actions .secondary{border:1px solid #f1a600;background:rgba(2,11,18,.38);color:#ffbd24}
        .broker-card-actions a:hover{transform:translateY(-2px) scale(1.02);filter:brightness(1.08)}
        .broker-support-section{padding:68px 0;background:#0d3152}
        .broker-support-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
        .broker-support-card{min-height:210px;padding:23px;border:1px solid #315b7e;border-radius:10px;background:linear-gradient(145deg,#15466f 0%,#0b3153 52%,#071f36 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 12px 26px rgba(3,17,29,.24);transition:.18s ease}
        .broker-support-card:hover{transform:translateY(-5px);border-color:#69d6ff;box-shadow:0 18px 34px rgba(3,17,29,.36),0 0 20px rgba(105,214,255,.12)}
        .broker-support-card b{display:grid;width:38px;height:38px;place-items:center;border:1px solid rgba(105,214,255,.55);border-radius:50%;background:#0d3659;color:#69d6ff;font-size:12px}
        .broker-support-card h3{margin:14px 0 8px;color:#fff;font-size:20px}
        .broker-support-card p{margin:0;color:#d2dee6;font-size:15px;line-height:1.65}
        .broker-distinction-section{padding:68px 0;background:#123b61;border-top:1px solid #72551b;border-bottom:1px solid #72551b}
        .broker-distinction-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(320px,.9fr);gap:24px;align-items:stretch}
        .broker-distinction-copy,.broker-ad-card{padding:27px;border:1px solid #8a6412;border-radius:10px;background:#0b3153;box-shadow:0 16px 34px rgba(3,17,29,.28)}
        .broker-distinction-copy h2,.broker-ad-card h3{margin:8px 0 12px;color:#fff;font-family:Georgia,"Times New Roman",serif;line-height:1.08}
        .broker-distinction-copy h2{font-size:36px}
        .broker-ad-card h3{font-size:28px}
        .broker-distinction-copy p,.broker-ad-card p{color:#d2dee6;font-size:16px;line-height:1.72}
        .broker-ad-card span,.broker-distinction-copy>span{color:#f1a600;font-size:12px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .broker-ad-card a{margin-top:10px}
        .broker-faq{padding:68px 0;background:#0d3152}
        .broker-faq details{margin-bottom:10px;border:1px solid #315b7e;border-radius:8px;background:#0b3153}
        .broker-faq summary{padding:17px 19px;color:#fff;font-weight:850;cursor:pointer}
        .broker-faq details p{margin:0;padding:0 19px 18px;color:#d3dfe6;font-size:16px;line-height:1.72}
        .broker-final{padding:54px 0;background:#071f36;border-top:1px solid #8a6412;text-align:center}
        .broker-final h2{margin:0;color:#fff;font-family:Georgia,"Times New Roman",serif;font-size:36px}
        .broker-final p{max-width:820px;margin:12px auto 22px;color:#d0dce4;font-size:16px;line-height:1.7}
        .broker-final-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap}
        @media(max-width:900px){.broker-path-grid,.broker-distinction-grid{grid-template-columns:1fr}.broker-support-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.broker-path-card{min-height:0}}
        @media(max-width:620px){.broker-support-grid{grid-template-columns:1fr}.broker-path-card{padding:23px}.broker-choice-page .seo-market-hero h1{font-size:40px}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader
          primaryActionHref="/sell-your-license"
          primaryActionLabel="List Your License"
        />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><strong>Florida Liquor License Broker</strong>
          </div>

          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Sell Your Florida Liquor License</span>
              <h1>Florida Liquor License Broker for Sellers</h1>
              <p>
                Own a transferable Florida liquor license and want help selling it? FLLM provides statewide broker-assisted representation for 4COP and 3PS quota-license owners, including market pricing strategy, public or confidential marketing, buyer outreach, negotiation and transaction coordination.
              </p>

              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/sell-your-license">
                  Sell My Liquor License
                </Link>
                <Link className="seo-market-button seo-market-button-dark" href="/florida-liquor-license-value">
                  Check My License Value
                </Link>
              </div>

              <nav className="broker-jump-nav" aria-label="Broker service sections">
                <a href="#seller-services">Sell My License</a>
                <a href="#what-we-do">How FLLM Helps</a>
                <a href="/florida-liquor-license-broker-fees">Broker Fees</a>
                <a href="#buyer-services">Buyer Assistance</a>
              </nav>

              <div className="broker-hero-clarifier">
                <strong>For Florida liquor license owners:</strong> seller representation is designed to help position, market and coordinate the sale of a transferable license. Representation, exclusivity, scope and compensation are established only in a separate written agreement.
              </div>
              <p className="broker-updated">Statewide service across all 67 Florida counties · 4COP and 3PS quota focus</p>
            </div>

            <aside className="seo-market-snapshot" aria-label="FLLM broker service snapshot">
              <span>Seller Representation Snapshot</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>Sell</strong><small>broker-assisted marketing</small></div>
                <div><strong>Value</strong><small>county pricing strategy</small></div>
                <div><strong>67</strong><small>Florida counties</small></div>
                <div><strong>4COP</strong><small>&amp; 3PS quota focus</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="broker-service-section" aria-labelledby="choose-broker-service">
        <div className="seo-market-shell">
          <div className="broker-section-head">
            <span>For Florida License Owners</span>
            <h2 id="choose-broker-service">Sell your Florida liquor license with broker representation</h2>
            <p>
              FLLM&apos;s primary brokerage path is designed for owners who want professional help pricing, marketing and selling a transferable Florida liquor license. Buyer assistance remains available as a secondary service.
            </p>
          </div>

          <div className="broker-path-grid">
            <article className="broker-path-card seller-primary" id="seller-services">
              <span className="eyebrow">For License Owners</span>
              <h3>Seller Representation</h3>
              <p>
                For owners of transferable Florida liquor licenses who want professional assistance positioning, marketing and coordinating a sale.
              </p>
              <ul>
                {sellerServices.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="broker-card-actions">
                <Link className="primary" href="/sell-your-license">Sell My Liquor License</Link>
                <Link className="secondary" href="/florida-liquor-license-broker-fees">Review Broker Fees</Link>
              </div>
            </article>

            <article className="broker-path-card" id="buyer-services">
              <span className="eyebrow">For License Buyers</span>
              <h3>Buyer Representation</h3>
              <p>
                For buyers who want help finding the correct county and license type, comparing available opportunities and coordinating a purchase.
              </p>
              <ul>
                {buyerServices.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="broker-card-actions">
                <Link className="primary" href="/contact">Request Buyer Assistance</Link>
                <Link className="secondary" href="/listings">Browse Marketplace</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="broker-support-section" id="what-we-do">
        <div className="seo-market-shell">
          <div className="broker-section-head">
            <span>Seller Brokerage Support</span>
            <h2>How FLLM can help market and sell your license</h2>
            <p>
              The exact scope is defined in the written engagement, but these are the principal areas FLLM can help coordinate for a Florida liquor license owner preparing to sell.
            </p>
          </div>

          <div className="broker-support-grid">
            {supportCards.map(([n, title, copy]) => (
              <article className="broker-support-card" key={title}>
                <b>{n}</b>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="broker-distinction-section" id="independent-brokers">
        <div className="seo-market-shell">
          <div className="broker-distinction-grid">
            <div className="broker-distinction-copy">
              <span>Keep the Services Separate</span>
              <h2>Already representing the client?</h2>
              <p>
                If you are an independent broker and only want additional marketplace exposure for your client&apos;s liquor license, you do not need FLLM broker representation. Use the Independent Broker Marketplace instead. Your name and brokerage remain on the listing, buyer inquiries route to your designated contact, and FLLM does not take a share of your commission.
              </p>
              <div className="broker-card-actions">
                <Link className="primary" href="/brokers/list-your-license">Advertise a Client License</Link>
              </div>
            </div>

            <aside className="broker-ad-card">
              <span>Advertising Only</span>
              <h3>Independent Broker Marketplace</h3>
              <p>
                Standard and Featured third-party broker listings are a separate advertising product. FLLM provides marketplace exposure and inquiry routing while the outside broker remains the representative and transaction contact.
              </p>
              <div className="broker-card-actions">
                <Link className="secondary" href="/brokers/list-your-license">View Broker Listing Options</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="broker-faq">
        <div className="seo-market-shell">
          <div className="broker-section-head">
            <span>Frequently Asked Questions</span>
            <h2>Florida liquor license broker questions</h2>
          </div>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="broker-final">
        <div className="seo-market-shell">
          <h2>Ready to sell your Florida liquor license?</h2>
          <p>
            Request broker-assisted seller representation through FLLM for pricing strategy, statewide marketing, buyer communications, negotiation and transaction coordination. Buyer assistance remains available separately.
          </p>
          <div className="broker-final-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/sell-your-license">Sell My Liquor License</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/contact">Talk to FLLM</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
