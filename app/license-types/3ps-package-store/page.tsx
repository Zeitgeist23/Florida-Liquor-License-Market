import type { Metadata } from "next";
import LicenseTypeExplainerPage from "@/components/LicenseTypeExplainerPage";

export const metadata: Metadata = {
  title: "What Is a Florida 3PS Liquor License? | FLLM",
  description: "Understand what a Florida 3PS package-store liquor license is, what it allows, and what businesses use it.",
  alternates: { canonical: "https://www.floridaliquorlicensemarket.com/license-types/3ps-package-store" },
};

export default function Page() {
  return <LicenseTypeExplainerPage
    code="3PS"
    title="Florida 3PS Package Store Liquor License"
    eyebrow="Full Liquor · Package Sales"
    definition="A Florida 3PS license is a full-liquor package-sales license used for the retail sale of beer, wine and distilled spirits in sealed containers for consumption away from the licensed premises."
    plainEnglish="This is the liquor-store license. It is designed for package sales rather than serving cocktails or liquor for customers to consume on site."
    sells={["Beer in sealed containers", "Wine in sealed containers", "Distilled spirits / liquor in sealed containers", "Alcoholic beverages for off-premises consumption within the approved privileges"]}
    businesses={["Liquor stores", "Package stores", "Retail beverage stores focused on sealed alcohol sales", "Other approved package-sales operations"]}
    doesNot={["Allow customers to consume liquor on the licensed premises", "Function as a bar or nightclub license", "Replace local zoning or premises approval", "Allow the license to be moved freely from one county to another"]}
    quotaNote="3PS is part of Florida's quota-license system for full-liquor package sales. The quota system limits full-liquor licenses by county population, which is why 3PS licenses can have substantial private-market value in counties with limited supply."
    keyPoint="If the business is primarily selling bottles of liquor, wine and beer to take away, rather than serving drinks for consumption on site, 3PS is the license category to understand."
    officialLabel="Beer, Wine and Liquor Package Sales (3PS)"
    officialHref="https://www.myfloridalicense.com/intentions2.asp?boardid=400&chBoard=true&professionid=4006"
    relatedHref="/florida-3ps-liquor-license-for-sale"
    relatedLabel="View 3PS Licenses for Sale"
  />;
}
