import type { Metadata } from "next";
import Link from "next/link";

import "../counties/[slug]/county-page.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-market-platform`;

const positioningLine =
  "Florida Liquor License Market — licenses, businesses, market data, valuation, and transaction resources for Florida’s licensed hospitality market.";

export const metadata: Metadata = {
  title: "Florida Liquor License Market Platform | Licenses, Businesses & Market Data",
  description:
    "Explore the Florida Liquor License Market platform: standalone liquor licenses, businesses with liquor licenses, county market data, valuation resources and transaction support.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Market Platform | Licenses, Businesses & Market Data",
    description: positioningLine,
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Liquor License Market Platform",
    description: positioningLine,
  },
};

const pillars = [
  {
    step: "01",
    title: "Licenses",
    copy: "Standalone Florida liquor-license inventory and education centered on county-specific transferable quota licenses and other license categories.",
    bullets: [
      "4COP quota liquor licenses for on-premises full-liquor privileges",
      "3PS quota / package-store licenses for off-premises sales",
      "County-specific inventory, asking prices and availability",
      "License-type education, transfer guidance and seller options",
    ],
    links: [
      ["/listings", "Browse Standalone Licenses"],
      ["/counties", "Compare County Markets"],
    ],
  },
  {
    step: "02",
    title: "Businesses",
    copy: "Operating Florida businesses where the liquor license is an important part of the acquisition, economics or operating model.",
    bullets: [
      "Businesses sold with transferable 4COP or 3PS quota licenses",
      "Restaurants operating with 4COP SFS / SRX licenses",
      "Businesses operating with 2COP beer-and-wine licenses",
      "Separate package pricing and allocated license-value information where available",
    ],
    links: [
      ["/businesses-with-quota-licenses", "Browse Business + License Packages"],
      ["/listings?listingType=business-sfs", "View SFS / SRX Businesses"],
    ],
  },
  {
    step: "03",
    title: "Market Data",
    copy: "County-level market intelligence designed to show the current landscape of Florida liquor-license supply, pricing and licensed-business activity.",
    bullets: [
      "County inventory and asking-price snapshots",
      "Florida county maps and market heat-map resources",
      "Market reports, listing evidence and transaction context",
      "Separate treatment of standalone licenses and business packages",
    ],
    links: [
      ["/counties", "Open County Market Data"],
      ["/florida-quota-liquor-license-market-report", "Read Market Insights"],
    ],
  },
  {
    step: "04",
    title: "Valuation",
    copy: "Pricing and appraisal resources for owners, buyers, brokers, lenders and other transaction professionals evaluating Florida liquor-license interests.",
    bullets: [
      "County asking-price comparables and market-value context",
      "Liquor-license value estimator and valuation guides",
      "Formal appraisal resources for financing and transaction review",
      "Allocated license-value analysis within business packages when disclosed",
    ],
    links: [
      ["/florida-liquor-license-value", "Estimate License Value"],
      ["/florida-liquor-license-appraisal", "Review Appraisal Services"],
    ],
  },
  {
    step: "05",
    title: "Transaction Resources",
    copy: "Practical resources surrounding the purchase, sale, financing and transfer of Florida liquor licenses and businesses that depend on them.",
    bullets: [
      "DBPR / ABT transfer forms and application guidance",
      "FDOR, lien, due-diligence and closing-resource information",
      "Financing, SBA and transaction-service resources",
      "Florida liquor-license attorney directory and professional referrals",
    ],
    links: [
      ["/transaction-services", "View Transaction Services"],
      ["/resources", "Open Resource Center"],
    ],
  },
] as const;

export default function FloridaLiquorLicenseMarketPlatformPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Florida Liquor License Market Platform",
      url: canonicalUrl,
      description: positioningLine,
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
      about: [
        { "@type": "Thing", name: "Florida liquor licenses" },
        { "@type": "Thing", name: "Florida businesses with liquor licenses" },
        { "@type": "Thing", name: "Florida liquor license market data" },
        { "@type": "Thing", name: "Florida liquor license valuation" },
        { "@type": "Thing", name: "Florida liquor license transactions" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida Liquor License Market Platform Areas",
      itemListElement: pillars.map((pillar, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: pillar.title,
      })),
    },
  ];

  return (
    <main className="county-market-page platform-market-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <style>{`
        .platform-market-page{background:#0d3152;color:#fff}
        .platform-market-page .county-hero{
          background:
            radial-gradient(circle at 78% 22%,rgba(246,167,0,.16),transparent 34%),
            linear-gradient(135deg,#03131f 0%,#061f35 56%,#173649 100%);
        }
        .platform-market-page .county-hero h1{
          max-width:980px;
          font-size:clamp(38px,4.55vw,64px);
          line-height:1.02;
        }
        .platform-market-page .county-hero p{color:#d7e3ec}
        .platform-hero-card{
          min-height:392px;
          width:112%;
          justify-self:end;
          align-items:stretch;
          text-align:left;
          background:
            radial-gradient(circle at 50% 18%,rgba(246,167,0,.13),transparent 35%),
            linear-gradient(145deg,#194f7c 0%,#123d65 58%,#0d3152 100%);
        }
        .platform-hero-card>span{
          color:#f6a700;
          font-size:11px;
          font-weight:900;
          letter-spacing:.12em;
          text-transform:uppercase;
        }
        .platform-hero-card>strong{
          margin:9px 0 16px;
          font-size:30px;
          line-height:1.08;
        }
        .platform-vertical{
          padding:15px 16px;
          border:1px solid rgba(241,166,0,.48);
          border-radius:6px;
          background:rgba(3,17,29,.38);
        }
        .platform-vertical + .platform-vertical{margin-top:11px}
        .platform-vertical b{
          display:block;
          color:#fff;
          font-family:Georgia,'Times New Roman',serif;
          font-size:20px;
        }
        .platform-vertical small{
          display:block;
          margin-top:6px;
          color:#c9d7e1;
          font-size:12px;
          line-height:1.55;
        }
        .platform-pillars-strip{
          position:relative;
          z-index:2;
          width:min(1240px,calc(100% - 40px));
          margin:-24px auto 0;
          display:grid;
          grid-template-columns:repeat(5,minmax(0,1fr));
          border:1px solid rgba(241,166,0,.78);
          border-radius:5px;
          background:linear-gradient(145deg,#194f7c 0%,#123d65 58%,#0d3152 100%);
          box-shadow:inset 0 1px 0 rgba(255,211,108,.2),0 16px 34px rgba(3,17,29,.28);
        }
        .platform-pillars-strip div{
          min-height:105px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          padding:17px 10px;
          text-align:center;
          border-right:1px solid rgba(241,166,0,.22);
        }
        .platform-pillars-strip div:last-child{border-right:0}
        .platform-pillars-strip span{
          color:#b9cad6;
          font-size:9px;
          font-weight:900;
          letter-spacing:.08em;
          text-transform:uppercase;
        }
        .platform-pillars-strip strong{
          margin-top:8px;
          color:#f6a700;
          font-family:Georgia,'Times New Roman',serif;
          font-size:20px;
        }
        .platform-verticals{
          padding:72px 0 38px;
          background:linear-gradient(180deg,#0d3152 0%,#0a2947 100%);
        }
        .platform-section-copy{
          max-width:900px;
          margin:10px 0 0;
          color:#d7e3ec;
          font-size:14px;
          line-height:1.72;
        }
        .platform-two-grid{
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:18px;
          margin-top:24px;
        }
        .platform-two-card{
          padding:28px;
          border:1px solid rgba(241,166,0,.62);
          border-radius:7px;
          background:linear-gradient(145deg,#173653,#0a2439 58%,#071827);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 16px 34px rgba(0,0,0,.24);
          transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease;
        }
        .platform-two-card:hover{
          transform:translateY(-4px) scale(1.01);
          border-color:#f6a700;
          box-shadow:0 24px 48px rgba(0,0,0,.34),0 0 18px rgba(246,167,0,.12);
        }
        .platform-two-card>span{
          color:#69d6ff;
          font-size:10px;
          font-weight:900;
          letter-spacing:.1em;
          text-transform:uppercase;
        }
        .platform-two-card h2{
          margin:8px 0 10px;
          color:#fff;
          font-family:Georgia,'Times New Roman',serif;
          font-size:32px;
        }
        .platform-two-card p{
          margin:0 0 18px;
          color:#d7e3ec;
          font-size:14px;
          line-height:1.72;
        }
        .platform-pillars{
          padding:62px 0 72px;
          background:radial-gradient(circle at 50% 0%,#0d3152 0%,#071b2d 56%,#03111d 100%);
        }
        .platform-pillar-grid{
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:18px;
          margin-top:25px;
        }
        .platform-pillar-card{
          position:relative;
          overflow:hidden;
          padding:25px 24px 23px;
          border:1px solid rgba(241,166,0,.48);
          border-radius:8px;
          background:linear-gradient(145deg,#123d65 0%,#0d3152 55%,#071b2d 100%);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.055),0 14px 30px rgba(0,0,0,.23);
          transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease;
        }
        .platform-pillar-card:hover{
          transform:translateY(-5px);
          border-color:#f6a700;
          box-shadow:0 24px 48px rgba(0,0,0,.33),0 0 18px rgba(246,167,0,.12);
        }
        .platform-pillar-card:nth-child(4),
        .platform-pillar-card:nth-child(5){grid-column:span 1}
        .platform-step{
          display:grid;
          width:37px;
          height:37px;
          place-items:center;
          border-radius:50%;
          background:#f6a700;
          color:#061728;
          font-size:12px;
          font-weight:900;
        }
        .platform-pillar-card h2{
          margin:14px 0 8px;
          color:#fff;
          font-family:Georgia,'Times New Roman',serif;
          font-size:29px;
        }
        .platform-pillar-card>p{
          margin:0;
          color:#c9d7e1;
          font-size:13px;
          line-height:1.68;
        }
        .platform-pillar-card ul{
          display:grid;
          gap:9px;
          margin:18px 0 20px;
          padding:0;
          list-style:none;
        }
        .platform-pillar-card li{
          position:relative;
          padding-left:20px;
          color:#e7eef3;
          font-size:12px;
          line-height:1.5;
        }
        .platform-pillar-card li::before{
          content:"•";
          position:absolute;
          left:2px;
          top:-1px;
          color:#69d6ff;
          font-size:18px;
          line-height:1;
        }
        .platform-link-row{
          display:flex;
          flex-wrap:wrap;
          gap:9px;
          margin-top:auto;
        }
        .platform-link-row a{
          min-height:38px;
          display:inline-flex;
          align-items:center;
          padding:0 12px;
          border:1px solid rgba(241,166,0,.68);
          border-radius:4px;
          color:#f6b51f;
          background:#071827;
          font-size:10px;
          font-weight:900;
          letter-spacing:.025em;
          text-transform:uppercase;
        }
        .platform-link-row a:hover{
          background:#f6a700;
          color:#06131e;
        }
        .platform-broker-section{
          display:grid;
          grid-template-columns:minmax(0,1.2fr) minmax(320px,.8fr);
          gap:24px;
          padding-top:72px;
          padding-bottom:72px;
        }
        .platform-broker-section>article,
        .platform-broker-section>aside{
          padding:30px;
          border:1px solid rgba(241,166,0,.54);
          border-radius:7px;
          background:linear-gradient(145deg,#111b24,#071827);
        }
        .platform-broker-section article>span{
          color:#f6a700;
          font-size:11px;
          font-weight:900;
          letter-spacing:.12em;
          text-transform:uppercase;
        }
        .platform-broker-section h2{
          margin:8px 0 12px;
          color:#fff;
          font-family:Georgia,'Times New Roman',serif;
          font-size:36px;
          line-height:1.08;
        }
        .platform-broker-section p{
          margin:0 0 16px;
          color:#c9d7e1;
          font-size:14px;
          line-height:1.72;
        }
        .platform-broker-section aside strong{
          display:block;
          margin-bottom:12px;
          color:#69d6ff;
          font-size:13px;
          text-transform:uppercase;
          letter-spacing:.08em;
        }
        .platform-broker-section aside ul{
          display:grid;
          gap:9px;
          margin:0;
          padding-left:18px;
          color:#e5edf2;
          font-size:13px;
          line-height:1.55;
        }
        @media(max-width:980px){
          .platform-hero-card{width:100%;min-height:330px}
          .platform-pillars-strip{grid-template-columns:repeat(2,1fr)}
          .platform-pillars-strip div{border-bottom:1px solid rgba(241,166,0,.22)}
          .platform-pillars-strip div:nth-child(2n){border-right:0}
          .platform-pillars-strip div:last-child{grid-column:1/-1;border-bottom:0}
          .platform-two-grid,.platform-broker-section{grid-template-columns:1fr}
          .platform-pillar-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
        }
        @media(max-width:680px){
          .platform-pillars-strip{width:min(100% - 24px,1240px);grid-template-columns:1fr}
          .platform-pillars-strip div{border-right:0}
          .platform-pillars-strip div:last-child{grid-column:auto}
          .platform-two-grid,.platform-pillar-grid{grid-template-columns:1fr}
          .platform-verticals{padding-top:52px}
          .platform-pillars{padding:50px 0}
          .platform-broker-section{padding-top:50px;padding-bottom:50px}
        }
      `}</style>

      <header className="county-header county-shell">
        <Link className="county-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <nav aria-label="FLLM platform navigation">
          <Link href="/listings">Florida Listings</Link>
          <Link href="/businesses-with-quota-licenses">Businesses</Link>
          <Link href="/counties">Market Data</Link>
          <Link className="county-nav-cta" href="/brokers/list-your-license">For Brokers</Link>
        </nav>
      </header>

      <section className="county-hero">
        <div className="county-shell county-hero-grid">
          <div>
            <div className="county-breadcrumbs">
              <Link href="/">Home</Link><span>›</span><strong>FLLM Platform</strong>
            </div>
            <span className="county-kicker">One Market · Two Connected Verticals</span>
            <h1>{positioningLine}</h1>
            <p>
              FLLM covers both the market for Florida liquor licenses themselves and the broader landscape of Florida businesses whose operations and value are connected to liquor-license privileges.
            </p>
            <div className="county-hero-actions">
              <Link className="county-button county-button-gold" href="/listings">Browse Standalone Licenses</Link>
              <Link className="county-button county-button-dark" href="/businesses-with-quota-licenses">Browse Businesses With Licenses</Link>
              <Link className="county-button county-button-dark" href="/counties">Explore Market Data</Link>
            </div>
          </div>

          <aside className="county-map-card platform-hero-card" aria-label="FLLM marketplace verticals">
            <span>FLLM Marketplace Structure</span>
            <strong>Two connected markets</strong>
            <div className="platform-vertical">
              <b>Standalone Liquor Licenses</b>
              <small>County-specific license inventory, pricing, valuation, financing and transfer resources.</small>
            </div>
            <div className="platform-vertical">
              <b>Businesses With Liquor Licenses</b>
              <small>Restaurants, bars, lounges, package stores and other licensed businesses where the license is part of the operating opportunity.</small>
            </div>
          </aside>
        </div>
      </section>

      <section className="platform-pillars-strip" aria-label="FLLM platform areas">
        <div><span>Marketplace</span><strong>Licenses</strong></div>
        <div><span>Operating Market</span><strong>Businesses</strong></div>
        <div><span>Intelligence</span><strong>Market Data</strong></div>
        <div><span>Pricing</span><strong>Valuation</strong></div>
        <div><span>Execution</span><strong>Transactions</strong></div>
      </section>

      <section className="platform-verticals">
        <div className="county-shell">
          <div className="county-section-heading">
            <div>
              <span>Two Marketplace Verticals</span>
              <h2>One brand covering the asset and the operating market around it</h2>
            </div>
          </div>
          <p className="platform-section-copy">
            Florida Liquor License Market is organized so license-only buyers can evaluate transferable license opportunities without mixing them with operating-business acquisitions, while business buyers can separately evaluate hospitality businesses whose license privileges are part of the transaction.
          </p>

          <div className="platform-two-grid">
            <article className="platform-two-card">
              <span>Vertical 01</span>
              <h2>Standalone Liquor Licenses</h2>
              <p>
                For buyers, sellers and brokers focused primarily on the transferable license asset, with county-specific inventory, pricing, valuation, financing and transfer information.
              </p>
              <Link className="county-button county-button-gold" href="/listings">Browse Florida Licenses</Link>
            </article>
            <article className="platform-two-card">
              <span>Vertical 02</span>
              <h2>Businesses With Liquor Licenses</h2>
              <p>
                For buyers and brokers evaluating operating businesses where a quota, SFS / SRX, or beer-and-wine license is part of the economics, operating rights or transaction package.
              </p>
              <Link className="county-button county-button-gold" href="/businesses-with-quota-licenses">Browse Business Packages</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="platform-pillars">
        <div className="county-shell">
          <div className="county-section-heading">
            <div>
              <span>Platform Scope</span>
              <h2>Five parts of the Florida Liquor License Market</h2>
            </div>
          </div>
          <p className="platform-section-copy">
            Each area supports the same underlying market from a different angle, helping buyers, sellers, brokers, lenders and transaction professionals move from discovery to market analysis and transaction execution.
          </p>

          <div className="platform-pillar-grid">
            {pillars.map((pillar) => (
              <article className="platform-pillar-card" key={pillar.title}>
                <span className="platform-step">{pillar.step}</span>
                <h2>{pillar.title}</h2>
                <p>{pillar.copy}</p>
                <ul>
                  {pillar.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
                <div className="platform-link-row">
                  {pillar.links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="platform-broker-section county-shell">
        <article>
          <span>Built for the Florida Licensed-Hospitality Market</span>
          <h2>A broader market platform without losing the liquor-license focus</h2>
          <p>
            The liquor license remains the organizing asset. FLLM expands outward from that asset into the businesses, financing, valuation evidence, market data, regulatory resources and transaction services that surround Florida&apos;s licensed hospitality market.
          </p>
          <div className="county-hero-actions">
            <Link className="county-button county-button-gold" href="/brokers/list-your-license">Broker Marketplace</Link>
            <Link className="county-button county-button-dark" href="/florida-liquor-license-appraisal">Valuation & Appraisal</Link>
            <Link className="county-button county-button-dark" href="/transaction-services">Transaction Services</Link>
          </div>
        </article>
        <aside>
          <strong>What this means for brokers</strong>
          <ul>
            <li>Advertise standalone 4COP and 3PS quota licenses.</li>
            <li>Advertise businesses sold with included quota licenses.</li>
            <li>Use business-package pages without mixing them into standalone license inventory.</li>
            <li>Use FLLM county data, valuation and transaction resources around the listing.</li>
            <li>Keep the broker as the identified transaction contact on broker-submitted listings.</li>
          </ul>
        </aside>
      </section>

      <section className="county-cta">
        <div className="county-shell county-cta-grid">
          <div>
            <span>Explore the Marketplace</span>
            <h2>Looking for a license or a licensed business?</h2>
            <p>Start with the vertical that matches your buying objective, then use FLLM market data and resources to evaluate the opportunity.</p>
            <Link className="county-button county-button-gold" href="/listings">Browse Current Opportunities</Link>
          </div>
          <div>
            <span>For Sellers and Brokers</span>
            <h2>Have an opportunity to market?</h2>
            <p>List a standalone liquor license or advertise a business package where the liquor license is an important part of the transaction.</p>
            <Link className="county-button county-button-gold" href="/brokers/list-your-license">Open Broker Marketplace</Link>
          </div>
        </div>
      </section>

      <footer className="county-footer">
        <div className="county-shell">
          <span>© Florida Liquor License Market</span>
          <nav>
            <Link href="/listings">Licenses</Link>
            <Link href="/businesses-with-quota-licenses">Businesses</Link>
            <Link href="/counties">Market Data</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
