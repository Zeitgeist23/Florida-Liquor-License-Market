"use client";

const SELF_DIRECTED_PATH = "/sell-your-license?method=self#listing-options";
const BROKER_ASSISTANCE_PATH = "/sell-your-license#broker-assistance";
const BROKER_LISTING_PATH = "/brokers/list-your-license";

export default function HeaderListYourLicenseMenu() {
  return (
    <div className="header-list-license-menu-wrap">
      <button
        className="btn btn-gold header-list-license-menu-trigger"
        type="button"
        aria-haspopup="menu"
        aria-label="List your Florida liquor license"
      >
        List Your License
      </button>
      <div
        className="header-list-license-menu-panel"
        role="menu"
        aria-label="List your license options"
      >
        <a href={SELF_DIRECTED_PATH} role="menuitem">Self-Directed Seller</a>
        <a href={BROKER_ASSISTANCE_PATH} role="menuitem">Request Broker Help</a>
        <a href={BROKER_LISTING_PATH} role="menuitem">Broker Listing</a>
      </div>

      <style>{`
        .header-actions .header-list-license-menu-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          flex: 0 0 auto;
        }

        .header-actions .header-list-license-menu-wrap::after {
          content: "";
          position: absolute;
          top: 100%;
          right: 0;
          width: 100%;
          height: 9px;
        }

        .header-actions .header-list-license-menu-trigger {
          cursor: pointer;
        }

        .header-actions .header-list-license-menu-panel {
          position: absolute;
          top: calc(100% + 7px);
          right: 0;
          z-index: 30000;
          display: none;
          width: 230px;
          padding: 6px;
          border: 1px solid #f6a700;
          border-radius: 7px;
          background: #061728;
          box-shadow: 0 18px 42px rgba(0,0,0,.42);
        }

        .header-actions .header-list-license-menu-wrap:hover .header-list-license-menu-panel,
        .header-actions .header-list-license-menu-wrap:focus-within .header-list-license-menu-panel {
          display: grid;
          gap: 2px;
        }

        .header-actions .header-list-license-menu-panel a {
          display: block;
          padding: 11px 12px;
          border-radius: 4px;
          color: #f6a700;
          font-size: 13.5px;
          font-weight: 800;
          line-height: 1.25;
          text-decoration: none;
          text-transform: none;
          white-space: normal;
        }

        .header-actions .header-list-license-menu-panel a:hover,
        .header-actions .header-list-license-menu-panel a:focus-visible {
          background: #f6a700;
          color: #061728;
          outline: none;
        }

        @media (max-width: 899px) {
          .header-actions .header-list-license-menu-wrap {
            width: 100%;
            justify-content: center;
          }

          .header-actions .header-list-license-menu-panel {
            right: 50%;
            width: min(230px, calc(100vw - 28px));
            transform: translateX(50%);
          }
        }
      `}</style>
    </div>
  );
}
