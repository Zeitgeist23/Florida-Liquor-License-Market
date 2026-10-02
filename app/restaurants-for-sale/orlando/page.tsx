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
const canonicalUrl = `${siteUrl}/restaurants-for-sale/orlando`;

export const metadata: Metadata = {
  title: "Orlando Restaurant With Liquor License for Sale | 4COP & SFS/SRX | FLLM",
  description:
    "Find Orlando restaurants for sale with liquor licenses in Orange County, Florida. Compare 4COP quota, 4COP SFS / SRX full-liquor and 2COP restaurant opportunities on FLLM.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Orlando restaurant with liquor license for sale",
    "Orlando restaurant for sale with liquor license",
    "Orange County Florida restaurant with liquor license for sale",
    "Orlando restaurant with full liquor license for sale",
    "Orlando 4COP restaurant for sale",
    "Orlando SFS SRX restaurant for sale",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Orlando Restaurant With Liquor License for Sale | 4COP & SFS/SRX | FLLM",
    description:
      "Orlando and Orange County restaurant opportunities organized by business type and Florida liquor-license structure.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function OrlandoRestaurantWithLiquorLicensePage() {
  const standaloneListings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());
  const allRestaurantListings = [
    ...withMarketLicenseValues(businessQuotaListings, standaloneListings),
    ...withMarketLicenseValues(businessSfsListings, standaloneListings),
    ...withMarketLicenseValues(business2copListings, standaloneListings),
  ].filter(
    (listing) =>
      listing.county === "Orange County" &&
      (listing.businessCategory === "Restaurant" ||
        /restaurant/i.test(`${listing.title} ${listing.businessType}`)),
  );

  const fullLiquorListings = allRestaurantListings.filter(
    (listing) => listing.licenseType === "4COP Quota" || listing.licenseType === "4COP SFS/SRX",
  );
  const exactOrlandoListings = allRestaurantListings.filter((listing) =>
    /\borlando\b/i.test(`${listing.title} ${listing.businessType}`),
  );

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Orlando Restaurant With Liquor License for Sale",
      url: canonicalUrl,
      description:
        "Orlando and Orange County, Florida restaurant opportunities with 4COP quota, 4COP SFS / SRX and 2COP liquor-license structures.",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Where can I find an Orlando restaurant with a liquor license for sale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "FLLM organizes current Orlando and Orange County restaurant Market Views by business type and Florida alcoholic-beverage license structure, including 4COP quota, 4COP SFS / SRX and 2COP licenses.",
          },
        },
        {
          "@type": "Question",
          name: "What does full liquor mean for an Orlando restaurant?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Full liquor is common marketplace language. In Florida, distilled-spirit restaurant privileges may involve a transferable 4COP quota license or a qualifying location-specific 4COP SFS / SRX restaurant license.",
          },
        },
      ],
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
            <strong>Orlando</strong>
          </div>
          <span className="fllm-template-eyebrow">Orlando · Orange County Restaurant Market</span>
          <h1 className="fllm-template-hero-title">Orlando Restaurant With Liquor License for Sale</h1>
          <p className="fllm-template-hero-copy">
            Search Orlando restaurant opportunities with liquor licenses through FLLM. Compare restaurants and
            restaurant/bar businesses involving transferable 4COP quota licenses, qualifying 4COP SFS / SRX
            full-liquor restaurant licenses, and 2COP beer-and-wine licenses in Orange County, Florida.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#orlando-restaurant-inventory">
              View Orlando Restaurant Market
            </Link>
            <FllmButton href="/counties/orange" variant="outline">Orange County Market</FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section" id="orlando-restaurant-inventory">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Current Orlando Restaurant Market"
            title="Orlando and Orange County restaurant opportunities"
            copy={
              <p>
                FLLM currently tracks {allRestaurantListings.length} Orange County restaurant Market View{allRestaurantListings.length === 1 ? "" : "s"}.
                {fullLiquorListings.length ? ` ${fullLiquorListings.length} currently involve 4COP quota or 4COP SFS / SRX full-liquor privileges.` : ""}
              </p>
            }
          />
          <BusinessPackageLocalMarkets
            listings={allRestaurantListings}
            label="Orange County restaurant markets represented in current inventory"
          />
          <div className="business-quota-grid">
            {(exactOrlandoListings.length ? exactOrlandoListings : allRestaurantListings).map((listing) => (
              <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
            ))}
          </div>
        </div>
      </section>
    </FllmPageShell>
  );
}
