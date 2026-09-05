export const dynamic = "force-dynamic";

const FINANCING_PAGE_STYLES = `<style id="financing-logo-match-investment-v1">
  .financing-page > .seller-header {
    align-items: center !important;
  }
  .financing-page > .seller-header > .seller-brand {
    align-self: stretch !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    transform: translateY(11px) !important;
  }
  .financing-page > .seller-header > .seller-brand img {
    display: block !important;
    width: 71.25% !important;
    height: auto !important;
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .fllm-financing-appraisal-card {
    display:grid;
    grid-template-columns:150px 1fr;
    gap:18px;
    align-items:center;
    margin:22px 0 18px;
    padding:18px;
    border:1px solid rgba(241,166,0,.58);
    border-radius:10px;
    background:linear-gradient(145deg,#0a2237,#04111c);
    box-shadow:0 12px 28px rgba(0,0,0,.2);
  }
  .fllm-financing-appraisal-card img {
    display:block;
    width:100%;
    border:1px solid rgba(241,166,0,.45);
    border-radius:7px;
    box-shadow:0 8px 18px rgba(0,0,0,.28);
  }
  .fllm-financing-appraisal-card span {
    display:block;
    margin-bottom:5px;
    color:#f6a700;
    font-size:10px;
    font-weight:900;
    letter-spacing:.08em;
    text-transform:uppercase;
  }
  .fllm-financing-appraisal-card h2 {
    margin:0 0 8px;
    color:#fff;
    font-size:24px;
    line-height:1.15;
  }
  .fllm-financing-appraisal-card p {
    margin:0 0 13px;
    color:#d5e0e8;
    font-size:13px;
    line-height:1.6;
  }
  .fllm-financing-appraisal-card a {
    display:inline-flex;
    align-items:center;
    min-height:42px;
    padding:0 15px;
    border:1px solid #f6a700;
    border-radius:5px;
    color:#07111a;
    background:linear-gradient(145deg,#ffbd21,#ef9000);
    font-size:11px;
    font-weight:900;
    text-decoration:none;
    text-transform:uppercase;
  }
  @media(max-width:760px){
    .fllm-financing-appraisal-card{grid-template-columns:92px 1fr;gap:12px;padding:14px}
    .fllm-financing-appraisal-card h2{font-size:20px}
  }
</style>`;

const APPRAISAL_CARD = `<section class="fllm-financing-appraisal-card" aria-label="FLLM formal liquor license appraisal">
  <img src="/assets/fllm-formal-appraisal-preview-v1.webp" alt="Sample FLLM formal Florida quota liquor license appraisal report" />
  <div>
    <span>Professional License Valuation</span>
    <h2>Need a lender-ready value?</h2>
    <p>Order a formal FLLM liquor license appraisal supported by county market evidence, comparable listings and regulatory research. The one-time appraisal fee is $495.</p>
    <a href="/florida-liquor-license-appraisal#order-form">Order Appraisal — $495</a>
  </div>
</section>`;

const LOAN_CALCULATOR = `<section class="fllm-loan-calculator-section" id="loan-calculator" aria-labelledby="fllm-loan-calculator-title">
  <div class="fllm-loan-calculator">
    <header class="fllm-loan-calculator__header">
      <span class="fllm-loan-calculator__eyebrow">Liquor License Financing Tool</span>
      <h2 id="fllm-loan-calculator-title">Florida Liquor License Loan &amp; Refinance Calculator</h2>
      <p>Estimate a fixed-rate monthly payment for a Florida 4COP, 3PS or other quota-license purchase or refinance, compare nearby interest-rate scenarios, and review the loan amortization schedule below.</p>
    </header>

    <form class="fllm-loan-calculator__form-wrap" id="fllm-loan-calculator-form" novalidate>
      <div class="fllm-loan-calculator__grid">
        <div class="fllm-loan-calculator__form">
          <span class="fllm-loan-calculator__caption">Loan Scenario</span>
          <div class="fllm-loan-calculator__segmented" aria-label="Transaction type">
            <button type="button" data-transaction="purchase" aria-pressed="true">Purchase</button>
            <button type="button" data-transaction="refinance" aria-pressed="false">Refinance</button>
          </div>

          <div class="fllm-loan-calculator__fields" id="fllm-purchase-fields">
            <label class="fllm-loan-calculator__field">
              <span>Liquor license purchase price</span>
              <input id="fllm-purchase-price" type="number" min="0" step="5000" inputmode="decimal" value="400000" />
            </label>
            <label class="fllm-loan-calculator__field">
              <span>Down payment</span>
              <input id="fllm-down-payment" type="number" min="0" step="5000" inputmode="decimal" value="80000" />
            </label>
          </div>

          <div class="fllm-loan-calculator__fields" id="fllm-refinance-fields" hidden>
            <label class="fllm-loan-calculator__field">
              <span>New refinance loan amount</span>
              <input id="fllm-refinance-amount" type="number" min="0" step="5000" inputmode="decimal" value="300000" />
              <small class="fllm-loan-calculator__helper">Enter the new principal balance being modeled, including cash-out only if it will actually be financed.</small>
            </label>
          </div>

          <div class="fllm-loan-calculator__fields">
            <label class="fllm-loan-calculator__field">
              <span>Interest rate (APR)</span>
              <input id="fllm-interest-rate" type="number" min="0" max="50" step="0.01" inputmode="decimal" value="10.00" />
            </label>
            <label class="fllm-loan-calculator__field">
              <span>Loan term</span>
              <select id="fllm-loan-term">
                <option value="3">3 years</option>
                <option value="5">5 years</option>
                <option value="7">7 years</option>
                <option value="10" selected>10 years</option>
                <option value="15">15 years</option>
                <option value="20">20 years</option>
              </select>
            </label>
            <label class="fllm-loan-calculator__field">
              <span>First payment date</span>
              <input id="fllm-first-payment-date" type="date" />
            </label>
            <div class="fllm-loan-calculator__readonly">
              <span>Amount financed</span>
              <output id="fllm-principal-output">$320,000</output>
            </div>
          </div>

          <button class="fllm-loan-calculator__calculate" type="submit">Calculate / Update Payment</button>
          <p class="fllm-loan-calculator__error" id="fllm-loan-calculator-error" role="alert"></p>
        </div>

        <aside class="fllm-loan-calculator__result" aria-label="Estimated loan payment results">
          <div class="fllm-loan-calculator__payment">
            <span class="fllm-loan-calculator__payment-label">Estimated Monthly Payment</span>
            <output id="fllm-monthly-payment" aria-live="polite">$0.00</output>
            <small>Estimated principal + interest</small>
          </div>
          <div class="fllm-loan-calculator__summary">
            <div><span>Annual Debt Service</span><strong id="fllm-annual-debt-service">$0.00</strong></div>
            <div><span>Total Interest</span><strong id="fllm-total-interest">$0.00</strong></div>
            <div><span>Total Payments</span><strong id="fllm-total-payments">$0.00</strong></div>
            <div><span>Repayment Term</span><strong id="fllm-term-summary">—</strong></div>
          </div>
          <div class="fllm-loan-calculator__rate-compare">
            <h3>Interest-rate comparison</h3>
            <p>See how the same loan amount and term change at one percentage point below and above the entered rate. These are calculator scenarios, not lender quotes.</p>
            <div class="fllm-loan-calculator__table-wrap">
              <table>
                <thead><tr><th>APR</th><th>Scenario</th><th>Monthly Payment</th><th>Annual Debt Service</th></tr></thead>
                <tbody id="fllm-rate-comparison-body"></tbody>
              </table>
            </div>
          </div>
        </aside>
      </div>

      <section class="fllm-loan-calculator__schedule" aria-labelledby="fllm-loan-schedule-title">
        <div class="fllm-loan-calculator__section-heading">
          <div>
            <span class="fllm-loan-calculator__caption">Debt Amortization</span>
            <h3 id="fllm-loan-schedule-title">Loan amortization schedule</h3>
          </div>
          <div class="fllm-loan-calculator__schedule-tabs" aria-label="Loan schedule display">
            <button type="button" data-schedule-mode="annual" aria-pressed="true">Annual</button>
            <button type="button" data-schedule-mode="monthly" aria-pressed="false">Monthly</button>
          </div>
        </div>
        <div class="fllm-loan-calculator__table-wrap">
          <table>
            <thead id="fllm-loan-schedule-head"><tr><th>Year</th><th>Payments</th><th>Beginning Balance</th><th>Principal</th><th>Interest</th><th>Total Paid</th><th>Ending Balance</th></tr></thead>
            <tbody id="fllm-loan-schedule-body"><tr><td colspan="7">Enter a scenario above to calculate the schedule.</td></tr></tbody>
          </table>
        </div>
      </section>

      <section class="fllm-loan-calculator__tax" aria-labelledby="fllm-tax-amortization-title">
        <div class="fllm-loan-calculator__section-heading">
          <div>
            <span class="fllm-loan-calculator__caption">Separate Tax-Basis Schedule</span>
            <h3 id="fllm-tax-amortization-title">Estimated IRS Section 197 liquor-license amortization</h3>
          </div>
        </div>
        <p class="fllm-loan-calculator__tax-copy" id="fllm-tax-copy">For a qualifying acquired government-granted license or permit, IRS Section 197 generally provides ratable amortization over <strong>15 years (180 months)</strong>, beginning with the later of the acquisition month or the month the trade or business or income-producing activity begins. Enter the tax basis actually allocated to the liquor license.</p>
        <div class="fllm-loan-calculator__tax-inputs">
          <label class="fllm-loan-calculator__field">
            <span>Tax basis allocated to liquor license</span>
            <input id="fllm-tax-basis" type="number" min="0" step="1000" inputmode="decimal" value="400000" />
            <small class="fllm-loan-calculator__helper">Tax basis is intentionally separate from the loan amount. Confirm the actual allocated basis with your tax adviser.</small>
          </label>
          <label class="fllm-loan-calculator__field">
            <span id="fllm-tax-start-label">Section 197 amortization start month</span>
            <input id="fllm-tax-start-month" type="month" />
            <small class="fllm-loan-calculator__helper">Use the applicable Section 197 start month, not automatically the loan closing or first-payment month.</small>
          </label>
        </div>
        <div class="fllm-loan-calculator__tax-summary">
          <div><span>Entered Tax Basis</span><strong id="fllm-tax-basis-output">$0</strong></div>
          <div><span>Monthly Amortization</span><strong id="fllm-tax-monthly-output">$0.00</strong></div>
          <div><span>Annualized 12-Month Amount</span><strong id="fllm-tax-annual-output">$0.00</strong></div>
          <div><span>Remaining Section 197 Period</span><strong id="fllm-tax-remaining-output">—</strong></div>
        </div>
        <div class="fllm-loan-calculator__table-wrap">
          <table>
            <thead><tr><th>Tax Year</th><th>Months</th><th>Beginning Basis</th><th>Estimated Amortization</th><th>Ending Basis</th></tr></thead>
            <tbody id="fllm-tax-schedule-body"><tr><td colspan="5">Enter the applicable tax basis and start month to calculate the schedule.</td></tr></tbody>
          </table>
        </div>
        <p class="fllm-loan-calculator__tax-note"><strong>Purchase versus refinance:</strong> loan amortization and federal tax amortization are different calculations. A refinance by itself generally does not create a new tax basis or restart a new 180-month Section 197 period. Review the <a href="https://www.irs.gov/instructions/i4562" target="_blank" rel="noopener noreferrer">IRS Instructions for Form 4562</a> and confirm your facts with a qualified tax adviser.</p>
      </section>

      <div class="fllm-loan-calculator__actions">
        <a href="#request-financing">Request Liquor License Financing</a>
        <a href="/florida-liquor-license-appraisal#order-form">Order a License Appraisal</a>
        <a href="/listings">View Licenses for Sale</a>
      </div>
      <p class="fllm-loan-calculator__fine-print">Calculator estimates assume a fully amortizing, fixed-rate loan with monthly principal-and-interest payments and no balloon payment. Results exclude lender fees, legal fees, appraisal costs, SBA guaranty fees, closing costs, taxes, insurance and other transaction charges. Financing is subject to lender underwriting and final documentation. Section 197 results are informational estimates only and are not tax, legal or accounting advice. Florida Statutes § 561.65 contains separate requirements for perfection and enforcement of qualifying liens or security interests in spirituous alcoholic-beverage licenses.</p>
    </form>
  </div>
</section>`;

function optimizeFinancingHtml(input: string): string {
  let html = input;

  html = html.replace(
    /<title>[^<]*<\/title>/,
    "<title>Florida Liquor License Financing &amp; Loan Calculator | FLLM</title>"
  );
  html = html.replace(
    /<meta name="description" content="[^"]*"\/>/,
    '<meta name="description" content="Estimate Florida liquor-license purchase and refinance payments, compare interest rates, view loan amortization, and model a separate IRS Section 197 tax-basis schedule."/>'
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\/>/,
    '<meta property="og:title" content="Florida Liquor License Financing &amp; Loan Calculator | FLLM"/>'
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\/>/,
    '<meta property="og:description" content="Estimate purchase and refinance payments for Florida quota liquor licenses and review loan and Section 197 amortization schedules."/>'
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\/>/,
    '<meta name="twitter:title" content="Florida Liquor License Financing &amp; Loan Calculator | FLLM"/>'
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\/>/,
    '<meta name="twitter:description" content="Estimate purchase and refinance payments for Florida quota liquor licenses and review loan and Section 197 amortization schedules."/>'
  );
  html = html.replace(
    "<h1>Florida Liquor License Financing for 4COP &amp; 3PS Licenses</h1>",
    "<h1>Private Financing for Florida Quota Licenses</h1>"
  );
  html = html.replace(
    "<p>Explore private financing for the purchase or refinance of a Florida 4COP or 3PS quota liquor license. Specialized private lenders may consider license value, county, down payment or equity, transaction structure, and borrower qualifications.</p>",
    "<p>For buyers acquiring a Florida quota liquor license and current owners considering a refinance, specialized private lenders may evaluate license value, county, down payment or equity, transaction structure, and borrower qualifications.</p>"
  );

  html = html.replace(
    '<div class="seller-intro financing-intro">',
    '<div class="seller-intro financing-intro" id="how-to-finance">'
  );
  html = html.replace(
    '<article><h2>Access to Private Lenders</h2>',
    '<article id="private-lenders"><h2>Access to Private Lenders</h2>'
  );
  if (!html.includes("fllm-financing-appraisal-card")) {
    html = html.replace('<div class="seller-trust">', `${APPRAISAL_CARD}<div class="seller-trust">`);
  }
  html = html.replace(
    '<form class="seller-form financing-form">',
    '<form class="seller-form financing-form" id="request-financing">'
  );
  if (!html.includes('id="loan-calculator"')) {
    html = html.replace("</section></main>", `</section>${LOAN_CALCULATOR}</main>`);
  }

  return html;
}

export async function GET(request: Request) {
  try {
    const sourceUrl = new URL("/financing/index.html", request.url);
    sourceUrl.searchParams.set("source", "1");

    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) {
      throw new Error(`Financing page source returned ${sourceResponse.status}`);
    }

    let html = optimizeFinancingHtml(await sourceResponse.text());
    if (!html.includes('id="financing-logo-match-investment-v1"')) {
      html = html.replace("</head>", `${FINANCING_PAGE_STYLES}</head>`);
    }
    if (!html.includes("/assets/financing-loan-calculator.css")) {
      html = html.replace("</head>", '<link rel="stylesheet" href="/assets/financing-loan-calculator.css" /></head>');
    }
    if (!html.includes("/assets/financing-loan-calculator.js")) {
      html = html.replace("</body>", '<script src="/assets/financing-loan-calculator.js" defer></script></body>');
    }

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Financing page enhancement failed", error);
    return Response.redirect(new URL("/financing/index.html", request.url), 307);
  }
}
