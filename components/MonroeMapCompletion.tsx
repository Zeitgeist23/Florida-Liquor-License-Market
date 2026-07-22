"use client";

import { useEffect } from "react";

const SVG_NS = "http://www.w3.org/2000/svg";

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

function completeMonroeMaps(root: ParentNode) {
  root.querySelectorAll<SVGSVGElement>("svg.florida-county-map").forEach((map) => {
    if (map.querySelector('[data-monroe-county="true"]')) return;

    const isMonroe = map.getAttribute("aria-label")?.toLowerCase().includes("monroe county") ?? false;
    const path = document.createElementNS(SVG_NS, "path");

    path.setAttribute("data-monroe-county", "true");
    path.setAttribute("d", monroePath);
    path.setAttribute("fill", isMonroe ? "#f5a400" : "#dce4ea");
    path.setAttribute("stroke", isMonroe ? "#ffd76a" : "#71869a");
    path.setAttribute("stroke-width", isMonroe ? "1.8" : "0.75");

    if (isMonroe) path.setAttribute("filter", "url(#county-glow)");

    map.appendChild(path);
  });
}

export default function MonroeMapCompletion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".results-page");
    if (!root) return;

    completeMonroeMaps(root);

    const observer = new MutationObserver(() => completeMonroeMaps(root));
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
