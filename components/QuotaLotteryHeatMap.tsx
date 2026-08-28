"use client";

import { useMemo, useState } from "react";
import type { FocusEvent, MouseEvent, PointerEvent } from "react";

import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";
import {
  FLORIDA_COUNTY_POPULATIONS_2025,
  FLORIDA_POPULATION_ESTIMATE_DATE,
  FLORIDA_POPULATION_SOURCE_URL,
} from "@/data/florida-county-populations-2025";

type AvailableCounty = {
  county: string;
  licenses: number;
};

type TooltipPosition = {
  left: number;
  top: number;
  alignRight: boolean;
};

const numberFormatter = new Intl.NumberFormat("en-US");

function availabilityCountyName(county: string) {
  return county === "Dade" ? "Miami-Dade" : county;
}

function countyFill(licenses: number) {
  if (licenses >= 5) return "#9a5d00";
  if (licenses === 4) return "#c47b00";
  if (licenses === 3) return "#e99a00";
  if (licenses === 2) return "#f6b928";
  if (licenses === 1) return "#ffdb72";
  return "#e8edf0";
}

function countyLabel(county: string, population: number, licenses: number) {
  const licenseLabel = `${licenses} new ${licenses === 1 ? "license" : "licenses"} available`;
  return `${county} County. Population ${numberFormatter.format(population)}. ${licenseLabel}.`;
}

export default function QuotaLotteryHeatMap({
  availableLicenses,
}: {
  availableLicenses: readonly AvailableCounty[];
}) {
  const licensesByCounty = useMemo(
    () =>
      new Map(
        availableLicenses.map((item) => [availabilityCountyName(item.county), item.licenses]),
      ),
    [availableLicenses],
  );
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);
  const [lockedCounty, setLockedCounty] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    left: 24,
    top: 24,
    alignRight: false,
  });

  const activeCounty = lockedCounty ?? hoveredCounty;

  function positionFromPointer(
    event: PointerEvent<SVGPathElement> | MouseEvent<SVGPathElement>,
  ) {
    const stage = event.currentTarget.closest(".quota-map-stage");
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();
    const pointerLeft = event.clientX - stageRect.left;
    const pointerTop = event.clientY - stageRect.top;
    setTooltipPosition({
      left: pointerLeft,
      top: Math.min(pointerTop + 14, Math.max(18, stageRect.height - 132)),
      alignRight: pointerLeft > stageRect.width * 0.65,
    });
  }

  function positionFromFocus(event: FocusEvent<SVGPathElement>) {
    const stage = event.currentTarget.closest(".quota-map-stage");
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();
    const countyRect = event.currentTarget.getBoundingClientRect();
    const countyCenter = countyRect.left - stageRect.left + countyRect.width / 2;
    setTooltipPosition({
      left: countyCenter,
      top: Math.min(
        countyRect.bottom - stageRect.top + 10,
        Math.max(18, stageRect.height - 132),
      ),
      alignRight: countyCenter > stageRect.width * 0.65,
    });
  }

  const activePopulation = activeCounty
    ? FLORIDA_COUNTY_POPULATIONS_2025[activeCounty]
    : undefined;
  const activeLicenses = activeCounty ? licensesByCounty.get(activeCounty) ?? 0 : 0;

  return (
    <section className="quota-heat-map" aria-labelledby="quota-map-title">
      <div className="quota-map-heading">
        <div>
          <span>Interactive 2026 lottery map</span>
          <h3 id="quota-map-title">Hover over any Florida county</h3>
          <p>
            Each county shows its official population estimate and the number of new quota
            licenses available in the 2026 drawing. Tap a county on a phone or tablet.
          </p>
        </div>
        <div className="quota-map-key" aria-label="Map color key">
          <span>New licenses</span>
          {[0, 1, 2, 3, 4, 5].map((licenses) => (
            <i
              key={licenses}
              style={{
                background: countyFill(licenses),
                color: licenses >= 4 ? "#ffffff" : undefined,
              }}
            >
              {licenses}
            </i>
          ))}
        </div>
      </div>

      <div className="quota-map-stage">
        <svg
          className="quota-lottery-map-svg"
          viewBox="132 8 302 276"
          role="img"
          aria-label="Interactive Florida county heat map showing 2026 quota liquor licenses and county population"
        >
          <g strokeLinejoin="round" strokeLinecap="round">
            {FLORIDA_COUNTY_PATHS.map((county) => {
              const population = FLORIDA_COUNTY_POPULATIONS_2025[county.name];
              const licenses = licensesByCounty.get(county.name) ?? 0;
              const isActive = activeCounty === county.name;
              const label = countyLabel(county.name, population, licenses);

              return (
                <path
                  key={county.id}
                  d={county.path}
                  className={isActive ? "quota-map-county is-active" : "quota-map-county"}
                  fill={countyFill(licenses)}
                  stroke={isActive ? "#061728" : "#6f7f89"}
                  strokeWidth={isActive ? 1.8 : 0.72}
                  tabIndex={0}
                  role="button"
                  aria-label={label}
                  aria-pressed={lockedCounty === county.name}
                  onPointerEnter={(event) => {
                    if (!lockedCounty) setHoveredCounty(county.name);
                    positionFromPointer(event);
                  }}
                  onPointerMove={(event) => {
                    if (!lockedCounty) positionFromPointer(event);
                  }}
                  onPointerLeave={() => {
                    if (!lockedCounty) setHoveredCounty(null);
                  }}
                  onFocus={(event) => {
                    if (!lockedCounty) setHoveredCounty(county.name);
                    positionFromFocus(event);
                  }}
                  onBlur={() => {
                    if (!lockedCounty) setHoveredCounty(null);
                  }}
                  onClick={(event) => {
                    positionFromPointer(event);
                    setLockedCounty((current) => (current === county.name ? null : county.name));
                    setHoveredCounty(county.name);
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    setLockedCounty((current) => (current === county.name ? null : county.name));
                    setHoveredCounty(county.name);
                  }}
                >
                  <title>{label}</title>
                </path>
              );
            })}
          </g>
        </svg>

        {activeCounty && activePopulation ? (
          <div
            className="quota-map-tooltip"
            role="tooltip"
            style={{
              left: tooltipPosition.left,
              top: tooltipPosition.top,
              transform: tooltipPosition.alignRight ? "translateX(-100%)" : undefined,
            }}
          >
            <strong>{activeCounty} County</strong>
            <dl>
              <div>
                <dt>New licenses</dt>
                <dd>{activeLicenses}</dd>
              </div>
              <div>
                <dt>Population</dt>
                <dd>{numberFormatter.format(activePopulation)}</dd>
              </div>
            </dl>
            <small>{FLORIDA_POPULATION_ESTIMATE_DATE} estimate</small>
          </div>
        ) : null}
      </div>

      <p className="quota-map-source">
        License availability: Florida DBPR 2026 Quota Beverage License Drawing notice.
        Population: {" "}
        <a href={FLORIDA_POPULATION_SOURCE_URL} target="_blank" rel="noopener noreferrer">
          Florida EDR / UF BEBR, {FLORIDA_POPULATION_ESTIMATE_DATE}
        </a>
        . Counties not included in the 2026 drawing show zero new licenses.
      </p>
    </section>
  );
}
