"use client";

import { useEffect } from "react";

function dedicatedHeatMapHref(button: HTMLButtonElement) {
  const listingType = button.dataset.heatMapType || "quota";

  if (listingType === "businesses" || listingType === "businesses-sfs" || listingType === "businesses-2cop") {
    const params = new URLSearchParams({ view: listingType });
    const businessType = button.dataset.heatMapBusinessType?.trim();
    if (businessType && businessType !== "all") {
      params.set("businessType", businessType);
    }
    const county = button.dataset.heatMapCounty?.trim();
    if (county && county !== "all") params.set("county", county);
    return `/market-data/heat-map?${params.toString()}`;
  }

  const params = new URLSearchParams({ view: "licenses" });
  const county = button.dataset.heatMapCounty?.trim();
  if (county && county !== "all") params.set("county", county);
  params.set("licenseType", listingType);

  const status = button.dataset.heatMapStatus?.trim();
  if (status) params.set("status", status);

  return `/market-data/heat-map?${params.toString()}`;
}

export default function ListingsHeatMapEnhancement() {
  useEffect(() => {
    const filterButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".results-filters button"),
    );
    const button =
      filterButtons.find((candidate) =>
        /^(market )?heat map$/i.test((candidate.textContent || "").trim()),
      ) ||
      filterButtons.find((candidate) =>
        /apply filters/i.test(candidate.textContent || ""),
      );

    if (!button) return;

    const originalText = button.textContent;
    const originalType = button.type;

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      window.location.assign(dedicatedHeatMapHref(button));
    };

    button.textContent = "Heat Map";
    button.type = "button";
    button.removeAttribute("aria-haspopup");
    button.addEventListener("click", handleClick);

    return () => {
      button.removeEventListener("click", handleClick);
      button.textContent = originalText;
      button.type = originalType;
    };
  }, []);

  return null;
}
