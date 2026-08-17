(() => {
  const params = new URLSearchParams(window.location.search);
  const context = {
    reference: (params.get("ref") || "").trim(),
    listing: (params.get("listing") || "").trim(),
    county: (params.get("county") || "").trim(),
    licenseType: (params.get("license_type") || "").trim(),
    askingPrice: (params.get("asking_price") || "").trim(),
    status: (params.get("listing_status") || "").trim(),
    listingUrl: (params.get("listing_url") || "").trim(),
  };

  const hasListingContext = Boolean(
    context.reference ||
    context.listing ||
    (context.county && context.licenseType),
  );

  if (!hasListingContext) return;

  function safeListingPath(value) {
    if (!value) return "";
    try {
      const url = new URL(value, window.location.origin);
      if (url.origin !== window.location.origin || !url.pathname.startsWith("/listings/")) return "";
      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return "";
    }
  }

  const listingPath = safeListingPath(context.listingUrl);

  function setSelectValue(select, value) {
    if (!(select instanceof HTMLSelectElement) || !value) return;
    const option = Array.from(select.options).find(
      (candidate) => candidate.value === value || candidate.textContent?.trim() === value,
    );
    if (!option) return;
    select.value = option.value;
    select.dispatchEvent(new Event("input", { bubbles: true }));
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function ensureHidden(form, name, value) {
    if (!value) return;
    let input = form.querySelector(`input[name="${name}"]`);
    if (!(input instanceof HTMLInputElement)) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
  }

  function detailItem(label, value) {
    if (!value) return null;
    const item = document.createElement("div");
    const caption = document.createElement("span");
    const detail = document.createElement("strong");
    caption.textContent = label;
    detail.textContent = value;
    item.append(caption, detail);
    return item;
  }

  function selectedLicenseSummary() {
    return [
      context.reference,
      context.county,
      context.licenseType,
      context.askingPrice,
    ].filter(Boolean).join(" — ") || context.listing;
  }

  function defaultMessage() {
    const summary = selectedLicenseSummary();
    return summary
      ? `I am interested in ${summary}. Please contact me with current availability and additional details about this specific license.`
      : "I am interested in the selected liquor license. Please contact me with current availability and additional details.";
  }

  function buildContextPanel() {
    const panel = document.createElement("section");
    panel.className = "contact-license-context";
    panel.dataset.fllmListingContext = "true";
    panel.setAttribute("aria-label", "Selected license details");

    const heading = document.createElement("div");
    heading.className = "contact-license-context-heading";
    const eyebrow = document.createElement("span");
    eyebrow.textContent = "Selected License";
    const title = document.createElement("h3");
    title.textContent = context.county && context.licenseType
      ? `${context.county} · ${context.licenseType}`
      : context.listing || context.reference || "Specific Florida Liquor License";
    heading.append(eyebrow, title);

    const grid = document.createElement("div");
    grid.className = "contact-license-context-grid";
    [
      detailItem("Listing Reference", context.reference),
      detailItem("Asking Price", context.askingPrice),
      detailItem("County", context.county),
      detailItem("License Type", context.licenseType),
      detailItem("Status", context.status),
    ].filter(Boolean).forEach((item) => grid.appendChild(item));

    const note = document.createElement("p");
    note.textContent = "These specific license details will be included with your confidential inquiry.";

    panel.append(heading, grid, note);

    if (listingPath) {
      const link = document.createElement("a");
      link.href = listingPath;
      link.textContent = "Return to this license page →";
      panel.appendChild(link);
    }

    return panel;
  }

  function applyContext() {
    const form = document.querySelector("form.contact-page-form");
    if (!(form instanceof HTMLFormElement)) return false;

    const formHeading = form.querySelector(".seller-form-heading h2");
    if (formHeading) formHeading.textContent = "Inquire About This License";

    let panel = form.querySelector('[data-fllm-listing-context="true"]');
    if (!panel) {
      panel = buildContextPanel();
      const headingBlock = form.querySelector(".seller-form-heading");
      if (headingBlock) headingBlock.insertAdjacentElement("afterend", panel);
      else form.prepend(panel);
    }

    const listingSummary = selectedLicenseSummary();
    ensureHidden(form, "listing_reference", context.reference);
    ensureHidden(form, "listing_requested", context.listing || listingSummary);
    ensureHidden(form, "listing_county", context.county);
    ensureHidden(form, "license_type", context.licenseType);
    ensureHidden(form, "asking_price", context.askingPrice);
    ensureHidden(form, "listing_status", context.status);
    ensureHidden(form, "listing_url", listingPath);

    const subject = form.querySelector('input[name="_subject"]');
    if (subject instanceof HTMLInputElement) {
      subject.value = context.reference
        ? `FLLM License Inquiry — ${context.reference}`
        : "Florida Liquor License Market — Specific License Inquiry";
    }

    setSelectValue(form.querySelector('select[name="inquiry_type"]'), "Buy a License");
    setSelectValue(form.querySelector('select[name="preferred_county"]'), context.county);

    const message = form.querySelector('textarea[name="message"]');
    if (message instanceof HTMLTextAreaElement && !message.value.trim()) {
      message.value = defaultMessage();
      message.dispatchEvent(new Event("input", { bubbles: true }));
    }

    return true;
  }

  function start() {
    applyContext();
    [120, 450, 1100, 2200].forEach((delay) => window.setTimeout(applyContext, delay));

    const observer = new MutationObserver(() => applyContext());
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
