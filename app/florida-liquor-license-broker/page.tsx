import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-broker`;

export const metadata: Metadata = {
  title: "Florida Liquor License Broker | Broker Listings & Seller Representation | FLLM",
  description:
    "Florida Liquor License Market offers two brokerage pathways: independent brokers can list client licenses on FLLM, and license owners can request broker-assisted representation to sell a Florida liquor license.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Broker | FLLM",
    description:
      "Two ways to use FLLM: brokers can advertise client licenses, and sellers can request professional broker representation.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "Can a Florida liquor license broker list a client's license on FLLM?",
    answer:
      "Yes. Independent brokers may submit client licenses to the FLLM marketplace. The broker remains the listing representative and transaction contact, and FLLM does not take a share of the broker's commission for an advertising-only marketplace listing.",
  },
  {
    question: "Can a liquor license owner hire a broker through FLLM?",
    answer:
      "Yes. A Florida liquor license owner may request broker-assisted representation. Representation begins only after the parties enter into a separate written agreement defining the representative, services, compensation and other material terms.",
  },
  {
    question: "Is every license on FLLM represented by FLLM?",
    answer:
      "No. FLLM includes independent-broker listings, self-directed seller listings and transactions that may be handled under a separate brokerage agreement. The applicable contact and representation should be confirmed for each opportunity.",
  },
  {
    question: "What can broker-assisted representation include?",
    answer:
      "Depending on the written engagement, services may include pricing strategy, confidential marketing, buyer communications, negotiation, transaction coordination and assistance organizing information needed for the Florida liquor-license transfer process.",
  },
  {
    question: "Does a liquor license broker approve the transfer?",
    answer:
      "No. Florida's Division of Alcoholic Beverages and Tobacco administers alcoholic-beverage licensing and transfer approval. A broker can help coordinate a transaction but cannot guarantee approval, transferability or closing.",
  },
  {
    question: "Can I sell a Florida liquor license without hiring a broker?",
    answer:
      "Yes. FLLM also offers a self-directed marketplace listing path for owners who want to set their own asking price, communicate with buyers and manage their own transaction.",
  },
];

export default function FloridaLiquorLicenseBrokerPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Florida Liquor License Broker",
      description:
        "Two Florida liquor license brokerage pathways: independent brokers may list client licenses on FLLM, and sellers may request professional broker-assisted representation.",
      url: canonicalUrl,
      datePublished: "2026-08-26",
      dateModified: "2026-09-01",
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
          item: canonicalUrl,
        },
      ],
    },
  ];

  return (
    <main className="seo-market-page broker-choice-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />

      <style>{`
        .broker-choice-page{background:#04111d}
        .broker-choice-page .seo-market-hero{padding-bottom:62px}
        .broker-choice-page .seo-market-hero-grid{grid-template-columns:minmax(0,1.25fr) minmax(320px,.75fr)}
        .broker-choice-page .seo-market-hero h1{max-width:850px}
        .broker-choice-page .seo-market-hero p{max-width:820px}
        .broker-choice-note{margin-top:20px;padding:14px 16px;border-left:3px solid #eda91a;background:rgba(237,169,26,.07);color:#d5dfe7;font-size:13px;line-height:1.65}
        .broker-two-paths{padding:72px 20px;background:#061827}
        .broker-two-paths-shell{width:min(1120px,100%);margin:0 auto}
        .broker-path-heading{text-align:center;max-width:850px;margin:0 auto 28px}
        .broker-path-heading span{color:#eda91a;font-size:12px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .broker-path-heading h2{margin:9px 0 12px;color:#fff;font-size:clamp(30px,4vw,46px);line-height:1.08}
        .broker-path-heading p{margin:0;color:#b9c8d3;line-height:1.75;font-size:17px}
        .broker-path-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin-top:34px}
        .broker-path-card{display:flex;flex-direction:column;min-height:500px;padding:30px;border:1px solid rgba(237,169,26,.34);border-radius:16px;background:linear-gradient(150deg,#0a263e,#04111d);box-shadow:0 16px 40px rgba(0,0,0,.2)}
        .broker-path-card .number{display:grid;width:48px;height:48px;place-items:center;border-radius:50%;background:#eda91a;color:#061728;font-weight:950;font-size:20px}
        .broker-path-card .eyebrow{margin-top:18px;color:#eda91a;font-size:12px;font-weight:900;letter-spacing:.09em;text-transform:uppercase}
        .broker-path-card h3{margin:8px 0 12px;color:#fff;font-size:28px;line-height:1.15}
        .broker-path-card>p{margin:0;color:#c7d3dc;line-height:1.75;font-size:16px}
        .broker-path-card ul{display:grid;gap:11px;margin:22px 0 0;padding:0;list-style:none}
        .broker-path-card li{position:relative;padding-left:25px;color:#e2e9ef;line-height:1.55}
        .broker-path-card li:before{content:"✓";position:absolute;left:0;color:#eda91a;font-weight:900}
        .broker-card-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:auto;padding-top:28px}
        .broker-card-actions a{display:inline-flex;min-height:46px;align-items:center;justify-content:center;padding:0 18px;border-radius:8px;font-weight:900;text-decoration:none}
        .broker-card-actions .primary{background:#eda91a;color:#061728}
        .broker-card-actions .secondary{border:1px solid rgba(255,255,255,.28);color:#fff}
        .broker-difference{padding:68px 20px;background:#04111d}
        .broker-difference-shell{width:min(1120px,100%);margin:0 auto}
        .broker-difference-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:28px;align-items:start}
        .broker-difference-copy span,.broker-section-kicker{color:#eda91a;font-size:12px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .broker-difference-copy h2{margin:9px 0 14px;color:#fff;font-size:36px;line-height:1.12}
        .broker-difference-copy p{margin:0;color:#b8c6d1;line-height:1.75}
        .broker-table{overflow:hidden;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:#071d33}
        .broker-row{display:grid;grid-template-columns:1fr 1fr 1fr;border-bottom:1px solid rgba(255,255,255,.08)}
        .broker-row:last-child{border-bottom:0}
        .broker-row>div{padding:17px 18px;color:#d7e1e8;line-height:1.5}
        .broker-row>div+div{border-left:1px solid rgba(255,255,255,.08)}
        .broker-row.header>div{background:#0a263e;color:#eda91a;font-weight:900}
        .broker-row strong{color:#fff}
        .broker-support{padding:70px 20px;background:#061827}
        .broker-support-shell{width:min(1120px,100%);margin:0 auto}
        .broker-support-heading{max-width:820px}
        .broker-support-heading h2{margin:8px 0 12px;color:#fff;font-size:38px}
        .broker-support-heading p{margin:0;color:#bdcad4;line-height:1.75}
        .broker-support-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:28px}
        .broker-support-card{padding:23px;border:1px solid rgba(255,255,255,.09);border-radius:13px;background:#071d33}
        .broker-support-card b{display:grid;width:36px;height:36px;place-items:center;border-radius:50%;background:#eda91a;color:#061728}
        .broker-support-card h3{margin:14px 0 8px;color:#fff;font-size:19px}
        .broker-support-card p{margin:0;color:#c5d1da;line-height:1.67;font-size:15px}
        .broker-seo{padding:70px 20px;background:#04111d}
        .broker-seo-shell{width:min(1120px,100%);margin:0 auto;display:grid;grid-template-columns:1.1fr .9fr;gap:34px}
        .broker-seo h2{margin:8px 0 14px;color:#fff;font-size:36px}
        .broker-seo p{color:#bac8d3;line-height:1.78}
        .broker-links{display:grid;gap:10px}
        .broker-links a{padding:16px 17px;border:1px solid rgba(255,255,255,.09);border-radius:10px;background:#071d33;color:#fff;font-weight:850;text-decoration:none}
        .broker-links a:hover{border-color:#eda91a;color:#eda91a}
        .broker-faq{padding:68px 20px;background:#061827}
        .broker-faq-shell{width:min(900px,100%);margin:0 auto}
        .broker-faq h2{margin:8px 0 20px;color:#fff;font-size:36px}
        .broker-faq details{border-bottom:1px solid rgba(255,255,255,.1)}
        .broker-faq summary{padding:18px 0;color:#fff;font-weight:850;cursor:pointer}
        .broker-faq details p{margin:0;padding:0 0 18px;color:#bdcad4;line-height:1.75}
        .broker-final{padding:60px 20px;text-align:center;background:#071d33;border-top:1px solid rgba(237,169,26,.2)}
        .broker-final h2{margin:0;color:#fff;font-size:34px}
        .broker-final p{max-width:760px;margin:12px auto 22px;color:#c0ccd5;line-height:1.7}
        .broker-final-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap}
        .broker-final-actions a{display:inline-flex;min-height:46px;align-items:center;padding:0 18px;border-radius:8px;font-weight:900;text-decoration:none}
        .broker-final-actions .gold{background:#eda91a;color:#061728}
        .broker-final-actions .outline{border:1px solid rgba(255,255,255,.3);color:#fff}
        @media(max-width:860px){.broker-choice-page .seo-market-hero-grid,.broker-path-grid,.broker-difference-grid,.broker-seo-shell{grid-template-columns:1fr}.broker-support-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.broker-path-card{min-height:0}.broker-row{grid-template-columns:1fr}.broker-row>div+div{border-left:0;border-top:1px solid rgba(255,255,255,.08)}}
        @media(max-width:560px){.broker-support-grid{grid-template-columns:1fr}.broker-path-card{padding:23px}.broker-choice-page .seo-market-hero h1{font-size:38px}.broker-two-paths,.broker-difference,.broker-support,.broker-seo,.broker-faq{padding-left:16px;padding-right:16px}}
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
              <span className="seo-market-kicker">Florida Liquor License Brokerage</span>
              <h1>Two Ways to Use a Florida Liquor License Broker Through FLLM</h1>
              <p>
                Florida Liquor License Market is built for both sides of the brokerage market. Independent brokers can advertise licenses they already represent, while Florida liquor-license owners who want professional help can request broker-assisted representation to market and sell their license.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/brokers/list-your-license">
                  I&apos;m a Broker — List a Client License
                </Link>
                <Link className="seo-market-button seo-market-button-dark" href="/sell-your-license">
                  I&apos;m a Seller — Request Broker Help
                </Link>
              </div>
              <div className="broker-choice-note">
                Independent-broker marketplace listings and FLLM broker-assisted representation are separate services. The party providing representation, scope of services and compensation should always be identified in writing.
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="FLLM broker pathways">
              <span>Choose Your Path</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>1</strong><small>broker lists a client license</small></div>
                <div><strong>2</strong><small>seller requests representation</small></div>
                <div><strong>67</strong><small>Florida counties</small></div>
                <div><strong>4COP</strong><small>& 3PS quota focus</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="broker-two-paths">
        <div className="broker-two-paths-shell">
          <div className="broker-path-heading">
            <span>Two Brokerage Options</span>
            <h2>Are you a broker listing a license, or a seller looking for a broker?</h2>
            <p>
              FLLM separates these two needs so buyers and sellers know who represents whom and brokers can expand their marketplace exposure without giving up their client relationship.
            </p>
          </div>

          <div className="broker-path-grid">
            <article className="broker-path-card">
              <span className="number">1</span>
              <span className="eyebrow">For Independent Brokers</span>
              <h3>List Your Client&apos;s Florida Liquor License on FLLM</h3>
              <p>
                Already represent a seller? Add the license to FLLM&apos;s statewide marketplace while remaining the listing representative and transaction contact.
              </p>
              <ul>
                <li>Your name and brokerage identify you as the representative</li>
                <li>Buyer inquiries can be routed to your designated contact</li>
                <li>You retain control of the client relationship and transaction</li>
                <li>Standard and Featured marketplace listing options are available</li>
                <li>FLLM does not seek a share of your commission for the advertising-only listing</li>
              </ul>
              <div className="broker-card-actions">
                <Link className="primary" href="/brokers/list-your-license">List a Client License</Link>
                <Link className="secondary" href="/listings">View Marketplace</Link>
              </div>
            </article>

            <article className="broker-path-card">
              <span className="number">2</span>
              <span className="eyebrow">For License Owners</span>
              <h3>Hire a Florida Liquor License Broker to Help Sell Your License</h3>
              <p>
                Own a 4COP Quota, 3PS Quota or other transferable Florida liquor license and want professional assistance? Request a broker consultation through FLLM.
              </p>
              <ul>
                <li>Review county-level market conditions and pricing strategy</li>
                <li>Develop a confidential or public marketing approach</li>
                <li>Manage or coordinate prospective-buyer communications</li>
                <li>Assist with negotiation of price and business terms</li>
                <li>Coordinate transaction milestones with the professionals involved</li>
              </ul>
              <div className="broker-card-actions">
                <Link className="primary" href="/sell-your-license">Request Broker Assistance</Link>
                <Link className="secondary" href="/florida-liquor-license-value">Check License Value</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="broker-difference">
        <div className="broker-difference-shell">
          <div className="broker-difference-grid">
            <div className="broker-difference-copy">
              <span>Clear Marketplace Roles</span>
              <h2>The two brokerage paths are not the same service</h2>
              <p>
                FLLM is designed to make the distinction obvious. An independent broker listing a client&apos;s license remains that client&apos;s representative. A seller requesting broker assistance is seeking a separate professional engagement. FLLM also continues to support owners who prefer a self-directed marketplace listing without brokerage representation.
              </p>
            </div>
            <div className="broker-table" role="table" aria-label="Comparison of FLLM brokerage paths">
              <div className="broker-row header" role="row">
                <div>Path</div><div>Who represents the seller?</div><div>Primary purpose</div>
              </div>
              <div className="broker-row" role="row">
                <div><strong>Independent Broker Listing</strong></div><div>The submitting broker</div><div>Marketplace exposure and inquiry routing</div>
              </div>
              <div className="broker-row" role="row">
                <div><strong>Broker-Assisted Seller</strong></div><div>As defined in the written brokerage agreement</div><div>Professional marketing and transaction support</div>
              </div>
              <div className="broker-row" role="row">
                <div><strong>Self-Directed Seller</strong></div><div>No broker representation through the listing</div><div>Seller-managed marketplace listing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="broker-support">
        <div className="broker-support-shell">
          <div className="broker-support-heading">
            <span className="broker-section-kicker">Broker-Assisted Selling</span>
            <h2>What a Florida liquor license broker can help coordinate</h2>
            <p>
              The exact scope depends on the written engagement, but a Florida liquor license brokerage assignment may involve the following areas.
            </p>
          </div>
          <div className="broker-support-grid">
            {[
              ["1", "Pricing strategy", "Compare county inventory, asking prices and relevant market evidence before setting an asking price."],
              ["2", "Marketing", "Present the license to qualified prospects using an appropriate public or confidential marketing strategy."],
              ["3", "Buyer communications", "Organize inquiries, availability questions and transaction discussions within the agreed scope."],
              ["4", "Negotiation", "Help evaluate and negotiate price and other business terms while the client retains final decision authority."],
              ["5", "Due diligence coordination", "Help organize license details, liens or encumbrances, transfer information and third-party professional involvement."],
              ["6", "Closing coordination", "Track transaction milestones and help keep the buyer, seller and professional advisers aligned through closing."],
            ].map(([n, title, copy]) => (
              <article className="broker-support-card" key={title}>
                <b>{n}</b><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="broker-seo">
        <div className="broker-seo-shell">
          <div>
            <span className="broker-section-kicker">Florida Liquor License Brokerage</span>
            <h2>4COP and 3PS liquor license broker services across Florida</h2>
            <p>
              Florida quota liquor licenses are county-specific, and market values can vary substantially from one county to another. Buyers and sellers commonly evaluate the county, license series, intended use, current inventory, asking prices, transferability and transaction timing before deciding how to proceed.
            </p>
            <p>
              FLLM&apos;s brokerage marketplace is designed around that specialized market. Independent brokers can add client inventory to a statewide platform, while owners who want professional representation can request broker assistance rather than handling the sale on their own.
            </p>
          </div>
          <nav className="broker-links" aria-label="Florida liquor license broker resources">
            <Link href="/listings">Browse Florida Liquor Licenses for Sale</Link>
            <Link href="/brokers/list-your-license">For Brokers — List a Client License</Link>
            <Link href="/sell-your-license">Sell or List Your Florida Liquor License</Link>
            <Link href="/florida-liquor-license-value">Florida Liquor License Value</Link>
            <Link href="/florida-liquor-license-appraisal">Florida Liquor License Appraisals</Link>
            <Link href="/financing">Florida Liquor License Financing</Link>
            <Link href="/resources/florida-liquor-license-laws">Florida Liquor License Laws</Link>
          </nav>
        </div>
      </section>

      <section className="broker-faq">
        <div className="broker-faq-shell">
          <span className="broker-section-kicker">Frequently Asked Questions</span>
          <h2>Florida liquor license broker questions</h2>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="broker-final">
        <h2>Choose the FLLM brokerage path that fits your transaction</h2>
        <p>
          Brokers can list client inventory without surrendering the relationship. License owners can request professional broker assistance when they do not want to manage the sale alone.
        </p>
        <div className="broker-final-actions">
          <Link className="gold" href="/brokers/list-your-license">Broker — List a Client License</Link>
          <Link className="outline" href="/sell-your-license">Seller — Request Broker Assistance</Link>
        </div>
      </section>
    </main>
  );
}
