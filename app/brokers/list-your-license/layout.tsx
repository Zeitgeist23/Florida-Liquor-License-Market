import type { ReactNode } from "react";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import BrokerHeroSelectionFix from "./BrokerHeroSelectionFix";

import "@/app/listings/listings-premium.css";
import "@/app/listings/listings-header-position.css";
import "@/app/listings/listings-map-size.css";
import "@/app/listings/listings-county-links.css";
import "@/app/listings/listings-navy-refresh.css";
import "@/app/listings/listings-card-gold-borders.css";
import "@/app/listings/listings-title-highlight.css";
import "@/app/listings/listings-regression-fix.css";
import "@/app/listings/listings-filter-depth.css";
import "@/app/listings/listings-logo-3pct-lock.css";
import "@/app/listings/listings-conversion-cards.css";
import "@/app/listings/listings-card-overlap-fix.css";
import "@/app/listings/listings-masthead-darker.css";
import "@/app/listings/listings-mobile-header-fix.css";
import "@/app/listings/listings-seo-footer.css";
import "@/app/listings/listings-view-button-edge-fix.css";
import "./mobile-broker-kicker.css";
import "./mobile-benefit-copy.css";

export default function BrokerListYourLicenseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BrokerHeroSelectionFix />

      <style>{`
        .broker-official-shell > .broker-official-header-wrap {
          position: relative;
          z-index: 100;
          border-bottom: 1px solid rgba(246, 167, 0, .55);
          background: #020b12;
        }

        .broker-official-shell > .broker-official-header-wrap .forms-site-header {
          margin-inline: auto;
        }

        /* Improve readability of the small explanatory copy in the broker hero. */
        .broker-official-shell main [class*="heroCopy"] > small {
          font-size: 13px !important;
          line-height: 1.45 !important;
        }

        .broker-official-shell main [class*="heroPlans"] small {
          font-size: 12px !important;
          line-height: 1.4 !important;
        }

        .broker-official-shell main [class*="priceCard"] > span {
          font-size: 11px !important;
        }

        /* Larger, aligned process cards with cyan numbered circles and stronger depth. */
        .broker-official-shell main [class*="steps"] {
          align-items: stretch !important;
        }

        .broker-official-shell main [class*="steps"] article {
          display: flex !important;
          min-height: 242px !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: flex-start !important;
          box-sizing: border-box;
          padding: 34px 26px 30px !important;
          text-align: center !important;
          border-color: #d0d8dd !important;
          background:
            linear-gradient(180deg, rgba(255,255,255,.98) 0%, rgba(248,251,253,.98) 100%) !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.96),
            0 8px 18px rgba(7,24,39,.07),
            0 18px 34px rgba(7,24,39,.08);
          transform: translateY(0) scale(1);
          transition:
            transform .22s ease,
            border-color .22s ease,
            box-shadow .22s ease,
            background .22s ease,
            filter .22s ease;
        }

        .broker-official-shell main [class*="steps"] article:hover {
          transform: translateY(-8px) scale(1.012);
          border-color: #65dfff !important;
          background:
            radial-gradient(circle at 50% 0%, rgba(73,214,255,.11), transparent 42%),
            linear-gradient(180deg, #ffffff 0%, #f7fcff 100%) !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,1),
            0 18px 34px rgba(7,24,39,.15),
            0 28px 52px rgba(7,24,39,.13),
            0 0 28px rgba(63,210,255,.18);
          filter: brightness(1.02);
        }

        .broker-official-shell main [class*="steps"] article > b {
          flex: 0 0 50px !important;
          width: 50px !important;
          height: 50px !important;
          margin: 0 auto !important;
          border: 1px solid rgba(69,218,255,.95) !important;
          color: #041621 !important;
          background: linear-gradient(145deg, #85ebff 0%, #32cfee 100%) !important;
          font-size: 19px !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.75),
            0 8px 18px rgba(33,184,220,.25),
            0 0 18px rgba(68,216,255,.22) !important;
        }

        .broker-official-shell main [class*="steps"] article:hover > b {
          background: linear-gradient(145deg, #9af0ff 0%, #42d8f6 100%) !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.9),
            0 10px 22px rgba(33,184,220,.32),
            0 0 24px rgba(68,216,255,.36) !important;
        }

        .broker-official-shell main [class*="steps"] article h3 {
          margin: 18px 0 10px !important;
          font-size: 22px !important;
          line-height: 1.25 !important;
        }

        .broker-official-shell main [class*="steps"] article p {
          max-width: 235px;
          margin-inline: auto !important;
          font-size: 15px !important;
          line-height: 1.65 !important;
          color: #50616c !important;
        }

        .broker-official-shell main [class*="steps"] article:not(:last-child)::after {
          top: 50% !important;
          right: -14px !important;
          width: 28px !important;
          height: 28px !important;
          transform: translateY(-50%);
          box-shadow: 0 5px 12px rgba(246,167,0,.22);
        }

        /* Make listing-tier cards easier to read and clearly swap selection on hover. */
        .broker-official-shell main [class*="tierOption"],
        .broker-official-shell main [class*="tierSelected"] {
          min-height: 286px !important;
          padding: 29px 30px !important;
          gap: 16px !important;
          transition:
            transform .2s ease,
            border-color .2s ease,
            box-shadow .2s ease,
            background .2s ease,
            opacity .2s ease,
            filter .2s ease !important;
        }

        .broker-official-shell main [class*="tierOption"] {
          transform: translateY(0) !important;
          border-color: #cbd3d8 !important;
          background: #f5f7f7 !important;
          box-shadow: 0 7px 18px rgba(7,24,39,.05) !important;
          opacity: .86;
          filter: saturate(.8);
        }

        .broker-official-shell main [class*="tierSelected"] {
          transform: translateY(-6px) !important;
          border-color: #e0a01a !important;
          background: linear-gradient(180deg, #fffdf7 0%, #fff8e8 100%) !important;
          box-shadow:
            0 18px 34px rgba(7,24,39,.13),
            0 0 24px rgba(246,167,0,.18) !important;
          opacity: 1;
          filter: none;
        }

        .broker-official-shell main [class*="tierTop"] b {
          font-size: 28px !important;
        }

        .broker-official-shell main [class*="tierTop"] strong {
          font-size: 25px !important;
        }

        .broker-official-shell main [class*="tierDescription"] {
          max-width: 470px !important;
          font-size: 16px !important;
          line-height: 1.62 !important;
        }

        .broker-official-shell main [class*="tierBenefits"] {
          font-size: 15px !important;
          line-height: 2 !important;
        }

        .broker-official-shell main [class*="tierSelected"] input[type="radio"] {
          transform: scale(1.12);
        }

        /* Make the representation distinction cards easier to read and give them the same dimensional hover language as the marketplace cards. */
        .broker-official-shell main [class*="distinctionGrid"] article {
          min-height: 330px !important;
          box-sizing: border-box;
          padding: 36px !important;
          background:
            radial-gradient(circle at 50% 0%, rgba(246, 167, 0, .06), transparent 42%),
            #0a2236 !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.035),
            0 12px 28px rgba(0,0,0,.18);
          transform: translateY(0) scale(1);
          transition:
            transform .2s ease,
            border-color .2s ease,
            box-shadow .2s ease,
            background .2s ease,
            filter .2s ease;
        }

        .broker-official-shell main [class*="distinctionGrid"] article:hover {
          transform: translateY(-6px) scale(1.01);
          border-color: rgba(246, 167, 0, .95) !important;
          background:
            radial-gradient(circle at 50% 0%, rgba(246, 167, 0, .16), transparent 46%),
            linear-gradient(150deg, #0d2a43 0%, #0a2236 68%, #071927 100%) !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.07),
            0 22px 44px rgba(0,0,0,.34),
            0 0 30px rgba(246,167,0,.22);
          filter: brightness(1.05);
        }

        .broker-official-shell main [class*="distinctionGrid"] article > span {
          font-size: 12px !important;
          line-height: 1.35 !important;
          letter-spacing: .09em !important;
        }

        .broker-official-shell main [class*="distinctionGrid"] article h3 {
          font-size: 24px !important;
          line-height: 1.25 !important;
        }

        .broker-official-shell main [class*="distinctionGrid"] article > p {
          font-size: 17px !important;
          line-height: 1.65 !important;
        }

        .broker-official-shell main [class*="distinctionGrid"] article li {
          font-size: 16px !important;
          line-height: 1.55 !important;
        }

        /* Remove the route's old one-off header/footer so the approved shared shell is authoritative. */
        .broker-official-shell > main > div:has(> .forms-site-header),
        .broker-official-shell > main > footer {
          display: none !important;
        }

        @media (min-width: 981px) {
          .broker-official-shell .forms-site-header.page-shell {
            width: min(1240px, calc(100% - 40px));
            gap: 18px;
          }

          .broker-official-shell .forms-site-header .brand-lockup {
            flex: 0 0 184px;
          }

          .broker-official-shell .forms-site-header .brand-lockup img {
            width: 168.7125px;
            height: 68.5075px;
          }

          .broker-official-shell .forms-site-header .primary-nav {
            justify-content: center;
            gap: 42px;
          }

          .broker-official-shell .forms-site-header .header-actions {
            transform: translateX(5px);
          }

          .broker-official-shell .forms-site-header .header-actions .btn-outline:hover,
          .broker-official-shell .forms-site-header .header-actions .btn-outline:focus-visible {
            border-color: #ffc13b;
            background: linear-gradient(145deg, #ffc13b, #e69a00);
            color: #07101a;
            box-shadow:
              0 0 0 1px rgba(255, 193, 59, .28),
              0 0 18px rgba(241, 166, 0, .5);
          }
        }

        @media (max-width: 720px) {
          .broker-official-shell main [class*="distinctionGrid"] article {
            min-height: 0 !important;
            padding: 28px !important;
          }

          .broker-official-shell main [class*="steps"] article {
            min-height: 190px !important;
            padding: 26px 22px !important;
          }

          .broker-official-shell main [class*="steps"] article:not(:last-child)::after {
            display: none !important;
          }

          .broker-official-shell main [class*="tierOption"],
          .broker-official-shell main [class*="tierSelected"] {
            min-height: 0 !important;
            padding: 24px !important;
          }
        }
      `}</style>

      <div className="broker-official-shell">
        <div className="broker-official-header-wrap">
          <FormsSiteHeader />
        </div>

        {children}
      </div>
    </>
  );
}
