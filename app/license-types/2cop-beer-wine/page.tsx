import type { Metadata } from "next";
import LicenseTypeExplainerPage from "@/components/LicenseTypeExplainerPage";

export const metadata: Metadata = {
  title: "What Is a Florida 2COP Beer & Wine License? | FLLM",
  description: "Understand what a Florida 2COP beer and wine license is, what it allows, and what businesses commonly use it.",
  alternates: { canonical: "https://www.floridaliquorlicensemarket.com/license-types/2cop-beer-wine" },
};

export default function Page() {
  return <LicenseTypeExplainerPage
    code="2COP"
    title="Florida 2COP Beer & Wine License"
    eyebrow="Beer & Wine · On-Premises Consumption"
    definition="A Florida 2COP license allows a qualifying retail beverage establishment to sell beer and wine for consumption on the licensed premises. Package sales in sealed containers may also be allowed where permitted by applicable local ordinances and license conditions."
    plainEnglish="This is the common beer-and-wine license for restaurants, cafés, wine bars and similar businesses that want customers to drink beer or wine on site but do not need to sell distilled spirits."
    sells={["Beer for on-premises consumption", "Wine for on-premises consumption", "Sealed beer and wine package sales where permitted", "No distilled spirits under the 2COP privilege"]}
    businesses={["Restaurants that serve beer and wine", "Cafés", "Wine bars", "Casual dining concepts", "Other approved beer-and-wine hospitality operations"]}
    doesNot={["Permit the sale of distilled spirits such as vodka, rum, whiskey or tequila", "Operate as a full-liquor bar license", "Replace local zoning, wet/dry county or premises requirements", "Create a transferable quota asset comparable to a 4COP quota license"]}
    quotaNote="2COP is not a full-liquor quota license. Unlike 4COP quota and 3PS quota licenses, it is generally not limited by the county population quota system in the same way. Eligibility and premises requirements still apply."
    keyPoint="If the business only needs beer and wine and does not need spirits, a 2COP may be the simpler and less expensive license category to evaluate before considering a quota license."
    officialLabel="Beer and Wine Consumption on Premises (2COP)"
    officialHref="https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=7021&clientCode=4006&xactCode=1028"
    relatedHref="/resources/florida-liquor-license-types"
    relatedLabel="Compare All License Types"
  />;
}
