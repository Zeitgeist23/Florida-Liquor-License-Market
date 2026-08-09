"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type LicenseKey = "4cop" | "3ps";

const requirements = {
  "4cop": {
    label: "4COP quota",
    uses: "Bars · taverns · restaurants · nightclubs",
    commonUses: [
      "Bars and cocktail lounges",
      "Taverns and pubs",
      "Nightclubs and dance clubs",
      "Full-liquor restaurants",
      "Other approved hospitality or entertainment venues",
    ],
    privilege:
      "Permits beer, wine, and spirits by the drink and sealed-container sales within the approved license privileges.",
    modalTitle: "4COP premises, parking and zoning",
    modalIntro:
      "A quota 4COP supplies the full-liquor privilege, but it does not make every property suitable for a bar, restaurant, tavern or nightclub.",
    details: [
      {
        title: "Square footage",
        text: "There is no single statewide minimum square-footage requirement merely because the license is a quota 4COP. Do not confuse it with a qualification-based 4COP-SFS/SRX restaurant license, which has separate restaurant size, seating and revenue requirements. The proposed premises must still satisfy local building, fire, occupancy, health and accessibility rules for its actual use.",
      },
      {
        title: "Parking",
        text: "A 4COP does not create a statewide number of required parking spaces. The city or county normally calculates parking from the approved use, floor area, seating or occupant load, outdoor service areas and local code. A nightclub or stand-alone bar may be treated differently from a restaurant at the same address.",
      },
      {
        title: "Zoning and location",
        text: "The address must be approved for the intended on-premises alcohol use. Local rules may regulate location, hours, entertainment, distance separation and whether a bar, restaurant or nightclub is permitted, conditional or prohibited. Florida law also generally restricts on-premises alcohol locations within 500 feet of a school, subject to statutory exceptions and local approval procedures.",
      },
      {
        title: "Before signing a lease",
        text: "Obtain written zoning confirmation for the exact business model, confirm parking and occupancy, and verify any conditional-use, distance, late-hours, entertainment, health or fire approvals. DBPR also requires proof of the right to occupy the entire licensed premises and applicable sanitary certification for on-premises consumption applications.",
      },
    ],
    sources: [
      {
        label: "Florida Statute §562.45 — local zoning and location authority",
        href: "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&Search_String=365.175&SubMenu=1&URL=0500-0599%2F0562%2FSections%2F0562.45.html&mode=View+Statutes",
      },
      {
        label: "Florida Statute §561.17 — premises and application requirements",
        href: "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599%2F0561%2FSections%2F0561.17.html",
      },
    ],
  },
  "3ps": {
    label: "3PS quota",
    uses: "Liquor store · package store",
    commonUses: [
      "Stand-alone liquor stores",
      "Package stores",
      "Dedicated liquor-store locations operated by qualifying retailers",
      "Other approved full-liquor retail package outlets",
    ],
    privilege:
      "Permits sealed beer, wine, and spirits for off-premises consumption; it does not authorize on-premises drinking.",
    modalTitle: "3PS premises, parking and zoning",
    modalIntro:
      "A 3PS-family quota license is designed for sealed package sales, but the proposed address must separately qualify as a liquor-store or package-store location.",
    details: [
      {
        title: "Square footage",
        text: "There is no universal statewide minimum store size merely because the license is a 3PS-family quota license. The premises must nevertheless meet local building, fire, occupancy, accessibility and retail-use requirements. Florida package-store rules also restrict what may be sold and generally require the licensed package-store premises to be devoted to the authorized sales.",
      },
      {
        title: "Parking",
        text: "A 3PS does not establish a statewide parking-space count. The city or county generally applies its retail or liquor-store parking formula based on factors such as gross floor area, customer area, loading needs and the property’s approved use. Shared parking or a change from another retail use may require local approval.",
      },
      {
        title: "Zoning and location",
        text: "Confirm that liquor-store or package-store sales are permitted at the exact address. Local ordinances may impose zoning districts, distance-separation rules, conditional-use approval, operating-hour limits or other site restrictions. DBPR requires documentation of proper zoning when approving a license-location change.",
      },
      {
        title: "Before signing a lease",
        text: "Request written zoning confirmation that specifically identifies full-liquor package sales, then verify parking, signage, loading, building and fire compliance. Also confirm that the floor plan satisfies Florida’s package-store separation and access rules before committing to construction or a long-term lease.",
      },
    ],
    sources: [
      {
        label: "Florida Statute §565.04 — package-store restrictions",
        href: "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599%2F0565%2FSections%2F0565.04.html",
      },
      {
        label: "Florida Statute §562.45 — local zoning and location authority",
        href: "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&Search_String=365.175&SubMenu=1&URL=0500-0599%2F0562%2FSections%2F0562.45.html&mode=View+Statutes",
      },
    ],
  },
} as const;

export default function QuotaSiteRequirementCards() {
  const [selected, setSelected] = useState<LicenseKey | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<LicenseKey, HTMLElement | null>>({
    "4cop": null,
    "3ps": null,
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
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
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
              ref={(element) => {
                triggerRefs.current[licenseKey] = element;
              }}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`Open ${license.label} site requirements`}
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
              <p>Common business uses include:</p>
              <ul>
                {license.commonUses.map((use) => <li key={use}>{use}</li>)}
              </ul>
              <small>{license.privilege}</small>
              <strong>View square footage, parking and zoning →</strong>
            </article>
          );
        })}
      </div>

      {activeRequirement && (
        <div
          className="license-types-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <section
            ref={modalRef}
            className="license-types-requirement-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="license-requirement-modal-title"
            aria-describedby="license-requirement-modal-intro"
          >
            <header>
              <div>
                <span>Site requirements before licensing</span>
                <h2 id="license-requirement-modal-title">{activeRequirement.modalTitle}</h2>
              </div>
              <button
                type="button"
                ref={closeButtonRef}
                aria-label="Close site requirements"
                onClick={closeModal}
              >
                ×
              </button>
            </header>

            <p id="license-requirement-modal-intro" className="license-types-modal-intro">
              {activeRequirement.modalIntro}
            </p>

            <div className="license-types-requirement-grid">
              {activeRequirement.details.map((detail) => (
                <article key={detail.title}>
                  <h3>{detail.title}</h3>
                  <p>{detail.text}</p>
                </article>
              ))}
            </div>

            <div className="license-types-modal-notice">
              <strong>No universal site number applies statewide.</strong>
              <p>
                Exact requirements depend on the address and proposed use. Confirm them with the
                city or county zoning authority, DBPR and qualified licensing professionals before
                relying on a location.
              </p>
            </div>

            <footer>
              <div>
                {activeRequirement.sources.map((source) => (
                  <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
                    {source.label} ↗
                  </a>
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
