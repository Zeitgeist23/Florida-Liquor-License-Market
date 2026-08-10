"use client";

import { useEffect, useRef, useState } from "react";

export type InteractiveLawReference = {
  citation: string;
  title: string;
  summary: string;
  href: string;
};

type InteractiveLawCardsProps = {
  items: InteractiveLawReference[];
  actionLabel: string;
  sourceName: string;
  variant?: "standard" | "compact";
};

export default function InteractiveLawCards({
  items,
  actionLabel,
  sourceName,
  variant = "standard",
}: InteractiveLawCardsProps) {
  const [selected, setSelected] = useState<InteractiveLawReference | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const compact = variant === "compact";

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <>
      <div className={compact ? "official-source-grid" : "laws-grid"}>
        {items.map((law) => (
          <button
            type="button"
            className={compact ? "official-source-card" : "law-card law-card-button"}
            key={`${law.citation}-${law.title}`}
            onClick={() => setSelected(law)}
            aria-label={`View ${law.citation} ${law.title} inside Florida Liquor License Market`}
          >
            <b>{law.citation}</b>
            <h3>{law.title}</h3>
            <p>{law.summary}</p>
            <span className={compact ? "official-source-action" : "law-card-action"}>{actionLabel} →</span>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="law-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <section
            className="law-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="law-modal-title"
          >
            <header className="law-modal-header">
              <div className="law-modal-brand">
                <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
                <div>
                  <span>Florida Liquor License Market</span>
                  <small>{sourceName}</small>
                </div>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="law-modal-close"
                aria-label="Close FLLM law viewer"
                onClick={() => setSelected(null)}
              >
                ×
              </button>
            </header>

            <div className="law-modal-titlebar">
              <span>{selected.citation}</span>
              <h2 id="law-modal-title">{selected.title}</h2>
              <p>{selected.summary}</p>
            </div>

            <div className="law-modal-frame-wrap">
              <iframe
                className="law-modal-frame"
                src={selected.href}
                title={`${selected.citation} ${selected.title} official source`}
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>

            <footer className="law-modal-footer">
              <span>Official source displayed inside FLLM.</span>
              <span>Press Esc or × to close and return to the laws page.</span>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
