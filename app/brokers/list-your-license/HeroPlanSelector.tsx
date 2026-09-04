"use client";

import { useState } from "react";
import styles from "./broker-listing.module.css";

type Tier = "standard" | "featured";

export default function HeroPlanSelector() {
  const [selected, setSelected] = useState<Tier | null>(null);

  function choose(tier: Tier) {
    setSelected(tier);
    document
      .getElementById(`${tier}-listing-option`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const cardStyle = (tier: Tier) => ({
    position: "relative" as const,
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "3px 12px",
    width: "100%",
    padding: "12px 13px",
    border: selected === tier ? "1px solid rgba(246,167,0,.82)" : "1px solid rgba(255,255,255,.13)",
    borderRadius: 7,
    background: selected === tier ? "rgba(246,167,0,.10)" : "rgba(255,255,255,.045)",
    boxShadow: selected === tier ? "0 10px 24px rgba(0,0,0,.24), 0 0 18px rgba(246,167,0,.12)" : "none",
    color: "inherit",
    cursor: "pointer",
    textAlign: "left" as const,
    font: "inherit",
  });

  return (
    <div className={styles.heroPlans}>
      <button
        type="button"
        style={cardStyle("standard")}
        aria-pressed={selected === "standard"}
        onClick={() => choose("standard")}
      >
        <b style={{ color: "#fff", fontSize: 13 }}>Standard</b>
        <strong style={{ color: "#f6a700", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 22, fontWeight: 500 }}>$14.95</strong>
        <small style={{ gridColumn: "1/-1", color: "#bfcbd3", fontSize: 10 }}>Marketplace listing · Select Standard ↓</small>
      </button>
      <button
        type="button"
        style={cardStyle("featured")}
        aria-pressed={selected === "featured"}
        onClick={() => choose("featured")}
      >
        <b style={{ color: "#fff", fontSize: 13 }}>Featured</b>
        <strong style={{ color: "#f6a700", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 22, fontWeight: 500 }}>$24.95</strong>
        <small style={{ gridColumn: "1/-1", color: "#bfcbd3", fontSize: 10 }}>30-day priority placement · Select Featured ↓</small>
      </button>
    </div>
  );
}
