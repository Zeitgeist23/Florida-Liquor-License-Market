(() => {
  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function ensureCareersFooterLink() {
    const footer = document.querySelector("footer#resources");
    if (!(footer instanceof HTMLElement)) return false;

    const companyColumn = Array.from(footer.querySelectorAll(":scope .footer-grid > div"))
      .find((column) => normalizedText(column.querySelector(":scope > strong")).toLowerCase() === "company");

    if (!(companyColumn instanceof HTMLElement)) return false;
    if (companyColumn.querySelector('a[href="/careers"]')) return true;

    const link = document.createElement("a");
    link.href = "/careers";
    link.textContent = "Careers";
    companyColumn.appendChild(link);
    return true;
  }

  ensureCareersFooterLink();
  window.setTimeout(ensureCareersFooterLink, 100);
  window.setTimeout(ensureCareersFooterLink, 500);
  window.setTimeout(ensureCareersFooterLink, 1500);

  const observer = new MutationObserver(() => ensureCareersFooterLink());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
