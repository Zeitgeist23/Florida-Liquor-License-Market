"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type LicenseKey = "4cop" | "3ps" | "2cop" | "sfs";

type Requirement = {
  label: string;
  uses: string;
  foodRule: string;
  areaRule: string;
  seatingRule: string;
  privilege: string;
  modalTitle: string;
  modalIntro: string;
  details: Array<{ title: string; text: string }>;
  sources: Array<{ label: string; href: string }>;
  fllmLinks?: Array<{ label: string; href: string }>;
};

const requirements: Record<LicenseKey, Requirement> = {
  "4cop": {
    label: "4COP quota",
    uses: "Bars · taverns · restaurants · nightclubs",
    foodRule: "No statewide SRX 51% food test",
    areaRule: "No SRX 2,000 sq. ft. minimum",
    seatingRule: "No SRX 120-seat minimum",
    privilege: "Beer, wine and spirits for on-premises consumption, with package privileges within the approved quota-license series.",
    modalTitle: "4COP quota premises and qualification requirements",
    modalIntro: "A transferable quota 4COP supplies full-liquor privileges, but it is not qualified through the special restaurant revenue, square-footage and seating tests.",
    details: [
      { title: "Food sales", text: "A standard quota 4COP is not subject to the 4COP-SFS/SRX requirement that at least 51% of gross food-and-beverage revenue come from food and nonalcoholic beverages merely because it is a quota 4COP." },
      { title: "Square footage and seating", text: "There is no general statewide 2,000-square-foot service-area or 120-seat restaurant threshold merely to hold a quota 4COP. The actual premises must still satisfy zoning, building, fire, health, occupancy and accessibility requirements for the proposed use." },
      { title: "Parking and zoning", text: "A 4COP does not create a statewide parking-space count. Local zoning may regulate the approved use, distance separation, parking, hours, entertainment, outdoor service and other site conditions." },
      { title: "Before signing a lease", text: "Confirm the exact business use, zoning, parking, occupancy, distance rules and any conditional-use or late-hours requirements before relying on a property." },
    ],
    sources: [
      { label: "Florida Statute §562.45 — local zoning and location authority", href: "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&Search_String=365.175&SubMenu=1&URL=0500-0599%2F0562%2FSections%2F0562.45.html&mode=View+Statutes" },
      { label: "Florida Statute §561.17 — premises and application requirements", href: "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599%2F0561%2FSections%2F0561.17.html" },
    ],
    fllmLinks: [
      { label: "FLLM: 2023 special restaurant licensing reform", href: "/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs" },
      { label: "Compare 4COP quota vs. 4COP-SFS", href: "/license-types/4cop-quota" },
    ],
  },
  "3ps": {
    label: "3PS quota",
    uses: "Liquor store · package store",
    foodRule: "No statewide 51% restaurant test",
    areaRule: "No SRX 2,000 sq. ft. minimum",
    seatingRule: "No restaurant seating test",
    privilege: "Sealed beer, wine and spirits for off-premises consumption; it does not authorize on-premises drinking.",
    modalTitle: "3PS package-store premises and qualification requirements",
    modalIntro: "A 3PS-family quota license is a package-sales license, so the special restaurant food-revenue, service-area and seating thresholds are not its basic qualification tests.",
    details: [
      { title: "Food sales", text: "A 3PS package-store quota license is not qualified through the special restaurant 51% food-and-nonalcoholic-beverage revenue test." },
      { title: "Square footage and seating", text: "There is no universal statewide 2,000-square-foot or 120-seat restaurant requirement merely because the license is a 3PS-family quota license. Package-store premises rules still apply." },
      { title: "Zoning and location", text: "Confirm that full-liquor package sales are permitted at the exact address. Local ordinances may impose zoning districts, distance-separation rules, conditional-use approval, operating-hour limits or other site restrictions." },
      { title: "Before signing a lease", text: "Verify zoning, parking, signage, loading, building and fire compliance and confirm that the floor plan satisfies Florida package-store separation and access rules." },
    ],
    sources: [
      { label: "Florida Statute §565.04 — package-store restrictions", href: "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599%2F0565%2FSections%2F0565.04.html" },
      { label: "Florida Statute §562.45 — local zoning and location authority", href: "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&Search_String=365.175&SubMenu=1&URL=0500-0599%2F0562%2FSections%2F0562.45.html&mode=View+Statutes" },
    ],
    fllmLinks: [
      { label: "FLLM: 3PS quota license guide", href: "/license-types/3ps-package-store" },
    ],
  },
  "2cop": {
    label: "2COP",
    uses: "Restaurants · cafés · wine bars",
    foodRule: "No statewide SRX 51% test",
    areaRule: "No SRX 2,000 sq. ft. minimum",
    seatingRule: "No SRX 120-seat minimum",
    privilege: "Beer and wine for on-premises consumption, with sealed beer-and-wine sales where permitted; no distilled spirits.",
    modalTitle: "2COP beer-and-wine qualification and premises requirements",
    modalIntro: "A standard 2COP is a non-quota beer-and-wine license. It is not the special full-liquor restaurant license and is not qualified through the SRX revenue, area and seating tests.",
    details: [
      { title: "Food sales", text: "The 4COP-SFS/SRX 51% food-and-nonalcoholic-beverage revenue test is not the general statewide qualification for a standard 2COP." },
      { title: "Square footage and seating", text: "The special restaurant 2,000-square-foot and 120-seat thresholds do not generally define 2COP eligibility. The premises must still satisfy applicable occupancy, health, building, fire and local rules." },
      { title: "Alcohol privilege", text: "2COP authorizes beer and wine, not distilled spirits. A business that needs cocktails or spirits must evaluate another license category." },
      { title: "Local approval", text: "Zoning, wet/dry status, local alcohol rules, distance requirements and premises approval can still affect a proposed address." },
    ],
    sources: [
      { label: "Official DBPR 2COP checklist", href: "https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=7021&clientCode=4006&xactCode=1028" },
    ],
    fllmLinks: [
      { label: "FLLM: 2COP statewide access and market context", href: "/florida-liquor-license-news/florida-2cop-beer-wine-license-statewide-access-market-context" },
      { label: "FLLM: 2COP license guide", href: "/license-types/2cop-beer-wine" },
    ],
  },
  "sfs": {
    label: "4COP-SFS / SRX",
    uses: "Qualifying full-service restaurants",
    foodRule: "At least 51% food + nonalcoholic revenue",
    areaRule: "At least 2,000 sq. ft. service area",
    seatingRule: "At least 120 physical seats",
    privilege: "Beer, wine and spirits for a qualifying restaurant without purchasing a standard transferable quota license.",
    modalTitle: "Current 4COP-SFS / SRX statewide restaurant requirements",
    modalIntro: "Florida reduced the general-law size and seating thresholds in 2023. The special restaurant license still depends on continuing restaurant qualification, including the food-revenue test.",
    details: [
      { title: "Food and nonalcoholic revenue", text: "The current statewide framework generally requires at least 51% of gross food-and-beverage revenue to come from food and nonalcoholic beverages." },
      { title: "Service area", text: "The current general-law framework generally requires at least 2,000 square feet of service area for the qualifying food-service establishment." },
      { title: "Meal capacity and seats", text: "The establishment generally must be equipped to serve meals to at least 120 persons at one time and have at least 120 physical seats." },
      { title: "Local exceptions", text: "Special local acts can create different thresholds or qualification paths in particular areas, including designated parts of Orlando. Confirm the current statewide law, DBPR guidance and any applicable local act." },
    ],
    sources: [
      { label: "Official DBPR 4COP-SFS checklist", href: "https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=7059&clientCode=4006&xactCode=1034" },
    ],
    fllmLinks: [
      { label: "FLLM: 2023 statewide SFS reform", href: "/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs" },
      { label: "FLLM: Orlando special restaurant zones", href: "/florida-liquor-license-news/orlando-special-food-service-liquor-license-hb-1447-hb-1647" },
      { label: "FLLM: cocktails-to-go current law", href: "/florida-liquor-license-news/florida-cocktails-to-go-sb-148-current-law" },
    ],
  },
};

export default function QuotaSiteRequirementCards() {
  const [selected, setSelected] = useState<LicenseKey | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<LicenseKey, HTMLElement | null>>({
    "4cop": null,
    "3ps": null,
    "2cop": null,
    "sfs": null,
  });

  const closeModal = useCallback(() => {
    const previousSelection = selected;
    setSelected(null);
    window.setTimeout(() => {
      if (previousSelection) triggerRefs.current[previousSelection]?.focus();
    }, 0);
  }, [selected]);

  useEffect(() => {
    if (!selected) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
        return;
      }
      if (event.key !== "Tab" || !modalRef.current) return;
      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (!firstElement || !lastElement) return;
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, selected]);

  const activeRequirement = selected ? requirements[selected] : null;

  return (
    <>
      <div className="license-types-quota-cards">
        {(Object.keys(requirements) as LicenseKey[]).map((licenseKey) => {
          const license = requirements[licenseKey];
          return (
            <article
              className="license-types-quota-card"
              key={licenseKey}
              ref={(element) => { triggerRefs.current[licenseKey] = element; }}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`Open ${license.label} requirements`}
              onClick={() => setSelected(licenseKey)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelected(licenseKey);
                }
              }}
            >
              <b>{license.label}</b>
              <span>{license.uses}</span>
              <dl style={{margin:"14px 0",display:"grid",gap:"8px"}}>
                <div><dt style={{fontSize:"11px",textTransform:"uppercase",opacity:.72}}>Food sales</dt><dd style={{margin:"2px 0 0",fontWeight:800}}>{license.foodRule}</dd></div>
                <div><dt style={{fontSize:"11px",textTransform:"uppercase",opacity:.72}}>Service area</dt><dd style={{margin:"2px 0 0",fontWeight:800}}>{license.areaRule}</dd></div>
                <div><dt style={{fontSize:"11px",textTransform:"uppercase",opacity:.72}}>Seating</dt><dd style={{margin:"2px 0 0",fontWeight:800}}>{license.seatingRule}</dd></div>
              </dl>
              <small>{license.privilege}</small>
              <strong>View requirements &amp; current-rule links →</strong>
            </article>
          );
        })}
      </div>

      {activeRequirement && (
        <div className="license-types-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
          <section ref={modalRef} className="license-types-requirement-modal" role="dialog" aria-modal="true" aria-labelledby="license-requirement-modal-title" aria-describedby="license-requirement-modal-intro">
            <header>
              <div>
                <span>License requirements and current rules</span>
                <h2 id="license-requirement-modal-title">{activeRequirement.modalTitle}</h2>
              </div>
              <button type="button" ref={closeButtonRef} aria-label="Close requirements" onClick={closeModal}>×</button>
            </header>

            <p id="license-requirement-modal-intro" className="license-types-modal-intro">{activeRequirement.modalIntro}</p>

            <div className="license-types-requirement-grid">
              {activeRequirement.details.map((detail) => (
                <article key={detail.title}>
                  <h3>{detail.title}</h3>
                  <p>{detail.text}</p>
                </article>
              ))}
            </div>

            <div className="license-types-modal-notice">
              <strong>Confirm the exact premises and current law.</strong>
              <p>Statewide license thresholds and local site requirements are different issues. County or municipal zoning, special local acts and premises rules can change the result for a specific address.</p>
            </div>

            <footer style={{alignItems:"flex-start"}}>
              <div style={{display:"grid",gap:"7px"}}>
                {activeRequirement.fllmLinks?.map((source) => (
                  <a key={source.href} href={source.href}>{source.label} →</a>
                ))}
                {activeRequirement.sources.map((source) => (
                  <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a>
                ))}
              </div>
              <button type="button" onClick={closeModal}>Close</button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
