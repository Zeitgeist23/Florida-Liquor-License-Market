"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";

export type BusinessPackageHeatMapRow = {
  name: string;
  slug: string;
  listingCount: number;
  averagePrice: number | null;
  licenseType: string;
  businessCategories: string[];
};

type PinPosition = {
  key: string;
  x: number;
  y: number;
};

type TooltipPosition = {
  left: number;
  top: number;
};

function countyKey(value: string) {
  return value
    .replace(/\s+County$/i, "")
    .replace(/[^a-z]/gi, "")
    .toLowerCase();
}

function money(value: number | null) {
  if (value === null) return "Price data unavailable";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BusinessPackageHeatMap({
  rows,
  licenseType,
  businessTypeLabel,
}: {
  rows: BusinessPackageHeatMapRow[];
  licenseType: string;
  businessTypeLabel: string;
}) {
  const mapRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [pins, setPins] = useState<PinPosition[]>([]);
  const [active, setActive] = useState<BusinessPackageHeatMapRow | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    left: 24,
    top: 24,
  });

  const byCounty = useMemo(
    () => new Map(rows.map((row) => [countyKey(row.name), row])),
    [rows],
  );

  const totalPackages = useMemo(
    () => rows.reduce((sum, row) => sum + row.listingCount, 0),
    [rows],
  );

  const statewideAverage = useMemo(() => {
    const pricedRows = rows.filter(
      (row): row is BusinessPackageHeatMapRow & { averagePrice: number } =>
        typeof row.averagePrice === "number" &&
        Number.isFinite(row.averagePrice) &&
        row.averagePrice > 0,
    );
    if (!pricedRows.length) return null;

    const weightedTotal = pricedRows.reduce(
      (sum, row) => sum + row.averagePrice * row.listingCount,
      0,
    );
    const pricedCount = pricedRows.reduce(
      (sum, row) => sum + row.listingCount,
      0,
    );
    return pricedCount ? weightedTotal / pricedCount : null;
  }, [rows]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const map = mapRef.current;
      if (!map) return;

      const nextPins = rows
        .map((row) => {
          const key = countyKey(row.name);
          const path = map.querySelector<SVGPathElement>(
            `[data-package-county="${key}"]`,
          );
          if (!path) return null;
          const bounds = path.getBBox();
          return {
            key,
            x: bounds.x + bounds.width / 2,
            y: bounds.y + bounds.height / 2,
          };
        })
        .filter((pin): pin is PinPosition => Boolean(pin));

      setPins(nextPins);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [rows]);

  function placeTooltip(clientX: number, clientY: number) {
    const stage = stageRef.current;
    if (!stage) return;

    const bounds = stage.getBoundingClientRect();
    const width = 286;
    const height = 178;
    const padding = 12;

    let left = clientX - bounds.left + 18;
    let top = clientY - bounds.top - 24;

    if (left + width > bounds.width - padding) {
      left = clientX - bounds.left - width - 18;
    }

    left = Math.max(padding, Math.min(left, bounds.width - width - padding));
    top = Math.max(padding, Math.min(top, bounds.height - height - padding));

    setTooltipPosition({ left, top });
  }

  function activate(
    row: BusinessPackageHeatMapRow,
    clientX?: number,
    clientY?: number,
  ) {
    setActive(row);

    if (typeof clientX === "number" && typeof clientY === "number") {
      placeTooltip(clientX, clientY);
      return;
    }

    setTooltipPosition({ left: 24, top: 24 });
  }

  return (
    <section className="business-package-heat-map" aria-labelledby="business-package-map-title">
      <div className="business-package-map-heading">
        <div>
          <span>Business Package Inventory</span>
          <h2 id="business-package-map-title">
            Florida {licenseType} Business Packages
          </h2>
          <p>
            This map measures operating-business package inventory rather than
            stand-alone liquor-license value. Hover a county pin to see the
            number of similar packages and their average package asking price.
          </p>
        </div>
        <div className="business-package-map-summary" aria-label="Map summary">
          <article>
            <span>Packages</span>
            <strong>{totalPackages}</strong>
          </article>
          <article>
            <span>Counties</span>
            <strong>{rows.length}</strong>
          </article>
          <article>
            <span>Average Ask</span>
            <strong>{money(statewideAverage)}</strong>
          </article>
        </div>
      </div>

      <div className="business-package-map-filter-note">
        <span>License Type</span>
        <strong>{licenseType}</strong>
        <span>Business Type</span>
        <strong>{businessTypeLabel}</strong>
      </div>

      <div
        className="business-package-map-stage"
        ref={stageRef}
        onPointerLeave={() => setActive(null)}
      >
        <svg
          ref={mapRef}
          className="business-package-map-svg"
          viewBox="135 10 295 275"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`Florida county map showing ${licenseType} business packages for sale`}
        >
          <defs>
            <linearGradient id="business-package-map-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#061f35" />
              <stop offset="1" stopColor="#0d3152" />
            </linearGradient>
            <filter id="business-package-pin-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="135" y="10" width="295" height="275" fill="url(#business-package-map-bg)" rx="8" />

          <g strokeLinejoin="round" strokeLinecap="round">
            {FLORIDA_COUNTY_PATHS.map((county) => {
              const key = countyKey(county.name);
              const row = byCounty.get(key);
              return (
                <path
                  key={county.id}
                  d={county.path}
                  data-package-county={key}
                  className={row ? "business-package-map-county has-packages" : "business-package-map-county"}
                  fill={row ? "#167ea8" : "#123d65"}
                  stroke={row ? "#69d6ff" : "#2f6385"}
                  strokeWidth={row ? 1.15 : 0.65}
                  onPointerEnter={(event) => {
                    if (row) activate(row, event.clientX, event.clientY);
                  }}
                  onPointerMove={(event) => {
                    if (row) placeTooltip(event.clientX, event.clientY);
                  }}
                  onFocus={(event) => {
                    if (row) {
                      const bounds = event.currentTarget.getBoundingClientRect();
                      activate(
                        row,
                        bounds.left + bounds.width / 2,
                        bounds.top + bounds.height / 2,
                      );
                    }
                  }}
                  tabIndex={row ? 0 : -1}
                  aria-label={
                    row
                      ? `${row.name}: ${row.listingCount} ${licenseType} business packages, average asking price ${money(row.averagePrice)}`
                      : undefined
                  }
                />
              );
            })}
          </g>

          <g className="business-package-map-pins" aria-hidden="true">
            {pins.map((pin, index) => {
              const row = byCounty.get(pin.key);
              if (!row) return null;

              return (
                <g
                  key={pin.key}
                  transform={`translate(${pin.x} ${pin.y - 14})`}
                  className="business-package-pin-anchor"
                  style={{ animationDelay: `${Math.min(index * 35, 650)}ms` }}
                  onPointerEnter={(event) => activate(row, event.clientX, event.clientY)}
                  onPointerMove={(event) => placeTooltip(event.clientX, event.clientY)}
                >
                  <g className="business-package-pin-drop">
                    <path
                      d="M0,-16 C-7,-16 -12,-11 -12,-5 C-12,4 0,14 0,14 C0,14 12,4 12,-5 C12,-11 7,-16 0,-16Z"
                      fill="#69d6ff"
                      stroke="#d8f7ff"
                      strokeWidth="1.1"
                      filter="url(#business-package-pin-glow)"
                    />
                    <circle cx="0" cy="-5" r="4.2" fill="#061f35" stroke="#f1a600" strokeWidth="1.5" />
                  </g>
                </g>
              );
            })}
          </g>
        </svg>

        {active ? (
          <aside
            className="business-package-map-tooltip"
            style={{
              left: tooltipPosition.left,
              top: tooltipPosition.top,
            }}
            aria-live="polite"
          >
            <span>{active.name}</span>
            <strong>
              {active.listingCount} similar business
              {active.listingCount === 1 ? " package" : " packages"}
            </strong>
            <dl>
              <div>
                <dt>License Type</dt>
                <dd>{active.licenseType}</dd>
              </div>
              <div>
                <dt>Average Listing Price</dt>
                <dd>{money(active.averagePrice)}</dd>
              </div>
            </dl>
            {active.businessCategories.length ? (
              <p>{active.businessCategories.join(" · ")}</p>
            ) : null}
          </aside>
        ) : null}
      </div>

      <div className="business-package-map-legend" aria-label="Map legend">
        <span><i className="business-package-map-swatch county" /> Florida county</span>
        <span><i className="business-package-map-swatch inventory" /> Matching package inventory</span>
        <span><i className="business-package-map-swatch pin" /> County with package(s) for sale</span>
      </div>
    </section>
  );
}
