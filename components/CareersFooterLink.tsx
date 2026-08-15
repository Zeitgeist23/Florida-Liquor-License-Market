"use client";

import { useEffect } from "react";

const NATIONAL_MARKETPLACE_URL = "https://www.liquorlicensemarket.com/";

export default function CareersFooterLink() {
  useEffect(() => {
    const applyHomepageLinks = () => {
      const companySections = Array.from(document.querySelectorAll<HTMLElement>("footer .footer-grid > div"));
      const companySection = companySections.find((section) =>
        section.querySelector(":scope > strong")?.textContent?.trim().toLowerCase() === "company"
      );

      if (companySection) {
        if (!companySection.querySelector('a[data-national-marketplace-company-link="true"]')) {
          const nationalLink = document.createElement("a");
          nationalLink.href = NATIONAL_MARKETPLACE_URL;
          nationalLink.textContent = "National Liquor License Markets";
          nationalLink.dataset.nationalMarketplaceCompanyLink = "true";
          const careersLink = companySection.querySelector('a[href="/careers"]');
          companySection.insertBefore(nationalLink, careersLink);
        }

        if (!companySection.querySelector('a[href="/careers"]')) {
          const careersLink = document.createElement("a");
          careersLink.href = "/careers";
          careersLink.textContent = "Careers";
          companySection.appendChild(careersLink);
        }
      }

      const cta = document.querySelector<HTMLElement>(".cta#sell");
      if (cta && !document.querySelector('[data-national-marketplace-prompt="true"]')) {
        const prompt = document.createElement("aside");
        prompt.dataset.nationalMarketplacePrompt = "true";
        prompt.setAttribute("aria-label", "National liquor license markets");
        prompt.style.cssText = "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin:0 0 12px;padding:13px 18px;border:1px solid rgba(246,167,0,.46);border-radius:7px;background:#f7f2e7;color:#0b1725";
        prompt.innerHTML = '<span><strong style="display:block;font-size:14px">Looking for a liquor license outside Florida?</strong><small style="display:block;margin-top:3px;color:#4a5864;font-size:10px;line-height:1.4">Explore active markets across the United States on Liquor License Market.</small></span><a href="' + NATIONAL_MARKETPLACE_URL + '" style="color:#8f5f00;font-size:10px;font-weight:900;letter-spacing:.04em;text-transform:uppercase">Explore National Markets ›</a>';
        cta.parentElement?.insertBefore(prompt, cta);
      }
    };

    applyHomepageLinks();
    const observer = new MutationObserver(applyHomepageLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
