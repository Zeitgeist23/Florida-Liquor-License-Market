"use client";

import { useEffect } from "react";

const NATIONAL_MARKETPLACE_URL = "https://liquorlicensemarket.com/";
const FLLM_PHONE_HREF = "tel:+14075895522";
const FLLM_PHONE_LABEL = "(407) 589-5522";

function footerAlreadyHasNationalMarketplaceLink(footer: HTMLElement) {
  if (footer.querySelector("[data-national-marketplace-footer-link]")) return true;

  const existingNationalLink = footer.querySelector<HTMLAnchorElement>(
    'a[href^="https://liquorlicensemarket.com"], a[href^="https://www.liquorlicensemarket.com"]',
  );

  if (existingNationalLink) return true;

  return footer.textContent?.includes("Looking for a liquor license outside Florida?") ?? false;
}

function footerAlreadyHasFllmPhone(footer: HTMLElement) {
  if (footer.querySelector("[data-fllm-footer-phone]")) return true;
  if (footer.querySelector('a[href="tel:+14075895522"], a[href="tel:4075895522"]')) return true;
  return footer.textContent?.includes(FLLM_PHONE_LABEL) ?? false;
}

function smallestCopyrightElement(footer: HTMLElement) {
  const candidates = Array.from(
    footer.querySelectorAll<HTMLElement>("span, small, p, div"),
  ).filter((element) =>
    /©(?:\s+2026)?\s+Florida Liquor License Market/i.test(
      element.textContent?.trim() ?? "",
    ),
  );

  candidates.sort(
    (left, right) =>
      (left.textContent?.length ?? Number.MAX_SAFE_INTEGER) -
      (right.textContent?.length ?? Number.MAX_SAFE_INTEGER),
  );

  return candidates[0] ?? null;
}

function installFllmFooterPhone() {
  document.querySelectorAll<HTMLElement>("footer").forEach((footer) => {
    if (footerAlreadyHasFllmPhone(footer)) return;

    const phone = document.createElement("a");
    phone.href = FLLM_PHONE_HREF;
    phone.textContent = FLLM_PHONE_LABEL;
    phone.className = "fllm-footer-phone";
    phone.dataset.fllmFooterPhone = "true";
    phone.setAttribute(
      "aria-label",
      "Call Florida Liquor License Market at 407 589 5522",
    );

    const copyright = smallestCopyrightElement(footer);
    if (copyright) {
      if (copyright.classList.contains("copyright")) {
        copyright.appendChild(phone);
      } else {
        copyright.insertAdjacentElement("afterend", phone);
      }
      return;
    }

    const brand = footer.querySelector<HTMLElement>(
      ".directory-footer-brand, .listings-directory-footer-brand, .footer-brand, .es-footer > div:first-child",
    );
    if (brand) {
      brand.appendChild(phone);
      return;
    }

    const row = document.createElement("div");
    row.className = "fllm-footer-phone-row";
    row.appendChild(phone);

    const nationalLink = footer.querySelector(
      "[data-national-marketplace-footer-link]",
    );
    if (nationalLink) footer.insertBefore(row, nationalLink);
    else footer.appendChild(row);
  });
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

function installFooterEnhancements() {
  installFllmFooterPhone();
  installNationalMarketplaceFooterLink();
}

export default function NationalMarketplaceFooterLink() {
  useEffect(() => {
    installFooterEnhancements();

    const observer = new MutationObserver(installFooterEnhancements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
