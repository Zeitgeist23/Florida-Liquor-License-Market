"use client";

import { useMemo, useRef, useState } from "react";

import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";

export type BusinessPackageHeatMapRow = {
  name: string;
  slug: string;
  listingCount: number;
  averagePrice: number | null;
  licenseType: string;
  businessCategories: string[];
};

const INVENTORY_LEGEND = [
  { color: "#193552", label: "0 packages" },
  { color: "#195b86", label: "1–2 packages" },
  { color: "#167ea8", label: "3–5 packages" },
  { color: "#1bbbd0", label: "6–8 packages" },
  { color: "#7357e8", label: "9–11 packages" },
  { color: "#a855f7", label: "12+ packages" },
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

function inventoryBandMatches(count: number, band: number) {
  if (band === 0) return count === 0;
  if (band === 1) return count >= 1 && count <= 2;
  if (band === 2) return count >= 3 && count <= 5;
  if (band === 3) return count >= 6 && count <= 8;
  if (band === 4) return count >= 9 && count <= 11;
  return count >= 12;
}

function money(value: number | null) {
  if (value === null) return "—";
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
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [mapPin, setMapPin] = useState<{ x: number; y: number; color: string } | null>(null);
  const [inventoryBand, setInventoryBand] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLElement>(null);

  const rowsByCounty = useMemo(
    () => new Map(rows.map((row) => [countyKey(row.name), row])),
    [rows],
  );

  const activeRow = activeSlug
    ? rowsByCounty.get(countyKey(activeSlug)) ?? null
    : null;

  const ranking = useMemo(
    () =>
      [...rows]
        .filter((row) => row.listingCount > 0)
        .sort(
          (a, b) =>
            b.listingCount - a.listingCount ||
            a.name.localeCompare(b.name),
        )
        .slice(0, 5),
    [rows],
  );

  const maxRankingValue = ranking.reduce(
    (maximum, row) => Math.max(maximum, row.listingCount),
    0,
  );

  const totalPackages = useMemo(
    () => rows.reduce((sum, row) => sum + row.listingCount, 0),
    [rows],
  );

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
    const desiredLeft =
      countyCenter < stateCenter
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

  function activateCounty(
    row: BusinessPackageHeatMapRow,
    target: Element,
    clientY: number,
  ) {
    const countyPath = target.matches("path")
      ? target
      : target.querySelector("path");

    setActiveSlug(row.name);

    if (countyPath instanceof SVGGraphicsElement) {
      const bounds = countyPath.getBBox();
      setMapPin({
        x: bounds.x + bounds.width / 2,
        y: bounds.y + bounds.height / 2,
        color: inventoryColor(row.listingCount),
      });
    }

    window.requestAnimationFrame(() => positionTooltip(target, clientY));
  }

  function activateRankedCounty(row: BusinessPackageHeatMapRow) {
    const stage = stageRef.current;
    if (!stage) return;

    const countyPath = Array.from(
      stage.querySelectorAll<SVGPathElement>(".county-availability-map-svg path"),
    ).find((path) => path.dataset.county === row.name);
    const countyLink = countyPath?.closest("a");

    if (!countyPath || !countyLink) return;
    const bounds = countyPath.getBoundingClientRect();
    activateCounty(
      row,
      countyLink,
      bounds.top + bounds.height / 2,
    );
  }

  function deactivateCounty() {
    setActiveSlug(null);
    setMapPin(null);
  }

  function setBand(index: number | null) {
    setInventoryBand(index);
    setActiveSlug(null);
    setMapPin(null);
  }

  return (
    <section
      className="county-availability-map-section business-package-county-map"
      aria-labelledby="business-package-map-title"
    >
      <div className="directory-shell">
        <div className="directory-heading county-availability-map-heading">
          <div>
            <span>Statewide Business Package Distribution</span>
            <h2 id="business-package-map-title">
              Florida {licenseType} business package map
            </h2>
          </div>
          <p>
            Hover county pins to compare matching operating-business packages.
            Package asking prices are used here—not stand-alone license values.
          </p>
        </div>

        <div className="county-heatmap-toolbar">
          <div className="county-heatmap-current-metric" aria-live="polite">
            <span>Inventory View</span>
            <h3>Active {licenseType} business packages by county</h3>
          </div>
          <div className="business-package-map-context">
            <span>{businessTypeLabel}</span>
            <strong>
              {totalPackages} active package{totalPackages === 1 ? "" : "s"}
            </strong>
          </div>
        </div>

        <div className="county-availability-map-layout">
          <article className="county-heatmap-module county-heatmap-module--inventory">
            <div className="county-heatmap-module-grid">
              <div className="county-availability-map-stage" ref={stageRef}>
                <svg
                  className="county-availability-map-svg"
                  viewBox="135 10 295 275"
                  role="img"
                  aria-label={`Interactive Florida county map shaded by active ${licenseType} business packages`}
                >
                  <g>
                    {FLORIDA_COUNTY_PATHS.map((county) => {
                      const row = rowsByCounty.get(countyKey(county.name));
                      const listingCount = row?.listingCount ?? 0;
                      const bandActive = inventoryBand !== null;
                      const bandMatch =
                        bandActive &&
                        inventoryBandMatches(
                          listingCount,
                          inventoryBand as number,
                        );
                      const fill =
                        bandActive && !bandMatch
                          ? INVENTORY_LEGEND[0].color
                          : inventoryColor(listingCount);

                      return (
                        <a
                          key={county.id}
                          href={row ? `/counties/${row.slug}` : "/counties"}
                          className={
                            row && activeSlug === row.name
                              ? "is-active"
                              : undefined
                          }
                          aria-label={
                            row
                              ? `${row.name}: ${row.listingCount} ${licenseType} business package${row.listingCount === 1 ? "" : "s"}, average listing price ${money(row.averagePrice)}`
                              : `${county.name} County: no matching business packages`
                          }
                          onPointerEnter={(event) =>
                            row &&
                            activateCounty(
                              row,
                              event.currentTarget,
                              event.clientY,
                            )
                          }
                          onPointerMove={(event) =>
                            positionTooltip(
                              event.currentTarget,
                              event.clientY,
                            )
                          }
                          onPointerLeave={deactivateCounty}
                          onFocus={(event) => {
                            if (!row) return;
                            const bounds =
                              event.currentTarget.getBoundingClientRect();
                            activateCounty(
                              row,
                              event.currentTarget,
                              bounds.top + bounds.height / 2,
                            );
                          }}
                          onBlur={deactivateCounty}
                        >
                          <path
                            d={county.path}
                            fill={fill}
                            style={
                              bandMatch
                                ? {
                                    filter:
                                      "brightness(1.45) saturate(1.18) drop-shadow(0 0 7px rgba(105,214,255,.98))",
                                    opacity: 1,
                                  }
                                : bandActive
                                  ? { opacity: 0.82 }
                                  : undefined
                            }
                            data-listing-count={listingCount}
                            data-county={
                              row?.name ?? `${county.name} County`
                            }
                          />
                        </a>
                      );
                    })}
                  </g>

                  {mapPin ? (
                    <g
                      transform={`translate(${mapPin.x} ${mapPin.y})`}
                      aria-hidden="true"
                    >
                      <g className="county-map-pin-marker">
                        <line x1="0" y1="-25" x2="0" y2="-3" />
                        <circle
                          className="county-map-pin-tip"
                          cx="0"
                          cy="-29"
                          r="5.5"
                          fill={mapPin.color}
                        />
                        <circle
                          className="county-map-pin-shine"
                          cx="-1.6"
                          cy="-30.7"
                          r="1.25"
                        />
                        <circle
                          className="county-map-pin-point"
                          cx="0"
                          cy="0"
                          r="1.8"
                          fill={mapPin.color}
                        />
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
                      <strong>
                        {activeRow.listingCount} similar business
                        {activeRow.listingCount === 1
                          ? " package"
                          : " packages"}
                      </strong>
                      <dl>
                        <div>
                          <dt>License type</dt>
                          <dd>{activeRow.licenseType}</dd>
                        </div>
                        <div>
                          <dt>Average listing price</dt>
                          <dd>{money(activeRow.averagePrice)}</dd>
                        </div>
                        <div>
                          <dt>Active packages</dt>
                          <dd>{activeRow.listingCount}</dd>
                        </div>
                        <div>
                          <dt>Business types</dt>
                          <dd>
                            {activeRow.businessCategories.length ||
                              "—"}
                          </dd>
                        </div>
                      </dl>
                      <small>
                        {activeRow.businessCategories.join(" · ")}
                      </small>
                    </>
                  ) : null}
                </aside>
              </div>

              <aside className="county-availability-map-legend">
                <span>Listing Scale</span>
                <h4>Business package availability</h4>
                <ul aria-label="Active business package color scale">
                  {INVENTORY_LEGEND.map((item, index) => (
                    <li
                      key={item.label}
                      className={
                        inventoryBand === index
                          ? "is-filter-active"
                          : undefined
                      }
                    >
                      <button
                        type="button"
                        aria-label={`Highlight counties with ${item.label}`}
                        onPointerEnter={() => setBand(index)}
                        onPointerLeave={() => setBand(null)}
                        onMouseEnter={() => setBand(index)}
                        onMouseLeave={() => setBand(null)}
                        onFocus={() => setBand(index)}
                        onBlur={() => setBand(null)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: 0,
                          border: 0,
                          background: "transparent",
                          color: "inherit",
                          font: "inherit",
                          fontWeight: "inherit",
                          textAlign: "left",
                          cursor: "pointer",
                          filter:
                            inventoryBand === index
                              ? "brightness(1.25)"
                              : undefined,
                          textShadow:
                            inventoryBand === index
                              ? "0 0 12px rgba(99,228,255,.75)"
                              : undefined,
                        }}
                      >
                        <i style={{ background: item.color }} />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="county-heatmap-ranking">
                  <div className="county-heatmap-ranking-heading">
                    <strong>Most active counties</strong>
                  </div>
                  <ol>
                    {ranking.map((row) => (
                      <li
                        key={row.slug}
                        className={
                          activeSlug === row.name
                            ? "is-map-active"
                            : undefined
                        }
                        onPointerEnter={() =>
                          activateRankedCounty(row)
                        }
                        onPointerLeave={deactivateCounty}
                        onFocus={() => activateRankedCounty(row)}
                        onBlur={deactivateCounty}
                      >
                        <span>
                          <a href={`/counties/${row.slug}`}>
                            {row.name.replace(/ County$/i, "")}
                          </a>
                          <b>{row.listingCount}</b>
                        </span>
                        <i>
                          <em
                            style={{
                              width: `${Math.max(
                                8,
                                (row.listingCount /
                                  Math.max(1, maxRankingValue)) *
                                  100,
                              )}%`,
                            }}
                          />
                        </i>
                      </li>
                    ))}
                  </ol>
                </div>

                <small className="county-availability-map-note">
                  FLLM business-package inventory. SFS/SRX and 2COP licenses
                  are shown as part of the operating business package and are
                  not valued here as stand-alone transferable assets.
                </small>
              </aside>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
