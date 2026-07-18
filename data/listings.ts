export type Listing = {
  id: number;
  county: string;
  type: string;
  price: number;
  image: string;
  use: string;
  status: "Available" | "Under Contract";
  transferable: boolean;
  featured?: boolean;
};

export const listings: Listing[] = [
  { id: 1, county: "Miami-Dade County", type: "4COP Quota", price: 495000, image: "/images/listing-miami.jpg", use: "Restaurant / Bar", status: "Available", transferable: true, featured: true },
  { id: 2, county: "Palm Beach County", type: "4COP Quota", price: 575000, image: "/images/listing-palm-beach.jpg", use: "Restaurant / Bar", status: "Available", transferable: true, featured: true },
  { id: 3, county: "Sarasota County", type: "3PS License", price: 340000, image: "/images/listing-sarasota.jpg", use: "Package / Retail", status: "Available", transferable: true },
  { id: 4, county: "Lee County", type: "4COP Quota", price: 425000, image: "/images/listing-lee.jpg", use: "Restaurant / Bar", status: "Under Contract", transferable: true },
  { id: 5, county: "St. Johns County", type: "4COP Quota", price: 950000, image: "/images/listing-palm-beach.jpg", use: "Restaurant / Bar", status: "Available", transferable: true, featured: true },
  { id: 6, county: "Orange County", type: "2COP License", price: 185000, image: "/images/listing-miami.jpg", use: "Beer / Wine Restaurant", status: "Available", transferable: false }
];
