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
    width: "22px",
    height: "22px",
    marginLeft: "7px",
    padding: "0",
    border: "1px solid rgba(241,166,0,.72)",
    borderRadius: "4px",
    background: "rgba(241,166,0,.08)",
    color: "#f1a600",
    fontSize: "14px",
    fontWeight: "900",
    lineHeight: "1",
    verticalAlign: "middle",
    cursor: "pointer",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.06)",
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
  emailLink.insertAdjacentElement("afterend", button);
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

    // Configure once after hydration. Do not observe the page and rewrite these
    // elements continuously; that created a self-triggering DOM mutation loop
    // that could peg the main thread and make Chrome report the page unresponsive.
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
