const countyDescriptions: Record<string, string> = {
  "Alachua County": "Alachua County is anchored by Gainesville and the University of Florida, with a diverse economy supported by education, healthcare, research, and hospitality.",
  "Bay County": "Bay County in the Panhandle is home to Panama City and Panama City Beach, with a strong tourism, dining, and hospitality market.",
  "Brevard County": "Brevard County on Florida's Space Coast is home to Kennedy Space Center, aerospace employers, growing communities, and Atlantic beaches.",
  "Broward County": "Broward County anchors South Florida around Fort Lauderdale, known for its beaches, boating canals, dense population, dining, and nightlife.",
  "Charlotte County": "Charlotte County on the southwest Gulf Coast is home to Punta Gorda, with a growing population and strong boating, fishing, and hospitality activity.",
  "Citrus County": "Citrus County on Florida's Nature Coast is known for Crystal River, natural springs, waterfront recreation, and growing residential communities.",
  "Clay County": "Clay County lies southwest of Jacksonville and includes fast-growing suburban communities supported by military, retail, dining, and residential development.",
  "Collier County": "Collier County in Southwest Florida is home to Naples, known for affluent communities, golf, luxury tourism, dining, and access to the Everglades.",
  "DeSoto County": "DeSoto County is a rural south-central Florida market centered on Arcadia, with agriculture, cattle ranching, local commerce, and regional travel activity.",
  "Duval County": "Duval County is anchored by Jacksonville, a major port, finance, logistics, healthcare, sports, dining, and entertainment market.",
  "Escambia County": "Escambia County is the westernmost Panhandle county and home to Pensacola, with military, tourism, education, dining, and Gulf Coast activity.",
  "Hernando County": "Hernando County is a growing Nature Coast market north of Tampa, known for suburban development, springs, recreation, and expanding retail and dining demand.",
  "Hillsborough County": "Hillsborough County is anchored by Tampa, one of Florida's largest business, tourism, healthcare, sports, dining, and entertainment markets.",
  "Indian River County": "Indian River County on the Treasure Coast is centered on Vero Beach, with affluent coastal communities, tourism, boating, retail, and hospitality activity.",
  "Lake County": "Lake County in Central Florida, northwest of Orlando, is known for its chain of lakes, fast-growing communities, tourism, recreation, and suburban development.",
  "Lee County": "Lee County in Southwest Florida includes Fort Myers and Cape Coral, with rapid population growth, beaches, boating, tourism, and a large hospitality market.",
  "Leon County": "Leon County is home to Tallahassee, the state capital, with an economy supported by government, universities, healthcare, dining, and regional commerce.",
  "Manatee County": "Manatee County on Florida's Gulf Coast is home to Bradenton, with beaches, boating, tourism, residential growth, and expanding dining demand.",
  "Marion County": "Marion County is anchored by Ocala, known for horse farms, logistics, healthcare, residential growth, tourism, and regional commerce.",
  "Martin County": "Martin County on the Treasure Coast is known for boating, affluent coastal communities, protected shorelines, tourism, and a strong local dining market.",
  "Miami-Dade County": "Miami-Dade County is Florida's most populous county and a major international center for tourism, finance, trade, culture, dining, and nightlife.",
  "Monroe County": "Monroe County encompasses the Florida Keys, one of the state's strongest tourism, boating, fishing, dining, and hospitality markets.",
  "Okaloosa County": "Okaloosa County includes Destin and Fort Walton Beach, with major military installations, Gulf tourism, boating, dining, and hospitality activity.",
  "Orange County": "Orange County is anchored by Orlando, one of the world's leading tourism destinations and a major market for hotels, restaurants, entertainment, and conventions.",
  "Osceola County": "Osceola County is a fast-growing Central Florida market south of Orlando, anchored by Kissimmee and the region's tourism and hospitality corridor.",
  "Palm Beach County": "Palm Beach County stretches along Florida's southeast coast and features affluent communities, tourism, boating, dining, retail, and year-round population growth.",
  "Pasco County": "Pasco County is a rapidly growing Tampa Bay market with expanding suburban communities, retail centers, recreation, restaurants, and hospitality demand.",
  "Pinellas County": "Pinellas County includes St. Petersburg and Clearwater, with dense coastal communities, Gulf beaches, tourism, arts, dining, and nightlife.",
  "Polk County": "Polk County sits between Tampa and Orlando and is anchored by Lakeland, with logistics, manufacturing, tourism, residential growth, and regional commerce.",
  "Santa Rosa County": "Santa Rosa County includes Gulf Breeze, Navarre, and growing communities near Pensacola, supported by military, tourism, beaches, and residential development.",
  "Sarasota County": "Sarasota County is a Gulf Coast destination known for white-sand beaches, arts, culture, affluent communities, tourism, and a strong dining market.",
  "Seminole County": "Seminole County is a prosperous suburban market north of Orlando, known for strong schools, lakeside communities, retail, dining, and population growth.",
  "St. Johns County": "St. Johns County is home to historic St. Augustine and fast-growing coastal communities, with strong tourism, hospitality, schools, and residential development.",
  "St. Lucie County": "St. Lucie County on the Treasure Coast is home to Port St. Lucie, with rapid residential growth, coastal recreation, healthcare, retail, and hospitality activity.",
  "Volusia County": "Volusia County is home to Daytona Beach, with motorsports, Atlantic beaches, tourism, universities, dining, and growing residential communities.",
};

const countyPrincipalPlaces: Record<string, string[]> = {
  "Alachua County": ["Gainesville", "Alachua", "Newberry", "High Springs", "Hawthorne"],
  "Baker County": ["Macclenny", "Glen St. Mary"],
  "Bay County": ["Panama City", "Panama City Beach", "Lynn Haven", "Callaway", "Mexico Beach"],
  "Bradford County": ["Starke", "Lawtey", "Hampton", "Brooker"],
  "Brevard County": ["Palm Bay", "Melbourne", "Titusville", "Cocoa", "Rockledge", "Cocoa Beach"],
  "Broward County": ["Fort Lauderdale", "Hollywood", "Pembroke Pines", "Pompano Beach", "Coral Springs", "Miramar"],
  "Calhoun County": ["Blountstown", "Altha"],
  "Charlotte County": ["Punta Gorda", "Port Charlotte", "Englewood", "Rotonda West"],
  "Citrus County": ["Inverness", "Crystal River", "Homosassa", "Lecanto"],
  "Clay County": ["Orange Park", "Green Cove Springs", "Keystone Heights", "Penney Farms"],
  "Collier County": ["Naples", "Marco Island", "Everglades City", "Immokalee"],
  "Columbia County": ["Lake City", "Fort White"],
  "DeSoto County": ["Arcadia"],
  "Dixie County": ["Cross City", "Horseshoe Beach"],
  "Duval County": ["Jacksonville", "Jacksonville Beach", "Atlantic Beach", "Neptune Beach", "Baldwin"],
  "Escambia County": ["Pensacola", "Century", "Pensacola Beach", "Ferry Pass"],
  "Flagler County": ["Palm Coast", "Flagler Beach", "Bunnell", "Beverly Beach"],
  "Franklin County": ["Apalachicola", "Carrabelle"],
  "Gadsden County": ["Quincy", "Chattahoochee", "Havana", "Midway", "Gretna"],
  "Gilchrist County": ["Trenton", "Bell", "Fanning Springs"],
  "Glades County": ["Moore Haven", "Buckhead Ridge", "Lakeport"],
  "Gulf County": ["Port St. Joe", "Wewahitchka"],
  "Hamilton County": ["Jasper", "Jennings", "White Springs"],
  "Hardee County": ["Wauchula", "Bowling Green", "Zolfo Springs"],
  "Hendry County": ["Clewiston", "LaBelle"],
  "Hernando County": ["Brooksville", "Weeki Wachee", "Spring Hill"],
  "Highlands County": ["Sebring", "Avon Park", "Lake Placid"],
  "Hillsborough County": ["Tampa", "Plant City", "Temple Terrace", "Sun City Center"],
  "Holmes County": ["Bonifay", "Ponce de Leon", "Westville", "Esto", "Noma"],
  "Indian River County": ["Vero Beach", "Sebastian", "Fellsmere", "Indian River Shores", "Orchid"],
  "Jackson County": ["Marianna", "Graceville", "Sneads", "Cottondale", "Grand Ridge"],
  "Jefferson County": ["Monticello"],
  "Lafayette County": ["Mayo"],
  "Lake County": ["Clermont", "Leesburg", "Mount Dora", "Eustis", "Tavares", "Groveland"],
  "Lee County": ["Cape Coral", "Fort Myers", "Bonita Springs", "Sanibel", "Fort Myers Beach"],
  "Leon County": ["Tallahassee"],
  "Levy County": ["Williston", "Chiefland", "Cedar Key", "Bronson", "Inglis"],
  "Liberty County": ["Bristol"],
  "Madison County": ["Madison", "Lee", "Greenville"],
  "Manatee County": ["Bradenton", "Palmetto", "Anna Maria", "Holmes Beach", "Bradenton Beach"],
  "Marion County": ["Ocala", "Belleview", "Dunnellon", "McIntosh", "Reddick"],
  "Martin County": ["Stuart", "Indiantown", "Jupiter Island", "Sewall's Point"],
  "Miami-Dade County": ["Miami", "Miami Beach", "Hialeah", "Homestead", "Doral", "Coral Gables"],
  "Monroe County": ["Key West", "Marathon", "Islamorada", "Key Colony Beach", "Layton"],
  "Nassau County": ["Fernandina Beach", "Callahan", "Hilliard"],
  "Okaloosa County": ["Fort Walton Beach", "Destin", "Crestview", "Niceville", "Mary Esther"],
  "Okeechobee County": ["Okeechobee"],
  "Orange County": ["Orlando", "Apopka", "Winter Garden", "Ocoee", "Winter Park", "Maitland"],
  "Osceola County": ["Kissimmee", "St. Cloud"],
  "Palm Beach County": ["West Palm Beach", "Boca Raton", "Boynton Beach", "Delray Beach", "Jupiter", "Wellington"],
  "Pasco County": ["New Port Richey", "Dade City", "Zephyrhills", "Port Richey", "San Antonio"],
  "Pinellas County": ["St. Petersburg", "Clearwater", "Largo", "Dunedin", "Pinellas Park", "Tarpon Springs"],
  "Polk County": ["Lakeland", "Winter Haven", "Bartow", "Haines City", "Auburndale", "Lake Wales"],
  "Putnam County": ["Palatka", "Crescent City", "Interlachen", "Welaka", "Pomona Park"],
  "Santa Rosa County": ["Milton", "Gulf Breeze", "Navarre", "Jay"],
  "Sarasota County": ["Sarasota", "North Port", "Venice", "Longboat Key"],
  "Seminole County": ["Sanford", "Altamonte Springs", "Oviedo", "Winter Springs", "Lake Mary", "Casselberry"],
  "St. Johns County": ["St. Augustine", "St. Augustine Beach", "Ponte Vedra Beach", "Hastings"],
  "St. Lucie County": ["Port St. Lucie", "Fort Pierce", "St. Lucie Village"],
  "Sumter County": ["Wildwood", "Bushnell", "The Villages", "Coleman", "Webster"],
  "Suwannee County": ["Live Oak", "Branford"],
  "Taylor County": ["Perry", "Steinhatchee"],
  "Union County": ["Lake Butler", "Raiford", "Worthington Springs"],
  "Volusia County": ["Deltona", "Daytona Beach", "DeLand", "Ormond Beach", "New Smyrna Beach", "Port Orange"],
  "Wakulla County": ["Crawfordville", "Sopchoppy", "St. Marks"],
  "Walton County": ["DeFuniak Springs", "Freeport", "Paxton", "Miramar Beach", "Santa Rosa Beach"],
  "Washington County": ["Chipley", "Vernon", "Caryville", "Wausau", "Ebro"],
};

// U.S. Census Bureau Vintage 2024 county population estimates.
const countyPopulations2024: Record<string, number> = {
  "Alachua County": 291782,
  "Baker County": 29325,
  "Bay County": 199718,
  "Bradford County": 28075,
  "Brevard County": 658447,
  "Broward County": 2037472,
  "Calhoun County": 13278,
  "Charlotte County": 212122,
  "Citrus County": 170174,
  "Clay County": 236760,
  "Collier County": 416233,
  "Columbia County": 73977,
  "DeSoto County": 36744,
  "Dixie County": 17614,
  "Duval County": 1055159,
  "Escambia County": 331275,
  "Flagler County": 136744,
  "Franklin County": 12979,
  "Gadsden County": 44151,
  "Gilchrist County": 20233,
  "Glades County": 13132,
  "Gulf County": 15876,
  "Hamilton County": 14334,
  "Hardee County": 26068,
  "Hendry County": 46130,
  "Hernando County": 218150,
  "Highlands County": 109778,
  "Hillsborough County": 1581426,
  "Holmes County": 19876,
  "Indian River County": 172139,
  "Jackson County": 49980,
  "Jefferson County": 15921,
  "Lafayette County": 8640,
  "Lake County": 444204,
  "Lee County": 860959,
  "Leon County": 300488,
  "Levy County": 47765,
  "Liberty County": 7955,
  "Madison County": 18364,
  "Manatee County": 458352,
  "Marion County": 428905,
  "Martin County": 165666,
  "Miami-Dade County": 2838461,
  "Monroe County": 80908,
  "Nassau County": 104376,
  "Okaloosa County": 220483,
  "Okeechobee County": 42369,
  "Orange County": 1533646,
  "Osceola County": 468058,
  "Palm Beach County": 1582055,
  "Pasco County": 659114,
  "Pinellas County": 965870,
  "Polk County": 852878,
  "Putnam County": 77301,
  "St. Johns County": 334928,
  "St. Lucie County": 390670,
  "Santa Rosa County": 207653,
  "Sarasota County": 476604,
  "Seminole County": 494605,
  "Sumter County": 154693,
  "Suwannee County": 47536,
  "Taylor County": 21843,
  "Union County": 15738,
  "Volusia County": 602772,
  "Wakulla County": 37115,
  "Walton County": 89666,
  "Washington County": 26503,
};

type MarketplaceDescriptionInput = {
  county: string;
  licenseType?: string | null;
  licenseStatus?: string | null;
  preferredTiming?: string | null;
};

function licenseUseDescription(licenseType?: string | null) {
  if (licenseType?.startsWith("3PS")) {
    return "3PS quota privileges include package sales of beer, wine, and spirits for off-premises consumption, subject to applicable requirements and regulatory approval.";
  }
  if (licenseType?.includes("4COP")) {
    return "4COP quota privileges include sales of beer, wine, and spirits by the drink or in sealed containers for on- or off-premises consumption, subject to applicable requirements and regulatory approval.";
  }
  return "Allowable sales and uses depend on the approved Florida license classification and applicable regulatory requirements.";
}

export function sellerReportedStatusLabel(licenseStatus?: string | null) {
  return licenseStatus?.trim() || "Status to be confirmed";
}

export function countyListingDescription(county: string) {
  return countyDescriptions[county] ?? `${county || "This Florida county"} offers a mix of local commerce, residential communities, tourism, dining, and hospitality activity within Florida.`;
}

export function countyPrincipalPlacesLine(county: string) {
  const places = countyPrincipalPlaces[county];
  if (!places?.length) return "";
  return `Principal cities and communities: ${places.join(", ")}.`;
}

export function marketplaceListingDescriptionParts({
  county,
  licenseType,
}: MarketplaceDescriptionInput) {
  const population = countyPopulations2024[county];
  const countyDescription = countyListingDescription(county);
  const populatedCountyDescription = population && county
    ? countyDescription.replace(
        county,
        `${county} (estimated 2024 population ${population.toLocaleString("en-US")})`
      )
    : countyDescription;
  const cities = countyPrincipalPlacesLine(county);

  return {
    license: licenseUseDescription(licenseType),
    county: populatedCountyDescription,
    cities,
  };
}

export function marketplaceListingDescription(input: MarketplaceDescriptionInput) {
  const description = marketplaceListingDescriptionParts(input);
  return [description.license, description.county, description.cities]
    .filter(Boolean)
    .join(" ");
}
