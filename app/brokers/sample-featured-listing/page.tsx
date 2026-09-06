import type { Metadata } from "next";
import LockedFeaturedBrokerPreview from "@/components/LockedFeaturedBrokerPreview";

export const metadata: Metadata = {
  title: "Sample Featured Broker Listing | FLLM",
  description: "Fictitious Featured broker listing detail-page example for Florida Liquor License Market.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <LockedFeaturedBrokerPreview brokerMode="female" />
      <style>{`
        a[aria-label="Florida Liquor License Market home"] {
          position: relative;
          left: -25px;
          top: 8px;
        }
        img[src*="county-map?county=St%20Lucie%20County"] {
          transform: scale(1.55);
          transform-origin: center center;
          clip-path: inset(17.75% 17.75% 17.75% 17.75%);
        }
        [class*="countyCard"] {
          align-self: start !important;
          height: fit-content !important;
          min-height: 0 !important;
        }
        @media (max-width: 800px) {
          header[class*="header"] {
            min-height: 96px !important;
            height: auto !important;
            padding: 12px 18px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-direction: column !important;
            gap: 0 !important;
          }
          a[aria-label="Florida Liquor License Market home"] {
            position: static !important;
            left: auto !important;
            top: auto !important;
            width: 65% !important;
            max-width: 300px !important;
            margin: 0 auto !important;
            justify-content: center !important;
          }
          a[aria-label="Florida Liquor License Market home"] img {
            width: 100% !important;
            max-height: 72px !important;
            height: auto !important;
            object-fit: contain !important;
          }
          header[class*="header"] nav {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
