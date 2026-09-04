"use client";

import { useEffect, useState } from "react";
import { standardBrokerPreviewInline } from "./standardBrokerPreviewInline";
import styles from "./BrokerSampleModalLink.module.css";

type Tier = "standard" | "featured";

const FEATURED_SAMPLE_PAGE = "/brokers/sample-featured-listing";

export default function BrokerSampleModalLink({ tier }: { tier: Tier }) {
  const [open, setOpen] = useState(false);
  const featured = tier === "featured";
  const label = featured ? "Preview Featured Ad Detail Page" : "View Sample Standard Listing Page";

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
                <iframe className={styles.frame} src={FEATURED_SAMPLE_PAGE} title="Featured broker listing detail page sample" tabIndex={-1} loading="lazy" />
                <div className={styles.shield} aria-hidden="true" />
              </div>
            ) : (
              <div className={styles.imageViewport}>
                <img className={styles.sampleImage} src={standardBrokerPreviewInline} alt="Approved sample Standard broker listing detail page" />
              </div>
            )}

            <p className={styles.caption}>This is a non-interactive sample preview. Close it to continue choosing your listing option.</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
