"use client";

import { useEffect } from "react";

const NATIONAL_MARKETPLACE_URL = "https://liquorlicensemarket.com/";

function footerAlreadyHasNationalMarketplaceLink(footer: HTMLElement) {
  if (footer.querySelector("[data-national-marketplace-footer-link]")) return true;

  const existingNationalLink = footer.querySelector<HTMLAnchorElement>(
    'a[href^="https://liquorlicensemarket.com"], a[href^="https://www.liquorlicensemarket.com"]',
  );

  if (existingNationalLink) return true;

  return footer.textContent?.includes("Looking for a liquor license outside Florida?") ?? false;
}

function installNationalMarketplaceFooterLink() {
  document.querySelectorAll<HTMLElement>("footer").forEach((footer) => {
    if (footerAlreadyHasNationalMarketplaceLink(footer)) return;

    const row = document.createElement("div");
    row.className = "national-marketplace-footer-link";
    row.dataset.nationalMarketplaceFooterLink = "true";

    const prompt = document.createElement("span");
    prompt.textContent = "Looking for a liquor license outside Florida?";

    const link = document.createElement("a");
    link.href = NATIONAL_MARKETPLACE_URL;
    link.textContent = "Visit Liquor License Market — The National Marketplace.";
    link.setAttribute("aria-label", "Visit Liquor License Market, the national marketplace");

    row.append(prompt, link);

    const copyright = footer.querySelector(".copyright");
    if (copyright) footer.insertBefore(row, copyright);
    else footer.appendChild(row);
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
