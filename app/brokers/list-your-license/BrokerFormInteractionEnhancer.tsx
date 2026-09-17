"use client";

import { useEffect } from "react";

function normalizeBrokerageWebsite(rawValue: string) {
  const trimmed = rawValue.trim();
  if (!trimmed) return "";

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, "")}`;
}

export default function BrokerFormInteractionEnhancer() {
  useEffect(() => {
    const websiteInput = document.querySelector<HTMLInputElement>(
      'input[name="brokerage_website"]',
    );
    const websiteForm = websiteInput?.form || null;

    function normalizeWebsiteInput() {
      if (!websiteInput) return;
      websiteInput.value = normalizeBrokerageWebsite(websiteInput.value);
    }

    if (websiteInput) {
      websiteInput.type = "text";
      websiteInput.inputMode = "url";
      websiteInput.placeholder = "yourbrokerage.com or https://yourbrokerage.com";
      websiteInput.addEventListener("blur", normalizeWebsiteInput);
      websiteInput.addEventListener("change", normalizeWebsiteInput);
      websiteForm?.addEventListener("submit", normalizeWebsiteInput, true);
    }

    const faqLists = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.broker-official-shell main [class*="faqList"]',
      ),
    );

    const closeTimers = new Map<HTMLElement, number>();

    function detailsFor(list: HTMLElement) {
      return Array.from(list.querySelectorAll<HTMLDetailsElement>("details"));
    }

    function clearCloseTimer(list: HTMLElement) {
      const timer = closeTimers.get(list);
      if (timer !== undefined) {
        window.clearTimeout(timer);
        closeTimers.delete(list);
      }
    }

    function closeList(list: HTMLElement) {
      clearCloseTimer(list);
      detailsFor(list).forEach((detail) => {
        detail.open = false;
      });
    }

    function scheduleClose(list: HTMLElement, delay = 90) {
      clearCloseTimer(list);
      closeTimers.set(
        list,
        window.setTimeout(() => {
          detailsFor(list).forEach((detail) => {
            detail.open = false;
          });
          closeTimers.delete(list);
        }, delay),
      );
    }

    function openOnly(list: HTMLElement, target: HTMLDetailsElement) {
      clearCloseTimer(list);
      detailsFor(list).forEach((detail) => {
        detail.open = detail === target;
      });
    }

    faqLists.forEach(closeList);

    const faqListListeners = faqLists.map((list) => {
      const onMouseMove = (event: MouseEvent) => {
        const eventTarget = event.target;
        if (!(eventTarget instanceof Element)) return;

        const detail = eventTarget.closest("details");
        if (detail instanceof HTMLDetailsElement && list.contains(detail)) {
          openOnly(list, detail);
          return;
        }

        scheduleClose(list);
      };

      const onMouseLeave = () => closeList(list);

      const onFocusIn = (event: FocusEvent) => {
        const eventTarget = event.target;
        if (!(eventTarget instanceof Element)) return;
        const detail = eventTarget.closest("details");
        if (detail instanceof HTMLDetailsElement && list.contains(detail)) {
          openOnly(list, detail);
        }
      };

      const onFocusOut = (event: FocusEvent) => {
        const next = event.relatedTarget as Node | null;
        if (!next || !list.contains(next)) scheduleClose(list, 0);
      };

      const onClick = (event: MouseEvent) => {
        const eventTarget = event.target;
        if (!(eventTarget instanceof Element)) return;
        const summary = eventTarget.closest("summary");
        if (!(summary instanceof HTMLElement) || !list.contains(summary)) return;
        const detail = summary.parentElement;
        if (!(detail instanceof HTMLDetailsElement)) return;

        event.preventDefault();
        openOnly(list, detail);
      };

      list.addEventListener("mousemove", onMouseMove);
      list.addEventListener("mouseleave", onMouseLeave);
      list.addEventListener("focusin", onFocusIn);
      list.addEventListener("focusout", onFocusOut);
      list.addEventListener("click", onClick);

      return { list, onMouseMove, onMouseLeave, onFocusIn, onFocusOut, onClick };
    });

    // The lower SEO FAQ had a second, independent scroll-driven controller.
    // It was reopening whichever question sat closest to the viewport center,
    // which is why the second question kept appearing stuck open. Override that
    // behavior here so this lower section is hover/click controlled only.
    const seoFaqList = document.querySelector<HTMLElement>(
      ".fllm-listing-service-faq__grid",
    );
    const seoFaqDetails = seoFaqList
      ? Array.from(seoFaqList.querySelectorAll<HTMLDetailsElement>("details"))
      : [];
    let seoCloseTimer: number | null = null;

    function clearSeoCloseTimer() {
      if (seoCloseTimer !== null) {
        window.clearTimeout(seoCloseTimer);
        seoCloseTimer = null;
      }
    }

    function closeSeoFaqs() {
      clearSeoCloseTimer();
      seoFaqDetails.forEach((detail) => {
        detail.open = false;
      });
    }

    function openSeoFaq(target: HTMLDetailsElement) {
      clearSeoCloseTimer();
      seoFaqDetails.forEach((detail) => {
        detail.open = detail === target;
      });
    }

    closeSeoFaqs();

    const seoListeners = seoFaqDetails.map((detail) => {
      const summary = detail.querySelector("summary");
      const onEnter = () => openSeoFaq(detail);
      const onLeave = () => {
        clearSeoCloseTimer();
        seoCloseTimer = window.setTimeout(() => {
          if (!detail.matches(":hover")) detail.open = false;
          seoCloseTimer = null;
        }, 100);
      };
      const onClick = (event: Event) => {
        event.preventDefault();
        openSeoFaq(detail);
      };

      detail.addEventListener("mouseenter", onEnter);
      detail.addEventListener("mouseleave", onLeave);
      summary?.addEventListener("click", onClick);

      return { detail, summary, onEnter, onLeave, onClick };
    });

    const onSeoListLeave = () => closeSeoFaqs();
    seoFaqList?.addEventListener("mouseleave", onSeoListLeave);

    // Run after the legacy scroll handler and force a clean closed state unless
    // the pointer is actually over the FAQ section.
    const onScroll = () => {
      window.setTimeout(() => {
        if (!seoFaqList?.matches(":hover")) closeSeoFaqs();
      }, 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      closeTimers.forEach((timer) => window.clearTimeout(timer));
      closeTimers.clear();
      clearSeoCloseTimer();

      if (websiteInput) {
        websiteInput.removeEventListener("blur", normalizeWebsiteInput);
        websiteInput.removeEventListener("change", normalizeWebsiteInput);
        websiteForm?.removeEventListener("submit", normalizeWebsiteInput, true);
      }

      faqListListeners.forEach(
        ({ list, onMouseMove, onMouseLeave, onFocusIn, onFocusOut, onClick }) => {
          list.removeEventListener("mousemove", onMouseMove);
          list.removeEventListener("mouseleave", onMouseLeave);
          list.removeEventListener("focusin", onFocusIn);
          list.removeEventListener("focusout", onFocusOut);
          list.removeEventListener("click", onClick);
        },
      );

      seoListeners.forEach(({ detail, summary, onEnter, onLeave, onClick }) => {
        detail.removeEventListener("mouseenter", onEnter);
        detail.removeEventListener("mouseleave", onLeave);
        summary?.removeEventListener("click", onClick);
      });
      seoFaqList?.removeEventListener("mouseleave", onSeoListLeave);
      window.removeEventListener("scroll", onScroll);
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
        background: linear-gradient(180deg, #ffffff 0%, #fbfcfd 100%) !important;
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
        color: #061827 !important;
        transition: color .18s ease, transform .18s ease, text-shadow .18s ease;
      }

      .broker-official-shell main [class*="faqList"] details[open] summary,
      .broker-official-shell main [class*="faqList"] details:hover summary {
        color: #d89200 !important;
        text-shadow: 0 0 14px rgba(246,167,0,.14);
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
