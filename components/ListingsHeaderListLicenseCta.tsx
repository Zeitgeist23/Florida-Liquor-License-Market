"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

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

        .results-page > .results-header nav.listings-primary-nav > a.listings-header-list-license {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          min-height: 34px !important;
          padding: 0 13px !important;
          border: 1px solid #ffc12d !important;
          border-radius: 5px !important;
          background: linear-gradient(145deg, #ffbd21, #ef9000) !important;
          box-shadow: 0 7px 18px rgba(246, 167, 0, .22) !important;
          color: #061728 !important;
          font-size: 10px !important;
          font-weight: 900 !important;
          line-height: 1 !important;
          letter-spacing: .035em !important;
          text-decoration: none !important;
          text-transform: uppercase !important;
          white-space: nowrap !important;
        }

        .results-page > .results-header nav.listings-primary-nav > a.listings-header-list-license:hover,
        .results-page > .results-header nav.listings-primary-nav > a.listings-header-list-license:focus-visible {
          background: linear-gradient(145deg, #ffc83f, #f6a700) !important;
          color: #061728 !important;
          box-shadow: 0 9px 24px rgba(246, 167, 0, .34) !important;
          outline: 2px solid rgba(255, 193, 45, .32) !important;
          outline-offset: 2px !important;
        }

        @media (max-width: 1050px) and (min-width: 900px) {
          .results-page > .results-header nav.listings-primary-nav {
            gap: 10px !important;
            padding-left: 12px !important;
          }

          .results-page > .results-header nav.listings-primary-nav > a.listings-header-list-license {
            padding: 0 9px !important;
            font-size: 9px !important;
          }
        }

        @media (max-width: 899px) {
          .results-page > .results-header nav.listings-primary-nav > a.listings-header-list-license {
            width: 100% !important;
            min-height: 42px !important;
            margin: 5px 0 3px !important;
            font-size: 11px !important;
          }
        }
      `}</style>
      {target
        ? createPortal(
            <a
              className="listings-header-list-license"
              href="/sell-your-license"
              aria-label="List your Florida liquor license for sale"
            >
              List Your License
            </a>,
            target,
          )
        : null}
    </>
  );
}
