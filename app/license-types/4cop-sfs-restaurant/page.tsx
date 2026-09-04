import type { Metadata } from "next";
import LicenseTypeExplainerPage from "@/components/LicenseTypeExplainerPage";

export const metadata: Metadata = {
  title: "What Is a Florida 4COP-SFS Restaurant License? | FLLM",
  description: "Understand Florida's 4COP-SFS special restaurant liquor license, what it allows, who may qualify, and how it differs from a quota license.",
  alternates: { canonical: "https://www.floridaliquorlicensemarket.com/license-types/4cop-sfs-restaurant" },
};

export default function Page() {
  return <LicenseTypeExplainerPage
    code="4COP-SFS"
    title="Florida 4COP-SFS Special Restaurant Liquor License"
    eyebrow="Full Liquor · Qualifying Restaurant"
    imageSrc="https://images.pexels.com/photos/12387901/pexels-photo-12387901.jpeg?auto=compress&dpr=1&h=1000&w=1800"
    imageAlt="Sharp full-service restaurant interior representing businesses that commonly use a Florida 4COP-SFS special restaurant liquor license"
    definition="A Florida 4COP-SFS is a special full-liquor license for a qualifying food-service restaurant. It permits beer, wine and distilled spirits for consumption on the licensed premises when the restaurant meets the statutory and DBPR qualification requirements."
    plainEnglish="This is the special full-liquor restaurant route. A qualifying restaurant may be able to serve cocktails, beer and wine without buying a transferable county quota license, but the business must continue to satisfy the special restaurant requirements."
    sells={["Beer for on-premises consumption", "Wine for on-premises consumption", "Distilled spirits / liquor for on-premises consumption", "Full-liquor restaurant service within the special-license privileges"]}
    businesses={["Qualifying full-service restaurants", "Food-service establishments that meet the statutory special-license criteria", "Restaurant concepts that want full liquor without purchasing a quota license, if eligible"]}
    doesNot={["Automatically qualify every restaurant for a full-liquor license", "Create the same freely marketable quota asset as a standard 4COP quota license", "Eliminate food-service, premises or other statutory qualification requirements", "Allow the license to be treated as a general-purpose bar or nightclub license"]}
    requirementCards={[
      { label: "Food & nonalcoholic revenue", value: "At least 51%", detail: "The qualifying restaurant must generally derive at least 51% of gross food-and-beverage revenue from food and nonalcoholic beverages under the current statewide special food service framework.", href: "/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs", linkLabel: "Read FLLM's current-rule explanation ›" },
      { label: "Minimum service area", value: "At least 2,000 sq. ft.", detail: "Current statewide law generally requires at least 2,000 square feet of service area for the qualifying special food service establishment.", href: "/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs", linkLabel: "Read FLLM's current-rule explanation ›" },
      { label: "Meal-service capacity", value: "120 people at one time", detail: "The establishment must generally be equipped to serve meals to at least 120 persons at one time under the current statewide standard.", href: "/resources/florida-liquor-license-laws#current-developments", linkLabel: "Review the FLLM law summary ›" },
      { label: "Physical seating", value: "At least 120 seats", detail: "The current statewide framework generally requires at least 120 physical seats, subject to applicable law and any special local act.", href: "/florida-liquor-license-news/orlando-special-food-service-liquor-license-hb-1447-hb-1647", linkLabel: "See local-act differences inside FLLM ›" }
    ]}
    requirementsText="Florida reduced the statewide special restaurant size and seating thresholds in 2023. The current general-law framework is commonly described as 2,000 square feet of service area, capacity to serve meals to 120 persons at one time, at least 120 physical seats, and at least 51% of gross food-and-beverage revenue from food and nonalcoholic beverages."
    requirementsCaution="Special local acts can create different qualification rules in particular areas, including parts of Orlando. FLLM summarizes those differences and the current statewide rule on this page and in the related News and Laws resources below."
    officialResources={[
      { href: "/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs", label: "FLLM 2023 Statewide SFS Reform Guide", description: "Read FLLM's explanation of the current 51% revenue, 2,000-square-foot and 120-seat statewide restaurant framework." },
      { href: "/resources/florida-liquor-license-laws#current-developments", label: "FLLM Special Restaurant Law Summary", description: "Review the statewide restaurant exception and connected beverage-law developments in plain English." },
      { href: "/florida-liquor-license-news/orlando-special-food-service-liquor-license-hb-1447-hb-1647", label: "FLLM Orlando Special Restaurant Rules", description: "See how Orlando's special local acts create different qualification paths for certain smaller restaurants." },
      { href: "/resources/forms", label: "FLLM Florida ABT Forms Center", description: "Browse FLLM's organized application and licensing forms for Florida alcoholic-beverage matters." }
    ]}
    quotaNote="4COP-SFS is a special license rather than a standard transferable quota license. Its availability depends on the restaurant meeting the applicable statutory and regulatory qualifications. Because it is tied to those qualifications, it is fundamentally different from buying a county quota license as a standalone market asset."
    keyPoint="A restaurant that qualifies for 4COP-SFS may not need to purchase a costly 4COP quota license. A bar, nightclub, lounge or restaurant that does not qualify for the special-license route may instead need a quota license for full-liquor privileges."
    officialLabel="Beer, Wine and Liquor Consumption on Premises — Special Food Service / Restaurant"
    officialHref="/resources/florida-liquor-license-laws#current-developments"
    relatedHref="/license-types/4cop-quota"
    relatedLabel="Compare With 4COP Quota"
    ruleUpdateLinks={[
      { href: "/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs", label: "How Florida changed the special restaurant liquor-license requirements", description: "Review the 2023 statewide reform that lowered the restaurant size and seating thresholds while retaining the food-revenue requirement." },
      { href: "/florida-liquor-license-news/orlando-special-food-service-liquor-license-hb-1447-hb-1647", label: "Orlando special restaurant zones and local-act rules", description: "See how the 2018 and 2021 Orlando local acts create different qualification paths for certain smaller restaurants." },
      { href: "/florida-liquor-license-news/florida-cocktails-to-go-sb-148-current-law", label: "Florida cocktails-to-go: current restaurant rules", description: "See how current law governs sealed restaurant alcohol-to-go sales, food orders, packaging and delivery." }
    ]}
    researchLinks={[
      { href: "/resources/florida-liquor-license-laws#current-developments", label: "Florida Liquor License Laws", description: "Open FLLM's statewide-law summary and connected special-act explanations." },
      { href: "/license-types/4cop-quota", label: "Compare With 4COP Quota", description: "Compare the qualification-based restaurant license with a transferable county quota license." },
      { href: "/florida-liquor-license-news", label: "FLLM Liquor License News", description: "Browse FLLM's continuing coverage of Florida beverage-law changes, cases and licensing developments." }
    ]}
  />;
}
