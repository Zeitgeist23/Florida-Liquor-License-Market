import type { ReactNode } from "react";

import FormsSiteHeader from "@/components/FormsSiteHeader";

import "../resources/forms/abt-forms.css";

export default function HowToBuyFloridaLiquorLicenseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        .how-to-buy-official-shell > .how-to-buy-official-header-wrap {
          position: relative;
          z-index: 100;
          border-bottom: 1px solid rgba(246, 167, 0, .55);
          background: #020b12;
        }

        .how-to-buy-official-shell > .how-to-buy-official-header-wrap .forms-site-header {
          margin-inline: auto;
        }

        /* Hide the guide page's old route-specific header so the shared official FLLM header is authoritative. */
        .how-to-buy-official-shell > main > .abt-header-wrap {
          display: none !important;
        }

        /* Center the 7-step hero summary tiles and give them dimensional hover depth. */
        .how-to-buy-official-shell .buyer-guide-page .seo-market-snapshot-grid > div {
          display: flex !important;
          min-height: 104px;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 18px 14px !important;
          text-align: center !important;
          border-color: rgba(246, 167, 0, .24) !important;
          background: linear-gradient(145deg, #0b2944, #071d33) !important;
          box-shadow:
            0 10px 22px rgba(0, 0, 0, .22),
            0 3px 8px rgba(0, 0, 0, .16),
            inset 0 1px 0 rgba(255, 255, 255, .055) !important;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            border-color 180ms ease,
            background 180ms ease !important;
        }

        .how-to-buy-official-shell .buyer-guide-page .seo-market-snapshot-grid > div strong,
        .how-to-buy-official-shell .buyer-guide-page .seo-market-snapshot-grid > div small {
          display: block !important;
          width: 100% !important;
          margin-left: auto !important;
          margin-right: auto !important;
          text-align: center !important;
        }

        .how-to-buy-official-shell .buyer-guide-page .seo-market-snapshot-grid > div strong {
          margin-bottom: 8px !important;
        }

        .how-to-buy-official-shell .buyer-guide-page .seo-market-snapshot-grid > div:hover {
          transform: translateY(-4px) scale(1.025);
          border-color: rgba(246, 167, 0, .72) !important;
          background: linear-gradient(145deg, #103251, #09243d) !important;
          box-shadow:
            0 18px 34px rgba(0, 0, 0, .30),
            0 7px 16px rgba(0, 0, 0, .20),
            0 0 0 1px rgba(246, 167, 0, .10),
            inset 0 1px 0 rgba(255, 255, 255, .09) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .how-to-buy-official-shell .buyer-guide-page .seo-market-snapshot-grid > div {
            transition: none !important;
          }

          .how-to-buy-official-shell .buyer-guide-page .seo-market-snapshot-grid > div:hover {
            transform: none;
          }
        }

        @media (min-width: 981px) {
          .how-to-buy-official-shell .forms-site-header.page-shell {
            width: min(1240px, calc(100% - 40px));
            gap: 18px;
          }

          .how-to-buy-official-shell .forms-site-header .brand-lockup {
            flex: 0 0 184px;
          }

          .how-to-buy-official-shell .forms-site-header .brand-lockup img {
            width: 168.7125px;
            height: 68.5075px;
          }

          .how-to-buy-official-shell .forms-site-header .primary-nav {
            justify-content: center;
            gap: 42px;
          }

          .how-to-buy-official-shell .forms-site-header .header-actions {
            transform: translateX(5px);
          }

          .how-to-buy-official-shell .forms-site-header .header-actions .btn-outline:hover,
          .how-to-buy-official-shell .forms-site-header .header-actions .btn-outline:focus-visible {
            border-color: #ffc13b;
            background: linear-gradient(145deg, #ffc13b, #e69a00);
            color: #07101a;
            box-shadow:
              0 0 0 1px rgba(255, 193, 59, .28),
              0 0 18px rgba(241, 166, 0, .5);
          }
        }
      `}</style>

      <div className="how-to-buy-official-shell">
        <div className="how-to-buy-official-header-wrap">
          <FormsSiteHeader />
        </div>
        {children}
      </div>
    </>
  );
}
