"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { floridaCounties } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import { listingPageHref } from "@/lib/listing-page-urls";
import interactionStyles from "./ComparableListingRows.module.css";
import styles from "./LiquorLicenseValueEstimator.module.css";
import PreliminaryMarketReportFunnel from "./PreliminaryMarketReportFunnel";

type ComparableListing = {
  reference: string;
  county: string;
  licenseType: Listing["type"];
  status: string;
  askingPrice: number;
};

type Confidence = "strong" | "moderate" | "limited" | "unavailable";

type PricingGuidance = {
  county: string;
  licenseType: string;
  count: number;
  low: number | null;
  median: number | null;
  high: number | null;
  typicalLow: number | null;
  typicalHigh: number | null;
  confidence: Confidence;
  statewide: { count: number; median: number | null };
  comparables: ComparableListing[];
  generatedAt: string;
  notice: string;
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

const confidenceLabels: Record<Confidence, string> = {
  strong: "Strong comparable set",
  moderate: "Moderate comparable set",
  limited: "Limited comparable data",
  unavailable: "No exact comparables",
};

function currency(value: number | null) {
  if (value === null) return "No disclosed data";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function range(low: number | null, high: number | null) {
  if (low === null && high === null) return "No exact county range";
  if (low === high || high === null) return currency(low);
  if (low === null) return currency(high);
  return `${currency(low)}–${currency(high)}`;
}

export default function LiquorLicenseValueEstimator() {
  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const conversionChoicesRef = useRef<HTMLElement | null>(null);
  const licenseNumberRef = useRef<HTMLInputElement | null>(null);
  const warningDialogRef = useRef<HTMLDivElement | null>(null);
  const [county, setCounty] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [currentHolderOfRecord, setCurrentHolderOfRecord] = useState("");
  const [licenseStatus, setLicenseStatus] = useState("");
  const [preferredTiming, setPreferredTiming] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [guidance, setGuidance] = useState<PricingGuidance | null>(null);
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [leadReference, setLeadReference] = useState("");
  const [showAllComparables, setShowAllComparables] = useState(false);
  const [choicesInView, setChoicesInView] = useState(false);
  const [dbprWarning, setDbprWarning] = useState<DbprValidation | null>(null);

  useEffect(() => {
    if (!guidance) return;

    const timeout = window.setTimeout(() => {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      resultsRef.current?.scrollIntoView({ behavior, block: "start" });
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [guidance]);

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
    if (!guidance || !conversionChoicesRef.current) return;

    const section = conversionChoicesRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setChoicesInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setChoicesInView(true);
        observer.disconnect();
      },
      { threshold: 0.24, rootMargin: "0px 0px -7% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [guidance]);

  function resetResults() {
    setError("");
    setGuidance(null);
    setLeadError("");
    setLeadReference("");
    setShowAllComparables(false);
    setChoicesInView(false);
  }

  async function loadGuidance(resolvedCounty: string, resolvedLicenseType: string) {
    const params = new URLSearchParams({ county: resolvedCounty, licenseType: resolvedLicenseType });
    const response = await fetch(`/api/market-pricing-guidance?${params.toString()}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const result = (await response.json()) as PricingGuidance & { error?: string };
    if (!response.ok) throw new Error(result.error || "Unable to load current Florida marketplace data.");
    setGuidance(result);
  }

  async function estimate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!county || !licenseType || !licenseStatus || !preferredTiming) return;

    setLoading(true);
    setDbprWarning(null);
    resetResults();

    try {
      if (licenseNumber.trim()) {
        const validationParams = new URLSearchParams({ licenseNumber, county, licenseType });
        const validationResponse = await fetch(`/api/license-identity-validation?${validationParams.toString()}`, {
          headers: { Accept: "application/json" },
          cache: "no-store",
        });
        const validation = (await validationResponse.json()) as DbprValidation;

        if (!validationResponse.ok || validation.status !== "match") {
          setDbprWarning(validation);
          return;
        }
      }

      await loadGuidance(county, licenseType);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load current Florida marketplace data.");
    } finally {
      setLoading(false);
    }
  }

  async function useDbprRecord() {
    const record = dbprWarning?.record;
    const expectedLicenseType = dbprWarning?.expectedLicenseType;
    if (!record || !expectedLicenseType) return;

    const recordedCounty = `${record.county.replace(/\s+County$/i, "")} County`;
    setCounty(recordedCounty);
    setLicenseType(expectedLicenseType);
    setCurrentHolderOfRecord((current) => current || record.ownerName);
    setDbprWarning(null);
    setLoading(true);
    resetResults();

    try {
      await loadGuidance(recordedCounty, expectedLicenseType);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load current Florida marketplace data.");
    } finally {
      setLoading(false);
    }
  }

  function correctLicenseNumber() {
    setDbprWarning(null);
    window.requestAnimationFrame(() => licenseNumberRef.current?.focus());
  }

  function scrollToReportOptions(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    const target = document.getElementById("report-options-heading");
    if (!target) return;

    const url = new URL(window.location.href);
    url.hash = "report-options-heading";
    window.history.replaceState(null, "", url);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const placeOptions = (behavior: ScrollBehavior) => {
      const rect = target.getBoundingClientRect();
      const headerOffset = window.innerWidth <= 640 ? 72 : 88;
      const cardRowTop = window.scrollY + rect.top - headerOffset;
      window.scrollTo({ top: Math.max(0, cardRowTop), behavior });
    };

    placeOptions(reducedMotion ? "auto" : "smooth");

    // Correct for any late font or image layout shift after the long page scroll.
    window.setTimeout(() => placeOptions("auto"), 900);
  }

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!guidance) return;

    setLeadLoading(true);
    setLeadError("");
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/valuation-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") || ""),
          email: String(formData.get("email") || ""),
          phone: String(formData.get("phone") || ""),
          target_price: String(formData.get("target_price") || ""),
          contact_consent: formData.get("contact_consent") === "Accepted",
          county: guidance.county,
          license_type: guidance.licenseType,
          license_number: licenseNumber,
          current_holder_of_record: currentHolderOfRecord,
          license_status: licenseStatus,
          preferred_timing: preferredTiming,
          estimate: {
            count: guidance.count,
            low: guidance.low,
            median: guidance.median,
            high: guidance.high,
            typicalLow: guidance.typicalLow,
            typicalHigh: guidance.typicalHigh,
            confidence: guidance.confidence,
            generatedAt: guidance.generatedAt,
          },
        }),
      });
      const result = (await response.json()) as { leadReference?: string; error?: string };
      if (!response.ok || !result.leadReference) {
        throw new Error(result.error || "Unable to submit your request.");
      }
      setLeadReference(result.leadReference);
      form.reset();
    } catch (cause) {
      setLeadError(cause instanceof Error ? cause.message : "Unable to submit your request.");
    } finally {
      setLeadLoading(false);
    }
  }

  const sellHref = guidance
    ? `/sell-your-license?county=${encodeURIComponent(guidance.county)}&license_type=${encodeURIComponent(guidance.licenseType)}`
    : "/sell-your-license";

  return (
    <section className={styles.estimator} aria-labelledby="license-value-estimator-title">
      <div className={styles.heading}>
        <span>Free Florida Market Estimate</span>
        <h2 id="license-value-estimator-title">Calculate your current market range</h2>
        <p>Enter the license location, type, license identity, status and timing. FLLM will compare current disclosed asking prices and show how much exact-market evidence is available.</p>
      </div>

      <form className={styles.form} onSubmit={estimate}>
        <label>
          <span>Florida County</span>
          <select value={county} onChange={(event) => setCounty(event.target.value)} required>
            <option value="">Select county</option>
            {floridaCounties.map((item) => <option key={item.slug} value={item.name}>{item.name}</option>)}
          </select>
        </label>
        <label>
          <span>License Type</span>
          <select value={licenseType} onChange={(event) => setLicenseType(event.target.value)} required>
            <option value="">Select license type</option>
            <option value="4COP Quota">4COP Quota</option>
            <option value="3PS Quota / Package Store">3PS Quota / Package Store</option>
          </select>
        </label>
        <label>
          <span>License Number <small>If available</small></span>
          <input
            ref={licenseNumberRef}
            value={licenseNumber}
            onChange={(event) => setLicenseNumber(event.target.value)}
            placeholder="e.g. BEV58-12345"
            autoComplete="off"
            maxLength={80}
          />
        </label>
        <label>
          <span>Current Holder of Record <small>If available</small></span>
          <input
            value={currentHolderOfRecord}
            onChange={(event) => setCurrentHolderOfRecord(event.target.value)}
            placeholder="Name shown in DBPR records"
            autoComplete="organization"
            maxLength={180}
          />
        </label>
        <label>
          <span>Current License Status</span>
          <select value={licenseStatus} onChange={(event) => setLicenseStatus(event.target.value)} required>
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Inactive / Escrowed">Inactive / Escrowed</option>
            <option value="Pending transfer">Pending transfer</option>
            <option value="Not sure">Not sure</option>
          </select>
        </label>
        <label>
          <span>Potential Sale Timing</span>
          <select value={preferredTiming} onChange={(event) => setPreferredTiming(event.target.value)} required>
            <option value="">Select timing</option>
            <option value="Ready now">Ready now</option>
            <option value="Within 30 days">Within 30 days</option>
            <option value="Within 60–90 days">Within 60–90 days</option>
            <option value="Researching options">Researching options</option>
          </select>
        </label>
        <button type="submit" disabled={loading || !county || !licenseType || !licenseStatus || !preferredTiming}>
          {loading ? (licenseNumber.trim() ? "Verifying DBPR Record…" : "Calculating Market Range…") : "Calculate My Market Range"}
        </button>
      </form>

      {dbprWarning ? (
        <div className={styles.warningBackdrop} role="presentation">
          <div
            ref={warningDialogRef}
            className={styles.warningDialog}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="dbpr-warning-title"
            aria-describedby="dbpr-warning-description"
            tabIndex={-1}
          >
            <span className={styles.warningEyebrow}>DBPR record verification</span>
            <h3 id="dbpr-warning-title">
              {dbprWarning.status === "mismatch"
                ? "License details do not match"
                : dbprWarning.status === "not_found"
                  ? "License number not found"
                  : dbprWarning.status === "invalid"
                    ? "License number needs correction"
                    : "DBPR verification unavailable"}
            </h3>
            <p id="dbpr-warning-description">
              {dbprWarning.status === "mismatch" && dbprWarning.record
                ? "We stopped the estimate because the selected market does not match the current public DBPR record."
                : dbprWarning.error || "We could not verify this license against DBPR’s current public records. Please try again."}
            </p>

            {dbprWarning.status === "mismatch" && dbprWarning.record ? (
              <div className={styles.warningComparison}>
                <div>
                  <span>You selected</span>
                  <strong>{county}</strong>
                  <small>{licenseType}</small>
                </div>
                <div className={styles.recordedDetails}>
                  <span>DBPR record</span>
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
              {dbprWarning.status === "mismatch" && dbprWarning.expectedLicenseType ? (
                <button type="button" className={styles.warningPrimary} onClick={useDbprRecord}>
                  Use DBPR Record &amp; Calculate
                </button>
              ) : null}
              <button type="button" onClick={correctLicenseNumber}>
                Correct License Number
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {error ? <p className={styles.error} role="alert">{error}</p> : null}

      {guidance ? (
        <div ref={resultsRef} className={styles.results} aria-live="polite" style={{ scrollMarginTop: "110px" }}>
          <div className={styles.resultTitle}>
            <span>Your current market snapshot</span>
            <h3>{guidance.county} · {guidance.licenseType}</h3>
            <p>Based on active FLLM marketplace listings with disclosed asking prices. Status and timing are recorded for follow-up; they do not create an unsupported automatic price adjustment.</p>
          </div>

          <div className={styles.rangeCard}>
            <div>
              <span>Typical advertised range</span>
              <strong>{range(guidance.typicalLow, guidance.typicalHigh)}</strong>
              <small>{confidenceLabels[guidance.confidence]}</small>
            </div>
            <p>{guidance.count >= 4 ? "The typical range uses the middle half of exact county comparables to reduce the effect of outliers." : "With fewer than four exact comparables, the range uses the available disclosed asking prices."}</p>
          </div>

          <div className={styles.stats}>
            <article><span>Exact comparables</span><strong>{guidance.count}</strong></article>
            <article><span>Lowest asking price</span><strong>{currency(guidance.low)}</strong></article>
            <article className={styles.median}><span>Median asking price</span><strong>{currency(guidance.median)}</strong></article>
            <article><span>Highest asking price</span><strong>{currency(guidance.high)}</strong></article>
          </div>

          <section
            ref={conversionChoicesRef}
            className={`${styles.conversionChoices} ${choicesInView ? styles.choicesInView : ""}`}
            aria-labelledby="result-next-step-title"
          >
            <div className={styles.choiceHeading}>
              <span>Choose your next step</span>
              <h4 id="result-next-step-title">Turn this market snapshot into a decision</h4>
            </div>
            <div className={`${styles.conversionChoice} ${styles.paidChoice}`}>
              <div>
                <span>Professional market research</span>
                <strong>Order a license-specific report</strong>
                <p>Get identity research, county evidence, market trends and an indicated value range.</p>
              </div>
              <a href="#report-options-heading" onClick={scrollToReportOptions}>Compare Report Options</a>
            </div>
            <div className={styles.conversionChoice}>
              <div>
                <span>Free private follow-up</span>
                <strong>Email this estimate</strong>
                <p>Receive the snapshot and discuss buyer interest, timing and selling options.</p>
              </div>
              <a href="#email-estimate-form">Email My Free Estimate</a>
            </div>
          </section>

          {guidance.comparables.length > 0 ? (
            <section className={styles.comparables} aria-labelledby="market-comparables-title">
              <div className={styles.comparablesHeader}>
                <div>
                  <span>Current marketplace evidence</span>
                  <h4 id="market-comparables-title">Exact county comparables</h4>
                </div>
                <p>
                  Showing {showAllComparables ? guidance.comparables.length : Math.min(5, guidance.comparables.length)} of {guidance.comparables.length}
                </p>
              </div>
              <div className={styles.tableWrap} id="market-comparables-table">
                <table>
                  <thead><tr><th>Listing</th><th>License type</th><th>Status</th><th>Asking price</th></tr></thead>
                  <tbody>
                    {(showAllComparables ? guidance.comparables : guidance.comparables.slice(0, 5)).map((listing, index) => {
                      const href = listingPageHref({
                        county: listing.county,
                        type: listing.licenseType,
                        sourceRef: listing.reference,
                      });

                      return (
                        <tr
                          className={interactionStyles.clickableRow}
                          key={`${listing.reference}-${listing.askingPrice}-${index}`}
                          onClick={(event) => {
                            const target = event.target as HTMLElement;
                            if (target.closest("a, button, input, select, textarea")) return;
                            router.push(href);
                          }}
                          onMouseEnter={() => router.prefetch(href)}
                        >
                          <td>
                            <Link
                              className={interactionStyles.referenceLink}
                              href={href}
                              onFocus={() => router.prefetch(href)}
                              aria-label={`View ${listing.reference} listing details`}
                            >
                              <span>{listing.reference}</span>
                              <span className={interactionStyles.viewCue} aria-hidden="true">View listing <b>→</b></span>
                            </Link>
                          </td>
                          <td>{listing.licenseType}</td>
                          <td>{listing.status}</td>
                          <td><strong>{currency(listing.askingPrice)}</strong></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {guidance.comparables.length > 5 ? (
                <button
                  className={styles.comparablesToggle}
                  type="button"
                  aria-expanded={showAllComparables}
                  aria-controls="market-comparables-table"
                  onClick={() => setShowAllComparables((current) => !current)}
                >
                  {showAllComparables ? "Show Fewer Comparables" : `Show All ${guidance.comparables.length} Comparables`}
                </button>
              ) : null}
            </section>
          ) : (
            <div className={styles.empty}>
              <strong>No disclosed active asking-price comparables are currently available for this exact county/type combination.</strong>
              <p>That does not mean the license has no market value. FLLM has {guidance.statewide.count} disclosed active {guidance.licenseType} asking-price comparables statewide, with a median of {currency(guidance.statewide.median)}. Statewide data is context only because quota-license markets are county-specific.</p>
            </div>
          )}

          <p className={styles.notice}>{guidance.notice}</p>

          <PreliminaryMarketReportFunnel
            county={guidance.county}
            licenseType={guidance.licenseType}
            licenseNumber={licenseNumber}
            currentHolderOfRecord={currentHolderOfRecord}
            licenseStatus={licenseStatus}
            preferredTiming={preferredTiming}
            estimate={{
              count: guidance.count,
              low: guidance.low,
              median: guidance.median,
              high: guidance.high,
              typicalLow: guidance.typicalLow,
              typicalHigh: guidance.typicalHigh,
              confidence: guidance.confidence,
              generatedAt: guidance.generatedAt,
            }}
          />

          <section id="email-estimate-form" className={styles.followUp} aria-labelledby="valuation-follow-up-title">
            <div>
              <span>Private seller follow-up</span>
              <h4 id="valuation-follow-up-title">Get this result by email and discuss your options</h4>
              <p>Share your contact details and an FLLM representative can follow up about market activity, buyer interest and listing paths. No payment is required.</p>
            </div>

            {leadReference ? (
              <div className={styles.success} role="status">
                <strong>Your request was received.</strong>
                <p>Reference: {leadReference}. Check your email for a copy of the market snapshot.</p>
                <div className={styles.actions}>
                  <a className={styles.primary} href={sellHref}>List My License Now</a>
                  <a href="/florida-liquor-licenses-for-sale">Compare Current Listings</a>
                </div>
              </div>
            ) : (
              <form className={styles.leadForm} onSubmit={submitLead}>
                <label><span>Full Name</span><input name="name" autoComplete="name" required /></label>
                <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
                <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" required /></label>
                <label><span>Your Target Price <small>Optional</small></span><input name="target_price" inputMode="numeric" placeholder="$" /></label>
                <label className={styles.consent}>
                  <input name="contact_consent" type="checkbox" value="Accepted" required />
                  <span>I authorize Florida Liquor License Market to contact me about this estimate and selling options.</span>
                </label>
                {leadError ? <p className={styles.error} role="alert">{leadError}</p> : null}
                <button type="submit" disabled={leadLoading}>{leadLoading ? "Sending Request…" : "Email My Estimate & Contact Me"}</button>
              </form>
            )}
          </section>
        </div>
      ) : null}
    </section>
  );
}
