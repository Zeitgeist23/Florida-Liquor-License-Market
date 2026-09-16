"use client";

import { useEffect } from "react";

const MATCH_FILTER =
  "brightness(1.42) saturate(1.16) drop-shadow(0 0 7px rgba(105,214,255,.98))";

function currentPriceMode(root: Element) {
  if (root.classList.contains("unified-heat-map--median")) return "median";
  if (root.classList.contains("unified-heat-map--highest")) return "highest";
  return null;
}

function clearMapFilter(root: Element) {
  root.querySelectorAll<SVGPathElement>("[data-heat-map-county]").forEach((path) => {
    path.style.removeProperty("fill");
    path.style.removeProperty("filter");
    path.style.removeProperty("opacity");
  });

  root.querySelectorAll<HTMLElement>(".unified-heat-map-legend li").forEach((item) => {
    item.classList.remove("is-filter-active");
  });
}

function applyPriceBand(root: Element, item: HTMLElement) {
  const mode = currentPriceMode(root);
  if (!mode) return;

  const swatch = item.querySelector<HTMLElement>("i");
  if (!swatch) return;

  clearMapFilter(root);

  const targetColor = getComputedStyle(swatch).backgroundColor;
  const mutedFill = mode === "median" ? "#193552" : "#24323b";

  root.querySelectorAll<SVGPathElement>("[data-heat-map-county]").forEach((path) => {
    const countyColor = getComputedStyle(path).fill;
    const matches = countyColor === targetColor;

    if (matches) {
      path.style.filter = MATCH_FILTER;
      path.style.opacity = "1";
    } else {
      path.style.fill = mutedFill;
      path.style.opacity = "0.82";
      path.style.filter = "none";
    }
  });

  item.classList.add("is-filter-active");
}

function enhancePriceLegendItems(root: Element) {
  const mode = currentPriceMode(root);
  root.querySelectorAll<HTMLElement>(".unified-heat-map-legend ul li").forEach((item) => {
    if (mode) {
      item.tabIndex = 0;
      item.setAttribute("role", "button");
      const label = item.textContent?.trim();
      if (label) item.setAttribute("aria-label", `Highlight counties in ${label}`);
      item.style.cursor = "pointer";
    } else {
      item.removeAttribute("tabindex");
      item.removeAttribute("role");
      item.removeAttribute("aria-label");
      item.style.removeProperty("cursor");
    }
  });
}

export default function UnifiedHeatMapPriceScaleInteraction() {
  useEffect(() => {
    const root = document.querySelector(".unified-heat-map");
    if (!root) return;

    const legendSelector = ".unified-heat-map-legend ul li";

    const onPointerOver = (event: Event) => {
      if (!currentPriceMode(root)) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const item = target.closest<HTMLElement>(legendSelector);
      if (!item || !root.contains(item)) return;

      const pointerEvent = event as PointerEvent;
      if (pointerEvent.relatedTarget instanceof Node && item.contains(pointerEvent.relatedTarget)) return;
      applyPriceBand(root, item);
    };

    const onPointerOut = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const item = target.closest<HTMLElement>(legendSelector);
      if (!item || !root.contains(item)) return;

      const pointerEvent = event as PointerEvent;
      if (pointerEvent.relatedTarget instanceof Node && item.contains(pointerEvent.relatedTarget)) return;
      clearMapFilter(root);
    };

    const onFocusIn = (event: FocusEvent) => {
      if (!currentPriceMode(root)) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const item = target.closest<HTMLElement>(legendSelector);
      if (item && root.contains(item)) applyPriceBand(root, item);
    };

    const onFocusOut = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const item = target.closest<HTMLElement>(legendSelector);
      if (!item || !root.contains(item)) return;
      if (event.relatedTarget instanceof Node && item.contains(event.relatedTarget)) return;
      clearMapFilter(root);
    };

    const onControlClick = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest(".unified-heat-map-switch button, .unified-heat-map-series-switch button")) return;
      window.requestAnimationFrame(() => {
        clearMapFilter(root);
        enhancePriceLegendItems(root);
      });
    };

    const observer = new MutationObserver(() => {
      enhancePriceLegendItems(root);
    });

    enhancePriceLegendItems(root);
    root.addEventListener("pointerover", onPointerOver);
    root.addEventListener("pointerout", onPointerOut);
    root.addEventListener("focusin", onFocusIn as EventListener);
    root.addEventListener("focusout", onFocusOut as EventListener);
    root.addEventListener("click", onControlClick);
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      clearMapFilter(root);
      root.removeEventListener("pointerover", onPointerOver);
      root.removeEventListener("pointerout", onPointerOut);
      root.removeEventListener("focusin", onFocusIn as EventListener);
      root.removeEventListener("focusout", onFocusOut as EventListener);
      root.removeEventListener("click", onControlClick);
      observer.disconnect();
    };
  }, []);

  return null;
}
