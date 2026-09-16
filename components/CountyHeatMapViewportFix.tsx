"use client";

import { useEffect } from "react";

const STYLE_ID = "county-heat-map-viewport-fix";

function installStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .county-availability-tooltip {
      position: fixed !important;
      z-index: 14010 !important;
      width: min(270px, calc(100vw - 24px)) !important;
      max-height: calc(100vh - 24px) !important;
      overflow: auto !important;
      right: auto !important;
      bottom: auto !important;
    }
    .county-heatmap-current-metric h3,
    .county-heatmap-switch button {
      font-variant-numeric: lining-nums tabular-nums !important;
      font-feature-settings: "lnum" 1, "tnum" 1 !important;
    }
    .county-heatmap-series-code {
      display: inline-block !important;
      font-family: Arial, Helvetica, sans-serif !important;
      font-variant-numeric: lining-nums tabular-nums !important;
      font-feature-settings: "lnum" 1, "tnum" 1 !important;
      font-weight: 800 !important;
      letter-spacing: 0 !important;
      line-height: 1 !important;
      vertical-align: baseline !important;
      transform: translateY(-.01em) !important;
    }
  `;
  document.head.appendChild(style);
}

function wrapFourCopText() {
  document.querySelectorAll<HTMLElement>(".county-heatmap-current-metric h3, .county-heatmap-switch button").forEach((element) => {
    if (element.querySelector(".county-heatmap-series-code")) return;
    const text = element.textContent || "";
    if (!/4COP/i.test(text)) return;
    const parts = text.split(/(4COP)/i);
    element.replaceChildren(...parts.map((part) => {
      if (/^4COP$/i.test(part)) {
        const span = document.createElement("span");
        span.className = "county-heatmap-series-code";
        span.textContent = "4COP";
        return span;
      }
      return document.createTextNode(part);
    }));
  });
}

function positionTooltip(target: Element, clientY?: number) {
  const tooltip = document.querySelector<HTMLElement>(".county-availability-tooltip.is-visible");
  const stateOutline = document.querySelector<SVGGraphicsElement>(".county-availability-map-svg > g");
  if (!tooltip || !stateOutline) return;

  const stateBounds = stateOutline.getBoundingClientRect();
  const countyBounds = target.getBoundingClientRect();
  const tooltipWidth = tooltip.offsetWidth || 270;
  const tooltipHeight = tooltip.offsetHeight || 190;
  const stateCenter = stateBounds.left + stateBounds.width / 2;
  const countyCenter = countyBounds.left + countyBounds.width / 2;
  const gap = 14;
  const desiredLeft = countyCenter < stateCenter
    ? stateBounds.left - tooltipWidth - gap
    : stateBounds.right + gap;
  const left = Math.max(12, Math.min(desiredLeft, window.innerWidth - tooltipWidth - 12));
  const anchorY = typeof clientY === "number" && Number.isFinite(clientY)
    ? clientY
    : countyBounds.top + countyBounds.height / 2;
  const top = Math.max(12, Math.min(anchorY - tooltipHeight / 2, window.innerHeight - tooltipHeight - 12));

  tooltip.style.position = "fixed";
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
  tooltip.style.right = "auto";
  tooltip.style.bottom = "auto";
}

function hoveredCountyLink() {
  return document.querySelector<Element>(".county-availability-map-svg a:hover, .county-availability-map-svg a.is-active");
}

export default function CountyHeatMapViewportFix() {
  useEffect(() => {
    installStyles();
    wrapFourCopText();

    const schedulePosition = (target: Element, clientY?: number) => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => positionTooltip(target, clientY));
      });
    };

    const onPointer = (event: PointerEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest(".county-availability-map-svg a")
        : null;
      if (!target) return;
      schedulePosition(target, event.clientY);
    };

    const onScroll = () => {
      const target = hoveredCountyLink();
      if (target) schedulePosition(target);
    };

    document.addEventListener("pointerenter", onPointer, true);
    document.addEventListener("pointermove", onPointer, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const observer = new MutationObserver(() => {
      wrapFourCopText();
      const target = hoveredCountyLink();
      if (target) schedulePosition(target);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    return () => {
      document.removeEventListener("pointerenter", onPointer, true);
      document.removeEventListener("pointermove", onPointer, true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
