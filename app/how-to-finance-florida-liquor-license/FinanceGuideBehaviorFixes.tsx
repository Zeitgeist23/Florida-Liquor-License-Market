"use client";

import { useEffect } from "react";

export default function FinanceGuideBehaviorFixes() {
  useEffect(() => {
    const applySnapshotCentering = () => {
      const title = document.querySelector<HTMLElement>(
        ".finance-guide-page .seo-market-snapshot > span"
      );
      if (!title) return;
      title.style.setProperty("display", "block", "important");
      title.style.setProperty("width", "100%", "important");
      title.style.setProperty("text-align", "center", "important");
      title.style.setProperty("margin-left", "0", "important");
      title.style.setProperty("margin-right", "0", "important");
    };

    const syncFaqState = (details: HTMLDetailsElement) => {
      const summary = details.querySelector<HTMLElement>(":scope > summary");
      if (!summary) return;

      if (details.open) {
        summary.style.setProperty("color", "#ffc13b", "important");
        summary.style.setProperty(
          "text-shadow",
          "0 0 12px rgba(246, 167, 0, .22)",
          "important"
        );
        details.style.setProperty(
          "border-color",
          "rgba(255, 193, 59, .9)",
          "important"
        );
        details.style.setProperty(
          "box-shadow",
          "0 10px 24px rgba(0,0,0,.18), 0 0 14px rgba(246,167,0,.1)",
          "important"
        );
      } else {
        summary.style.removeProperty("color");
        summary.style.removeProperty("text-shadow");
        details.style.removeProperty("border-color");
        details.style.removeProperty("box-shadow");
      }
    };

    const wireFaqs = () => {
      document
        .querySelectorAll<HTMLDetailsElement>(
          ".finance-guide-page .seo-market-faq-list details"
        )
        .forEach((details) => {
          syncFaqState(details);
          if (details.dataset.financeFaqWired === "true") return;
          details.dataset.financeFaqWired = "true";
          details.addEventListener("toggle", () => syncFaqState(details));
        });
    };

    const applyAll = () => {
      applySnapshotCentering();
      wireFaqs();
    };

    applyAll();

    const observer = new MutationObserver(applyAll);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <style jsx global>{`
      .finance-guide-page .seo-market-faq-list details[open] > summary,
      .finance-guide-page .seo-market-faq-list details[open] > summary::marker {
        color: #ffc13b !important;
      }
    `}</style>
  );
}
