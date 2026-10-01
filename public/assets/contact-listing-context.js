(() => {
  if (window.__FLLM_CONTACT_LISTING_CONTEXT_V5__) return;
  window.__FLLM_CONTACT_LISTING_CONTEXT_V5__ = true;

  const params = new URLSearchParams(window.location.search);
  const context = {
    source: (params.get("source") || "").trim(),
    reference: (params.get("ref") || "").trim(),
    listing: (params.get("listing") || "").trim(),
    county: (params.get("county") || "").trim(),
    licenseType: (params.get("license_type") || "").trim(),
    businessType: (params.get("business_type") || "").trim(),
    askingPrice: (params.get("asking_price") || "").trim(),
    status: (params.get("listing_status") || "").trim(),
    listingUrl: (params.get("listing_url") || "").trim(),
  };

  const isFeaturedBusinessPackage = context.source === "featured-business-package";

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
    if (isFeaturedBusinessPackage) {
      const businessAndLicense = [context.businessType, context.licenseType]
        .filter(Boolean)
        .join(" + ");
      return businessAndLicense
        ? `I am interested in this ${businessAndLicense} business package in ${context.county || "Florida"} at ${context.askingPrice || "the listed asking price"}. Please contact me with current availability and additional details about this featured business package.`
        : summary
          ? `I am interested in ${summary}. Please contact me with current availability and additional details about this featured business package.`
          : "I am interested in the featured business package. Please contact me with current availability and additional details.";
    }
    return summary
      ? `I am interested in ${summary}. Please contact me with current availability and additional details about this specific license.`
      : "I am interested in the selected liquor license. Please contact me with current availability and additional details.";
  }

  function buildContextPanel() {
    const panel = document.createElement("section");
    panel.className = "contact-license-context";
    panel.dataset.fllmListingContext = "true";
    panel.setAttribute("aria-label", isFeaturedBusinessPackage ? "Selected business package details" : "Selected license details");

    const heading = document.createElement("div");
    heading.className = "contact-license-context-heading";
    const eyebrow = document.createElement("span");
    eyebrow.textContent = isFeaturedBusinessPackage ? "Selected Business Package" : "Selected License";
    const title = document.createElement("h3");
    const titleText = context.county && context.licenseType
      ? `${context.county} · ${context.licenseType}`
      : context.listing || context.reference || "Specific Florida Liquor License";
    titleText.split(/(4(?=COP))/g).forEach((part) => {
      if (part === "4") {
        const uprightFour = document.createElement("span");
        uprightFour.className = "contact-upright-four-cop";
        uprightFour.textContent = "4";
        title.appendChild(uprightFour);
      } else {
        title.appendChild(document.createTextNode(part));
      }
    });
    heading.append(eyebrow, title);

    const grid = document.createElement("div");
    grid.className = "contact-license-context-grid";
    [
      detailItem("Listing Reference", context.reference),
      detailItem("Asking Price", context.askingPrice),
      detailItem("County", context.county),
      detailItem("Business Type", context.businessType),
      detailItem("License Type", context.licenseType),
      detailItem("Status", context.status),
    ].filter(Boolean).forEach((item) => grid.appendChild(item));

    const note = document.createElement("p");
    note.textContent = isFeaturedBusinessPackage
      ? "These featured business package details will be included with your confidential buyer inquiry."
      : "These specific license details will be included with your confidential inquiry.";

    panel.append(heading, grid, note);

    if (listingPath) {
      const link = document.createElement("a");
      link.href = listingPath;
      link.textContent = isFeaturedBusinessPackage ? "Return to this featured business package →" : "Return to this license page →";
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
      const desiredHeading = isFeaturedBusinessPackage
        ? "Inquire About This Featured Business Package"
        : "Inquire About This License";
      if (formHeading && formHeading.textContent?.trim() !== desiredHeading) {
        formHeading.textContent = desiredHeading;
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
      const subjectValue = isFeaturedBusinessPackage
        ? context.reference
          ? `Specific Buyer Featured Business Package Inquiry — ${context.reference}`
          : "Florida Liquor License Market — Specific Buyer Featured Business Package Inquiry"
        : context.reference
          ? `FLLM License Inquiry — ${context.reference}`
          : "Florida Liquor License Market — Specific License Inquiry";
      if (subject instanceof HTMLInputElement && subject.value !== subjectValue) {
        subject.value = subjectValue;
      }

      const inquirySelect = form.querySelector('select[name="inquiry_type"]');
      if (isFeaturedBusinessPackage && inquirySelect instanceof HTMLSelectElement) {
        let packageOption = Array.from(inquirySelect.options).find(
          (option) => option.value === "Specific Buyer Featured Business Package Inquiry",
        );
        if (!packageOption) {
          packageOption = document.createElement("option");
          packageOption.value = "Specific Buyer Featured Business Package Inquiry";
          packageOption.textContent = "Specific Buyer Featured Business Package Inquiry";
          inquirySelect.appendChild(packageOption);
        }
        setSelectValue(inquirySelect, "Specific Buyer Featured Business Package Inquiry");
      } else {
        setSelectValue(inquirySelect, "Buy a License");
      }
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
