"use client";

import { useEffect } from "react";

/**
 * Resources remains rendered by HeaderNavMenus, but desktop hover is handled
 * with CSS only. Blocking React's synthetic hover/focus events for this one
 * dropdown prevents the Resources hover path from triggering repeated state
 * updates while preserving the approved visual menu.
 */
export default function GlobalResourcesMenuSync() {
  useEffect(() => {
    const styleId = "resources-hover-stability-css";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @media (hover:hover) and (pointer:fine) {
          .primary-nav .native-nav-dropdown:has(> .native-nav-resources-menu):hover > .native-nav-resources-menu,
          .primary-nav .native-nav-dropdown:has(> .native-nav-resources-menu):focus-within > .native-nav-resources-menu {
            display:grid!important;
            gap:6px!important;
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

    document.addEventListener("mouseover", blockResourcesSyntheticHover, true);
    document.addEventListener("mouseout", blockResourcesSyntheticHover, true);
    document.addEventListener("pointerover", blockResourcesSyntheticHover, true);
    document.addEventListener("pointerout", blockResourcesSyntheticHover, true);
    document.addEventListener("focusin", blockResourcesSyntheticHover, true);
    document.addEventListener("focusout", blockResourcesSyntheticHover, true);
    document.addEventListener("click", blockResourcesDesktopClick, true);

    return () => {
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
