"use client";

import { useEffect } from "react";

const ITEMS = [
  { label: "Quota Lottery Entry", href: "/florida-liquor-license-lottery" },
  { label: "News & Insights", href: "/florida-liquor-license-news" },
] as const;

function normalizedText(element: Element | null) {
  return (element?.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function syncMenu() {
  const menu = document.querySelector<HTMLElement>('[data-listings-header-dropdown="market-data"]');
  if (!menu) return false;

  const heatMapButton = Array.from(menu.querySelectorAll(":scope > button"))
    .find((button) => /heat map/i.test(button.textContent || "")) || null;

  ITEMS.forEach((item) => {
    const existing = Array.from(menu.querySelectorAll(":scope > a"))
      .find((candidate) => normalizedText(candidate) === item.label.toLowerCase()) as HTMLAnchorElement | undefined;

    if (existing) {
      if (existing.getAttribute("href") !== item.href) existing.href = item.href;
      return;
    }

    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    link.setAttribute("role", "menuitem");
    link.dataset.listingsMarketMenuSync = item.label.toLowerCase().replace(/\s+/g, "-");

    if (heatMapButton) menu.insertBefore(link, heatMapButton);
    else menu.appendChild(link);
  });

  return true;
}

export default function ListingsMarketMenuSync() {
  useEffect(() => {
    syncMenu();

    const observer = new MutationObserver(() => {
      syncMenu();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const retries = [250, 700, 1400, 2400].map((delay) => window.setTimeout(syncMenu, delay));
    return () => {
      observer.disconnect();
      retries.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return null;
}
