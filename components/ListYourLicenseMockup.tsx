"use client";

import { useEffect, useRef, useState } from "react";

import FormsSiteHeader from "@/components/FormsSiteHeader";

type ListingPath = "self" | "broker";

const FLORIDA_COUNTIES = [
  "Alachua County",
  "Baker County",
  "Bay County",
  "Bradford County",
  "Brevard County",
  "Broward County",
  "Calhoun County",
  "Charlotte County",
  "Citrus County",
  "Clay County",
  "Collier County",
  "Columbia County",
  "DeSoto County",
  "Dixie County",
  "Duval County",
  "Escambia County",
  "Flagler County",
  "Franklin County",
  "Gadsden County",
  "Gilchrist County",
  "Glades County",
  "Gulf County",
  "Hamilton County",
  "Hardee County",
  "Hendry County",
  "Hernando County",
  "Highlands County",
  "Hillsborough County",
  "Holmes County",
  "Indian River County",
  "Jackson County",
  "Jefferson County",
  "Lafayette County",
  "Lake County",
  "Lee County",
  "Leon County",
  "Levy County",
  "Liberty County",
  "Madison County",
  "Manatee County",
  "Marion County",
  "Martin County",
  "Miami-Dade County",
  "Monroe County",
  "Nassau County",
  "Okaloosa County",
  "Okeechobee County",
  "Orange County",
  "Osceola County",
  "Palm Beach County",
  "Pasco County",
  "Pinellas County",
  "Polk County",
  "Putnam County",
  "Santa Rosa County",
  "Sarasota County",
  "Seminole County",
  "St. Johns County",
  "St. Lucie County",
  "Sumter County",
  "Suwannee County",
  "Taylor County",
  "Union County",
  "Volusia County",
  "Wakulla County",
  "Walton County",
  "Washington County",
] as const;

const pathDetails = {
  self: {
    eyebrow: "Self-Directed Listing",
    title: "Create and manage your marketplace listing",
    copy:
      "Provide the license details, set your asking price, and receive buyer inquiries directly. You remain responsible for negotiations, professional advice, transfer documents, and closing coordination.",
    button: "Continue with Self-Directed Listing",
    note: "$14.95 one-time listing-submission fee. No brokerage representation is included.",
  },
  broker: {
    eyebrow: "Broker-Assisted Listing",
    title: "Request professional marketing and transaction guidance",
    copy:
      "Tell us your goals and an FLLM-affiliated broker can contact you about marketing strategy, buyer communications, negotiations, documentation, and transaction coordination.",
    button: "Request a Broker Consultation",
    note: "Brokerage services and compensation require a separate written agreement.",
  },
} as const;

function formatQuickCurrency(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ListYourLicenseMockup() {
  const [listingPath, setListingPath] = useState<ListingPath | null>(null);
  const [intakeRevision, setIntakeRevision] = useState(0);
  const [county, setCounty] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [quickValues, setQuickValues] = useState<Record<string, string>>({});
  const intakeRef = useRef<HTMLElement>(null);
  const selected = listingPath ? pathDetails[listingPath] : null;

  useEffect(() => {
    if (!listingPath) return;

    const animationFrame = window.requestAnimationFrame(() => {
      intakeRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [listingPath, intakeRevision]);

  function updateQuickValue(name: string, value: string) {
    setQuickValues((current) => ({ ...current, [name]: value }));
  }

  function listingFormHref() {
    if (!listingPath) return "/sell-your-license#listing-options";

    const params = new URLSearchParams({ method: listingPath });
    if (county) params.set("county", county);
    if (licenseType) params.set("license_type", licenseType);

    const fields = listingPath === "self"
      ? ["self_asking_price", "self_license_status", "self_preferred_timing", "self_contact_method"]
      : ["desired_net_amount", "broker_currently_represented", "broker_arrangement", "broker_contact_method"];

    fields.forEach((field) => {
      if (quickValues[field]) params.set(field, quickValues[field]);
    });

    return `/sell-your-license/form?${params.toString()}`;
  }

  function chooseListingPath(path: ListingPath) {
    setListingPath(path);
    setIntakeRevision((revision) => revision + 1);
  }

  return (
    <main className="seller-preview-page">
      <div className="abt-header-wrap">
        <FormsSiteHeader
          primaryActionHref="#listing-options"
          primaryActionLabel="Start Your Listing"
        />
      </div>

      <section className="seller-preview-hero">
        <div className="page-shell">
          <nav className="seller-preview-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            <b>List Your License</b>
          </nav>

          <div className="seller-preview-hero-grid">
            <div>
              <span className="seller-preview-eyebrow">Confidential seller intake</span>
              <h1>Choose how you want to list your Florida liquor license</h1>
              <p>
                Start with a marketplace listing you manage yourself or request broker-assisted
                marketing and transaction support. Your selection can be changed before submission.
              </p>
              <div className="seller-preview-assurances" aria-label="Seller assurances">
                <span>Confidential intake</span>
                <span>All 67 Florida counties</span>
                <span>Review before publication</span>
              </div>
            </div>

            <aside className="seller-preview-hero-note">
              <span>Not sure which path fits?</span>
              <strong>Compare the responsibilities before you begin.</strong>
              <p>
                Self-directed sellers manage buyer communications and the transaction. A
                broker-assisted listing begins with a consultation and requires a separate written
                brokerage agreement before representation starts.
              </p>
              <p className="seller-preview-hero-fee">
                <strong>Self-Directed Listing:</strong> $14.95 one-time listing-submission fee. No
                brokerage representation is included.
              </p>
              <a href="#listing-options">Compare Listing Options ↓</a>
            </aside>
          </div>
        </div>
      </section>

      <section className="seller-preview-content page-shell" id="listing-options">
        <div className="seller-preview-section-heading">
          <div>
            <span>Step 1 · Select a listing path</span>
            <h2>How would you like to market your license?</h2>
          </div>
          <p>
            Both options begin with a confidential intake. Public listing information is reviewed
            before it appears on Florida Liquor License Market.
          </p>
        </div>

        <div className="seller-path-grid" role="radiogroup" aria-label="Listing service">
          <button
            className={`seller-path-card ${listingPath === "self" ? "is-selected" : ""}`}
            type="button"
            role="radio"
            aria-checked={listingPath === "self"}
            onClick={() => chooseListingPath("self")}
          >
            <span className="seller-path-number">01</span>
            <span className="seller-path-badge">Marketplace listing</span>
            <strong>Self-Directed</strong>
            <small>Best for experienced sellers who want direct control.</small>
            <ul>
              <li>You set the asking price and listing details</li>
              <li>Buyer inquiries are directed to you</li>
              <li>You manage negotiations and professional advisors</li>
              <li>No broker represents you through this option</li>
            </ul>
            <span className="seller-path-resources">
              <b>Free Resources for Your Transaction</b>
              <small>
                Access Florida license-sale and transfer forms, calculators, and professional
                directories through the Resources menu to help prepare paperwork and navigate the
                sale and transfer process.
              </small>
            </span>
            <span className="seller-path-select">
              {listingPath === "self" ? "Selected" : "Choose Self-Directed"}
            </span>
          </button>

          <button
            className={`seller-path-card seller-path-card-featured ${listingPath === "broker" ? "is-selected" : ""}`}
            type="button"
            role="radio"
            aria-checked={listingPath === "broker"}
            onClick={() => chooseListingPath("broker")}
          >
            <span className="seller-path-number">02</span>
            <span className="seller-path-badge">Consultation requested</span>
            <strong>Broker-Assisted</strong>
            <small>Best for sellers who want professional transaction support.</small>
            <ul>
              <li>Discuss pricing and marketing strategy</li>
              <li>Broker can screen and communicate with buyers</li>
              <li>Negotiation and transaction coordination support</li>
              <li>Services begin only after a written agreement</li>
            </ul>
            <span className="seller-path-resources">
              <b>Free Resources for Your Transaction</b>
              <small>
                Access Florida license-sale and transfer forms, calculators, and professional
                directories through the Resources menu to help prepare paperwork and navigate the
                sale and transfer process.
              </small>
            </span>
            <span className="seller-path-select">
              {listingPath === "broker" ? "Selected" : "Choose Broker-Assisted"}
            </span>
          </button>
        </div>

        {listingPath && selected && (
          <section
            className="seller-preview-intake"
            key={`${listingPath}-${intakeRevision}`}
            ref={intakeRef}
            aria-live="polite"
          >
          <div className="seller-preview-intake-copy">
            <span>{selected.eyebrow}</span>
            <h2>{selected.title}</h2>
            <p>{selected.copy}</p>

            <div className="seller-preview-license-row">
              <label>
                <span>County</span>
                <select
                  className={county ? "has-value" : ""}
                  value={county}
                  onChange={(event) => setCounty(event.target.value)}
                >
                  <option value="" disabled>Select county</option>
                  {FLORIDA_COUNTIES.map((county) => (
                    <option key={county}>{county}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>License type</span>
                <select
                  className={licenseType ? "has-value" : ""}
                  value={licenseType}
                  onChange={(event) => setLicenseType(event.target.value)}
                >
                  <option value="" disabled>Select license type</option>
                  <option>4COP Quota</option>
                  <option>3PS Quota / Package Store</option>
                  <option>Other / Not sure</option>
                </select>
              </label>
            </div>
          </div>

          <div className="seller-preview-fields">
            {listingPath === "self" ? (
              <>
                <label>
                  <span>Asking price</span>
                  <span
                    className={`seller-preview-currency-input ${
                      quickValues.self_asking_price ? "has-value" : ""
                    }`}
                  >
                    <span aria-hidden="true">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="Enter asking price"
                      value={quickValues.self_asking_price ?? ""}
                      onChange={(event) =>
                        updateQuickValue("self_asking_price", formatQuickCurrency(event.target.value))
                      }
                    />
                  </span>
                </label>
                <label>
                  <span>License status</span>
                  <select
                    className={quickValues.self_license_status ? "has-value" : ""}
                    value={quickValues.self_license_status ?? ""}
                    onChange={(event) => updateQuickValue("self_license_status", event.target.value)}
                  >
                    <option value="" disabled>Select current status</option>
                    <option>Active and current</option>
                    <option>Inactive</option>
                    <option>In escrow (DBPR/ABT)</option>
                    <option>Transfer pending</option>
                    <option>Not sure</option>
                  </select>
                </label>
                <label>
                  <span>Preferred timing</span>
                  <select
                    className={quickValues.self_preferred_timing ? "has-value" : ""}
                    value={quickValues.self_preferred_timing ?? ""}
                    onChange={(event) => updateQuickValue("self_preferred_timing", event.target.value)}
                  >
                    <option value="" disabled>Select sale timing</option>
                    <option>Immediately</option>
                    <option>Within 30 days</option>
                    <option>Within 31-60 days</option>
                    <option>Within 61-90 days</option>
                    <option>Flexible</option>
                  </select>
                </label>
                <label>
                  <span>Buyer contact</span>
                  <select
                    className={quickValues.self_contact_method ? "has-value" : ""}
                    value={quickValues.self_contact_method ?? ""}
                    onChange={(event) => updateQuickValue("self_contact_method", event.target.value)}
                  >
                    <option value="" disabled>Phone, email, or both</option>
                    <option>Phone</option>
                    <option>Email</option>
                    <option>Either phone or email</option>
                  </select>
                </label>
              </>
            ) : (
              <>
                <label>
                  <span>Desired net amount</span>
                  <span
                    className={`seller-preview-currency-input ${
                      quickValues.desired_net_amount ? "has-value" : ""
                    }`}
                  >
                    <span aria-hidden="true">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="Enter desired net proceeds"
                      value={quickValues.desired_net_amount ?? ""}
                      onChange={(event) =>
                        updateQuickValue("desired_net_amount", formatQuickCurrency(event.target.value))
                      }
                    />
                  </span>
                </label>
                <label>
                  <span>Current representation</span>
                  <select
                    className={quickValues.broker_currently_represented ? "has-value" : ""}
                    value={quickValues.broker_currently_represented ?? ""}
                    onChange={(event) => updateQuickValue("broker_currently_represented", event.target.value)}
                  >
                    <option value="" disabled>Select broker status</option>
                    <option>No</option>
                    <option>Yes</option>
                    <option>Not sure</option>
                  </select>
                </label>
                <label>
                  <span>Preferred arrangement</span>
                  <select
                    className={quickValues.broker_arrangement ? "has-value" : ""}
                    value={quickValues.broker_arrangement ?? ""}
                    onChange={(event) => updateQuickValue("broker_arrangement", event.target.value)}
                  >
                    <option value="" disabled>Select an arrangement</option>
                    <option>No preference / need guidance</option>
                    <option>Non-exclusive arrangement</option>
                    <option>Exclusive arrangement</option>
                  </select>
                </label>
                <label>
                  <span>Contact preference</span>
                  <select
                    className={quickValues.broker_contact_method ? "has-value" : ""}
                    value={quickValues.broker_contact_method ?? ""}
                    onChange={(event) => updateQuickValue("broker_contact_method", event.target.value)}
                  >
                    <option value="" disabled>Phone, email, or both</option>
                    <option>Phone</option>
                    <option>Email</option>
                    <option>Either phone or email</option>
                  </select>
                </label>
              </>
            )}
            <a className="btn btn-gold" href={listingFormHref()}>
              {selected.button}
            </a>
            <small>{selected.note}</small>
          </div>
          </section>
        )}

        <section className="seller-preview-comparison" aria-labelledby="seller-comparison-heading">
          <div className="seller-preview-comparison-heading">
            <span>Responsibilities at a glance</span>
            <h2 id="seller-comparison-heading">Know what each option includes</h2>
          </div>
          <div className="seller-comparison-table">
            <div className="seller-comparison-row seller-comparison-header">
              <b>Service or responsibility</b>
              <b>Self-Directed</b>
              <b>Broker-Assisted</b>
            </div>
            {[
              ["Public marketplace exposure", "Included", "Included"],
              ["Seller controls asking price", "Yes", "With broker guidance"],
              ["Buyer communications", "Seller", "Broker may manage"],
              ["Negotiation support", "Not included", "Available by agreement"],
              ["Transfer and closing coordination", "Seller’s advisors", "Available by agreement"],
              ["Brokerage compensation", "None", "Disclosed in written agreement"],
            ].map(([service, self, broker]) => (
              <div className="seller-comparison-row" key={service}>
                <strong>{service}</strong>
                <span>{self}</span>
                <span>{broker}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="seller-preview-disclosure" aria-label="Listing service disclosure">
          <strong>Important listing and brokerage disclosure</strong>
          <p>
            Selecting the broker-assisted option is a request for contact and does not itself create
            a brokerage relationship. Brokerage representation, scope of services, exclusivity, and
            compensation must be stated in a separate written agreement accepted by the parties.
            Self-directed listings do not include representation, valuation, negotiation, legal,
            tax, licensing, or closing services. FLLM may review submitted information before
            publication and does not guarantee a buyer, sale, transfer approval, or closing.
          </p>
        </section>
      </section>

      <footer className="abt-forms-footer">
        <div className="page-shell">
          <img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" />
          <span>Florida’s marketplace for buying, selling and financing liquor licenses.</span>
          <a href="/">Return to Florida Liquor License Market</a>
        </div>
      </footer>
    </main>
  );
}

