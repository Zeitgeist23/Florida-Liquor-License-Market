"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { floridaCounties } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import { listingPageHref } from "@/lib/listing-page-urls";
import interactionStyles from "./ComparableListingRows.module.css";
import styles from "./LiquorLicenseValueEstimator.module.css";

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
  const [county, setCounty] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [licenseStatus, setLicenseStatus] = useState("");
  const [preferredTiming, setPreferredTiming] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [guidance, setGuidance] = useState<PricingGuidance | null>(null);
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [leadReference, setLeadReference] = useState("");

  async function estimate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!county || !licenseType || !licenseStatus || !preferredTiming) return;

    setLoading(true);
    setError("");
    setGuidance(null);
    setLeadError("");
    setLeadReference("");

    try {
      const params = new URLSearchParams({ county, licenseType });
      const response = await fetch(`/api/market-pricing-guidance?${params.toString()}`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      const result = (await response.json()) as PricingGuidance & { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to load current Florida marketplace data.");
      setGuidance(result);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load current Florida marketplace data.");
    } finally {
      setLoading(false);
    }
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
          honey: String(formData.get("honey") || ""),
          county: guidance.county,
          license_type: guidance.licenseType,
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
        <p>Enter the license location, type, status and timing. FLLM will compare current disclosed asking prices and show how much exact-market evidence is available.</p>
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
          {loading ? "Calculating Market Range…" : "Calculate My Market Range"}
        </button>
      </form>

      {error ? <p className={styles.error} role="alert">{error}</p> : null}

      {guidance ? (
        <div className={styles.results} aria-live="polite">
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

          {guidance.comparables.length > 0 ? (
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>Listing</th><th>License type</th><th>Status</th><th>Asking price</th></tr></thead>
                <tbody>
                  {guidance.comparables.map((listing, index) => {
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
          ) : (
            <div className={styles.empty}>
              <strong>No disclosed active asking-price comparables are currently available for this exact county/type combination.</strong>
              <p>That does not mean the license has no market value. FLLM has {guidance.statewide.count} disclosed active {guidance.licenseType} asking-price comparables statewide, with a median of {currency(guidance.statewide.median)}. Statewide data is context only because quota-license markets are county-specific.</p>
            </div>
          )}

          <p className={styles.notice}>{guidance.notice}</p>

          <section className={styles.followUp} aria-labelledby="valuation-follow-up-title">
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
                <label className={styles.honey} aria-hidden="true"><span>Company Website</span><input name="honey" tabIndex={-1} autoComplete="off" /></label>
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
