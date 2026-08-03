"use client";

import { useEffect, useState } from "react";

import styles from "./MarketPricingGuidance.module.css";

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

type Props = {
  county: string;
  licenseType: string;
  currentPrice?: string;
  onUsePrice: (price: number) => void;
};

function currency(value: number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function isSupportedLicenseType(value: string) {
  return value === "4COP Quota" || value === "3PS Quota / Package Store";
}

export default function MarketPricingGuidance({
  county,
  licenseType,
  currentPrice,
  onUsePrice,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [guidance, setGuidance] = useState<PricingGuidance | null>(null);
  const ready = Boolean(county && isSupportedLicenseType(licenseType));

  useEffect(() => {
    if (!open) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  async function showGuidance() {
    if (!ready) return;
    setOpen(true);
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
      if (!response.ok) throw new Error(result.error || "Unable to load current comparable listings.");
      setGuidance(result);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load current comparable listings.");
    } finally {
      setLoading(false);
    }
  }

  function useMedian() {
    if (guidance?.median === null || guidance?.median === undefined) return;
    onUsePrice(guidance.median);
    setOpen(false);
  }

  return (
    <div className={styles.root}>
      <button className={styles.trigger} type="button" disabled={!ready} onClick={showGuidance}>
        <span className={styles.triggerText}>
          <strong>Market Pricing Guidance</strong>
          <small>Compare active asking prices in the selected county.</small>
        </span>
        <span className={styles.triggerAction}>View Comparable Listings →</span>
      </button>
      {!ready && (
        <p className={styles.hint}>
          Select a county and either 4COP or 3PS quota license type to view comparable listings.
        </p>
      )}

      {open && (
        <div
          className={styles.backdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="pricing-guidance-heading">
            <button className={styles.close} type="button" aria-label="Close market pricing guidance" onClick={() => setOpen(false)}>×</button>
            <span className={styles.kicker}>Market Pricing Guidance</span>
            <h2 id="pricing-guidance-heading">Comparable asking prices</h2>
            <p className={styles.subheading}>{county} · {licenseType}</p>

            {loading && <p className={styles.loading} role="status">Loading current marketplace listings…</p>}
            {error && <p className={styles.error} role="alert">{error}</p>}

            {guidance && (
              <>
                <div className={styles.stats} aria-label="Comparable listing asking-price summary">
                  <div className={styles.stat}><span>Priced listings</span><strong>{guidance.count}</strong></div>
                  <div className={styles.stat}><span>Lowest ask</span><strong>{currency(guidance.low)}</strong></div>
                  <div className={`${styles.stat} ${styles.statMedian}`}><span>Median ask</span><strong>{currency(guidance.median)}</strong></div>
                  <div className={styles.stat}><span>Highest ask</span><strong>{currency(guidance.high)}</strong></div>
                </div>

                {guidance.comparables.length ? (
                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Listing</th>
                          <th>License type</th>
                          <th>Status</th>
                          <th>Asking price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {guidance.comparables.map((listing, index) => (
                          <tr key={`${listing.reference}-${listing.askingPrice}-${index}`}>
                            <td>{listing.reference}</td>
                            <td>{listing.licenseType}</td>
                            <td><span className={styles.status}>{listing.status}</span></td>
                            <td className={styles.tablePrice}>{currency(listing.askingPrice)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className={styles.empty}>
                    No active listings with a disclosed asking price currently match this county and license type. You can still enter your own asking price.
                  </p>
                )}

                <p className={styles.notice}>{guidance.notice}</p>
                <div className={styles.actions}>
                  <button type="button" onClick={() => setOpen(false)}>
                    {currentPrice ? "Keep My Price" : "Enter My Own Price"}
                  </button>
                  {guidance.median !== null && (
                    <button className={styles.useMedian} type="button" onClick={useMedian}>
                      Use Median — {currency(guidance.median)}
                    </button>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
