import type { Metadata } from "next";
import Link from "next/link";

import c1 from "./mockup-chunk-1";
import c2 from "./mockup-chunk-2";
import c3 from "./mockup-chunk-3";
import c4 from "./mockup-chunk-4a";
import c5 from "./mockup-chunk-5";
import c6 from "./mockup-chunk-6";
import c7 from "./mockup-chunk-7";

const canonicalUrl = "https://www.floridaliquorlicensemarket.com/cities/saint-augustine";
const mockupSrc = `data:image/avif;base64,${c1}${c2}${c3}${c4}${c5}${c6}${c7}`;

export const metadata: Metadata = {
  title: "Saint Augustine Liquor License Market Data | St. Johns County | FLLM",
  description: "Saint Augustine liquor-license market data for St. Johns County.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

const hidden: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

function Hotspot({
  href,
  label,
  style,
}: {
  href: string;
  label: string;
  style: React.CSSProperties;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      style={{
        position: "absolute",
        display: "block",
        zIndex: 2,
        background: "transparent",
        ...style,
      }}
    />
  );
}

export default function SaintAugustinePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        background: "#061a2a",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(1122px, 100vw)",
          lineHeight: 0,
          margin: 0,
          padding: 0,
        }}
      >
        <h1 style={hidden}>Saint Augustine Liquor License Market Data</h1>

        <img
          src={mockupSrc}
          alt="Saint Augustine Liquor License Market Data"
          width={1122}
          height={1402}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            margin: 0,
            padding: 0,
            border: 0,
          }}
        />

        <Hotspot href="/" label="Florida Liquor License Market home" style={{ left: "2.5%", top: "0.6%", width: "14%", height: "4.4%" }} />
        <Hotspot href="/buy-florida-liquor-license" label="Buy" style={{ left: "20%", top: "0.8%", width: "5%", height: "3.5%" }} />
        <Hotspot href="/sell-your-license" label="Sell" style={{ left: "26.5%", top: "0.8%", width: "5%", height: "3.5%" }} />
        <Hotspot href="/financing" label="Finance" style={{ left: "32.5%", top: "0.8%", width: "7%", height: "3.5%" }} />
        <Hotspot href="/investment-opportunities" label="Invest" style={{ left: "40.5%", top: "0.8%", width: "6%", height: "3.5%" }} />
        <Hotspot href="/market-data" label="Market Data" style={{ left: "47%", top: "0.8%", width: "8.5%", height: "3.5%" }} />
        <Hotspot href="/resources/florida-liquor-license-types" label="License Types" style={{ left: "56.5%", top: "0.8%", width: "9.5%", height: "3.5%" }} />
        <Hotspot href="/resources" label="Resources" style={{ left: "67%", top: "0.8%", width: "8%", height: "3.5%" }} />
        <Hotspot href="/contact" label="Contact Us" style={{ left: "78%", top: "0.7%", width: "9.5%", height: "3.8%" }} />
        <Hotspot href="/sell-your-license#listing-options" label="List Your License" style={{ left: "88.2%", top: "0.7%", width: "9.3%", height: "3.8%" }} />

        <Hotspot
          href="/listings?county=St.+Johns+County#business-package-results"
          label="View all Saint Augustine business listings"
          style={{ left: "5.4%", top: "55.5%", width: "30%", height: "3.2%" }}
        />
        <Hotspot
          href="/listings?county=St.+Johns+County&type=4COP+Quota#listing-results"
          label="View all quota license listings"
          style={{ left: "5.4%", top: "84.9%", width: "26%", height: "3%" }}
        />
        <Hotspot
          href="/counties/st-johns"
          label="View St. Johns County insights"
          style={{ left: "77.8%", top: "91.2%", width: "17%", height: "3.5%" }}
        />
      </div>
    </main>
  );
}
