"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { floridaCounties } from "@/data/florida-counties";
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

type DbprLicenseRecord = {
  licenseNumber: string;
  ownerName: string;
  series: string;
  county: string;
  primaryStatus: string;
  secondaryStatus: string;
};

type DbprValidation = {
  status: "match" | "mismatch" | "not_found" | "unavailable" | "invalid";
  countyMatches?: boolean;
  licenseTypeMatches?: boolean;
  expectedLicenseType?: "4COP Quota" | "3PS Quota / Package Store" | null;
  record?: DbprLicenseRecord | null;
  error?: string;
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
  const warningDialogRef = useRef<HTMLDivElement | null>(null);
  const countyRef = useRef<HTMLSelectElement | null>(null);
  const licenseTypeRef = useRef<HTMLSelectElement | null>(null);
  const licenseNumberRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dbprWarning, setDbprWarning] = useState<DbprValidation | null>(null);
  const [orderCounty, setOrderCounty] = useState(props.county);
  const [orderLicenseType, setOrderLicenseType] = useState(props.licenseType);
  const [orderLicenseNumber, setOrderLicenseNumber] = useState(props.licenseNumber);
  const [orderHolder, setOrderHolder] = useState(props.currentHolderOfRecord);

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
    setOrderCounty(props.county);
    setOrderLicenseType(props.licenseType);
    setOrderLicenseNumber(props.licenseNumber);
    setOrderHolder(props.currentHolderOfRecord);
  }, [props.county, props.currentHolderOfRecord, props.licenseNumber, props.licenseType]);

  useEffect(() => {
    if (!dbprWarning) return;

    warningDialogRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDbprWarning(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dbprWarning]);

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
      let orderEstimate = props.estimate;
      if (orderCounty !== props.county || orderLicenseType !== props.licenseType) {
        const guidanceParams = new URLSearchParams({ county: orderCounty, licenseType: orderLicenseType });
        const guidanceResponse = await fetch(`/api/market-pricing-guidance?${guidanceParams.toString()}`, {
          headers: { Accept: "application/json" },
          cache: "no-store",
        });
        const updatedEstimate = (await guidanceResponse.json()) as EstimateSnapshot & { error?: string };
        if (!guidanceResponse.ok) {
          throw new Error(updatedEstimate.error || "Unable to update the market data for the corrected DBPR record.");
        }
        orderEstimate = updatedEstimate;
      }

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
          county: orderCounty,
          license_type: orderLicenseType,
          license_status: props.licenseStatus,
          preferred_timing: props.preferredTiming,
          estimate: orderEstimate,
        }),
      });

      let result: { checkoutUrl?: string | null; error?: string; validation?: DbprValidation } = {};
      try {
        result = (await response.json()) as { checkoutUrl?: string | null; error?: string; validation?: DbprValidation };
      } catch {
        throw new Error(`Secure checkout returned an invalid response (${response.status}).`);
      }

      if (!response.ok || !result.checkoutUrl) {
        if (result.validation) {
          setDbprWarning(result.validation);
          setLoading(false);
          return;
        }
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

  function useDbprRecord() {
    const record = dbprWarning?.record;
    const expectedLicenseType = dbprWarning?.expectedLicenseType;
    if (!record || !expectedLicenseType) return;

    const recordedCounty = `${record.county.replace(/\s+County$/i, "")} County`;
    setOrderCounty(recordedCounty);
    setOrderLicenseType(expectedLicenseType);
    setOrderLicenseNumber(record.licenseNumber);
    setOrderHolder((current) => current || record.ownerName);
    setDbprWarning(null);
    setError("");
  }

  function editLicenseDetails() {
    const warning = dbprWarning;
    setDbprWarning(null);
    window.requestAnimationFrame(() => {
      if (warning?.countyMatches === false) countyRef.current?.focus();
      else if (warning?.licenseTypeMatches === false) licenseTypeRef.current?.focus();
      else licenseNumberRef.current?.focus();
    });
  }

  return (
    <section id="market-report-offer" className={styles.report} aria-labelledby="market-value-report-title">
      <div id="report-options-heading" className={styles.sectionHeading}>
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
            <span className={styles.premiumBadge}>For lenders &amp; professional use</span>
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

      {open ? (
        <form
          ref={orderFormRef}
          id="market-report-order-form"
          className={styles.form}
          onSubmit={submit}
        >
          <div className={styles.formHeading}>
            <span>Secure report order</span>
            <h5>{orderCounty} · {orderLicenseType}</h5>
            <p>
              Complete the license identity and contact information below. You will be redirected to secure Stripe checkout for the one-time $195 report fee.
            </p>
          </div>

          <label>
            <span>Florida County</span>
            <select
              ref={countyRef}
              value={orderCounty}
              onChange={(event) => {
                setOrderCounty(event.target.value);
                setError("");
              }}
              required
            >
              <option value="">Select county</option>
              {floridaCounties.map((item) => <option key={item.slug} value={item.name}>{item.name}</option>)}
            </select>
          </label>
          <label>
            <span>License Type</span>
            <select
              ref={licenseTypeRef}
              value={orderLicenseType}
              onChange={(event) => {
                setOrderLicenseType(event.target.value);
                setError("");
              }}
              required
            >
              <option value="">Select license type</option>
              <option value="4COP Quota">4COP Quota</option>
              <option value="3PS Quota / Package Store">3PS Quota / Package Store</option>
            </select>
          </label>

          <label>
            <span>License Number</span>
            <input
              ref={licenseNumberRef}
              name="license_number"
              value={orderLicenseNumber}
              onChange={(event) => {
                setOrderLicenseNumber(event.target.value);
                setError("");
              }}
              placeholder="e.g. BEV58-12345"
              maxLength={80}
              required
            />
          </label>
          <label>
            <span>Current Holder of Record <small>If known</small></span>
            <input
              name="current_holder_of_record"
              value={orderHolder}
              onChange={(event) => setOrderHolder(event.target.value)}
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

      {dbprWarning ? (
        <div className={styles.warningBackdrop} role="presentation">
          <div
            ref={warningDialogRef}
            className={styles.warningDialog}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="order-dbpr-warning-title"
            aria-describedby="order-dbpr-warning-description"
            tabIndex={-1}
          >
            <span className={styles.warningEyebrow}>DBPR record verification</span>
            <h3 id="order-dbpr-warning-title">
              {dbprWarning.status === "mismatch"
                ? "License details do not match"
                : dbprWarning.status === "not_found"
                  ? "License number not found"
                  : "License number needs correction"}
            </h3>
            <p id="order-dbpr-warning-description">
              {dbprWarning.status === "mismatch" && dbprWarning.record
                ? "Choose the verified DBPR record below to correct the order automatically, or return to the form and edit the license details yourself."
                : dbprWarning.error || "Please correct the license information before continuing."}
            </p>

            {dbprWarning.status === "mismatch" && dbprWarning.record ? (
              <div className={styles.warningComparison}>
                <div>
                  <span>Current order</span>
                  <strong>{orderCounty}</strong>
                  <small>{orderLicenseType}</small>
                </div>
                <div className={styles.recordedDetails}>
                  <span>Verified DBPR record</span>
                  <strong>{dbprWarning.record.county} County</strong>
                  <small>{dbprWarning.expectedLicenseType ?? `Series ${dbprWarning.record.series}`}</small>
                </div>
              </div>
            ) : null}

            {dbprWarning.record ? (
              <p className={styles.warningRecordNote}>
                License {dbprWarning.record.licenseNumber} · {dbprWarning.record.ownerName} · {dbprWarning.record.primaryStatus} / {dbprWarning.record.secondaryStatus}
              </p>
            ) : null}

            <div className={styles.warningActions}>
              {dbprWarning.status === "mismatch" && dbprWarning.record && dbprWarning.expectedLicenseType ? (
                <button type="button" className={styles.warningPrimary} onClick={useDbprRecord}>
                  Use Verified DBPR Record
                </button>
              ) : null}
              <button type="button" onClick={editLicenseDetails}>
                Edit License Details Manually
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
