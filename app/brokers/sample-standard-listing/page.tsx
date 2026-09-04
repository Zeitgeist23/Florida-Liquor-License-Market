import type { Metadata } from "next";
import SampleBrokerListingDetail from "@/components/SampleBrokerListingDetail";

export const metadata: Metadata = {
  title: "Sample Standard Broker Listing | FLLM",
  description: "Fictitious Standard broker listing detail-page example for Florida Liquor License Market.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SampleBrokerListingDetail featured={false} />;
}
