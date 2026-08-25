export const countyValuationGuideSlugs = [
  "miami-dade",
  "broward",
  "palm-beach",
  "hillsborough",
  "orange",
  "pinellas",
  "duval",
  "lee",
  "collier",
  "sarasota",
  "st-johns",
] as const;

const countyValuationGuideSet = new Set<string>(countyValuationGuideSlugs);

export function isCountyValuationGuide(slug: string) {
  return countyValuationGuideSet.has(slug);
}

export function countyValuationGuideHref(slug: string) {
  return `/counties/${slug}/liquor-license-value`;
}
