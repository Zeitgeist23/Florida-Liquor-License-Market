"use client";

import { useEffect } from "react";

const brokerListingUrl =
  "https://sunshineagle.com/deal-listing/upscale-cocktail-lounge-with-4cop-quota-license/?back=https%3A%2F%2Fsunshineagle.com%2Fpremium-listings%2F&source&listing_button_text=Inquire%20About%20This%20Listing&listing_button_color&css_source=7799&json_url=https://sunshineagle.dealrelations.com/listings/upscale-cocktail-lounge-with-4cop-quota-license.json?item_id=5534";
const brokerPhone = "(941) 416-4580";

function linkDisclosureBrokerName() {
  const paragraph = document.querySelector<HTMLParagraphElement>(
    '.results-page[data-featured-broker-listing="FLLM-ANTEZZA"] .marketplace-listing-note p'
  );
  if (!paragraph || paragraph.querySelector('.sunshineagle-disclosure-link')) return null;

  const targetText = "SUNSHINEAGLE LLC";
  const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();

  while (node) {
    const value = node.textContent ?? "";
    const index = value.indexOf(targetText);
    if (index >= 0) {
      const before = value.slice(0, index);
      const after = value.slice(index + targetText.length);
      const link = document.createElement("a");
      link.className = "sunshineagle-disclosure-link";
      link.href = brokerListingUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = targetText;
      link.setAttribute("aria-label", "View SUNSHINEAGLE LLC cocktail lounge listing");

      const fragment = document.createDocumentFragment();
      if (before) fragment.appendChild(document.createTextNode(before));
      fragment.appendChild(link);
      if (after) fragment.appendChild(document.createTextNode(after));
      node.parentNode?.replaceChild(fragment, node);
      return link;
    }
    node = walker.nextNode();
  }

  return null;
}

function enhanceCallBrokerButtons() {
  const root = document.querySelector<HTMLElement>(
    '.results-page[data-featured-broker-listing="FLLM-ANTEZZA"]'
  );
  if (!root) return;

  root
    .querySelectorAll<HTMLAnchorElement>('.marketplace-listing-primary[href^="tel:"]')
    .forEach((button) => {
      if (button.classList.contains("antezza-call-broker-button")) return;

      button.classList.add("antezza-call-broker-button");
      button.setAttribute(
        "aria-label",
        `Call listing broker Alessandro Antezza at ${brokerPhone}`,
      );

      const label = document.createElement("span");
      label.className = "antezza-call-broker-label";
      label.textContent = "Call Listing Broker";

      const phone = document.createElement("span");
      phone.className = "antezza-call-broker-phone";
      phone.textContent = brokerPhone;
      phone.setAttribute("aria-hidden", "true");

      button.replaceChildren(label, phone);
    });
}

export default function BrokerListingLinkFix() {
  useEffect(() => {
    const sidebarLink = document.querySelector<HTMLAnchorElement>(
      '.marketplace-listing-aside-broker .marketplace-listing-text-link'
    );

    if (sidebarLink) {
      sidebarLink.href = brokerListingUrl;
      sidebarLink.target = "_blank";
      sidebarLink.rel = "noopener noreferrer";
    }

    enhanceCallBrokerButtons();

    const disclosureLink = linkDisclosureBrokerName();
    if (!disclosureLink) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          disclosureLink.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(disclosureLink);
    return () => observer.disconnect();
  }, []);

  return null;
}
