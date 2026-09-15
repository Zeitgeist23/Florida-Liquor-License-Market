import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import CountyPage from "../[slug]/page";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/counties/hillsborough`;

export const metadata: Metadata = {
  title: "Tampa Liquor License for Sale | Hillsborough 4COP & 3PS",
  description:
    "Find Tampa liquor licenses for sale in Hillsborough County. Compare current 4COP and 3PS quota-license listings, asking prices, county market data, financing and license values on FLLM.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Tampa Liquor License for Sale | Hillsborough 4COP & 3PS",
    description:
      "Compare Tampa-area 4COP and 3PS liquor licenses for sale in Hillsborough County, including current inventory, asking prices, market data and buyer resources.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function HillsboroughCountyPage() {
  const countyPage = await CountyPage({ params: Promise.resolve({ slug: "hillsborough" }) });

  return (
    <>
      <style>{`
        .hillsborough-official-page > .hillsborough-official-header-wrap {
          position: relative;
          z-index: 30;
          border-bottom: 1px solid rgba(246, 167, 0, .55);
          background: #020b12;
        }

        .hillsborough-official-page > .hillsborough-official-header-wrap .forms-site-header {
          margin-inline: auto;
        }

        .hillsborough-official-page .county-market-page > .county-header,
        .hillsborough-official-page .county-market-page > .county-footer {
          display: none !important;
        }

        @media (min-width: 981px) {
          .hillsborough-official-page .forms-site-header.page-shell {
            width: min(1240px, calc(100% - 40px));
            gap: 18px;
          }

          .hillsborough-official-page .forms-site-header .brand-lockup {
            flex: 0 0 184px;
          }

          .hillsborough-official-page .forms-site-header .brand-lockup img {
            width: 168.7125px;
            height: 68.5075px;
          }

          .hillsborough-official-page .forms-site-header .primary-nav {
            justify-content: center;
            gap: 42px;
          }

          .hillsborough-official-page .forms-site-header .header-actions {
            transform: translateX(5px);
          }

          .hillsborough-official-page .forms-site-header .header-actions .btn-outline:hover,
          .hillsborough-official-page .forms-site-header .header-actions .btn-outline:focus-visible {
            border-color: #ffc13b;
            background: linear-gradient(145deg, #ffc13b, #e69a00);
            color: #07101a;
            box-shadow:
              0 0 0 1px rgba(255, 193, 59, .28),
              0 0 18px rgba(241, 166, 0, .5);
          }
        }
      `}</style>

      <div className="hillsborough-official-page">
        <div className="hillsborough-official-header-wrap">
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
