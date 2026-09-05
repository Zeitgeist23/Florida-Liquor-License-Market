import type { Metadata } from "next";
import LockedFeaturedBrokerPreview from "@/components/LockedFeaturedBrokerPreview";

export const metadata: Metadata = {
  title: "Sample Featured Broker Listing | FLLM",
  description: "Fictitious Featured broker listing detail-page example for Florida Liquor License Market.",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams?: Promise<{ broker?: string }> | { broker?: string };
};

export default async function Page({ searchParams }: PageProps) {
  const params = await Promise.resolve(searchParams ?? {});
  const brokerMode = params.broker === "male" ? "male" : "female";

  return (
    <>
      <LockedFeaturedBrokerPreview brokerMode={brokerMode} />
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
      `}</style>
    </>
  );
}
