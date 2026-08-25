export type HistoricalAskingPriceObservation = {
  id: string;
  county: string;
  licenseType: "4COP/3PS Quota";
  listedDate: string;
  askingPrice: number;
  sourceName: string;
  sourceUrl: string;
  note: string;
};

const historicalAskingPriceObservations: HistoricalAskingPriceObservation[] = [
  {
    id: "STJ-2025-02-23-680",
    county: "St. Johns County",
    licenseType: "4COP/3PS Quota",
    listedDate: "2025-02-23",
    askingPrice: 680000,
    sourceName: "Liquor License Marketplace",
    sourceUrl: "https://liquorlicensemarketplace.com/liquor-license/st-johns-florida-4cop-3ps-liquor-license/",
    note: "Historical advertisement. The public page did not disclose a license number or a verified closing price.",
  },
  {
    id: "STJ-2025-06-03-727",
    county: "St. Johns County",
    licenseType: "4COP/3PS Quota",
    listedDate: "2025-06-03",
    askingPrice: 727000,
    sourceName: "Liquor License Marketplace",
    sourceUrl: "https://liquorlicensemarketplace.com/liquor-license/st-johns-florida-4cop-3ps-liquor-license-3/",
    note: "Historical advertisement. The public page did not disclose a license number or a verified closing price.",
  },
  {
    id: "STJ-2025-10-17-690",
    county: "St. Johns County",
    licenseType: "4COP/3PS Quota",
    listedDate: "2025-10-17",
    askingPrice: 690000,
    sourceName: "Liquor License Marketplace",
    sourceUrl: "https://liquorlicensemarketplace.com/liquor-license/st-johns-florida-4cop-3ps-liquor-license-2/",
    note: "Historical advertisement. The public page did not disclose a license number or a verified closing price.",
  },
];

export function getHistoricalAskingPricesByCounty(county: string) {
  return historicalAskingPriceObservations
    .filter((observation) => observation.county === county)
    .sort((left, right) => left.listedDate.localeCompare(right.listedDate));
}
