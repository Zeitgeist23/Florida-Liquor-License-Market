import type { Metadata } from "next";
import LicenseTypeExplainerPage from "@/components/LicenseTypeExplainerPage";

export const metadata: Metadata = {
  title: "What Is a Florida 4COP Quota Liquor License? | FLLM",
  description: "Understand what a Florida 4COP quota liquor license is, what it allows, what businesses use it, and how quota licensing works.",
  alternates: { canonical: "https://www.floridaliquorlicensemarket.com/license-types/4cop-quota" },
};

export default function Page() {
  return <LicenseTypeExplainerPage
    code="4COP"
    title="Florida 4COP Quota Liquor License"
    eyebrow="Full Liquor · On-Premises Consumption"
    definition="A Florida 4COP quota license is a full-liquor retail beverage license that allows the sale of beer, wine and distilled spirits for consumption on the licensed premises, subject to the license, premises and local requirements."
    plainEnglish="This is the license most people mean when they say they need a full liquor license for a bar, lounge, nightclub or other business that wants to sell cocktails and spirits by the drink."
    sells={["Beer", "Wine", "Distilled spirits / liquor", "Alcoholic beverages for on-premises consumption within the approved privileges"]}
    businesses={["Bars and taverns", "Cocktail lounges", "Nightclubs", "Full-liquor hospitality concepts", "Restaurants that do not qualify for or do not use a special restaurant license"]}
    doesNot={["Guarantee zoning approval for the proposed premises", "Allow use in a different county simply because the license is owned", "Replace DBPR transfer or change-of-location approval", "Automatically make every restaurant concept eligible for every form of full-liquor operation"]}
    quotaNote="A standard 4COP quota license is limited by county population. Florida law generally limits quota licenses to one for each 7,500 county residents, subject to the statutory quota system and exceptions. Because supply is limited, existing quota licenses are commonly bought and sold in the private market."
    keyPoint="If the business needs to sell beer, wine and spirits by the drink and it is relying on a transferable county quota license rather than a special statutory exception, 4COP is the core license category to understand."
    officialLabel="Beer, Wine and Liquor Consumption on Premises (4COP)"
    officialHref="https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=7048&clientCode=4006&xactCode=1065"
    relatedHref="/florida-4cop-liquor-license-for-sale"
    relatedLabel="View 4COP Licenses for Sale"
  />;
}
