import "server-only";

export const DBPR_RETAIL_LICENSE_CSV =
  "https://www2.myfloridalicense.com/sto/file_download/extracts/bd4006lic.csv";

export const dbprCountyNames: Record<string, string> = {
  "11": "Alachua", "12": "Baker", "13": "Bay", "14": "Bradford", "15": "Brevard",
  "16": "Broward", "17": "Calhoun", "18": "Charlotte", "19": "Citrus", "20": "Clay",
  "21": "Collier", "22": "Columbia", "23": "Miami-Dade", "24": "DeSoto", "25": "Dixie",
  "26": "Duval", "27": "Escambia", "28": "Flagler", "29": "Franklin", "30": "Gadsden",
  "31": "Gilchrist", "32": "Glades", "33": "Gulf", "34": "Hamilton", "35": "Hardee",
  "36": "Hendry", "37": "Hernando", "38": "Highlands", "39": "Hillsborough",
  "40": "Holmes", "41": "Indian River", "42": "Jackson", "43": "Jefferson",
  "44": "Lafayette", "45": "Lake", "46": "Lee", "47": "Leon", "48": "Levy",
  "49": "Liberty", "50": "Madison", "51": "Manatee", "52": "Marion", "53": "Martin",
  "54": "Monroe", "55": "Nassau", "56": "Okaloosa", "57": "Okeechobee",
  "58": "Orange", "59": "Osceola", "60": "Palm Beach", "61": "Pasco", "62": "Pinellas",
  "63": "Polk", "64": "Putnam", "65": "St. Johns", "66": "St. Lucie",
  "67": "Santa Rosa", "68": "Sarasota", "69": "Seminole", "70": "Sumter",
  "71": "Suwannee", "72": "Taylor", "73": "Union", "74": "Volusia", "75": "Wakulla",
  "76": "Walton", "77": "Washington",
};

const countyBands: Array<{
  codes: Set<string>;
  label: string;
  fees: Record<string, [number, number]>;
}> = [
  {
    codes: new Set(["11", "13", "15", "16", "18", "19", "20", "21", "23", "26", "27", "28", "37", "38", "39", "41", "45", "46", "47", "51", "52", "53", "55", "56", "58", "59", "60", "61", "62", "63", "65", "66", "67", "68", "69", "70", "74"]),
    label: "Population over 100,000",
    fees: {
      "1APS": [140, 70], "1COP": [280, 140], "2APS": [196, 98],
      "2COP": [392, 196], "4COP": [1820, 910], "3PS": [1365, 682.5],
    },
  },
  {
    codes: new Set(["54", "64", "76"]),
    label: "Population over 75,000 and not over 100,000",
    fees: {
      "1APS": [112, 56], "1COP": [224, 112], "2APS": [168, 84],
      "2COP": [336, 168], "5COP": [1560, 780], "3APS": [1170, 585],
    },
  },
  {
    codes: new Set(["22"]),
    label: "Population over 50,000 and not over 75,000",
    fees: {
      "1APS": [84, 42], "1COP": [168, 84], "2APS": [140, 70],
      "2COP": [280, 140], "6COP": [1300, 650], "3BPS": [975, 487.5],
    },
  },
  {
    codes: new Set(["12", "14", "24", "30", "35", "36", "42", "48", "57", "71", "75", "77"]),
    label: "Population of 25,000 and not over 50,000",
    fees: {
      "1APS": [56, 28], "1COP": [112, 56], "2APS": [112, 56],
      "2COP": [224, 112], "7COP": [858, 429], "3CPS": [643.5, 321.75],
    },
  },
  {
    codes: new Set(["17", "25", "29", "31", "32", "33", "34", "40", "43", "44", "49", "50", "72", "73"]),
    label: "Population less than 25,000",
    fees: {
      "1APS": [28, 14], "1COP": [56, 28], "2APS": [84, 42],
      "2COP": [168, 84], "8COP": [624, 312], "3DPS": [468, 234],
    },
  },
];

const statewideFees: Record<string, number | null> = {
  KLD: 4000, ERB: 4000, JDBW: 1250, CMB: 3000, AMW: 1000, CMBP: 500,
  DD: 4000, "DD (CD)": 1000, "IMP/BSA": 500, "12RT": 675, RTS: 2500,
  "11C": 400, CG: 400, "11CX": 100, "11CS": 1750, "11AL": 500,
  "11CG-PC": 400, "11PA": 400, "11PA(S)": 400, GC: 100, "ODP/SSL": 25,
  "13CT": 1820, "13 CT": 1820, CEP: 1820, "14BC": 500, SCX: 250,
  CDA: 100, TWD: 25, EVNT: 1820, CIMP: 100, "CWD/EXP": 100, CMFG: 100,
  RTPD: 50, RNPD: 0, "M-EXP": 0,
};

const primaryStatuses: Record<string, string> = {
  "20": "Current", "21": "Temporary certificate", "22": "Transfer approved",
  "30": "Current with probation", "31": "Current with obligations",
  "32": "Current conditional", "41": "Escrow", "42": "Suspended",
  "45": "Delinquent", "46": "Voluntarily relinquished", "60": "Null and void",
  "61": "Revoked", "90": "Conversion",
};

const secondaryStatuses: Record<string, string> = {
  "10": "Inactive", "20": "Active", "21": "Pending litigation", "30": "Tax flag",
  "35": "Transfer pending", "37": "Pending payment", "39": "Administrative hold",
};

export type LicenseFeeLookupResult = {
  licenseNumber: string;
  ownerName: string;
  dba: string;
  series: string;
  modifier: string;
  countyCode: string;
  county: string;
  city: string;
  primaryStatus: string;
  secondaryStatus: string;
  expirationDate: string;
  populationBand: string | null;
  annualFee: number | null;
  halfYearFee: number | null;
  feeNote: string;
  sourceUpdated: string;
};

function normalizeLicenseNumber(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function parseDbprCsvRow(line: string) {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += char;
    }
  }
  cells.push(cell.replace(/\r$/, ""));
  return cells;
}

function feeFor(seriesValue: string, modifier: string, countyCode: string) {
  const series = seriesValue.trim().toUpperCase();
  const band = countyBands.find((candidate) => candidate.codes.has(countyCode));
  const countyFee = band?.fees[series];
  if (countyFee) {
    return {
      populationBand: band?.label ?? null,
      annualFee: countyFee[0],
      halfYearFee: countyFee[1],
      feeNote: "Published county-population fee, including the charted surcharge where applicable.",
    };
  }

  if (series === "3M" && /THEME/i.test(modifier)) {
    return {
      populationBand: null,
      annualFee: null,
      halfYearFee: null,
      feeNote: "ABT publishes multiple 3M theme-park fees. DBPR must determine the applicable amount.",
    };
  }

  const annualFee = statewideFees[series];
  if (annualFee !== undefined) {
    return {
      populationBand: null,
      annualFee,
      halfYearFee: null,
      feeNote: "Published statewide or special-classification annual fee.",
    };
  }

  return {
    populationBand: band?.label ?? null,
    annualFee: null,
    halfYearFee: null,
    feeNote: "This classification does not have a single determinable amount in the published chart. Confirm the amount with DBPR.",
  };
}

export async function lookupFloridaRetailLicense(rawLicenseNumber: string) {
  const licenseNumber = normalizeLicenseNumber(rawLicenseNumber);
  if (licenseNumber.length < 5 || licenseNumber.length > 20) {
    throw new Error("Enter a valid Florida DBPR license number.");
  }

  const response = await fetch(DBPR_RETAIL_LICENSE_CSV, {
    next: { revalidate: 60 * 60 * 12 },
  });
  if (!response.ok) {
    throw new Error("DBPR license data is temporarily unavailable.");
  }
  const csv = await response.text();
  const matchingLine = csv
    .split(/\n/)
    .find((line) => line.includes(`"${licenseNumber}"`));
  if (!matchingLine) return null;

  const row = parseDbprCsvRow(matchingLine);
  const series = row[3]?.trim() || "";
  const modifier = row[4]?.trim() || "";
  const countyCode = row[19]?.trim() || row[11]?.trim() || "";
  const fee = feeFor(series, modifier, countyCode);

  return {
    licenseNumber: row[20]?.trim() || licenseNumber,
    ownerName: row[2]?.trim() || "Not listed",
    dba: row[12]?.trim() || "Not listed",
    series,
    modifier,
    countyCode,
    county: dbprCountyNames[countyCode] || `County code ${countyCode}`,
    city: row[16]?.trim() || "",
    primaryStatus: primaryStatuses[row[21]?.trim()] || row[21]?.trim() || "Not listed",
    secondaryStatus: secondaryStatuses[row[22]?.trim()] || row[22]?.trim() || "Not listed",
    expirationDate: row[25]?.trim() || "",
    ...fee,
    sourceUpdated: new Date().toISOString(),
  } satisfies LicenseFeeLookupResult;
}

export function reminderDateForExpiration(expirationDate: string, now = new Date()) {
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(expirationDate);
  if (!match) throw new Error("DBPR did not provide a usable expiration date for this license.");
  const month = Number(match[1]);
  const day = Number(match[2]);
  let year = Number(match[3]);
  const nextCalendarYear = now.getUTCFullYear() + 1;
  while (year < nextCalendarYear) year += 1;
  let expiration = new Date(Date.UTC(year, month - 1, day, 12));
  let reminder = new Date(expiration);
  reminder.setUTCDate(reminder.getUTCDate() - 30);
  while (reminder <= now) {
    year += 1;
    expiration = new Date(Date.UTC(year, month - 1, day, 12));
    reminder = new Date(expiration);
    reminder.setUTCDate(reminder.getUTCDate() - 30);
  }
  return {
    expirationDate: expiration.toISOString().slice(0, 10),
    reminderDate: reminder.toISOString().slice(0, 10),
  };
}
