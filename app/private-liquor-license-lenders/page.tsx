import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/private-liquor-license-lenders`;

export const metadata: Metadata = {
  title: "Private Liquor License Lenders in Florida | FLLM Guide",
  description:
    "Learn how private lenders finance Florida quota liquor licenses, what they underwrite, how license value affects loan size, and what borrowers should expect from rates, terms and closing requirements.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "Private Liquor License Lenders in Florida | FLLM",
    description:
      "A guide to specialty private lending for transferable Florida quota liquor licenses, including underwriting, collateral, rates, terms and lender introductions.",
    siteName: "Florida Liquor License Market",
  },
};

export default function PrivateLiquorLicenseLendersPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Private Liquor License Lenders in Florida",
    description:
      "A guide to private lenders that finance transferable Florida quota liquor licenses and the underwriting factors they consider.",
    datePublished: "2026-08-18",
    dateModified: "2026-08-18",
    mainEntityOfPage: canonicalUrl,
    author: { "@type": "Organization", name: "Florida Liquor License Market" },
    publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
  };

  return (
    <main className="seo-market-page private-lender-guide-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
      <style>{`
        .private-lender-guide-page{background:#f7f7f5;color:#111820}
        .private-lender-guide-page .seo-market-hero{background:radial-gradient(circle at 84% 16%,rgba(246,167,0,.18),transparent 30%),linear-gradient(135deg,#020b12 0%,#061728 55%,#0a2237 100%);border-top:1px solid rgba(246,167,0,.38);border-bottom:1px solid rgba(246,167,0,.46)}
        .private-lender-guide-page .seo-market-breadcrumbs,.private-lender-guide-page .seo-market-hero p{color:#dce5ec}
        .private-lender-guide-page .seo-market-breadcrumbs a,.private-lender-guide-page .seo-market-kicker,.private-lender-guide-page .seo-market-section-kicker{color:#f6a700}
        .private-lender-guide-page .seo-market-hero h1{color:#fff}
        .private-lender-guide-page .seo-market-button{min-height:48px;padding:0 20px;border-radius:5px;font-size:12px;font-weight:900;text-transform:uppercase;transition:transform .18s ease,filter .18s ease}
        .private-lender-guide-page .seo-market-button-gold,.private-lender-guide-page .seo-market-button-dark{border:1px solid #ffc12d;background:linear-gradient(145deg,#ffbd21 0%,#ef9000 100%);color:#07111a;box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 8px 22px rgba(246,167,0,.24)}
        .private-lender-guide-page .seo-market-button:hover{transform:translateY(-2px);filter:brightness(1.08)}
        .private-lender-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:24px}
        .private-lender-card{padding:24px;border:1px solid rgba(246,167,0,.32);border-radius:13px;background:linear-gradient(145deg,#0a2237,#04111c);color:#c9d5df;box-shadow:0 12px 26px rgba(0,0,0,.16)}
        .private-lender-card h3{margin:0 0 10px;color:#fff;font-size:21px}.private-lender-card p{margin:0;line-height:1.68}.private-lender-card strong{color:#ffb400}
        .private-lender-checklist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:22px;padding:0;list-style:none}
        .private-lender-checklist li{position:relative;padding:16px 16px 16px 45px;border:1px solid rgba(246,167,0,.18);border-radius:11px;background:linear-gradient(145deg,#0a2237,#061728);color:#d7e0e7;line-height:1.55}
        .private-lender-checklist li::before{content:"✓";position:absolute;left:16px;top:15px;color:#ffb400;font-weight:900}
        .private-lender-note{margin-top:22px;padding:17px 19px;border-left:3px solid #f6a700;background:rgba(246,167,0,.08);color:#526171;font-size:12px;line-height:1.7}
        .private-lender-guide-page .seo-market-counties{background:linear-gradient(145deg,#0a2237 0%,#020b12 74%);border-top:1px solid rgba(246,167,0,.38);border-bottom:1px solid rgba(246,167,0,.38)}
        .private-lender-guide-page .seo-market-counties h2{color:#fff}
        @media(max-width:820px){.private-lender-grid,.private-lender-checklist{grid-template-columns:1fr}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/financing#request-financing" primaryActionLabel="Request Financing" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href="/financing">Finance</Link><span>›</span><strong>Private Lenders</strong></div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Private Liquor License Lending</span>
              <h1>Private Lenders for Florida Liquor Licenses</h1>
              <p>
                Specialty private lenders finance transactions that often fall outside conventional bank credit boxes. For transferable Florida quota licenses, the lender focuses on the license’s county-specific market value, the borrower’s equity and qualifications, the transaction structure, and the lender’s ability to protect its collateral position.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/financing#request-financing">Request Financing</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/how-to-finance-florida-liquor-license">Read Financing Guide</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Who the Lenders Are</span>
          <h2>The market is broader than one type of lender</h2>
          <div className="private-lender-grid">
            <article className="private-lender-card"><h3>Specialty asset lenders</h3><p>These lenders focus on unusual collateral and understand how transferable quota licenses are valued, documented and transferred.</p></article>
            <article className="private-lender-card"><h3>Private credit and family offices</h3><p>Private capital sources may make transaction-specific loans when the collateral coverage, borrower equity and expected return fit their mandate.</p></article>
            <article className="private-lender-card"><h3>Individual private lenders</h3><p>Experienced private investors sometimes make secured loans on quota licenses, often with negotiated terms tailored to the exact license and borrower.</p></article>
            <article className="private-lender-card"><h3>Seller financing</h3><p>A seller may agree to carry part of the purchase price when the buyer has meaningful cash equity and the parties can agree on collateral, repayment and default protections.</p></article>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">What Drives Approval</span><h2>Private lenders underwrite collateral and borrower risk together</h2></div></div>
          <ul className="private-lender-checklist">
            <li>4COP-family or 3PS-family quota license with established county value.</li>
            <li>Current license status and transferability issues.</li>
            <li>Purchase price, refinance value and requested loan amount.</li>
            <li>Borrower cash down payment or existing equity.</li>
            <li>Credit profile, liquidity and ability to service the debt.</li>
            <li>Business cash flow if an operating business supports repayment.</li>
            <li>Existing liens, debt or security interests.</li>
            <li>Purchase agreement, transaction timing and DBPR transfer plan.</li>
            <li>Additional collateral or guarantees when required.</li>
            <li>Exit strategy, refinance plan or expected loan payoff source.</li>
          </ul>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Typical Economics</span>
          <h2>Private lending is priced for specialization and collateral risk</h2>
          <div className="private-lender-grid">
            <article className="private-lender-card"><h3>Interest</h3><p><strong>FLLM’s current private-lender network generally targets an indicative 10%–12% range</strong> for qualifying transactions. Final pricing can fall outside that range after underwriting.</p></article>
            <article className="private-lender-card"><h3>Loan size</h3><p>Loan amount is usually constrained by collateral value and borrower equity rather than by purchase price alone. A lender may apply a conservative value even when the buyer agrees to pay more.</p></article>
            <article className="private-lender-card"><h3>Repayment structure</h3><p>Private loans can use amortization, balloon maturities, shorter terms or other negotiated structures. The exact schedule depends on lender policy and the borrower’s expected payoff strategy.</p></article>
            <article className="private-lender-card"><h3>Fees and documentation</h3><p>Origination, documentation, legal, closing or valuation costs may apply. Security documents, guarantees and lien-related filings are transaction-specific.</p></article>
          </div>
          <p className="private-lender-note">
            FLLM does not promise approval or a particular lender, rate or term. A lender introduction is only the beginning of underwriting. Final terms come from the lender after review of the license, borrower and transaction.
          </p>
        </div>
      </section>

      <section className="seo-market-cta">
        <div className="seo-market-shell seo-market-cta-inner">
          <div><span className="seo-market-section-kicker">Request a Lender Introduction</span><h2>Give FLLM the transaction details a lender will need.</h2><p>County, license type, value or purchase price, requested loan amount, borrower equity and timeline are the best starting points.</p></div>
          <div className="seo-market-actions"><Link className="seo-market-button seo-market-button-gold" href="/financing#request-financing">Request Financing</Link><Link className="seo-market-button seo-market-button-dark" href="/florida-liquor-license-value">Estimate License Value</Link></div>
        </div>
      </section>
    </main>
  );
}
