export const ABT_6002_TRANSFER_FEE_SESSION_KEY = "fllm-abt-6002-transfer-fee-session-v1";
export const ABT_6002_TRANSFER_FEE_LOCAL_KEY = "fllm-abt-6002-transfer-fee-handoff-v1";
export const ABT_6002_TRANSFER_FEE_MAX_AGE_MS = 2 * 60 * 60 * 1000;

const MONTH_ABBREVIATIONS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

export type Abt6002TransferFeePayload = {
  version: 1;
  createdAt: string;
  businessName: string;
  licenseNumber: string;
  obtainedDate: string;
  years: string[];
  sales: number[][];
  yearTotals: number[];
  threeYearTotal: number;
  threeYearAverage: number;
  transferFee: number;
};

function finiteNonnegative(value: unknown) {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

export function createAbt6002TransferFeePayload(input: {
  businessName: string;
  licenseNumber: string;
  obtainedDate: string;
  years: string[];
  sales: string[][];
  yearTotals: number[];
  threeYearTotal: number;
  threeYearAverage: number;
  transferFee: number;
}): Abt6002TransferFeePayload {
  return {
    version: 1,
    createdAt: new Date().toISOString(),
    businessName: input.businessName.trim(),
    licenseNumber: input.licenseNumber.trim(),
    obtainedDate: input.obtainedDate,
    years: input.years.slice(0, 3).map((year) => year.trim()),
    sales: input.sales.slice(0, 3).map((year) =>
      year.slice(0, 12).map((value) => finiteNonnegative(value.replace(/[$,\s]/g, "")))
    ),
    yearTotals: input.yearTotals.slice(0, 3).map(finiteNonnegative),
    threeYearTotal: finiteNonnegative(input.threeYearTotal),
    threeYearAverage: finiteNonnegative(input.threeYearAverage),
    transferFee: finiteNonnegative(input.transferFee),
  };
}

export function parseAbt6002TransferFeePayload(raw: string | null) {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<Abt6002TransferFeePayload>;
    if (parsed.version !== 1 || typeof parsed.createdAt !== "string") return null;

    const createdAt = Date.parse(parsed.createdAt);
    if (!Number.isFinite(createdAt) || Date.now() - createdAt > ABT_6002_TRANSFER_FEE_MAX_AGE_MS) {
      return null;
    }

    if (!Array.isArray(parsed.years) || parsed.years.length !== 3) return null;
    if (!Array.isArray(parsed.sales) || parsed.sales.length !== 3) return null;
    if (parsed.sales.some((year) => !Array.isArray(year) || year.length !== 12)) return null;

    return {
      version: 1,
      createdAt: parsed.createdAt,
      businessName: typeof parsed.businessName === "string" ? parsed.businessName : "",
      licenseNumber: typeof parsed.licenseNumber === "string" ? parsed.licenseNumber : "",
      obtainedDate: typeof parsed.obtainedDate === "string" ? parsed.obtainedDate : "",
      years: parsed.years.map((year) => String(year)),
      sales: parsed.sales.map((year) => year.map(finiteNonnegative)),
      yearTotals: Array.isArray(parsed.yearTotals)
        ? parsed.yearTotals.slice(0, 3).map(finiteNonnegative)
        : [0, 0, 0],
      threeYearTotal: finiteNonnegative(parsed.threeYearTotal),
      threeYearAverage: finiteNonnegative(parsed.threeYearAverage),
      transferFee: finiteNonnegative(parsed.transferFee),
    } satisfies Abt6002TransferFeePayload;
  } catch {
    return null;
  }
}

function pdfNumber(value: number) {
  return value > 0 ? value.toFixed(2) : "";
}

function pdfDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return match ? `${match[2]}/${match[3]}/${match[1]}` : value;
}

export function getAbt6002TransferFeeFieldValues(payload: Abt6002TransferFeePayload) {
  const values: Record<string, string> = {
    "Business Name DBA_13": payload.businessName,
    "License Number_3": payload.licenseNumber,
    "Date Seller Obtained License": pdfDate(payload.obtainedDate),
    "undefined_22": pdfNumber(payload.yearTotals[0] || 0),
    "undefined_23": pdfNumber(payload.yearTotals[1] || 0),
    "undefined_24": pdfNumber(payload.yearTotals[2] || 0),
    "undefined_25": pdfNumber(payload.threeYearTotal),
    "divided by 3": pdfNumber(payload.threeYearAverage),
    X004: pdfNumber(payload.transferFee),
  };

  const yearFieldPrefixes = ["FIRST YEAR", "SECOND YEAR", "THIRD YEAR"];
  const salesFieldSuffixes = ["", "_2", "_3"];

  for (let yearIndex = 0; yearIndex < 3; yearIndex += 1) {
    for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
      const row = monthIndex + 1;
      values[`${yearFieldPrefixes[yearIndex]}Row${row}`] =
        `${MONTH_ABBREVIATIONS[monthIndex]} ${payload.years[yearIndex] || ""}`.trim();
      values[`AMOUNT OF SALESRow${row}${salesFieldSuffixes[yearIndex]}`] =
        pdfNumber(payload.sales[yearIndex][monthIndex] || 0);
    }
  }

  return values;
}
