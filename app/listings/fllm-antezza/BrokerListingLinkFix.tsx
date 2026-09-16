"use client";

import { useEffect } from "react";

const brokerListingUrl =
  "https://sunshineagle.com/deal-listing/upscale-cocktail-lounge-with-4cop-quota-license/?back=https%3A%2F%2Fsunshineagle.com%2Fpremium-listings%2F&source&listing_button_text=Inquire%20About%20This%20Listing&listing_button_color&css_source=7799&json_url=https://sunshineagle.dealrelations.com/listings/upscale-cocktail-lounge-with-4cop-quota-license.json?item_id=5534";
const brokerPhone = "(941) 416-4580";
const brokerEmail = "info@sunshineagle.com";

const inquiryParams = new URLSearchParams({
  source: "specific-license",
  listing: "FLLM-ANTEZZA — Pinellas County — 4COP Quota — $495,000",
  ref: "FLLM-ANTEZZA",
  county: "Pinellas County",
  license_type: "4COP Quota",
  asking_price: "$495,000",
  listing_status: "Available / Broker confirmation required",
  listing_url: "/listings/fllm-antezza",
});
const inquiryHref = `/contact?${inquiryParams.toString()}`;

function linkDisclosureBrokerName() {
  const paragraph = document.querySelector<HTMLParagraphElement>(
    '.results-page[data-featured-broker-listing="FLLM-ANTEZZA"] .marketplace-listing-note p',
  );
  if (!paragraph || paragraph.querySelector(".sunshineagle-disclosure-link")) return null;

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

function configureListingButtons(root: HTMLElement) {
  const inquiryButton = root.querySelector<HTMLAnchorElement>(
    ".marketplace-listing-actions .marketplace-listing-primary",
  );

  if (inquiryButton) {
    inquiryButton.classList.remove("antezza-call-broker-button");
    inquiryButton.href = inquiryHref;
    if (inquiryButton.textContent?.trim() !== "Inquire About This License") {
      inquiryButton.textContent = "Inquire About This License";
    }
    inquiryButton.setAttribute(
      "aria-label",
      "Open the FLLM inquiry screen for this Pinellas County 4COP quota liquor license",
    );
  }

  const callButton = root.querySelector<HTMLAnchorElement>(
    '.marketplace-listing-aside-broker .marketplace-listing-primary[href^="tel:"]',
  );

  if (!callButton) return;

  callButton.classList.add("antezza-call-broker-button");
  callButton.setAttribute(
    "aria-label",
    `Call listing broker Alessandro Antezza at ${brokerPhone}`,
  );

  const existingLabel = callButton.querySelector<HTMLElement>(
    ".antezza-call-broker-label",
  );
  const existingPhone = callButton.querySelector<HTMLElement>(
    ".antezza-call-broker-phone",
  );

  if (existingLabel && existingPhone) {
    existingLabel.textContent = "Call Listing Broker";
    existingPhone.textContent = brokerPhone;
    return;
  }

  const label = document.createElement("span");
  label.className = "antezza-call-broker-label";
  label.textContent = "Call Listing Broker";

  const phone = document.createElement("span");
  phone.className = "antezza-call-broker-phone";
  phone.textContent = brokerPhone;
  phone.setAttribute("aria-hidden", "true");

  callButton.replaceChildren(label, phone);
}

function installEmailCopyButton(root: HTMLElement) {
  const emailLink = root.querySelector<HTMLAnchorElement>(
    '.marketplace-listing-aside-broker a[href^="mailto:"]',
  );
  if (!emailLink || root.querySelector(".antezza-copy-email-button")) return;

  const row = document.createElement("span");
  row.className = "antezza-email-copy-row";
  Object.assign(row.style, {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    width: "fit-content",
    maxWidth: "100%",
  });

  const parent = emailLink.parentNode;
  if (!parent) return;
  parent.insertBefore(row, emailLink);
  row.appendChild(emailLink);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "antezza-copy-email-button";
  button.textContent = "⧉";
  button.title = "Copy broker email";
  button.setAttribute("aria-label", `Copy broker email address ${brokerEmail}`);
  Object.assign(button.style, {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",
    width: "16px",
    height: "16px",
    margin: "0",
    padding: "0",
    border: "0",
    borderRadius: "0",
    background: "transparent",
    color: "#f1a600",
    fontSize: "13px",
    fontWeight: "900",
    lineHeight: "1",
    cursor: "pointer",
    boxShadow: "none",
    appearance: "none",
  });

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(brokerEmail);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = brokerEmail;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      button.textContent = "✓";
      button.title = "Copied";
      window.setTimeout(() => {
        button.textContent = "⧉";
        button.title = "Copy broker email";
      }, 1400);
    } catch {
      button.textContent = "!";
      button.title = "Copy failed";
      window.setTimeout(() => {
        button.textContent = "⧉";
        button.title = "Copy broker email";
      }, 1400);
    }
  };

  button.addEventListener("click", copyEmail);
  row.appendChild(button);
}

export default function BrokerListingLinkFix() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(
      '.results-page[data-featured-broker-listing="FLLM-ANTEZZA"]',
    );
    if (!root) return;

    const sidebarLink = root.querySelector<HTMLAnchorElement>(
      ".marketplace-listing-aside-broker .marketplace-listing-text-link",
    );

    if (sidebarLink) {
      sidebarLink.href = brokerListingUrl;
      sidebarLink.target = "_blank";
      sidebarLink.rel = "noopener noreferrer";
    }

    configureListingButtons(root);
    installEmailCopyButton(root);

    const disclosureLink = linkDisclosureBrokerName();
    let intersectionObserver: IntersectionObserver | null = null;

    if (disclosureLink) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            disclosureLink.classList.toggle("is-visible", entry.isIntersecting);
          });
        },
        { threshold: 0.35 },
      );
      intersectionObserver.observe(disclosureLink);
    }

    return () => {
      intersectionObserver?.disconnect();
    };
  }, []);

  return null;
}
