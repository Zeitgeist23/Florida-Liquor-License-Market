import type { Listing } from "@/data/listings";

export type ParsedLicenseCandidate = {
  county: string | null;
  type: Listing["type"] | null;
  price: number | null;
  hasLicenseLanguage: boolean;
  hasSaleIntent: boolean;
  unavailable: boolean;
};

type CountyLocation = {
  county: string;
  aliases: string[];
  cities?: string[];
};

const COUNTY_LOCATIONS: CountyLocation[] = [
  { county: "Miami-Dade County", aliases: ["miami dade county", "dade county"], cities: ["miami", "miami beach", "hialeah", "homestead", "doral", "coral gables", "aventura", "kendall", "florida city", "miami gardens"] },
  { county: "St. Johns County", aliases: ["st johns county", "saint johns county"], cities: ["st augustine", "saint augustine", "ponte vedra beach", "nocatee"] },
  { county: "St. Lucie County", aliases: ["st lucie county", "saint lucie county"], cities: ["fort pierce", "port st lucie", "port saint lucie"] },
  { county: "Indian River County", aliases: ["indian river county"], cities: ["vero beach", "sebastian"] },
  { county: "Palm Beach County", aliases: ["palm beach county"], cities: ["west palm beach", "boca raton", "delray beach", "boynton beach", "lake worth", "palm beach gardens", "wellington", "jupiter"] },
  { county: "Santa Rosa County", aliases: ["santa rosa county"], cities: ["milton", "navarre", "gulf breeze", "pace"] },
  { county: "Alachua County", aliases: ["alachua county"], cities: ["gainesville", "high springs", "newberry"] },
  { county: "Baker County", aliases: ["baker county"], cities: ["macclenny"] },
  { county: "Bay County", aliases: ["bay county"], cities: ["panama city", "panama city beach", "lynn haven"] },
  { county: "Bradford County", aliases: ["bradford county"], cities: ["starke"] },
  { county: "Brevard County", aliases: ["brevard county"], cities: ["melbourne", "palm bay", "cocoa beach", "titusville", "rockledge", "cape canaveral"] },
  { county: "Broward County", aliases: ["broward county"], cities: ["fort lauderdale", "hollywood florida", "pompano beach", "coral springs", "deerfield beach", "sunrise florida", "miramar florida", "pembroke pines", "weston florida"] },
  { county: "Calhoun County", aliases: ["calhoun county"], cities: ["blountstown"] },
  { county: "Charlotte County", aliases: ["charlotte county"], cities: ["punta gorda", "port charlotte"] },
  { county: "Citrus County", aliases: ["citrus county"], cities: ["inverness florida", "crystal river", "homosassa"] },
  { county: "Clay County", aliases: ["clay county"], cities: ["green cove springs", "orange park", "fleming island", "middleburg florida"] },
  { county: "Collier County", aliases: ["collier county"], cities: ["naples florida", "marco island", "immokalee"] },
  { county: "Columbia County", aliases: ["columbia county"], cities: ["lake city florida"] },
  { county: "DeSoto County", aliases: ["desoto county", "de soto county"], cities: ["arcadia florida"] },
  { county: "Dixie County", aliases: ["dixie county"], cities: ["cross city florida"] },
  { county: "Duval County", aliases: ["duval county"], cities: ["jacksonville", "jacksonville beach", "atlantic beach florida", "neptune beach"] },
  { county: "Escambia County", aliases: ["escambia county"], cities: ["pensacola"] },
  { county: "Flagler County", aliases: ["flagler county"], cities: ["palm coast", "bunnell", "flagler beach"] },
  { county: "Franklin County", aliases: ["franklin county"], cities: ["apalachicola", "carrabelle"] },
  { county: "Gadsden County", aliases: ["gadsden county"], cities: ["quincy florida", "havana florida"] },
  { county: "Gilchrist County", aliases: ["gilchrist county"], cities: ["trenton florida", "bell florida"] },
  { county: "Glades County", aliases: ["glades county"], cities: ["moore haven"] },
  { county: "Gulf County", aliases: ["gulf county"], cities: ["port st joe", "port saint joe", "wewahitchka"] },
  { county: "Hamilton County", aliases: ["hamilton county"], cities: ["jasper florida"] },
  { county: "Hardee County", aliases: ["hardee county"], cities: ["wauchula"] },
  { county: "Hendry County", aliases: ["hendry county"], cities: ["labelle florida", "clewiston"] },
  { county: "Hernando County", aliases: ["hernando county"], cities: ["brooksville", "spring hill florida"] },
  { county: "Highlands County", aliases: ["highlands county"], cities: ["sebring", "avon park", "lake placid florida"] },
  { county: "Hillsborough County", aliases: ["hillsborough county"], cities: ["tampa", "temple terrace", "plant city", "brandon florida", "riverview florida"] },
  { county: "Holmes County", aliases: ["holmes county"], cities: ["bonifay"] },
  { county: "Jackson County", aliases: ["jackson county"], cities: ["marianna florida"] },
  { county: "Jefferson County", aliases: ["jefferson county"], cities: ["monticello florida"] },
  { county: "Lafayette County", aliases: ["lafayette county"], cities: ["mayo florida"] },
  { county: "Lake County", aliases: ["lake county"], cities: ["tavares", "clermont florida", "leesburg florida", "mount dora", "eustis florida"] },
  { county: "Lee County", aliases: ["lee county"], cities: ["fort myers", "cape coral", "bonita springs", "estero florida", "sanibel"] },
  { county: "Leon County", aliases: ["leon county"], cities: ["tallahassee"] },
  { county: "Levy County", aliases: ["levy county"], cities: ["bronson florida", "cedar key", "chiefland", "williston florida"] },
  { county: "Liberty County", aliases: ["liberty county"], cities: ["bristol florida"] },
  { county: "Madison County", aliases: ["madison county"], cities: ["madison florida"] },
  { county: "Manatee County", aliases: ["manatee county"], cities: ["bradenton", "palmetto florida", "lakewood ranch"] },
  { county: "Marion County", aliases: ["marion county"], cities: ["ocala", "dunnellon", "belleview"] },
  { county: "Martin County", aliases: ["martin county"], cities: ["stuart florida", "palm city", "jensen beach"] },
  { county: "Monroe County", aliases: ["monroe county"], cities: ["key west", "marathon florida", "key largo", "islamorada"] },
  { county: "Nassau County", aliases: ["nassau county"], cities: ["fernandina beach", "yulee", "callahan florida"] },
  { county: "Okaloosa County", aliases: ["okaloosa county"], cities: ["crestview", "fort walton beach", "destin", "niceville"] },
  { county: "Okeechobee County", aliases: ["okeechobee county"], cities: ["okeechobee florida"] },
  { county: "Orange County", aliases: ["orange county"], cities: ["orlando", "winter park florida", "apopka", "ocoee", "winter garden", "maitland florida", "lake buena vista"] },
  { county: "Osceola County", aliases: ["osceola county"], cities: ["kissimmee", "st cloud florida", "saint cloud florida", "celebration florida"] },
  { county: "Pasco County", aliases: ["pasco county"], cities: ["dade city", "new port richey", "port richey", "wesley chapel", "zephyrhills", "land o lakes florida"] },
  { county: "Pinellas County", aliases: ["pinellas county"], cities: ["st petersburg", "saint petersburg", "clearwater florida", "largo florida", "dunedin florida", "tarpon springs", "pinellas park", "seminole florida", "safety harbor", "madeira beach", "treasure island florida"] },
  { county: "Polk County", aliases: ["polk county"], cities: ["bartow florida", "lakeland florida", "winter haven", "davenport florida", "haines city", "auburndale florida"] },
  { county: "Putnam County", aliases: ["putnam county"], cities: ["palatka"] },
  { county: "Sarasota County", aliases: ["sarasota county"], cities: ["sarasota florida", "venice florida", "north port florida", "siesta key"] },
  { county: "Seminole County", aliases: ["seminole county"], cities: ["sanford florida", "altamonte springs", "lake mary", "longwood florida", "oviedo", "casselberry"] },
  { county: "Sumter County", aliases: ["sumter county"], cities: ["bushnell florida", "the villages", "wildwood florida"] },
  { county: "Suwannee County", aliases: ["suwannee county"], cities: ["live oak florida"] },
  { county: "Taylor County", aliases: ["taylor county"], cities: ["perry florida"] },
  { county: "Union County", aliases: ["union county"], cities: ["lake butler"] },
  { county: "Volusia County", aliases: ["volusia county"], cities: ["deland", "daytona beach", "ormond beach", "new smyrna beach", "port orange florida"] },
  { county: "Wakulla County", aliases: ["wakulla county"], cities: ["crawfordville"] },
  { county: "Walton County", aliases: ["walton county"], cities: ["defuniak springs", "santa rosa beach", "miramar beach", "freeport florida"] },
  { county: "Washington County", aliases: ["washington county"], cities: ["chipley"] }
];

const UNAVAILABLE_TERMS = [
  "sold",
  "under contract",
  "sale pending",
  "pending sale",
  "no longer available",
  "off market",
  "listing expired",
  "withdrawn from market"
];

const SALE_INTENT_TERMS = [
  "for sale",
  "available",
  "asking price",
  "asset sale",
  "license sale",
  "purchase this license",
  "acquire this license",
  "transferable license"
];

const PACKAGE_STORE_TERMS = [
  "package store license",
  "package liquor license",
  "off premises liquor license",
  "off premise liquor license",
  "package store quota license"
];

const FULL_QUOTA_TERMS = [
  "full quota liquor license",
  "quota liquor license",
  "full liquor license",
  "full alcohol license",
  "quota license"
];

export function normalizeForMatch(value: string): string {
  return value
    .toLowerCase()
    .replace(/&amp;/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsPhrase(normalized: string, phrase: string): boolean {
  return ` ${normalized} `.includes(` ${normalizeForMatch(phrase)} `);
}

export function extractFloridaCounty(text: string): string | null {
  const normalized = normalizeForMatch(text);

  // Explicit county names are more reliable than city inference.
  for (const entry of COUNTY_LOCATIONS) {
    if (entry.aliases.some((alias) => containsPhrase(normalized, alias))) return entry.county;
  }

  // Listing sites frequently identify only a city. Require the full normalized
  // city phrase and prefer longer aliases so "Miami Beach" wins over "Miami".
  const cityMatches = COUNTY_LOCATIONS.flatMap((entry) =>
    (entry.cities ?? []).map((city) => ({ county: entry.county, city: normalizeForMatch(city) }))
  ).sort((a, b) => b.city.length - a.city.length);

  for (const match of cityMatches) {
    if (containsPhrase(normalized, match.city)) return match.county;
  }

  return null;
}

export function extractLiquorLicenseType(text: string): Listing["type"] | null {
  const normalized = normalizeForMatch(text);
  const compact = normalized.replace(/\s+/g, "");

  if (compact.includes("4cop")) return "4COP Quota";
  if (compact.includes("3ps")) return "3PS Quota / Package Store";
  if (PACKAGE_STORE_TERMS.some((term) => normalized.includes(term))) return "3PS Quota / Package Store";
  if (FULL_QUOTA_TERMS.some((term) => normalized.includes(term))) return "4COP Quota";
  return null;
}

function validPrice(value: string): number | null {
  const parsed = Number(value.replace(/[$,\s]/g, ""));
  return Number.isFinite(parsed) && parsed >= 50000 && parsed <= 2500000 ? Math.round(parsed) : null;
}

export function extractLicensePrice(text: string): number | null {
  const labeledPatterns = [
    /(?:asking|list(?:ing)?|sale)\s+price[^$0-9]{0,50}(\$?\s*[0-9]{2,3}(?:,[0-9]{3})+|\$?\s*[0-9]{5,7})(?:\.\d{2})?/gi,
    /(?:price|asking)[^$0-9]{0,20}(\$\s*[0-9]{2,3}(?:,[0-9]{3})+|\$\s*[0-9]{5,7})(?:\.\d{2})?/gi
  ];

  for (const pattern of labeledPatterns) {
    for (const match of text.matchAll(pattern)) {
      const price = validPrice(match[1]);
      if (price !== null) return price;
    }
  }

  for (const match of text.matchAll(/\$\s*([0-9]{2,3}(?:,[0-9]{3})+|[0-9]{5,7})(?:\.\d{2})?/g)) {
    const price = validPrice(match[1]);
    if (price !== null) return price;
  }
  return null;
}

export function hasLicenseLanguage(text: string): boolean {
  const normalized = normalizeForMatch(text);
  const compact = normalized.replace(/\s+/g, "");
  return compact.includes("4cop")
    || compact.includes("3ps")
    || normalized.includes("liquor license")
    || normalized.includes("quota license")
    || normalized.includes("alcohol license");
}

export function hasSaleIntent(text: string): boolean {
  const normalized = normalizeForMatch(text);
  return SALE_INTENT_TERMS.some((term) => normalized.includes(term));
}

export function isUnavailableListing(text: string): boolean {
  const normalized = normalizeForMatch(text.slice(0, 9000));
  return UNAVAILABLE_TERMS.some((term) => normalized.includes(term));
}

export function parseLicenseCandidate(text: string): ParsedLicenseCandidate {
  return {
    county: extractFloridaCounty(text),
    type: extractLiquorLicenseType(text),
    price: extractLicensePrice(text),
    hasLicenseLanguage: hasLicenseLanguage(text),
    hasSaleIntent: hasSaleIntent(text),
    unavailable: isUnavailableListing(text)
  };
}

export function listingImageForCounty(county: string): string {
  if (["Miami-Dade County", "Broward County", "Monroe County"].includes(county)) return "/assets/listing-miami.png";
  if (["Palm Beach County", "Brevard County", "Indian River County", "St. Lucie County"].includes(county)) return "/assets/listing-palm-beach.png";
  if (["Sarasota County", "Manatee County", "Charlotte County", "Pinellas County", "Hillsborough County"].includes(county)) return "/assets/listing-sarasota.png";
  return "/assets/listing-lee.png";
}
