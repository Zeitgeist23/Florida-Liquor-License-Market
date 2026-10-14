"use client";

import { useEffect, useState } from "react";

const businesses = [
  { label: "Restaurants", value: "Restaurant", style: "restaurant" },
  { label: "Bars & Taverns", value: "Bar", style: "bar" },
  { label: "Cocktail Lounges", value: "Cocktail Lounge", style: "cocktail-lounge" },
  { label: "Nightclubs", value: "Nightclub", style: "nightclub" },
  { label: "Liquor Stores", value: "Liquor Store", style: "liquor-store" },
  { label: "Gentlemen's Clubs", value: "Gentlemen's Club", style: "gentlemens-club" },
  { label: "Marinas", value: "Marina", style: "marina" },
  { label: "Hotels & Motels", value: "Hotel / Motel", style: "hotel-motel" },
] as const;

const licenses = [
  { label: "4COP Quota", value: "4COP Quota", quota: true },
  { label: "3PS Quota", value: "3PS Quota / Package Store", quota: true },
  { label: "4COP SFS / SRX", value: "4COP SFS/SRX", quota: false },
  { label: "2COP Beer & Wine", value: "2COP Beer & Wine", quota: false },
] as const;

type State = { businessTypes: string[]; licenseTypes: string[] };
type Toggle = { kind: "business" | "license"; value: string };

export default function BuyerMatchHeroPills() {
  const [selected, setSelected] = useState<State>({
    businessTypes: [],
    licenseTypes: [],
  });
  useEffect(() => {
    const sync = (event: Event) => {
      const state = (event as CustomEvent<State>).detail;
      if (state && Array.isArray(state.businessTypes) && Array.isArray(state.licenseTypes)) {
        setSelected({businessTypes: state.businessTypes,licenseTypes: state.licenseTypes});
      }
    };
    window.addEventListener("fllm:buyer-filter-state", sync);
    return () => window.removeEventListener("fllm:buyer-filter-state", sync);
  }, []);
  const toggle = (kind: Toggle["kind"], value: string) => {
    window.dispatchEvent(new CustomEvent<Toggle>("fllm:buyer-filter-toggle", { detail: { kind, value } }));
  };
  return <div className="fllm-buyer-match-choices" aria-label="Business and liquor license filters">
    <div className="fllm-buyer-match-choice-row"><div className="fllm-buyer-match-pills">
      {businesses.map(item => <button key={item.value} type="button" aria-pressed={selected.businessTypes.includes(item.value)}
        onClick={() => toggle("business", item.value)}
        className={`business-market-category-badge business-market-category-badge--${item.style}`}>{item.label}</button>)}
    </div></div>
    <div className="fllm-buyer-match-choice-row"><strong>LICENSE TYPES</strong><div className="fllm-buyer-match-pills fllm-buyer-match-license-pills">
      {licenses.map(item => <button key={item.value} type="button" aria-pressed={selected.licenseTypes.includes(item.value)}
        onClick={() => toggle("license",item.value)}
        className={`fllm-match-license-pill${item.quota ? " fllm-match-license-pill--quota" : ""}`}>{item.label}</button>)}
    </div></div>
  </div>;
}
