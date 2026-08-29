(() => {
  const STYLE_ID = "resources-dropdown-styles";
  const MENU_ID = "resources-header-menu";
  const BOUND_KEY = "resourcesDropdownBound";

  let activeTrigger = null;
  let menu = null;

  const resources = [
    {
      label: "Free Buyer’s & Seller’s Guide",
      href: "/free-guide",
      internal: true,
    },
    {
      label: "View All Resources",
      href: "/resources",
      internal: true,
    },
    {
      label: "Alcohol License Application Center",
      href: "/resources/application-center",
      internal: true,
    },
    {
      label: "Florida Liquor License Lookup",
      href: "https://florida-liquor-license-market.jwigg023.chatgpt.site/license-lookup",
    },
    {
      label: "Florida Liquor License Laws",
      href: "/resources/florida-liquor-license-laws",
      internal: true,
    },
    {
      label: "Florida Division of Alcoholic Beverages & Tobacco (DABT)",
      href: "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/",
    },
    {
      label: "Florida ABT Forms",
      href: "/resources/forms",
      internal: true,
    },
    {
      label: "License Fees",
      href: "/resources/license-fees",
      internal: true,
    },
    {
      label: "Quota License Transfer Fee Calculator",
      href: "/resources/quota-transfer-fee-calculator",
      internal: true,
    },
    {
      label: "Florida Department of Revenue (FDOR)",
      href: "/resources/florida-department-of-revenue",
      internal: true,
    },
    {
      label: "Liquor License Attorneys",
      href: "/resources/liquor-license-attorneys",
      internal: true,
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
      .resources-header-menu a[href="/free-guide"]{
        background:transparent;
        color:#fff;
        font-weight:900;
      }
      .resources-header-menu a[href="/free-guide"]::after{
        content:"FREE PDF";
        float:right;
        margin-left:12px;
        font-size:9px;
        letter-spacing:.08em;
      }
      .resources-header-menu a[href="/free-guide"]:hover,
      .resources-header-menu a[href="/free-guide"]:focus-visible{
        background:#f6a700;
        color:#061728;
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

  function ensureLicenseTypesLink() {
    const trigger = findResourcesTrigger();
    if (!(trigger instanceof HTMLAnchorElement)) return false;

    const navigation = trigger.closest(".primary-nav");
    if (!(navigation instanceof HTMLElement)) return false;
    if (navigation.querySelector('a[href="/resources/florida-liquor-license-types"]')) return true;

    const link = document.createElement("a");
    link.href = "/resources/florida-liquor-license-types";
    const label = document.createElement("span");
    label.textContent = "License Types";
    link.appendChild(label);
    navigation.insertBefore(link, trigger);
    return true;
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

    resources.forEach(({ label, href, internal, newWindow }) => {
      const link = document.createElement("a");
      link.href = href;
      if (newWindow || !internal) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      if (newWindow) {
        link.addEventListener("click", (event) => {
          const popup = window.open(
            href,
            "fllm-quota-transfer-fee-calculator",
            "popup=yes,width=1180,height=860,resizable=yes,scrollbars=yes"
          );
          if (popup) {
            event.preventDefault();
            popup.focus();
          }
        });
      }
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

    if (
      trigger instanceof HTMLAnchorElement &&
      /^resources$/i.test(normalizedText(trigger))
    ) {
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
    ensureLicenseTypesLink();
    bindTrigger();
    window.setTimeout(ensureLicenseTypesLink, 300);
    window.setTimeout(bindTrigger, 300);
    window.setTimeout(ensureLicenseTypesLink, 1000);
    window.setTimeout(bindTrigger, 1000);
    window.setTimeout(ensureLicenseTypesLink, 2200);
    window.setTimeout(bindTrigger, 2200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
