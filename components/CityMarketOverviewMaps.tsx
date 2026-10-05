import Link from "next/link";
import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";
import type { BusinessQuotaListing } from "@/lib/business-quota-listings";
import type { Listing } from "@/data/listings";

function countyKey(value: string) {
  return value.replace(/\s+County$/i, "").trim();
}

function bandColor(count: number) {
  if (count >= 21) return "#b14fe2";
  if (count >= 11) return "#8757e9";
  if (count >= 6) return "#6279ea";
  if (count >= 3) return "#1ca9d2";
  if (count >= 1) return "#1590be";
  return "#173752";
}

function FloridaMarketMap({
  counts,
  title,
  tooltipRows,
  filterId,
  county,
  markerX,
  markerY,
}: {
  counts: Map<string, number>;
  title: string;
  tooltipRows: Array<{ value: number; label: string }>;
  filterId: string;
  county: string;
  markerX: number;
  markerY: number;
}) {
  return (
    <div className="city-market-map-stage" aria-label="Florida county market map">
      <svg viewBox="90 -6 380 294" role="img" aria-label={"Florida county market map with " + county + " highlighted"}>
        <defs>
          <filter id={filterId} x="-45%" y="-45%" width="190%" height="190%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {FLORIDA_COUNTY_PATHS.map((item) => {
          const key = countyKey(item.name);
          const count = counts.get(key) ?? 0;
          const active = key === countyKey(county);
          return (
            <path
              key={item.id}
              d={item.path}
              fill={active ? "#20d4e5" : bandColor(count)}
              stroke={active ? "#e7fdff" : "#7897b0"}
              strokeWidth={active ? 1.9 : 0.7}
              filter={active ? "url(#" + filterId + ")" : undefined}
            />
          );
        })}
        <g transform={"translate(" + markerX + " " + markerY + ")"}>
          <path
            d="M0,-22 C-6.7,-22 -12,-16.7 -12,-10 C-12,0.8 -4.6,10.4 0,22 C4.6,10.4 12,0.8 12,-10 C12,-16.7 6.7,-22 0,-22 Z"
            fill="#e52b25"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="0" cy="-10" r="3.8" fill="#ffffff" />
        </g>
      </svg>

      <div className="city-market-map-tooltip">
        <strong>{county}</strong>
        {tooltipRows.map((row) => (
          <span key={row.label}><b>{row.value}</b>{row.label}</span>
        ))}
      </div>

      <div className="city-market-map-legend">
        <strong>{title}</strong>
        {[
          ["#173752", "0 listings"],
          ["#1590be", "1–2 listings"],
          ["#1ca9d2", "3–5 listings"],
          ["#6279ea", "6–10 listings"],
          ["#8757e9", "11–20 listings"],
          ["#b14fe2", "21+ listings"],
        ].map(([color, label]) => (
          <span key={label}><i style={{ background: color }} />{label}</span>
        ))}
      </div>
    </div>
  );
}

function StatCard({ value, label, href }: { value: number; label: string; href: string }) {
  return (
    <Link className="city-market-stat-card" href={href}>
      <strong>{value}</strong>
      <span>{label}</span>
      <b aria-hidden="true">›</b>
    </Link>
  );
}

export default function CityMarketOverviewMaps({
  standalone,
  businesses,
  city = "Saint Augustine",
  county = "St. Johns County",
  markerX = 365,
  markerY = 52,
}: {
  standalone: Listing[];
  businesses: BusinessQuotaListing[];
  city?: string;
  county?: string;
  markerX?: number;
  markerY?: number;
}) {
  const quotaBusinesses = businesses.filter((listing) => listing.county === county && listing.licenseClass === "quota").length;
  const sfsBusinesses = businesses.filter((listing) => listing.county === county && listing.licenseClass === "sfs").length;
  const twoCopBusinesses = businesses.filter((listing) => listing.county === county && listing.licenseClass === "2cop").length;
  const fourCopLicenses = standalone.filter((listing) => listing.county === county && listing.type === "4COP Quota").length;
  const threePsLicenses = standalone.filter((listing) => listing.county === county && listing.type === "3PS Quota / Package Store").length;

  const businessCounts = new Map<string, number>();
  for (const listing of businesses) {
    const key = countyKey(listing.county);
    businessCounts.set(key, (businessCounts.get(key) ?? 0) + 1);
  }

  const licenseCounts = new Map<string, number>();
  for (const listing of standalone) {
    const key = countyKey(listing.county);
    licenseCounts.set(key, (licenseCounts.get(key) ?? 0) + 1);
  }

  return (
    <div className="city-market-overview-shell">
      <section className="city-market-overview-panel">
        <div className="city-market-overview-grid">
          <div className="city-market-overview-copy">
            <span>Business Market Overview</span>
            <h2>Businesses on the Market in {city}</h2>
            <p>
              Current FLLM-observed business + liquor-license opportunities in {county},
              separated by license structure so buyers can distinguish quota, SFS/SRX and 2COP inventory.
            </p>
            <div className="city-market-stat-grid">
              <StatCard value={quotaBusinesses} label="Businesses with Quota Licenses" href={"/listings?type=businesses&county=" + encodeURIComponent(county) + "#business-package-results"} />
              <StatCard value={sfsBusinesses} label="Businesses with 4COP SFS/SRX Licenses" href={"/listings?type=businesses-sfs&county=" + encodeURIComponent(county) + "#business-package-results"} />
              <StatCard value={twoCopBusinesses} label="Businesses with 2COP Beer & Wine Licenses" href={"/listings?type=businesses-2cop&county=" + encodeURIComponent(county) + "#business-package-results"} />
            </div>
          </div>
          <FloridaMarketMap
            counts={businessCounts}
            title="Business Listings By County"
            tooltipRows={[
              { value: quotaBusinesses, label: "Businesses w/ Quota" },
              { value: sfsBusinesses, label: "Businesses w/ 4COP SFS/SRX" },
              { value: twoCopBusinesses, label: "Businesses w/ 2COP" },
            ]}
            filterId={"city-business-map-glow-" + countyKey(county).toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            county={county}
            markerX={markerX}
            markerY={markerY}
          />
        </div>
      </section>

      <section className="city-market-overview-panel">
        <div className="city-market-overview-grid">
          <div className="city-market-overview-copy">
            <span>Quota License Market Overview</span>
            <h2>Standalone Quota Liquor Licenses in {county}</h2>
            <p>
              Current standalone quota-license inventory underlying the {city} market,
              separated between 4COP full-liquor quota licenses and 3PS package-store quota licenses.
            </p>
            <div className="city-market-stat-grid city-market-stat-grid--two">
              <StatCard value={fourCopLicenses} label="4COP Quota Licenses for Sale" href={"/listings?county=" + encodeURIComponent(county) + "&type=4COP+Quota#listing-results"} />
              <StatCard value={threePsLicenses} label="3PS Quota Licenses for Sale" href={"/listings?county=" + encodeURIComponent(county) + "&type=3PS+Quota+%2F+Package+Store#listing-results"} />
            </div>
          </div>
          <FloridaMarketMap
            counts={licenseCounts}
            title="Quota License Listings By County"
            tooltipRows={[
              { value: fourCopLicenses, label: "4COP Quota Licenses" },
              { value: threePsLicenses, label: "3PS Quota Licenses" },
            ]}
            filterId={"city-license-map-glow-" + countyKey(county).toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            county={county}
            markerX={markerX}
            markerY={markerY}
          />
        </div>
      </section>
    </div>
  );
}
