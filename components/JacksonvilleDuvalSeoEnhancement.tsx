"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function JacksonvilleDuvalSeoEnhancement() {
  const pathname = usePathname();
  if (pathname !== "/counties/duval") return null;

  return (
    <section
      aria-labelledby="jacksonville-duval-liquor-license-title"
      style={{
        background: "#071827",
        borderTop: "1px solid rgba(246,167,0,.45)",
        borderBottom: "1px solid rgba(246,167,0,.28)",
        color: "#eaf1f6",
      }}
    >
      <div style={{ width: "min(1180px, calc(100% - 36px))", margin: "0 auto", padding: "30px 0" }}>
        <span style={{ color: "#f6a700", fontSize: 12, fontWeight: 900, letterSpacing: ".08em", textTransform: "uppercase" }}>
          Jacksonville & Duval County Market
        </span>
        <h2
          id="jacksonville-duval-liquor-license-title"
          style={{ margin: "7px 0 12px", color: "#fff", fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(28px, 4vw, 38px)", lineHeight: 1.12 }}
        >
          Jacksonville Liquor Licenses for Sale — Duval County 4COP & 3PS
        </h2>
        <p style={{ margin: "0 0 12px", maxWidth: 980, fontSize: 15, lineHeight: 1.7, color: "#d7e1e8" }}>
          Buyers searching for a Jacksonville liquor license for sale are generally looking for transferable 4COP quota or 3PS quota license opportunities within Duval County. FLLM tracks current Duval County inventory, asking prices, and individual license listings serving Jacksonville, Jacksonville Beach, Atlantic Beach, Neptune Beach, and the broader county market.
        </p>
        <p style={{ margin: 0, maxWidth: 980, fontSize: 14, lineHeight: 1.7, color: "#bfcbd4" }}>
          Compare the active Duval County listings above, then review the statewide <Link href="/florida-4cop-liquor-license-for-sale" style={{ color: "#f6a700", fontWeight: 800 }}>Florida 4COP quota liquor licenses for sale</Link> page or <Link href="/listings?county=Duval%20County&status=available" style={{ color: "#f6a700", fontWeight: 800 }}>browse current Duval County inventory</Link>.
        </p>
      </div>
    </section>
  );
}
