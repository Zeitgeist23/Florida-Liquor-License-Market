"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

export default function PreliminaryMarketReportFunnel(props: Props) {
  const orderFormRef = useRef<HTMLFormElement | null>(null);
  const productGridRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollToOrderForm = useCallback(() => {
    const url = new URL(window.location.href);
    url.hash = "market-report-order-form";
    window.history.replaceState(null, "", url);

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    orderFormRef.current?.scrollIntoView({ behavior, block: "start" });
  }, []);

  useEffect(() => {
    if (!open) return;

    const timeout = window.setTimeout(scrollToOrderForm, 80);

    return () => window.clearTimeout(timeout);
  }, [open, scrollToOrderForm]);

  useEffect(() => {
    const cards = Array.from(productGridRef.current?.querySelectorAll("article") ?? []);
    if (!cards.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => card.classList.add(styles.inView));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.inView);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

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

      let result: { checkoutUrl?: string | null; error?: string } = {};
      try {
        result = (await response.json()) as { checkoutUrl?: string | null; error?: string };
      } catch {
        throw new Error(`Secure checkout returned an invalid response (${response.status}).`);
      }

      if (!response.ok || !result.checkoutUrl) {
        throw new Error(result.error || "Unable to open secure checkout.");
      }

      window.location.href = result.checkoutUrl;
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
    <section id="market-report-offer" className={styles.report} aria-labelledby="market-value-report-title">
      <div className={styles.sectionHeading}>
        <span className={styles.eyebrow}>Choose the report that fits your purpose</span>
        <h4 id="market-value-report-title">Two separate Florida liquor license valuation reports</h4>
        <p>
          Start with practical market guidance or order the broader, lender-oriented appraisal. Each report has a separate scope, presentation and order process.
        </p>
      </div>

      <div id="report-options-cards" ref={productGridRef} className={styles.productGrid}>
        <article className={`${styles.productCard} ${styles.preliminaryCard}`}>
          <figure className={styles.productPreview}>
            <img
              className={styles.productImage}
              src="/assets/fllm-market-value-report-preview-v2.webp"
              alt="FLLM Preliminary Florida Liquor License Market Value Report cover beside a sample market analysis page."
              loading="eager"
              decoding="async"
            />
            <figcaption>Preliminary report preview</figcaption>
          </figure>

          <div className={styles.productBody}>
            <span className={styles.productType}>Market guidance</span>
            <div className={styles.productTitleRow}>
              <h5>Preliminary Market Report</h5>
              <strong>$195</strong>
            </div>
            <p>
              License identity research, available DBPR information, exact-county asking-price evidence, market trends and an indicated preliminary range.
            </p>
            <ul>
              <li>For owners, buyers and early-stage decisions</li>
              <li>Current market evidence and DBPR research</li>
              <li>Not intended as a lender appraisal</li>
            </ul>
            <button
              id="report-order-actions"
              className={styles.primaryProductAction}
              type="button"
              onClick={() => {
                if (open) scrollToOrderForm();
                else setOpen(true);
              }}
            >
              {open ? "Complete Preliminary Order Below" : "Order Preliminary Report — $195"}
            </button>
            <small>Secure one-time checkout after completing the report-order details.</small>
          </div>
        </article>

        <article className={`${styles.productCard} ${styles.formalCard}`}>
          <figure className={styles.productPreview}>
            <img
              className={styles.productImage}
              src="/assets/fllm-formal-appraisal-preview-v1.webp"
              alt="Closed confidential FLLM Formal Florida Quota Liquor License Appraisal in a premium navy presentation."
              loading="eager"
              decoding="async"
            />
            <figcaption>Confidential interior and methodology withheld</figcaption>
          </figure>

          <div className={styles.productBody}>
            <span className={styles.productType}>Lender-oriented valuation</span>
            <div className={styles.productTitleRow}>
              <h5>Formal Quota License Appraisal</h5>
              <strong>$995</strong>
            </div>
            <p>
              A separate subject-license assignment with same-county 3PS and 4COP evidence, available verified transactions, regulatory analysis, exhibits and a signed value reconciliation.
            </p>
            <ul>
              <li>Defined intended use and effective date</li>
              <li>Designed for lender and professional review</li>
              <li>Interior methods and documents remain private</li>
            </ul>
            <a className={styles.formalProductAction} href="/florida-liquor-license-appraisal#order-form">
              Order Formal Appraisal — $995
            </a>
            <small>Acceptance and credential requirements are determined by the receiving institution.</small>
          </div>
        </article>
      </div>

      <div className={styles.scopeNotice}>
        <p><strong>Preliminary report:</strong> market research and pricing guidance; not a certified appraisal, real-estate appraisal, fairness opinion or guarantee of value.</p>
        <p><strong>Formal appraisal:</strong> a separate, expanded FLLM valuation assignment designed for professional review; lender acceptance remains subject to the receiving institution&apos;s requirements.</p>
      </div>

      {open ? (
        <form
          ref={orderFormRef}
          id="market-report-order-form"
          className={styles.form}
          onSubmit={submit}
          style={{ scrollMarginTop: "110px" }}
        >
          <div className={styles.formHeading}>
            <span>Secure report order</span>
            <h5>{props.county} · {props.licenseType}</h5>
            <p>
              Complete the license identity and contact information below. You will be redirected to secure Stripe checkout for the one-time $195 report fee.
            </p>
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
            <textarea
              name="notes"
              rows={4}
              placeholder="For example: refinance request, pending sale, unusual transfer history, or a deadline."
              maxLength={4000}
            />
          </label>
          <label className={styles.consent}>
            <input name="terms_accepted" type="checkbox" value="Accepted" required />
            <span>
              I understand that the $195 product is a preliminary market report and not a certified or independent formal appraisal. I authorize FLLM to contact me if additional license information is needed.
            </span>
          </label>

          {error ? <p className={styles.error} role="alert">{error}</p> : null}

          <div className={styles.checkoutRow}>
            <div>
              <span>One-time report fee</span>
              <strong>$195</strong>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Opening Secure Checkout…" : "Continue to Secure Checkout — $195"}
            </button>
          </div>
        </form>
      ) : null}
    </section>
  );
}
