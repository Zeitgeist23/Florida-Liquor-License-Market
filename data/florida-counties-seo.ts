import { countySlug, floridaCounties as baseFloridaCounties } from "./florida-counties";
import type { FloridaCounty } from "./florida-counties";

export type { FloridaCounty } from "./florida-counties";
export { countySlug };

type SeoOverride = {
  primaryCities: string[];
  introduction: string;
  marketOverview: string;
  nearbyCounties?: string[];
};

const seoOverrides: Record<string, SeoOverride> = {
  baker: {
    primaryCities: ["Macclenny", "Glen St. Mary"],
    introduction: "Baker County sits west of Jacksonville along the Interstate 10 corridor, with Macclenny serving as its commercial center and local demand supported by residents, highway traffic, logistics, and regional commerce.",
    marketOverview: "Baker County quota-license opportunities serve a smaller Northeast Florida market where available inventory can be limited. Buyers should compare asking price, license category, transfer timing, intended premises, local approvals, and the economics of serving both local and through-travel demand.",
    nearbyCounties: ["duval", "nassau", "columbia"],
  },
  bradford: {
    primaryCities: ["Starke", "Lawtey"],
    introduction: "Bradford County is centered on Starke in Northeast Florida, with a market shaped by local residents, U.S. 301 traffic, government services, small businesses, restaurants, and regional travel between Jacksonville and North Central Florida.",
    marketOverview: "Bradford County is a comparatively small quota-license market, so individual listings may represent a meaningful share of available supply. Buyers should independently confirm license status, permitted use, transfer requirements, premises suitability, and local approvals before committing capital.",
    nearbyCounties: ["alachua", "clay", "putnam"],
  },
  calhoun: {
    primaryCities: ["Blountstown", "Altha"],
    introduction: "Calhoun County is a rural Florida Panhandle market centered on Blountstown, with local commerce, agriculture, outdoor recreation, community businesses, restaurants, and regional travel supporting hospitality demand.",
    marketOverview: "Quota-license activity in Calhoun County is typically thinner than in Florida's major metros. That makes current availability, seller terms, transfer timing, and the proposed operating concept especially important factors when evaluating a county-specific license opportunity.",
    nearbyCounties: ["jackson", "liberty", "gulf"],
  },
  columbia: {
    primaryCities: ["Lake City", "Fort White"],
    introduction: "Columbia County is anchored by Lake City at the junction of Interstates 75 and 10, creating a North Florida market supported by logistics, highway travel, healthcare, retail, restaurants, and regional commerce.",
    marketOverview: "Columbia County quota licenses can serve both local customers and substantial interstate traffic. Buyers should evaluate asking price together with the proposed premises, local zoning, license category, transfer timing, financing structure, and the competitive environment around Lake City.",
    nearbyCounties: ["suwannee", "hamilton", "baker", "alachua"],
  },
  dixie: {
    primaryCities: ["Cross City", "Horseshoe Beach"],
    introduction: "Dixie County lies along Florida's Nature Coast, with Cross City, coastal recreation, fishing, hunting, local commerce, and seasonal visitors supporting a small but distinct hospitality market.",
    marketOverview: "Dixie County quota-license demand is tied to a relatively small resident base and outdoor-tourism economy. Buyers should verify current license availability, intended use, premises eligibility, local requirements, transfer timing, and whether projected demand supports the proposed concept.",
    nearbyCounties: ["levy", "gilchrist", "lafayette", "taylor"],
  },
  flagler: {
    primaryCities: ["Palm Coast", "Flagler Beach", "Bunnell"],
    introduction: "Flagler County includes fast-growing Palm Coast and Atlantic-front Flagler Beach, with population growth, beach tourism, residential development, restaurants, recreation, and Interstate 95 access supporting hospitality demand.",
    marketOverview: "Flagler County's expanding population and coastal visitor market can support restaurant, bar, and package-store concepts depending on license type. Buyers should compare available quota licenses, asking prices, transfer timing, premises eligibility, zoning, and local approvals.",
    nearbyCounties: ["st-johns", "volusia", "putnam"],
  },
  franklin: {
    primaryCities: ["Apalachicola", "Carrabelle", "Eastpoint"],
    introduction: "Franklin County spans a scenic Gulf Coast market including Apalachicola, Carrabelle, Eastpoint, and access to St. George Island, with seafood, boating, fishing, vacation travel, and waterfront hospitality driving seasonal demand.",
    marketOverview: "Franklin County quota-license opportunities operate in a tourism-sensitive coastal market. Buyers should consider seasonality, location, premises approvals, license category, seller terms, transfer timing, and the limited county-specific supply when evaluating an acquisition.",
    nearbyCounties: ["gulf", "wakulla", "liberty"],
  },
  gadsden: {
    primaryCities: ["Quincy", "Midway", "Havana"],
    introduction: "Gadsden County lies west of Tallahassee and includes Quincy, Midway, and Havana, with Interstate 10 access, local government, agriculture, residential communities, restaurants, and regional commerce.",
    marketOverview: "Gadsden County's quota-license market is influenced by its proximity to Tallahassee and by local demand along the I-10 corridor. Buyers should confirm the license category, transferability, current status, premises suitability, local approvals, and deal structure.",
    nearbyCounties: ["leon", "liberty", "jackson"],
  },
  gilchrist: {
    primaryCities: ["Trenton", "Bell"],
    introduction: "Gilchrist County is a rural North Central Florida market centered on Trenton and Bell, with springs, outdoor recreation, agriculture, small businesses, local restaurants, and travel between Gainesville and the Nature Coast.",
    marketOverview: "Gilchrist County has a relatively small quota-license market where individual licenses may be infrequently offered. Buyers should verify present availability, permitted use, transfer requirements, local approvals, and the demand profile of the intended location.",
    nearbyCounties: ["alachua", "levy", "dixie"],
  },
  glades: {
    primaryCities: ["Moore Haven"],
    introduction: "Glades County is a rural South Florida market along the western shore of Lake Okeechobee, centered on Moore Haven and supported by agriculture, fishing, outdoor recreation, local commerce, and regional highway traffic.",
    marketOverview: "Quota-license opportunities in Glades County are comparatively scarce and serve a dispersed market. Buyers should analyze location-specific demand, license status, premises eligibility, local approvals, transfer timing, and all acquisition terms before proceeding.",
    nearbyCounties: ["hendry", "highlands", "okeechobee", "charlotte"],
  },
  gulf: {
    primaryCities: ["Port St. Joe", "Wewahitchka"],
    introduction: "Gulf County includes Port St. Joe, Mexico Beach-area visitors, Gulf-front recreation, fishing, vacation rentals, residential growth, restaurants, and a tourism-oriented hospitality economy.",
    marketOverview: "Gulf County quota-license demand can be highly location- and season-dependent. Buyers should compare current asking prices and availability while evaluating tourism patterns, intended premises, local approvals, transfer requirements, and the proposed operating concept.",
    nearbyCounties: ["bay", "franklin", "calhoun"],
  },
  hamilton: {
    primaryCities: ["Jasper", "Jennings", "White Springs"],
    introduction: "Hamilton County sits on Florida's northern border along Interstates 75 and 10, with Jasper, White Springs, highway travel, agriculture, outdoor recreation, local businesses, and regional commerce shaping demand.",
    marketOverview: "Hamilton County is a small quota-license market where highway-oriented and local concepts can have different demand profiles. Buyers should confirm license status, transferability, premises eligibility, local approvals, asking price, and transaction timing.",
    nearbyCounties: ["columbia", "suwannee", "madison"],
  },
  hardee: {
    primaryCities: ["Wauchula", "Bowling Green", "Zolfo Springs"],
    introduction: "Hardee County is a south-central Florida market centered on Wauchula, with agriculture, phosphate-related activity, local retail, restaurants, community businesses, and regional travel supporting the local economy.",
    marketOverview: "Hardee County quota licenses serve a smaller inland market with limited county-specific supply. Buyers should assess the proposed location, customer base, license category, transfer process, local approvals, financing terms, and seller expectations.",
    nearbyCounties: ["highlands", "desoto", "polk", "manatee"],
  },
  hendry: {
    primaryCities: ["Clewiston", "LaBelle"],
    introduction: "Hendry County includes Clewiston and LaBelle, with agriculture, Lake Okeechobee recreation, regional logistics, growing communities, local restaurants, and connections between Southwest Florida and the interior.",
    marketOverview: "Hendry County quota-license opportunities may serve distinct submarkets around Clewiston and LaBelle. Buyers should review county-specific supply, asking price, transfer timing, premises eligibility, local approvals, and the operating economics of the intended concept.",
    nearbyCounties: ["lee", "collier", "glades", "palm-beach"],
  },
  highlands: {
    primaryCities: ["Sebring", "Avon Park", "Lake Placid"],
    introduction: "Highlands County is centered on Sebring, Avon Park, and Lake Placid, with lakes, motorsports, retirement communities, seasonal residents, healthcare, restaurants, recreation, and regional commerce.",
    marketOverview: "Highlands County's hospitality demand reflects a mix of permanent residents, seasonal population, and recreation. Buyers should compare available quota licenses, asking prices, proposed premises, local approvals, transfer requirements, and expected seasonality.",
    nearbyCounties: ["polk", "hardee", "desoto", "okeechobee"],
  },
  holmes: {
    primaryCities: ["Bonifay", "Ponce de Leon"],
    introduction: "Holmes County is a rural Florida Panhandle market centered on Bonifay, with Interstate 10 access, agriculture, local businesses, outdoor recreation, restaurants, and regional highway travel.",
    marketOverview: "Holmes County has a relatively thin quota-license market, making actual availability and seller terms important. Buyers should independently verify license status, permitted use, premises eligibility, local approvals, transfer timing, and transaction structure.",
    nearbyCounties: ["washington", "jackson", "walton"],
  },
  jackson: {
    primaryCities: ["Marianna", "Graceville"],
    introduction: "Jackson County is anchored by Marianna in the central Panhandle, with Interstate 10, healthcare, education, agriculture, caves and springs, retail, restaurants, and regional commerce supporting a broad local market.",
    marketOverview: "Jackson County quota licenses may appeal to restaurant, bar, hospitality, or package-store operators depending on category and location. Buyers should evaluate asking price, availability, local demand, premises approvals, transfer timing, and financing terms.",
    nearbyCounties: ["holmes", "calhoun", "gadsden"],
  },
  jefferson: {
    primaryCities: ["Monticello"],
    introduction: "Jefferson County lies east of Tallahassee and is centered on historic Monticello, with agriculture, small businesses, local dining, outdoor recreation, and regional travel along U.S. 19 and Interstate 10.",
    marketOverview: "Jefferson County is a small quota-license market influenced by local demand and proximity to Tallahassee. Buyers should confirm current supply, license status, transfer requirements, premises suitability, local approvals, and the economics of the intended use.",
    nearbyCounties: ["leon", "madison", "taylor", "wakulla"],
  },
  lafayette: {
    primaryCities: ["Mayo"],
    introduction: "Lafayette County is a rural North Florida market centered on Mayo, with the Suwannee River, springs, agriculture, outdoor recreation, local businesses, restaurants, and regional travel.",
    marketOverview: "Because Lafayette County has a small population and limited quota-license inventory, buyers should focus closely on current availability, location-specific demand, license category, transfer conditions, local approvals, and transaction economics.",
    nearbyCounties: ["suwannee", "dixie", "taylor", "madison"],
  },
  levy: {
    primaryCities: ["Williston", "Chiefland", "Cedar Key"],
    introduction: "Levy County stretches from inland communities such as Williston and Chiefland to Gulf Coast Cedar Key, combining agriculture, springs, fishing, tourism, local restaurants, and Nature Coast recreation.",
    marketOverview: "Levy County contains distinct inland and coastal hospitality markets, so the value of a quota license can depend heavily on intended location and concept. Buyers should confirm availability, status, premises eligibility, local approvals, and transfer timing.",
    nearbyCounties: ["alachua", "citrus", "dixie", "marion"],
  },
  liberty: {
    primaryCities: ["Bristol"],
    introduction: "Liberty County is a sparsely populated Panhandle market centered on Bristol, with extensive forests, outdoor recreation, government activity, local businesses, and regional travel supporting limited hospitality demand.",
    marketOverview: "Liberty County's quota-license market is small and listings may be infrequent. Buyers should verify county-specific supply, current license status, proposed premises, local approvals, permitted use, transfer requirements, and expected customer demand.",
    nearbyCounties: ["gadsden", "calhoun", "franklin", "leon"],
  },
  madison: {
    primaryCities: ["Madison", "Lee", "Greenville"],
    introduction: "Madison County is a North Florida market along Interstate 10, centered on Madison and supported by agriculture, education, local commerce, restaurants, outdoor recreation, and regional highway traffic.",
    marketOverview: "Madison County quota licenses serve a smaller market with both local and interstate-oriented demand. Buyers should independently verify asking price, availability, license category, premises eligibility, transfer timing, and all local and state requirements.",
    nearbyCounties: ["hamilton", "suwannee", "jefferson", "taylor"],
  },
  nassau: {
    primaryCities: ["Fernandina Beach", "Yulee", "Callahan"],
    introduction: "Nassau County combines Amelia Island and Fernandina Beach tourism with fast-growing Yulee and communities along the Jacksonville metro fringe, supporting resorts, restaurants, retail, residential growth, and coastal recreation.",
    marketOverview: "Nassau County's quota-license market benefits from both destination tourism and suburban growth. Buyers should compare asking prices and current availability while evaluating intended premises, license type, local approvals, transfer timing, and financing structure.",
    nearbyCounties: ["duval", "baker"],
  },
  okeechobee: {
    primaryCities: ["Okeechobee"],
    introduction: "Okeechobee County is centered on the City of Okeechobee and Lake Okeechobee, with fishing, agriculture, cattle, outdoor recreation, regional travel, local restaurants, and community businesses supporting demand.",
    marketOverview: "Okeechobee County quota-license opportunities serve a market shaped by local residents, agriculture, and lake-related recreation. Buyers should review current availability, asking price, premises suitability, local approvals, transfer requirements, and seasonal demand.",
    nearbyCounties: ["st-lucie", "highlands", "glades", "martin"],
  },
  putnam: {
    primaryCities: ["Palatka", "Crescent City", "Interlachen"],
    introduction: "Putnam County is centered on Palatka and the St. Johns River, with manufacturing, lakes, fishing, outdoor recreation, local commerce, restaurants, and regional travel between Northeast and Central Florida.",
    marketOverview: "Putnam County's quota-license market serves several distinct communities rather than one large metro core. Buyers should evaluate the intended location, license category, current availability, seller terms, local approvals, transfer timing, and projected demand.",
    nearbyCounties: ["clay", "flagler", "st-johns", "marion"],
  },
  sumter: {
    primaryCities: ["The Villages", "Wildwood", "Bushnell"],
    introduction: "Sumter County includes major portions of The Villages as well as Wildwood and Bushnell, with rapid population growth, retirement communities, golf, retail, restaurants, healthcare, and Interstate 75 commerce.",
    marketOverview: "Sumter County's growth and large retirement-community presence create substantial food-and-beverage demand in selected areas. Buyers should compare quota-license pricing, location, transfer timing, premises approvals, local requirements, and the customer profile of the proposed concept.",
    nearbyCounties: ["lake", "marion", "citrus", "hernando"],
  },
  suwannee: {
    primaryCities: ["Live Oak", "Branford"],
    introduction: "Suwannee County is centered on Live Oak near the Interstate 10 and Interstate 75 corridors, with agriculture, springs, music and outdoor events, highway travel, local restaurants, and regional commerce.",
    marketOverview: "Suwannee County quota licenses may serve both local demand and interstate travelers. Buyers should independently confirm current license status, asking price, transferability, premises eligibility, local approvals, transfer timing, and the proposed business model.",
    nearbyCounties: ["columbia", "hamilton", "lafayette", "madison"],
  },
  taylor: {
    primaryCities: ["Perry", "Steinhatchee"],
    introduction: "Taylor County spans inland Perry and Gulf Coast communities such as Steinhatchee, with forestry, fishing, scalloping, outdoor recreation, local commerce, restaurants, and seasonal visitors supporting hospitality demand.",
    marketOverview: "Taylor County includes both year-round local demand and seasonal coastal tourism. Buyers should evaluate the intended location, quota-license availability, asking price, premises approvals, local requirements, transfer timing, and expected seasonality.",
    nearbyCounties: ["dixie", "lafayette", "madison", "jefferson"],
  },
  union: {
    primaryCities: ["Lake Butler"],
    introduction: "Union County is a small North Florida market centered on Lake Butler, with government employment, agriculture, local businesses, community restaurants, lakes, and regional travel supporting modest hospitality demand.",
    marketOverview: "Union County has a limited quota-license market where listings may be uncommon. Buyers should verify current supply, license category and status, intended premises, local approvals, transfer requirements, seller terms, and location-specific demand.",
    nearbyCounties: ["bradford", "alachua", "columbia", "baker"],
  },
  wakulla: {
    primaryCities: ["Crawfordville", "St. Marks", "Sopchoppy"],
    introduction: "Wakulla County lies south of Tallahassee and includes Crawfordville, St. Marks, and coastal recreation areas, with residential growth, springs, fishing, boating, restaurants, and nature-based tourism.",
    marketOverview: "Wakulla County's quota-license demand reflects both Tallahassee-area population growth and coastal recreation. Buyers should assess current availability, asking price, premises suitability, local approvals, license type, transfer timing, and seasonal demand.",
    nearbyCounties: ["leon", "jefferson", "franklin"],
  },
  walton: {
    primaryCities: ["DeFuniak Springs", "Santa Rosa Beach", "Freeport"],
    introduction: "Walton County ranges from DeFuniak Springs to the high-growth beaches and resort communities of South Walton, including the 30A corridor, with tourism, vacation rentals, dining, retail, and residential development driving hospitality demand.",
    marketOverview: "Walton County contains sharply different inland and coastal submarkets, with South Walton supporting a major tourism and restaurant economy. Buyers should compare license availability, asking price, intended premises, local approvals, transfer timing, and seasonal revenue patterns.",
    nearbyCounties: ["okaloosa", "holmes", "washington", "bay"],
  },
  washington: {
    primaryCities: ["Chipley", "Vernon"],
    introduction: "Washington County is a central Panhandle market centered on Chipley, with Interstate 10 access, agriculture, springs, outdoor recreation, local businesses, restaurants, and regional highway travel.",
    marketOverview: "Washington County quota-license opportunities serve a smaller regional market and may be offered infrequently. Buyers should confirm availability, license status, intended premises, local approvals, transfer requirements, seller terms, and expected customer demand.",
    nearbyCounties: ["holmes", "jackson", "bay", "walton"],
  },
};

export const floridaCounties: FloridaCounty[] = baseFloridaCounties.map((county) => {
  const override = seoOverrides[county.slug];
  return {
    ...county,
    ...(override ?? {}),
    indexable: true,
  };
});

export const indexableCounties = floridaCounties;
export const featuredCounties = floridaCounties.filter((county) => county.featured);

export function getCountyBySlug(slug: string) {
  return floridaCounties.find((county) => county.slug === slug);
}

export function getCountyByName(name: string) {
  return floridaCounties.find((county) => county.name === name);
}
