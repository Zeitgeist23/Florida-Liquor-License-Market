"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function ScrollActiveComparisonTable({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const rows = Array.from(wrap.querySelectorAll<HTMLTableRowElement>("tbody tr"));
    const header = wrap.querySelector<HTMLTableSectionElement>("thead");
    if (!rows.length || !header) return;

    let frame = 0;

    const updateActiveRow = () => {
      frame = 0;
      const wrapRect = wrap.getBoundingClientRect();
      const tableIsVisible = wrapRect.bottom > 0 && wrapRect.top < window.innerHeight;

      let activeRow: HTMLTableRowElement | undefined;
      if (tableIsVisible) {
        const activationLine = Math.max(0, header.getBoundingClientRect().bottom + 1);
        activeRow = rows.find((row) => {
          const rect = row.getBoundingClientRect();
          return rect.top <= activationLine && rect.bottom > activationLine;
        });

        if (!activeRow) {
          activeRow = rows.find((row) => row.getBoundingClientRect().top > activationLine);
        }
      }

      rows.forEach((row) => row.classList.toggle("is-scroll-active", row === activeRow));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveRow);
    };

    updateActiveRow();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      rows.forEach((row) => row.classList.remove("is-scroll-active"));
    };
  }, []);

  return <div ref={wrapRef} className="lt-comparison-wrap">{children}</div>;
}
