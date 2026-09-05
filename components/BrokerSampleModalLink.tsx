"use client";

import { useEffect, useState } from "react";
import styles from "./BrokerSampleModalLink.module.css";

type Tier = "standard" | "featured";

const STANDARD_SAMPLE_PAGE = "/brokers/sample-standard-listing";
const FEATURED_SAMPLE_PAGE = "/brokers/sample-featured-listing";
const FEATURED_SAMPLE_CLICK_KEY = "fllm-featured-sample-click-count";

export default function BrokerSampleModalLink({ tier }: { tier: Tier }) {
  const [open, setOpen] = useState(false);
  const [featuredSamplePage, setFeaturedSamplePage] = useState(`${FEATURED_SAMPLE_PAGE}?broker=female`);
  const [fallbackFeaturedClickCount, setFallbackFeaturedClickCount] = useState(0);
  const featured = tier === "featured";
  const label = featured ? "View Sample Featured Listing Page" : "View Sample Standard Listing Page";

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const openSample = () => {
    if (!featured) {
      setOpen(true);
      return;
    }

    let nextCount = fallbackFeaturedClickCount + 1;
    try {
      const stored = Number.parseInt(window.localStorage.getItem(FEATURED_SAMPLE_CLICK_KEY) ?? "0", 10);
      nextCount = Number.isFinite(stored) ? stored + 1 : 1;
      window.localStorage.setItem(FEATURED_SAMPLE_CLICK_KEY, String(nextCount));
    } catch {
      setFallbackFeaturedClickCount(nextCount);
    }

    const broker = nextCount % 4 === 0 ? "male" : "female";
    setFeaturedSamplePage(`${FEATURED_SAMPLE_PAGE}?broker=${broker}&sampleClick=${nextCount}`);
    setOpen(true);
  };

  return (
    <>
      <button className={styles.trigger} type="button" onClick={openSample}>
        <span className={styles.icon} aria-hidden="true">▣</span>
        {label}
      </button>

      {open ? (
        <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={label} onMouseDown={() => setOpen(false)}>
          <div className={`${styles.modal} ${featured ? styles.featuredModal : styles.standardModal}`} onMouseDown={(event) => event.stopPropagation()}>
            <div className={styles.modalBar}>
              <div>
                <strong>{featured ? "Featured" : "Standard"} Broker Listing Detail Page</strong>
                <span>Sample preview — example only</span>
              </div>
              <button className={styles.close} type="button" onClick={() => setOpen(false)} aria-label="Close sample preview">×</button>
            </div>

            {featured ? (
              <div className={styles.viewport}>
                <iframe
                  className={styles.frame}
                  src={featuredSamplePage}
                  title="Featured broker listing detail page sample"
                  tabIndex={0}
                  loading="eager"
                />
              </div>
            ) : (
              <div className={`${styles.viewport} ${styles.standardViewport}`}>
                <iframe
                  className={`${styles.frame} ${styles.standardFrame}`}
                  src={STANDARD_SAMPLE_PAGE}
                  title="Standard broker listing detail page sample"
                  tabIndex={0}
                  loading="eager"
                />
              </div>
            )}

            <p className={styles.caption}>This is a sample preview. Scroll inside the preview to see the complete {featured ? "Featured" : "Standard"} listing page.</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
