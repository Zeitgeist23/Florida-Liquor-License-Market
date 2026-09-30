import type { RestaurantCuisine } from "@/lib/business-quota-listings";

export type RestaurantCuisineDefinition = {
  slug: string;
  label: RestaurantCuisine;
  shortDescription: string;
  searchTerms: readonly string[];
};

export const restaurantCuisines: readonly RestaurantCuisineDefinition[] = [
  {
    slug: "italian",
    label: "Italian",
    shortDescription:
      "Browse Florida Italian restaurant opportunities with quota, SFS / SRX, and beer-and-wine license structures.",
    searchTerms: [
      "Italian restaurants for sale in Florida",
      "Italian restaurant for sale Florida",
      "Italian restaurants for sale with liquor license",
      "Italian restaurants for sale in Broward County",
    ],
  },
  {
    slug: "mexican",
    label: "Mexican",
    shortDescription:
      "Browse Florida Mexican restaurant opportunities and compare the liquor-license structure included with each business.",
    searchTerms: [
      "Mexican restaurants for sale in Florida",
      "Mexican restaurant for sale Florida",
      "Mexican restaurants for sale with liquor license",
    ],
  },
  {
    slug: "latin",
    label: "Latin",
    shortDescription:
      "Browse Florida Latin restaurant opportunities with clearly identified quota and restaurant-license structures.",
    searchTerms: [
      "Latin restaurants for sale in Florida",
      "Latin restaurant for sale Florida",
      "Latin restaurants for sale with liquor license",
    ],
  },
  {
    slug: "peruvian",
    label: "Peruvian",
    shortDescription:
      "Browse Florida Peruvian restaurant opportunities and compare beer, wine, and full-liquor licensing structures.",
    searchTerms: [
      "Peruvian restaurants for sale in Florida",
      "Peruvian restaurant for sale Florida",
    ],
  },
  {
    slug: "mediterranean",
    label: "Mediterranean",
    shortDescription:
      "Browse Florida Mediterranean restaurant opportunities and compare the alcoholic-beverage license structure attached to each listing.",
    searchTerms: [
      "Mediterranean restaurants for sale in Florida",
      "Mediterranean restaurant for sale Florida",
    ],
  },
  {
    slug: "sushi",
    label: "Sushi",
    shortDescription:
      "Browse Florida sushi restaurant opportunities with beer-and-wine or other alcoholic-beverage license structures.",
    searchTerms: [
      "sushi restaurants for sale in Florida",
      "sushi restaurant for sale Florida",
    ],
  },
] as const;

export function getRestaurantCuisineDefinition(slug: string) {
  return restaurantCuisines.find((cuisine) => cuisine.slug === slug);
}

export function restaurantCuisineHref(slug: string) {
  return `/restaurants-for-sale/${slug}`;
}
