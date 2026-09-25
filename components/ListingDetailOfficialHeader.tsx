"use client";

import { usePathname } from "next/navigation";

import FormsSiteHeader from "@/components/FormsSiteHeader";

export default function ListingDetailOfficialHeader() {
  const pathname = usePathname();
  const isListingDetail =
    (pathname.startsWith("/listings/") && pathname !== "/listings") ||
    (pathname.startsWith("/es/listings/") && pathname !== "/es/listings");
  const isPlatformPage = pathname === "/florida-liquor-license-market-platform";

  if (!isListingDetail && !isPlatformPage) return null;

  return (
    <>
      <style>{`
        .listing-detail-official-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          border-bottom: 1px solid #765613;
          background:
            radial-gradient(circle at 82% 35%, rgba(19, 54, 77, .2), transparent 30%),
            linear-gradient(90deg, #010810 0%, #020c14 48%, #061522 100%);
          box-shadow: 0 5px 15px rgba(0, 0, 0, .22);
        }

        .listing-detail-official-header .forms-site-header {
          background: transparent;
        }

        body:has(.listing-detail-official-header) .marketplace-listing-page > .results-header {
          display: none !important;
        }

        .listing-detail-official-header .forms-site-header .header-actions .btn-outline { order: 1; }
        .listing-detail-official-header .forms-site-header .header-actions .btn-gold { order: 2; }

        @media (min-width: 981px) {
          .listing-detail-official-header .forms-site-header.page-shell {
            width: min(1400px, calc(100% - 24px));
            min-height: 82px;
            height: 82px;
            gap: 16px;
          }

          .listing-detail-official-header .forms-site-header .brand-lockup { flex: 0 0 160px; }
          .listing-detail-official-header .forms-site-header .brand-lockup img { width: 150px; height: 61px; }
          .listing-detail-official-header .forms-site-header .primary-nav { justify-content: center; gap: 42px; }
          .listing-detail-official-header .forms-site-header .header-actions { gap: 10px; transform: none; }

          .listing-detail-official-header .forms-site-header .header-actions .btn {
            height: 33px;
            min-height: 33px;
            border-radius: 5px;
            font-size: 9px;
            font-weight: 900;
            letter-spacing: .02em;
            line-height: 1;
            white-space: nowrap;
            transform-origin: center;
            transition: transform .18s ease, border-color .18s ease, background .18s ease, color .18s ease, box-shadow .18s ease, filter .18s ease;
          }

          .listing-detail-official-header .forms-site-header .header-actions .btn-gold {
            width: 116px;
            min-width: 116px;
            padding: 0 9px;
            border: 1px solid #ffbd2e;
            background: linear-gradient(145deg, #f8b72f 0%, #e99a00 58%, #cf7800 100%);
            box-shadow: inset 0 1px 0 rgba(255, 237, 182, .55), inset 0 -2px 0 rgba(95, 51, 0, .28), 0 5px 12px rgba(0, 0, 0, .27);
            color: #07101a;
          }

          .listing-detail-official-header .forms-site-header .header-actions .btn-outline {
            width: 100px;
            min-width: 100px;
            padding: 0 8px;
            border: 1px solid #e8a000;
            background: linear-gradient(145deg, rgba(7, 22, 34, .96), rgba(1, 8, 15, .98));
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 4px 11px rgba(0, 0, 0, .22);
            color: #f6b21a;
          }

          .listing-detail-official-header .forms-site-header .header-actions .contact-phone { margin-right: 4px; font-size: 10px; }

          .listing-detail-official-header .forms-site-header .header-actions .btn:hover,
          .listing-detail-official-header .forms-site-header .header-actions .btn:focus-visible {
            transform: translateY(-1px) scale(1.03);
            outline: none;
          }

          .listing-detail-official-header .forms-site-header .header-actions .btn-gold:hover,
          .listing-detail-official-header .forms-site-header .header-actions .btn-gold:focus-visible,
          .listing-detail-official-header .forms-site-header .header-actions .btn-outline:hover,
          .listing-detail-official-header .forms-site-header .header-actions .btn-outline:focus-visible {
            border-color: #ffd069;
            background: linear-gradient(145deg, #ffc64a 0%, #f1a600 58%, #dc8500 100%);
            color: #07101a;
            box-shadow: inset 0 1px 0 rgba(255, 247, 218, .7), inset 0 -2px 0 rgba(95, 51, 0, .22), 0 8px 17px rgba(0, 0, 0, .33), 0 0 12px rgba(241, 166, 0, .25);
          }
        }

        @media (min-width: 981px) and (max-width: 1180px) {
          .listing-detail-official-header .forms-site-header .primary-nav { gap: 27px; }
          .listing-detail-official-header .forms-site-header .header-actions .btn-gold { width: 110px; min-width: 110px; }
          .listing-detail-official-header .forms-site-header .header-actions .btn-outline { width: 96px; min-width: 96px; }
        }

        @media (max-width: 980px) {
          .listing-detail-official-header { background: #020b13; }
        }
      `}</style>
      <div className="listing-detail-official-header">
        <FormsSiteHeader />
      </div>
    </>
  );
}
