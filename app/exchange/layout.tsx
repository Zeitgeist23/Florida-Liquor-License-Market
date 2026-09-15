import type { ReactNode } from "react";

import FormsSiteHeader from "@/components/FormsSiteHeader";

export default function ExchangeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        .exchange-official-shell > .exchange-official-header-wrap {
          position: relative;
          z-index: 100;
          border-bottom: 1px solid rgba(246, 167, 0, .55);
          background: #020b12;
        }

        .exchange-official-shell > .exchange-official-header-wrap .forms-site-header {
          margin-inline: auto;
        }

        /* Hide the Exchange page's route-specific header so the approved shared FLLM header is authoritative. */
        .exchange-official-shell > main.exchange-page > .abt-header-wrap {
          display: none !important;
        }

        /* Hide the obsolete route-specific Exchange footer so only the official shared FLLM footer remains. */
        .exchange-official-shell > main.exchange-page > .abt-forms-footer {
          display: none !important;
        }

        @media (min-width: 981px) {
          .exchange-official-shell .forms-site-header.page-shell {
            width: min(1240px, calc(100% - 40px));
            gap: 18px;
          }

          .exchange-official-shell .forms-site-header .brand-lockup {
            flex: 0 0 184px;
          }

          .exchange-official-shell .forms-site-header .brand-lockup img {
            width: 168.7125px;
            height: 68.5075px;
          }

          .exchange-official-shell .forms-site-header .primary-nav {
            justify-content: center;
            gap: 42px;
          }

          .exchange-official-shell .forms-site-header .header-actions {
            transform: translateX(5px);
          }

          .exchange-official-shell .forms-site-header .header-actions .btn-outline:hover,
          .exchange-official-shell .forms-site-header .header-actions .btn-outline:focus-visible {
            border-color: #ffc13b;
            background: linear-gradient(145deg, #ffc13b, #e69a00);
            color: #07101a;
            box-shadow:
              0 0 0 1px rgba(255, 193, 59, .28),
              0 0 18px rgba(241, 166, 0, .5);
          }
        }
      `}</style>

      <div className="exchange-official-shell">
        <div className="exchange-official-header-wrap">
          <FormsSiteHeader />
        </div>
        {children}
      </div>
    </>
  );
}
