(() => {
  const STYLE_ID = "license-types-dropdown-styles";
  const MENU_SELECTOR = '[data-license-types-menu="true"]';
  const OPEN_DELAY_MS = 80;
  const CLOSE_DELAY_MS = 300;
  const DESKTOP_HOVER_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 900px)";

  const items = [
    { label: "Types of Florida Liquor Licenses", href: "/resources/florida-liquor-license-types" },
    { label: "4COP Quota License", href: "/license-types/4cop-quota" },
    { label: "3PS Quota / Package Store", href: "/license-types/3ps-package-store" },
    { label: "2COP Beer & Wine", href: "/license-types/2cop-beer-wine" },
    { label: "SRX / 4COP-SFS Restaurant", href: "/license-types/4cop-sfs-restaurant" },
    { label: "Mobile Liquor License", href: "/license-types/mobile-bars-catered-events" },
    { label: "Quota License Requirements", href: "/resources/florida-liquor-license-types#population-rule-title" },
  ];

  let openTimer = null;
  let closeTimer = null;

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function desktopHoverAvailable() {
    return window.matchMedia(DESKTOP_HOVER_QUERY).matches;
  }

  function findTrigger() {
    return Array.from(document.querySelectorAll(".site-header .primary-nav a"))
      .find((link) => normalizedText(link) === "license types") || null;
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .license-types-nav-trigger{cursor:pointer}
      .license-types-nav-trigger::after{content:"";display:inline-block;width:7px;height:7px;margin-left:7px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:translateY(-2px) rotate(45deg);opacity:.85}
      .license-types-header-menu{position:fixed;z-index:10090;display:none;width:320px;padding:6px;border:1px solid #f6a700;border-radius:6px;background:#061728;box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 0 1px rgba(246,167,0,.12);font-family:Arial,Helvetica,sans-serif}
      .license-types-header-menu.is-open{display:grid;gap:4px}
      .license-types-header-menu::before{content:"";position:absolute;top:-7px;left:50%;width:12px;height:12px;transform:translateX(-50%) rotate(45deg);border-left:1px solid #f6a700;border-top:1px solid #f6a700;background:#061728}
      .license-types-header-menu a{position:relative;z-index:1;display:block;width:100%;padding:12px 13px;border-radius:4px;color:#fff;text-decoration:none;white-space:normal;font:700 13px/1.3 Arial,Helvetica,sans-serif;letter-spacing:.01em}
      .license-types-header-menu a:hover,.license-types-header-menu a:focus-visible{background:#f6a700;color:#061728;outline:none}
      @media(max-width:899px){.license-types-header-menu{width:min(320px,calc(100vw - 24px));max-height:72vh;overflow:auto}}
    `;
    document.head.appendChild(style);
  }

  function getMenu() { return document.querySelector(MENU_SELECTOR); }

  function createMenu() {
    let menu = getMenu();
    if (menu instanceof HTMLElement) return menu;
    menu = document.createElement("div");
    menu.className = "license-types-header-menu";
    menu.dataset.licenseTypesMenu = "true";
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-hidden", "true");

    items.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.setAttribute("role", "menuitem");
      link.textContent = item.label;
      link.addEventListener("click", closeMenu);
      menu.appendChild(link);
    });

    menu.addEventListener("pointerenter", () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    });
    menu.addEventListener("pointerleave", scheduleClose);
    menu.addEventListener("focusin", () => clearTimeout(closeTimer));
    menu.addEventListener("focusout", (event) => {
      const next = event.relatedTarget;
      const trigger = findTrigger();
      if (next instanceof Node && (menu.contains(next) || trigger?.contains(next))) return;
      scheduleClose();
    });
    document.body.appendChild(menu);
    return menu;
  }

  function positionMenu() {
    const trigger = findTrigger();
    const menu = getMenu();
    if (!(trigger instanceof HTMLElement) || !(menu instanceof HTMLElement)) return;
    const rect = trigger.getBoundingClientRect();
    const width = Math.min(320, window.innerWidth - 24);
    const desiredLeft = rect.left + rect.width / 2 - width / 2;
    const left = Math.max(12, Math.min(desiredLeft, window.innerWidth - width - 12));
    menu.style.width = `${width}px`;
    menu.style.left = `${left}px`;
    menu.style.top = `${rect.bottom}px`;
  }

  function closeOtherMenus() {
    document.querySelectorAll(".core-nav-header-menu.is-open,.market-data-header-menu.is-open,.resources-header-menu.is-open").forEach((menu) => {
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
    });
  }

  function openMenu(focusFirst = false) {
    const trigger = findTrigger();
    if (!(trigger instanceof HTMLElement)) return;
    const menu = createMenu();
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    closeOtherMenus();
    positionMenu();
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");
    if (focusFirst) menu.querySelector("a")?.focus();
  }

  function closeMenu() {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    const trigger = findTrigger();
    const menu = getMenu();
    menu?.classList.remove("is-open");
    menu?.setAttribute("aria-hidden", "true");
    trigger?.setAttribute("aria-expanded", "false");
  }

  function scheduleOpen() {
    if (!desktopHoverAvailable()) return;
    clearTimeout(closeTimer);
    clearTimeout(openTimer);
    openTimer = window.setTimeout(() => openMenu(), OPEN_DELAY_MS);
  }

  function scheduleClose() {
    if (!desktopHoverAvailable()) return;
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      const trigger = findTrigger();
      const menu = getMenu();
      const active = document.activeElement;
      const engaged = Boolean(trigger?.matches(":hover")) || Boolean(menu?.matches(":hover")) || (active instanceof Node && (Boolean(trigger?.contains(active)) || Boolean(menu?.contains(active))));
      if (!engaged) closeMenu();
    }, CLOSE_DELAY_MS);
  }

  function bind() {
    installStyles();
    const trigger = findTrigger();
    if (!(trigger instanceof HTMLAnchorElement) || trigger.dataset.licenseTypesBound === "true") return;
    trigger.dataset.licenseTypesBound = "true";
    trigger.classList.add("license-types-nav-trigger");
    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      getMenu()?.classList.contains("is-open") ? closeMenu() : openMenu();
    }, true);
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        openMenu(true);
      }
      if (event.key === "Escape") closeMenu();
    });
    trigger.addEventListener("pointerenter", scheduleOpen);
    trigger.addEventListener("pointerleave", scheduleClose);
    trigger.addEventListener("focusin", scheduleOpen);
    trigger.addEventListener("focusout", (event) => {
      const next = event.relatedTarget;
      const menu = getMenu();
      if (next instanceof Node && (trigger.contains(next) || menu?.contains(next))) return;
      scheduleClose();
    });
    createMenu();
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    const trigger = findTrigger();
    const menu = getMenu();
    if (trigger?.contains(target) || menu?.contains(target)) return;
    closeMenu();
  });
  window.addEventListener("resize", positionMenu);
  window.addEventListener("scroll", positionMenu, { passive: true });
  const observer = new MutationObserver(bind);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind, { once: true }); else bind();
})();
