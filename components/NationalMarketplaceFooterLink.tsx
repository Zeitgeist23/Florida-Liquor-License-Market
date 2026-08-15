"use client";

import { useEffect } from "react";

const NATIONAL_MARKETPLACE_URL = "https://liquorlicensemarket.com/";
const NATIONAL_MARKETPLACE_SELECTOR = "[data-national-marketplace-footer-link]";

function installNationalMarketplaceFooterLink() {
  document.querySelectorAll<HTMLElement>("footer").forEach((footer) => {
    const companyColumn = Array.from(footer.querySelectorAll<HTMLElement>(".footer-grid > div"))
      .find((column) => column.querySelector(":scope > strong")?.textContent?.trim().toLowerCase() === "company");
    if (!companyColumn) return;

    const existing = footer.querySelector<HTMLElement>(NATIONAL_MARKETPLACE_SELECTOR);
    let link: HTMLAnchorElement;
    if (existing instanceof HTMLAnchorElement) {
      link = existing;
    } else {
      existing?.remove();
      link = document.createElement("a");
    }

    link.dataset.nationalMarketplaceFooterLink = "true";
    link.href = NATIONAL_MARKETPLACE_URL;
    link.textContent = "National Marketplace";
    link.setAttribute("aria-label", "Visit Liquor License Market, the national marketplace");

    if (companyColumn.lastElementChild !== link) companyColumn.appendChild(link);
  });
}

export default function NationalMarketplaceFooterLink() {
  useEffect(() => {
    installNationalMarketplaceFooterLink();

    const observer = new MutationObserver(installNationalMarketplaceFooterLink);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
