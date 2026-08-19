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
    quotaNote="3PS-family licenses are part of Florida's county quota system for full-liquor package sales. Florida generally limits quota licenses by county population, which is why transferable quota licenses can have substantial private-market value in counties with limited supply."
    keyPoint="The quota license is the transferable county-limited license interest; 3PS is the package-sales series designation. A 3PS quota license should not be confused with non-quota beer-and-wine package licenses such as 2APS."
    seriesClarification="A 3PS-family quota series and a 4COP-family quota series describe different approved uses of a quota license—package sales versus consumption on premises. DBPR provides a formal change-in-series-or-type process, so a quota license may be presented in one series and later approved in another when the intended use and regulatory requirements support the change. The change is not automatic."
    investmentNote="Yes—an eligible purchaser can acquire a transferable quota license without immediately opening a liquor store. If no approved operating location is ready, DBPR provides inactive or escrow procedures. The license cannot be used to sell alcoholic beverages while inactive, and renewal, qualification and active-operation requirements—including applicable waiver or extension procedures—still apply."
    officialLabel="Beer, Wine and Liquor Package Sales (3PS family) — Quota"
    officialHref="https://www.myfloridalicense.com/intentions2.asp?boardid=400&chBoard=true&professionid=4006"
    relatedHref="/florida-3ps-liquor-license-for-sale"
    relatedLabel="View 3PS Quota Licenses for Sale"
  />;
}
