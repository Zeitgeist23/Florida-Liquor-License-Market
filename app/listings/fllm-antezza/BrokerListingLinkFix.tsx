"use client";

import { useEffect } from "react";

const brokerListingUrl =
  "https://sunshineagle.com/deal-listing/upscale-cocktail-lounge-with-4cop-quota-license/?back=https%3A%2F%2Fsunshineagle.com%2Fpremium-listings%2F&source&listing_button_text=Inquire%20About%20This%20Listing&listing_button_color&css_source=7799&json_url=https://sunshineagle.dealrelations.com/listings/upscale-cocktail-lounge-with-4cop-quota-license.json?item_id=5534";

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

function installEmailCopyButton() {
  const emailLink = document.querySelector<HTMLAnchorElement>(
    '.results-page[data-featured-broker-listing="FLLM-ANTEZZA"] .marketplace-listing-broker-contact a[href^="mailto:"]'
  );
  if (!emailLink) return;

  if (emailLink.parentElement?.classList.contains("broker-email-row")) return;

  const row = document.createElement("span");
  row.className = "broker-email-row";
  emailLink.parentNode?.insertBefore(row, emailLink);
  row.appendChild(emailLink);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "broker-email-copy";
  button.setAttribute("aria-label", "Copy broker email address");
  button.setAttribute("title", "Copy email");
  button.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="8" y="8" width="11" height="11" rx="2"></rect>
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path>
    </svg>
    <span class="broker-email-copy-label">Copy</span>
  `;

  const address = emailLink.href.replace(/^mailto:/i, "");
  button.addEventListener("click", async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(address);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = address;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      button.classList.add("is-copied");
      button.setAttribute("aria-label", "Broker email copied");
      button.setAttribute("title", "Copied");
      const label = button.querySelector<HTMLElement>(".broker-email-copy-label");
      if (label) label.textContent = "Copied";

      window.setTimeout(() => {
        button.classList.remove("is-copied");
        button.setAttribute("aria-label", "Copy broker email address");
        button.setAttribute("title", "Copy email");
        if (label) label.textContent = "Copy";
      }, 1600);
    } catch {
      button.setAttribute("title", "Copy unavailable");
    }
  });

  row.appendChild(button);
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

    installEmailCopyButton();

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
