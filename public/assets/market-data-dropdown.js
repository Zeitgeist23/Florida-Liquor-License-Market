(() => {
  const STYLE_ID = "market-data-dropdown-styles";
  const MENU_ID = "market-data-header-menu";
  const BOUND_KEY = "marketDataDropdownBound";

  let activeTrigger = null;
  let menu = null;

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .market-data-header-menu{
        position:fixed;
        z-index:10030;
        display:none;
        width:278px;
        padding:6px;
        border:1px solid #f6a700;
        border-radius:6px;
        background:#061728;
        box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 0 1px rgba(246,167,0,.12);
        font-family:Arial,Helvetica,sans-serif;
      }
      .market-data-header-menu.is-open{display:grid;gap:4px}
      .market-data-header-menu::before{
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
      .market-data-header-menu button{
        position:relative;
        z-index:1;
        width:100%;
        padding:12px 13px;
        border:0;
        border-radius:4px;
        background:transparent;
        color:#fff;
        cursor:pointer;
        text-align:left;
        font:700 13px/1.25 Arial,Helvetica,sans-serif;
        letter-spacing:.01em;
      }
      .market-data-header-menu button:hover,
      .market-data-header-menu button:focus-visible{
        background:#f6a700;
        color:#061728;
        outline:none;
      }
      .primary-nav a[data-market-data-dropdown-bound="true"]{
        cursor:pointer;
      }
      @media(max-width:760px){
        .market-data-header-menu{
          width:min(300px,calc(100vw - 24px));
        }
      }
    `;
    document.head.appendChild(style);
  }

  function findMarketDataTrigger() {
    return Array.from(document.querySelectorAll(".primary-nav a"))
      .find((link) => /^market data$/i.test(normalizedText(link)));
  }

  function findHeading(label) {
    const expected = label.toUpperCase();
    return Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6,strong,span,div"))
      .find((element) => normalizedText(element).toUpperCase() === expected) || null;
  }

  function scrollToElement(element) {
    if (!(element instanceof Element)) return false;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => window.scrollBy({ top: -88, behavior: "smooth" }), 280);
    return true;
  }

  function goToRecentTransactions() {
    window.location.assign("/listings?status=sold");
  }

  function goToMarketInsights() {
    const panel = document.querySelector(".map-panel");
    if (panel) {
      scrollToElement(panel);
      return;
    }

    const heading = findHeading("Florida Market Insights");
    if (heading) scrollToElement(heading.closest("section") || heading);
    else window.location.hash = "market-data";
  }

  function openHeatMap() {
    const panel = document.querySelector(".map-panel");
    const heatMapTrigger = panel
      ? Array.from(panel.querySelectorAll("a,button")).find((element) => /explore market data/i.test(normalizedText(element)))
      : null;

    if (heatMapTrigger instanceof HTMLElement) {
      heatMapTrigger.click();
      return;
    }

    goToMarketInsights();
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
    const width = Math.min(278, window.innerWidth - 24);
    const desiredLeft = rect.left + rect.width / 2 - width / 2;
    const left = Math.max(12, Math.min(desiredLeft, window.innerWidth - width - 12));

    menu.style.width = `${width}px`;
    menu.style.left = `${left}px`;
    menu.style.top = `${rect.bottom + 8}px`;
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

  function makeOption(label, action) {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("role", "menuitem");
    button.textContent = label;
    button.addEventListener("click", () => {
      closeMenu();
      window.setTimeout(action, 20);
    });
    return button;
  }

  function ensureMenu() {
    if (menu) return menu;

    menu = document.createElement("div");
    menu.id = MENU_ID;
    menu.className = "market-data-header-menu";
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-hidden", "true");
    menu.append(
      makeOption("Recent Florida Transactions", goToRecentTransactions),
      makeOption("Florida Market Insights", goToMarketInsights),
      makeOption("Heat Map", openHeatMap),
    );
    document.body.appendChild(menu);
    return menu;
  }

  function bindTrigger() {
    const trigger = findMarketDataTrigger();
    if (!(trigger instanceof HTMLAnchorElement)) return false;
    if (trigger.dataset[BOUND_KEY] === "true") return true;

    trigger.dataset[BOUND_KEY] = "true";
    trigger.setAttribute("data-market-data-dropdown-bound", "true");
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
        menu?.querySelector("button")?.focus();
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