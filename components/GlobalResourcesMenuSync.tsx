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

        /* Keep the approved Resources menu row order without rewriting DOM. */
        .primary-nav .native-nav-resources-menu > a:nth-child(1) { order: 1; }
        .primary-nav .native-nav-resources-menu > a:nth-child(7) { order: 2; }
        .primary-nav .native-nav-resources-menu > a:nth-child(11) { order: 3; }
        .primary-nav .native-nav-resources-menu > a:nth-child(4) { order: 4; }
        .primary-nav .native-nav-resources-menu > a:nth-child(8) { order: 5; }
        .primary-nav .native-nav-resources-menu > a:nth-child(6) { order: 6; }
        .primary-nav .native-nav-resources-menu > a:nth-child(5) { order: 7; }
        .primary-nav .native-nav-resources-menu > a:nth-child(9) { order: 8; }
        .primary-nav .native-nav-resources-menu > a:nth-child(12) { order: 9; }
        .primary-nav .native-nav-resources-menu > a:nth-child(3) { order: 10; }
        .primary-nav .native-nav-resources-menu > a:nth-child(10) { order: 11; }
        .primary-nav .native-nav-resources-menu > a:nth-child(2) { order: 12; }
        .primary-nav .native-nav-resources-menu > a:nth-child(13) { order: 13; }
        .primary-nav .native-nav-resources-menu > a:nth-child(14) { order: 14; }
        .primary-nav .native-nav-resources-menu > a:nth-child(15) { order: 15; }

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

    const blockResourcesDesktopClick = (event: MouseEvent) => {
      if (!desktopHover() || !isResourcesEvent(event.target)) return;
      const target = event.target instanceof Element ? event.target : null;
      if (!target?.closest(".native-nav-trigger")) return;
      event.preventDefault();
      event.stopPropagation();
    };

    positionResourcesMenus();
    window.addEventListener("resize", positionResourcesMenus, { passive: true });
    document.addEventListener("pointerover", positionOnResourcesHover, true);
    document.addEventListener("mouseover", blockResourcesSyntheticHover, true);
    document.addEventListener("mouseout", blockResourcesSyntheticHover, true);
    document.addEventListener("pointerover", blockResourcesSyntheticHover, true);
    document.addEventListener("pointerout", blockResourcesSyntheticHover, true);
    document.addEventListener("focusin", blockResourcesSyntheticHover, true);
    document.addEventListener("focusout", blockResourcesSyntheticHover, true);
    document.addEventListener("click", blockResourcesDesktopClick, true);

    return () => {
      window.removeEventListener("resize", positionResourcesMenus);
      document.removeEventListener("pointerover", positionOnResourcesHover, true);
      document.removeEventListener("mouseover", blockResourcesSyntheticHover, true);
      document.removeEventListener("mouseout", blockResourcesSyntheticHover, true);
      document.removeEventListener("pointerover", blockResourcesSyntheticHover, true);
      document.removeEventListener("pointerout", blockResourcesSyntheticHover, true);
      document.removeEventListener("focusin", blockResourcesSyntheticHover, true);
      document.removeEventListener("focusout", blockResourcesSyntheticHover, true);
      document.removeEventListener("click", blockResourcesDesktopClick, true);
    };
  }, []);

  return null;
}
