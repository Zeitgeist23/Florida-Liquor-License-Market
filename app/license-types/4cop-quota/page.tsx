import type { Metadata } from "next";
import LicenseTypeExplainerPage from "@/components/LicenseTypeExplainerPage";
import LicenseTypeCountyDirectory from "@/components/LicenseTypeCountyDirectory";

export const metadata: Metadata = {
  title: "What Is a Florida 4COP Quota Liquor License? | FLLM",
  description: "Understand what a Florida 4COP quota liquor license is, what it allows, how it can potentially change to a 3PS quota package-sales series with DBPR approval, and how inactive ownership works.",
  alternates: { canonical: "https://www.floridaliquorlicensemarket.com/license-types/4cop-quota" },
};

export default function Page() {
  return <>
    <LicenseTypeExplainerPage
      code="4COP Quota"
      title="Florida 4COP Quota Liquor License"
      eyebrow="Quota Full Liquor · Consumption on Premises"
      imageSrc="https://images.pexels.com/photos/18675118/pexels-photo-18675118/free-photo-of-interior-of-a-bar.jpeg?auto=compress&dpr=1&h=1000&w=1800"
      imageAlt="Sharp interior view of a bar and lounge representing businesses that commonly use a Florida 4COP quota liquor license"
      definition="A Florida 4COP quota license is a county-limited full-liquor quota license recorded in the 4COP consumption-on-premises series. It can authorize beer, wine and distilled spirits for consumption on the licensed premises and, within its approved privileges, package sales for off-premises consumption."
      populationRule={{ text: "Florida’s quota system generally makes one additional quota license available for each increase of 7,500 residents in a county, subject to the statute’s census baseline and exceptions.", href: "https://www.flsenate.gov/Laws/Statutes/2025/561.20", citation: "Fla. Stat. § 561.20(1)(a)" }}
      plainEnglish="Think of the quota license as the scarce county license interest and 4COP as the operating series used when that quota license is approved for full-liquor consumption on premises. That is why people commonly say they are buying a 4COP, even though the quota status and 4COP series describe different aspects of the license."
      plainEnglishHighlights={["quota status", "4COP series"]}
      seriesMeaning="In 4COP, COP stands for Consumption on Premises."
      organizedSummary
      sells={["Beer", "Wine", "Distilled spirits / liquor", "Alcoholic beverages for on-premises consumption", "Package sales within the approved quota-license privileges"]}
      businesses={["Restaurants using a transferable quota license", "Bars and taverns", "Cocktail lounges", "Nightclubs", "Gentlemen's clubs", "Marinas", "Sports bars", "Country clubs", "Bowling alleys", "Hotels & motels", "Casinos", "Resorts", "Pubs", "Breweries", "Full-liquor hospitality concepts"]}
      doesNot={["Guarantee zoning approval for the proposed premises", "Allow use in a different county simply because the license is owned", "Replace DBPR transfer, change-of-series, or change-of-location approval", "Turn a 4COP-SFS special restaurant license into a transferable quota license"]}
      requirementCards={[
        { label: "Food-sales requirement", value: "No statewide SFS 51% test", detail: "A quota 4COP is not conditioned on the special restaurant 51% food-and-nonalcoholic-beverage revenue test merely because it is a 4COP quota license.", href: "/resources/florida-liquor-license-laws#current-developments", linkLabel: "Read the FLLM rule explanation ›" },
        { label: "Minimum service area", value: "No SFS 2,000 sq. ft. minimum", detail: "There is no general statewide 2,000-square-foot restaurant qualification merely to hold a quota 4COP. Local premises, building, fire and zoning rules still apply.", href: "/license-types/4cop-sfs-restaurant", linkLabel: "Compare the 4COP-SFS rule ›" },
        { label: "Minimum seating", value: "No SFS 120-seat minimum", detail: "The special restaurant seating threshold does not define eligibility for a standard transferable quota 4COP. Occupancy and local use approvals remain separate issues.", href: "/license-types/4cop-sfs-restaurant", linkLabel: "Compare the 4COP-SFS rule ›" },
        { label: "Core privilege", value: "Beer · wine · spirits", detail: "Full-liquor consumption-on-premises privileges may be paired with package sales within the approved quota-license series and premises configuration.", href: "/resources/florida-liquor-license-types", linkLabel: "Compare privileges inside FLLM ›" }
      ]}
      requirementsText="The 4COP quota license is often more flexible than the special restaurant route because its statewide qualification is not based on the 4COP-SFS restaurant revenue, square-footage and seating thresholds. That flexibility does not eliminate zoning, premises or DBPR approval requirements."
      requirementNotes={[
        { title: "SFS terminology", text: "SFS means Special Food Service. The current designation is 4COP-SFS; “SRX” is the older designation still found in legacy records and industry shorthand." },
        { title: "Local approvals still apply", text: "County or municipal zoning, distance, occupancy, parking, health, fire and premises requirements may still materially affect a proposed location." }
      ]}
      seriesChangeSection={{
        eyebrow: "4COP ↔ 3PS Series Change",
        heading: "Can a 4COP quota license be changed to a 3PS quota license?",
        intro: "Potentially, yes. Florida treats both the 4COP-family consumption-on-premises licenses and the 3PS-family package-sales licenses as quota-license series. DBPR provides a formal change-in-series-or-type process, but the change is not automatic and the requested series must fit the county, premises, intended use and current licensing requirements.",
        points: [
          {
            title: "What changes",
            text: "The approved operating series changes from consumption on premises to package sales. In a county where the applicable labels are 4COP and 3PS, the practical change is from full-liquor on-premises privileges to a full-liquor package-store series for sealed off-premises sales."
          },
          {
            title: "The quota status is still the key asset characteristic",
            text: "A series-change application does not create a new quota license. The underlying license remains subject to Florida's county quota system, and the requested series is still subject to DBPR approval and the applicable population-tier designation."
          },
          {
            title: "Existing owner: ABT-6014",
            text: "DBPR identifies ABT-6014 as the Change of Location / Change in Series or Type application. The form specifically allows a change, increase or decrease in series and asks for the requested series and type/class."
          },
          {
            title: "If ownership is changing at the same time",
            text: "The ABT-6002 transfer application also includes Change in Series, Decrease in Series and Increase in Series options. That allows the transfer and requested series change to be addressed in the same transaction when appropriate."
          },
          {
            title: "County population can change the label",
            text: "4COP and 3PS are the familiar labels in the largest county population tier. Lower-population counties use corresponding 5COP–8COP and 3APS–3DPS series, so the requested series should be matched to the county's applicable tier."
          },
          {
            title: "Why this matters to value",
            text: "4COP and 3PS quota licenses can trade at different market levels within the same county. A buyer, seller or lender evaluating a possible series change should compare both same-county markets and account for approval, premises, timing and transaction risk."
          }
        ],
        primaryHref: "https://www2.myfloridalicense.com/abt/forms/documents/abt-6014.pdf",
        primaryLabel: "Open Official ABT-6014",
        secondaryHref: "/resources/florida-liquor-license-system",
        secondaryLabel: "Read FLLM Series-Change Guide",
        note: "Do not assume a 4COP automatically becomes a 3PS merely because the business use changes. DBPR approval is required before operating under the requested series, and local zoning, package-store premises rules, ownership, location and other transaction requirements may also apply."
      }}
      comparison={{
        heading: "4COP Quota vs. 4COP SFS/SRX",
        intro: "Both license types can authorize beer, wine and distilled spirits for consumption on the premises. Their supply, qualification requirements, transferability and market value are fundamentally different.",
        rows: [
          { feature: "Full-liquor privileges", quota: "Beer, wine and distilled spirits for consumption on the licensed premises, with approved package-sale privileges.", sfs: "Beer, wine and distilled spirits for consumption in the qualifying restaurant; privileges remain tied to the approved operation and premises." },
          { feature: "Number available", quota: "Limited by county population under Florida’s quota system—generally one additional license for each increase of 7,500 residents, subject to statutory rules and exceptions.", sfs: "Not limited by the county’s quota count. A restaurant may apply when it satisfies the current Special Food Service qualifications." },
          { feature: "How it is obtained", quota: "Purchased from an existing holder on the secondary market or awarded through Florida’s annual quota-license drawing.", sfs: "Applied for directly through DBPR/DABT as part of a qualifying food-service operation; it is not acquired through the quota drawing." },
          { feature: "Property and market value", quota: "A scarce, county-specific license interest with independent secondary-market value. It may be bought, sold, financed or held inactive, subject to Florida law and DABT approval.", sfs: "No standalone quota asset or independent secondary-market value. Its usefulness depends on the restaurant continuing to qualify." },
          { feature: "Transferability", quota: "Ownership and location may be transferred within the licensed county, subject to application, qualification, zoning and DABT approval.", sfs: "Not transferable as a freestanding quota license. A new owner or location must apply, receive approval and independently satisfy the SFS requirements." },
          { feature: "Food-sales requirement", quota: "No statewide 51% food-and-nonalcoholic-beverage revenue test applies merely because it is a quota 4COP.", sfs: "At least 51% of gross food-and-beverage revenue must come from food and nonalcoholic beverages—not beer, wine or liquor." },
          { feature: "Annual DBPR/DABT fee", quota: "$624–$1,820 per year, based on county population.", sfs: "$624–$1,820 per year, based on county population—the same statutory 4COP on-premises fee schedule." }
        ],
        sources: [
          { href: "https://www.flsenate.gov/Laws/Statutes/2025/561.20", label: "Fla. Stat. § 561.20 — quota and SFS rules" },
          { href: "https://www.flsenate.gov/Laws/Statutes/2025/565.02", label: "Fla. Stat. § 565.02 — annual 4COP fees" },
          { href: "https://www2.myfloridalicense.com/abt/licensing/annual-quota-beverage-license-drawing/", label: "DBPR/DABT annual quota drawing" }
        ]
      }}
      officialResources={[
        { href: "/resources/florida-liquor-license-system", label: "FLLM Guide to Florida's Quota-License System", description: "Understand quota status, series designations, inactive ownership, county limits and how 4COP fits into Florida's licensing structure." },
        { href: "/resources/florida-liquor-license-laws", label: "FLLM Florida Liquor License Laws", description: "Read FLLM's plain-English explanation of the quota statute, premises rules and current beverage-law developments." },
        { href: "/dbpr-abt-6002", label: "FLLM ABT-6002 Transfer Guide", description: "Use FLLM's explanation of the principal transfer application used when ownership of a quota license changes." },
        { href: "/resources/forms", label: "FLLM Florida ABT Forms Center", description: "Browse the ABT applications and forms used in Florida liquor-license transactions without leaving FLLM." },
        { href: "/florida-liquor-license-lottery", label: "FLLM Annual Quota Drawing Guide", description: "Learn how Florida's annual county-specific quota-license drawing works, who may enter and what happens after selection." },
        { href: "/license-types/4cop-sfs-restaurant", label: "FLLM 4COP-SFS Restaurant Guide", description: "Compare the qualification-based Special Food Service license, its 51% revenue test and its operating requirements." }
      ]}
      quotaNote="The word “quota” is important. Florida generally limits quota licenses to one for each 7,500 county residents, subject to the statutory quota system and exceptions. Existing quota licenses are therefore commonly bought and sold in the private market. The license remains county-specific."
      keyPoint="A 4COP quota license is not the same thing as a 4COP-SFS (Special Food Service) license. The quota license is the transferable county-limited asset; 4COP is the consumption-on-premises series designation used for the quota license in the applicable population band."
      seriesClarification="A buyer should not think of “4COP quota” and “3PS quota” as completely unrelated assets. They are different series or use designations within Florida's quota-license system. DBPR provides a formal change-in-series-or-type process, so a quota license may be approved in a package-sales series or a consumption-on-premises series depending on the intended use, county and regulatory approvals. A change is not automatic."
      investmentNote="Yes—an eligible purchaser can acquire a transferable quota license without immediately operating a bar, restaurant or nightclub. If no approved operating location is ready, DBPR provides inactive or escrow procedures. The license cannot be used to sell alcoholic beverages while inactive, and Florida's renewal, qualification and active-operation requirements—including applicable waiver or extension procedures—still apply."
      officialLabel="Beer, Wine and Liquor Consumption on Premises (4COP) — Quota"
      officialHref="/resources/florida-liquor-license-system"
      relatedHref="/florida-4cop-liquor-license-for-sale"
      relatedLabel="View 4COP Quota Licenses for Sale"
      ruleUpdateLinks={[
        { href: "/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs", label: "How Florida changed the special restaurant liquor-license requirements", description: "See the statewide reform that reduced the 4COP-SFS restaurant size and seating thresholds while preserving the revenue test." },
        { href: "/florida-liquor-license-news/florida-cocktails-to-go-sb-148-current-law", label: "Florida cocktails-to-go: current restaurant rules", description: "Review the current food-order, sealing, packaging and delivery rules that can matter to qualifying restaurant operations." }
      ]}
      researchLinks={[
        { href: "/businesses-with-quota-licenses", label: "Florida Businesses for Sale With 4COP Quota Liquor Licenses", description: "Browse operating Florida business packages that include transferable quota liquor licenses, kept separate from FLLM's standalone license inventory." },
        { href: "/resources/florida-liquor-license-laws#cocktails-to-go", label: "Cocktails-to-Go Statutes Explained by FLLM", description: "Review FLLM's explanation of SB 148, section 565.045 and the related open-container provision." },
        { href: "/license-types/4cop-sfs-restaurant", label: "Compare 4COP-SFS", description: "Compare the transferable quota license with the qualification-based restaurant license." },
        { href: "/license-types/gentlemens-clubs-4cop-quota", label: "4COP Quota Licenses for Gentlemen's Clubs", description: "See how a 4COP quota license can fit into an adult-entertainment transaction while zoning and adult-use approvals remain separate." }
      ]}
    />
    <LicenseTypeCountyDirectory licenseType="4COP Quota" />
  </>;
}
