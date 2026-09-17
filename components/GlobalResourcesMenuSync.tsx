"use client";

import { useEffect } from "react";

/**
 * Resources remains rendered by HeaderNavMenus, but desktop hover is handled
 * with CSS only. The positioning code below centers the panel under the
 * Resources trigger, then clamps it only as much as necessary to keep it in
 * the viewport. It does not rewrite menu DOM or use a MutationObserver.
 */
export default function GlobalResourcesMenuSync() {
  useEffect(() => {
    const styleId = "resources-hover-stability-css";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .primary-nav .native-nav-resources-menu {
          left: var(--resources-menu-left, 50%) !important;
          right: auto !important;
          transform: none !important;
          margin-left: 0 !important;
        }
        .primary-nav .native-nav-resources-menu::before {
          left: var(--resources-arrow-left, 50%) !important;
          right: auto !important;
          transform: translateX(-50%) rotate(45deg) !important;
        }

        /* Approved Resources menu order, laid out row-by-row across 3 columns. */
        .primary-nav .native-nav-resources-menu > a:nth-child(1) { order: 1; }
        .primary-nav .native-nav-resources-menu > a:nth-child(7) { order: 2; }
        .primary-nav .native-nav-resources-menu > a:nth-child(11) { order: 3; }
        .primary-nav .native-nav-resources-menu > a:nth-child(4) { order: 4; }
        .primary-nav .native-nav-resources-menu > a:nth-child(8) { order: 5; }
        .primary-nav .native-nav-resources-menu > a:nth-child(6) { order: 6; }
        .primary-nav .native-nav-resources-menu > a:nth-child(5) { order: 7; }
        .primary-nav .native-nav-resources-menu > a:nth-child(9) { order: 8; }
        .primary-nav .native-nav-resources-menu > a:nth-child(15) { order: 9; }
        .primary-nav .native-nav-resources-menu > a:nth-child(3) { order: 10; }
        .primary-nav .native-nav-resources-menu > a:nth-child(10) { order: 11; }
        .primary-nav .native-nav-resources-menu > a:nth-child(12) { order: 12; }
        .primary-nav .native-nav-resources-menu > a:nth-child(13) { order: 13; }
        .primary-nav .native-nav-resources-menu > a:nth-child(14) { order: 14; }
        .primary-nav .native-nav-resources-menu > a:nth-child(2) { order: 15; }

        /* Restore the approved agency badges without mutating React-owned DOM. */
        .primary-nav .native-nav-resources-menu > a[href="/resources/florida-division-alcoholic-beverages-tobacco"]::after {
          content:"DABT";
          flex:0 0 auto;
          margin-left:auto;
          color:#f6a700;
          font-size:9px;
          font-weight:900;
          letter-spacing:.08em;
          white-space:nowrap;
        }
        .primary-nav .native-nav-resources-menu > a[href="/resources/florida-department-of-revenue"] {
          font-size:0!important;
        }
        .primary-nav .native-nav-resources-menu > a[href="/resources/florida-department-of-revenue"]::before {
          content:"Florida Department of Revenue";
          flex:1 1 auto;
          min-width:0;
          color:inherit;
          font:700 13px/1.3 Arial,Helvetica,sans-serif;
          letter-spacing:.01em;
          white-space:normal;
        }
        .primary-nav .native-nav-resources-menu > a[href="/resources/florida-department-of-revenue"]::after {
          content:"FDOR";
          flex:0 0 auto;
          margin-left:auto;
          color:#f6a700;
          font-size:9px;
          font-weight:900;
          letter-spacing:.08em;
          white-space:nowrap;
        }

        /* Keep the comparison table readable and give the quota-family badges room. */
        #common-license-chart .license-types-table th:nth-child(1),
        #common-license-chart .license-types-table td:nth-child(1) { width: 18% !important; }
        #common-license-chart .license-types-table th:nth-child(2),
        #common-license-chart .license-types-table td:nth-child(2) { width: 14% !important; }
        #common-license-chart .license-types-table th:nth-child(3),
        #common-license-chart .license-types-table td:nth-child(3) { width: 11% !important; }
        #common-license-chart .license-types-table th:nth-child(4),
        #common-license-chart .license-types-table td:nth-child(4) { width: 18% !important; }
        #common-license-chart .license-types-table th:nth-child(5),
        #common-license-chart .license-types-table td:nth-child(5) { width: 23% !important; }
        #common-license-chart .license-types-table th:nth-child(6),
        #common-license-chart .license-types-table td:nth-child(6) { width: 16% !important; }
        #common-license-chart .license-types-table thead th:nth-child(3) { white-space: nowrap; }
        #common-license-chart .license-types-table tbody th { vertical-align: middle !important; }
        #common-license-chart .license-types-table tbody th span {
          box-sizing: border-box;
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          white-space: normal !important;
          overflow-wrap: anywhere;
          text-align: center;
          line-height: 1.2;
          padding: 10px 8px !important;
        }
        #five-to-eight-cop { scroll-margin-top: 150px; }

        @media (hover:hover) and (pointer:fine) {
          .primary-nav .native-nav-dropdown:has(> .native-nav-resources-menu):hover > .native-nav-resources-menu,
          .primary-nav .native-nav-dropdown:has(> .native-nav-resources-menu):focus-within > .native-nav-resources-menu {
            display:grid!important;
            gap:6px!important;
          }
        }
        @media (max-width:760px) {
          .primary-nav .native-nav-resources-menu {
            left:50%!important;
            right:auto!important;
            transform:translateX(-50%)!important;
          }
          .primary-nav .native-nav-resources-menu::before {
            left:50%!important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const desktopHover = () => window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const isResourcesEvent = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      const dropdown = target.closest(".native-nav-dropdown");
      return Boolean(dropdown?.querySelector(":scope > .native-nav-resources-menu"));
    };

    const ensureFiveToEightCopLink = () => {
      document.querySelectorAll<HTMLElement>(".native-license-types-column").forEach((column) => {
        const heading = column.querySelector("strong");
        if (heading?.textContent?.trim() !== "Quota Licenses") return;
        if (column.querySelector('a[data-five-to-eight-cop="true"]')) return;

        const link = document.createElement("a");
        link.href = "/resources/florida-liquor-license-types#five-to-eight-cop";
        link.textContent = "5COP-8COP Quota Licenses";
        link.setAttribute("role", "menuitem");
        link.dataset.fiveToEightCop = "true";
        column.appendChild(link);
      });
    };

    const alignFiveToEightAnchor = () => {
      if (window.location.hash !== "#five-to-eight-cop") return;
      const row = document.getElementById("five-to-eight-cop");
      if (!row || row.dataset.hashAligned === "true") return;
      row.dataset.hashAligned = "true";
      window.requestAnimationFrame(() => {
        row.scrollIntoView({ block: "center" });
      });
    };

    const enhanceLicenseTypesChart = () => {
      const table = document.querySelector<HTMLTableElement>("#common-license-chart .license-types-table");
      if (!table) return;

      const rows = Array.from(table.querySelectorAll<HTMLTableRowElement>("tbody tr"));
      const rowBySeries = (series: string) => rows.find((row) => row.querySelector("th")?.textContent?.trim() === series);

      const packageRow = rowBySeries("3PS family") || rowBySeries("3DPS–3PS Quota Family");
      if (packageRow) {
        const cells = packageRow.children;
        const badge = packageRow.querySelector("th span");
        if (badge) badge.textContent = "3DPS–3PS Quota Family";
        if (cells[1]) cells[1].textContent = "Quota package-store license";
        if (cells[4]) cells[4].textContent = "County-limited quota license. Series is 3DPS, 3CPS, 3BPS, 3APS, or 3PS based on the applicable county population tier.";
      }

      const fourCopRow = rowBySeries("4COP family");
      if (fourCopRow) {
        const cells = fourCopRow.children;
        if (cells[1]) cells[1].textContent = "Quota consumption-on-premises license";
        if (cells[4]) cells[4].textContent = "County-limited quota license. 4COP is the series used in the largest county population tier.";

        if (!document.getElementById("five-to-eight-cop")) {
          const fiveToEightRow = fourCopRow.cloneNode(true) as HTMLTableRowElement;
          fiveToEightRow.id = "five-to-eight-cop";
          const newCells = fiveToEightRow.children;
          const newBadge = fiveToEightRow.querySelector("th span");
          if (newBadge) newBadge.textContent = "5COP–8COP";
          if (newCells[1]) newCells[1].textContent = "Quota consumption-on-premises license";
          if (newCells[2]) newCells[2].textContent = "Beer, wine, and liquor";
          if (newCells[3]) newCells[3].textContent = "By the drink or sealed containers for consumption on or off premises.";
          if (newCells[4]) newCells[4].textContent = "County-limited quota license. Series is 5COP, 6COP, 7COP, or 8COP depending on the applicable county population tier.";
          if (newCells[5]) newCells[5].textContent = "Bars, taverns, cocktail lounges, nightclubs, full-liquor restaurants, and other approved hospitality venues.";
          fourCopRow.insertAdjacentElement("afterend", fiveToEightRow);
        }
      }

      const headingCopy = document.querySelector<HTMLElement>("#common-license-chart .license-types-section-heading > p");
      if (headingCopy) {
        headingCopy.textContent = "Florida quota licenses use population-based series. 4COP and 3PS are the familiar largest-population series; 5COP–8COP and 3APS–3DPS are corresponding lower-population tiers.";
      }

      const quotaSection = document.querySelector<HTMLElement>(".license-types-quota");
      const quotaTitle = quotaSection?.querySelector("h2");
      const quotaCopy = quotaSection?.querySelector("p");
      if (quotaTitle) quotaTitle.textContent = "Quota COP and package-store licenses serve different business models";
      if (quotaCopy) quotaCopy.textContent = "4COP through 8COP are consumption-on-premises quota series commonly used by bars, taverns, restaurants and nightclubs, while the 3PS family is the package-store counterpart for sealed off-premises sales.";

      alignFiveToEightAnchor();
    };

    const positionResourcesMenus = () => {
      if (window.innerWidth <= 760) return;
      document.querySelectorAll<HTMLElement>(".native-nav-resources-menu").forEach((menu) => {
        const dropdown = menu.parentElement;
        const trigger = dropdown?.querySelector<HTMLElement>(".native-nav-trigger");
        if (!(dropdown instanceof HTMLElement) || !trigger) return;

        const triggerRect = trigger.getBoundingClientRect();
        const dropdownRect = dropdown.getBoundingClientRect();
        const computedWidth = Number.parseFloat(window.getComputedStyle(menu).width) || 860;
        const menuWidth = Math.min(computedWidth, window.innerWidth - 24);
        const triggerCenter = triggerRect.left + triggerRect.width / 2;
        const desiredViewportLeft = triggerCenter - menuWidth / 2;
        const viewportLeft = Math.max(12, Math.min(desiredViewportLeft, window.innerWidth - menuWidth - 12));
        const localLeft = viewportLeft - dropdownRect.left;
        const arrowLeft = triggerCenter - viewportLeft;

        menu.style.setProperty("--resources-menu-left", `${localLeft}px`);
        menu.style.setProperty("--resources-arrow-left", `${arrowLeft}px`);
      });
    };

    const positionOnResourcesHover = (event: Event) => {
      if (!desktopHover() || !isResourcesEvent(event.target)) return;
      window.requestAnimationFrame(positionResourcesMenus);
    };

    const blockResourcesSyntheticHover = (event: Event) => {
      if (!desktopHover() || !isResourcesEvent(event.target)) return;
      event.stopPropagation();
    };

    const closeResourcesOnPointerExit = (event: PointerEvent) => {
      if (!desktopHover() || !isResourcesEvent(event.target)) return;
      const target = event.target instanceof Element ? event.target : null;
      const dropdown = target?.closest<HTMLElement>(".native-nav-dropdown");
      if (!dropdown) return;

      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof Node && dropdown.contains(nextTarget)) return;

      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement && dropdown.contains(activeElement)) {
        activeElement.blur();
      }
    };

    const blockResourcesDesktopClick = (event: MouseEvent) => {
      if (!desktopHover() || !isResourcesEvent(event.target)) return;
      const target = event.target instanceof Element ? event.target : null;
      const trigger = target?.closest<HTMLElement>(".native-nav-trigger");
      if (!trigger) return;
      event.preventDefault();
      event.stopPropagation();
      trigger.blur();
    };

    ensureFiveToEightCopLink();
    enhanceLicenseTypesChart();
    const enhancementTimers = [100, 400, 1000].map((delay) => window.setTimeout(() => {
      ensureFiveToEightCopLink();
      enhanceLicenseTypesChart();
    }, delay));
    positionResourcesMenus();
    window.addEventListener("resize", positionResourcesMenus, { passive: true });
    window.addEventListener("hashchange", alignFiveToEightAnchor);
    document.addEventListener("pointerover", positionOnResourcesHover, true);
    document.addEventListener("mouseover", blockResourcesSyntheticHover, true);
    document.addEventListener("pointerover", blockResourcesSyntheticHover, true);
    document.addEventListener("pointerout", closeResourcesOnPointerExit, true);
    document.addEventListener("focusin", blockResourcesSyntheticHover, true);
    document.addEventListener("focusout", blockResourcesSyntheticHover, true);
    document.addEventListener("click", blockResourcesDesktopClick, true);

    return () => {
      enhancementTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("resize", positionResourcesMenus);
      window.removeEventListener("hashchange", alignFiveToEightAnchor);
      document.removeEventListener("pointerover", positionOnResourcesHover, true);
      document.removeEventListener("mouseover", blockResourcesSyntheticHover, true);
      document.removeEventListener("pointerover", blockResourcesSyntheticHover, true);
      document.removeEventListener("pointerout", closeResourcesOnPointerExit, true);
      document.removeEventListener("focusin", blockResourcesSyntheticHover, true);
      document.removeEventListener("focusout", blockResourcesSyntheticHover, true);
      document.removeEventListener("click", blockResourcesDesktopClick, true);
    };
  }, []);

  return null;
}
