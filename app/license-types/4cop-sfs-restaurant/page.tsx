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
    quotaNote="4COP-SFS is a special license rather than a standard transferable quota license. Its availability depends on the restaurant meeting the applicable statutory and regulatory qualifications. Because it is tied to those qualifications, it is fundamentally different from buying a county quota license as a standalone market asset."
    keyPoint="A restaurant that qualifies for 4COP-SFS may not need to purchase a costly 4COP quota license. A bar, nightclub, lounge or restaurant that does not qualify for the special-license route may instead need a quota license for full-liquor privileges."
    officialLabel="Beer, Wine and Liquor Consumption on Premises — Special Food Service / Restaurant"
    officialHref="https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=7059&clientCode=4006&xactCode=1034"
    relatedHref="/license-types/4cop-quota"
    relatedLabel="Compare With 4COP Quota"
    researchLinks={[
      {
        href: "/florida-liquor-license-news/florida-cocktails-to-go-sb-148-current-law",
        label: "Florida Cocktails-to-Go Law",
        description: "See how SB 148 and current law govern sealed restaurant alcohol-to-go sales."
      },
      {
        href: "/florida-liquor-license-news/orlando-special-food-service-liquor-license-hb-1447-hb-1647",
        label: "Orlando Special Restaurant Zones",
        description: "See how Orlando's 2018 and 2021 local acts affect qualifying smaller restaurants."
      },
      {
        href: "/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs",
        label: "2023 Statewide SFS Reform",
        description: "Review the current statewide size, seating, and revenue framework."
      },
      {
        href: "/resources/florida-liquor-license-laws#current-developments",
        label: "Florida Liquor License Laws",
        description: "Open the statewide statute and the official Orlando special acts."
      }
    ]}
  />;
}
