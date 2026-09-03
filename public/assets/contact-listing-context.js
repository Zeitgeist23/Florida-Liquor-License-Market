(() => {
  if (window.__FLLM_CONTACT_LISTING_CONTEXT_V4__) return;
  window.__FLLM_CONTACT_LISTING_CONTEXT_V4__ = true;

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
  let applying = false;

  function setSelectValue(select, value) {
    if (!(select instanceof HTMLSelectElement) || !value) return false;
    const option = Array.from(select.options).find(
      (candidate) => candidate.value === value || candidate.textContent?.trim() === value,
    );
    if (!option || select.value === option.value) return false;

    select.value = option.value;
    select.dispatchEvent(new Event("input", { bubbles: true }));
    select.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }

  function ensureHidden(form, name, value) {
    if (!value) return false;
    let input = form.querySelector(`input[name="${name}"]`);
    let changed = false;

    if (!(input instanceof HTMLInputElement)) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      form.appendChild(input);
      changed = true;
    }

    if (input.value !== value) {
      input.value = value;
      changed = true;
    }
    return changed;
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

  function syncListingFields(form) {
    const listingSummary = selectedLicenseSummary();
    ensureHidden(form, "listing_reference", context.reference);
    ensureHidden(form, "listing_requested", context.listing || listingSummary);
    ensureHidden(form, "listing_county", context.county);
    ensureHidden(form, "license_type", context.licenseType);
    ensureHidden(form, "asking_price", context.askingPrice);
    ensureHidden(form, "listing_status", context.status);
    ensureHidden(form, "listing_url", listingPath);
  }

  function installSubmitSync(form) {
    if (form.dataset.fllmListingSubmitSync === "true") return;
    form.dataset.fllmListingSubmitSync = "true";
    form.addEventListener("submit", () => syncListingFields(form), true);
  }

  function applyContext() {
    if (applying) return false;
    applying = true;

    try {
      const form = document.querySelector("form.contact-page-form");
      if (!(form instanceof HTMLFormElement)) return false;

      const formHeading = form.querySelector(".seller-form-heading h2");
      if (formHeading && formHeading.textContent?.trim() !== "Inquire About This License") {
        formHeading.textContent = "Inquire About This License";
      }

      let panel = form.querySelector('[data-fllm-listing-context="true"]');
      if (!panel) {
        panel = buildContextPanel();
        const headingBlock = form.querySelector(".seller-form-heading");
        if (headingBlock) headingBlock.insertAdjacentElement("afterend", panel);
        else form.prepend(panel);
      }

      syncListingFields(form);
      installSubmitSync(form);

      const subject = form.querySelector('input[name="_subject"]');
      const subjectValue = context.reference
        ? `FLLM License Inquiry — ${context.reference}`
        : "Florida Liquor License Market — Specific License Inquiry";
      if (subject instanceof HTMLInputElement && subject.value !== subjectValue) {
        subject.value = subjectValue;
      }

      setSelectValue(form.querySelector('select[name="inquiry_type"]'), "Buy a License");
      setSelectValue(form.querySelector('select[name="preferred_county"]'), context.county);

      const phone = form.querySelector('input[name="phone"]');
      if (phone instanceof HTMLInputElement) {
        phone.required = true;
        const phoneLabel = phone.closest("label")?.querySelector("span");
        if (phoneLabel && phoneLabel.textContent?.trim() === "Phone") {
          phoneLabel.textContent = "Phone *";
        }
      }

      const message = form.querySelector('textarea[name="message"]');
      if (message instanceof HTMLTextAreaElement && !message.value.trim()) {
        message.value = defaultMessage();
        message.dispatchEvent(new Event("input", { bubbles: true }));
      }

      return Boolean(form.querySelector('[data-fllm-listing-context="true"]'));
    } finally {
      applying = false;
    }
  }

  function startAfterHydration() {
    const attempts = [0, 350, 1100, 2600];
    attempts.forEach((delay) => window.setTimeout(applyContext, delay));
  }

  function scheduleStart() {
    // The contact page is hydrated by its existing React bundle. Waiting until
    // after window.load prevents this enhancement from changing server HTML
    // before React has attached to it, while the later retries restore context
    // if React replaces any form nodes during its initial render.
    window.setTimeout(startAfterHydration, 450);
  }

  if (document.readyState === "complete") {
    scheduleStart();
  } else {
    window.addEventListener("load", scheduleStart, { once: true });
  }
})();
