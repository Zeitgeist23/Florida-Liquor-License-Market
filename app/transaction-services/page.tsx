import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";

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
        .transaction-shell{width:min(1420px,calc(100% - 56px));margin:0 auto}
        .transaction-hero{padding:72px 0 64px;border-bottom:1px solid rgba(241,169,26,.32);background:radial-gradient(circle at 82% 10%,rgba(30,104,149,.27),transparent 32%),linear-gradient(135deg,#0a2942,#051827 58%,#03101b)}
        .transaction-breadcrumbs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px;color:#9fb0bd;font-size:12px}.transaction-breadcrumbs a{color:#f1aa1c;text-decoration:none}
        .transaction-kicker{display:block;color:#f1aa1c;font-size:11px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}
        .transaction-hero h1{max-width:940px;margin:10px 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:clamp(42px,6vw,72px);line-height:1.02}
        .transaction-hero p{max-width:950px;margin:0;color:#d4dee5;font-size:18px;line-height:1.75}
        .transaction-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.transaction-button{display:inline-flex;min-height:46px;align-items:center;justify-content:center;padding:0 18px;border-radius:6px;font-weight:900;text-decoration:none}.transaction-button.gold{border:1px solid #f1aa1c;color:#071521;background:linear-gradient(145deg,#ffc441,#e99b06)}.transaction-button.dark{border:1px solid rgba(255,255,255,.24);color:#fff;background:#071d31}
        .transaction-intro{padding:52px 0 22px}.transaction-intro-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:26px;align-items:start}.transaction-intro h2{margin:8px 0 12px;font-size:clamp(30px,4vw,44px)}.transaction-intro p{color:#c7d3dc;line-height:1.72}.transaction-path{padding:22px;border:1px solid rgba(241,169,26,.35);border-radius:10px;background:#071d31}.transaction-path strong{display:block;margin-bottom:12px;color:#f1aa1c}.transaction-path ol{margin:0;padding-left:22px;color:#d5dee5;line-height:1.8}
        .transaction-services{padding:34px 0 72px}.transaction-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.transaction-card{scroll-margin-top:90px;padding:28px;border:1px solid rgba(255,255,255,.11);border-radius:12px;background:linear-gradient(145deg,#0a2237,#061726);box-shadow:0 14px 34px rgba(0,0,0,.22);transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease,background .22s ease;will-change:transform}.transaction-card:hover,.transaction-card:focus-within{z-index:2;transform:translateY(-8px) scale(1.01);border-color:rgba(241,169,26,.78);background:linear-gradient(145deg,#0d2a44,#071b2d);box-shadow:0 28px 58px rgba(0,0,0,.38),0 0 0 1px rgba(241,169,26,.12)}.transaction-card h2{margin:7px 0 6px;font-size:28px}.transaction-audience{margin:0 0 14px!important;color:#f1aa1c!important;font-weight:800}.transaction-card p{color:#c8d4dc;line-height:1.7}.transaction-card ul{display:grid;gap:8px;margin:18px 0 22px;padding-left:20px;color:#d7e0e6}.transaction-link-row{display:flex;flex-wrap:wrap;gap:9px}.transaction-link-row a{display:inline-flex;align-items:center;min-height:40px;padding:0 13px;border:1px solid rgba(241,169,26,.48);border-radius:5px;color:#f4b22a;background:#071827;text-decoration:none;font-size:12px;font-weight:900;transition:transform .18s ease,background .18s ease,border-color .18s ease}.transaction-link-row a:first-child{color:#071521;background:linear-gradient(145deg,#ffc441,#e99b06);border-color:#f1aa1c}.transaction-link-row a:hover,.transaction-link-row a:focus-visible{transform:translateY(-2px);border-color:#f1aa1c;text-decoration:none;outline:none}.transaction-link-row a:not(:first-child):hover,.transaction-link-row a:not(:first-child):focus-visible{background:#0b2238}
        .transaction-disclosure{padding:0 0 72px}.transaction-disclosure-inner{padding:24px;border:1px solid rgba(124,239,255,.28);border-radius:10px;background:#061921}.transaction-disclosure h2{margin:0 0 10px}.transaction-disclosure p{margin:0;color:#c6d6dc;line-height:1.7}.transaction-footer{padding:34px 0;border-top:1px solid rgba(255,255,255,.09);background:#020b12}.transaction-footer-inner{display:flex;align-items:center;justify-content:space-between;gap:20px}.transaction-footer img{width:210px}.transaction-footer nav{display:flex;flex-wrap:wrap;gap:16px}.transaction-footer a{color:#dce5eb;text-decoration:none}.transaction-footer a:hover{color:#f1aa1c}
        @media(max-width:840px){.transaction-grid,.transaction-intro-grid{grid-template-columns:1fr}.transaction-shell{width:min(100% - 30px,1420px)}.transaction-hero{padding-top:50px}.transaction-footer-inner{align-items:flex-start;flex-direction:column}}
        @media(hover:none){.transaction-card:hover{transform:none}.transaction-link-row a:hover{transform:none}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/contact" primaryActionLabel="Discuss a Transaction" />
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

      <footer className="transaction-footer">
        <div className="transaction-shell transaction-footer-inner">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
          <nav>
            <Link href="/listings">Listings</Link>
            <Link href="/exchange">Exchange</Link>
            <Link href="/financing">Financing</Link>
            <Link href="/florida-liquor-license-appraisal">Appraisals</Link>
            <Link href="/resources">Resources</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
