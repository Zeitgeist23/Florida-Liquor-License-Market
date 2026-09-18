"use client";

import { useEffect } from "react";

const FAQ_CONTEXT_SELECTOR =
  '[class*="faq" i], [id*="faq" i], [aria-label*="faq" i], [aria-label*="question" i]';

const FAQ_EXCLUDE_SELECTOR =
  '.quota-privacy-disclosure, .portal-version-history, [data-fllm-faq-hover="off"]';

function summaryFor(details: HTMLDetailsElement) {
  return details.querySelector<HTMLElement>(":scope > summary");
}

function isFaqDetails(details: HTMLDetailsElement) {
  if (details.matches(FAQ_EXCLUDE_SELECTOR)) return false;

  const parentContext = details.parentElement?.closest(FAQ_CONTEXT_SELECTOR);
  if (parentContext) return true;

  const summary = summaryFor(details);
  const text = summary?.textContent?.trim() || "";
  return /[?？]\s*$/.test(text);
}

function countFaqDetails(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLDetailsElement>("details")).filter(
    isFaqDetails,
  ).length;
}

function groupFor(details: HTMLDetailsElement): HTMLElement | null {
  const namedContext = details.parentElement?.closest<HTMLElement>(
    FAQ_CONTEXT_SELECTOR,
  );
  if (namedContext) return namedContext;

  let node = details.parentElement;
  let fallback = node;

  while (node && node !== document.body) {
    if (countFaqDetails(node) >= 2) return node;
    if (node.matches("section, aside, article")) {
      fallback = node;
      break;
    }
    if (node.matches("main")) break;
    node = node.parentElement;
  }

  return fallback;
}

function detailsFor(group: HTMLElement) {
  return Array.from(group.querySelectorAll<HTMLDetailsElement>("details")).filter(
    (details) => isFaqDetails(details) && groupFor(details) === group,
  );
}

export default function UniversalFaqHoverBehavior() {
  useEffect(() => {
    const hoverMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const wired = new Map<
      HTMLElement,
      {
        onMouseMove: (event: MouseEvent) => void;
        onMouseLeave: () => void;
        onFocusIn: (event: FocusEvent) => void;
        onFocusOut: (event: FocusEvent) => void;
        onClick: (event: MouseEvent) => void;
      }
    >();
    const closeTimers = new Map<HTMLElement, number>();

    function clearCloseTimer(group: HTMLElement) {
      const timer = closeTimers.get(group);
      if (timer !== undefined) {
        window.clearTimeout(timer);
        closeTimers.delete(group);
      }
    }

    function closeGroup(group: HTMLElement) {
      clearCloseTimer(group);
      detailsFor(group).forEach((details) => {
        details.open = false;
      });
    }

    function scheduleClose(group: HTMLElement, delay = 90) {
      clearCloseTimer(group);
      closeTimers.set(
        group,
        window.setTimeout(() => {
          closeGroup(group);
          closeTimers.delete(group);
        }, delay),
      );
    }

    function openOnly(group: HTMLElement, target: HTMLDetailsElement) {
      clearCloseTimer(group);
      detailsFor(group).forEach((details) => {
        details.open = details === target;
      });
    }

    function wireGroup(group: HTMLElement) {
      if (wired.has(group)) return;

      closeGroup(group);

      const onMouseMove = (event: MouseEvent) => {
        if (!hoverMedia.matches) return;
        const target = event.target;
        if (!(target instanceof Element)) return;

        const details = target.closest("details");
        if (
          details instanceof HTMLDetailsElement &&
          group.contains(details) &&
          isFaqDetails(details) &&
          groupFor(details) === group
        ) {
          openOnly(group, details);
          return;
        }

        scheduleClose(group);
      };

      const onMouseLeave = () => {
        if (!hoverMedia.matches) return;
        closeGroup(group);
      };

      const onFocusIn = (event: FocusEvent) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const details = target.closest("details");
        if (
          details instanceof HTMLDetailsElement &&
          group.contains(details) &&
          isFaqDetails(details) &&
          groupFor(details) === group
        ) {
          openOnly(group, details);
        }
      };

      const onFocusOut = (event: FocusEvent) => {
        const next = event.relatedTarget as Node | null;
        if (!next || !group.contains(next)) scheduleClose(group, 0);
      };

      const onClick = (event: MouseEvent) => {
        if (!hoverMedia.matches || event.detail === 0) return;

        const target = event.target;
        if (!(target instanceof Element)) return;

        const summary = target.closest("summary");
        if (!(summary instanceof HTMLElement) || !group.contains(summary)) return;

        const details = summary.parentElement;
        if (
          !(details instanceof HTMLDetailsElement) ||
          !isFaqDetails(details) ||
          groupFor(details) !== group
        ) {
          return;
        }

        event.preventDefault();
        openOnly(group, details);
      };

      group.addEventListener("mousemove", onMouseMove);
      group.addEventListener("mouseleave", onMouseLeave);
      group.addEventListener("focusin", onFocusIn);
      group.addEventListener("focusout", onFocusOut);
      group.addEventListener("click", onClick);

      wired.set(group, {
        onMouseMove,
        onMouseLeave,
        onFocusIn,
        onFocusOut,
        onClick,
      });
    }

    function unwireGroup(group: HTMLElement) {
      const listeners = wired.get(group);
      if (!listeners) return;

      clearCloseTimer(group);
      group.removeEventListener("mousemove", listeners.onMouseMove);
      group.removeEventListener("mouseleave", listeners.onMouseLeave);
      group.removeEventListener("focusin", listeners.onFocusIn);
      group.removeEventListener("focusout", listeners.onFocusOut);
      group.removeEventListener("click", listeners.onClick);
      wired.delete(group);
    }

    function wireAll() {
      const groups = new Set<HTMLElement>();

      document
        .querySelectorAll<HTMLDetailsElement>("details")
        .forEach((details) => {
          if (!isFaqDetails(details)) return;
          const group = groupFor(details);
          if (group) groups.add(group);
        });

      groups.forEach(wireGroup);

      Array.from(wired.keys()).forEach((group) => {
        if (!document.contains(group) || !groups.has(group)) unwireGroup(group);
      });
    }

    wireAll();

    const observer = new MutationObserver(() => wireAll());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      closeTimers.forEach((timer) => window.clearTimeout(timer));
      closeTimers.clear();
      Array.from(wired.keys()).forEach(unwireGroup);
    };
  }, []);

  return null;
}
