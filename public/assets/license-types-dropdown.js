(() => {
  const STYLE_ID = "license-types-dropdown-styles";
  const MENU_SELECTOR = '[data-license-types-menu="true"]';
  const OPEN_DELAY_MS = 120;
  const CLOSE_DELAY_MS = 220;
  const DESKTOP_HOVER_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 900px)";

  const items = [
    { label: "Florida Liquor License Types", href: "/resources/florida-liquor-license-types", kind: "text" },
    { label: "4COP Quota License", subtitle: "Bars, lounges, nightclubs & full-liquor restaurants", href: "/florida-4cop-liquor-license-for-sale", image: "/assets/license-types-4cop.svg" },
    { label: "3PS Quota / Package Store", subtitle: "Liquor stores & sealed package sales", href: "/florida-3ps-liquor-license-for-sale", image: "/assets/license-types-3ps.svg" },
    { label: "2COP Beer & Wine", subtitle: "Restaurants, cafés & wine bars", href: "/resources/florida-liquor-license-types#common-license-chart", image: "/assets/license-types-2cop.svg" },
    { label: "SRX / 4COP-SFS Restaurant", subtitle: "Qualifying full-service restaurants", href: "/resources/florida-liquor-license-types", image: "/assets/license-types-srx.svg" },
    { label: "Quota License Requirements", href: "/resources/florida-liquor-license-types#population-rule-title", kind: "text" },
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
      .license-types-header-menu{position:fixed;z-index:10034;display:none;width:440px;padding:8px;border:1px solid #f6a700;border-radius:8px;background:#061728;box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 0 1px rgba(246,167,0,.12);font-family:Arial,Helvetica,sans-serif}
      .license-types-header-menu.is-open{display:grid;gap:6px}
      .license-types-header-menu::before{content:"";position:absolute;top:-7px;left:50%;width:12px;height:12px;transform:translateX(-50%) rotate(45deg);border-left:1px solid #f6a700;border-top:1px solid #f6a700;background:#061728}
      .license-types-header-menu a{position:relative;z-index:1;display:flex;align-items:center;gap:12px;width:100%;padding:8px;border-radius:6px;color:#fff;text-decoration:none;font:700 13px/1.3 Arial,Helvetica,sans-serif;letter-spacing:.01em}
      .license-types-header-menu a.license-types-text-link{padding:12px 13px}
      .license-types-header-menu a:hover,.license-types-header-menu a:focus-visible{background:#f6a700;color:#061728;outline:none}
      .license-types-menu-thumb{width:92px;height:66px;object-fit:cover;flex:0 0 auto;border-radius:5px;border:1px solid rgba(246,167,0,.35);box-shadow:0 4px 10px rgba(0,0,0,.22)}
      .license-types-menu-copy{display:flex;flex-direction:column;gap:4px;min-width:0}
      .license-types-menu-copy strong{font-size:14px;line-height:1.2}
      .license-types-menu-copy small{font-size:11px;line-height:1.35;font-weight:600;color:#c8d3dc}
      .license-types-header-menu a:hover small,.license-types-header-menu a:focus-visible small{color:#173047}
      @media(max-width:899px){.license-types-header-menu{width:min(420px,calc(100vw - 24px));max-height:72vh;overflow:auto}.license-types-menu-thumb{width:78px;height:58px}}
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
      if (item.image) {
        const img = document.createElement("img");
        img.className = "license-types-menu-thumb";
        img.src = item.image;
        img.alt = "";
        img.setAttribute("aria-hidden", "true");
        const copy = document.createElement("span");
        copy.className = "license-types-menu-copy";
        const title = document.createElement("strong");
        title.textContent = item.label;
        const subtitle = document.createElement("small");
        subtitle.textContent = item.subtitle || "";
        copy.append(title, subtitle);
        link.append(img, copy);
      } else {
        link.className = "license-types-text-link";
        link.textContent = item.label;
      }
      link.addEventListener("click", closeMenu);
      menu.appendChild(link);
    });

    menu.addEventListener("pointerenter", () => clearTimeout(closeTimer));
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
    const width = Math.min(440, window.innerWidth - 24);
    const desiredLeft = rect.left + rect.width / 2 - width / 2;
    const left = Math.max(12, Math.min(desiredLeft, window.innerWidth - width - 12));
    menu.style.width = `${width}px`;
    menu.style.left = `${left}px`;
    menu.style.top = `${rect.bottom + 8}px`;
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
    clearTimeout(openTimer); clearTimeout(closeTimer); closeOtherMenus(); positionMenu();
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");
    if (focusFirst) menu.querySelector("a")?.focus();
  }

  function closeMenu() {
    clearTimeout(openTimer); clearTimeout(closeTimer);
    const trigger = findTrigger();
    const menu = getMenu();
    menu?.classList.remove("is-open");
    menu?.setAttribute("aria-hidden", "true");
    trigger?.setAttribute("aria-expanded", "false");
  }

  function scheduleOpen() {
    if (!desktopHoverAvailable()) return;
    clearTimeout(closeTimer); clearTimeout(openTimer);
    openTimer = window.setTimeout(() => openMenu(), OPEN_DELAY_MS);
  }

  function scheduleClose() {
    if (!desktopHoverAvailable()) return;
    clearTimeout(openTimer); clearTimeout(closeTimer);
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
    trigger.addEventListener("click", (event) => { event.preventDefault(); event.stopPropagation(); getMenu()?.classList.contains("is-open") ? closeMenu() : openMenu(); }, true);
    trigger.addEventListener("keydown", (event) => { if (event.key === "ArrowDown") { event.preventDefault(); openMenu(true); } if (event.key === "Escape") closeMenu(); });
    trigger.addEventListener("pointerenter", scheduleOpen);
    trigger.addEventListener("pointerleave", scheduleClose);
    trigger.addEventListener("focusin", scheduleOpen);
    trigger.addEventListener("focusout", (event) => { const next = event.relatedTarget; const menu = getMenu(); if (next instanceof Node && (trigger.contains(next) || menu?.contains(next))) return; scheduleClose(); });
    createMenu();
  }

  document.addEventListener("click", (event) => { const target = event.target; if (!(target instanceof Node)) return; const trigger = findTrigger(); const menu = getMenu(); if (trigger?.contains(target) || menu?.contains(target)) return; closeMenu(); });
  window.addEventListener("resize", positionMenu);
  window.addEventListener("scroll", positionMenu, { passive: true });
  const observer = new MutationObserver(bind);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind, { once: true }); else bind();
})();