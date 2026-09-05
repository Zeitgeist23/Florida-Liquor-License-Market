import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/finance-a-license`;

export const metadata: Metadata = {
  title: "Finance a Florida Liquor License | Purchase & Refinance | FLLM",
  description:
    "Explore financing for Florida 4COP and 3PS quota liquor-license purchases and refinances. Estimate payments, review financing paths and request lender consideration through FLLM.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "finance a Florida liquor license",
    "Florida liquor license financing",
    "4COP financing",
    "3PS financing",
    "liquor license purchase loan Florida",
    "liquor license refinance Florida",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Finance a Florida Liquor License | FLLM",
    description:
      "Purchase financing and refinance pathways for qualifying Florida quota liquor licenses, with payment tools and access to financing resources.",
    siteName: "Florida Liquor License Market",
  },
};

const financingPaths = [
  {
    eyebrow: "Buying a License",
    title: "Purchase Financing",
    copy: "Buying a 4COP or 3PS quota license does not always require paying the entire purchase price in cash. Specialized lenders may consider the license value, county, down payment, borrower qualifications and transaction structure.",
    bullets: ["Finance part of the purchase price", "Preserve working capital", "Model down payment and monthly debt service"],
    href: "/financing#request-financing",
    action: "Request Purchase Financing",
  },
  {
    eyebrow: "Already Own a License",
    title: "Refinance an Existing License",
    copy: "Current quota-license owners may be able to refinance existing debt or seek new financing supported by the value of an eligible license, subject to lender underwriting and the complete collateral package.",
    bullets: ["Refinance existing license debt", "Evaluate a new loan structure", "Use current market value in the underwriting discussion"],
    href: "/financing#request-financing",
    action: "Request Refinance Review",
  },
];

export default function FinanceALicensePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Finance a Florida Liquor License",
      url: canonicalUrl,
      description:
        "Florida liquor-license purchase financing and refinance information for qualifying quota licenses.",
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Finance", item: `${siteUrl}/financing` },
        { "@type": "ListItem", position: 3, name: "Finance a License", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="finance-license-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <style>{`
        .finance-license-page{min-height:100vh;background:#f5f5f2;color:#0a1721;font-family:Arial,Helvetica,sans-serif}
        .finance-license-shell{width:min(1180px,calc(100% - 36px));margin:0 auto}
        .finance-license-header{position:relative;z-index:100;background:#020c14;border-bottom:1px solid rgba(246,167,0,.38)}
        .finance-license-hero{position:relative;overflow:hidden;padding:74px 0 70px;background:radial-gradient(circle at 82% 18%,rgba(76,224,242,.16),transparent 27%),radial-gradient(circle at 15% 10%,rgba(246,167,0,.14),transparent 24%),linear-gradient(135deg,#020b12 0%,#061728 56%,#0b2639 100%);color:#fff;border-bottom:1px solid rgba(246,167,0,.45)}
        .finance-license-breadcrumbs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:26px;color:#aebcc6;font-size:11px;font-weight:700}
        .finance-license-breadcrumbs a{color:#dce7ed;text-decoration:none}.finance-license-breadcrumbs span{color:#f6a700}
        .finance-license-hero-grid{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(300px,.75fr);gap:52px;align-items:center}
        .finance-license-kicker{display:block;margin-bottom:11px;color:#7cefff;font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}
        .finance-license-hero h1{max-width:780px;margin:0;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:clamp(42px,5.5vw,70px);line-height:.98;letter-spacing:-.025em}
        .finance-license-hero p{max-width:760px;margin:20px 0 0;color:#d3e0e7;font-size:16px;line-height:1.72}
        .finance-license-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
        .finance-license-button{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:0 21px;border-radius:5px;font-size:11px;font-weight:900;letter-spacing:.035em;text-decoration:none;text-transform:uppercase}
        .finance-license-button-primary{border:1px solid #ffc12d;background:linear-gradient(145deg,#ffbd21,#ef9000);color:#07111a;box-shadow:0 10px 28px rgba(246,167,0,.2)}
        .finance-license-button-secondary{border:1px solid #7cefff;background:rgba(9,45,58,.68);color:#cfffff}
        .finance-license-snapshot{padding:25px;border:1px solid rgba(124,239,255,.34);border-radius:13px;background:linear-gradient(145deg,rgba(8,39,53,.88),rgba(2,15,24,.93));box-shadow:0 22px 55px rgba(0,0,0,.32)}
        .finance-license-snapshot>span{display:block;color:#7cefff;font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
        .finance-license-snapshot h2{margin:8px 0 16px;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:27px}
        .finance-license-snapshot-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .finance-license-snapshot-grid div{padding:15px;border:1px solid rgba(255,255,255,.08);border-radius:8px;background:rgba(255,255,255,.035)}
        .finance-license-snapshot-grid strong{display:block;color:#f6a700;font-size:20px}.finance-license-snapshot-grid small{display:block;margin-top:4px;color:#aebcc6;font-size:10px;line-height:1.4}
        .finance-license-main{padding:64px 0 76px}
        .finance-license-section-heading{max-width:820px;margin-bottom:26px}
        .finance-license-section-heading span{display:block;color:#b67600;font-size:10px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}
        .finance-license-section-heading h2{margin:7px 0 9px;color:#071827;font-family:Georgia,'Times New Roman',serif;font-size:clamp(31px,4vw,44px);line-height:1.05}
        .finance-license-section-heading p{margin:0;color:#5f6c75;font-size:14px;line-height:1.7}
        .finance-license-paths{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-bottom:32px}
        .finance-license-card{display:flex;flex-direction:column;padding:28px;border:1px solid #b4c0c8;border-radius:12px;background:#fff;box-shadow:0 13px 30px rgba(8,23,35,.08)}
        .finance-license-card>span{color:#b67600;font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
        .finance-license-card h3{margin:7px 0 12px;color:#071827;font-family:Georgia,'Times New Roman',serif;font-size:30px}
        .finance-license-card p{margin:0;color:#53616b;font-size:14px;line-height:1.68}
        .finance-license-card ul{margin:19px 0 24px;padding:0;list-style:none}
        .finance-license-card li{position:relative;margin:9px 0;padding-left:23px;color:#263640;font-size:13px;line-height:1.5}
        .finance-license-card li::before{content:'✓';position:absolute;left:0;color:#b67600;font-weight:900}
        .finance-license-card a{margin-top:auto;align-self:flex-start;color:#a66a00;font-size:11px;font-weight:900;text-decoration:none;text-transform:uppercase}
        .finance-license-tools{display:grid;grid-template-columns:1.2fr .8fr;gap:18px;margin:34px 0}
        .finance-license-tool{padding:26px;border-radius:12px;color:#fff;text-decoration:none}
        .finance-license-tool.calculator{border:1px solid rgba(124,239,255,.45);background:linear-gradient(145deg,#0a2b36,#061923);box-shadow:0 14px 32px rgba(0,0,0,.15)}
        .finance-license-tool.appraisal{border:1px solid rgba(246,167,0,.45);background:linear-gradient(145deg,#0b2235,#07121d)}
        .finance-license-tool span{display:block;margin-bottom:6px;font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.finance-license-tool.calculator span{color:#7cefff}.finance-license-tool.appraisal span{color:#f6a700}
        .finance-license-tool strong{display:block;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:27px}.finance-license-tool p{margin:8px 0 0;color:#c6d3db;font-size:13px;line-height:1.6}
        .finance-license-factors{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:24px}
        .finance-license-factor{padding:20px;border:1px solid #d0d6da;border-radius:10px;background:#fff}.finance-license-factor strong{display:block;color:#071827;font-size:14px}.finance-license-factor p{margin:7px 0 0;color:#64717a;font-size:12px;line-height:1.55}
        .finance-license-process{margin-top:54px;padding:38px;border:1px solid #916a1c;border-radius:13px;background:linear-gradient(145deg,#061728,#0b2235);color:#fff}
        .finance-license-process .finance-license-section-heading span{color:#7cefff}.finance-license-process .finance-license-section-heading h2{color:#fff}.finance-license-process .finance-license-section-heading p{color:#c4d1d9}
        .finance-license-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.finance-license-step{padding:18px;border:1px solid rgba(255,255,255,.11);border-radius:9px;background:rgba(255,255,255,.035)}.finance-license-step b{display:block;color:#f6a700;font-size:11px}.finance-license-step strong{display:block;margin:7px 0;color:#fff;font-size:14px}.finance-license-step p{margin:0;color:#b8c6cf;font-size:11px;line-height:1.55}
        .finance-license-final{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-top:34px;padding:26px 28px;border:1px solid #c38a19;border-radius:11px;background:#fff}.finance-license-final h2{margin:0 0 6px;color:#071827;font-family:Georgia,'Times New Roman',serif;font-size:27px}.finance-license-final p{margin:0;color:#61707a;font-size:12px;line-height:1.55}
        .finance-license-disclosure{margin-top:22px;color:#69767e;font-size:10px;line-height:1.65}
        @media(max-width:850px){.finance-license-hero-grid,.finance-license-tools{grid-template-columns:1fr}.finance-license-paths{grid-template-columns:1fr}.finance-license-factors,.finance-license-steps{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:560px){.finance-license-shell{width:min(100% - 24px,1180px)}.finance-license-hero{padding:48px 0}.finance-license-hero p{font-size:15px}.finance-license-snapshot-grid,.finance-license-factors,.finance-license-steps{grid-template-columns:1fr}.finance-license-main{padding:46px 0}.finance-license-final{display:block}.finance-license-final .finance-license-button{width:100%;margin-top:18px}}
      `}</style>

      <div className="finance-license-header">
        <FormsSiteHeader primaryActionHref="/financing#request-financing" primaryActionLabel="Request Financing" />
      </div>

      <section className="finance-license-hero">
        <div className="finance-license-shell">
          <nav className="finance-license-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/financing">Finance</Link><span>›</span><strong>Finance a License</strong>
          </nav>
          <div className="finance-license-hero-grid">
            <div>
              <span className="finance-license-kicker">Florida Liquor License Financing</span>
              <h1>Finance a Florida Liquor License</h1>
              <p>
                Explore financing for the purchase or refinance of qualifying Florida quota liquor licenses. Start with the transaction you are considering, estimate the payment, then request financing consideration through FLLM&apos;s financing resources.
              </p>
              <div className="finance-license-actions">
                <Link className="finance-license-button finance-license-button-primary" href="/financing#request-financing">Request Financing</Link>
                <Link className="finance-license-button finance-license-button-secondary" href="/financing/loan-payment-calculator">Calculate a Payment</Link>
              </div>
            </div>
            <aside className="finance-license-snapshot" aria-label="Finance a license options">
              <span>Start Here</span>
              <h2>Choose your financing path</h2>
              <div className="finance-license-snapshot-grid">
                <div><strong>Buy</strong><small>Finance a license purchase</small></div>
                <div><strong>Refi</strong><small>Review an existing license refinance</small></div>
                <div><strong>4COP</strong><small>Quota-license financing focus</small></div>
                <div><strong>3PS</strong><small>Quota package-store financing focus</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="finance-license-main">
        <div className="finance-license-shell">
          <div className="finance-license-section-heading">
            <span>Two Financing Needs</span>
            <h2>Purchase financing or refinance</h2>
            <p>FLLM separates these two needs so users can get to the appropriate financing discussion quickly.</p>
          </div>

          <div className="finance-license-paths">
            {financingPaths.map((path) => (
              <article className="finance-license-card" key={path.title}>
                <span>{path.eyebrow}</span>
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
                <ul>{path.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                <Link href={path.href}>{path.action} →</Link>
              </article>
            ))}
          </div>

          <div className="finance-license-tools">
            <Link className="finance-license-tool calculator" href="/financing/loan-payment-calculator">
              <span>Interactive Tool</span>
              <strong>Loan Payment Calculator</strong>
              <p>Enter a purchase price or refinance amount, down payment, interest rate and term to estimate monthly payments and review an amortization schedule.</p>
            </Link>
            <Link className="finance-license-tool appraisal" href="/florida-liquor-license-appraisal#order-form">
              <span>Valuation Support</span>
              <strong>License Appraisal</strong>
              <p>When a lender needs support for collateral value, FLLM&apos;s appraisal resources can help document county-level market evidence.</p>
            </Link>
          </div>

          <div className="finance-license-section-heading">
            <span>Underwriting Factors</span>
            <h2>What a financing source may evaluate</h2>
            <p>Every lender establishes its own underwriting standards. Common considerations include the license, the transaction and the borrower&apos;s overall financial profile.</p>
          </div>
          <div className="finance-license-factors">
            <div className="finance-license-factor"><strong>License & County</strong><p>License series, transferability, county market depth and current market value.</p></div>
            <div className="finance-license-factor"><strong>Down Payment / Equity</strong><p>Buyer cash investment or existing owner equity relative to the requested loan.</p></div>
            <div className="finance-license-factor"><strong>Borrower Profile</strong><p>Credit, liquidity, experience, income or business cash flow, depending on the loan structure.</p></div>
            <div className="finance-license-factor"><strong>Transaction Structure</strong><p>Purchase terms, refinance purpose, collateral package, documentation and regulatory requirements.</p></div>
          </div>

          <section className="finance-license-process" aria-labelledby="finance-license-process-title">
            <div className="finance-license-section-heading">
              <span>Financing Workflow</span>
              <h2 id="finance-license-process-title">From license search to financing request</h2>
              <p>FLLM keeps the marketplace and financing paths connected without representing that any financing is guaranteed.</p>
            </div>
            <div className="finance-license-steps">
              <div className="finance-license-step"><b>01</b><strong>Identify the license</strong><p>Browse a specific listing or identify the license you already own.</p></div>
              <div className="finance-license-step"><b>02</b><strong>Estimate the structure</strong><p>Use the payment calculator to model loan amount, rate and term scenarios.</p></div>
              <div className="finance-license-step"><b>03</b><strong>Request consideration</strong><p>Provide the key transaction details through the financing request process.</p></div>
              <div className="finance-license-step"><b>04</b><strong>Lender review</strong><p>An independent financing source determines underwriting, approval and final terms.</p></div>
            </div>
          </section>

          <div className="finance-license-final">
            <div>
              <h2>Ready to finance a license?</h2>
              <p>Submit the license, county, purchase or refinance amount and your basic transaction information for financing consideration.</p>
            </div>
            <Link className="finance-license-button finance-license-button-primary" href="/financing#request-financing">Request Financing</Link>
          </div>

          <p className="finance-license-disclosure">
            Florida Liquor License Market is a marketplace and information resource and does not guarantee financing, approval, rates, terms, collateral value or transaction closing. Financing is subject to independent lender review, underwriting, documentation and approval. Users should obtain independent legal, tax and financial advice appropriate to their transaction.
          </p>
        </div>
      </section>
    </main>
  );
}
