import type { Metadata } from "next";
import Link from "next/link";

import BusinessPackageLocalMarkets from "@/components/BusinessPackageLocalMarkets";
import BusinessQuotaListingCard from "@/components/BusinessQuotaListingCard";
import { FllmButton, FllmPageShell, FllmSectionHeading } from "@/components/FllmDesignSystem";
import { business2copListings, businessQuotaListings, businessSfsListings } from "@/lib/business-quota-listings";
import { withMarketLicenseValues } from "@/lib/business-quota-market-values";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../../fllm-official-template.css";
import "../../fllm-design-system.css";
import "../../listings/listings-premium.css";
import "../../businesses-with-quota-licenses/business-inventory.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/restaurants-for-sale/jacksonville`;

export const metadata: Metadata = {
  title: "Jacksonville Restaurant With Liquor License for Sale | 4COP & SFS/SRX | FLLM",
  description: "Find Jacksonville restaurants for sale with liquor licenses in Duval County. Compare 4COP quota, 4COP SFS / SRX full-liquor and 2COP restaurant opportunities on FLLM.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: ["Jacksonville restaurant with liquor license for sale","Jacksonville restaurant for sale with liquor license","Jacksonville restaurant with full liquor license for sale","Duval County restaurant with liquor license for sale","Jacksonville 4COP restaurant for sale","Jacksonville SFS SRX restaurant for sale"],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Jacksonville Restaurant With Liquor License for Sale | 4COP & SFS/SRX | FLLM",
    description: "Find Jacksonville restaurants for sale with liquor licenses in Duval County. Compare 4COP quota, 4COP SFS / SRX full-liquor and 2COP restaurant opportunities on FLLM.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function LocalRestaurantWithLiquorLicensePage() {
  const standaloneListings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());
  const allRestaurantListings = [
    ...withMarketLicenseValues(businessQuotaListings, standaloneListings),
    ...withMarketLicenseValues(businessSfsListings, standaloneListings),
    ...withMarketLicenseValues(business2copListings, standaloneListings),
  ].filter(
    (listing) =>
      listing.county === "Duval County" &&
      (listing.businessCategory === "Restaurant" ||
        /restaurant/i.test(`${listing.title} ${listing.businessType}`)),
  );

  const fullLiquorListings = allRestaurantListings.filter(
    (listing) => listing.licenseType === "4COP Quota" || listing.licenseType === "4COP SFS/SRX",
  );
  const exactLocalListings = allRestaurantListings.filter((listing) =>
    /\\bjacksonville\\b/i.test(`${listing.title} ${listing.businessType}`),
  );

  const faqs = [
    {
      question: "Where can I find a Jacksonville restaurant with a liquor license for sale?",
      answer: "FLLM organizes current Jacksonville and Duval County restaurant opportunities by business type and Florida alcoholic-beverage license structure, including 4COP quota, 4COP SFS / SRX and 2COP beer-and-wine licenses.",
    },
    {
      question: "What does full liquor mean for a Florida restaurant?",
      answer: "Full liquor is common marketplace language. In Florida, distilled-spirit restaurant privileges may involve a transferable 4COP quota license or a qualifying location-specific 4COP SFS / SRX restaurant license.",
    },
    {
      question: "Are Jacksonville restaurant listings shown with their actual location?",
      answer: "Yes. FLLM keeps the actual city and county of each Market View explicit rather than relabeling nearby businesses as being in a different city.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Jacksonville Restaurant With Liquor License for Sale",
      url: canonicalUrl,
      description: "Find Jacksonville restaurants for sale with liquor licenses in Duval County. Compare 4COP quota, 4COP SFS / SRX full-liquor and 2COP restaurant opportunities on FLLM.",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Jacksonville restaurants for sale with liquor licenses",
      numberOfItems: allRestaurantListings.length,
      itemListElement: allRestaurantListings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: listing.title,
        url: `${siteUrl}${listing.href}`,
      })),
    },
  ];

  return (
    <FllmPageShell className="restaurants-with-liquor-licenses-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="fllm-template-hero">
        <div className="fllm-template-shell">
          <div className="fllm-ui-breadcrumbs">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/restaurants-with-liquor-licenses">Restaurants</Link><span>›</span>
            <strong>Jacksonville</strong>
          </div>
          <span className="fllm-template-eyebrow">Jacksonville · Duval County Restaurant Market</span>
          <h1 className="fllm-template-hero-title">Jacksonville Restaurant With Liquor License for Sale</h1>
          <p className="fllm-template-hero-copy">
            Search Jacksonville restaurant opportunities with liquor licenses through FLLM. Compare restaurants and
            restaurant/bar businesses involving transferable 4COP quota licenses, qualifying 4COP SFS / SRX
            full-liquor restaurant licenses, and 2COP beer-and-wine licenses. Market Views retain their actual
            location and license structure so buyers can distinguish the business package from the liquor-license component.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#local-restaurant-inventory">
              View Jacksonville Restaurant Market
            </Link>
            <FllmButton href="/counties/duval" variant="outline">
              Duval County Market
            </FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section" id="local-restaurant-inventory">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Current Local Restaurant Market"
            title="Jacksonville restaurants and restaurant/bar opportunities"
            copy={
              <p>
                FLLM currently tracks {allRestaurantListings.length} restaurant Market View{allRestaurantListings.length === 1 ? "" : "s"} in Duval County.
                {fullLiquorListings.length ? ` ${fullLiquorListings.length} currently involve 4COP quota or 4COP SFS / SRX full-liquor privileges.` : ""}
              </p>
            }
          />
          <BusinessPackageLocalMarkets
            listings={allRestaurantListings}
            label="Duval County restaurant markets represented in current inventory"
          />
          <div className="business-quota-grid">
            {(exactLocalListings.length ? exactLocalListings : allRestaurantListings).map((listing) => (
              <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Related Search Paths"
            title="Compare local and statewide Florida restaurant markets"
            copy={
              <p>
                Use the local market page for geographic restaurant searches, the county page for quota-license market data,
                and the statewide restaurant hub for broader Florida restaurant opportunities organized by license class.
              </p>
            }
          />
          <div className="fllm-ui-actions">
            <FllmButton href="/restaurants-with-liquor-licenses" variant="outline">Florida Restaurants With Liquor Licenses</FllmButton>
            <FllmButton href="/counties/duval" variant="outline">Duval County Liquor License Market</FllmButton>
          </div>
        </div>
      </section>
    </FllmPageShell>
  );
}
