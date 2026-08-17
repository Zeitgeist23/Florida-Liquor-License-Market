export type QuotaDrawingCounty = {
  county: string;
  licenses: number;
};

export const QUOTA_DRAWING_2026 = {
  year: 2026,
  entryOpens: "August 17, 2026 at 12:00 A.M. EST",
  entryCloses: "September 30, 2026 at 5:00 P.M. EST",
  totalLicenses: 63,
  totalCounties: 30,
  entryFee: 100,
  sourceNoticeUrl:
    "https://www2.myfloridalicense.com/abt/documents/ABT2026QuotaEntryPeriodAnnouncement.pdf",
  dbprHomeUrl:
    "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/",
  quotaInformationUrl:
    "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/quota-license-information/",
  officialFormUrl:
    "https://www2.myfloridalicense.com/abt/documents/ABT6033QuotaLicenseDrawingEntryForm.pdf",
  individualEntryUrl:
    "https://www.myfloridalicense.com/CheckListDetail.asp?XACT_DEFN_ID=17270&clientCode=4087&xactCode=1030",
  businessEntryUrl:
    "https://www.myfloridalicense.com/intentions2.asp?boardid=400&chBoard=true&professionid=4088",
  lastVerified: "August 16, 2026",
  counties: [
    { county: "Alachua", licenses: 1 },
    { county: "Brevard", licenses: 3 },
    { county: "Broward", licenses: 4 },
    { county: "Charlotte", licenses: 2 },
    { county: "Collier", licenses: 1 },
    { county: "Dade", licenses: 5 },
    { county: "Duval", licenses: 3 },
    { county: "Flagler", licenses: 1 },
    { county: "Franklin", licenses: 1 },
    { county: "Hillsborough", licenses: 3 },
    { county: "Jackson", licenses: 1 },
    { county: "Lake", licenses: 3 },
    { county: "Lee", licenses: 2 },
    { county: "Leon", licenses: 1 },
    { county: "Manatee", licenses: 2 },
    { county: "Marion", licenses: 2 },
    { county: "Okaloosa", licenses: 1 },
    { county: "Orange", licenses: 3 },
    { county: "Osceola", licenses: 4 },
    { county: "Palm Beach", licenses: 2 },
    { county: "Pasco", licenses: 2 },
    { county: "Polk", licenses: 5 },
    { county: "Santa Rosa", licenses: 1 },
    { county: "Sarasota", licenses: 1 },
    { county: "St. Johns", licenses: 3 },
    { county: "St. Lucie", licenses: 1 },
    { county: "Sumter", licenses: 1 },
    { county: "Suwannee", licenses: 1 },
    { county: "Volusia", licenses: 2 },
    { county: "Walton", licenses: 1 },
  ] satisfies QuotaDrawingCounty[],
} as const;

export async function getQuotaDrawingSourceStatus() {
  try {
    const response = await fetch(QUOTA_DRAWING_2026.sourceNoticeUrl, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "FloridaLiquorLicenseMarket/1.0" },
    });

    return {
      reachable: response.ok,
      checkedAt: new Date().toISOString(),
      lastModified: response.headers.get("last-modified"),
    };
  } catch {
    return {
      reachable: false,
      checkedAt: new Date().toISOString(),
      lastModified: null,
    };
  }
}
