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
    imageSrc="https://images.pexels.com/photos/6309831/pexels-photo-6309831.jpeg?auto=compress&dpr=1&h=1000&w=1800"
    imageAlt="Sharp restaurant and wine-bar interior representing businesses that commonly use a Florida 2COP beer and wine license"
    definition="A Florida 2COP license allows a qualifying retail beverage establishment to sell beer and wine for consumption on the licensed premises. Package sales in sealed containers may also be allowed where permitted by applicable local ordinances and license conditions."
    plainEnglish="This is the common beer-and-wine license for restaurants, cafés, wine bars and similar businesses that want customers to drink beer or wine on site but do not need to sell distilled spirits."
    sells={["Beer for on-premises consumption", "Wine for on-premises consumption", "Sealed beer and wine package sales where permitted", "No distilled spirits under the 2COP privilege"]}
    businesses={["Restaurants that serve beer and wine", "Cafés", "Wine bars", "Casual dining concepts", "Other approved beer-and-wine hospitality operations"]}
    doesNot={["Permit the sale of distilled spirits such as vodka, rum, whiskey or tequila", "Operate as a full-liquor bar license", "Replace local zoning, wet/dry county or premises requirements", "Create a transferable quota asset comparable to a 4COP quota license"]}
    requirementCards={[
      { label: "Food-sales requirement", value: "No statewide SRX 51% test", detail: "A standard 2COP is not qualified through the special full-liquor restaurant 51% food-and-nonalcoholic-beverage revenue test.", href: "https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=7021&clientCode=4006&xactCode=1028", linkLabel: "Official 2COP checklist ↗" },
      { label: "Minimum service area", value: "No SRX 2,000 sq. ft. minimum", detail: "The special restaurant 2,000-square-foot threshold is not the general statewide qualification for a 2COP beer-and-wine license.", href: "https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=7021&clientCode=4006&xactCode=1028", linkLabel: "Official 2COP checklist ↗" },
      { label: "Minimum seating", value: "No SRX 120-seat minimum", detail: "The special full-liquor restaurant seating test does not define ordinary 2COP eligibility. Local occupancy and premises requirements still matter.", href: "/license-types/4cop-sfs-restaurant", linkLabel: "Compare SFS/SRX requirements ›" },
      { label: "Core privilege", value: "Beer & wine", detail: "A 2COP supports beer-and-wine service for on-premises consumption and may permit sealed beer-and-wine sales within the approved privileges; it does not include distilled spirits.", href: "https://www2.myfloridalicense.com/abt/rules_statutes/license_types.pdf", linkLabel: "Official ABT license types ↗" }
    ]}
    requirementsText="A 2COP is a non-quota beer-and-wine license. The statewide 4COP-SFS/SRX restaurant revenue, square-footage and seating qualification tests are not the general eligibility tests for 2COP."
    requirementsCaution="The absence of SRX thresholds does not mean every premises qualifies. Zoning, building, fire, health, occupancy, wet/dry status and other local or state requirements may still apply to the exact location and business model."
    officialResources={[
      { href: "https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=7021&clientCode=4006&xactCode=1028", label: "DBPR / ABT 2COP Checklist", description: "Official checklist for beer-and-wine consumption-on-premises licensing." },
      { href: "https://www2.myfloridalicense.com/abt/rules_statutes/license_types.pdf", label: "Official ABT License Types Chart", description: "Compare the privileges of Florida retail alcoholic-beverage license categories in DBPR's own chart." },
      { href: "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599%2F0561%2FSections%2F0561.17.html", label: "Florida Statute §561.17 — Premises & Applications", description: "Review statutory application and premises requirements that still apply even when SRX restaurant thresholds do not." },
      { href: "/resources/forms", label: "FLLM Florida ABT Forms Center", description: "Open FLLM's organized collection of application, transfer and licensing forms." }
    ]}
    quotaNote="2COP is not a full-liquor quota license. Unlike 4COP quota and 3PS quota licenses, it is generally not limited by the county population quota system in the same way. Eligibility and premises requirements still apply."
    keyPoint="If the business only needs beer and wine and does not need spirits, a 2COP may be the simpler and less expensive license category to evaluate before considering a quota license."
    officialLabel="Beer and Wine Consumption on Premises (2COP)"
    officialHref="https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=7021&clientCode=4006&xactCode=1028"
    relatedHref="/resources/florida-liquor-license-types"
    relatedLabel="Compare All License Types"
    ruleUpdateLinks={[
      { href: "/florida-liquor-license-news/florida-2cop-beer-wine-license-statewide-access-market-context", label: "2COP statewide access and market context", description: "Review the current non-quota 2COP framework and separate statewide licensing rules from market commentary." },
      { href: "/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs", label: "How the special restaurant rules changed", description: "Compare 2COP with the current 4COP-SFS/SRX full-liquor restaurant thresholds." },
      { href: "/florida-liquor-license-news/florida-cocktails-to-go-sb-148-current-law", label: "Florida cocktails-to-go current law", description: "See the separate restaurant alcohol-to-go rules that can apply to qualifying food-service operations." }
    ]}
    researchLinks={[
      { href: "/resources/florida-liquor-license-laws#current-developments", label: "Florida Liquor License Laws", description: "Review official statutes, DBPR sources, and connected regulatory updates." },
      { href: "/license-types/4cop-quota", label: "Compare With 4COP Quota", description: "See why a county quota license has different privileges, scarcity, and market value." },
      { href: "/resources/forms", label: "Florida ABT Forms Center", description: "Open FLLM's organized ABT application and licensing resources." }
    ]}
  />;
}
