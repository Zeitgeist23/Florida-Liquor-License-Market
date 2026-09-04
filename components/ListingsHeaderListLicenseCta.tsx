"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const SELF_DIRECTED_PATH = "/sell-your-license";
const BROKER_LISTING_PATH = "/brokers/list-your-license";
const BROKER_ASSISTANCE_PATH = "/sell-your-license#broker-assistance";

export default function ListingsHeaderListLicenseCta() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTarget(
      document.querySelector<HTMLElement>(
        ".results-page > .results-header nav.listings-primary-nav",
      ),
    );
  }, []);

  return (
    <>
      <style>{`
        .results-page > .results-header nav.listings-primary-nav {
          gap: 18px !important;
        }

        .results-page > .results-header nav.listings-primary-nav > .listings-header-list-license-wrap {
          position: relative !important;
          display: inline-flex !important;
          align-items: center !important;
          flex: 0 0 auto !important;
        }

        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 142px !important;
          min-width: 142px !important;
          height: 34px !important;
          min-height: 34px !important;
          padding: 0 9px !important;
          border: 1px solid #ffc12d !important;
          border-radius: 5px !important;
          background: linear-gradient(145deg, #ffbd21, #ef9000) !important;
          box-shadow: 0 5px 13px rgba(246, 167, 0, .14) !important;
          color: #061728 !important;
          font-family: inherit !important;
          font-size: 10px !important;
          font-weight: 900 !important;
          line-height: 1 !important;
          letter-spacing: .03em !important;
          text-decoration: none !important;
          text-transform: uppercase !important;
          white-space: nowrap !important;
          cursor: pointer !important;
        }

        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license:hover,
        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license:focus-visible,
        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-wrap:hover .listings-header-list-license {
          background: linear-gradient(145deg, #ffc83f, #f6a700) !important;
          color: #061728 !important;
          box-shadow: 0 7px 17px rgba(246, 167, 0, .2) !important;
          outline: none !important;
        }

        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-menu {
          position: absolute !important;
          top: calc(100% + 6px) !important;
          right: 0 !important;
          z-index: 30000 !important;
          display: none !important;
          width: 350px !important;
          padding: 7px !important;
          border: 1px solid #f6a700 !important;
          border-radius: 7px !important;
          background: #061728 !important;
          box-shadow: 0 20px 50px rgba(0,0,0,.45) !important;
          text-transform: none !important;
        }

        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-wrap:hover::after,
        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-wrap:focus-within::after {
          content: "";
          position: absolute;
          top: 100%;
          right: 0;
          width: 100%;
          height: 8px;
        }

        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-wrap:hover .listings-header-list-license-menu,
        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-wrap:focus-within .listings-header-list-license-menu {
          display: grid !important;
          gap: 2px !important;
        }

        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-menu a {
          display: flex !important;
          flex-direction: column !important;
          gap: 4px !important;
          width: 100% !important;
          padding: 11px 12px !important;
          border-radius: 4px !important;
          color: #fff !important;
          text-decoration: none !important;
          text-transform: none !important;
          white-space: normal !important;
        }

        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-menu a strong {
          color: #f6a700 !important;
          font-size: 13.5px !important;
          font-weight: 800 !important;
          line-height: 1.2 !important;
        }

        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-menu a span {
          color: #d4dde5 !important;
          font-size: 12px !important;
          font-weight: 500 !important;
          line-height: 1.35 !important;
        }

        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-menu a:hover,
        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-menu a:focus-visible {
          background: #f6a700 !important;
          color: #061728 !important;
          outline: none !important;
        }

        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-menu a:hover strong,
        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-menu a:hover span,
        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-menu a:focus-visible strong,
        .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-menu a:focus-visible span {
          color: #061728 !important;
        }

        @media (max-width: 1050px) and (min-width: 900px) {
          .results-page > .results-header nav.listings-primary-nav {
            gap: 10px !important;
            padding-left: 12px !important;
          }

          .results-page > .results-header nav.listings-primary-nav .listings-header-list-license {
            width: 134px !important;
            min-width: 134px !important;
            height: 32px !important;
            min-height: 32px !important;
            padding: 0 7px !important;
            font-size: 9px !important;
          }
        }

        @media (max-width: 899px) {
          .results-page > .results-header nav.listings-primary-nav > .listings-header-list-license-wrap {
            width: 100% !important;
            max-width: 280px !important;
            margin: 5px auto 3px !important;
            flex-direction: column !important;
          }

          .results-page > .results-header nav.listings-primary-nav .listings-header-list-license {
            width: 100% !important;
            min-width: 0 !important;
            height: 38px !important;
            min-height: 38px !important;
            padding: 0 12px !important;
            font-size: 10px !important;
          }

          .results-page > .results-header nav.listings-primary-nav .listings-header-list-license-menu {
            position: static !important;
            width: 100% !important;
            margin-top: 5px !important;
          }
        }
      `}</style>
      {target
        ? createPortal(
            <div className="listings-header-list-license-wrap">
              <button
                className="listings-header-list-license"
                type="button"
                aria-haspopup="menu"
                aria-label="List your Florida liquor license for sale"
              >
                List Your License
              </button>
              <div className="listings-header-list-license-menu" role="menu" aria-label="List your license options">
                <a href={SELF_DIRECTED_PATH} role="menuitem">
                  <strong>Self-Directed Seller</strong>
                  <span>List your own license and manage buyer inquiries directly through FLLM.</span>
                </a>
                <a href={BROKER_LISTING_PATH} role="menuitem">
                  <strong>Broker Listing</strong>
                  <span>For brokers listing a client&apos;s Florida liquor license.</span>
                </a>
                <a href={BROKER_ASSISTANCE_PATH} role="menuitem">
                  <strong>Request Broker Help</strong>
                  <span>For sellers who want assistance from an independent broker.</span>
                </a>
              </div>
            </div>,
            target,
          )
        : null}
    </>
  );
}
