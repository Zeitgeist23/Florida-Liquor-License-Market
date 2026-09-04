"use client";

import { useEffect, useState } from "react";
import styles from "./BrokerSampleModalLink.module.css";

type Tier = "standard" | "featured";

const FEATURED_SAMPLE_PAGE = "/brokers/sample-featured-listing";
const STANDARD_SAMPLE_IMAGE = "data:image/webp;base64,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";

export default function BrokerSampleModalLink({ tier }: { tier: Tier }) {
  const [open, setOpen] = useState(false);
  const featured = tier === "featured";
  const label = featured
    ? "Preview Featured Ad Detail Page"
    : "View Sample Standard Listing Page";

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

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
          <div className={`${styles.modal} ${featured ? "" : styles.standardModal}`} onMouseDown={(event) => event.stopPropagation()}>
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
                  src={FEATURED_SAMPLE_PAGE}
                  title="Featured broker listing detail page sample"
                  tabIndex={-1}
                  loading="lazy"
                />
                <div className={styles.shield} aria-hidden="true" />
              </div>
            ) : (
              <div className={styles.imageViewport}>
                <img
                  className={styles.sampleImage}
                  src={STANDARD_SAMPLE_IMAGE}
                  alt="Approved sample Standard broker listing detail page"
                />
              </div>
            )}

            <p className={styles.caption}>
              This is a non-interactive sample preview. Close it to continue choosing your listing option.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
