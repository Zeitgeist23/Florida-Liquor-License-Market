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

  const OPEN_DELAY_MS = 150;
  const CLOSE_DELAY_MS = 250;
  const DESKTOP_HOVER_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 900px)";
  const openTimers = new Map();
  const closeTimers = new Map();
  let suppressFocusOpenUntil = 0;

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

  function closeOtherMenus(activeLabel) {
    menus.forEach((menu) => {
      if (menu.label !== activeLabel) closeMenu(menu);
    });
  }

  function desktopHoverAvailable() {
    return window.matchMedia(DESKTOP_HOVER_QUERY).matches;
  }

  function menuElement(menuDefinition) {
    const menu = document.querySelector(menuDefinition.selector);
    return menu instanceof HTMLElement ? menu : null;
  }

  function clearTimer(store, label) {
    const timer = store.get(label);
    if (timer) window.clearTimeout(timer);
    store.delete(label);
  }

  function clearMenuTimers(label) {
    clearTimer(openTimers, label);
    clearTimer(closeTimers, label);
  }

  function menuIsOpen(menuDefinition, trigger) {
    const menu = menuElement(menuDefinition);
    return trigger?.getAttribute("aria-expanded") === "true" || Boolean(menu?.classList.contains("is-open"));
  }

  function pointerOrFocusInside(menuDefinition, trigger) {
    const menu = menuElement(menuDefinition);
    const activeElement = document.activeElement;
    const pointerInside = Boolean(trigger?.matches(":hover")) || Boolean(menu?.matches(":hover"));
    const focusInside = activeElement instanceof Node && (
      Boolean(trigger?.contains(activeElement)) || Boolean(menu?.contains(activeElement))
    );
    return pointerInside || focusInside;
  }

  function openMenuFromHover(menuDefinition, attempt = 0) {
    clearTimer(openTimers, menuDefinition.label);
    clearTimer(closeTimers, menuDefinition.label);

    if (!desktopHoverAvailable()) return;
    const trigger = findTrigger(menuDefinition.label);
    if (!(trigger instanceof HTMLAnchorElement) || !trigger.isConnected) return;

    if (menuIsOpen(menuDefinition, trigger)) {
      closeOtherMenus(menuDefinition.label);
      return;
    }

    if (trigger.getAttribute("aria-haspopup") !== "menu") {
      const stillEngaged = trigger.matches(":hover") || trigger.matches(":focus-within");
      if (attempt < 8 && stillEngaged) {
        const retry = window.setTimeout(() => openMenuFromHover(menuDefinition, attempt + 1), 100);
        openTimers.set(menuDefinition.label, retry);
      }
      return;
    }

    closeOtherMenus(menuDefinition.label);
    trigger.click();
  }

  function scheduleOpen(menuDefinition) {
    if (!desktopHoverAvailable()) return;
    clearTimer(closeTimers, menuDefinition.label);
    clearTimer(openTimers, menuDefinition.label);
    const timer = window.setTimeout(() => openMenuFromHover(menuDefinition), OPEN_DELAY_MS);
    openTimers.set(menuDefinition.label, timer);
  }

  function scheduleClose(menuDefinition) {
    if (!desktopHoverAvailable()) return;
    clearTimer(openTimers, menuDefinition.label);
    clearTimer(closeTimers, menuDefinition.label);
    const timer = window.setTimeout(() => {
      closeTimers.delete(menuDefinition.label);
      const trigger = findTrigger(menuDefinition.label);
      if (!pointerOrFocusInside(menuDefinition, trigger)) closeMenu(menuDefinition);
    }, CLOSE_DELAY_MS);
    closeTimers.set(menuDefinition.label, timer);
  }

  function definitionForTrigger(element) {
    if (!(element instanceof Element)) return null;
    const trigger = element.closest(".primary-nav a");
    if (!(trigger instanceof HTMLAnchorElement)) return null;
    const label = normalizedText(trigger).toLowerCase();
    return menus.find((menu) => menu.label.toLowerCase() === label) || null;
  }

  function definitionForMenu(element) {
    if (!(element instanceof Element)) return null;
    return menus.find((menu) => Boolean(element.closest(menu.selector))) || null;
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    const navLink = target instanceof Element ? target.closest(".primary-nav a") : null;
    if (navLink instanceof HTMLAnchorElement) {
      const clickedLabel = normalizedText(navLink).toLowerCase();
      const clickedMenu = menus.find((menu) => menu.label.toLowerCase() === clickedLabel);
      if (clickedMenu) clearMenuTimers(clickedMenu.label);
      menus.forEach((menu) => {
        if (clickedLabel !== menu.label.toLowerCase()) closeMenu(menu);
      });
    }

    window.setTimeout(normalizeResourcesMenu, 0);
    window.setTimeout(ensureCareersFooterLink, 0);
    window.setTimeout(ensureNationalMarketplaceLinks, 0);
  }, true);

  document.addEventListener("pointerover", (event) => {
    if (!desktopHoverAvailable()) return;
    const target = event.target;
    if (!(target instanceof Element)) return;

    const triggerDefinition = definitionForTrigger(target);
    if (triggerDefinition) {
      const trigger = findTrigger(triggerDefinition.label);
      if (!(event.relatedTarget instanceof Node && trigger?.contains(event.relatedTarget))) {
        scheduleOpen(triggerDefinition);
      }
      return;
    }

    const menuDefinition = definitionForMenu(target);
    if (menuDefinition) clearTimer(closeTimers, menuDefinition.label);
  }, true);

  document.addEventListener("pointerout", (event) => {
    if (!desktopHoverAvailable()) return;
    const target = event.target;
    if (!(target instanceof Element)) return;

    const triggerDefinition = definitionForTrigger(target);
    if (triggerDefinition) {
      const trigger = findTrigger(triggerDefinition.label);
      const menu = menuElement(triggerDefinition);
      const next = event.relatedTarget;
      if (next instanceof Node && (Boolean(trigger?.contains(next)) || Boolean(menu?.contains(next)))) return;
      scheduleClose(triggerDefinition);
      return;
    }

    const menuDefinition = definitionForMenu(target);
    if (menuDefinition) {
      const trigger = findTrigger(menuDefinition.label);
      const menu = menuElement(menuDefinition);
      const next = event.relatedTarget;
      if (next instanceof Node && (Boolean(menu?.contains(next)) || Boolean(trigger?.contains(next)))) return;
      scheduleClose(menuDefinition);
    }
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    suppressFocusOpenUntil = Date.now() + 600;
    menus.forEach((menu) => clearMenuTimers(menu.label));
  }, true);

  document.addEventListener("focusin", (event) => {
    if (Date.now() < suppressFocusOpenUntil) return;
    const target = event.target;
    if (!(target instanceof Element)) return;

    const triggerDefinition = definitionForTrigger(target);
    if (triggerDefinition) {
      scheduleOpen(triggerDefinition);
      return;
    }

    const menuDefinition = definitionForMenu(target);
    if (menuDefinition) clearTimer(closeTimers, menuDefinition.label);
  }, true);

  document.addEventListener("focusout", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const menuDefinition = definitionForMenu(target) || definitionForTrigger(target);
    if (!menuDefinition) return;

    const trigger = findTrigger(menuDefinition.label);
    const menu = menuElement(menuDefinition);
    const next = event.relatedTarget;
    if (next instanceof Node && (Boolean(trigger?.contains(next)) || Boolean(menu?.contains(next)))) return;
    scheduleClose(menuDefinition);
  }, true);

  window.addEventListener("blur", () => {
    menus.forEach((menu) => closeMenu(menu));
  });

  const hoverMediaQuery = window.matchMedia(DESKTOP_HOVER_QUERY);
  const handleCapabilityChange = (event) => {
    if (event.matches) return;
    menus.forEach((menu) => closeMenu(menu));
  };

  if (typeof hoverMediaQuery.addEventListener === "function") {
    hoverMediaQuery.addEventListener("change", handleCapabilityChange);
  } else if (typeof hoverMediaQuery.addListener === "function") {
    hoverMediaQuery.addListener(handleCapabilityChange);
  }

  const observer = new MutationObserver(() => {
    normalizeResourcesMenu();
    ensureCareersFooterLink();
    ensureNationalMarketplaceLinks();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  normalizeResourcesMenu();
  ensureCareersFooterLink();
  ensureNationalMarketplaceLinks();
  window.setTimeout(normalizeResourcesMenu, 300);
  window.setTimeout(normalizeResourcesMenu, 1000);
  window.setTimeout(ensureCareersFooterLink, 100);
  window.setTimeout(ensureCareersFooterLink, 500);
  window.setTimeout(ensureCareersFooterLink, 1500);
  window.setTimeout(ensureNationalMarketplaceLinks, 100);
  window.setTimeout(ensureNationalMarketplaceLinks, 500);
  window.setTimeout(ensureNationalMarketplaceLinks, 1500);
})();
