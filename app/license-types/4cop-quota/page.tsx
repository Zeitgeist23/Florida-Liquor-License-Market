import type { Metadata } from "next";
import LicenseTypeExplainerPage from "@/components/LicenseTypeExplainerPage";

export const metadata: Metadata = {
  title: "What Is a Florida 4COP Quota Liquor License? | FLLM",
  description: "Understand what a Florida 4COP quota liquor license is, how the 4COP series differs from the quota license itself, what it allows, and how inactive investment ownership works.",
  alternates: { canonical: "https://www.floridaliquorlicensemarket.com/license-types/4cop-quota" },
};

export default function Page() {
  return <LicenseTypeExplainerPage
    code="4COP Quota"
    title="Florida 4COP Quota Liquor License"
    eyebrow="Quota Full Liquor · Consumption on Premises"
    imageSrc="/assets/license-types-4cop.svg"
    imageAlt="Bar and lounge interior representing businesses that commonly use a Florida 4COP quota liquor license"
    definition="A Florida 4COP quota license is a county-limited full-liquor quota license recorded in the 4COP consumption-on-premises series. It can authorize beer, wine and distilled spirits for consumption on the licensed premises and, within its approved privileges, package sales for off-premises consumption."
    plainEnglish="Think of the quota license as the scarce county license interest and 4COP as the operating series used when that quota license is approved for full-liquor consumption on premises. That is why people commonly say they are buying a 4COP, even though the quota status and the 4COP series describe two different aspects of the license."
    sells={["Beer", "Wine", "Distilled spirits / liquor", "Alcoholic beverages for on-premises consumption", "Package sales within the approved quota-license privileges"]}
    businesses={["Bars and taverns", "Cocktail lounges", "Nightclubs", "Full-liquor hospitality concepts", "Restaurants that need a transferable quota license instead of a special restaurant license"]}
    doesNot={["Guarantee zoning approval for the proposed premises", "Allow use in a different county simply because the license is owned", "Replace DBPR transfer, change-of-series, or change-of-location approval", "Turn a 4COP-SFS / SRX special restaurant license into a transferable quota license"]}
    quotaNote="The word “quota” is important. Florida generally limits quota licenses to one for each 7,500 county residents, subject to the statutory quota system and exceptions. Existing quota licenses are therefore commonly bought and sold in the private market. The license remains county-specific."
    keyPoint="A 4COP quota license is not the same thing as a 4COP-SFS / SRX special restaurant license. The quota license is the transferable county-limited asset; 4COP is the consumption-on-premises series designation used for the quota license in the applicable population band."
    seriesClarification="A buyer should not think of “4COP quota” and “3PS quota” as completely unrelated assets. They are different series or use designations within Florida's quota-license system. DBPR provides a formal change-in-series-or-type process, so a quota license may be approved in a package-sales series or a consumption-on-premises series depending on the intended use, county and regulatory approvals. A change is not automatic."
    investmentNote="Yes—an eligible purchaser can acquire a transferable quota license without immediately operating a bar, restaurant or nightclub. If no approved operating location is ready, DBPR provides inactive or escrow procedures. The license cannot be used to sell alcoholic beverages while inactive, and Florida's renewal, qualification and active-operation requirements—including applicable waiver or extension procedures—still apply."
    officialLabel="Beer, Wine and Liquor Consumption on Premises (4COP) — Quota"
    officialHref="https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=7048&clientCode=4006&xactCode=1065"
    relatedHref="/florida-4cop-liquor-license-for-sale"
    relatedLabel="View 4COP Quota Licenses for Sale"
  />;
}
