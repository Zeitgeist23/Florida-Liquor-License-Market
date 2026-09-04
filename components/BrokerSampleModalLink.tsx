"use client";

import { useEffect, useState } from "react";
import styles from "./BrokerSampleModalLink.module.css";

type Tier = "standard" | "featured";

const STANDARD_SAMPLE_PAGE = "/brokers/sample-standard-listing";
const FEATURED_SAMPLE_IMAGE = "data:image/jpeg;base64,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[...truncated for display...]";

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
                <img className={styles.sampleImage} src={FEATURED_SAMPLE_IMAGE} alt="Sample Featured broker listing detail page" draggable={false} />
              </div>
            ) : (
              <div className={`${styles.viewport} ${styles.standardViewport}`}>
                <iframe className={`${styles.frame} ${styles.standardFrame}`} src={STANDARD_SAMPLE_PAGE} title="Standard broker listing detail page sample" tabIndex={0} loading="eager" />
              </div>
            )}

            <p className={styles.caption}>{featured ? "This is a sample Featured listing preview image." : "This is a sample preview. Scroll inside the Standard preview to see the complete page."}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
