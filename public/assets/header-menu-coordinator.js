(() => {
  const menus = [
    { label: "Market Data", selector: ".market-data-header-menu" },
    { label: "Resources", selector: ".resources-header-menu" },
  ];

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function findTrigger(label) {
    return Array.from(document.querySelectorAll(".primary-nav a"))
      .find((link) => normalizedText(link).toLowerCase() === label.toLowerCase()) || null;
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
    if (!(navLink instanceof HTMLAnchorElement)) return;

    const clickedLabel = normalizedText(navLink).toLowerCase();
    menus.forEach((menu) => {
      if (clickedLabel !== menu.label.toLowerCase()) closeMenu(menu);
    });
  }, true);
})();
