import type { ReactNode } from "react";

import NewsMarketInsightsVideoFix from "@/components/news/NewsMarketInsightsVideoFix";

export default function FloridaLiquorLicenseNewsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <NewsMarketInsightsVideoFix />
    </>
  );
}
