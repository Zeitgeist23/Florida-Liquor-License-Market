import Link from "next/link";
import { indexableCounties } from "@/data/florida-counties";

export default function LicenseTypeCountyDirectory({ licenseType }: { licenseType: string }) {
  return (
    <section
      aria-labelledby="license-type-county-directory"
      style={{ width: "min(1180px,calc(100% - 40px))", margin: "0 auto", padding: "0 0 34px" }}
    >
      <div
        style={{
          border: "1px solid rgba(246,167,0,.42)",
          borderRadius: 12,
          background: "linear-gradient(145deg,#123751,#0d2d46)",
          padding: 24,
        }}
      >
        <span
          style={{
            color: "#f6a700",
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: ".1em",
            textTransform: "uppercase",
          }}
        >
          Florida county markets
        </span>
        <h2
          id="license-type-county-directory"
          style={{
            margin: "7px 0 8px",
            color: "#fff",
            font: "700 29px/1.15 Georgia,serif",
          }}
        >
          {licenseType} liquor licenses by Florida county
        </h2>
        <p style={{ margin: "0 0 18px", color: "#c4d1dc", fontSize: 15, lineHeight: 1.7 }}>
          Browse FLLM's county market pages to compare local license availability, market information, listings, valuation resources and nearby Florida markets.
        </p>
        <nav
          aria-label={`${licenseType} liquor licenses by Florida county`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 8,
          }}
        >
          {indexableCounties.map((county) => (
            <Link
              key={county.slug}
              href={`/counties/${county.slug}`}
              style={{
                display: "block",
                padding: "9px 11px",
                border: "1px solid rgba(255,255,255,.13)",
                borderRadius: 7,
                background: "rgba(255,255,255,.035)",
                color: "#fff",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {county.name} {licenseType}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
