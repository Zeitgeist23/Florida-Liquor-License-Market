"use client";

import { useEffect } from "react";

const TARGET = "/market-data/heat-map";

function textOf(element: Element | null) {
  return (element?.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function isListingsHeatMapControl(element: Element | null) {
  if (!element) return false;
  const control = element.closest("a,button");
  if (!control || !/heat map/i.test(control.textContent || "")) return false;
  return Boolean(
    control.closest('[data-listings-header-dropdown="market-data"]') ||
    control.closest(".market-data-header-menu") ||
    control.closest(".results-page > .results-header")
  );
}

function rewriteLinks() {
  const isHomePage = window.location.pathname === "/";

  document.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
    const label = textOf(link);
    const href = link.getAttribute("href") || "";

    // Keep the landing-page Heat Map control available as a quick-preview modal.
    // Everywhere else, Heat Map opens the dedicated three-mode market-data page.
    if (!isHomePage && (
      label === "florida market heat map" ||
      label === "heat map" ||
      (label.includes("heat map") && href === "/#market-data")
    )) {
      if (link.getAttribute("href") !== TARGET) link.setAttribute("href", TARGET);
    }

    // The landing-page modal remains a quick preview; its full-page action opens
    // the new canonical Heat Map page instead of dropping users into Listings.
    if (link.closest(".fllm-heat-map-footer") && /open full listings page/i.test(link.textContent || "")) {
      if (link.getAttribute("href") !== TARGET) link.setAttribute("href", TARGET);
      if (link.textContent !== "Open Full Heat Map Page ›") link.textContent = "Open Full Heat Map Page ›";
    }
  });
}

export default function HeatMapLinkNormalizer() {
  useEffect(() => {
    rewriteLinks();

    const clickHandler = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!isListingsHeatMapControl(target)) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      window.location.assign(TARGET);
    };

    document.addEventListener("click", clickHandler, true);

    const observer = new MutationObserver(() => rewriteLinks());
    observer.observe(document.documentElement, { childList: true, subtree: true });

    const retries = [100, 400, 1000, 2000].map((delay) => window.setTimeout(rewriteLinks, delay));

    return () => {
      document.removeEventListener("click", clickHandler, true);
      observer.disconnect();
      retries.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return null;
}
