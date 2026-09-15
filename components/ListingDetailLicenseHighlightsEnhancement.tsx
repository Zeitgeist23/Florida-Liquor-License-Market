"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SVG_PATHS = [
  '<path d="M11 42h13V18H11zM15 18V8h5v10M11 26h13M29 25h12l-2 9a5 5 0 0 1-4 3.5A5 5 0 0 1 31 34zM35 37.5V42M30 42h10" />',
  '<path d="M8 18h32l-4-9H12zM11 18v22h26V18M17 40V27h14v13M9 18c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0" />',
  '<path d="M15 9h18v33H10V9h5M18 6h12v7H18zM16 21l3 3 6-7M16 31l3 3 6-7M29 21h5M29 31h5" />',
  '<circle cx="24" cy="14" r="7" /><circle cx="10" cy="22" r="5" /><circle cx="38" cy="22" r="5" /><path d="M13 42v-6c0-7 5-12 11-12s11 5 11 12v6zM2 42v-5c0-5 4-9 9-9 2 0 4 1 6 2M46 42v-5c0-5-4-9-9-9-2 0-4 1-6 2" />',
] as const;

function buildFeature(iconMarkup: string, lines: string[]) {
  const item = document.createElement("div");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 48 48");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = iconMarkup;

  const strong = document.createElement("strong");
  lines.forEach((line, index) => {
    if (index) strong.appendChild(document.createElement("br"));
    strong.appendChild(document.createTextNode(line));
  });

  item.append(svg, strong);
  return item;
}

function syncListingHighlights() {
  const page = document.querySelector<HTMLElement>(".marketplace-listing-page");
  const main = page?.querySelector<HTMLElement>(".marketplace-listing-main");
  if (!page || !main) return;

  const referenceBox = main.querySelector<HTMLElement>(
    ".marketplace-listing-reference.marketplace-listing-reference-inline",
  );

  if (referenceBox) {
    const titleText = page.querySelector<HTMLElement>(".marketplace-listing-title-type")?.textContent || "";
    const is3ps = /3PS/i.test(titleText);
    const countyText =
      page.querySelector<HTMLAnchorElement>(".marketplace-listing-breadcrumbs a:nth-of-type(2)")?.textContent?.trim() ||
      "Florida County";
    const countyShort = countyText.replace(/\s+County$/i, "");

    const section = document.createElement("section");
    section.className = "marketplace-listing-highlights listing-detail-standard-highlights";
    section.setAttribute("aria-label", "License Highlights");

    const heading = document.createElement("h3");
    heading.textContent = "License Highlights";

    const grid = document.createElement("div");
    grid.className = "marketplace-listing-highlight-grid";
    grid.append(
      buildFeature(SVG_PATHS[0], is3ps ? ["Full-liquor", "package sales"] : ["Full-liquor", "privileges"]),
      buildFeature(SVG_PATHS[1], is3ps ? ["Off-premises", "package use"] : ["On- or", "off-premises use"]),
      buildFeature(SVG_PATHS[2], is3ps ? ["Transferable quota", "license series"] : ["Generally no SFS", "food-sales percentage"]),
      buildFeature(SVG_PATHS[3], [`Limited ${countyShort}`, "County quota supply"]),
    );

    section.append(heading, grid);
    referenceBox.replaceWith(section);
  }

  const standardHighlights = main.querySelector<HTMLElement>(".listing-detail-standard-highlights");
  if (standardHighlights) {
    main.querySelectorAll<HTMLElement>(".fllm-selfdirected-highlight-slot").forEach((slot) => {
      if (slot.style.display !== "none") slot.style.display = "none";
    });
  }
}

export default function ListingDetailLicenseHighlightsEnhancement() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith("/listings/") || pathname === "/listings") return;

    syncListingHighlights();
    const observer = new MutationObserver(syncListingHighlights);
    observer.observe(document.body, { childList: true, subtree: true });
    const timer = window.setTimeout(syncListingHighlights, 500);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
