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
          font-size: 10px !important;
          font-weight: 900 !important;
          line-height: 1 !important;
          letter-spacing: .03em !important;
          text-decoration: none !important;
          text-transform: uppercase !important;
          white-space: nowrap !important;
        }

        .results-page > .results-header nav.listings-primary-nav > a.listings-header-list-license:hover {
          background: linear-gradient(145deg, #ffc83f, #f6a700) !important;
          color: #061728 !important;
          box-shadow: 0 7px 17px rgba(246, 167, 0, .2) !important;
        }

        .results-page > .results-header nav.listings-primary-nav > a.listings-header-list-license:focus-visible {
          background: linear-gradient(145deg, #ffc83f, #f6a700) !important;
          color: #061728 !important;
          box-shadow: 0 7px 17px rgba(246, 167, 0, .2) !important;
          outline: 2px solid rgba(255, 193, 45, .42) !important;
          outline-offset: 2px !important;
        }

        @media (max-width: 1050px) and (min-width: 900px) {
          .results-page > .results-header nav.listings-primary-nav {
            gap: 10px !important;
            padding-left: 12px !important;
          }

          .results-page > .results-header nav.listings-primary-nav > a.listings-header-list-license {
            width: 134px !important;
            min-width: 134px !important;
            height: 32px !important;
            min-height: 32px !important;
            padding: 0 7px !important;
            font-size: 9px !important;
          }
        }

        @media (max-width: 899px) {
          .results-page > .results-header nav.listings-primary-nav > a.listings-header-list-license {
            width: 100% !important;
            max-width: 280px !important;
            min-width: 0 !important;
            height: 38px !important;
            min-height: 38px !important;
            margin: 5px auto 3px !important;
            padding: 0 12px !important;
            font-size: 10px !important;
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
