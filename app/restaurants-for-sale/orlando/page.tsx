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
  title: "Orlando Restaurants for Sale With Full Liquor Licenses | 4COP & SFS/SRX | FLLM",
  description:
    "Find Orlando restaurants for sale with full liquor licenses in Orange County, Florida. Compare transferable 4COP Quota and qualifying 4COP SFS / SRX restaurant opportunities on FLLM.",
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
    title: "Orlando Restaurants for Sale With Full Liquor Licenses | 4COP & SFS/SRX | FLLM",
    description:
      "Orlando and Orange County restaurants for sale with full-liquor privileges, organized by 4COP Quota, 4COP SFS / SRX and 2COP license structure.",
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
      name: "Orlando Restaurants for Sale With Full Liquor Licenses",
      url: canonicalUrl,
      description:
        "Orlando and Orange County restaurants for sale with full liquor licenses, including transferable 4COP Quota and qualification-based 4COP SFS / SRX opportunities.",
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

      <style>{`
        .orlando-restaurant-hero {
          position: relative;
          overflow: hidden;
          background: #021524;
          min-height: 0;
        }
        .orlando-restaurant-hero .fllm-template-shell {
          padding-top: 54px;
          padding-bottom: 54px;
        }
        .orlando-restaurant-hero__photo,
        .orlando-restaurant-hero__overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .orlando-restaurant-hero__photo {
          background-image: url('/assets/orlando-restaurant-hero-sharp.webp');
          background-size: cover;
          background-position: center right;
          background-repeat: no-repeat;
          filter: contrast(1.08) saturate(1.04) brightness(1.01);
          transform: scale(1);
          transform-origin: center right;
        }
        .orlando-restaurant-hero__overlay {
          background: linear-gradient(
            90deg,
            rgba(2, 21, 36, 0.99) 0%,
            rgba(2, 21, 36, 0.96) 34%,
            rgba(2, 21, 36, 0.74) 50%,
            rgba(2, 21, 36, 0.34) 68%,
            rgba(2, 21, 36, 0.12) 100%
          );
        }
        .orlando-restaurant-hero__content {
          position: relative;
          z-index: 2;
        }
      `}</style>

      <section className="fllm-template-hero orlando-restaurant-hero">
        <div className="orlando-restaurant-hero__photo" aria-hidden="true" />
        <div className="orlando-restaurant-hero__overlay" aria-hidden="true" />
        <div className="fllm-template-shell orlando-restaurant-hero__content">
          <div className="fllm-ui-breadcrumbs">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/restaurants-with-liquor-licenses">Restaurants</Link><span>›</span>
            <strong>Orlando</strong>
          </div>
          <span className="fllm-template-eyebrow">Orlando · Orange County Restaurant Market</span>
          <h1
            className="fllm-template-hero-title"
            style={{
              fontSize: "clamp(34px, 3.25vw, 54px)",
              lineHeight: 1.0,
              maxWidth: "820px",
            }}
          >
            Orlando Restaurants for Sale With Full Liquor Licenses
          </h1>
          <p
            className="fllm-template-hero-copy"
            style={{
              fontSize: "clamp(14px, 0.95vw, 16px)",
              lineHeight: 1.52,
              maxWidth: "740px",
            }}
          >
            Search Orlando restaurants for sale with full liquor licenses through FLLM. Compare transferable
            4COP Quota restaurant packages with qualifying 4COP SFS / SRX full-liquor restaurant opportunities,
            plus 2COP beer-and-wine businesses in Orange County. FLLM keeps the actual license structure visible
            so buyers can distinguish a transferable quota asset from a qualification-based restaurant license.
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
            title="Orlando restaurants for sale with full liquor licenses"
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
      <section className="fllm-template-section fllm-template-section--deep">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Orlando Full-Liquor Restaurant Search"
            title="4COP Quota vs. 4COP SFS / SRX in the Orlando restaurant market"
            copy={
              <p style={{ fontSize: "19px", lineHeight: 1.75, maxWidth: "1120px", marginInline: "auto", color: "#f7fbff" }}>
                Buyers often search simply for an Orlando restaurant with a full liquor license. In Florida, that
                phrase can refer to two materially different structures: a transferable Orange County 4COP Quota
                license included with a business acquisition, or a location-specific 4COP SFS / SRX license available
                to a qualifying restaurant. FLLM identifies which structure applies to each opportunity.
              </p>
            }
            align="center"
          />
          <div className="fllm-ui-actions" style={{ justifyContent: "center" }}>
            <FllmButton href="/license-types/4cop-quota" variant="outline">4COP Quota Guide</FllmButton>
            <FllmButton href="/license-types/4cop-sfs-restaurant" variant="outline">4COP SFS / SRX Guide</FllmButton>
            <FllmButton href="/counties/orange" variant="outline">Orange County Market</FllmButton>
          </div>
        </div>
      </section>

    </FllmPageShell>
  );
}
