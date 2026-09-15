"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const CARD_ID = "listing-detail-auto-appraisal";

function buildAppraisalCard() {
  const section = document.createElement("section");
  section.id = CARD_ID;
  section.className = "marketplace-listing-appraisal-card listing-detail-auto-appraisal";
  section.setAttribute("aria-labelledby", `${CARD_ID}-title`);
  section.innerHTML = `
    <img src="/assets/fllm-formal-appraisal-preview-v1.webp" alt="Sample FLLM formal liquor license appraisal report" />
    <div>
      <span>Professional License Valuation</span>
      <h2 id="${CARD_ID}-title">Order a Liquor License Appraisal</h2>
      <p>Get a license-specific valuation supported by county market evidence and regulatory research.</p>
      <a class="marketplace-listing-appraisal-button" href="/florida-liquor-license-appraisal#order-form">Order an Appraisal</a>
      <a class="marketplace-listing-heat-map-link" href="/?open=heat-map">Explore the Florida License Heat Map →</a>
    </div>
  `;
  return section;
}

function syncAppraisalCard() {
  const existing = document.getElementById(CARD_ID);
  const listingPage = document.querySelector(".marketplace-listing-page");

  if (!listingPage) {
    existing?.remove();
    return;
  }

  // Broker listings and FLLM self-directed listings already render their own appraisal card.
  if (
    listingPage.querySelector(".marketplace-listing-aside-broker") ||
    listingPage.querySelector(".fllm-exchange")
  ) {
    existing?.remove();
    return;
  }

  const aside = listingPage.querySelector<HTMLElement>(
    ".marketplace-listing-aside:not(.marketplace-listing-aside-broker)",
  );
  const actionCard = aside?.querySelector<HTMLElement>(".marketplace-listing-action-card");
  if (!aside || !actionCard) return;

  if (!existing) {
    actionCard.insertAdjacentElement("afterend", buildAppraisalCard());
  } else if (existing.previousElementSibling !== actionCard) {
    actionCard.insertAdjacentElement("afterend", existing);
  }
}

export default function ListingDetailAppraisalEnhancement() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith("/listings/") || pathname === "/listings") {
      document.getElementById(CARD_ID)?.remove();
      return;
    }

    syncAppraisalCard();
    const observer = new MutationObserver(syncAppraisalCard);
    observer.observe(document.body, { childList: true, subtree: true });
    const timers = [100, 400, 1000].map((delay) => window.setTimeout(syncAppraisalCard, delay));

    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
      document.getElementById(CARD_ID)?.remove();
    };
  }, [pathname]);

  return null;
}
