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

function formatUsPhone(value: string) {
  const raw = value.replace(/\D/g, "");
  const digits = (raw.length === 11 && raw.startsWith("1") ? raw.slice(1) : raw).slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const reportPreviewSrc = "/assets/fllm-example-market-report-preview.webp?v=20260820-1915";

export default function PreliminaryMarketReportFunnel(props: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewFailed, setPreviewFailed] = useState(false);

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
      const message = cause instanceof Error ? cause.message : "Unable to open secure checkout.";
      setError(
        /fetch failed|failed to fetch|networkerror/i.test(message)
          ? "Secure checkout could not be reached. Please try again in a moment."
          : message,
      );
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
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={14}
              onInput={(event) => {
                event.currentTarget.value = formatUsPhone(event.currentTarget.value);
              }}
              required
            />
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
          <label className={styles.consent}>
            <input name="terms_accepted" type="checkbox" value="Accepted" required />
            <span>I understand that the $195 product is a preliminary market report and not a certified or independent formal appraisal. I authorize FLLM to contact me if additional license information is needed.</span>
          </label>

          <div
            style={{
              gridColumn: "1 / -1",
              marginTop: 10,
            }}
          >
            <span
              style={{
                display: "block",
                color: "#f6a700",
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: ".1em",
                textTransform: "uppercase",
              }}
            >
              Example report preview
            </span>
            <strong
              style={{
                display: "block",
                marginTop: 5,
                color: "#fff",
                fontSize: 18,
              }}
            >
              See the report format before checkout
            </strong>
            <p
              style={{
                margin: "6px 0 10px",
                color: "#aebfc8",
                fontSize: 12,
                lineHeight: 1.5,
              }}
            >
              This sample is illustrative. Your completed report will use research specific to the subject license and county.
            </p>

            {!previewFailed ? (
              <img
                src={reportPreviewSrc}
                alt="Glossy Florida Liquor License Market Value Report cover beside a sample valuation page with comparable sales, market trend, county insights and market indicators."
                loading="eager"
                decoding="async"
                onError={() => setPreviewFailed(true)}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  borderRadius: 10,
                  boxShadow: "0 16px 36px rgba(0,0,0,.30)",
                }}
              />
            ) : (
              <p
                style={{
                  margin: 0,
                  padding: "12px 14px",
                  border: "1px solid #38596d",
                  borderRadius: 7,
                  color: "#c7d5dc",
                  background: "#071a28",
                  fontSize: 12,
                }}
              >
                The sample preview could not be loaded. The report order form and secure checkout remain available below.
              </p>
            )}
          </div>

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
