export type AbtDistrictOffice = {
  name: string;
  addressLines: string[];
  phone: string;
  fax: string;
  officialUrl: string;
};

const officialUrl = "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/contact/";

const offices: Record<string, AbtDistrictOffice> = {
  tallahassee: {
    name: "ABT Licensing District Office – Tallahassee",
    addressLines: ["2601 Blair Stone Road", "Tallahassee, FL 32399-0783"],
    phone: "850-488-4271",
    fax: "850-413-6607",
    officialUrl,
  },
  pensacola: {
    name: "ABT Licensing District Office – Pensacola",
    addressLines: ["James Building, Suite 401", "160 West Government Street", "Pensacola, FL 32502"],
    phone: "850-595-0133",
    fax: "850-595-0001",
    officialUrl,
  },
  gainesville: {
    name: "ABT Licensing District Office – Gainesville",
    addressLines: ["240 NW 76th Drive, Suite B", "Gainesville, FL 32607"],
    phone: "352-333-2515",
    fax: "352-333-2514",
    officialUrl,
  },
  jacksonville: {
    name: "ABT Licensing District Office – Jacksonville",
    addressLines: ["4161 Carmichael Avenue", "3300 Building, Suite 200A", "Jacksonville, FL 32207"],
    phone: "904-727-5552",
    fax: "904-727-5598",
    officialUrl,
  },
  tampa: {
    name: "ABT Licensing District Office – Tampa",
    addressLines: ["1313 Tampa Street", "Park Trammell Building, Suite 909", "Tampa, FL 33602"],
    phone: "813-272-2610",
    fax: "813-233-2896",
    officialUrl,
  },
  orlando: {
    name: "ABT Licensing District Office – Orlando",
    addressLines: ["400 West Robinson Street", "North Tower, Room 709, Hurston Building", "Orlando, FL 32801"],
    phone: "407-245-0785",
    fax: "407-317-7289",
    officialUrl,
  },
  fort_myers: {
    name: "ABT Licensing District Office – Fort Myers",
    addressLines: ["2295 Victoria Avenue, Suite 145", "Fort Myers, FL 33901"],
    phone: "239-344-0885",
    fax: "239-344-0888",
    officialUrl,
  },
  miami: {
    name: "ABT Licensing District Office – Miami",
    addressLines: ["8550 NW 33rd Street, Suite 303", "Doral, FL 33122"],
    phone: "305-470-6787",
    fax: "305-470-5074",
    officialUrl,
  },
  fort_lauderdale: {
    name: "ABT Licensing District Office – Fort Lauderdale",
    addressLines: ["1525 West Cypress Creek Road, 4th Floor", "Fort Lauderdale, FL 33309"],
    phone: "954-917-1350",
    fax: "954-917-1357",
    officialUrl,
  },
  west_palm_beach: {
    name: "ABT Licensing District Office – West Palm Beach",
    addressLines: ["111 South Sapodilla Avenue, Suite 111", "West Palm Beach, FL 33401"],
    phone: "561-650-6872",
    fax: "561-650-6849",
    officialUrl,
  },
};

const countiesByOffice: Record<string, string[]> = {
  tallahassee: ["Bay", "Calhoun", "Franklin", "Gadsden", "Gulf", "Jackson", "Jefferson", "Leon", "Liberty", "Madison", "Taylor", "Wakulla"],
  pensacola: ["Escambia", "Holmes", "Okaloosa", "Santa Rosa", "Walton", "Washington"],
  gainesville: ["Alachua", "Bradford", "Citrus", "Columbia", "Dixie", "Gilchrist", "Hamilton", "Lafayette", "Levy", "Marion", "Sumter", "Suwannee", "Union"],
  jacksonville: ["Baker", "Clay", "Duval", "Nassau", "Putnam", "St. Johns"],
  tampa: ["DeSoto", "Hardee", "Hernando", "Highlands", "Hillsborough", "Pasco", "Pinellas", "Polk"],
  orlando: ["Brevard", "Flagler", "Lake", "Orange", "Osceola", "Seminole", "Volusia"],
  fort_myers: ["Charlotte", "Collier", "Glades", "Hendry", "Lee", "Manatee", "Sarasota"],
  miami: ["Miami-Dade", "Dade", "Monroe"],
  fort_lauderdale: ["Broward"],
  west_palm_beach: ["Indian River", "Martin", "Okeechobee", "Palm Beach", "St. Lucie"],
};

export function getAbtLicensingDistrictOffice(countyValue: string) {
  const county = countyValue.replace(/\s+County$/i, "").trim();
  const officeKey = Object.entries(countiesByOffice).find(([, counties]) =>
    counties.some((candidate) => candidate.toLowerCase() === county.toLowerCase())
  )?.[0];
  return officeKey ? offices[officeKey] : null;
}
