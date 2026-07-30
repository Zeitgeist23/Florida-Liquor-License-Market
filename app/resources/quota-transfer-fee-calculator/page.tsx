import type { Metadata } from "next";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import QuotaTransferFeeCalculator from "@/components/QuotaTransferFeeCalculator";
import "../forms/abt-forms.css";
import "./transfer-fee-calculator.css";

export const metadata: Metadata = {
  title: "Florida Quota License Transfer Fee Calculator | Florida Liquor License Market",
  description:
    "Estimate the Florida quota liquor license transfer fee using the three-year gross alcoholic-beverage sales calculation from DBPR ABT-6002.",
};

export default function QuotaTransferFeeCalculatorPage() {
  return (
    <main className="abt-forms-page transfer-calculator-page">
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="abt-form-title-band transfer-title-band">
        <div className="page-shell">
          <nav className="abt-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span>›</span><a href="/resources/forms">Resources</a><span>›</span><b>Quota License Transfer Fee Calculator</b>
          </nav>
          <div className="abt-title-grid">
            <div>
              <span className="abt-eyebrow">Florida quota-license tool</span>
              <h1>Quota License Transfer Fee Calculator</h1>
              <h2>Estimate the sales-based fee required by Section 12 of ABT-6002.</h2>
              <p>Enter monthly gross alcoholic-beverage sales for the three years immediately preceding the proposed transfer.</p>
            </div>
            <aside>
              <span>Calculation</span>
              <strong>3-year average × 0.004</strong>
              <small>Subject to the statutory $5,000 maximum and DBPR/ABT’s final determination.</small>
            </aside>
          </div>
        </div>
      </section>

      <section className="transfer-page-content page-shell">
        <QuotaTransferFeeCalculator />
      </section>

      <footer className="abt-forms-footer">
        <div className="page-shell">
          <img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" />
          <span>Florida’s marketplace for buying, selling and financing liquor licenses.</span>
          <a href="/">Return to Florida Liquor License Market</a>
        </div>
      </footer>
    </main>
  );
}
