(() => {
  const STYLE_ID = "core-nav-dropdown-styles";
  const BOUND_KEY = "coreNavDropdownBound";
  const OPEN_DELAY_MS = 120;
  const CLOSE_DELAY_MS = 220;
  const DESKTOP_HOVER_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 900px)";

  const menus = [
    {
      key: "buy",
      label: "Buy",
      width: 310,
      items: [
        { label: "View Listings", href: "/listings" },
        { label: "Get a License Alert", href: "/license-alerts" },
        { label: "How to Buy a Florida Liquor License", href: "/how-to-buy-florida-liquor-license" },
        { label: "Florida County Markets", href: "/counties" },
      ],
    },
    {
      key: "sell",
      label: "Sell",
      width: 310,
      items: [
        { label: "Sell Your License", href: "/sell-your-license" },
        { label: "For Brokers — List a Client License", href: "/brokers/list-your-license" },
        { label: "How to Sell a Florida Liquor License", href: "/how-to-sell-florida-liquor-license" },
        { label: "Get a License Valuation", href: "/florida-liquor-license-value" },
      ],
    },
    {
      key: "finance",
      label: "Finance",
      width: 290,
      items: [
        { label: "Liquor License Financing", href: "/financing" },
        { label: "Financing Disclosure", href: "/financing-disclosure" },
        { label: "Private Lending Disclosure", href: "/private-lending-disclosure" },
      ],
    },
    {
      key: "invest",
      label: "Invest",
      width: 300,
      items: [
        { label: "Investment Opportunities", href: "/investment-opportunities" },
        { label: "Self-Directed IRA Lending", href: "/self-directed-ira-liquor-license-lending" },
      ],
    },
  ];

  let activeKey = null;
  const openTimers = new Map();
  const closeTimers = new Map();

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function desktopHoverAvailable() {
    return window.matchMedia(DESKTOP_HOVER_QUERY).matches;
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .core-nav-header-menu{
        position:fixed;
        z-index:10032;
        display:none;
        padding:6px;
        border:1px solid #f6a700;
        border-radius:6px;
        background:#061728;
        box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 0 1px rgba(246,167,0,.12);
        font-family:Arial,Helvetica,sans-serif;
      }
      .core-nav-header-menu.is-open{display:grid;gap:4px}
      .core-nav-header-menu::before{
        content:"";
        position:absolute;
        top:-7px;
        left:50%;
        width:12px;
        height:12px;
        transform:translateX(-50%) rotate(45deg);
        border-left:1px solid #f6a700;
        border-top:1px solid #f6a700;
        background:#061728;
      }
      .core-nav-header-menu a{
        position:relative;
        z-index:1;
        display:block;
        width:100%;
        padding:12px 13px;
        border-radius:4px;
        color:#fff;
        text-decoration:none;
        white-space:normal;
        font:700 13px/1.3 Arial,Helvetica,sans-serif;
        letter-spacing:.01em;
      }
      .core-nav-header-menu a:hover,
      .core-nav-header-menu a:focus-visible{
        background:#f6a700;
        color:#061728;
        outline:none;
      }
      .primary-nav a[data-core-nav-dropdown-bound="true"]{cursor:pointer}
      @media(max-width:899px){
        .core-nav-header-menu{width:min(320px,calc(100vw - 24px))!important}
      }
    `;
    document.head.appendChild(style);
  }

  function definitionForKey(key) {
    return menus.find((menu) => menu.key === key) || null;
  }

  function definitionForLabel(label) {
    const normalized = String(label || "").toLowerCase();
    return menus.find((menu) => menu.label.toLowerCase() === normalized) || null;
  }

  function findTrigger(definition) {
    return Array.from(document.querySelectorAll(".site-header .primary-nav a"))
      .find((link) => normalizedText(link).toLowerCase() === definition.label.toLowerCase()) || null;
  }

  function menuElement(definition) {
    return document.querySelector(`[data-core-nav-menu="${definition.key}"]`);
  }

  function clearTimer(store, key) {
    const timer = store.get(key);
    if (timer) window.clearTimeout(timer);
    store.delete(key);
  }

  function clearTimers(key) {
    clearTimer(openTimers, key);
    clearTimer(closeTimers, key);
  }

  function createMenu(definition) {
    let menu = menuElement(definition);
    if (menu instanceof HTMLElement) return menu;

    menu = document.createElement("div");
    menu.className = "core-nav-header-menu";
    menu.dataset.coreNavMenu = definition.key;
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-hidden", "true");

    definition.items.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.setAttribute("role", "menuitem");
      link.textContent = item.label;
      link.addEventListener("click", () => closeAll());
      menu.appendChild(link);
    });

    menu.addEventListener("pointerenter", () => {
      clearTimer(closeTimers, definition.key);
    });
    menu.addEventListener("pointerleave", () => {
      scheduleClose(definition);
    });
    menu.addEventListener("focusin", () => {
      clearTimer(closeTimers, definition.key);
    });
    menu.addEventListener("focusout", (event) => {
      const next = event.relatedTarget;
      const trigger = findTrigger(definition);
      if (next instanceof Node && (menu.contains(next) || trigger?.contains(next))) return;
      scheduleClose(definition);
    });

    document.body.appendChild(menu);
    return menu;
  }

  function positionMenu(definition) {
    const trigger = findTrigger(definition);
    const menu = menuElement(definition);
    if (!(trigger instanceof HTMLElement) || !(menu instanceof HTMLElement)) return;

    const rect = trigger.getBoundingClientRect();
    const width = Math.min(definition.width, window.innerWidth - 24);
    const desiredLeft = rect.left + rect.width / 2 - width / 2;
    const left = Math.max(12, Math.min(desiredLeft, window.innerWidth - width - 12));

    menu.style.width = `${width}px`;
    menu.style.left = `${left}px`;
    menu.style.top = `${rect.bottom + 8}px`;
  }

  function closeForeignMenus() {
    document.querySelectorAll(".market-data-header-menu.is-open,.resources-header-menu.is-open").forEach((menu) => {
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
    });
    Array.from(document.querySelectorAll(".site-header .primary-nav a")).forEach((link) => {
      const label = normalizedText(link).toLowerCase();
      if (label === "market data" || label === "resources") link.setAttribute("aria-expanded", "false");
    });
  }

  function closeMenu(definition, restoreFocus = false) {
    clearTimers(definition.key);
    const trigger = findTrigger(definition);
    const menu = menuElement(definition);
    if (menu instanceof HTMLElement) {
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
    }
    if (trigger instanceof HTMLElement) {
      trigger.setAttribute("aria-expanded", "false");
      if (restoreFocus) trigger.focus();
    }
    if (activeKey === definition.key) activeKey = null;
  }

  function closeAll(exceptKey = null) {
    menus.forEach((definition) => {
      if (definition.key !== exceptKey) closeMenu(definition);
    });
  }

  function openMenu(definition, focusFirst = false) {
    installStyles();
    const trigger = findTrigger(definition);
    if (!(trigger instanceof HTMLElement)) return;
    const menu = createMenu(definition);

    clearTimers(definition.key);
    closeAll(definition.key);
    closeForeignMenus();
    positionMenu(definition);
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");
    activeKey = definition.key;

    if (focusFirst) menu.querySelector("a")?.focus();
  }

  function toggleMenu(definition) {
    const menu = menuElement(definition);
    if (menu?.classList.contains("is-open")) closeMenu(definition);
    else openMenu(definition);
  }

  function scheduleOpen(definition) {
    if (!desktopHoverAvailable()) return;
    clearTimer(closeTimers, definition.key);
    clearTimer(openTimers, definition.key);
    const timer = window.setTimeout(() => openMenu(definition), OPEN_DELAY_MS);
    openTimers.set(definition.key, timer);
  }

  function scheduleClose(definition) {
    if (!desktopHoverAvailable()) return;
    clearTimer(openTimers, definition.key);
    clearTimer(closeTimers, definition.key);
    const timer = window.setTimeout(() => {
      closeTimers.delete(definition.key);
      const trigger = findTrigger(definition);
      const menu = menuElement(definition);
      const active = document.activeElement;
      const engaged = Boolean(trigger?.matches(":hover")) || Boolean(menu?.matches(":hover")) ||
        (active instanceof Node && (Boolean(trigger?.contains(active)) || Boolean(menu?.contains(active))));
      if (!engaged) closeMenu(definition);
    }, CLOSE_DELAY_MS);
    closeTimers.set(definition.key, timer);
  }

  function bindTrigger(definition) {
    const trigger = findTrigger(definition);
    if (!(trigger instanceof HTMLAnchorElement)) return false;
    if (trigger.dataset[BOUND_KEY] === "true") return true;

    trigger.dataset[BOUND_KEY] = "true";
    trigger.setAttribute("data-core-nav-dropdown-bound", "true");
    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-expanded", "false");

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleMenu(definition);
    }, true);
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        openMenu(definition, true);
      }
    });
    trigger.addEventListener("pointerenter", () => scheduleOpen(definition));
    trigger.addEventListener("pointerleave", () => scheduleClose(definition));
    trigger.addEventListener("focusin", () => scheduleOpen(definition));
    trigger.addEventListener("focusout", (event) => {
      const next = event.relatedTarget;
      const menu = menuElement(definition);
      if (next instanceof Node && (trigger.contains(next) || menu?.contains(next))) return;
      scheduleClose(definition);
    });

    createMenu(definition);
    return true;
  }

  function bindAll() {
    installStyles();
    menus.forEach(bindTrigger);
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    const activeDefinition = activeKey ? definitionForKey(activeKey) : null;
    if (!activeDefinition) return;
    const menu = menuElement(activeDefinition);
    const trigger = findTrigger(activeDefinition);
    if (menu?.contains(target) || trigger?.contains(target)) return;
    closeAll();
  });

  document.addEventListener("pointerover", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest(".site-header .primary-nav a");
    if (!(link instanceof HTMLAnchorElement)) return;
    const definition = definitionForLabel(normalizedText(link));
    if (!definition) {
      const label = normalizedText(link).toLowerCase();
      if (label === "market data" || label === "resources") closeAll();
    }
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeKey) {
      const definition = definitionForKey(activeKey);
      if (definition) closeMenu(definition, true);
    }
  });

  window.addEventListener("resize", () => {
    if (!activeKey) return;
    const definition = definitionForKey(activeKey);
    if (definition) positionMenu(definition);
  });
  window.addEventListener("scroll", () => {
    if (!activeKey) return;
    const definition = definitionForKey(activeKey);
    if (definition) positionMenu(definition);
  }, { passive: true });

  const observer = new MutationObserver(() => bindAll());
  observer.observe(document.documentElement, { childList: true, subtree: true });

  function initialize() {
    bindAll();
    window.setTimeout(bindAll, 150);
    window.setTimeout(bindAll, 500);
    window.setTimeout(bindAll, 1200);
    window.setTimeout(bindAll, 2400);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
