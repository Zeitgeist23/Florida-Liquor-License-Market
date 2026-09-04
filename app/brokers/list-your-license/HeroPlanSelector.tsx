"use client";

import { useState } from "react";
import styles from "./broker-listing.module.css";

type Tier = "standard" | "featured";

export default function HeroPlanSelector() {
  const [selected, setSelected] = useState<Tier>("standard");

  function choose(tier: Tier) {
    setSelected(tier);
    window.setTimeout(() => {
      document
        .getElementById(`${tier}-listing-option`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  return (
    <div className={styles.heroPlans}>
      <button
        type="button"
        className={selected === "standard" ? "hero-plan-selected" : "hero-plan-option"}
        aria-pressed={selected === "standard"}
        onClick={() => choose("standard")}
      >
        <em>Default</em>
        <b>Standard</b>
        <strong>$14.95</strong>
        <small>Marketplace listing · Select Standard ↓</small>
      </button>
      <button
        type="button"
        className={selected === "featured" ? "hero-plan-selected" : "hero-plan-option"}
        aria-pressed={selected === "featured"}
        onClick={() => choose("featured")}
      >
        <b>Featured</b>
        <strong>$24.95</strong>
        <small>30-day priority placement · Select Featured ↓</small>
      </button>
    </div>
  );
}
