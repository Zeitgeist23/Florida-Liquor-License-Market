"use client";

import { useEffect, useState } from "react";
import styles from "./BrokerSampleModalLink.module.css";

type Tier = "standard" | "featured";

const APPROVED_BROKER_DETAIL_PAGE = "/listings/FLLM-022";
const FEATURED_SAMPLE_PAGE = "/brokers/sample-featured-listing";

export default function BrokerSampleModalLink({ tier }: { tier: Tier }) {
  const [open, setOpen] = useState(false);
  const featured = tier === "featured";
  const label = featured
    ? "Preview Featured Ad Detail Page"
    : "View Approved Broker Listing Page";

  useEffect(() => {
    if (!featured || !open) return;
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
  }, [featured, open]);

  if (!featured) {
    return (
      <a className={styles.trigger} href={APPROVED_BROKER_DETAIL_PAGE}>
        <span className={styles.icon} aria-hidden="true">▣</span>
        {label}
      </a>
    );
  }

  return (
    <>
      <button className={styles.trigger} type="button" onClick={() => setOpen(true)}>
        <span className={styles.icon} aria-hidden="true">▣</span>
        {label}
      </button>

      {open ? (
        <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={label} onMouseDown={() => setOpen(false)}>
          <div className={styles.modal} onMouseDown={(event) => event.stopPropagation()}>
            <div className={styles.modalBar}>
              <div>
                <strong>Featured Broker Listing Detail Page</strong>
                <span>Sample preview — example only</span>
              </div>
              <button className={styles.close} type="button" onClick={() => setOpen(false)} aria-label="Close sample preview">×</button>
            </div>
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
            <p className={styles.caption}>
              This is a non-interactive sample preview. Close it to continue choosing your listing option.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
