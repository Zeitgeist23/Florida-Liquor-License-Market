import type { Metadata } from "next";
import Script from "next/script";

import FormsSiteHeader from "@/components/FormsSiteHeader";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/financing/loan-payment-calculator`;

export const metadata: Metadata = {
  title: "Florida Liquor License Loan Payment Calculator | FLLM",
  description:
    "Estimate Florida liquor-license purchase and refinance payments, compare interest rates, review loan amortization, and model a separate IRS Section 197 tax-basis schedule.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Loan Payment Calculator | FLLM",
    description:
      "Estimate purchase and refinance payments for Florida quota liquor licenses and review loan and Section 197 amortization schedules.",
    siteName: "Florida Liquor License Market",
  },
};

export default function LoanPaymentCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Florida Liquor License Loan Payment Calculator",
    url: canonicalUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    provider: {
      "@type": "Organization",
      name: "Florida Liquor License Market",
      url: siteUrl,
    },
    description:
      "Interactive calculator for Florida quota liquor-license purchase and refinance loan payments, loan amortization, interest-rate comparisons and a separate estimated Section 197 tax-basis schedule.",
  };

  return (
    <main className="loan-calculator-page">
      <link rel="stylesheet" href="/assets/financing-loan-calculator.css?v=2" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <style>{`
        .loan-calculator-page{
          min-height:100vh;
          background:
            radial-gradient(circle at 18% 10%,rgba(15,75,96,.28),transparent 30%),
            linear-gradient(180deg,#03111d 0%,#061725 52%,#031019 100%);
          color:#fff;
          overflow-x:hidden;
        }
        .loan-calculator-page .calculator-header-wrap{
          position:relative;
          z-index:200;
          border-bottom:1px solid rgba(246,167,0,.42);
          background:#020c14;
        }
        .loan-calculator-page .calculator-breadcrumb{
          width:min(1180px,calc(100% - 36px));
          margin:0 auto;
          padding:20px 0 0;
          color:#9fb0bb;
          font:700 11px/1.4 Arial,Helvetica,sans-serif;
          letter-spacing:.02em;
        }
        .loan-calculator-page .calculator-breadcrumb a{color:#dce9ef;text-decoration:none}
        .loan-calculator-page .calculator-breadcrumb a:hover{color:#f6a700}
        .loan-calculator-page .calculator-breadcrumb span{padding:0 8px;color:#f6a700}
        .loan-calculator-page .fllm-loan-calculator-section{margin-top:20px;margin-bottom:36px}
        .loan-calculator-page .calculator-after{
          width:min(1180px,calc(100% - 36px));
          margin:0 auto 56px;
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:14px;
        }
        .loan-calculator-page .calculator-after a{
          display:flex;
          min-height:92px;
          flex-direction:column;
          justify-content:center;
          border:1px solid rgba(246,167,0,.42);
          border-radius:10px;
          background:rgba(2,15,24,.82);
          padding:17px 18px;
          color:#fff;
          text-decoration:none;
        }
        .loan-calculator-page .calculator-after a:hover{border-color:#f6a700;transform:translateY(-1px)}
        .loan-calculator-page .calculator-after strong{color:#f6a700;font-size:14px}
        .loan-calculator-page .calculator-after span{margin-top:5px;color:#bacbd4;font-size:11px;line-height:1.5}
        @media(max-width:760px){
          .loan-calculator-page .calculator-breadcrumb{width:min(100% - 24px,1180px)}
          .loan-calculator-page .calculator-after{width:min(100% - 24px,1180px);grid-template-columns:1fr}
        }
      `}</style>

      <div className="calculator-header-wrap">
        <FormsSiteHeader />
      </div>

      <nav className="calculator-breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a><span>›</span><a href="/financing">Financing</a><span>›</span><strong>Loan Payment Calculator</strong>
      </nav>

      <section className="fllm-loan-calculator-section" id="loan-calculator" aria-labelledby="fllm-loan-calculator-title">
        <div className="fllm-loan-calculator">
          <header className="fllm-loan-calculator__header">
            <span className="fllm-loan-calculator__eyebrow">Liquor License Financing Tool</span>
            <h1 id="fllm-loan-calculator-title">Florida Liquor License Loan &amp; Refinance Calculator</h1>
            <p>
              Estimate a fixed-rate monthly payment for a Florida 4COP, 3PS or other quota-license purchase or refinance, compare nearby interest-rate scenarios, and review the amortization schedule below.
            </p>
          </header>

          <form className="fllm-loan-calculator__form-wrap" id="fllm-loan-calculator-form" noValidate>
            <div className="fllm-loan-calculator__grid">
              <div className="fllm-loan-calculator__form">
                <span className="fllm-loan-calculator__caption">Loan Scenario</span>
                <div className="fllm-loan-calculator__segmented" aria-label="Transaction type">
                  <button type="button" data-transaction="purchase" aria-pressed="true">Purchase</button>
                  <button type="button" data-transaction="refinance" aria-pressed="false">Refinance</button>
                </div>

                <div className="fllm-loan-calculator__fields" id="fllm-purchase-fields">
                  <label className="fllm-loan-calculator__field">
                    <span>Liquor license purchase price</span>
                    <input id="fllm-purchase-price" type="number" min="0" step="5000" inputMode="decimal" defaultValue="400000" />
                  </label>
                  <label className="fllm-loan-calculator__field">
                    <span>Down payment</span>
                    <input id="fllm-down-payment" type="number" min="0" step="5000" inputMode="decimal" defaultValue="80000" />
                  </label>
                </div>

                <div className="fllm-loan-calculator__fields" id="fllm-refinance-fields" hidden>
                  <label className="fllm-loan-calculator__field">
                    <span>New refinance loan amount</span>
                    <input id="fllm-refinance-amount" type="number" min="0" step="5000" inputMode="decimal" defaultValue="300000" />
                    <small className="fllm-loan-calculator__helper">
                      Enter the new principal balance being modeled, including cash-out only if it will actually be financed.
                    </small>
                  </label>
                </div>

                <div className="fllm-loan-calculator__fields">
                  <label className="fllm-loan-calculator__field">
                    <span>Interest rate (APR)</span>
                    <input id="fllm-interest-rate" type="number" min="0" max="50" step="0.01" inputMode="decimal" defaultValue="10.00" />
                  </label>
                  <label className="fllm-loan-calculator__field">
                    <span>Loan term</span>
                    <select id="fllm-loan-term" defaultValue="10">
                      <option value="3">3 years</option>
                      <option value="5">5 years</option>
                      <option value="7">7 years</option>
                      <option value="10">10 years</option>
                      <option value="15">15 years</option>
                      <option value="20">20 years</option>
                    </select>
                  </label>
                  <label className="fllm-loan-calculator__field">
                    <span>First payment date</span>
                    <input id="fllm-first-payment-date" type="date" />
                  </label>
                  <div className="fllm-loan-calculator__readonly">
                    <span>Amount financed</span>
                    <output id="fllm-principal-output">$320,000</output>
                  </div>
                </div>

                <button className="fllm-loan-calculator__calculate" type="submit">Calculate / Update Payment</button>
                <p className="fllm-loan-calculator__error" id="fllm-loan-calculator-error" role="alert" />
              </div>

              <aside className="fllm-loan-calculator__result" aria-label="Estimated loan payment results">
                <div className="fllm-loan-calculator__payment">
                  <span className="fllm-loan-calculator__payment-label">Estimated Monthly Payment</span>
                  <output id="fllm-monthly-payment" aria-live="polite">$0.00</output>
                  <small>Estimated principal + interest</small>
                </div>
                <div className="fllm-loan-calculator__summary">
                  <div><span>Annual Debt Service</span><strong id="fllm-annual-debt-service">$0.00</strong></div>
                  <div><span>Total Interest</span><strong id="fllm-total-interest">$0.00</strong></div>
                  <div><span>Total Payments</span><strong id="fllm-total-payments">$0.00</strong></div>
                  <div><span>Repayment Term</span><strong id="fllm-term-summary">—</strong></div>
                </div>
                <div className="fllm-loan-calculator__rate-compare">
                  <h2>Interest-rate comparison</h2>
                  <p>
                    See how the same loan amount and term change at one percentage point below and above the entered rate. These are calculator scenarios, not lender quotes.
                  </p>
                  <div className="fllm-loan-calculator__table-wrap">
                    <table>
                      <thead><tr><th>APR</th><th>Scenario</th><th>Monthly Payment</th><th>Annual Debt Service</th></tr></thead>
                      <tbody id="fllm-rate-comparison-body" />
                    </table>
                  </div>
                </div>
              </aside>
            </div>

            <section className="fllm-loan-calculator__schedule" aria-labelledby="fllm-loan-schedule-title">
              <div className="fllm-loan-calculator__section-heading">
                <div>
                  <span className="fllm-loan-calculator__caption">Debt Amortization</span>
                  <h2 id="fllm-loan-schedule-title">Loan amortization schedule</h2>
                </div>
                <div className="fllm-loan-calculator__schedule-tabs" aria-label="Loan schedule display">
                  <button type="button" data-schedule-mode="annual" aria-pressed="true">Annual</button>
                  <button type="button" data-schedule-mode="monthly" aria-pressed="false">Monthly</button>
                </div>
              </div>
              <div className="fllm-loan-calculator__table-wrap">
                <table>
                  <thead id="fllm-loan-schedule-head"><tr><th>Year</th><th>Payments</th><th>Beginning Balance</th><th>Principal</th><th>Interest</th><th>Total Paid</th><th>Ending Balance</th></tr></thead>
                  <tbody id="fllm-loan-schedule-body"><tr><td colSpan={7}>Enter a scenario above to calculate the schedule.</td></tr></tbody>
                </table>
              </div>
            </section>

            <section className="fllm-loan-calculator__tax" aria-labelledby="fllm-tax-amortization-title">
              <div className="fllm-loan-calculator__section-heading">
                <div>
                  <span className="fllm-loan-calculator__caption">Separate Tax-Basis Schedule</span>
                  <h2 id="fllm-tax-amortization-title">Estimated IRS Section 197 liquor-license amortization</h2>
                </div>
              </div>
              <p className="fllm-loan-calculator__tax-copy" id="fllm-tax-copy">
                For a qualifying acquired government-granted license or permit, IRS Section 197 generally provides ratable amortization over <strong>15 years (180 months)</strong>, beginning with the later of the acquisition month or the month the trade or business or income-producing activity begins. Enter the tax basis actually allocated to the liquor license.
              </p>
              <div className="fllm-loan-calculator__tax-inputs">
                <label className="fllm-loan-calculator__field">
                  <span>Tax basis allocated to liquor license</span>
                  <input id="fllm-tax-basis" type="number" min="0" step="1000" inputMode="decimal" defaultValue="400000" />
                  <small className="fllm-loan-calculator__helper">
                    Tax basis is intentionally separate from the loan amount. Confirm the actual allocated basis with your tax adviser.
                  </small>
                </label>
                <label className="fllm-loan-calculator__field">
                  <span id="fllm-tax-start-label">Section 197 amortization start month</span>
                  <input id="fllm-tax-start-month" type="month" />
                  <small className="fllm-loan-calculator__helper">
                    Use the applicable Section 197 start month, not automatically the loan closing or first-payment month.
                  </small>
                </label>
              </div>
              <div className="fllm-loan-calculator__tax-summary">
                <div><span>Entered Tax Basis</span><strong id="fllm-tax-basis-output">$0</strong></div>
                <div><span>Monthly Amortization</span><strong id="fllm-tax-monthly-output">$0.00</strong></div>
                <div><span>Annualized 12-Month Amount</span><strong id="fllm-tax-annual-output">$0.00</strong></div>
                <div><span>Remaining Section 197 Period</span><strong id="fllm-tax-remaining-output">—</strong></div>
              </div>
              <div className="fllm-loan-calculator__table-wrap">
                <table>
                  <thead><tr><th>Tax Year</th><th>Months</th><th>Beginning Basis</th><th>Estimated Amortization</th><th>Ending Basis</th></tr></thead>
                  <tbody id="fllm-tax-schedule-body"><tr><td colSpan={5}>Enter the applicable tax basis and start month to calculate the schedule.</td></tr></tbody>
                </table>
              </div>
              <p className="fllm-loan-calculator__tax-note">
                <strong>Purchase versus refinance:</strong> loan amortization and federal tax amortization are different calculations. A refinance by itself generally does not create a new tax basis or restart a new 180-month Section 197 period. Review the <a href="https://www.irs.gov/instructions/i4562" target="_blank" rel="noopener noreferrer">IRS Instructions for Form 4562</a> and confirm your facts with a qualified tax adviser.
              </p>
            </section>

            <div className="fllm-loan-calculator__actions">
              <a href="/financing#request-financing">Request Liquor License Financing</a>
              <a href="/florida-liquor-license-appraisal#order-form">Order a License Appraisal</a>
              <a href="/listings">View Licenses for Sale</a>
            </div>
            <p className="fllm-loan-calculator__fine-print">
              Calculator estimates assume a fully amortizing, fixed-rate loan with monthly principal-and-interest payments and no balloon payment. Results exclude lender fees, legal fees, appraisal costs, SBA guaranty fees, closing costs, taxes, insurance and other transaction charges. Financing is subject to lender underwriting and final documentation. Section 197 results are informational estimates only and are not tax, legal or accounting advice. Florida Statutes § 561.65 contains separate requirements for perfection and enforcement of qualifying liens or security interests in spirituous alcoholic-beverage licenses.
            </p>
          </form>
        </div>
      </section>

      <section className="calculator-after" aria-label="Related financing actions">
        <a href="/financing#request-financing"><strong>Request Financing</strong><span>Submit the county, license type, transaction value and financing amount for lender review.</span></a>
        <a href="/florida-liquor-license-appraisal#order-form"><strong>Order a License Appraisal</strong><span>Document county-specific collateral value for purchase, refinance or lender review.</span></a>
        <a href="/how-to-finance-florida-liquor-license"><strong>Read the Financing Guide</strong><span>See how private lenders evaluate Florida quota-license collateral and transaction structure.</span></a>
      </section>

      <Script src="/assets/financing-loan-calculator.js?v=2" strategy="afterInteractive" />
    </main>
  );
}
