import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/transaction-services`;

export const metadata: Metadata = {
  title: "Florida Liquor License Transaction Services | FLLM",
  description:
    "Coordinate a Florida liquor-license transaction from valuation and financing through FDOR clearance, ABT-6002 transfer preparation, closing resources and professional referrals.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Transaction Services | FLLM",
    description:
      "A connected transaction-services hub for Florida liquor-license buyers and sellers: transfer resources, financing, appraisals, FDOR clearance, attorneys and closing support.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Liquor License Transaction Services | FLLM",
    description:
      "Coordinate valuation, financing, tax clearance, transfer preparation, closing resources and professional referrals through FLLM.",
  },
};

const services = [
  {
    id: "transfer",
    kicker: "Transfer & Filing Support",
    title: "Liquor License Transfer Services",
    audience: "For buyers and sellers completing a Florida ownership transfer",
    copy:
      "Use FLLM's transfer resources to organize the ABT-6002 process, review required supporting documents, understand buyer and seller responsibilities, and move into the official application workspace.",
    bullets: [
      "ABT-6002 transfer-of-ownership guidance",
      "Application checklist and form workspace",
      "Buyer and seller document coordination",
      "Transfer-fee calculation resources",
      "DBPR/ABT filing preparation references",
    ],
    links: [
      { href: "/dbpr-abt-6002", label: "Open ABT-6002 Transfer Guide" },
      { href: "/resources/application-center", label: "Application Center" },
      { href: "/resources/quota-transfer-fee-calculator", label: "Transfer Fee Calculator" },
    ],
  },
  {
    id: "fdor",
    kicker: "Tax Clearance",
    title: "FDOR Clearance & Compliance Support",
    audience: "For transactions requiring Florida Department of Revenue clearance",
    copy:
      "Review the role of tax clearance, certificates of compliance, DR-835 authorization and supporting records before a liquor-license transfer or closing reaches its final stage.",
    bullets: [
      "Tax-clearance and compliance overview",
      "DR-835 power-of-attorney resources",
      "FDOR submission and documentation guidance",
      "Clearance-letter and certificate distinctions",
      "Transaction checklist integration",
    ],
    links: [
      { href: "/resources/florida-department-of-revenue", label: "Open FDOR Resource Center" },
      { href: "/resources/forms", label: "Review Florida Forms" },
    ],
  },
  {
    id: "valuation",
    kicker: "Pricing & Valuation",
    title: "License Valuation & Appraisal",
    audience: "For buyers, sellers, lenders, attorneys and fiduciaries",
    copy:
      "Use FLLM county market data and appraisal resources to evaluate current asking-price evidence before negotiating, financing, refinancing or closing a transaction.",
    bullets: [
      "County-level asking-price comparisons",
      "Current market-value guidance",
      "Formal appraisal services",
      "Lender-oriented valuation support",
      "4COP and 3PS market evidence",
    ],
    links: [
      { href: "/florida-liquor-license-value", label: "Estimate License Value" },
      { href: "/florida-liquor-license-appraisal", label: "Order an Appraisal" },
      { href: "/counties", label: "Compare County Markets" },
    ],
  },
  {
    id: "financing",
    kicker: "Purchase & Refinance",
    title: "Liquor License Financing",
    audience: "For qualified buyers and existing license owners",
    copy:
      "Explore purchase financing and refinance options, model payments, review private-lender considerations and connect the financing request to the license and appraisal workflow.",
    bullets: [
      "Purchase financing requests",
      "Quota-license refinance inquiries",
      "Private lender network resources",
      "Loan payment calculator",
      "Appraisal coordination for underwriting",
    ],
    links: [
      { href: "/financing", label: "Request Financing" },
      { href: "/how-to-finance-florida-liquor-license", label: "Financing Guide" },
      { href: "/financing/loan-payment-calculator", label: "Loan Payment Calculator" },
    ],
  },
  {
    id: "premises",
    kicker: "Premises & Local Approvals",
    title: "Premises, Zoning & License-Type Planning",
    audience: "For buyers moving a quota license or evaluating a new location",
    copy:
      "A quota license does not itself approve a premises. Use FLLM's county pages and license-type resources to identify the governing market, understand the intended license category and organize local zoning or premises review with the appropriate agency or professional.",
    bullets: [
      "County-specific market and premises context",
      "4COP, 3PS, 2COP and SFS comparisons",
      "Local zoning and jurisdiction references",
      "Change-of-location planning resources",
      "Qualified professional referrals when needed",
    ],
    links: [
      { href: "/counties", label: "Open County Market Pages" },
      { href: "/resources/florida-liquor-license-types", label: "Compare License Types" },
      { href: "/resources/application-center", label: "Application Center" },
    ],
  },
  {
    id: "background",
    kicker: "Applicant Preparation",
    title: "Fingerprinting & Background Requirement Guidance",
    audience: "For applicants preparing transfer or licensing materials",
    copy:
      "Review the application pathway, fingerprinting and background-screening references, then confirm current requirements with DBPR/ABT and the appropriate approved service provider.",
    bullets: [
      "Application-path guidance",
      "Fingerprinting requirement references",
      "Background-review preparation",
      "Supporting-document checklist",
      "Official agency verification links",
    ],
    links: [
      { href: "/resources/application-center", label: "Application Center" },
      { href: "/dbpr-abt-6002", label: "ABT-6002 Transfer Guide" },
      { href: "/free-guide", label: "FLLM Buyer’s & Seller’s Guide" },
    ],
  },
  {
    id: "closing",
    kicker: "Transaction Coordination",
    title: "Purchase, Closing & Exchange Resources",
    audience: "For buyers and sellers moving from offer to closing",
    copy:
      "Connect the transaction's market, financing, appraisal, tax-clearance and transfer workstreams instead of treating each step as a separate process.",
    bullets: [
      "Confidential buyer and seller transaction tools",
      "Offer and negotiation resources",
      "Financing and appraisal coordination",
      "FDOR and ABT transfer checkpoints",
      "Closing-professional referrals",
    ],
    links: [
      { href: "/exchange", label: "Open the FLLM Exchange" },
      { href: "/florida-liquor-license-appraisal", label: "Appraisal Services" },
      { href: "/financing", label: "Financing" },
    ],
  },
  {
    id: "professionals",
    kicker: "Independent Professional Support",
    title: "Attorney & Professional Referrals",
    audience: "For transactions requiring legal, tax, escrow or specialized advice",
    copy:
      "FLLM can help users locate independent professionals when a transaction requires legal advice, document drafting, escrow, tax analysis, title or lien review, or other regulated professional services.",
    bullets: [
      "Florida liquor-license attorney directory",
      "Independent legal-advice referrals",
      "Tax and transaction-professional coordination",
      "Escrow and closing-resource referrals",
      "Specialized assistance for complex transactions",
    ],
    links: [
      { href: "/resources/liquor-license-attorneys", label: "Find a Liquor License Attorney" },
      { href: "/contact", label: "Contact FLLM" },
    ],
  },
];

export default function TransactionServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Florida Liquor License Transaction Services",
    url: canonicalUrl,
    description:
      "Connected transaction resources for Florida liquor-license buyers and sellers, including transfer preparation, FDOR clearance, financing, appraisal and professional referrals.",
    isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
  };

  return (
    <main className="transaction-services-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />

      <style>{`
        .transaction-services-page{min-height:100vh;background:#04111d;color:#fff}
        .transaction-official-header-band{position:relative;z-index:120;width:100%;border-bottom:1px solid #765613;background:radial-gradient(circle at 82% 35%,rgba(19,54,77,.2),transparent 30%),linear-gradient(90deg,#010810 0%,#020c14 48%,#061522 100%);box-shadow:0 5px 15px rgba(0,0,0,.22)}
        .transaction-official-header-band .forms-site-header{background:transparent}
        .transaction-official-header-band .forms-site-header .header-actions .btn-outline{order:1}
        .transaction-official-header-band .forms-site-header .header-actions .btn-gold{order:2}
        @media(min-width:981px){
          .transaction-official-header-band .forms-site-header.page-shell{width:min(1400px,calc(100% - 24px));min-height:82px;height:82px;gap:16px}
          .transaction-official-header-band .forms-site-header .brand-lockup{flex:0 0 160px}
          .transaction-official-header-band .forms-site-header .brand-lockup img{width:150px;height:61px;max-height:none;object-fit:contain;transform:none}
          .transaction-official-header-band .forms-site-header .primary-nav{justify-content:center;gap:42px}
          .transaction-official-header-band .forms-site-header .header-actions{gap:10px;transform:none}
          .transaction-official-header-band .forms-site-header .header-actions .btn{height:33px;min-height:33px;border-radius:5px;font-size:9px;font-weight:900;letter-spacing:.02em;line-height:1;white-space:nowrap;transform-origin:center;transition:transform .18s ease,border-color .18s ease,background .18s ease,color .18s ease,box-shadow .18s ease,filter .18s ease}
          .transaction-official-header-band .forms-site-header .header-actions .btn-gold{width:116px;min-width:116px;padding:0 9px;border:1px solid #ffbd2e;background:linear-gradient(145deg,#f8b72f 0%,#e99a00 58%,#cf7800 100%);box-shadow:inset 0 1px 0 rgba(255,237,182,.55),inset 0 -2px 0 rgba(95,51,0,.28),0 5px 12px rgba(0,0,0,.27);color:#07101a}
          .transaction-official-header-band .forms-site-header .header-actions .btn-outline{width:100px;min-width:100px;padding:0 8px;border:1px solid #e8a000;background:linear-gradient(145deg,rgba(7,22,34,.96),rgba(1,8,15,.98));box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 4px 11px rgba(0,0,0,.22);color:#f6b21a}
          .transaction-official-header-band .forms-site-header .header-actions .contact-phone{margin-right:4px;font-size:10px}
          .transaction-official-header-band .forms-site-header .header-actions .btn:hover,
          .transaction-official-header-band .forms-site-header .header-actions .btn:focus-visible{transform:translateY(-1px) scale(1.03);outline:none}
          .transaction-official-header-band .forms-site-header .header-actions .btn-gold:hover,
          .transaction-official-header-band .forms-site-header .header-actions .btn-gold:focus-visible{border-color:#ffd069;background:linear-gradient(145deg,#ffc64a 0%,#f1a600 58%,#dc8500 100%);color:#07101a;box-shadow:inset 0 1px 0 rgba(255,247,218,.7),inset 0 -2px 0 rgba(95,51,0,.22),0 8px 17px rgba(0,0,0,.33),0 0 12px rgba(241,166,0,.22)}
          .transaction-official-header-band .forms-site-header .header-actions .btn-outline:hover,
          .transaction-official-header-band .forms-site-header .header-actions .btn-outline:focus-visible{border-color:#ffd069;background:linear-gradient(145deg,#ffc64a 0%,#f1a600 58%,#dc8500 100%);color:#07101a;box-shadow:inset 0 1px 0 rgba(255,247,218,.7),inset 0 -2px 0 rgba(95,51,0,.22),0 8px 17px rgba(0,0,0,.33),0 0 12px rgba(241,166,0,.28)}
        }
        @media(min-width:981px) and (max-width:1180px){
          .transaction-official-header-band .forms-site-header .primary-nav{gap:27px}
          .transaction-official-header-band .forms-site-header .header-actions .btn-gold{width:110px;min-width:110px}
          .transaction-official-header-band .forms-site-header .header-actions .btn-outline{width:96px;min-width:96px}
        }
        @media(max-width:980px){.transaction-official-header-band{background:#020b13}}
        .transaction-shell{width:min(1420px,calc(100% - 56px));margin:0 auto}
        .transaction-hero{padding:72px 0 64px;border-bottom:1px solid rgba(241,169,26,.32);background:radial-gradient(circle at 82% 10%,rgba(30,104,149,.27),transparent 32%),linear-gradient(135deg,#0a2942,#051827 58%,#03101b)}
        .transaction-breadcrumbs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px;color:#9fb0bd;font-size:12px}.transaction-breadcrumbs a{color:#f1aa1c;text-decoration:none}
        .transaction-kicker{display:block;color:#f1aa1c;font-size:11px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}
        .transaction-hero h1{max-width:940px;margin:10px 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:clamp(42px,6vw,72px);line-height:1.02}
        .transaction-hero p{max-width:950px;margin:0;color:#d4dee5;font-size:18px;line-height:1.75}
        .transaction-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
        .transaction-button{position:relative;isolation:isolate;overflow:hidden;display:inline-flex;min-height:46px;align-items:center;justify-content:center;padding:0 20px;border-radius:6px;font-weight:900;text-decoration:none;transform:translateY(0) scale(1);transition:transform .18s ease,filter .18s ease,border-color .18s ease,box-shadow .18s ease,background .18s ease,color .18s ease}
        .transaction-button::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.38;background:radial-gradient(circle at 50% 5%,rgba(255,255,255,.34),transparent 48%),linear-gradient(135deg,rgba(255,255,255,.08),transparent 36%);transition:opacity .18s ease,transform .18s ease}
        .transaction-button.gold{border:1px solid #ffd56b;color:#071521;background:linear-gradient(145deg,#ffd56b 0%,#ffc13b 42%,#e69a00 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.58),inset 0 -3px 0 rgba(120,72,0,.25),0 7px 15px rgba(0,0,0,.28),0 0 0 1px rgba(241,166,0,.08)}
        .transaction-button.gold:hover,.transaction-button.gold:focus-visible{transform:translateY(-3px) scale(1.035);filter:brightness(1.07);border-color:#ffe29a;background:linear-gradient(145deg,#ffe082 0%,#ffc94f 42%,#efa300 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.75),inset 0 0 22px rgba(255,236,170,.24),inset 0 -3px 0 rgba(120,72,0,.18),0 12px 24px rgba(0,0,0,.36),0 0 20px rgba(241,166,0,.42);outline:none}
        .transaction-button.gold:hover::before,.transaction-button.gold:focus-visible::before{opacity:.95;transform:scale(1.035)}
        .transaction-button.dark{border:1px solid rgba(105,214,255,.34);color:#fff;background:linear-gradient(145deg,#0c2942 0%,#071d31 62%,#041522 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -4px 10px rgba(0,0,0,.16),0 7px 15px rgba(0,0,0,.24)}
        .transaction-button.dark::before{background:radial-gradient(circle at 50% 0%,rgba(105,214,255,.18),transparent 50%),linear-gradient(135deg,rgba(255,255,255,.06),transparent 38%)}
        .transaction-button.dark:hover,.transaction-button.dark:focus-visible{transform:translateY(-3px) scale(1.03);border-color:#69d6ff;color:#fff;background:linear-gradient(145deg,#123c5f 0%,#0a2945 62%,#061a2a 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.13),inset 0 0 24px rgba(105,214,255,.11),0 12px 24px rgba(0,0,0,.34),0 0 20px rgba(105,214,255,.22);outline:none}
        .transaction-button.dark:hover::before,.transaction-button.dark:focus-visible::before{opacity:1;transform:scale(1.04)}
        .transaction-button:active{transform:translateY(0) scale(.99)}
        .transaction-intro{padding:52px 0 22px}.transaction-intro-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:26px;align-items:start}.transaction-intro h2{margin:8px 0 12px;font-size:clamp(30px,4vw,44px)}.transaction-intro p{color:#c7d3dc;line-height:1.72}.transaction-path{padding:22px;border:1px solid rgba(241,169,26,.35);border-radius:10px;background:#071d31}.transaction-path strong{display:block;margin-bottom:12px;color:#f1aa1c}.transaction-path ol{margin:0;padding-left:22px;color:#d5dee5;line-height:1.8}
        .transaction-services{padding:34px 0 72px}.transaction-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.transaction-card{scroll-margin-top:90px;padding:28px;border:1px solid rgba(255,255,255,.11);border-radius:12px;background:linear-gradient(145deg,#0a2237,#061726);box-shadow:0 14px 34px rgba(0,0,0,.22);transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease,background .22s ease;will-change:transform}.transaction-card:hover,.transaction-card:focus-within{z-index:2;transform:translateY(-8px) scale(1.01);border-color:rgba(241,169,26,.78);background:linear-gradient(145deg,#0d2a44,#071b2d);box-shadow:0 28px 58px rgba(0,0,0,.38),0 0 0 1px rgba(241,169,26,.12)}.transaction-card h2{margin:7px 0 6px;font-size:28px}.transaction-audience{margin:0 0 14px!important;color:#f1aa1c!important;font-weight:800}.transaction-card p{color:#c8d4dc;line-height:1.7}.transaction-card ul{display:grid;gap:8px;margin:18px 0 22px;padding-left:20px;color:#d7e0e6}.transaction-link-row{display:flex;flex-wrap:wrap;gap:9px}
        .transaction-link-row a{position:relative;isolation:isolate;overflow:hidden;display:inline-flex;align-items:center;min-height:40px;padding:0 14px;border:1px solid rgba(105,214,255,.30);border-radius:5px;color:#eaf6fc;background:linear-gradient(145deg,#0b2942 0%,#071827 70%,#04131f 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.06),inset 0 -3px 8px rgba(0,0,0,.15),0 6px 13px rgba(0,0,0,.22);text-decoration:none;font-size:12px;font-weight:900;transform:translateY(0) scale(1);transition:transform .18s ease,filter .18s ease,background .18s ease,border-color .18s ease,box-shadow .18s ease,color .18s ease}
        .transaction-link-row a::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.28;background:radial-gradient(circle at 50% 0%,rgba(105,214,255,.16),transparent 50%),linear-gradient(135deg,rgba(255,255,255,.05),transparent 38%);transition:opacity .18s ease,transform .18s ease}
        .transaction-link-row a:first-child{color:#071521;border-color:#ffd56b;background:linear-gradient(145deg,#ffd56b 0%,#ffc13b 42%,#e69a00 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -3px 0 rgba(120,72,0,.24),0 7px 15px rgba(0,0,0,.27),0 0 0 1px rgba(241,166,0,.08)}
        .transaction-link-row a:first-child::before{background:radial-gradient(circle at 50% 5%,rgba(255,255,255,.34),transparent 48%),linear-gradient(135deg,rgba(255,255,255,.08),transparent 36%);opacity:.42}
        .transaction-link-row a:hover,.transaction-link-row a:focus-visible{transform:translateY(-3px) scale(1.028);border-color:#69d6ff;color:#fff;background:linear-gradient(145deg,#123c5f 0%,#0a2945 62%,#061a2a 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),inset 0 0 22px rgba(105,214,255,.10),0 11px 22px rgba(0,0,0,.32),0 0 18px rgba(105,214,255,.20);text-decoration:none;outline:none;filter:brightness(1.04)}
        .transaction-link-row a:hover::before,.transaction-link-row a:focus-visible::before{opacity:1;transform:scale(1.04)}
        .transaction-link-row a:first-child:hover,.transaction-link-row a:first-child:focus-visible{border-color:#ffe29a;color:#071521;background:linear-gradient(145deg,#ffe082 0%,#ffc94f 42%,#efa300 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.75),inset 0 0 20px rgba(255,236,170,.23),inset 0 -3px 0 rgba(120,72,0,.18),0 12px 24px rgba(0,0,0,.35),0 0 20px rgba(241,166,0,.40)}
        .transaction-link-row a:active{transform:translateY(0) scale(.99)}
        .transaction-disclosure{padding:0 0 72px}.transaction-disclosure-inner{padding:24px;border:1px solid rgba(124,239,255,.28);border-radius:10px;background:#061921}.transaction-disclosure h2{margin:0 0 10px}.transaction-disclosure p{margin:0;color:#c6d6dc;line-height:1.7}@media(max-width:840px){.transaction-grid,.transaction-intro-grid{grid-template-columns:1fr}.transaction-shell{width:min(100% - 30px,1420px)}.transaction-hero{padding-top:50px}}
        @media(hover:none){.transaction-card:hover{transform:none}.transaction-button:hover,.transaction-link-row a:hover{transform:none}}
      `}</style>

      <div className="transaction-official-header-band">
        <FormsSiteHeader />
      </div>

      <section className="transaction-hero">
        <div className="transaction-shell">
          <nav className="transaction-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/resources">Resources</Link><span>›</span><strong>Transaction Services</strong>
          </nav>
          <span className="transaction-kicker">FLLM Transaction Services</span>
          <h1>Florida Liquor License Transaction Services</h1>
          <p>
            FLLM connects the pieces of a Florida liquor-license transaction in one place: market research, valuation, financing, FDOR clearance resources, ABT transfer preparation, county and premises research, closing tools and independent professional referrals.
          </p>
          <div className="transaction-actions">
            <a className="transaction-button gold" href="#services">Explore Transaction Services</a>
            <Link className="transaction-button dark" href="/contact">Discuss a Transaction</Link>
          </div>
        </div>
      </section>

      <section className="transaction-intro">
        <div className="transaction-shell transaction-intro-grid">
          <div>
            <span className="transaction-kicker">One Connected Workflow</span>
            <h2>From market search to transfer and closing</h2>
            <p>
              Florida quota-license transactions are fragmented across private sellers, brokers, lenders, appraisers, state agencies, local jurisdictions and professional advisers. FLLM's role is to connect those workflows and give buyers and sellers a clear path through the transaction.
            </p>
          </div>
          <aside className="transaction-path">
            <strong>Typical transaction path</strong>
            <ol>
              <li>Identify the license and county market.</li>
              <li>Evaluate value and negotiate terms.</li>
              <li>Arrange financing when needed.</li>
              <li>Review FDOR and transfer requirements.</li>
              <li>Prepare ABT transfer materials and local approvals.</li>
              <li>Coordinate closing and professional support.</li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="transaction-services" id="services">
        <div className="transaction-shell transaction-grid">
          {services.map((service) => (
            <article className="transaction-card" id={service.id} key={service.id}>
              <span className="transaction-kicker">{service.kicker}</span>
              <h2>{service.title}</h2>
              <p className="transaction-audience">{service.audience}</p>
              <p>{service.copy}</p>
              <ul>{service.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              <div className="transaction-link-row">
                {service.links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="transaction-disclosure">
        <div className="transaction-shell transaction-disclosure-inner">
          <h2>Coordination, resources and referrals — not a substitute for regulated professional advice</h2>
          <p>
            FLLM provides marketplace information, transaction coordination resources and professional referrals. Legal, tax, zoning, appraisal, lending, fingerprinting and government approvals may require independent qualified professionals or action by the appropriate agency. Users should confirm current requirements directly with DBPR/DABT, FDOR, local authorities, lenders and their advisers.
          </p>
        </div>
      </section>

    </main>
  );
}
