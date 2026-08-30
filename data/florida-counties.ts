export type FloridaCounty = {
  name: string;
  slug: string;
  primaryCities: string[];
  introduction: string;
  marketOverview: string;
  nearbyCounties: string[];
  indexable: boolean;
  featured: boolean;
};

const countyNames = `Alachua County,Baker County,Bay County,Bradford County,Brevard County,Broward County,Calhoun County,Charlotte County,Citrus County,Clay County,Collier County,Columbia County,DeSoto County,Dixie County,Duval County,Escambia County,Flagler County,Franklin County,Gadsden County,Gilchrist County,Glades County,Gulf County,Hamilton County,Hardee County,Hendry County,Hernando County,Highlands County,Hillsborough County,Holmes County,Indian River County,Jackson County,Jefferson County,Lafayette County,Lake County,Lee County,Leon County,Levy County,Liberty County,Madison County,Manatee County,Marion County,Martin County,Miami-Dade County,Monroe County,Nassau County,Okaloosa County,Okeechobee County,Orange County,Osceola County,Palm Beach County,Pasco County,Pinellas County,Polk County,Putnam County,Santa Rosa County,Sarasota County,Seminole County,St. Johns County,St. Lucie County,Sumter County,Suwannee County,Taylor County,Union County,Volusia County,Wakulla County,Walton County,Washington County`.split(",");

export function countySlug(name: string) {
  return name
    .replace(/\s+County$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type CountyContent = {
  primaryCities?: string[];
  introduction: string;
  marketOverview?: string;
  nearbyCounties?: string[];
  featured?: boolean;
};

const countyContent: Record<string, CountyContent> = {
  alachua: {
    primaryCities: ["Gainesville"],
    introduction: "Alachua County is anchored by Gainesville and the University of Florida, with a diverse economy supported by education, healthcare, research, hospitality, and regional commerce.",
    marketOverview: "Alachua County's quota-license market is centered on Gainesville and is supported by the University of Florida, healthcare, live events, restaurants, hotels, and regional traffic. Buyers should compare current 4COP and 3PS asking prices while separately confirming premises eligibility, Gainesville-area zoning, transfer timing, liens, and seller terms.",
    nearbyCounties: ["marion", "clay", "citrus", "duval"],
  },
  bay: {
    primaryCities: ["Panama City", "Panama City Beach"],
    introduction: "Bay County is home to Panama City and Panama City Beach, with year-round dining demand supported by Gulf tourism, military activity, boating, conventions, and hospitality.",
    marketOverview: "Bay County quota-license demand is shaped by Panama City, Panama City Beach, Gulf tourism, military activity, and seasonal hospitality traffic. Buyers comparing 4COP and 3PS opportunities should evaluate asking price together with transfer timing, intended premises, local zoning, liens, seller terms, and the seasonality of the proposed concept.",
    nearbyCounties: ["okaloosa", "santa-rosa", "escambia", "gulf"],
  },
  brevard: {
    primaryCities: ["Melbourne", "Cocoa Beach", "Titusville"],
    introduction: "Brevard County spans Florida's Space Coast, combining aerospace employers, Atlantic beaches, cruise traffic, growing communities, restaurants, and tourism-oriented hospitality demand.",
  },
  broward: {
    primaryCities: ["Fort Lauderdale", "Hollywood", "Pompano Beach"],
    introduction: "Broward County anchors a major South Florida restaurant and nightlife market around Fort Lauderdale, with dense population, beaches, boating, tourism, hotels, entertainment, and year-round local demand.",
    marketOverview: "Quota liquor-license opportunities in Broward County serve a broad range of concepts, including full-service restaurants, bars, hotels, entertainment venues, and package-store operations. Asking prices can vary materially with market supply, seller urgency, license type, and transaction structure.",
    nearbyCounties: ["miami-dade", "palm-beach", "collier"],
    featured: true,
  },
  charlotte: {
    primaryCities: ["Punta Gorda", "Port Charlotte"],
    introduction: "Charlotte County is a growing southwest Florida market centered on Punta Gorda and Port Charlotte, with boating, fishing, residential growth, tourism, restaurants, and waterfront hospitality.",
  },
  citrus: {
    primaryCities: ["Crystal River", "Inverness"],
    introduction: "Citrus County is known for Crystal River, natural springs, waterfront recreation, expanding residential communities, local restaurants, and Nature Coast tourism.",
  },
  clay: {
    primaryCities: ["Orange Park", "Green Cove Springs"],
    introduction: "Clay County lies southwest of Jacksonville and includes fast-growing suburban communities supported by military households, retail growth, dining, residential development, and regional commerce.",
  },
  collier: {
    primaryCities: ["Naples", "Marco Island"],
    introduction: "Collier County is home to Naples and Marco Island, with affluent communities, luxury tourism, golf, boating, resorts, fine dining, and access to the Everglades.",
  },
  desoto: {
    primaryCities: ["Arcadia"],
    introduction: "DeSoto County is a south-central Florida market centered on Arcadia, with agriculture, cattle ranching, local commerce, regional travel, restaurants, and community-focused hospitality.",
  },
  duval: {
    primaryCities: ["Jacksonville"],
    introduction: "Duval County is anchored by Jacksonville, one of Florida's largest metropolitan markets, with a major port, finance, logistics, healthcare, sports, beaches, dining, nightlife, and entertainment.",
    marketOverview: "Duval County supports restaurant and beverage concepts ranging from neighborhood operators to large hospitality groups. Buyers searching for Jacksonville and Duval County liquor licenses for sale can compare 4COP and 3PS quota opportunities, asking prices, availability, intended use, zoning, local approvals, and state transfer requirements.",
    nearbyCounties: ["clay", "st-johns", "nassau"],
    featured: true,
  },
  escambia: {
    primaryCities: ["Pensacola"],
    introduction: "Escambia County is Florida's westernmost county and home to Pensacola, with military activity, Gulf Coast tourism, education, healthcare, restaurants, nightlife, and regional commerce.",
  },
  gulf: {
    primaryCities: ["Port St. Joe", "Wewahitchka"],
    introduction: "Gulf County includes Port St. Joe, Cape San Blas, Mexico Beach-area visitors, and smaller coastal communities supported by tourism, boating, fishing, restaurants, vacation rentals, and local commerce.",
    marketOverview: "Gulf County quota liquor licenses serve a small, supply-constrained coastal market shaped by Port St. Joe, beach tourism, vacation rentals, restaurants, and seasonal demand. Buyers should compare current 4COP and 3PS opportunities carefully and confirm the license series, county transfer eligibility, premises, zoning, liens, and seller terms.",
    nearbyCounties: ["bay", "leon"],
  },
  hernando: {
    primaryCities: ["Brooksville", "Spring Hill"],
    introduction: "Hernando County is a growing Nature Coast market north of Tampa, known for suburban development, springs, recreation, expanding retail centers, restaurants, and hospitality demand.",
  },
  hillsborough: {
    primaryCities: ["Tampa", "Temple Terrace", "Plant City"],
    introduction: "Hillsborough County is anchored by Tampa, one of Florida's largest business, tourism, healthcare, sports, convention, dining, and entertainment markets.",
    marketOverview: "Demand for transferable quota licenses in Hillsborough County is influenced by Tampa's expanding population, hospitality districts, sports and convention traffic, restaurant development, and the limited county-based supply of quota licenses.",
    nearbyCounties: ["pinellas", "pasco", "polk", "manatee"],
    featured: true,
  },
  "indian-river": {
    primaryCities: ["Vero Beach", "Sebastian"],
    introduction: "Indian River County is centered on Vero Beach and Sebastian, with affluent coastal communities, tourism, boating, retail, restaurants, and hospitality activity along the Treasure Coast.",
  },
  lake: {
    primaryCities: ["Clermont", "Leesburg", "Mount Dora", "Tavares"],
    introduction: "Lake County is a fast-growing Central Florida market northwest of Orlando, known for its chain of lakes, suburban development, tourism, recreation, restaurants, and expanding communities.",
    marketOverview: "Lake County liquor-license demand spans Clermont, Leesburg, Mount Dora, Tavares, and surrounding communities. Buyers can compare current 4COP and 3PS quota opportunities by asking price and availability while separately confirming intended use, premises eligibility, zoning, and transfer requirements.",
    nearbyCounties: ["orange", "seminole", "polk", "sumter"],
    featured: true,
  },
  lee: {
    primaryCities: ["Fort Myers", "Cape Coral", "Bonita Springs"],
    introduction: "Lee County includes Fort Myers and Cape Coral, with rapid population growth, Gulf beaches, boating, tourism, hotels, restaurants, and a large year-round hospitality market.",
    marketOverview: "Lee County's quota-license market is supported by permanent population growth and seasonal tourism. Buyers commonly evaluate the asking price together with transfer timing, intended premises, local zoning, financing structure, and the operational requirements of the proposed concept.",
    nearbyCounties: ["collier", "charlotte", "hendry"],
    featured: true,
  },
  leon: {
    primaryCities: ["Tallahassee"],
    introduction: "Leon County is home to Tallahassee, the state capital, with an economy supported by government, universities, healthcare, restaurants, events, and regional commerce.",
  },
  manatee: {
    primaryCities: ["Bradenton", "Palmetto"],
    introduction: "Manatee County is home to Bradenton and growing Gulf Coast communities, with beaches, boating, tourism, residential development, restaurants, and expanding hospitality demand.",
    marketOverview: "Manatee County's quota-license market serves Bradenton, Palmetto, Lakewood Ranch, coastal communities, and the wider Sarasota-Bradenton hospitality corridor. Buyers should compare current 4COP and 3PS inventory by asking price and terms, then independently confirm premises, zoning, transfer eligibility, liens, and regulatory timing.",
    nearbyCounties: ["sarasota", "hillsborough", "pinellas", "desoto"],
  },
  marion: {
    primaryCities: ["Ocala"],
    introduction: "Marion County is anchored by Ocala and supported by horse farms, logistics, healthcare, residential growth, tourism, restaurants, and regional commerce.",
  },
  martin: {
    primaryCities: ["Stuart", "Jensen Beach"],
    introduction: "Martin County is known for boating, affluent coastal communities, protected shorelines, tourism, restaurants, and a strong local hospitality market centered around Stuart.",
  },
  "miami-dade": {
    primaryCities: ["Miami", "Miami Beach", "Doral"],
    introduction: "Miami-Dade County is Florida's largest international hospitality market, combining global tourism, finance, trade, culture, hotels, restaurants, nightlife, entertainment, and dense year-round population.",
    marketOverview: "Miami-Dade quota liquor licenses serve one of the state's most competitive restaurant and beverage markets. Buyers should compare current asking prices, license type, transferability, transaction structure, intended premises, zoning, and regulatory timing before committing capital.",
    nearbyCounties: ["broward", "monroe", "collier"],
    featured: true,
  },
  monroe: {
    primaryCities: ["Key West", "Marathon", "Islamorada"],
    introduction: "Monroe County encompasses the Florida Keys, one of Florida's strongest tourism, boating, fishing, resort, restaurant, bar, and hospitality markets.",
  },
  okaloosa: {
    primaryCities: ["Destin", "Fort Walton Beach"],
    introduction: "Okaloosa County includes Destin and Fort Walton Beach, with major military installations, Gulf tourism, boating, resorts, restaurants, and hospitality activity.",
  },
  orange: {
    primaryCities: ["Orlando", "Winter Park"],
    introduction: "Orange County is anchored by Orlando, one of the world's leading tourism and convention destinations and a major market for hotels, restaurants, entertainment, nightlife, and attractions.",
    marketOverview: "Orange County supports a wide range of licensed concepts serving residents, convention visitors, and tourists. Buyers should evaluate the license separately from any business or real estate and confirm the intended use, premises eligibility, transfer process, and local approvals.",
    nearbyCounties: ["seminole", "osceola", "lake", "polk"],
    featured: true,
  },
  osceola: {
    primaryCities: ["Kissimmee", "St. Cloud"],
    introduction: "Osceola County is a fast-growing Central Florida market south of Orlando, anchored by Kissimmee, residential development, attractions, restaurants, hotels, and the regional tourism corridor.",
    marketOverview: "Osceola County quota-license demand is concentrated around Kissimmee, St. Cloud, hotels, attractions, restaurants, and the south-Orlando tourism corridor. Buyers should compare current 4COP and 3PS asks while confirming whether a license-only offering fits the proposed premises, zoning, financing, transfer schedule, and operating plan.",
    nearbyCounties: ["orange", "polk", "lake", "brevard"],
  },
  "palm-beach": {
    primaryCities: ["West Palm Beach", "Boca Raton", "Delray Beach"],
    introduction: "Palm Beach County combines affluent coastal communities, tourism, boating, resorts, retail, restaurants, nightlife, and substantial year-round population growth.",
    marketOverview: "Quota-license demand in Palm Beach County is influenced by a large and diverse hospitality market stretching from Boca Raton through West Palm Beach and northern county communities. Asking prices and deal terms should be confirmed directly before reliance.",
    nearbyCounties: ["broward", "martin", "hendry"],
    featured: true,
  },
  pasco: {
    primaryCities: ["New Port Richey", "Wesley Chapel", "Land O' Lakes", "Dade City", "Zephyrhills"],
    introduction: "Pasco County is a rapidly growing Tampa Bay market with expanding suburban communities, retail centers, recreation, restaurants, and hospitality demand.",
    marketOverview: "Pasco County liquor-license demand is spread across New Port Richey, Wesley Chapel, Land O' Lakes, Dade City, Zephyrhills, and other growing communities. Buyers searching for Pasco County liquor licenses for sale can compare current 4COP and 3PS quota opportunities, disclosed asking prices, availability, and county-specific transaction requirements.",
    nearbyCounties: ["pinellas", "hillsborough", "hernando", "polk"],
    featured: true,
  },
  pinellas: {
    primaryCities: ["St. Petersburg", "Clearwater", "Largo"],
    introduction: "Pinellas County includes St. Petersburg and Clearwater, with dense coastal communities, Gulf beaches, tourism, arts, resorts, dining, nightlife, and year-round local demand.",
    marketOverview: "Pinellas County's constrained geography and established tourism economy create sustained interest in transferable quota licenses. Buyers should review the proposed premises, zoning, local approvals, license category, and transfer timing in addition to price.",
    nearbyCounties: ["hillsborough", "pasco", "manatee"],
    featured: true,
  },
  polk: {
    primaryCities: ["Lakeland", "Winter Haven"],
    introduction: "Polk County sits between Tampa and Orlando and is anchored by Lakeland and Winter Haven, with logistics, manufacturing, attractions, residential growth, restaurants, and regional commerce.",
    marketOverview: "Polk County's central location and population growth support restaurant and beverage demand across multiple cities. Available license pricing may vary by seller, condition of the transaction, license type, and the timing required to complete a transfer.",
    nearbyCounties: ["hillsborough", "orange", "osceola", "lake"],
    featured: true,
  },
  "santa-rosa": {
    primaryCities: ["Milton", "Gulf Breeze", "Navarre"],
    introduction: "Santa Rosa County includes Gulf Breeze, Navarre, Milton, and growing communities near Pensacola, supported by military activity, beaches, tourism, restaurants, and residential development.",
  },
  sarasota: {
    primaryCities: ["Sarasota", "Venice", "North Port"],
    introduction: "Sarasota County is a Gulf Coast destination known for white-sand beaches, arts, culture, affluent communities, tourism, resorts, restaurants, and a strong year-round dining market.",
    marketOverview: "Sarasota County quota licenses can support restaurant, bar, hospitality, and package-store strategies depending on license type and regulatory approvals. Buyers should confirm current availability and conduct independent legal and financial diligence.",
    nearbyCounties: ["manatee", "charlotte", "desoto"],
    featured: true,
  },
  seminole: {
    primaryCities: ["Sanford", "Lake Mary", "Altamonte Springs", "Oviedo", "Winter Springs"],
    introduction: "Seminole County is a prosperous suburban market north of Orlando, known for strong communities, corporate employment, lakes, retail, restaurants, and population growth.",
    marketOverview: "Seminole County liquor-license demand is supported by Sanford, Lake Mary, Altamonte Springs, Oviedo, Winter Springs, and the broader north-Orlando market. Buyers can compare current 4COP and 3PS quota licenses for sale by asking price and availability while confirming premises, zoning, local approvals, and state transfer requirements.",
    nearbyCounties: ["orange", "lake", "volusia"],
    featured: true,
  },
  "st-johns": {
    primaryCities: ["St. Augustine", "Ponte Vedra Beach"],
    introduction: "St. Johns County is home to historic St. Augustine and fast-growing coastal communities, with strong tourism, hospitality, schools, residential development, and restaurant activity.",
    marketOverview: "St. Johns County quota-license demand is supported by St. Augustine tourism, Ponte Vedra Beach hospitality, coastal growth, restaurants, hotels, and year-round residential demand. Buyers should compare disclosed asks and seller terms while independently confirming premises, zoning, transfer eligibility, liens, and the intended license series.",
    nearbyCounties: ["duval", "clay", "volusia"],
    featured: true,
  },
  "st-lucie": {
    primaryCities: ["Port St. Lucie", "Fort Pierce"],
    introduction: "St. Lucie County is home to Port St. Lucie and Fort Pierce, with rapid residential growth, coastal recreation, healthcare, retail, restaurants, and hospitality activity.",
    marketOverview: "St. Lucie County liquor-license demand is centered on Port St. Lucie and Fort Pierce and is supported by residential growth, Treasure Coast tourism, restaurants, and retail activity. Buyers can compare current 4COP and 3PS licenses for sale, asking prices, and availability before evaluating premises and transfer requirements.",
    nearbyCounties: ["martin", "indian-river", "okeechobee"],
    featured: true,
  },
  volusia: {
    primaryCities: ["Daytona Beach", "New Smyrna Beach", "Ormond Beach", "Port Orange", "DeLand"],
    introduction: "Volusia County is home to Daytona Beach, with motorsports, Atlantic beaches, tourism, universities, restaurants, events, and growing residential communities.",
    marketOverview: "Volusia County's liquor-license market spans Daytona Beach, New Smyrna Beach, Ormond Beach, Port Orange, DeLand, and surrounding communities. Current 4COP and 3PS quota opportunities can be compared by asking price and availability, with buyers separately confirming intended use, local approvals, and transfer timing.",
    nearbyCounties: ["flagler", "seminole", "lake", "orange"],
    featured: true,
  },
};

function defaultIntroduction(name: string) {
  return `${name} supports local restaurants, hospitality businesses, retail activity, residential communities, tourism, and regional commerce within Florida.`;
}

function defaultOverview(name: string) {
  return `Quota liquor-license interests in ${name} are county-specific and remain subject to price confirmation, availability, state transfer requirements, local approvals, and independent due diligence. The marketplace presents license interests only unless a listing expressly states otherwise.`;
}

export const floridaCounties: FloridaCounty[] = countyNames.map((name) => {
  const slug = countySlug(name);
  const content = countyContent[slug];
  return {
    name,
    slug,
    primaryCities: content?.primaryCities ?? [],
    introduction: content?.introduction ?? defaultIntroduction(name),
    marketOverview: content?.marketOverview ?? defaultOverview(name),
    nearbyCounties: content?.nearbyCounties ?? [],
    indexable: Boolean(content),
    featured: Boolean(content?.featured),
  };
});

export const indexableCounties = floridaCounties.filter((county) => county.indexable);
export const featuredCounties = floridaCounties.filter((county) => county.featured);

export function getCountyBySlug(slug: string) {
  return floridaCounties.find((county) => county.slug === slug);
}

export function getCountyByName(name: string) {
  return floridaCounties.find((county) => county.name === name);
}
