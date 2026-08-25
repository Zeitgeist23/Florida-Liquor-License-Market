import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/self-directed-ira-liquor-license-lending`;

export const metadata: Metadata = {
  title: "Self-Directed IRA Liquor License Lending | Florida 4COP & 3PS",
  description:
    "Learn how a self-directed Traditional or Roth IRA may be used for third-party private lending tied to Florida liquor license transactions, and explore FLLM's flat-fee administrative IRA setup assistance.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "Self-Directed IRA Lending for Florida Liquor License Financing",
    description:
      "An educational guide to self-directed IRA private lending for Florida 4COP and 3PS quota license transactions, plus administrative setup assistance.",
    siteName: "Florida Liquor License Market",
  },
};

export default function SelfDirectedIraLiquorLicenseLendingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Self-Directed IRA Lending for Florida Liquor License Financing",
    description:
      "An educational guide to self-directed IRA private lending for unrelated third-party Florida 4COP and 3PS quota liquor license purchases and refinances.",
    datePublished: "2026-08-19",
    dateModified: "2026-08-19",
    mainEntityOfPage: canonicalUrl,
    author: { "@type": "Organization", name: "Florida Liquor License Market" },
    publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
  };

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Self-Directed IRA Setup Assistance",
    serviceType: "Administrative retirement-account setup and transfer coordination",
    provider: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
    description:
      "Flat-fee administrative assistance organizing a customer's self-directed IRA custodian onboarding materials, transfer or rollover paperwork, document checklist, and follow-up. FLLM does not act as custodian, trustee, investment adviser, broker-dealer, tax adviser, or law firm.",
    offers: {
      "@type": "Offer",
      price: "495.00",
      priceCurrency: "USD",
      url: `${canonicalUrl}#ira-setup-assistance`,
    },
  };

  return (
    <main className="seo-market-page ira-lending-guide-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData).replaceAll("<", "\\u003c") }}
      />
      <style>{`
        .ira-lending-guide-page{background:#f7f7f5;color:#111820}
        .ira-lending-guide-page .seo-market-hero{background:radial-gradient(circle at 84% 16%,rgba(246,167,0,.18),transparent 30%),linear-gradient(135deg,#020b12 0%,#061728 55%,#0a2237 100%);border-top:1px solid rgba(246,167,0,.38);border-bottom:1px solid rgba(246,167,0,.46)}
        .ira-lending-guide-page .seo-market-breadcrumbs,.ira-lending-guide-page .seo-market-hero p{color:#dce5ec}
        .ira-lending-guide-page .seo-market-breadcrumbs a,.ira-lending-guide-page .seo-market-kicker,.ira-lending-guide-page .seo-market-section-kicker{color:#f6a700}
        .ira-lending-guide-page .seo-market-hero h1{color:#fff}
        .ira-lending-guide-page .seo-market-button{min-height:48px;padding:0 20px;border-radius:5px;font-size:12px;font-weight:900;text-transform:uppercase;transition:transform .18s ease,filter .18s ease}
        .ira-lending-guide-page .seo-market-button-gold,.ira-lending-guide-page .seo-market-button-dark{border:1px solid #ffc12d;background:linear-gradient(145deg,#ffbd21 0%,#ef9000 100%);color:#07111a;box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 8px 22px rgba(246,167,0,.24)}
        .ira-lending-guide-page .seo-market-button:hover{transform:translateY(-2px);filter:brightness(1.08)}
        .ira-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:24px}
        .ira-card{padding:24px;border:1px solid rgba(246,167,0,.32);border-radius:13px;background:linear-gradient(145deg,#0a2237,#04111c);color:#d9e2ec;box-shadow:0 12px 26px rgba(0,0,0,.16)}
        .ira-card h3{margin:0 0 10px;color:#fff;font-size:22px;line-height:1.25;font-weight:700}
        .ira-card p{margin:0;color:#d9e2ec;font-size:17px;line-height:1.7;font-weight:500}
        .ira-card strong{color:#ffb400}
        .ira-steps{display:grid;gap:14px;margin:24px 0 0;padding:0;list-style:none;counter-reset:ira-step}
        .ira-steps li{counter-increment:ira-step;position:relative;padding:20px 20px 20px 66px;border:1px solid rgba(246,167,0,.18);border-radius:11px;background:#fff;color:#334255;line-height:1.65;box-shadow:0 8px 20px rgba(7,26,58,.06)}
        .ira-steps li::before{content:counter(ira-step);position:absolute;left:18px;top:17px;display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#f6a700;color:#071a3a;font-weight:900}
        .ira-rules{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:22px;padding:0;list-style:none}
        .ira-rules li{position:relative;padding:16px 16px 16px 44px;border:1px solid rgba(246,167,0,.18);border-radius:11px;background:linear-gradient(145deg,#0a2237,#061728);color:#dce5ec;line-height:1.6}
        .ira-rules li::before{content:"•";position:absolute;left:17px;top:12px;color:#ffb400;font-size:28px;line-height:1;font-weight:900}
        .ira-example{margin-top:24px;padding:24px;border:1px solid rgba(246,167,0,.3);border-radius:13px;background:#fff;box-shadow:0 10px 24px rgba(7,26,58,.08)}
        .ira-example h3{margin:0 0 10px;color:#071a3a;font-size:22px}.ira-example p{margin:0;color:#465669;font-size:16px;line-height:1.7}
        .ira-warning{margin-top:24px;padding:22px 24px;border-left:4px solid #f6a700;border-radius:0 10px 10px 0;background:rgba(255,255,255,.08);color:#e7edf3!important;font-size:17px;line-height:1.75;font-weight:500;box-shadow:inset 0 0 0 1px rgba(255,255,255,.04)}
        .ira-warning strong{color:#ffbf2f!important;font-weight:800}
        .ira-source-links{display:flex;flex-wrap:wrap;gap:12px;margin-top:18px}
        .ira-source-links a{font-weight:800;color:#0a4d83;text-decoration:underline;text-underline-offset:3px}
        .ira-setup-lead{max-width:850px;color:#465669;font-size:17px;line-height:1.75}
        .ira-setup-service{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(260px,.55fr);gap:24px;margin-top:24px;padding:28px;border:1px solid rgba(246,167,0,.42);border-radius:15px;background:linear-gradient(145deg,#0a2237 0%,#04111c 78%);box-shadow:0 16px 34px rgba(7,26,58,.16)}
        .ira-setup-service h3{margin:0 0 10px;color:#fff;font-size:24px;line-height:1.25}
        .ira-setup-service p{margin:0;color:#dce5ec;font-size:16px;line-height:1.7}
        .ira-setup-list{display:grid;gap:11px;margin:20px 0 0;padding:0;list-style:none}
        .ira-setup-list li{position:relative;padding-left:30px;color:#e7edf3;font-size:15px;line-height:1.55}
        .ira-setup-list li::before{content:"✓";position:absolute;left:0;top:0;color:#ffb400;font-weight:900;font-size:18px}
        .ira-setup-price{align-self:start;padding:22px;border:1px solid rgba(246,167,0,.55);border-radius:12px;background:rgba(255,255,255,.06);text-align:center}
        .ira-setup-price>span{display:block;color:#f6a700;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
        .ira-setup-price>strong{display:block;margin:8px 0 2px;color:#fff;font-size:48px;line-height:1;font-weight:900}
        .ira-setup-price>small{display:block;margin-bottom:18px;color:#c9d5df;font-size:13px;line-height:1.5}
        .ira-setup-price .seo-market-button{width:100%;justify-content:center}
        .ira-admin-boundary{margin-top:16px;padding:18px 20px;border-left:4px solid #f6a700;border-radius:0 10px 10px 0;background:#fff;color:#465669;font-size:14px;line-height:1.7;box-shadow:0 8px 18px rgba(7,26,58,.06)}
        .ira-admin-boundary strong{color:#071a3a}
        .ira-lending-guide-page .seo-market-counties{background:linear-gradient(145deg,#0a2237 0%,#020b12 74%);border-top:1px solid rgba(246,167,0,.38);border-bottom:1px solid rgba(246,167,0,.38)}
        .ira-lending-guide-page .seo-market-counties h2{color:#fff}
        @media(max-width:820px){.ira-grid,.ira-rules,.ira-setup-service{grid-template-columns:1fr}.ira-card h3{font-size:20px}.ira-card p{font-size:16px}.ira-steps li{padding-left:60px}.ira-warning{padding:18px;font-size:15px;line-height:1.7}.ira-setup-service{padding:20px}.ira-setup-price>strong{font-size:42px}}
      `}</style>

      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/investment-opportunities" primaryActionLabel="View Opportunities" />
      </div>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/investment-opportunities">Invest</Link><span>›</span><strong>Self-Directed IRA Lending</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Retirement-Account Private Lending</span>
              <h1>Use a Self-Directed IRA to Explore Liquor License Lending</h1>
              <p>
                Some self-directed IRA custodians permit private-debt investments. In an eligible, properly structured transaction, a Traditional or Roth IRA may hold a loan made to an unrelated third-party borrower who is purchasing or refinancing a transferable Florida 4COP Quota or 3PS quota liquor license. Interest and principal payments are directed back to the IRA account rather than paid personally to the IRA owner.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/investment-opportunities">View Investment Opportunities</Link>
                <Link className="seo-market-button seo-market-button-dark" href="#ira-setup-assistance">IRA Setup Assistance — $495</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">The Basic Structure</span>
          <h2>The IRA is the investor — not the IRA owner personally</h2>
          <div className="ira-grid">
            <article className="ira-card"><h3>Traditional IRA</h3><p>A qualifying self-directed Traditional IRA may be able to hold a private note when the custodian permits the investment and the transaction complies with applicable retirement-account rules.</p></article>
            <article className="ira-card"><h3>Roth IRA</h3><p>A qualifying self-directed Roth IRA may also be able to hold private debt. Tax treatment depends on the account and the investor’s circumstances; FLLM does not provide tax advice.</p></article>
            <article className="ira-card"><h3>Third-party borrower</h3><p>The borrower should be an unrelated party who is not a disqualified person with respect to the IRA. The transaction must be evaluated for direct and indirect prohibited-transaction concerns.</p></article>
            <article className="ira-card"><h3>Interest returns to the IRA</h3><p>Loan payments are generally directed to the retirement account through the custodian or administrator. The IRA owner should not personally receive the borrower’s interest or principal payments.</p></article>
          </div>
        </div>
      </section>

      <section className="seo-market-intro" id="ira-setup-assistance">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Optional Administrative Service</span>
          <h2>Self-Directed IRA Setup Assistance</h2>
          <p className="ira-setup-lead">
            Want help getting a self-directed IRA administratively ready? FLLM offers a flat-fee concierge service that helps organize the paperwork and follow-up required by the custodian you select. The IRA itself is established and held by the customer’s chosen IRA custodian or trustee — not by FLLM.
          </p>

          <div className="ira-setup-service">
            <div>
              <h3>Administrative setup & transfer coordination</h3>
              <p>We help keep the process organized while you remain in control of the custodian, account elections, signatures and investment decisions.</p>
              <ul className="ira-setup-list">
                <li>Organize the account-opening materials required by your selected self-directed IRA custodian or administrator.</li>
                <li>Help assemble factual information and supporting documents requested by the custodian, using information supplied or approved by you.</li>
                <li>Help coordinate the custodian’s transfer or rollover paperwork with your existing IRA provider or retirement-plan administrator.</li>
                <li>Track administrative follow-up, missing items and status updates while the new account is being opened and funded.</li>
                <li>Prepare an administrative checklist for a future private-lending investment request once the account is established.</li>
              </ul>
            </div>

            <aside className="ira-setup-price" aria-label="Self-Directed IRA Setup Assistance price">
              <span>Flat administrative fee</span>
              <strong>$495</strong>
              <small>One-time setup-assistance fee. Not based on the IRA balance, amount transferred, loan size or whether any investment closes.</small>
              <Link className="seo-market-button seo-market-button-gold" href="/contact?topic=self-directed-ira-setup">Request Setup Assistance</Link>
            </aside>
          </div>

          <div className="ira-admin-boundary">
            <strong>Administrative scope only.</strong> FLLM does not select your custodian, recommend whether you should make a rollover, transfer or Roth conversion, choose tax elections, draft customized legal or loan documents, provide legal, tax or investment advice, handle retirement funds, sign forms for you, determine prohibited-transaction compliance, or guarantee that a custodian will accept a proposed investment. You review and approve all elections and sign all required documents. Any actual movement of retirement assets is handled by the existing plan or IRA provider and the receiving custodian or trustee under their procedures.
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">How a Transaction Could Work</span><h2>From opportunity to IRA-owned private loan</h2></div></div>
          <ol className="ira-steps">
            <li><strong>Identify an unrelated borrower and transaction.</strong> The borrower may be buying or refinancing a Florida 4COP Quota or 3PS quota liquor license.</li>
            <li><strong>Review the license and loan economics.</strong> Investors should evaluate county-specific license value, requested loan amount, borrower equity, repayment capacity, liens, transaction timing and exit strategy.</li>
            <li><strong>Confirm custodian eligibility before committing funds.</strong> The IRA custodian or administrator must be willing to hold the proposed private-debt investment and complete its own documentation and review process.</li>
            <li><strong>Complete prohibited-transaction review.</strong> The IRA owner should have qualified tax or legal professionals determine whether the borrower, related parties or transaction structure creates a prohibited transaction.</li>
            <li><strong>Document and fund through the IRA.</strong> If approved, the retirement account — not the IRA owner personally — funds the loan, and the note and related documents are titled for the IRA in the form required by the custodian.</li>
            <li><strong>Direct payments back to the IRA.</strong> Principal and interest are paid to the IRA account according to the loan documents and custodian procedures.</li>
          </ol>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Important IRS Rules</span>
          <h2>This is not the same as taking a loan from your IRA</h2>
          <ul className="ira-rules">
            <li>The IRS states that participant loans are not permitted from IRAs or IRA-based plans.</li>
            <li>Borrowing money from your own IRA can be a prohibited transaction.</li>
            <li>Using IRA assets as security for your personal loan can create adverse tax consequences.</li>
            <li>Lending money or extending credit between a plan or IRA and a disqualified person can be prohibited.</li>
            <li>Direct or indirect use of IRA assets for the benefit of a disqualified person can create prohibited-transaction risk.</li>
            <li>Nonpublicly traded or directly controlled assets can carry increased prohibited-transaction risk and require careful administration.</li>
          </ul>
          <div className="ira-source-links">
            <a href="https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-prohibited-transactions" target="_blank" rel="noreferrer">IRS: Prohibited Transactions</a>
            <a href="https://www.irs.gov/retirement-plans/retirement-plans-faqs-regarding-loans" target="_blank" rel="noreferrer">IRS: IRA Loan Rules</a>
            <a href="https://www.irs.gov/retirement-plans/plan-participant-employee/rollovers-of-retirement-plan-and-ira-distributions" target="_blank" rel="noreferrer">IRS: Rollovers & Trustee-to-Trustee Transfers</a>
            <a href="https://www.irs.gov/publications/p590a" target="_blank" rel="noreferrer">IRS Publication 590-A</a>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Illustrative Example</span>
          <h2>A retirement account funds an unrelated buyer’s license purchase</h2>
          <div className="ira-example">
            <h3>Example only — not an offer or promised return</h3>
            <p>
              An unrelated buyer agrees to purchase a transferable Florida quota liquor license and seeks private financing for part of the acquisition. An investor with a self-directed IRA identifies the opportunity, completes independent underwriting and confirms with the IRA custodian and professional advisers that the investment is eligible. If approved, the IRA funds the loan and holds the investment through the custodian. The borrower makes scheduled principal and interest payments back to the IRA under the loan documents. Any collateral package, guarantees, lien rights, perfection steps and enforcement remedies must be documented for the specific transaction and applicable law.
            </p>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading"><div><span className="seo-market-section-kicker">Investor Due Diligence</span><h2>Private lending can produce income — and can also lose money</h2></div></div>
          <ul className="ira-rules">
            <li>Verify the exact license, county, status, transferability and market value.</li>
            <li>Review borrower credit, liquidity, equity and repayment capacity.</li>
            <li>Understand whether the loan is secured and what remedies are actually available after default.</li>
            <li>Review existing liens, senior debt and any competing claims.</li>
            <li>Confirm the interest rate, maturity, amortization, balloon terms, fees and prepayment provisions.</li>
            <li>Use independent legal, tax and retirement-account professionals before funding.</li>
          </ul>
          <div className="ira-warning">
            <strong>Important:</strong> FLLM is an information and marketplace platform. FLLM is not an IRA custodian or trustee, investment adviser, broker-dealer, tax adviser or law firm. FLLM does not guarantee that any proposed transaction qualifies for IRA investment treatment, does not guarantee repayment or return, and does not determine whether a transaction is a prohibited transaction. Investors and borrowers should obtain independent professional advice before entering any transaction.
          </div>
        </div>
      </section>

      <section className="seo-market-cta">
        <div className="seo-market-shell seo-market-cta-inner">
          <div>
            <span className="seo-market-section-kicker">Explore Private Lending</span>
            <h2>Review opportunities — or get help organizing your IRA setup.</h2>
            <p>Evaluate the license, borrower, collateral structure, loan terms and retirement-account eligibility before committing capital.</p>
          </div>
          <div className="seo-market-actions">
            <Link className="seo-market-button seo-market-button-gold" href="/investment-opportunities">View Opportunities</Link>
            <Link className="seo-market-button seo-market-button-dark" href="#ira-setup-assistance">Setup Assistance — $495</Link>
          </div>
        </div>
      </section>
    </main>
  );
}