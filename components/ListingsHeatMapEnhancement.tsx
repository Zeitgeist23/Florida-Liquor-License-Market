"use client";

import { useEffect } from "react";

type HeatMapApi = {
  open: (trigger?: EventTarget | null) => void;
  close: () => void;
};

type HeatMapWindow = Window & {
  FLLMHeatMap?: HeatMapApi;
};

const SCRIPT_ASSETS = [
  {
    id: "fllm-listings-heat-map-fit-script",
    src: "/assets/market-heat-map-fit-v4.js?v=7",
  },
  {
    id: "fllm-listings-heat-map-popup-cards-v3-script",
    src: "/assets/market-heat-map-popup-cards-v3.js?v=4",
  },
  {
    id: "fllm-listings-heat-map-county-links-script",
    src: "/assets/market-heat-map-county-links-v1.js?v=1",
  },
  {
    id: "fllm-listings-heat-map-script",
    src: "/assets/market-heat-map.js?v=5",
  },
] as const;

function getHeatMapApi() {
  return (window as HeatMapWindow).FLLMHeatMap;
}

function ensureScript(id: string, src: string) {
  return new Promise<void>((resolve, reject) => {
    const assetPath = src.split("?")[0];
    const existing =
      document.getElementById(id) ||
      document.querySelector<HTMLScriptElement>(`script[src*="${assetPath}"]`);

    if (existing instanceof HTMLScriptElement) {
      if (existing.dataset.fllmLoaded === "true" || (assetPath.endsWith("market-heat-map.js") && getHeatMapApi())) {
        resolve();
        return;
      }

      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Could not load ${assetPath}`)), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.defer = true;
    script.addEventListener(
      "load",
      () => {
        script.dataset.fllmLoaded = "true";
        resolve();
      },
      { once: true },
    );
    script.addEventListener("error", () => reject(new Error(`Could not load ${assetPath}`)), { once: true });
    document.head.appendChild(script);
  });
}

function openDedicatedHeatMap(heatMap: HeatMapApi, button: HTMLButtonElement) {
  const listingCardMaps = Array.from(
    document.querySelectorAll<SVGSVGElement>("svg.florida-county-map"),
  ).filter((map) => !map.closest(".florida-map-art"));

  listingCardMaps.forEach((map) => map.classList.remove("florida-county-map"));

  try {
    heatMap.open(button);
  } finally {
    listingCardMaps.forEach((map) => map.classList.add("florida-county-map"));
  }
}

export default function ListingsHeatMapEnhancement() {
  useEffect(() => {
    const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(".results-filters button"));
    const button =
      filterButtons.find((candidate) => /^(market )?heat map$/i.test((candidate.textContent || "").trim())) ||
      filterButtons.find((candidate) => /apply filters/i.test(candidate.textContent || ""));

    if (!button) return;

    const originalText = button.textContent;
    const originalType = button.type;
    const originalHasPopup = button.getAttribute("aria-haspopup");

    const handleClick = async (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      button.disabled = true;
      button.setAttribute("aria-busy", "true");

      try {
        await Promise.all(SCRIPT_ASSETS.map((asset) => ensureScript(asset.id, asset.src)));
        const heatMap = getHeatMapApi();
        if (!heatMap) throw new Error("Shared heat map API was not initialized");
        openDedicatedHeatMap(heatMap, button);
      } catch (error) {
        console.error("Listings heat map could not open", error);
      } finally {
        button.disabled = false;
        button.removeAttribute("aria-busy");
      }
    };

    button.textContent = "Heat Map";
    button.type = "button";
    button.setAttribute("aria-haspopup", "dialog");
    button.addEventListener("click", handleClick);

    return () => {
      button.removeEventListener("click", handleClick);
      button.textContent = originalText;
      button.type = originalType;
      if (originalHasPopup === null) button.removeAttribute("aria-haspopup");
      else button.setAttribute("aria-haspopup", originalHasPopup);
      button.removeAttribute("aria-busy");
      button.disabled = false;
      getHeatMapApi()?.close();
    };
  }, []);

  return null;
}
