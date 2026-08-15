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

  function ensureCareersFooterLink() {
    const footer = document.querySelector("footer#resources");
    if (!(footer instanceof HTMLElement)) return false;

    const companyColumn = Array.from(footer.querySelectorAll(".footer-grid > div"))
      .find((column) => normalizedText(column.querySelector(":scope > strong")).toLowerCase() === "company");

    if (!(companyColumn instanceof HTMLElement)) return false;
    if (companyColumn.querySelector('a[href="/careers"]')) return true;

    const link = document.createElement("a");
    link.href = "/careers";
    link.textContent = "Careers";
    companyColumn.appendChild(link);
    return true;
  }


  function ensureNationalMarketplaceLinks() {
    const footer = document.querySelector("footer#resources");
    const companyColumn = footer instanceof HTMLElement
      ? Array.from(footer.querySelectorAll(".footer-grid > div"))
        .find((column) => normalizedText(column.querySelector(":scope > strong")).toLowerCase() === "company")
      : null;

    if (companyColumn instanceof HTMLElement && !companyColumn.querySelector('[data-national-marketplace-company-link="true"]')) {
      const link = document.createElement("a");
      link.href = "https://www.liquorlicensemarket.com/";
      link.textContent = "National Liquor License Markets";
      link.dataset.nationalMarketplaceCompanyLink = "true";
      const careersLink = companyColumn.querySelector('a[href="/careers"]');
      companyColumn.insertBefore(link, careersLink);
    }

    const cta = document.querySelector(".cta#sell");
    if (cta instanceof HTMLElement && !document.querySelector('[data-national-marketplace-prompt="true"]')) {
      const prompt = document.createElement("aside");
      prompt.dataset.nationalMarketplacePrompt = "true";
      prompt.setAttribute("aria-label", "National liquor license markets");
      prompt.style.cssText = "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin:0 0 12px;padding:13px 18px;border:1px solid rgba(246,167,0,.46);border-radius:7px;background:#f7f2e7;color:#0b1725";
      prompt.innerHTML = '<span><strong style="display:block;font-size:14px">Looking for a liquor license outside Florida?</strong><small style="display:block;margin-top:3px;color:#4a5864;font-size:10px;line-height:1.4">Explore active markets across the United States on Liquor License Market.</small></span><a href="https://www.liquorlicensemarket.com/" style="color:#8f5f00;font-size:10px;font-weight:900;letter-spacing:.04em;text-transform:uppercase">Explore National Markets ›</a>';
      cta.parentElement?.insertBefore(prompt, cta);
    }

    return Boolean(companyColumn && cta);
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
    window.setTimeout(ensureCareersFooterLink, 0);\n    window.setTimeout(ensureNationalMarketplaceLinks, 0);
  }, true);

  const observer = new MutationObserver(() => {
    normalizeResourcesMenu();
    ensureCareersFooterLink();\n    ensureNationalMarketplaceLinks();\n  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  normalizeResourcesMenu();
  ensureCareersFooterLink();\n  ensureNationalMarketplaceLinks();\n  window.setTimeout(normalizeResourcesMenu, 300);
  window.setTimeout(normalizeResourcesMenu, 1000);
  window.setTimeout(ensureCareersFooterLink, 100);
  window.setTimeout(ensureCareersFooterLink, 500);
  window.setTimeout(ensureCareersFooterLink, 1500);\n  window.setTimeout(ensureNationalMarketplaceLinks, 100);\n  window.setTimeout(ensureNationalMarketplaceLinks, 500);\n  window.setTimeout(ensureNationalMarketplaceLinks, 1500);
})();
