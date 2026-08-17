import currentDrawing from "./quota-drawing-current.json";

export type QuotaDrawingCounty = {
  county: string;
  licenses: number;
};

export const QUOTA_DRAWING_2026 = {
  year: currentDrawing.year,
  entryOpens: currentDrawing.entryOpens,
  entryCloses: currentDrawing.entryCloses,
  totalLicenses: currentDrawing.totalLicenses,
  totalCounties: currentDrawing.totalCounties,
  entryFee: currentDrawing.entryFee,
  sourceNoticeUrl: currentDrawing.sourceNoticeUrl,
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
  lastVerified: currentDrawing.lastVerified,
  counties: currentDrawing.counties as QuotaDrawingCounty[],
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
