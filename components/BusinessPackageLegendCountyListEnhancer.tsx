"use client";

import { useEffect } from "react";

function matchesBand(count: number, index: number) {
  if (index === 0) return count === 0;
  if (index === 1) return count >= 1 && count <= 2;
  if (index === 2) return count >= 3 && count <= 5;
  if (index === 3) return count >= 6 && count <= 8;
  if (index === 4) return count >= 9 && count <= 11;
  return count >= 12;
}

export default function BusinessPackageLegendCountyListEnhancer({ routeKey }: { routeKey?: string }) {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>(".business-package-county-map").forEach((mapRoot) => {
      const stage = mapRoot.querySelector<HTMLElement>(".county-availability-map-stage");
      const legend = mapRoot.querySelector<HTMLElement>(".county-availability-map-legend ul");
      if (!stage || !legend) return;

      const panel = document.createElement("aside");
      panel.className = "business-package-band-county-list";
      panel.setAttribute("aria-hidden", "true");
      stage.appendChild(panel);

      const buttons = Array.from(
        legend.querySelectorAll<HTMLButtonElement>('button[aria-label^="Highlight counties with"]'),
      );

      const hide = () => {
        panel.classList.remove("is-visible");
        panel.setAttribute("aria-hidden", "true");
      };

      buttons.forEach((button, index) => {
        const show = () => {
          if (index === 0) {
            hide();
            return;
          }

          const rows = Array.from(
            stage.querySelectorAll<SVGPathElement>(".county-availability-map-svg path[data-county][data-listing-count]"),
          )
            .map((path) => ({
              name: path.dataset.county || "",
              count: Number(path.dataset.listingCount || "0"),
            }))
            .filter((row) => row.name && Number.isFinite(row.count) && matchesBand(row.count, index))
            .sort((a, b) => a.name.localeCompare(b.name));

          panel.replaceChildren();

          const eyebrow = document.createElement("span");
          eyebrow.textContent = "Counties Highlighted";
          const heading = document.createElement("strong");
          heading.textContent = (button.getAttribute("aria-label") || "").replace(/^Highlight counties with\s+/i, "");
          const total = document.createElement("small");
          total.textContent = `${rows.length} count${rows.length === 1 ? "y" : "ies"}`;
          const list = document.createElement("ul");

          for (const row of rows) {
            const item = document.createElement("li");
            const name = document.createElement("span");
            const count = document.createElement("b");
            name.textContent = row.name;
            count.textContent = String(row.count);
            item.append(name, count);
            list.appendChild(item);
          }

          panel.append(eyebrow, heading, total, list);
          panel.classList.add("is-visible");
          panel.setAttribute("aria-hidden", "false");
        };

        button.addEventListener("pointerenter", show);
        button.addEventListener("mouseenter", show);
        button.addEventListener("focus", show);

        cleanups.push(() => {
          button.removeEventListener("pointerenter", show);
          button.removeEventListener("mouseenter", show);
          button.removeEventListener("focus", show);
        });
      });

      const onLeave = () => hide();
      const onFocusOut = (event: FocusEvent) => {
        if (!legend.contains(event.relatedTarget as Node | null)) hide();
      };

      legend.addEventListener("pointerleave", onLeave);
      legend.addEventListener("mouseleave", onLeave);
      legend.addEventListener("focusout", onFocusOut);

      cleanups.push(() => {
        legend.removeEventListener("pointerleave", onLeave);
        legend.removeEventListener("mouseleave", onLeave);
        legend.removeEventListener("focusout", onFocusOut);
        panel.remove();
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [routeKey]);

  return null;
}
