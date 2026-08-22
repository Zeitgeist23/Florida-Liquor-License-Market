"use client";

import { useEffect, useRef, useState } from "react";

type Attorney = {
  name: string;
  firm: string;
  location: string;
  category: string;
  phone: string;
  phoneHref: string;
  profile: string;
  services: string[];
  image?: string;
  imageCredit?: string;
  secondaryPhone?: string;
  secondaryPhoneHref?: string;
  publishedResourceTitle?: string;
  publishedResourceUrl?: string;
  publishedResourceLabel?: string;
};

const attorneys: Attorney[] = [
  {
    name: "Hannah Becker",
    firm: "Spencer Fane LLP",
    location: "Tampa · Statewide matters",
    category: "Licensing & Regulatory",
    phone: "813-424-3544",
    phoneHref: "tel:+18134243544",
    profile: "https://www.spencerfane.com/professionals/hannah-becker/",
    image: "https://www.spencerfane.com/wp-content/uploads/2026/03/becker-h.jpg",
    imageCredit: "Portrait from Spencer Fane",
    services: [
      "Alcohol-beverage regulatory and transactional matters",
      "Licensing and permitting",
      "Hospitality mergers and acquisitions",
    ],
  },
  {
    name: "James “Joby” Birr, III",
    firm: "Jimerson Birr, P.A.",
    location: "Jacksonville · Statewide Florida matters",
    category: "Licensing & Regulatory",
    phone: "904-389-0050",
    phoneHref: "tel:+19043890050",
    profile: "https://www.jimersonfirm.com/attorneys/james-joby-birr-iii/",
    services: [
      "Alcoholic-beverage and tobacco licensing and compliance",
      "Administrative law, agency proceedings, and DBPR licensing disputes",
      "Appeals and judicial review involving adverse agency decisions",
    ],
    publishedResourceLabel: "Published firm resource",
    publishedResourceTitle: "Alcoholic Beverage and Tobacco Licenses Overview",
    publishedResourceUrl: "/resources/liquor-license-attorneys/articles/alcoholic-beverage-and-tobacco-licenses-overview",
  },
  {
    name: "Deborah A. Carman",
    firm: "Carman Law Firm, P.A.",
    location: "Boca Raton · Statewide representation",
    category: "Transactions & Transfers",
    phone: "561-392-7031",
    phoneHref: "tel:+15613927031",
    profile: "https://carmanlegal.com/attorneys/",
    image: "https://carmanlegal.com/wp-content/uploads/2025/02/deborah.png",
    imageCredit: "Portrait from Carman Law Firm",
    services: [
      "Business purchases and sales",
      "Mergers, acquisitions, and transaction closings",
      "Liquor-, beer-, and wine-license transfers through the firm",
    ],
  },
  {
    name: "Ryan Malkin",
    firm: "Malkin Law, P.A.",
    location: "Miami Beach · Florida and nationwide beverage matters",
    category: "Licensing & Regulatory",
    phone: "305-763-8539",
    phoneHref: "tel:+13057638539",
    profile: "https://www.malkinlawfirm.com/",
    image: "https://www.malkinlawfirm.com/wp-content/uploads/sites/1504912/2023/01/Malkin_Ryan_4.jpg",
    imageCredit: "Portrait from Malkin Law",
    services: [
      "Alcohol-beverage licensing and regulatory guidance",
      "Retailer, wholesaler, and supplier matters",
      "Business and commercial guidance for beverage-industry clients",
    ],
  },
  {
    name: "Alexis Mason",
    firm: "Spencer Fane LLP",
    location: "Tampa · Statewide matters",
    category: "Transactions & Transfers",
    phone: "813-424-3543",
    phoneHref: "tel:+18134243543",
    profile: "https://www.spencerfane.com/professionals/alexis-mason/",
    image: "https://www.spencerfane.com/wp-content/uploads/2026/03/Alexis-Mason-Headshot-731x1024.png",
    imageCredit: "Portrait from Spencer Fane",
    services: [
      "Alcohol-beverage transactions and regulatory matters",
      "Purchase agreements, due diligence, and licensing approvals",
      "Corporate structuring and mergers and acquisitions",
    ],
  },
  {
    name: "Samuel A. Rubert",
    firm: "Rubert Law",
    location: "Weston and Miami · Statewide representation",
    category: "Transactions & Transfers",
    phone: "954-546-7951",
    phoneHref: "tel:+19545467951",
    secondaryPhone: "Miami: 305-809-7669",
    secondaryPhoneHref: "tel:+13058097669",
    profile: "https://www.rubertlaw.com/attorney/rubert-samuel-a/",
    image: "https://www.rubertlaw.com/wp-content/uploads/sites/1303755/2021/05/sam-200x300.jpg",
    imageCredit: "Portrait from Rubert Law",
    services: [
      "Alcoholic-beverage transactions",
      "Liquor-license purchasing, selling, and permitting",
      "Purchase-agreement, lease, and operational review",
    ],
  },
  {
    name: "Charles M. Schropp",
    firm: "Schropp Law Firm, P.A.",
    location: "Tampa · Statewide appellate matters",
    category: "Litigation & Appeals",
    phone: "813-418-3320",
    phoneHref: "tel:+18134183320",
    profile: "https://www.schropplaw.com/attorney-profiles/charles-m-schropp/",
    image: "/api/attorney-photo/charles-m-schropp",
    imageCredit: "Portrait from Schropp Law Firm",
    services: [
      "Florida liquor-license litigation and appellate matters",
      "Civil litigation and appeals statewide throughout Florida",
      "Appellate briefing, issue framing, and preservation strategy",
    ],
  },
];

function getInitials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2);
}

export default function AttorneyDirectory() {
  const [selectedAttorney, setSelectedAttorney] = useState<Attorney | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedAttorney) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedAttorney(null);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedAttorney]);

  function openAttorney(attorney: Attorney) {
    setSelectedAttorney(attorney);
  }

  return (
    <>
      <section className="attorney-grid page-shell" id="attorney-directory" aria-label="Attorney directory">
        {attorneys.map((attorney) => (
          <article
            className="attorney-card"
            key={attorney.name}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-label={`View details for ${attorney.name}`}
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) return;
              openAttorney(attorney);
            }}
            onKeyDown={(event) => {
              if ((event.key === "Enter" || event.key === " ") && event.target === event.currentTarget) {
                event.preventDefault();
                openAttorney(attorney);
              }
            }}
          >
            <div className="attorney-card-heading">
              <span aria-hidden="true">{getInitials(attorney.name)}</span>
              <div>
                <h2>{attorney.name}</h2>
                <strong>{attorney.firm}</strong>
                <small>{attorney.location}</small>
              </div>
            </div>

            <span className="attorney-practice-badge">{attorney.category}</span>

            <ul>
              {attorney.services.map((service) => <li key={service}>{service}</li>)}
            </ul>

            <div className="attorney-contact">
              <a className="attorney-phone" href={attorney.phoneHref}>
                <span>Call</span>
                <strong>{attorney.phone}</strong>
              </a>
              {attorney.secondaryPhone && attorney.secondaryPhoneHref && (
                <a className="attorney-secondary-phone" href={attorney.secondaryPhoneHref}>
                  {attorney.secondaryPhone}
                </a>
              )}
            </div>

            <a className="attorney-profile-link" href={attorney.profile} target="_blank" rel="noreferrer">
              View attorney or firm profile <span aria-hidden="true">↗</span>
            </a>
            {attorney.publishedResourceTitle && attorney.publishedResourceUrl && (
              <a className="attorney-published-resource" href={attorney.publishedResourceUrl}>
                <span>{attorney.publishedResourceLabel ?? "Published resource"}</span>
                <strong>{attorney.publishedResourceTitle}</strong>
                <em aria-hidden="true">›</em>
              </a>
            )}
            <span className="attorney-card-hint">Click anywhere else for full details</span>
          </article>
        ))}
      </section>

      {selectedAttorney && (
        <div
          className="attorney-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedAttorney(null);
          }}
        >
          <section
            className="attorney-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="attorney-modal-title"
          >
            <button
              ref={closeButtonRef}
              className="attorney-modal-close"
              type="button"
              aria-label="Close attorney details"
              onClick={() => setSelectedAttorney(null)}
            >
              ×
            </button>

            <div className="attorney-modal-photo">
              {selectedAttorney.image ? (
                <>
                  <img src={selectedAttorney.image} alt={`Portrait of ${selectedAttorney.name}`} />
                  <small>{selectedAttorney.imageCredit ?? "Portrait from attorney or firm website"}</small>
                </>
              ) : (
                <>
                  <div className="attorney-modal-monogram" aria-hidden="true">{getInitials(selectedAttorney.name)}</div>
                  <small>Visit the firm profile for attorney information.</small>
                </>
              )}
            </div>

            <div className="attorney-modal-details">
              <span className="attorney-modal-eyebrow">Attorney directory profile</span>
              <h2 id="attorney-modal-title">{selectedAttorney.name}</h2>
              <strong>{selectedAttorney.firm}</strong>
              <p>{selectedAttorney.location}</p>
              <span className="attorney-modal-practice-badge">{selectedAttorney.category}</span>

              <h3>Published practice information</h3>
              <ul>
                {selectedAttorney.services.map((service) => <li key={service}>{service}</li>)}
              </ul>

              {selectedAttorney.publishedResourceTitle && selectedAttorney.publishedResourceUrl && (
                <a className="attorney-modal-resource" href={selectedAttorney.publishedResourceUrl}>
                  <span>{selectedAttorney.publishedResourceLabel ?? "Published resource"}</span>
                  <strong>{selectedAttorney.publishedResourceTitle}</strong>
                  <small>Read inside the FLLM resource viewer ›</small>
                </a>
              )}

              <div className="attorney-modal-actions">
                <a className="btn btn-gold attorney-modal-call" href={selectedAttorney.phoneHref}>
                  <span>Call</span><strong>{selectedAttorney.phone}</strong>
                </a>
                <a className="btn btn-outline" href={selectedAttorney.profile} target="_blank" rel="noreferrer">
                  Visit Firm Profile ↗
                </a>
              </div>

              {selectedAttorney.secondaryPhone && selectedAttorney.secondaryPhoneHref && (
                <a className="attorney-modal-secondary-phone" href={selectedAttorney.secondaryPhoneHref}>
                  {selectedAttorney.secondaryPhone}
                </a>
              )}

              <small className="attorney-modal-notice">
                FLLM does not endorse or guarantee any listed attorney. Practice-focus labels are directory categories, not Florida Bar specialty certifications. Verify credentials, services, fees, and engagement terms independently.
              </small>
            </div>
          </section>
        </div>
      )}

      <style>{`
        .attorney-modal-actions .attorney-modal-call {
          min-height: 52px;
          gap: 8px;
          font-size: 11px !important;
          font-weight: 900;
        }
        .attorney-modal-actions .attorney-modal-call strong {
          font-size: 16px;
          line-height: 1;
          letter-spacing: .025em;
        }
        .attorney-modal-secondary-phone {
          font-size: 14px !important;
          line-height: 1.45;
          font-weight: 900 !important;
        }
      `}</style>
    </>
  );
}
