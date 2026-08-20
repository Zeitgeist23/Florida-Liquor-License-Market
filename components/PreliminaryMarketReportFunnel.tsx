"use client";

import { useState } from "react";

import styles from "./PreliminaryMarketReportFunnel.module.css";

type EstimateSnapshot = {
  count: number;
  low: number | null;
  median: number | null;
  high: number | null;
  typicalLow: number | null;
  typicalHigh: number | null;
  confidence: string;
  generatedAt: string;
};

type Props = {
  county: string;
  licenseType: string;
  licenseNumber: string;
  currentHolderOfRecord: string;
  licenseStatus: string;
  preferredTiming: string;
  estimate: EstimateSnapshot;
};

export default function PreliminaryMarketReportFunnel(props: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/preliminary-market-report-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") || ""),
          email: String(formData.get("email") || ""),
          phone: String(formData.get("phone") || ""),
          relationship: String(formData.get("relationship") || ""),
          purpose: String(formData.get("purpose") || ""),
          notes: String(formData.get("notes") || ""),
          license_number: String(formData.get("license_number") || ""),
          current_holder_of_record: String(formData.get("current_holder_of_record") || ""),
          terms_accepted: formData.get("terms_accepted") === "Accepted",
          honey: String(formData.get("honey") || ""),
          county: props.county,
          license_type: props.licenseType,
          license_status: props.licenseStatus,
          preferred_timing: props.preferredTiming,
          estimate: props.estimate,
        }),
      });

      const result = (await response.json()) as { checkoutUrl?: string | null; error?: string };
      if (!response.ok || !result.checkoutUrl) {
        throw new Error(result.error || "Unable to open secure checkout.");
      }
      window.location.assign(result.checkoutUrl);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to open secure checkout.");
      setLoading(false);
    }
  }

  return (
    <section className={styles.report} aria-labelledby="preliminary-market-report-title">
      <div className={styles.topline}>
        <span>Deeper license-specific research</span>
        <strong>$195</strong>
      </div>

      <div className={styles.intro}>
        <div>
          <h4 id="preliminary-market-report-title">Order a Preliminary Market Report</h4>
          <p>
            Move beyond the automated asking-price snapshot. FLLM will manually research your specific Florida quota license and prepare a professional PDF market report.
          </p>
        </div>
        {!open ? (
          <button type="button" onClick={() => setOpen(true)}>Order My Report — $195</button>
        ) : null}
      </div>

      <div className={styles.includes}>
        <span>Subject license &amp; DBPR identity review</span>
        <span>Current county asking-price comparables</span>
        <span>Available transfer &amp; transaction evidence</span>
        <span>Market conditions &amp; indicated value range</span>
        <span>Sources, methodology &amp; limitations</span>
      </div>

      <p className={styles.boundary}>
        This is a preliminary market analysis prepared by Florida Liquor License Market. It is not a certified appraisal, real-estate appraisal, fairness opinion, or guarantee of value. If a lender, court, estate, or other institution requires an independent formal appraisal, FLLM can help coordinate one with a credentialed valuation professional.
      </p>

      {open ? (
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.formHeading}>
            <span>Secure report order</span>
            <h5>{props.county} · {props.licenseType}</h5>
            <p>Complete the license identity and contact information below. You will be redirected to secure Stripe checkout for the one-time $195 report fee.</p>
          </div>

          <label>
            <span>License Number</span>
            <input
              name="license_number"
              defaultValue={props.licenseNumber}
              placeholder="e.g. BEV58-12345"
              maxLength={80}
              required
            />
          </label>
          <label>
            <span>Current Holder of Record <small>If known</small></span>
            <input
              name="current_holder_of_record"
              defaultValue={props.currentHolderOfRecord}
              placeholder="Name shown in DBPR records"
              maxLength={180}
            />
          </label>
          <label>
            <span>Full Name</span>
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>Phone</span>
            <input name="phone" type="tel" autoComplete="tel" required />
          </label>
          <label>
            <span>Your Relationship to the License</span>
            <select name="relationship" required defaultValue="">
              <option value="" disabled>Select relationship</option>
              <option>License Owner</option>
              <option>Buyer / Prospective Buyer</option>
              <option>Commercial Lender</option>
              <option>Attorney / CPA / Advisor</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            <span>Purpose of the Report</span>
            <select name="purpose" required defaultValue="">
              <option value="" disabled>Select purpose</option>
              <option>Considering a Sale</option>
              <option>Considering a Purchase</option>
              <option>Financing or Refinance</option>
              <option>Estate or Legal Matter</option>
              <option>Internal Planning</option>
              <option>Other</option>
            </select>
          </label>
          <label className={styles.notes}>
            <span>Anything We Should Know? <small>Optional</small></span>
            <textarea name="notes" rows={4} placeholder="For example: refinance request, pending sale, unusual transfer history, or a deadline." maxLength={4000} />
          </label>
          <label className={styles.honey} aria-hidden="true">
            <span>Company Website</span>
            <input name="honey" tabIndex={-1} autoComplete="off" />
          </label>
          <label className={styles.consent}>
            <input name="terms_accepted" type="checkbox" value="Accepted" required />
            <span>I understand that the $195 product is a preliminary market report and not a certified or independent formal appraisal. I authorize FLLM to contact me if additional license information is needed.</span>
          </label>

          <section className={styles.previewSection} aria-labelledby="example-report-preview-title">
            <div className={styles.previewHeading}>
              <span className={styles.previewIcon} aria-hidden="true">▤</span>
              <div>
                <h6 id="example-report-preview-title">Example Report Preview</h6>
                <p>Below is a preview of what your Florida Liquor License Market Value Report includes.</p>
              </div>
            </div>

            <div className={styles.previewCanvas}>
              <article className={styles.reportBook} aria-label="Example Florida Liquor License Market Value Report cover">
                <div className={styles.bookSpine} aria-hidden="true" />
                <div className={styles.bookGloss} aria-hidden="true" />
                <img className={styles.bookLogo} src="/assets/brand-sharp.svg" alt="FLLM — Florida Liquor License Market" />
                <div className={styles.bookTitle}>Florida Liquor License<br />Market Value Report</div>
                <div className={styles.bookRule} />
                <dl className={styles.bookDetails}>
                  <div><dt>License Number</dt><dd>BEV7421986</dd></div>
                  <div><dt>County / Quota</dt><dd>Orange County · 4COP</dd></div>
                  <div><dt>Prepared On</dt><dd>May 15, 2024</dd></div>
                </dl>
                <div className={styles.bookPalm} aria-hidden="true">❯</div>
                <div className={styles.bookWaves} aria-hidden="true"><i /><i /></div>
              </article>

              <article className={styles.reportSheet} aria-label="Example valuation summary page">
                <header className={styles.sheetHeader}>
                  <strong>Valuation Summary</strong>
                  <span>Page 4 of 12</span>
                </header>

                <div className={styles.summaryGrid}>
                  <div className={styles.valueCard}>
                    <small>Estimated Market Value</small>
                    <strong>$320,000</strong>
                    <span>Market Confidence</span>
                    <b>High</b>
                  </div>
                  <dl className={styles.subjectFacts}>
                    <div><dt>License Type</dt><dd>4COP Quota</dd></div>
                    <div><dt>County</dt><dd>Orange</dd></div>
                    <div><dt>Date Prepared</dt><dd>05/15/2024</dd></div>
                    <div><dt>License Number</dt><dd>BEV7421986</dd></div>
                  </dl>
                </div>

                <section className={styles.chartBlock}>
                  <h6>Comparable Sales (Last 12 Months)</h6>
                  <div className={styles.barChart} aria-hidden="true">
                    <span className={styles.barOne} /><span className={styles.barTwo} /><span className={styles.barThree} /><span className={styles.barFour} />
                  </div>
                  <div className={styles.chartLegend}><span>High</span><span>Average</span><span>Low</span><span>Subject Estimate</span></div>
                </section>

                <section className={styles.chartBlock}>
                  <h6>Market Value Trend</h6>
                  <svg className={styles.trendChart} viewBox="0 0 320 72" role="img" aria-label="Example upward market value trend">
                    <line x1="10" y1="61" x2="310" y2="61" />
                    <line x1="10" y1="10" x2="10" y2="61" />
                    <polyline points="12,49 48,44 84,40 120,38 156,28 192,31 228,24 264,22 306,18" />
                    <circle cx="12" cy="49" r="3" /><circle cx="48" cy="44" r="3" /><circle cx="84" cy="40" r="3" /><circle cx="120" cy="38" r="3" /><circle cx="156" cy="28" r="3" /><circle cx="192" cy="31" r="3" /><circle cx="228" cy="24" r="3" /><circle cx="264" cy="22" r="3" /><circle cx="306" cy="18" r="3" />
                  </svg>
                  <div className={styles.trendLabels}><span>May '23</span><span>Sep '23</span><span>Jan '24</span><span>May '24</span></div>
                </section>

                <div className={styles.sheetBottom}>
                  <section>
                    <h6>County / Market Insights</h6>
                    <ul>
                      <li>Consistent demand for 4COP quotas</li>
                      <li>Limited new quota availability</li>
                      <li>Strong tourism and population growth</li>
                    </ul>
                  </section>
                  <section>
                    <h6>Market Indicators</h6>
                    <div className={styles.indicator}><span>Demand</span><i><b style={{ width: "86%" }} /></i><em>High</em></div>
                    <div className={styles.indicator}><span>Inventory</span><i><b style={{ width: "32%" }} /></i><em>Low</em></div>
                    <div className={styles.indicator}><span>Competition</span><i><b style={{ width: "61%" }} /></i><em>Moderate</em></div>
                    <div className={styles.indicator}><span>Liquidity</span><i><b style={{ width: "58%" }} /></i><em>Moderate</em></div>
                  </section>
                </div>

                <footer className={styles.sheetFooter}>
                  <span>This example is a preliminary market analysis and is not a certified appraisal.</span>
                  <img src="/assets/brand-sharp.svg" alt="FLLM" />
                </footer>
              </article>
            </div>
          </section>

          {error ? <p className={styles.error} role="alert">{error}</p> : null}

          <div className={styles.checkoutRow}>
            <div><span>One-time report fee</span><strong>$195</strong></div>
            <button type="submit" disabled={loading}>{loading ? "Opening Secure Checkout…" : "Continue to Secure Checkout — $195"}</button>
          </div>
        </form>
      ) : null}
    </section>
  );
}
