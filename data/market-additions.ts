import type { Listing } from "./listings";

const palmBeachBrokerNote = "External broker listing. Availability and price subject to confirmation. BizBuySell Ad #2525389; seller reports the license is in escrow and available for immediate transfer.";
const okaloosaBrokerNote = "External broker listing. Availability and price subject to confirmation. BizBuySell Ad #2422746; seller financing is advertised as available.";

export const marketAdditions: Listing[] = [
  {
    county: "Palm Beach County",
    type: "4COP Quota",
    price: 214999,
    priceLabel: "$214,999",
    sourceRef: "FLLM-BBS-2525389",
    sourceName: "BizBuySell",
    sourceUrl: "https://www.bizbuysell.com/business-asset/palm-beach-county-florida-quota-4cop-liquor-license/2525389/",
    note: palmBeachBrokerNote,
    image: "/assets/listing-palm-beach.png",
  },
  {
    county: "Okaloosa County",
    type: "4COP Quota",
    price: 450000,
    priceLabel: "$450,000",
    sourceRef: "FLLM-BBS-2422746",
    sourceName: "BizBuySell",
    sourceUrl: "https://www.bizbuysell.com/business-asset/okaloosa-county-license-for-sale-450000/2422746/",
    note: okaloosaBrokerNote,
    image: "/assets/listing-sarasota.png",
  },
];
