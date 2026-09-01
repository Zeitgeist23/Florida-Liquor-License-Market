(() => {
  const STYLE_ID = "buy-dropdown-styles";
  const MENU_ID = "buy-header-menu";
  const BOUND_KEY = "buyDropdownBound";
  const DESKTOP_HOVER_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 900px)";
  const CLOSE_DELAY_MS = 220;

  let trigger = null;
  let menu = null;
  let closeTimer = null;

  const items = [
    {
      label: "Buy a Florida Liquor License",
      href: "/buy-florida-liquor-license",
    },
    {
      label: "View Listings",
      href: "/listings",
    },
    {
      label: "Get a License Alert",
      href: "/license-alerts",
    },
    {
      label: "How to Buy a Florida Liquor License",
      href: "/how-to-buy-florida-liquor-license",
    },
  ];

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function desktopHoverAvailable() {
    return window.matchMedia(DESKTOP_HOVER_QUERY).matches;
  }

  function findTrigger() {
    return Array.from(document.querySelectorAll(".primary-nav a"))
      .find((link) => /^buy$/i.test(normalizedText(link)));
  }

  function clearCloseTimer() {
    if (closeTimer) window.clearTimeout(closeTimer);
    closeTimer = null;
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .buy-header-menu{
        position:fixed;
        z-index:10032;
        display:none;
        width:310px;
        padding:6px;
        border:1px solid #f6a700;
        border-radius:6px;
        background:#061728;
        box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 0 1px rgba(246,167,0,.12);
        font-family:Arial,Helvetica,sans-serif;
      }
      .buy-header-menu.is-open{display:grid;gap:4px}
      .buy-header-menu::before{
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
      .buy-header-menu a{
        position:relative;
        z-index:1;
        display:block;
        width:100%;
        padding:12px 13px;
        border-radius:4px;
        color:#fff;
        text-decoration:none;
        font:700 13px/1.3 Arial,Helvetica,sans-serif;
        letter-spacing:.01em;
      }
      .buy-header-menu a:hover,
      .buy-header-menu a:focus-visible{
        background:#f6a700;
        color:#061728;
        outline:none;
      }
      .primary-nav a[data-buy-dropdown-bound="true"]{cursor:pointer}
      @media(max-width:760px){
        .buy-header-menu{width:min(310px,calc(100vw - 24px))}
      }
    `;
    document.head.appendChild(style);
  }

  function positionMenu() {
    if (!menu || !trigger) return;

    const rect = trigger.getBoundingClientRect();
    const width = Math.min(310, window.innerWidth - 24);
    const desiredLeft = rect.left + rect.width / 2 - width / 2;
    const left = Math.max(12, Math.min(desiredLeft, window.innerWidth - width - 12));

    menu.style.width = `${width}px`;
    menu.style.left = `${left}px`;
    menu.style.top = `${rect.bottom + 8}px`;
  }

  function closeMenu({ restoreFocus = false } = {}) {
    clearCloseTimer();
    if (!menu) return;
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    trigger?.setAttribute("aria-expanded", "false");
    if (restoreFocus && trigger instanceof HTMLElement) trigger.focus();
  }

  function closeOtherHeaderMenus() {
    document.querySelectorAll(".market-data-header-menu,.resources-header-menu").forEach((otherMenu) => {
      otherMenu.classList.remove("is-open");
      otherMenu.setAttribute("aria-hidden", "true");
    });
    Array.from(document.querySelectorAll(".primary-nav a"))
      .filter((link) => /^(market data|resources)$/i.test(normalizedText(link)))
      .forEach((link) => link.setAttribute("aria-expanded", "false"));
  }

  function openMenu() {
    clearCloseTimer();
    installStyles();
    ensureMenu();
    positionMenu();
    closeOtherHeaderMenus();
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    trigger?.setAttribute("aria-expanded", "true");
  }

  function toggleMenu() {
    if (menu?.classList.contains("is-open")) closeMenu();
    else openMenu();
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer = window.setTimeout(() => {
      const pointerInside = Boolean(trigger?.matches(":hover")) || Boolean(menu?.matches(":hover"));
      const activeElement = document.activeElement;
      const focusInside = activeElement instanceof Node && (
        Boolean(trigger?.contains(activeElement)) || Boolean(menu?.contains(activeElement))
      );
      if (!pointerInside && !focusInside) closeMenu();
    }, CLOSE_DELAY_MS);
  }

  function ensureMenu() {
    if (menu) return menu;

    menu = document.createElement("div");
    menu.id = MENU_ID;
    menu.className = "buy-header-menu";
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-hidden", "true");

    items.forEach(({ label, href }) => {
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("role", "menuitem");
      link.textContent = label;
      link.addEventListener("click", () => closeMenu());
      menu.appendChild(link);
    });

    menu.addEventListener("pointerenter", () => clearCloseTimer());
    menu.addEventListener("pointerleave", () => {
      if (desktopHoverAvailable()) scheduleClose();
    });
    menu.addEventListener("focusin", () => clearCloseTimer());
    menu.addEventListener("focusout", () => scheduleClose());

    document.body.appendChild(menu);
    return menu;
  }

  function bindTrigger() {
    const candidate = findTrigger();
    if (!(candidate instanceof HTMLAnchorElement)) return false;
    if (candidate.dataset[BOUND_KEY] === "true") {
      trigger = candidate;
      return true;
    }

    trigger = candidate;
    trigger.dataset[BOUND_KEY] = "true";
    trigger.setAttribute("data-buy-dropdown-bound", "true");
    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-expanded", "false");

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleMenu();
    });
    trigger.addEventListener("pointerenter", () => {
      if (desktopHoverAvailable()) openMenu();
    });
    trigger.addEventListener("pointerleave", () => {
      if (desktopHoverAvailable()) scheduleClose();
    });
    trigger.addEventListener("focusin", () => {
      if (desktopHoverAvailable()) openMenu();
    });
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        openMenu();
        menu?.querySelector("a")?.focus();
      }
      if (event.key === "Escape") closeMenu({ restoreFocus: true });
    });
    return true;
  }

  document.addEventListener("click", (event) => {
    if (!menu?.classList.contains("is-open")) return;
    const target = event.target;
    if (target instanceof Node && (menu.contains(target) || trigger?.contains(target))) return;
    closeMenu();
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.classList.contains("is-open")) {
      closeMenu({ restoreFocus: true });
    }
  });

  window.addEventListener("resize", () => {
    if (menu?.classList.contains("is-open")) positionMenu();
  });
  window.addEventListener("scroll", () => {
    if (menu?.classList.contains("is-open")) positionMenu();
  }, { passive: true });

  function initialize() {
    installStyles();
    ensureMenu();
    bindTrigger();
    window.setTimeout(bindTrigger, 300);
    window.setTimeout(bindTrigger, 1000);
    window.setTimeout(bindTrigger, 2200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
