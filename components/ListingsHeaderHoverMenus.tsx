"use client";

import { useEffect } from "react";

const OPEN_DELAY_MS = 150;
const CLOSE_DELAY_MS = 250;
const DESKTOP_MIN_WIDTH = 900;
const STYLE_ID = "listings-header-hover-menu-styles";

const NAVIGATION_LINKS = [
  {
    label: "Market Data",
    href: "#market-data-menu",
    chevron: true,
    menu: "market-data",
  },
  {
    label: "License Types",
    href: "/resources/florida-liquor-license-types",
    chevron: false,
  },
  {
    label: "Resources",
    href: "#resources-menu",
    chevron: true,
    menu: "resources",
  },
] as const;

const MARKET_DATA_ITEMS = [
  {
    label: "Florida Liquor License Value Estimator",
    href: "/florida-liquor-license-value",
  },
  {
    label: "Recent Florida Transactions",
    href: "/listings?status=sold",
  },
  {
    label: "Florida Market Insights",
    href: "/#market-data",
  },
] as const;

const RESOURCE_ITEMS = [
  {
    label: "Florida Liquor License Lookup",
    href: "https://florida-liquor-license-market.jwigg023.chatgpt.site/license-lookup",
    external: true,
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
    external: true,
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
] as const;

type MenuName = "market-data" | "resources";

type MenuDefinition = {
  label: string;
  menuName: MenuName;
  menuClass: string;
  width: number;
};

const MENU_DEFINITIONS: Record<MenuName, MenuDefinition> = {
  "market-data": {
    label: "Market Data",
    menuName: "market-data",
    menuClass: "market-data-header-menu",
    width: 278,
  },
  resources: {
    label: "Resources",
    menuName: "resources",
    menuClass: "resources-header-menu",
    width: 332,
  },
};

function normalizedText(element: Element | null) {
  return (element?.textContent || "").replace(/\s+/g, " ").trim();
}

function listingsNavigation() {
  const navigation = document.querySelector(
    ".results-page > .results-header nav[aria-label='Listings navigation']",
  );
  return navigation instanceof HTMLElement ? navigation : null;
}

function findLinkByLabel(navigation: HTMLElement, label: string) {
  return Array.from(navigation.querySelectorAll(":scope > a")).find(
    (link) => normalizedText(link).toLowerCase() === label.toLowerCase(),
  ) as HTMLAnchorElement | undefined;
}

function menuNameForTrigger(trigger: Element | null): MenuName | null {
  if (!(trigger instanceof HTMLAnchorElement)) return null;
  const menuName = trigger.dataset.listingsHeaderMenuTrigger;
  return menuName === "market-data" || menuName === "resources" ? menuName : null;
}

function triggerFor(menuName: MenuName) {
  const navigation = listingsNavigation();
  if (!navigation) return null;
  const trigger = navigation.querySelector<HTMLAnchorElement>(
    `[data-listings-header-menu-trigger="${menuName}"]`,
  );
  return trigger || null;
}

function menuFor(menuName: MenuName) {
  const menu = document.querySelector<HTMLElement>(
    `[data-listings-header-dropdown="${menuName}"]`,
  );
  return menu || null;
}

function createNavigationLink({
  label,
  href,
  chevron,
  ...item
}: (typeof NAVIGATION_LINKS)[number]) {
  const link = document.createElement("a");
  link.href = href;
  link.dataset.listingsHeaderMenuLink = label.toLowerCase().replace(/\s+/g, "-");

  if ("menu" in item) {
    link.dataset.listingsHeaderMenuTrigger = item.menu;
    link.setAttribute("aria-haspopup", "menu");
    link.setAttribute("aria-expanded", "false");
  }

  const text = document.createElement("span");
  text.textContent = label;
  link.appendChild(text);

  if (chevron) {
    const icon = document.createElement("img");
    icon.className = "nav-chevron";
    icon.src = "/assets/nav-chevron.png";
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");
    link.appendChild(icon);
  }

  return link;
}

function createMenuLink(label: string, href: string, external = false) {
  const link = document.createElement("a");
  link.href = href;
  link.setAttribute("role", "menuitem");
  link.textContent = label;
  if (external) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  return link;
}

function openListingsHeatMap() {
  const button = Array.from(
    document.querySelectorAll<HTMLButtonElement>(".results-filters button"),
  ).find((candidate) => /heat map/i.test(candidate.textContent || ""));

  if (button) {
    button.click();
    return;
  }

  window.location.assign("/#market-data");
}

function createDropdown(menuName: MenuName) {
  const definition = MENU_DEFINITIONS[menuName];
  const menu = document.createElement("div");
  menu.className = definition.menuClass;
  menu.dataset.listingsHeaderDropdown = menuName;
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-hidden", "true");

  if (menuName === "market-data") {
    MARKET_DATA_ITEMS.forEach((item) => {
      menu.appendChild(createMenuLink(item.label, item.href));
    });

    const heatMapButton = document.createElement("button");
    heatMapButton.type = "button";
    heatMapButton.setAttribute("role", "menuitem");
    heatMapButton.textContent = "Heat Map";
    heatMapButton.addEventListener("click", openListingsHeatMap);
    menu.appendChild(heatMapButton);
  } else {
    RESOURCE_ITEMS.forEach((item) => {
      menu.appendChild(createMenuLink(item.label, item.href, "external" in item && item.external));
    });
  }

  document.body.appendChild(menu);
  return menu;
}

function ensureDropdowns() {
  (Object.keys(MENU_DEFINITIONS) as MenuName[]).forEach((menuName) => {
    if (!menuFor(menuName)) createDropdown(menuName);
  });
}

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .results-page > .results-header nav.primary-nav > a {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .results-page > .results-header nav.primary-nav .nav-chevron {
      flex: 0 0 auto;
      width: 9px;
      height: 7px;
      object-fit: contain;
    }

    .market-data-header-menu,
    .resources-header-menu {
      position: fixed;
      z-index: 10040;
      display: none;
      padding: 6px;
      border: 1px solid #f6a700;
      border-radius: 6px;
      background: #061728;
      box-shadow: 0 18px 48px rgba(0, 0, 0, .48), 0 0 0 1px rgba(246, 167, 0, .12);
      font-family: Arial, Helvetica, sans-serif;
    }

    .market-data-header-menu.is-open,
    .resources-header-menu.is-open {
      display: grid;
      gap: 4px;
    }

    .market-data-header-menu::before,
    .resources-header-menu::before {
      content: "";
      position: absolute;
      top: -7px;
      left: 50%;
      width: 12px;
      height: 12px;
      transform: translateX(-50%) rotate(45deg);
      border-left: 1px solid #f6a700;
      border-top: 1px solid #f6a700;
      background: #061728;
    }

    .market-data-header-menu a,
    .market-data-header-menu button,
    .resources-header-menu a,
    .resources-header-menu button {
      position: relative;
      z-index: 1;
      display: block;
      width: 100%;
      padding: 12px 13px;
      border: 0;
      border-radius: 4px;
      color: #fff;
      background: transparent;
      cursor: pointer;
      text-align: left;
      text-decoration: none;
      font: 700 13px/1.25 Arial, Helvetica, sans-serif;
      letter-spacing: .01em;
    }

    .market-data-header-menu a:hover,
    .market-data-header-menu a:focus-visible,
    .market-data-header-menu button:hover,
    .market-data-header-menu button:focus-visible,
    .resources-header-menu a:hover,
    .resources-header-menu a:focus-visible,
    .resources-header-menu button:hover,
    .resources-header-menu button:focus-visible {
      color: #061728;
      background: #f6a700;
      outline: none;
    }

    @media (min-width: 821px) and (max-width: 1500px) {
      .results-page > .results-header nav.primary-nav {
        gap: 10px !important;
      }

      .results-page > .results-header nav.primary-nav > a {
        font-size: 9.5px !important;
      }
    }

    @media (min-width: 821px) and (max-width: 1050px) {
      .results-page > .results-header {
        height: auto !important;
        min-height: 104px !important;
        padding-top: 10px !important;
        padding-bottom: 10px !important;
      }

      .results-page > .results-header nav.primary-nav {
        flex-wrap: wrap !important;
        align-content: center !important;
        row-gap: 7px !important;
      }
    }

    @media (max-width: 820px) {
      .market-data-header-menu,
      .resources-header-menu {
        width: min(332px, calc(100vw - 24px)) !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function enhanceListingsHeader() {
  const navigation = listingsNavigation();
  if (!navigation) return false;

  navigation.classList.add("primary-nav");
  const contactLink = findLinkByLabel(navigation, "Contact Us") || null;

  NAVIGATION_LINKS.forEach((item) => {
    const existing = findLinkByLabel(navigation, item.label);
    if (existing) {
      if ("menu" in item) {
        existing.dataset.listingsHeaderMenuTrigger = item.menu;
        existing.setAttribute("aria-haspopup", "menu");
        if (!existing.hasAttribute("aria-expanded")) existing.setAttribute("aria-expanded", "false");
      }
      return;
    }
    navigation.insertBefore(createNavigationLink(item), contactLink);
  });

  ensureStyles();
  ensureDropdowns();
  return true;
}

export default function ListingsHeaderHoverMenus() {
  useEffect(() => {
    let openMenuName: MenuName | null = null;
    let lastTrigger: HTMLAnchorElement | null = null;
    const openTimers = new Map<MenuName, number>();
    const closeTimers = new Map<MenuName, number>();

    const clearTimer = (store: Map<MenuName, number>, menuName: MenuName) => {
      const timer = store.get(menuName);
      if (timer) window.clearTimeout(timer);
      store.delete(menuName);
    };

    const clearTimers = (menuName: MenuName) => {
      clearTimer(openTimers, menuName);
      clearTimer(closeTimers, menuName);
    };

    const positionMenu = (menuName: MenuName, trigger: HTMLAnchorElement) => {
      const definition = MENU_DEFINITIONS[menuName];
      const menu = menuFor(menuName);
      if (!menu) return;

      const rect = trigger.getBoundingClientRect();
      const width = Math.min(definition.width, window.innerWidth - 24);
      const desiredLeft = rect.left + rect.width / 2 - width / 2;
      const left = Math.max(12, Math.min(desiredLeft, window.innerWidth - width - 12));

      menu.style.width = `${width}px`;
      menu.style.left = `${left}px`;
      menu.style.top = `${rect.bottom + 8}px`;
    };

    const closeMenu = (menuName: MenuName, restoreFocus = false) => {
      clearTimers(menuName);
      const menu = menuFor(menuName);
      const trigger = triggerFor(menuName);
      menu?.classList.remove("is-open");
      menu?.setAttribute("aria-hidden", "true");
      trigger?.setAttribute("aria-expanded", "false");
      if (openMenuName === menuName) openMenuName = null;
      if (restoreFocus) (trigger || lastTrigger)?.focus();
    };

    const closeAll = (except?: MenuName) => {
      (Object.keys(MENU_DEFINITIONS) as MenuName[]).forEach((menuName) => {
        if (menuName !== except) closeMenu(menuName);
      });
    };

    const openMenu = (menuName: MenuName, focusFirstItem = false) => {
      enhanceListingsHeader();
      const trigger = triggerFor(menuName);
      const menu = menuFor(menuName);
      if (!trigger || !menu) return;

      clearTimers(menuName);
      closeAll(menuName);
      positionMenu(menuName, trigger);
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      trigger.setAttribute("aria-expanded", "true");
      openMenuName = menuName;
      lastTrigger = trigger;

      if (focusFirstItem) {
        menu.querySelector<HTMLElement>("a, button")?.focus();
      }
    };

    const pointerCanHover = (event: PointerEvent) =>
      window.innerWidth >= DESKTOP_MIN_WIDTH &&
      (event.pointerType === "mouse" || event.pointerType === "pen" || event.pointerType === "");

    const pointerOrFocusInside = (menuName: MenuName) => {
      const trigger = triggerFor(menuName);
      const menu = menuFor(menuName);
      const active = document.activeElement;
      const pointerInside = Boolean(trigger?.matches(":hover")) || Boolean(menu?.matches(":hover"));
      const focusInside = active instanceof Node && (
        Boolean(trigger?.contains(active)) || Boolean(menu?.contains(active))
      );
      return pointerInside || focusInside;
    };

    const scheduleOpen = (menuName: MenuName) => {
      clearTimer(closeTimers, menuName);
      clearTimer(openTimers, menuName);
      const timer = window.setTimeout(() => openMenu(menuName), OPEN_DELAY_MS);
      openTimers.set(menuName, timer);
    };

    const scheduleClose = (menuName: MenuName) => {
      clearTimer(openTimers, menuName);
      clearTimer(closeTimers, menuName);
      const timer = window.setTimeout(() => {
        closeTimers.delete(menuName);
        if (!pointerOrFocusInside(menuName)) closeMenu(menuName);
      }, CLOSE_DELAY_MS);
      closeTimers.set(menuName, timer);
    };

    const onPointerOver = (event: PointerEvent) => {
      if (!pointerCanHover(event)) return;
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest<HTMLAnchorElement>("[data-listings-header-menu-trigger]");
      const triggerMenuName = menuNameForTrigger(trigger);
      if (triggerMenuName) {
        const related = event.relatedTarget;
        if (!(related instanceof Node && trigger?.contains(related))) scheduleOpen(triggerMenuName);
        return;
      }

      const menu = target.closest<HTMLElement>("[data-listings-header-dropdown]");
      const menuName = menu?.dataset.listingsHeaderDropdown;
      if (menuName === "market-data" || menuName === "resources") {
        clearTimer(closeTimers, menuName);
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!pointerCanHover(event)) return;
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest<HTMLAnchorElement>("[data-listings-header-menu-trigger]");
      const triggerMenuName = menuNameForTrigger(trigger);
      if (triggerMenuName) {
        const next = event.relatedTarget;
        const menu = menuFor(triggerMenuName);
        if (next instanceof Node && (Boolean(trigger?.contains(next)) || Boolean(menu?.contains(next)))) return;
        scheduleClose(triggerMenuName);
        return;
      }

      const menu = target.closest<HTMLElement>("[data-listings-header-dropdown]");
      const menuName = menu?.dataset.listingsHeaderDropdown;
      if (menuName === "market-data" || menuName === "resources") {
        const next = event.relatedTarget;
        const triggerForMenu = triggerFor(menuName);
        if (next instanceof Node && (Boolean(menu?.contains(next)) || Boolean(triggerForMenu?.contains(next)))) return;
        scheduleClose(menuName);
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest<HTMLAnchorElement>("[data-listings-header-menu-trigger]");
      const menuName = menuNameForTrigger(trigger);
      if (menuName && trigger) {
        event.preventDefault();
        event.stopPropagation();
        clearTimers(menuName);
        if (openMenuName === menuName && menuFor(menuName)?.classList.contains("is-open")) {
          closeMenu(menuName);
        } else {
          openMenu(menuName);
        }
        return;
      }

      const menuItem = target.closest("[data-listings-header-dropdown] a, [data-listings-header-dropdown] button");
      if (menuItem) {
        closeAll();
        return;
      }

      if (!target.closest("[data-listings-header-dropdown]")) closeAll();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      const trigger = target instanceof Element
        ? target.closest<HTMLAnchorElement>("[data-listings-header-menu-trigger]")
        : null;
      const menuName = menuNameForTrigger(trigger);

      if (menuName && event.key === "ArrowDown") {
        event.preventDefault();
        openMenu(menuName, true);
        return;
      }

      if (event.key === "Escape" && openMenuName) {
        event.preventDefault();
        closeMenu(openMenuName, true);
      }
    };

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest<HTMLAnchorElement>("[data-listings-header-menu-trigger]");
      const menuName = menuNameForTrigger(trigger);
      if (menuName) {
        scheduleOpen(menuName);
        return;
      }

      const menu = target.closest<HTMLElement>("[data-listings-header-dropdown]");
      const dropdownName = menu?.dataset.listingsHeaderDropdown;
      if (dropdownName === "market-data" || dropdownName === "resources") {
        clearTimer(closeTimers, dropdownName);
      }
    };

    const onFocusOut = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest<HTMLAnchorElement>("[data-listings-header-menu-trigger]");
      const menu = target.closest<HTMLElement>("[data-listings-header-dropdown]");
      const menuName = menuNameForTrigger(trigger) || (
        menu?.dataset.listingsHeaderDropdown === "market-data" || menu?.dataset.listingsHeaderDropdown === "resources"
          ? menu.dataset.listingsHeaderDropdown
          : null
      );
      if (!menuName) return;

      const next = event.relatedTarget;
      const currentTrigger = triggerFor(menuName);
      const currentMenu = menuFor(menuName);
      if (next instanceof Node && (
        Boolean(currentTrigger?.contains(next)) || Boolean(currentMenu?.contains(next))
      )) return;
      scheduleClose(menuName);
    };

    const repositionOpenMenu = () => {
      if (!openMenuName) return;
      const trigger = triggerFor(openMenuName);
      if (trigger) positionMenu(openMenuName, trigger);
    };

    enhanceListingsHeader();

    const observer = new MutationObserver(() => enhanceListingsHeader());
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("pointerout", onPointerOut, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("focusin", onFocusIn, true);
    document.addEventListener("focusout", onFocusOut, true);
    window.addEventListener("resize", repositionOpenMenu);
    window.addEventListener("scroll", repositionOpenMenu, { passive: true });
    const onWindowBlur = () => closeAll();

    window.addEventListener("blur", onWindowBlur);

    const retries = [250, 700, 1500, 2600].map((delay) =>
      window.setTimeout(enhanceListingsHeader, delay),
    );

    return () => {
      observer.disconnect();
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("pointerout", onPointerOut, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("focusin", onFocusIn, true);
      document.removeEventListener("focusout", onFocusOut, true);
      window.removeEventListener("resize", repositionOpenMenu);
      window.removeEventListener("scroll", repositionOpenMenu);
      window.removeEventListener("blur", onWindowBlur);
      retries.forEach((timeout) => window.clearTimeout(timeout));
      closeAll();
    };
  }, []);

  return null;
}
