"use client";

import { useMemo, useRef, useState } from "react";

import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";

export type CountyAvailabilityHeatMapRow = {
  name: string;
  slug: string;
  listingCount: number;
  population: number | null;
  fourCopMedian: number | null;
  threePsMedian: number | null;
  drawingLicenses: number;
};

type MapMode = "inventory" | "price";

const INVENTORY_LEGEND = [
  { color: "#193552", label: "0 listings" },
  { color: "#195b86", label: "1–2 listings" },
  { color: "#167ea8", label: "3–5 listings" },
  { color: "#1bbbd0", label: "6–8 listings" },
  { color: "#7357e8", label: "9–11 listings" },
  { color: "#a855f7", label: "12+ listings" },
];

const PRICE_LEGEND = [
  { color: "#193552", label: "No disclosed price" },
  { color: "#75c9ff", label: "Under $200K" },
  { color: "#38a8df", label: "$200K–$299K" },
  { color: "#6366e8", label: "$300K–$449K" },
  { color: "#8b5cf6", label: "$450K–$649K" },
  { color: "#f05a32", label: "$650K–$799K" },
  { color: "#dc2626", label: "$800K+" },
];

function countyKey(value: string) {
  return value.replace(/\s+County$/i, "").replace(/[^a-z]/gi, "").toLowerCase();
}

function inventoryColor(count: number) {
  if (count >= 12) return "#a855f7";
  if (count >= 9) return "#7357e8";
  if (count >= 6) return "#1bbbd0";
  if (count >= 3) return "#167ea8";
  if (count >= 1) return "#195b86";
  return "#193552";
}

function priceColor(value: number | null) {
  if (value === null) return "#193552";
  if (value >= 800_000) return "#dc2626";
  if (value >= 650_000) return "#f05a32";
  if (value >= 450_000) return "#8b5cf6";
  if (value >= 300_000) return "#6366e8";
  if (value >= 200_000) return "#38a8df";
  return "#75c9ff";
}

function money(value: number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function InteractiveCountyMap({ rows, mode }: { rows: CountyAvailabilityHeatMapRow[]; mode: MapMode }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [mapPin, setMapPin] = useState<{ x: number; y: number; color: string } | null>(null);
  const [priceOrder, setPriceOrder] = useState<"highest" | "lowest">("highest");
  const stageRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLElement>(null);

  const rowsByCounty = useMemo(
    () => new Map(rows.map((row) => [countyKey(row.name), row])),
    [rows],
  );
  const activeRow = activeSlug ? rowsByCounty.get(countyKey(activeSlug)) ?? null : null;
  const ranking = useMemo(() => {
    const eligible = rows.filter((row) => mode === "inventory" ? row.listingCount > 0 : row.fourCopMedian !== null);
    return [...eligible]
      .sort((a, b) => {
        if (mode === "inventory") return b.listingCount - a.listingCount;
        const difference = (b.fourCopMedian ?? 0) - (a.fourCopMedian ?? 0);
        return priceOrder === "highest" ? difference : -difference;
      })
      .slice(0, 5);
  }, [mode, priceOrder, rows]);
  const maxRankingValue = ranking.reduce((maximum, row) => Math.max(
    maximum,
    mode === "inventory" ? row.listingCount : row.fourCopMedian ?? 0,
  ), 0);
  const isInventory = mode === "inventory";

  function positionTooltip(target: Element, clientY: number) {
    const stage = stageRef.current;
    const tooltip = tooltipRef.current;
    const stateOutline = stage?.querySelector(".county-availability-map-svg > g");
    if (!stage || !tooltip || !stateOutline) return;

    const stageBounds = stage.getBoundingClientRect();
    const stateBounds = stateOutline.getBoundingClientRect();
    const countyBounds = target.getBoundingClientRect();
    const stateLeft = stateBounds.left;
    const stateRight = stateBounds.right;
    const stateCenter = stateBounds.left + stateBounds.width / 2;
    const countyCenter = countyBounds.left + countyBounds.width / 2;
    const tooltipWidth = tooltip.offsetWidth || 270;
    const tooltipHeight = tooltip.offsetHeight || 190;
    const gap = 14;
    const desiredLeft = countyCenter < stateCenter
      ? stateLeft - tooltipWidth - gap
      : stateRight + gap;
    const viewportLeft = Math.min(
      Math.max(12, desiredLeft),
      window.innerWidth - tooltipWidth - 12,
    );
    const top = Math.min(
      Math.max(10, clientY - stageBounds.top - tooltipHeight / 2),
      Math.max(10, stageBounds.height - tooltipHeight - 10),
    );

    tooltip.style.left = `${viewportLeft - stageBounds.left}px`;
    tooltip.style.right = "auto";
    tooltip.style.top = `${top}px`;
    tooltip.style.bottom = "auto";
  }

  function activateCounty(row: CountyAvailabilityHeatMapRow, target: Element, clientY: number) {
    const countyPath = target.matches("path")
      ? target
      : target.querySelector("path");

    setActiveSlug(row.name);
    if (countyPath instanceof SVGGraphicsElement) {
      const bounds = countyPath.getBBox();
      setMapPin({
        x: bounds.x + bounds.width / 2,
        y: bounds.y + bounds.height / 2,
        color: isInventory ? inventoryColor(row.listingCount) : priceColor(row.fourCopMedian),
      });
    }
    requestAnimationFrame(() => positionTooltip(target, clientY));
  }

  function activateRankedCounty(row: CountyAvailabilityHeatMapRow) {
    const stage = stageRef.current;
    if (!stage) return;
    const countyPath = Array.from(
      stage.querySelectorAll<SVGPathElement>(".county-availability-map-svg path"),
    ).find((path) => path.dataset.county === row.name);
    const countyLink = countyPath?.closest("a");
    if (!countyPath || !countyLink) return;
    const bounds = countyPath.getBoundingClientRect();
    activateCounty(row, countyLink, bounds.top + bounds.height / 2);
  }

  function deactivateCounty() {
    setActiveSlug(null);
    setMapPin(null);
  }

  const legend = isInventory ? INVENTORY_LEGEND : PRICE_LEGEND;

  return (
    <article className={`county-heatmap-module county-heatmap-module--${mode}`}>
      <div className="county-heatmap-module-grid">
        <div className="county-availability-map-stage" ref={stageRef}>
          <svg
            className="county-availability-map-svg"
            viewBox="135 10 295 275"
            role="img"
            aria-label={isInventory
              ? "Interactive Florida county map shaded by active marketplace liquor license listings"
              : "Interactive Florida county map shaded by median disclosed 4COP asking price"}
          >
            <g>
              {FLORIDA_COUNTY_PATHS.map((county) => {
                const row = rowsByCounty.get(countyKey(county.name));
                const listingCount = row?.listingCount ?? 0;
                const price = row?.fourCopMedian ?? null;
                const metricLabel = isInventory
                  ? `${listingCount} active marketplace listing${listingCount === 1 ? "" : "s"}`
                  : price === null ? "no disclosed 4COP asking price" : `${money(price)} median disclosed 4COP asking price`;
                const label = row
                  ? `${row.name}: ${metricLabel}; open county market page`
                  : `${county.name} County: no current market data`;

                return (
                  <a
                    key={county.id}
                    href={row ? `/counties/${row.slug}` : "/counties"}
                    className={row && activeSlug === row.name ? "is-active" : undefined}
                    aria-label={label}
                    onPointerEnter={(event) => row && activateCounty(row, event.currentTarget, event.clientY)}
                    onPointerMove={(event) => positionTooltip(event.currentTarget, event.clientY)}
                    onPointerLeave={deactivateCounty}
                    onFocus={(event) => {
                      if (!row) return;
                      const bounds = event.currentTarget.getBoundingClientRect();
                      activateCounty(row, event.currentTarget, bounds.top + bounds.height / 2);
                    }}
                    onBlur={deactivateCounty}
                  >
                    <path
                      d={county.path}
                      fill={isInventory ? inventoryColor(listingCount) : priceColor(price)}
                      data-listing-count={listingCount}
                      data-price={price ?? ""}
                      data-county={row?.name ?? `${county.name} County`}
                    />
                  </a>
                );
              })}
            </g>
            {mapPin ? (
              <g transform={`translate(${mapPin.x} ${mapPin.y})`} aria-hidden="true">
                <g className="county-map-pin-marker">
                  <line x1="0" y1="-25" x2="0" y2="-3" />
                  <circle className="county-map-pin-tip" cx="0" cy="-29" r="5.5" fill={mapPin.color} />
                  <circle className="county-map-pin-shine" cx="-1.6" cy="-30.7" r="1.25" />
                  <circle className="county-map-pin-point" cx="0" cy="0" r="1.8" fill={mapPin.color} />
                </g>
              </g>
            ) : null}
          </svg>

          <aside
            ref={tooltipRef}
            className={`county-availability-tooltip${activeRow ? " is-visible" : ""}`}
            aria-hidden={!activeRow}
          >
            {activeRow ? (
              <>
                <span>{activeRow.name}</span>
                <strong>{isInventory
                  ? `${activeRow.listingCount} active listing${activeRow.listingCount === 1 ? "" : "s"}`
                  : `${money(activeRow.fourCopMedian)} median 4COP ask`}</strong>
                <dl>
                  <div><dt>4COP median</dt><dd>{money(activeRow.fourCopMedian)}</dd></div>
                  <div><dt>3PS median</dt><dd>{money(activeRow.threePsMedian)}</dd></div>
                  <div><dt>Active listings</dt><dd>{activeRow.listingCount}</dd></div>
                  <div><dt>2026 new quota</dt><dd>{activeRow.drawingLicenses || "—"}</dd></div>
                </dl>
                <small>Select county for full market data →</small>
              </>
            ) : null}
          </aside>
        </div>

        <aside className="county-availability-map-legend">
          <span>{isInventory ? "Listing Scale" : "Price Scale"}</span>
          <h4>{isInventory ? "Marketplace availability" : "Disclosed asking ranges"}</h4>
          <ul aria-label={isInventory ? "Active listings color scale" : "Median 4COP asking-price color scale"}>
            {legend.map((item) => (
              <li key={item.label}><i style={{ background: item.color }} />{item.label}</li>
            ))}
          </ul>

          <div className="county-heatmap-ranking">
            <div className="county-heatmap-ranking-heading">
              <strong>{isInventory
                ? "Most active counties"
                : priceOrder === "highest" ? "Highest median asks" : "Lowest median asks"}</strong>
              {!isInventory ? (
                <button
                  type="button"
                  aria-label={priceOrder === "highest"
                    ? "Show lowest median asking-price counties"
                    : "Show highest median asking-price counties"}
                  title={priceOrder === "highest"
                    ? "Show lowest median asks"
                    : "Show highest median asks"}
                  onClick={() => setPriceOrder((current) => current === "highest" ? "lowest" : "highest")}
                >
                  <span aria-hidden="true">{priceOrder === "highest" ? "↓" : "↑"}</span>
                </button>
              ) : null}
            </div>
            <ol>
              {ranking.map((row) => {
                const value = isInventory ? row.listingCount : row.fourCopMedian ?? 0;
                return (
                  <li
                    key={row.slug}
                    className={activeSlug === row.name ? "is-map-active" : undefined}
                    onPointerEnter={() => activateRankedCounty(row)}
                    onPointerLeave={deactivateCounty}
                    onFocus={() => activateRankedCounty(row)}
                    onBlur={deactivateCounty}
                  >
                    <span><a href={`/counties/${row.slug}`}>{row.name.replace(/ County$/i, "")}</a><b>{isInventory ? value : money(value)}</b></span>
                    <i><em style={{ width: `${Math.max(8, (value / maxRankingValue) * 100)}%` }} /></i>
                  </li>
                );
              })}
            </ol>
          </div>

          <small className="county-availability-map-note">
            {isInventory
              ? "Marketplace inventory currently tracked by FLLM."
              : "Disclosed asking prices are not appraisals or verified closed-sale values."}
          </small>
        </aside>
      </div>
    </article>
  );
}

export default function CountyAvailabilityHeatMap({ rows }: { rows: CountyAvailabilityHeatMapRow[] }) {
  const [mode, setMode] = useState<MapMode>("inventory");
  const isInventory = mode === "inventory";

  return (
    <section className="county-availability-map-section" aria-labelledby="county-availability-map-title">
      <div className="directory-shell">
        <div className="directory-heading county-availability-map-heading">
          <div>
            <span>Statewide Market Distribution</span>
            <h2 id="county-availability-map-title">Florida liquor license market heat map</h2>
          </div>
          <p>
            Switch between active marketplace inventory and median disclosed 4COP asking prices across Florida counties.
          </p>
        </div>

        <div className="county-heatmap-toolbar">
          <div className="county-heatmap-current-metric" aria-live="polite">
            <span>{isInventory ? "Inventory View" : "Price View"}</span>
            <h3>{isInventory ? "Active listings by county" : "County median 4COP prices"}</h3>
          </div>
          <div className="county-heatmap-switch" role="group" aria-label="Select county heat map metric">
            <button
              type="button"
              className={isInventory ? "is-active" : ""}
              aria-pressed={isInventory}
              onClick={() => setMode("inventory")}
            >
              Active Listings
            </button>
            <button
              type="button"
              className={!isInventory ? "is-active" : ""}
              aria-pressed={!isInventory}
              onClick={() => setMode("price")}
            >
              Median 4COP Price
            </button>
          </div>
        </div>

        <div className="county-availability-map-layout">
          <InteractiveCountyMap rows={rows} mode={mode} />
        </div>
      </div>
    </section>
  );
}
