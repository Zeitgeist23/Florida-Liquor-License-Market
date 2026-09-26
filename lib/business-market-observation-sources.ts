import "server-only";

export type BusinessMarketObservationSource = {
  listingReference: string;
  platform: "BizBuySell" | "BizQuest";
  sourceId: string;
  sourceUrl: string;
  observedAt: string;
};

export const businessMarketObservationSources: BusinessMarketObservationSource[] = [
  {
    listingReference: "FLLM-MKT-001",
    platform: "BizBuySell",
    sourceId: "2540627",
    sourceUrl: "https://www.bizbuysell.com/business-opportunity/owner-retiring-for-sale-martin-county-pub-4cop/2540627/",
    observedAt: "2026-09-25",
  },
  {
    listingReference: "FLLM-MKT-002",
    platform: "BizBuySell",
    sourceId: "2463925",
    sourceUrl: "https://www.bizbuysell.com/business-opportunity/sarasota-bar-with-4cop-quota-license/2463925/",
    observedAt: "2026-09-25",
  },
  {
    listingReference: "FLLM-MKT-003",
    platform: "BizQuest",
    sourceId: "2199972",
    sourceUrl: "https://www.bizquest.com/business-for-sale/100-absentee-operated-bar-4cop/BW2199972/",
    observedAt: "2026-09-25",
  },
  {
    listingReference: "FLLM-MKT-004",
    platform: "BizQuest",
    sourceId: "2458880",
    sourceUrl: "https://www.bizquest.com/asset-sales/turnkey-full-service-restaurant-4cop-sfs-license/BW2458880/",
    observedAt: "2026-09-25",
  },
  {
    listingReference: "FLLM-MKT-005",
    platform: "BizQuest",
    sourceId: "2363404",
    sourceUrl: "https://www.bizquest.com/business-for-sale/italian-restaurant-with-full-liquor-license-prime-viera-location/BW2363404/",
    observedAt: "2026-09-25",
  },
  {
    listingReference: "FLLM-MKT-006",
    platform: "BizQuest",
    sourceId: "2462353",
    sourceUrl: "https://www.bizquest.com/asset-sales/asset-opportunity-downtown-sarasota-restaurant-with-4cop-sfs-license/BW2462353/",
    observedAt: "2026-09-25",
  },
];
