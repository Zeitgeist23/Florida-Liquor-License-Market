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
      <LockedFeaturedBrokerPreview />
      <style>{`
        img[src*="county-map?county=St%20Lucie%20County"] {
          transform: scale(1.55);
          transform-origin: center center;
          clip-path: inset(17.75% 17.75% 17.75% 17.75%);
        }
        div:has(> div > img[src*="county-map?county=St%20Lucie%20County"]) {
          align-self: start !important;
        }
      `}</style>
    </>
  );
}
