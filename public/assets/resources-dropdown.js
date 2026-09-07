(() => {
  const STYLE_ID = "resources-dropdown-styles";
  const MENU_ID = "resources-header-menu";
  const BOUND_KEY = "resourcesDropdownBound";

  let activeTrigger = null;
  let menu = null;

  const resources = [
    { label: "FLLM Transaction Services", href: "/transaction-services", internal: true },
    { label: "Free Buyer’s & Seller’s Guide", href: "/free-guide", internal: true, badge: "FREE PDF" },
    { label: "View All Resources", href: "/resources", internal: true },
    { label: "Alcohol License Application Center", href: "/resources/application-center", internal: true },
    { label: "Florida Liquor License Lookup", href: "https://florida-liquor-license-market.jwigg023.chatgpt.site/license-lookup", highlight: true, badge: "LOOKUP" },
    { label: "Florida Liquor License Value Estimator", href: "/florida-liquor-license-value", internal: true, highlight: true, badge: "VALUE" },
    { label: "Florida Liquor License Laws", href: "/resources/florida-liquor-license-laws", internal: true },
    { label: "Florida Division of Alcoholic Beverages & Tobacco (DABT)", href: "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/" },
    { label: "Florida ABT Forms", href: "/resources/forms", internal: true },
    { label: "ABT-6002 Transfer Guide", href: "/dbpr-abt-6002", internal: true },
    { label: "License Fees", href: "/resources/license-fees", internal: true },
    { label: "Quota License Transfer Fee Calculator", href: "/resources/quota-transfer-fee-calculator", internal: true },
    { label: "Florida Department of Revenue (FDOR)", href: "/resources/florida-department-of-revenue", internal: true },
    { label: "Liquor License Attorneys", href: "/resources/liquor-license-attorneys", internal: true },
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
        width:min(920px,calc(100vw - 32px));
        padding:9px;
        border:1px solid #f6a700;
        border-radius:8px;
        background:#061728;
        box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 0 1px rgba(246,167,0,.12);
        font-family:Arial,Helvetica,sans-serif;
      }
      .resources-header-menu.is-open{
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:6px;
      }
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
        display:flex;
        align-items:center;
        justify-content:space-between;
        min-height:48px;
        width:100%;
        padding:9px 13px;
        border:1px solid rgba(255,255,255,.07);
        border-radius:6px;
        background:#081d31;
        color:#fff;
        text-decoration:none;
        font:700 13px/1.25 Arial,Helvetica,sans-serif;
        letter-spacing:.01em;
      }
      .resources-header-menu a[data-highlight="true"]{
        border-color:rgba(246,167,0,.58);
        background:linear-gradient(135deg,rgba(246,167,0,.13),#081d31);
        box-shadow:inset 3px 0 0 #f6a700;
      }
      .resources-header-menu a[data-highlight="true"]::after{
        color:#f6a700;
        font-weight:900;
      }
      .resources-header-menu a:hover,
      .resources-header-menu a:focus-visible{
        border-color:#f6a700;
        background:#0d2841;
        color:#f6a700;
        outline:none;
      }
      .resources-header-menu a[data-badge]::after{
        content:attr(data-badge);
        flex:0 0 auto;
        margin-left:12px;
        color:#f6a700;
        font-size:9px;
        font-weight:900;
        letter-spacing:.08em;
      }
      .primary-nav a[data-resources-dropdown-bound="true"]{cursor:pointer}
      @media(max-width:980px){
        .resources-header-menu.is-open{grid-template-columns:repeat(2,minmax(0,1fr))}
      }
      @media(max-width:760px){
        .resources-header-menu{
          width:min(360px,calc(100vw - 24px));
          max-height:70vh;
          overflow:auto;
        }
        .resources-header-menu.is-open{grid-template-columns:1fr}
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
    const width = Math.min(window.innerWidth - 32, window.innerWidth >= 980 ? 920 : window.innerWidth >= 760 ? 700 : 360);
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

    resources.forEach(({ label, href, internal, highlight, badge }) => {
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("role", "menuitem");
      link.textContent = label;
      if (!internal) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      if (highlight) link.dataset.highlight = "true";
      if (badge) link.dataset.badge = badge;
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
    trigger.setAttribute("href", "#resources-menu");
    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-expanded", "false");
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
    const target = event.target;
    const trigger = target instanceof Element ? target.closest(".primary-nav a") : null;
    if (trigger instanceof HTMLAnchorElement && /^resources$/i.test(normalizedText(trigger))) {
      event.preventDefault();
      event.stopPropagation();
      toggleMenu(trigger);
      return;
    }
    if (!menu?.classList.contains("is-open")) return;
    if (target instanceof Node && (menu.contains(target) || activeTrigger?.contains(target))) return;
    closeMenu();
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.classList.contains("is-open")) closeMenu({ restoreFocus: true });
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
