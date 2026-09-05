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
      <LockedFeaturedBrokerPreview brokerMode="male" />
      <style>{`
        a[aria-label="Florida Liquor License Market home"] {
          position: relative;
          left: -25px;
          top: 8px;
        }
        img[alt="Fictitious male independent listing broker"] {
          content: url("https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85");
          object-fit: cover !important;
          object-position: center 25% !important;
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
      `}</style>
    </>
  );
}
