"use client";

import { useEffect } from "react";

export default function FinanceGuideBehaviorFixes() {
  useEffect(() => {
    const applySnapshotCentering = () => {
      const title = document.querySelector<HTMLElement>(
        ".finance-guide-page .seo-market-snapshot > span"
      );
      if (!title) return;

      title.style.setProperty("display", "flex", "important");
      title.style.setProperty("align-items", "center", "important");
      title.style.setProperty("justify-content", "center", "important");
      title.style.setProperty("width", "100%", "important");
      title.style.setProperty("max-width", "none", "important");
      title.style.setProperty("box-sizing", "border-box", "important");
      title.style.setProperty("text-align", "center", "important");
      title.style.setProperty("margin-left", "0", "important");
      title.style.setProperty("margin-right", "0", "important");
      title.style.setProperty("padding-left", "0", "important");
      title.style.setProperty("padding-right", "0", "important");
      title.style.setProperty("position", "relative", "important");
      title.style.setProperty("left", "0", "important");
      title.style.setProperty("right", "0", "important");
    };

    const ensureQuestionLabel = (summary: HTMLElement) => {
      let label = summary.querySelector<HTMLElement>(":scope > .finance-faq-question-text");
      if (label) return label;

      const text = summary.textContent?.trim() || "";
      summary.textContent = "";
      label = document.createElement("span");
      label.className = "finance-faq-question-text";
      label.textContent = text;
      summary.appendChild(label);
      return label;
    };

    const syncFaqState = (details: HTMLDetailsElement) => {
      const summary = details.querySelector<HTMLElement>(":scope > summary");
      if (!summary) return;
      const label = ensureQuestionLabel(summary);

      if (details.open) {
        summary.style.setProperty("color", "#ffc13b", "important");
        summary.style.setProperty("-webkit-text-fill-color", "#ffc13b", "important");
        label.style.setProperty("color", "#ffc13b", "important");
        label.style.setProperty("-webkit-text-fill-color", "#ffc13b", "important");
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
        summary.style.removeProperty("-webkit-text-fill-color");
        summary.style.removeProperty("text-shadow");
        label.style.removeProperty("color");
        label.style.removeProperty("-webkit-text-fill-color");
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
          const summary = details.querySelector<HTMLElement>(":scope > summary");
          if (summary) ensureQuestionLabel(summary);
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
      .finance-guide-page .seo-market-faq-list details[open] > summary::marker,
      .finance-guide-page .seo-market-faq-list details[open] > summary > .finance-faq-question-text {
        color: #ffc13b !important;
        -webkit-text-fill-color: #ffc13b !important;
      }
    `}</style>
  );
}
