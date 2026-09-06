import type { Metadata } from "next";
import SampleBrokerListingDetail from "@/components/SampleBrokerListingDetail";

export const metadata: Metadata = {
  title: "Sample Standard Broker Listing | FLLM",
  description: "Fictitious Standard broker listing detail-page example for Florida Liquor License Market.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <SampleBrokerListingDetail featured={false} />
      <style>{`
        [data-standard-preview] {
          padding: 0 !important;
          background: #02090f !important;
        }
        [data-standard-preview] > div {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }
      `}</style>
    </>
  );
}
