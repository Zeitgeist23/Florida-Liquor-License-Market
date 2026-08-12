import type { Listing } from "./listings";

const brokerNote = "External broker listing. Availability and price subject to confirmation. BizBuySell Ad #2525389; seller reports the license is in escrow and available for immediate transfer.";

export const marketAdditions: Listing[] = [
  {
    county: "Palm Beach County",
    type: "4COP Quota",
    price: 214999,
    priceLabel: "$214,999",
    sourceRef: "FLLM-BBS-2525389",
    sourceName: "BizBuySell",
    sourceUrl: "https://www.bizbuysell.com/business-asset/palm-beach-county-florida-quota-4cop-liquor-license/2525389/",
    note: brokerNote,
    image: "/assets/listing-palm-beach.png",
  },
];
