export type ListingSourceType = "Verified" | "Partner" | "Market";

export type Listing = {
  id: number;
  county: string;
  type: string;
  price: number;
  image: string;
  use: string;
  status: "Available" | "Under Contract" | "Sold" | "Withdrawn";
  transferable: boolean;
  featured?: boolean;
  sourceType: ListingSourceType;
  sourceName: string;
  sourceUrl?: string;
  firstSeen: string;
  lastVerified: string;
  externalId?: string;
};

export const listings: Listing[] = [
  { id: 1, county: "Miami-Dade County", type: "4COP Quota", price: 495000, image: "/images/listing-miami.jpg", use: "Restaurant / Bar", status: "Available", transferable: true, featured: true, sourceType: "Market", sourceName: "Public market source", sourceUrl: "#", firstSeen: "2026-07-18", lastVerified: "2026-07-18", externalId: "MKT-MIA-4COP-001" },
  { id: 2, county: "Palm Beach County", type: "4COP Quota", price: 575000, image: "/images/listing-palm-beach.jpg", use: "Restaurant / Bar", status: "Available", transferable: true, featured: true, sourceType: "Partner", sourceName: "Participating broker", firstSeen: "2026-07-18", lastVerified: "2026-07-18", externalId: "PTR-PBC-4COP-001" },
  { id: 3, county: "Sarasota County", type: "3PS Quota / Package Store", price: 340000, image: "/images/listing-sarasota.jpg", use: "Package / Retail", status: "Available", transferable: true, sourceType: "Market", sourceName: "Public market source", sourceUrl: "#", firstSeen: "2026-07-18", lastVerified: "2026-07-18", externalId: "MKT-SAR-3PS-001" },
  { id: 4, county: "Lee County", type: "4COP Quota", price: 425000, image: "/images/listing-lee.jpg", use: "Restaurant / Bar", status: "Under Contract", transferable: true, sourceType: "Market", sourceName: "Public market source", sourceUrl: "#", firstSeen: "2026-07-18", lastVerified: "2026-07-18", externalId: "MKT-LEE-4COP-001" },
  { id: 5, county: "St. Johns County", type: "4COP Quota", price: 950000, image: "/images/listing-palm-beach.jpg", use: "Restaurant / Bar", status: "Available", transferable: true, featured: true, sourceType: "Verified", sourceName: "Florida Liquor License Market", firstSeen: "2026-07-17", lastVerified: "2026-07-18", externalId: "FLLM-STJ-4COP-001" }
];
