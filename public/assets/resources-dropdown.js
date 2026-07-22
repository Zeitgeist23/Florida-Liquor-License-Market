(() => {
  const STYLE_ID = "resources-dropdown-styles";
  const MENU_ID = "resources-header-menu";
  const BOUND_KEY = "resourcesDropdownBound";

  let activeTrigger = null;
  let menu = null;

  const resources = [
    {
      label: "Liquor License Attorneys",
      href: "https://www.floridabar.org/public/lrs/",
    },
    {
      label: "Florida Division of Alcoholic Beverages",
      href: "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/",
    },
    {
      label: "What is a Quota License",
      href: "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/faqs/",
    },
    {
      label: "License Fees",
      href: "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/license-information/",
    },
  ];

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .resources-header-menu{
        position:fixed;
        z-index:10031;
        display:none;
        width:332px;
        padding:6px;
        border:1px solid #f6a700;
        border-radius:6px;
        background:#061728;
        box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 0 1px rgba(246,167,0,.12);
        font-family:Arial,Helvetica,sans-serif;
      }
      .resources-header-menu.is-open{display:grid;gap:4px}
      .resources-header-menu::before{
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
      .resources-header-menu a{
        position:relative;
        z-index:1;
        display:block;
        width:100%;
        padding:12px 13px;
        border-radius:4px;
        color:#fff;
        text-decoration:none;
        font:700 13px/1.25 Arial,Helvetica,sans-serif;
        letter-spacing:.01em;
      }
      .resources-header-menu a:hover,
      .resources-header-menu a:focus-visible{
        background:#f6a700;
        color:#061728;
        outline:none;
      }
      .primary-nav a[data-resources-dropdown-bound="true"]{cursor:pointer}
      @media(max-width:760px){
        .resources-header-menu{width:min(332px,calc(100vw - 24px))}
      }
    `;
    document.head.appendChild(style);
  }

  function findResourcesTrigger() {
    return Array.from(document.querySelectorAll(".primary-nav a"))
      .find((link) => /^resources$/i.test(normalizedText(link)));
  }

  function closeMenu({ restoreFocus = false } = {}) {
    if (!menu) return;
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    if (activeTrigger) activeTrigger.setAttribute("aria-expanded", "false");
    if (restoreFocus && activeTrigger instanceof HTMLElement) activeTrigger.focus();
  }

  function positionMenu() {
    if (!menu || !activeTrigger) return;

    const rect = activeTrigger.getBoundingClientRect();
    const width = Math.min(332, window.innerWidth - 24);
    const desiredLeft = rect.left + rect.width / 2 - width / 2;
    const left = Math.max(12, Math.min(desiredLeft, window.innerWidth - width - 12));

    menu.style.width = `${width}px`;
    menu.style.left = `${left}px`;
    menu.style.top = `${rect.bottom + 8}px`;
  }

  function ensureMenu() {
    if (menu) return menu;

    menu = document.createElement("div");
    menu.id = MENU_ID;
    menu.className = "resources-header-menu";
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-hidden", "true");

    resources.forEach(({ label, href }) => {
      const link = document.createElement("a");
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("role", "menuitem");
      link.textContent = label;
      link.addEventListener("click", () => closeMenu());
      menu.appendChild(link);
    });

    document.body.appendChild(menu);
    return menu;
  }

  function openMenu(trigger) {
    activeTrigger = trigger;
    installStyles();
    ensureMenu();
    positionMenu();
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    activeTrigger.setAttribute("aria-expanded", "true");
  }

  function toggleMenu(trigger) {
    if (menu?.classList.contains("is-open") && activeTrigger === trigger) {
      closeMenu();
      return;
    }
    openMenu(trigger);
  }

  function bindTrigger() {
    const trigger = findResourcesTrigger();
    if (!(trigger instanceof HTMLAnchorElement)) return false;
    if (trigger.dataset[BOUND_KEY] === "true") return true;

    trigger.dataset[BOUND_KEY] = "true";
    trigger.setAttribute("data-resources-dropdown-bound", "true");
    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleMenu(trigger);
    }, true);
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        openMenu(trigger);
        menu?.querySelector("a")?.focus();
      }
    });
    return true;
  }

  document.addEventListener("click", (event) => {
    if (!menu?.classList.contains("is-open")) return;
    const target = event.target;
    if (target instanceof Node && (menu.contains(target) || activeTrigger?.contains(target))) return;
    closeMenu();
  });

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
