import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import CountyPage from "../[slug]/page";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/counties/liberty`;

export const metadata: Metadata = {
  title: "Liberty County Liquor Licenses for Sale | Bristol 4COP & 3PS",
  description:
    "Browse Liberty County liquor licenses for sale in the Bristol market. Compare current 4COP and 3PS quota-license opportunities, asking prices, availability and county market data on FLLM.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Liberty County Liquor Licenses for Sale | Bristol 4COP & 3PS",
    description:
      "Compare current Liberty County 4COP and 3PS quota-license opportunities, asking prices, availability and county market data in the Bristol market.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function LibertyCountyPage() {
  const countyPage = await CountyPage({ params: Promise.resolve({ slug: "liberty" }) });

  return (
    <>
      <style>{`
        .liberty-official-page > .liberty-official-header-wrap {
          position: relative;
          z-index: 500;
          border-bottom: 1px solid rgba(246, 167, 0, .55);
          background: #020b12;
        }

        .liberty-official-page > .liberty-official-header-wrap .forms-site-header {
          margin-inline: auto;
        }

        .liberty-official-page .county-market-page > .county-header,
        .liberty-official-page .county-market-page > .county-footer {
          display: none !important;
        }

        .liberty-official-page .county-map-card {
          background: radial-gradient(circle at 50% 35%, #0c2234 0%, #041420 60%, #01070b 100%) !important;
        }

        .liberty-official-page .county-map-card .florida-county-map > rect {
          fill: #061728 !important;
        }

        @media (min-width: 981px) {
          .liberty-official-page .forms-site-header.page-shell {
            width: min(1240px, calc(100% - 40px));
            gap: 18px;
          }

          .liberty-official-page .forms-site-header .brand-lockup {
            flex: 0 0 184px;
          }

          .liberty-official-page .forms-site-header .brand-lockup img {
            width: 168.7125px;
            height: 68.5075px;
          }

          .liberty-official-page .forms-site-header .primary-nav {
            justify-content: center;
            gap: 42px;
          }

          .liberty-official-page .forms-site-header .header-actions {
            transform: translateX(5px);
          }

          .liberty-official-page .forms-site-header .header-actions .btn-outline:hover,
          .liberty-official-page .forms-site-header .header-actions .btn-outline:focus-visible {
            border-color: #ffc13b;
            background: linear-gradient(145deg, #ffc13b, #e69a00);
            color: #07101a;
            box-shadow:
              0 0 0 1px rgba(255, 193, 59, .28),
              0 0 18px rgba(241, 166, 0, .5);
          }
        }
      `}</style>

      <div className="liberty-official-page">
        <div className="liberty-official-header-wrap">
          <FormsSiteHeader />
        </div>

        {countyPage}

        <footer className="directory-footer sell-license-page-footer official-directory-footer">
          <div className="directory-shell">
            <div className="directory-footer-brand">
              <Link href="/" aria-label="Florida Liquor License Market home">
                <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" width="130" height="53" />
              </Link>
              <span>© Florida Liquor License Market</span>
            </div>
            <nav>
              <Link href="/">Home</Link>
              <Link href="/florida-4cop-liquor-license-for-sale">4COP</Link>
              <Link href="/florida-3ps-liquor-license-for-sale">3PS</Link>
              <Link href="/listings">Listings</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
