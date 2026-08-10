(() => {
  const menus = [
    { label: "Market Data", selector: ".market-data-header-menu" },
    { label: "Resources", selector: ".resources-header-menu" },
  ];

  const lawsHref = "/resources/florida-liquor-license-laws";
  const lawsLabel = "Florida Liquor License Laws";

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function findTrigger(label) {
    return Array.from(document.querySelectorAll(".primary-nav a"))
      .find((link) => normalizedText(link).toLowerCase() === label.toLowerCase()) || null;
  }

  function ensureLawsMenuItem() {
    const menu = document.querySelector(".resources-header-menu");
    if (!(menu instanceof HTMLElement)) return false;
    if (menu.querySelector(`a[href="${lawsHref}"]`)) return true;

    const link = document.createElement("a");
    link.href = lawsHref;
    link.setAttribute("role", "menuitem");
    link.textContent = lawsLabel;

    const licenseTypesLink = Array.from(menu.querySelectorAll("a"))
      .find((item) => /^types of florida liquor licenses$/i.test(normalizedText(item)));

    if (licenseTypesLink) menu.insertBefore(link, licenseTypesLink);
    else menu.appendChild(link);
    return true;
  }

  function closeMenu({ label, selector }) {
    document.querySelectorAll(selector).forEach((menu) => {
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
    });

    const trigger = findTrigger(label);
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    const navLink = target instanceof Element ? target.closest(".primary-nav a") : null;
    if (navLink instanceof HTMLAnchorElement) {
      const clickedLabel = normalizedText(navLink).toLowerCase();
      menus.forEach((menu) => {
        if (clickedLabel !== menu.label.toLowerCase()) closeMenu(menu);
      });
    }

    window.setTimeout(ensureLawsMenuItem, 0);
  }, true);

  const observer = new MutationObserver(() => ensureLawsMenuItem());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  ensureLawsMenuItem();
  window.setTimeout(ensureLawsMenuItem, 300);
  window.setTimeout(ensureLawsMenuItem, 1000);
})();
