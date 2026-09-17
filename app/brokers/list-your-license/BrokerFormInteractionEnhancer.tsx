"use client";

import { useEffect } from "react";

export default function BrokerFormInteractionEnhancer() {
  useEffect(() => {
    const selects = Array.from(
      document.querySelectorAll<HTMLSelectElement>(
        'select[name="county"], select[name="license_type"]',
      ),
    );

    function openPicker(event: Event) {
      const select = event.currentTarget as HTMLSelectElement & {
        showPicker?: () => void;
      };

      try {
        select.focus({ preventScroll: true });
        select.showPicker?.();
      } catch {
        // Browsers without select.showPicker() still retain normal click behavior.
      }
    }

    selects.forEach((select) => select.addEventListener("mouseenter", openPicker));

    const faqDetails = Array.from(
      document.querySelectorAll<HTMLDetailsElement>(
        '.broker-official-shell main [class*="faqList"] details',
      ),
    );

    function openOnly(target: HTMLDetailsElement) {
      faqDetails.forEach((detail) => {
        detail.open = detail === target;
      });
    }

    const faqListeners = faqDetails.map((detail) => {
      const onEnter = () => openOnly(detail);
      const onFocusIn = () => openOnly(detail);
      const onLeave = () => {
        if (!detail.contains(document.activeElement)) detail.open = false;
      };
      const onFocusOut = (event: FocusEvent) => {
        const next = event.relatedTarget as Node | null;
        if (!next || !detail.contains(next)) detail.open = false;
      };

      detail.addEventListener("mouseenter", onEnter);
      detail.addEventListener("focusin", onFocusIn);
      detail.addEventListener("mouseleave", onLeave);
      detail.addEventListener("focusout", onFocusOut);

      return { detail, onEnter, onFocusIn, onLeave, onFocusOut };
    });

    return () => {
      selects.forEach((select) => select.removeEventListener("mouseenter", openPicker));
      faqListeners.forEach(({ detail, onEnter, onFocusIn, onLeave, onFocusOut }) => {
        detail.removeEventListener("mouseenter", onEnter);
        detail.removeEventListener("focusin", onFocusIn);
        detail.removeEventListener("mouseleave", onLeave);
        detail.removeEventListener("focusout", onFocusOut);
      });
    };
  }, []);

  return (
    <style>{`
      .broker-official-shell main [class*="faqList"] {
        align-items: start;
      }

      .broker-official-shell main [class*="faqList"] details {
        position: relative;
        align-self: start;
        overflow: hidden;
        border: 1px solid #d2d9dd !important;
        border-radius: 12px !important;
        background:
          linear-gradient(180deg, #ffffff 0%, #fbfcfd 100%) !important;
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,.96),
          0 7px 16px rgba(7,24,39,.07),
          0 16px 30px rgba(7,24,39,.07) !important;
        transform: translateY(0) scale(1);
        transition:
          transform .2s ease,
          border-color .2s ease,
          box-shadow .2s ease,
          background .2s ease,
          filter .2s ease;
      }

      .broker-official-shell main [class*="faqList"] details:hover,
      .broker-official-shell main [class*="faqList"] details[open] {
        transform: translateY(-5px) scale(1.008);
        border-color: rgba(232,164,10,.92) !important;
        background:
          radial-gradient(circle at 18% 0%, rgba(71,214,255,.11), transparent 38%),
          radial-gradient(circle at 86% 10%, rgba(246,167,0,.10), transparent 34%),
          linear-gradient(180deg, #ffffff 0%, #fbfdff 100%) !important;
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,1),
          inset 0 0 24px rgba(72,211,255,.07),
          0 16px 30px rgba(7,24,39,.13),
          0 26px 46px rgba(7,24,39,.11),
          0 0 24px rgba(246,167,0,.14) !important;
        filter: brightness(1.015);
      }

      .broker-official-shell main [class*="faqList"] details summary {
        transition: color .18s ease, transform .18s ease;
      }

      .broker-official-shell main [class*="faqList"] details:hover summary,
      .broker-official-shell main [class*="faqList"] details[open] summary {
        color: #061827 !important;
      }

      .broker-official-shell main [class*="faqList"] details p {
        font-size: 16px !important;
        line-height: 1.72 !important;
        color: #415665 !important;
      }

      @media (max-width: 720px) {
        .broker-official-shell main [class*="faqList"] details:hover,
        .broker-official-shell main [class*="faqList"] details[open] {
          transform: translateY(-3px);
        }
      }
    `}</style>
  );
}
