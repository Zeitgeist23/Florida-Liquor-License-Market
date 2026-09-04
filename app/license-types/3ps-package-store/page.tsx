import type { Metadata } from "next";
import LicenseTypeExplainerPage from "@/components/LicenseTypeExplainerPage";

export const metadata: Metadata = {
  title: "What Is a Florida 3PS Quota Liquor License? | FLLM",
  description: "Understand what a Florida 3PS quota liquor license is, how the 3PS series relates to the quota license itself, what it allows, and how inactive investment ownership works.",
  alternates: { canonical: "https://www.floridaliquorlicensemarket.com/license-types/3ps-package-store" },
};

export default function Page() {
  return <LicenseTypeExplainerPage
    code="3PS Quota"
    title="Florida 3PS Quota Package Store License"
    eyebrow="Quota Full Liquor · Package Sales"
    imageSrc="https://images.pexels.com/photos/35474950/pexels-photo-35474950/free-photo-of-cozy-wine-shop-display-with-variety.jpeg?auto=compress&dpr=1&h=1000&w=1800"
    imageAlt="Sharp liquor and wine store interior representing package-store businesses that commonly use a Florida 3PS quota liquor license"
    definition="A Florida 3PS quota license is a county-limited full-liquor quota license recorded in a package-sales series. It is used for retail sales of beer, wine and distilled spirits in sealed containers for consumption away from the licensed premises."
    plainEnglish="Think of the quota license as the scarce county license interest and 3PS as the package-sales series used when that quota license is approved for a liquor store or other qualifying off-premises retail operation."
    sells={["Beer in sealed containers", "Wine in sealed containers", "Distilled spirits / liquor in sealed containers", "Alcoholic beverages for off-premises consumption within the approved privileges"]}
    businesses={["Liquor stores", "Package stores", "Retail beverage stores focused on sealed alcohol sales", "Other approved package-sales operations"]}
    doesNot={["Allow customers to consume liquor on the licensed premises", "Function as a bar or nightclub license while held in a 3PS package-sales series", "Replace local zoning or premises approval", "Allow the license to be moved freely from one county to another"]}
    requirementCards={[
      { label: "Food-sales requirement", value: "No statewide 51% restaurant test", detail: "A 3PS package-store quota license is not qualified through the special restaurant food-revenue test.", href: "https://www2.myfloridalicense.com/abt/rules_statutes/license_types.pdf", linkLabel: "Official ABT license types ↗" },
      { label: "Minimum store size", value: "No SRX 2,000 sq. ft. minimum", detail: "There is no universal statewide 2,000-square-foot requirement merely because the license is a 3PS-family quota license. Local building and retail-use requirements still apply.", href: "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599%2F0565%2FSections%2F0565.04.html", linkLabel: "Package-store statute ↗" },
      { label: "Minimum seating", value: "No restaurant seating test", detail: "A 3PS is designed for package sales for off-premises consumption, so the SRX restaurant seating threshold is not the relevant qualification.", href: "/license-types/4cop-sfs-restaurant", linkLabel: "Compare SFS/SRX requirements ›" },
      { label: "Core privilege", value: "Sealed beer · wine · spirits", detail: "The license supports full-liquor package sales for off-premises consumption within the approved license and premises rules.", href: "https://www2.myfloridalicense.com/abt/rules_statutes/license_types.pdf", linkLabel: "Official ABT license types ↗" }
    ]}
    requirementsText="The 3PS-family quota license is a package-sales license, not a special restaurant license. Food-revenue, restaurant square-footage and restaurant seating tests do not define the basic 3PS qualification, but the proposed liquor-store premises still must satisfy state and local requirements."
    requirementsCaution="Package-store separation, access, zoning, distance, signage, building, fire and other premises rules may apply. Confirm the exact address and series with DBPR and the local jurisdiction before relying on a location."
    officialResources={[
      { href: "https://www.myfloridalicense.com/intentions2.asp?boardid=400&chBoard=true&professionid=4006", label: "DBPR / ABT Alcoholic Beverage Licensing", description: "Official DBPR licensing entry point for quota and package-sales alcoholic-beverage applications." },
      { href: "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599%2F0565%2FSections%2F0565.04.html", label: "Florida Statute §565.04 — Package Stores", description: "Official statutory restrictions governing package-store premises and package liquor sales." },
      { href: "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599%2F0561%2FSections%2F0561.20.html", label: "Florida Statute §561.20 — Quota System", description: "Read the county quota framework that makes 3PS-family full-liquor licenses supply-limited." },
      { href: "/dbpr-abt-6002", label: "FLLM ABT-6002 Transfer Guide", description: "Review the principal DBPR transfer application used when ownership of a quota license changes." }
    ]}
    quotaNote="3PS-family licenses are part of Florida's county quota system for full-liquor package sales. Florida generally limits quota licenses by county population, which is why transferable quota licenses can have substantial private-market value in counties with limited supply."
    keyPoint="The quota license is the transferable county-limited license interest; 3PS is the package-sales series designation. A 3PS quota license should not be confused with non-quota beer-and-wine package licenses such as 2APS."
    seriesClarification="A 3PS-family quota series and a 4COP-family quota series describe different approved uses of a quota license—package sales versus consumption on premises. DBPR provides a formal change-in-series-or-type process, so a quota license may be presented in one series and later approved in another when the intended use and regulatory requirements support the change. The change is not automatic."
    investmentNote="Yes—an eligible purchaser can acquire a transferable quota license without immediately opening a liquor store. If no approved operating location is ready, DBPR provides inactive or escrow procedures. The license cannot be used to sell alcoholic beverages while inactive, and renewal, qualification and active-operation requirements—including applicable waiver or extension procedures—still apply."
    officialLabel="Beer, Wine and Liquor Package Sales (3PS family) — Quota"
    officialHref="https://www.myfloridalicense.com/intentions2.asp?boardid=400&chBoard=true&professionid=4006"
    relatedHref="/florida-3ps-liquor-license-for-sale"
    relatedLabel="View 3PS Quota Licenses for Sale"
    ruleUpdateLinks={[
      { href: "/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs", label: "Florida restaurant-license reform and why it differs from 3PS", description: "See the current special restaurant requirements and why they do not define a package-store quota license." },
      { href: "/florida-liquor-license-news/florida-cocktails-to-go-sb-148-current-law", label: "Restaurant alcohol-to-go rules vs. package-store privileges", description: "Compare restaurant to-go authority with the separate package-sales privileges of a 3PS-family quota license." }
    ]}
    researchLinks={[
      { href: "/license-types/4cop-quota", label: "Compare With 4COP Quota", description: "Compare package-store use with a full-liquor consumption-on-premises quota series." },
      { href: "/resources/florida-liquor-license-laws#current-developments", label: "Florida Liquor License Laws", description: "Review official statutes, DBPR sources and current regulatory developments." },
      { href: "/resources/forms", label: "Florida ABT Forms Center", description: "Open FLLM's organized ABT forms and application resources." }
    ]}
  />;
}
