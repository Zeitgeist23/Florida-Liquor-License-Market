"use client";

import { useEffect, useRef } from "react";
import FloridaCountyMap from "./FloridaCountyMap";

const SVG_NS = "http://www.w3.org/2000/svg";

const countyOrder = [
  "Okaloosa", "Glades", "DeSoto", "Dixie", "Martin", "Hardee", "Bay", "Flagler", "Orange", "Walton",
  "Pasco", "St. Lucie", "Washington", "Sumter", "Palm Beach", "Alachua", "Lafayette", "Okeechobee",
  "Hernando", "Charlotte", "Lee", "Lake", "Suwannee", "Levy", "Nassau", "Madison", "Columbia",
  "Calhoun", "Citrus", "Franklin", "Gadsden", "Gulf", "Jefferson", "Pinellas", "Clay", "Santa Rosa",
  "Seminole", "Volusia", "St. Johns", "Osceola", "Sarasota", "Gilchrist", "Hendry", "Highlands",
  "Indian River", "Manatee", "Union", "Duval", "Wakulla", "Jackson", "Leon", "Escambia", "Miami-Dade",
  "Bradford", "Taylor", "Broward", "Polk", "Brevard", "Hamilton", "Collier", "Baker", "Liberty", "Holmes",
  "Putnam", "Marion", "Hillsborough",
] as const;

type CountyPrices = { asking: number[]; sold: number[] };

const inventoryPrices: Record<string, CountyPrices> = {
  "Bay": { asking: [505000], sold: [] },
  "Broward": { asking: [240000, 215000], sold: [] },
  "Charlotte": { asking: [425000], sold: [] },
  "Collier": { asking: [500000], sold: [] },
  "DeSoto": { asking: [110000], sold: [] },
  "Duval": { asking: [710000, 659000], sold: [] },
  "Escambia": { asking: [575000, 395000], sold: [] },
  "Hillsborough": { asking: [250000, 245000, 210000], sold: [] },
  "Lake": { asking: [275000, 200000], sold: [] },
  "Lee": { asking: [], sold: [425000] },
  "Leon": { asking: [850000], sold: [] },
  "Manatee": { asking: [525000], sold: [] },
  "Marion": { asking: [290000], sold: [] },
  "Martin": { asking: [600000], sold: [] },
  "Miami-Dade": { asking: [195000], sold: [495000] },
  "Monroe": { asking: [1200000], sold: [] },
  "Orange": { asking: [515000, 550000, 499000], sold: [] },
  "Palm Beach": { asking: [225000], sold: [575000] },
  "Pasco": { asking: [315000, 325000, 325000], sold: [] },
  "Pinellas": { asking: [525000, 505000], sold: [] },
  "Polk": { asking: [200000, 245000, 209000], sold: [] },
  "Santa Rosa": { asking: [929000, 630000], sold: [] },
  "Sarasota": { asking: [540000], sold: [340000] },
  "Seminole": { asking: [250000], sold: [] },
  "St. Johns": { asking: [], sold: [425000] },
  "St. Lucie": { asking: [294995, 300000, 275000], sold: [] },
  "Volusia": { asking: [599000], sold: [] },
};

const monroePath = [
  "M365.128,230.762L386.572,230.693L386.572,248.312L383.988,250.604L380.242,250.741L376.754,248.894L372.491,247.833L369.133,245.369L366.549,242.184L364.999,238.276L363.449,234.436L365.128,230.762Z",
  "M386.572,248.312L390.059,250.878L389.155,253.612L385.538,252.964L382.955,250.741Z",
  "M382.18,253.373L379.338,255.458L376.367,256.585L374.946,255.115L378.175,252.759Z",
  "M373.654,257.408L369.778,259.638L366.678,260.978L364.87,259.492L368.616,257.226Z",
  "M362.932,262.018L359.315,264.229L355.827,265.417L354.277,263.745L358.153,261.482Z",
  "M352.21,266.403L348.206,268.256L344.718,269.147L343.297,267.39L347.56,265.602Z",
  "M341.101,270.074L336.967,272.027L333.35,272.849L332.058,271.061L336.451,269.147Z",
  "M329.733,273.633L325.858,275.527L321.983,276.201L320.95,274.339L325.083,272.544Z",
].join("");

function average(values: number[]) {
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function combinedAverage(prices: CountyPrices) {
  return average([...prices.asking, ...prices.sold]);
}

function priceColor(price?: number) {
  if (price === undefined || Number.isNaN(price)) return "#e3e7e9";
  if (price >= 600000) return "#ec341f";
  if (price >= 450000) return "#ff7b00";
  if (price >= 300000) return "#f4aa00";
  if (price >= 200000) return "#7faf2d";
  return "#3b8b35";
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function countyTitle(county: string, prices?: CountyPrices) {
  if (!prices) return `${county} County — no published inventory price`;

  const details = [`combined average ${money(combinedAverage(prices))}`];
  if (prices.asking.length) details.push(`asking average ${money(average(prices.asking))}`);
  if (prices.sold.length) details.push(`sold average ${money(average(prices.sold))}`);
  return `${county} County — ${details.join("; ")}`;
}

function styleCounty(path: SVGPathElement, county: string) {
  const prices = inventoryPrices[county];
  const price = prices ? combinedAverage(prices) : undefined;
  const hasSoldPrice = Boolean(prices?.sold.length);

  path.querySelector("title")?.remove();
  path.setAttribute("fill", priceColor(price));
  path.setAttribute("stroke", hasSoldPrice ? "#071a2b" : prices ? "#ffffff" : "#aeb8bf");
  path.setAttribute("stroke-width", hasSoldPrice ? "1.7" : prices ? "0.95" : "0.55");
  if (hasSoldPrice) path.setAttribute("stroke-dasharray", "2.4 1.3");
  else path.removeAttribute("stroke-dasharray");
  path.setAttribute("data-market-county", county);

  const title = document.createElementNS(SVG_NS, "title");
  title.textContent = countyTitle(county, prices);
  path.prepend(title);
}

export default function HomeMarketInsightsMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = mapRef.current?.querySelector<SVGSVGElement>("svg.florida-county-map");
    if (!map) return;

    map.classList.add("market-insights-svg");
    map.setAttribute("viewBox", "135 10 295 275");
    map.setAttribute("role", "img");
    map.setAttribute("aria-label", "Florida county map colored by published asking and sold inventory prices");

    const paths = Array.from(map.querySelectorAll<SVGPathElement>("g > path"));
    paths.forEach((path, index) => {
      const county = countyOrder[index];
      if (county) styleCounty(path, county);
    });

    const countyGroup = map.querySelector("g");
    if (countyGroup && !countyGroup.querySelector('[data-market-county="Monroe"]')) {
      const monroe = document.createElementNS(SVG_NS, "path");
      monroe.setAttribute("d", monroePath);
      styleCounty(monroe, "Monroe");
      countyGroup.appendChild(monroe);
    }
  }, []);

  return (
    <div ref={mapRef} className="home-market-insights-map">
      <FloridaCountyMap county="No county selected" />
    </div>
  );
}
