export type Listing = {
  county: string;
  type: "4COP Quota" | "3PS Quota / Package Store";
  price: number | null;
  priceLabel: string;
  sourceRef?: string;
  sourceName?: string;
  sourceUrl?: string;
  note?: string;
  image: string;
};

export const listings: Listing[] = [
  { county: "Broward County", type: "4COP Quota", price: 240000, priceLabel: "$240,000", sourceRef: "FLLM-001", image: "/assets/inventory/01.png" },
  { county: "Sarasota County", type: "4COP Quota", price: 540000, priceLabel: "$540,000", sourceRef: "FLLM-002", image: "/assets/license-market/license-01.png" },
  { county: "Miami-Dade County", type: "4COP Quota", price: 495000, priceLabel: "$495,000", image: "/assets/license-market/license-02.png" },
  { county: "Pinellas County", type: "4COP Quota", price: 525000, priceLabel: "$525,000", sourceRef: "FLLM-003", image: "/assets/inventory/04.png" },
  { county: "Collier County", type: "4COP Quota", price: 500000, priceLabel: "$500,000", sourceRef: "FLLM-004", image: "/assets/license-market/license-03.png" },
  { county: "Palm Beach County", type: "4COP Quota", price: 575000, priceLabel: "$575,000", image: "/assets/license-market/license-04.png" },
  { county: "Orange County", type: "4COP Quota", price: 515000, priceLabel: "$515,000", sourceRef: "FLLM-005", image: "/assets/inventory/07.png" },
  { county: "Monroe County", type: "4COP Quota", price: 1200000, priceLabel: "$1,200,000", sourceRef: "FLLM-006", image: "/assets/license-market/license-05.png" },
  { county: "Hillsborough County", type: "4COP Quota", price: 250000, priceLabel: "$250,000", sourceRef: "FLLM-007", image: "/assets/license-market/license-06.png" },
  { county: "Sarasota County", type: "3PS Quota / Package Store", price: 340000, priceLabel: "$340,000", image: "/assets/inventory/10.png" },
  { county: "DeSoto County", type: "4COP Quota", price: 110000, priceLabel: "$110,000", sourceRef: "FLLM-008", image: "/assets/license-market/license-07.png" },
  { county: "Seminole County", type: "4COP Quota", price: 250000, priceLabel: "$250,000", sourceRef: "FLLM-009", image: "/assets/license-market/license-08.png" },
  { county: "Charlotte County", type: "4COP Quota", price: 425000, priceLabel: "$425,000", sourceRef: "FLLM-010", image: "/assets/inventory/13.png" },
  { county: "Lee County", type: "4COP Quota", price: 425000, priceLabel: "$425,000", image: "/assets/license-market/license-09.png" },
  { county: "St. Lucie County", type: "4COP Quota", price: 294995, priceLabel: "$294,995", sourceRef: "FLLM-011", image: "/assets/license-market/license-10.png" },
  { county: "Leon County", type: "4COP Quota", price: 850000, priceLabel: "$850,000", sourceRef: "FLLM-012", image: "/assets/inventory/16.png" },
  { county: "Bay County", type: "4COP Quota", price: 505000, priceLabel: "$505,000", sourceRef: "FLLM-013", image: "/assets/license-market/license-11.png" },
  { county: "St. Johns County", type: "4COP Quota", price: 425000, priceLabel: "$425,000", image: "/assets/license-market/license-12.png" },
  { county: "Pasco County", type: "4COP Quota", price: 315000, priceLabel: "$315,000", sourceRef: "FLLM-014", image: "/assets/inventory/19.png" },
  { county: "Pasco County", type: "4COP Quota", price: 325000, priceLabel: "$325,000", sourceRef: "FLLM-015", image: "/assets/license-market/license-13.png" },
  { county: "Volusia County", type: "4COP Quota", price: 599000, priceLabel: "$599,000", sourceRef: "FLLM-016", image: "/assets/license-market/license-14.png" },
  { county: "Martin County", type: "4COP Quota", price: 600000, priceLabel: "$600,000", sourceRef: "FLLM-017", image: "/assets/inventory/22.png" },
  { county: "St. Lucie County", type: "4COP Quota", price: 300000, priceLabel: "$300,000", sourceRef: "FLLM-018", image: "/assets/license-market/license-15.png" },
  { county: "Hillsborough County", type: "4COP Quota", price: 245000, priceLabel: "$245,000", sourceRef: "FLLM-019", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/hillsborough-county-4cop-quota-liquor-license-for-sale/2479770/", image: "/assets/listing-lee.png" },
  { county: "Lake County", type: "4COP Quota", price: 275000, priceLabel: "$275,000", sourceRef: "FLLM-020", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/4cop-quota-liquor-license-lake-county-florida/2463053/", image: "/assets/listing-palm-beach.png" },
  { county: "Pasco County", type: "4COP Quota", price: 325000, priceLabel: "$325,000", sourceRef: "FLLM-021", sourceName: "BusinessesForSale", sourceUrl: "https://us.businessesforsale.com/us/pasco-county-4cop-quota-liquor-license.aspx", image: "/assets/listing-miami.png" },
  { county: "Escambia County", type: "4COP Quota", price: 575000, priceLabel: "$575,000", sourceRef: "FLLM-022", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/4cop-quota-liquor-license/2480306/", image: "/assets/listing-sarasota.png" },
  { county: "St. Lucie County", type: "4COP Quota", price: 275000, priceLabel: "$275,000", sourceRef: "FLLM-023", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/st-lucie-county-4cop-3ps-quota-liquor-license-for-sale/2464222/", image: "/assets/listing-lee.png" },
  { county: "Osceola County", type: "4COP Quota", price: null, priceLabel: "Price Undisclosed", sourceRef: "FLLM-024", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/hard-to-find-osceola-county-4cop-3ps-quota-liquor-license-for-sale/2171872/", image: "/assets/listing-miami.png" },
  { county: "Santa Rosa County", type: "4COP Quota", price: 929000, priceLabel: "$929,000", sourceRef: "FLLM-025", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/santa-rosa-quota-liquor-license-3ps-or-4cop/2308270/", image: "/assets/listing-sarasota.png" },
  { county: "Santa Rosa County", type: "4COP Quota", price: 630000, priceLabel: "$630,000", sourceRef: "FLLM-026", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/santa-rosa-county-4cop-3ps-quota-license-for-sale/2361280/", image: "/assets/listing-sarasota.png" },
  { county: "Duval County", type: "4COP Quota", price: 710000, priceLabel: "$710,000", sourceRef: "FLLM-027", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/4cop-quota-license-710-000-duval-county/2045722/", image: "/assets/listing-lee.png" },
  { county: "Duval County", type: "4COP Quota", price: 659000, priceLabel: "$659,000", sourceRef: "FLLM-028", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/duval-county-3ps-4cop-quota-liquor-license-for-sale/2518985/", image: "/assets/listing-lee.png" },
  { county: "Miami-Dade County", type: "4COP Quota", price: 195000, priceLabel: "$195,000", sourceRef: "FLLM-029", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/miami-dade-county-4cop-3ps-quota-license-for-sale/2310388/", image: "/assets/listing-miami.png" },
  { county: "Palm Beach County", type: "4COP Quota", price: 225000, priceLabel: "$225,000", sourceRef: "FLLM-030", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/price-reduced-palm-beach-county-liquor-license-for-sale-225-000/2421413/", image: "/assets/listing-palm-beach.png" },
  { county: "Orange County", type: "4COP Quota", price: 550000, priceLabel: "$550,000", sourceRef: "FLLM-031", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/orange-county-full-quota-liquor-license-3ps-4cop/2474326/", image: "/assets/listing-miami.png" },
  { county: "Orange County", type: "4COP Quota", price: 499000, priceLabel: "$499,000", sourceRef: "FLLM-032", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/orange-county-4cop-3ps-quota-liquor-license-for-sale/2293920/", image: "/assets/listing-miami.png" },
  { county: "Hillsborough County", type: "4COP Quota", price: 210000, priceLabel: "$210,000", sourceRef: "FLLM-033", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/hillsborough-county-4cop-3ps-quota-liquor-license-for-sale/2268177/", image: "/assets/listing-lee.png" },
  { county: "Broward County", type: "4COP Quota", price: 215000, priceLabel: "$215,000", sourceRef: "FLLM-034", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/broward-county-4cop-3ps-quota-liquor-license-for-sale/2268168/", image: "/assets/listing-palm-beach.png" },
  { county: "Escambia County", type: "4COP Quota", price: 395000, priceLabel: "$395,000", sourceRef: "FLLM-035", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/escambia-county-quota-liquor-license-now-available/2474361/", image: "/assets/listing-sarasota.png" },
  { county: "Lake County", type: "4COP Quota", price: 200000, priceLabel: "$200,000", sourceRef: "FLLM-036", sourceName: "BizBuySell", sourceUrl: "https://www.bizbuysell.com/business-asset/price-reduced-lake-county-4cop-quota-liquor-license-200-000-cash-price/2421414/", image: "/assets/listing-palm-beach.png" },
  { county: "Pinellas County", type: "4COP Quota", price: 505000, priceLabel: "$505,000", sourceRef: "FLLM-037", sourceName: "BizBuySell — Four-License Portfolio", sourceUrl: "https://www.bizbuysell.com/business-asset/4cop-quota-licenses-for-sale-throughout-florida/2356535/", note: "Four-license portfolio; primary availability in Pinellas, Hillsborough, and Sarasota counties. Price and availability subject to confirmation.", image: "/assets/listing-miami.png" },
  { county: "Polk County", type: "4COP Quota", price: 200000, priceLabel: "$200,000", sourceRef: "FLLM-038", sourceName: "Liquor License Auctioneers", sourceUrl: "https://liquorlicenseauctioneers.com/liquor-license/4cop3ps-polk-a8006", image: "/assets/listing-lee.png" },
  { county: "Polk County", type: "4COP Quota", price: 245000, priceLabel: "$245,000", sourceRef: "FLLM-039", sourceName: "Liquor License Auctioneers", sourceUrl: "https://liquorlicenseauctioneers.com/liquor-license/4cop3ps-polk-a3701", image: "/assets/listing-palm-beach.png" },
  { county: "Polk County", type: "4COP Quota", price: 209000, priceLabel: "$209,000", sourceRef: "FLLM-040", sourceName: "Liquor License Auctioneers", sourceUrl: "https://liquorlicenseauctioneers.com/liquor-license/4cop3ps-polk-a7926", image: "/assets/listing-miami.png" },
  { county: "Manatee County", type: "4COP Quota", price: 525000, priceLabel: "$525,000", sourceRef: "FLLM-041", sourceName: "Liquor License Auctioneers", sourceUrl: "https://liquorlicenseauctioneers.com/liquor-license/4cop3ps-manatee-a8031", image: "/assets/listing-sarasota.png" },
  { county: "Marion County", type: "4COP Quota", price: 290000, priceLabel: "$290,000", sourceRef: "FLLM-042", sourceName: "Liquor License Auctioneers", sourceUrl: "https://liquorlicenseauctioneers.com/liquor-license/4cop3ps-marion-a7914", image: "/assets/listing-lee.png" },
  { county: "Brevard County", type: "4COP Quota", price: null, priceLabel: "Price Undisclosed", sourceRef: "FLLM-043", sourceName: "Florida Liquor License Sales", sourceUrl: "https://www.floridaliquorlicensesales.com/florida/brevard", image: "/assets/listing-palm-beach.png" },
  { county: "Alachua County", type: "4COP Quota", price: 315000, priceLabel: "$315,000", sourceRef: "FLLM-044", sourceName: "LiquorLicense.com", sourceUrl: "https://www.liquorlicense.com/florida/counties/alachua/types/4cop-3ps", note: "External broker listing. Price and availability subject to confirmation.", image: "/assets/listing-miami.png" },
  { county: "Bay County", type: "4COP Quota", price: 615000, priceLabel: "$615,000", sourceRef: "FLLM-045", sourceName: "LiquorLicense.com", sourceUrl: "https://www.liquorlicense.com/florida/counties/bay/types/4cop-3ps", note: "External broker listing. Price and availability subject to confirmation.", image: "/assets/listing-sarasota.png" },
  { county: "Brevard County", type: "4COP Quota", price: 430000, priceLabel: "$430,000", sourceRef: "FLLM-046", sourceName: "LiquorLicense.com", sourceUrl: "https://www.liquorlicense.com/florida/counties/brevard/types/4cop-3ps", note: "External broker listing. Price and availability subject to confirmation.", image: "/assets/listing-palm-beach.png" },
  { county: "Citrus County", type: "4COP Quota", price: 295000, priceLabel: "$295,000", sourceRef: "FLLM-047", sourceName: "LiquorLicense.com", sourceUrl: "https://www.liquorlicense.com/florida/counties/citrus/types/4cop-3ps", note: "External broker listing. Price and availability subject to confirmation.", image: "/assets/listing-lee.png" },
  { county: "Lee County", type: "4COP Quota", price: 410000, priceLabel: "$410,000", sourceRef: "FLLM-048", sourceName: "LiquorLicense.com", sourceUrl: "https://www.liquorlicense.com/florida/counties/lee/types/4cop-3ps", note: "External broker listing. Price and availability subject to confirmation.", image: "/assets/listing-miami.png" },
  { county: "Manatee County", type: "4COP Quota", price: 550000, priceLabel: "$550,000", sourceRef: "FLLM-049", sourceName: "LiquorLicense.com", sourceUrl: "https://www.liquorlicense.com/florida/counties/manatee/types/4cop-3ps", note: "External broker listing. Price and availability subject to confirmation.", image: "/assets/listing-sarasota.png" },
];

export const availableListings = listings.filter((listing) => Boolean(listing.sourceRef));
export const soldListings = listings.filter((listing) => !listing.sourceRef);
