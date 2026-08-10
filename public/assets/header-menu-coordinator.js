(() => {
  const menus = [
    { label: "Market Data", selector: ".market-data-header-menu" },
    { label: "Resources", selector: ".resources-header-menu" },
  ];

  const resourcesOrder = [
    {
      label: "Florida Liquor License Lookup",
      href: "https://florida-liquor-license-market.jwigg023.chatgpt.site/license-lookup",
    },
    {
      label: "Types of Florida Liquor Licenses",
      href: "/resources/florida-liquor-license-types",
    },
    {
      label: "Florida Liquor License Laws",
      href: "/resources/florida-liquor-license-laws",
    },
    {
      label: "Florida Division of Alcoholic Beverages & Tobacco (DABT)",
      href: "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/",
    },
    {
      label: "Florida ABT Forms",
      href: "/resources/forms",
    },
    {
      label: "License Fees",
      href: "/resources/license-fees",
    },
    {
      label: "Quota License Transfer Fee Calculator",
      href: "/resources/quota-transfer-fee-calculator",
    },
    {
      label: "Florida Department of Revenue (FDOR)",
      href: "/resources/florida-department-of-revenue",
    },
    {
      label: "Liquor License Attorneys",
      href: "/resources/liquor-license-attorneys",
    },
  ];

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function findTrigger(label) {
    return Array.from(document.querySelectorAll(".primary-nav a"))
      .find((link) => normalizedText(link).toLowerCase() === label.toLowerCase()) || null;
  }

  function hrefMatches(link, expectedHref) {
    if (!(link instanceof HTMLAnchorElement)) return false;
    const rawHref = link.getAttribute("href") || "";
    if (rawHref === expectedHref || link.href === expectedHref) return true;

    if (!expectedHref.startsWith("http")) {
      try {
        return new URL(link.href, window.location.origin).pathname === expectedHref;
      } catch {
        return false;
      }
    }

    return false;
  }

  function normalizeResourcesMenu() {
    const menu = document.querySelector(".resources-header-menu");
    if (!(menu instanceof HTMLElement)) return false;

    const desiredNodes = resourcesOrder.map(({ label, href }) => {
      let link = Array.from(menu.querySelectorAll("a"))
        .find((item) => hrefMatches(item, href));

      if (!(link instanceof HTMLAnchorElement)) {
        link = document.createElement("a");
        link.href = href;
        link.setAttribute("role", "menuitem");
        if (href.startsWith("http")) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
        menu.appendChild(link);
      }

      if (normalizedText(link) !== label) link.textContent = label;
      return link;
    });

    const knownNodesInCurrentOrder = Array.from(menu.querySelectorAll(":scope > a"))
      .filter((item) => desiredNodes.includes(item));
    const orderDiffers = desiredNodes.some((node, index) => knownNodesInCurrentOrder[index] !== node);

    if (orderDiffers) desiredNodes.forEach((node) => menu.appendChild(node));
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

    window.setTimeout(normalizeResourcesMenu, 0);
  }, true);

  const observer = new MutationObserver(() => normalizeResourcesMenu());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  normalizeResourcesMenu();
  window.setTimeout(normalizeResourcesMenu, 300);
  window.setTimeout(normalizeResourcesMenu, 1000);
})();
