"use client";

import { useEffect, useState } from "react";
import styles from "./BrokerSampleModalLink.module.css";

type Tier = "standard" | "featured";

const STANDARD_SAMPLE_PAGE = "/brokers/sample-standard-listing";
const FEATURED_SAMPLE_IMAGE = "/assets/brokers/fllm-featured-broker-preview-final.jpg?v=20260904-1915";

export default function BrokerSampleModalLink({ tier }: { tier: Tier }) {
  const [open, setOpen] = useState(false);
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

  return (
    <>
      <button className={styles.trigger} type="button" onClick={() => setOpen(true)}>
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
              <div className={styles.imageViewport}>
                <img
                  className={styles.sampleImage}
                  src={FEATURED_SAMPLE_IMAGE}
                  alt="Sample Featured broker listing detail page"
                  draggable={false}
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

            <p className={styles.caption}>{featured ? "This is a sample Featured listing preview image." : "This is a sample preview. Scroll inside the Standard preview to see the complete page."}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
