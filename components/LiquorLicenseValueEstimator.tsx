"use client";

import { useState } from "react";
import { floridaCounties } from "@/data/florida-counties";
import styles from "./LiquorLicenseValueEstimator.module.css";

type ComparableListing = {
  reference: string;
  county: string;
  licenseType: string;
  status: string;
  askingPrice: number;
};

type PricingGuidance = {
  county: string;
  licenseType: string;
  count: number;
  low: number | null;
  median: number | null;
  high: number | null;
  comparables: ComparableListing[];
  generatedAt: string;
  notice: string;
};

function currency(value: number | null) {
  if (value === null) return "No disclosed data";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function LiquorLicenseValueEstimator() {
  const [county, setCounty] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [guidance, setGuidance] = useState<PricingGuidance | null>(null);

  async function estimate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!county || !licenseType) return;

    setLoading(true);
    setError("");
    setGuidance(null);

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

  const sellHref = guidance
    ? `/sell-your-license?county=${encodeURIComponent(guidance.county)}&license_type=${encodeURIComponent(guidance.licenseType)}`
    : "/sell-your-license";

  return (
    <section className={styles.estimator} aria-labelledby="license-value-estimator-title">
      <div className={styles.heading}>
        <span>Free Florida Market Estimate</span>
        <h2 id="license-value-estimator-title">Check current asking-price comparables</h2>
        <p>Select the county and quota-license type. FLLM will compare the active marketplace listings currently available with disclosed asking prices.</p>
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
        <button type="submit" disabled={loading || !county || !licenseType}>
          {loading ? "Checking Florida Market…" : "See Current Market Range"}
        </button>
      </form>

      {error && <p className={styles.error} role="alert">{error}</p>}

      {guidance && (
        <div className={styles.results} aria-live="polite">
          <div className={styles.resultTitle}>
            <span>Current marketplace snapshot</span>
            <h3>{guidance.county} · {guidance.licenseType}</h3>
            <p>Based on active FLLM marketplace listings with disclosed asking prices.</p>
          </div>

          <div className={styles.stats}>
            <article><span>Comparable listings</span><strong>{guidance.count}</strong></article>
            <article><span>Lowest asking price</span><strong>{currency(guidance.low)}</strong></article>
            <article className={styles.median}><span>Median asking price</span><strong>{currency(guidance.median)}</strong></article>
            <article><span>Highest asking price</span><strong>{currency(guidance.high)}</strong></article>
          </div>

          {guidance.comparables.length > 0 ? (
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>Listing</th><th>License type</th><th>Status</th><th>Asking price</th></tr></thead>
                <tbody>
                  {guidance.comparables.map((listing, index) => (
                    <tr key={`${listing.reference}-${listing.askingPrice}-${index}`}>
                      <td>{listing.reference}</td>
                      <td>{listing.licenseType}</td>
                      <td>{listing.status}</td>
                      <td><strong>{currency(listing.askingPrice)}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.empty}>
              <strong>No disclosed active asking-price comparables are currently available for this exact county/type combination.</strong>
              <p>That does not mean the license has no market value. It means FLLM does not currently have enough disclosed active asking-price data for an automated comparison.</p>
            </div>
          )}

          <p className={styles.notice}>{guidance.notice}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href={sellHref}>Sell or List My Florida Liquor License</a>
            <a href="/florida-liquor-licenses-for-sale">Compare Current Licenses for Sale</a>
          </div>
        </div>
      )}
    </section>
  );
}
