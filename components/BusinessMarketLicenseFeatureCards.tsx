import Link from "next/link";

import type { BusinessQuotaListing } from "@/lib/business-quota-listings";

type Props = {
  listing: BusinessQuotaListing;
};

function DetailCard({
  label,
  value,
  tooltip,
  href,
}: {
  label: string;
  value: string;
  tooltip: string;
  href?: string;
}) {
  return (
    <div className="business-market-license-detail-card" tabIndex={0}>
      <span>{label}</span>
      <strong>{value}</strong>
      <span className="business-market-license-card-tooltip" role="tooltip">
        {tooltip}
      </span>
      {href ? (
        <Link className="business-market-license-learn-link" href={href}>
          Learn more →
        </Link>
      ) : null}
    </div>
  );
}

function HighlightCard({
  icon,
  line1,
  line2,
  tooltip,
  href,
}: {
  icon: React.ReactNode;
  line1: string;
  line2: string;
  tooltip: string;
  href?: string;
}) {
  return (
    <div className="business-market-license-highlight-card" tabIndex={0}>
      {icon}
      <strong>
        {line1}
        <br />
        {line2}
      </strong>
      <span className="business-market-license-card-tooltip" role="tooltip">
        {tooltip}
      </span>
      {href ? (
        <Link className="business-market-license-learn-link" href={href}>
          Learn more →
        </Link>
      ) : null}
    </div>
  );
}

const fullLiquorIcon = (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M11 42h13V18H11zM15 18V8h5v10M11 26h13M29 25h12l-2 9a5 5 0 0 1-4 3.5A5 5 0 0 1 31 34zM35 37.5V42M30 42h10" />
  </svg>
);

const premisesIcon = (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M8 18h32l-4-9H12zM11 18v22h26V18M17 40V27h14v13M9 18c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0" />
  </svg>
);

const rulesIcon = (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M15 9h18v33H10V9h5M18 6h12v7H18zM16 21l3 3 6-7M16 31l3 3 6-7M29 21h5M29 31h5" />
  </svg>
);

const supplyIcon = (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <circle cx="24" cy="14" r="7" />
    <circle cx="10" cy="22" r="5" />
    <circle cx="38" cy="22" r="5" />
    <path d="M13 42v-6c0-7 5-12 11-12s11 5 11 12v6zM2 42v-5c0-5 4-9 9-9 2 0 4 1 6 2M46 42v-5c0-5-4-9-9-9-2 0-4 1-6 2" />
  </svg>
);

export default function BusinessMarketLicenseFeatureCards({ listing }: Props) {
  const isQuota = listing.licenseType === "4COP Quota";
  const isSfs = listing.licenseType === "4COP SFS/SRX";
  const is2cop = listing.licenseType === "2COP Beer & Wine";

  if (!isQuota && !isSfs && !is2cop) return null;

  const countyShort = listing.county.replace(/\s+County$/i, "");

  return (
    <div className="business-market-featured-license-cards" aria-label={`${listing.licenseType} license features`}>
      <div className="business-market-license-detail-grid">
        {isQuota ? (
          <>
            <DetailCard
              label="License Type"
              value="4COP Quota"
              tooltip="A Florida 4COP quota license is a county-limited transferable full-liquor license, subject to DBPR/ABT approval and applicable premises requirements."
            />
            <DetailCard
              label="License Privileges"
              value="Beer · Wine · Spirits"
              tooltip="Full-liquor quota privileges include beer, wine and distilled spirits within the approved 4COP series and premises."
            />
            <DetailCard
              label="Permitted Use"
              value="On- & Off-Premises"
              tooltip="A 4COP quota license can support on-premises consumption and package sales for off-premises consumption within its approved privileges."
            />
            <DetailCard
              label="Transferability"
              value="Within Same County"
              tooltip={`Quota licenses are county-specific. A ${listing.county} quota license generally remains within ${listing.county}, subject to DBPR/ABT transfer and location approval.`}
            />
          </>
        ) : isSfs ? (
          <>
            <DetailCard
              label="Liquor License Type"
              value="4COP SFS / SRX"
              tooltip="Series: 4COP (Consumption on Premises) · Status: SFS / SRX"
              href="/license-types/4cop-sfs-restaurant"
            />
            <DetailCard
              label="License Classification"
              value="Location-specific"
              tooltip="This 4COP SFS / SRX license is tied to the approved business location and qualifying restaurant operation. It is not a separately transferable county quota-license asset."
              href="/license-types/4cop-sfs-restaurant"
            />
            <DetailCard
              label="License Privileges"
              value="Beer · Wine · Spirits"
              tooltip="This license authorizes beer, wine and distilled spirits for consumption on the licensed premises and can also authorize qualifying restaurant-prepared wine- and liquor-based drinks for off-premises consumption when sold with food and sealed and packaged as required by Florida law. It does not authorize ordinary package-store sales of manufacturer-sealed bottles of distilled spirits."
              href="/florida-liquor-license-news/florida-cocktails-to-go-sb-148-current-law"
            />
            <DetailCard
              label="License Basis"
              value="Qualifying restaurant + premises"
              tooltip="This license depends on both the restaurant's qualifying food-service operation and the approved licensed premises. If the business or premises no longer meet the applicable requirements, the license status may be affected."
            />
          </>
        ) : (
          <>
            <DetailCard
              label="Liquor License Type"
              value="2COP Beer & Wine"
              tooltip="A 2COP beer-and-wine license is a non-quota license series and is not a separately transferable county quota-license asset."
            />
            <DetailCard
              label="License Classification"
              value="Non-quota"
              tooltip="A 2COP beer-and-wine license is a non-quota license series and is not a separately transferable county quota-license asset."
            />
            <DetailCard
              label="License Privileges"
              value="Beer · Wine"
              tooltip="A 2COP license authorizes the sale of beer and wine within the privileges approved for the licensed premises; it does not authorize distilled spirits."
            />
            <DetailCard
              label="License Basis"
              value="Non-quota license series"
              tooltip="The license is issued under a non-quota license series and depends on the licensed premises and continuing compliance with applicable DBPR requirements."
            />
          </>
        )}
      </div>

      <section className="business-market-license-highlights" aria-label="License Highlights">
        <h3>License Highlights</h3>
        <div className="business-market-license-highlight-grid">
          {isQuota ? (
            <>
              <HighlightCard
                icon={fullLiquorIcon}
                line1="Full-liquor"
                line2="license"
                tooltip="Full-liquor quota privileges include beer, wine and distilled spirits, subject to the approved series, premises and DBPR/ABT requirements."
              />
              <HighlightCard
                icon={premisesIcon}
                line1="On- or"
                line2="off-premises use"
                tooltip="In the 4COP series, a quota license can authorize on-premises consumption and package sales for off-premises consumption within its approved privileges."
              />
              <HighlightCard
                icon={rulesIcon}
                line1="Generally no SFS"
                line2="food-sales percentage"
                tooltip="A transferable quota license is different from a qualification-based 4COP SFS / SRX restaurant license. The statewide SFS food-and-nonalcoholic revenue percentage generally does not govern a quota 4COP license."
              />
              <HighlightCard
                icon={supplyIcon}
                line1={`Limited ${countyShort}`}
                line2="County quota supply"
                tooltip={`Florida quota-license supply is county-specific and limited by the statutory quota system. A ${listing.county} license generally remains a ${listing.county} asset, subject to DBPR/ABT transfer and location approval.`}
              />
            </>
          ) : isSfs ? (
            <>
              <HighlightCard
                icon={fullLiquorIcon}
                line1="Full-liquor"
                line2="license"
                tooltip="A 4COP SFS / SRX license authorizes beer, wine and distilled spirits for consumption on the licensed premises and can also support qualifying sealed alcohol-to-go sales with food under current Florida law, subject to the restaurant maintaining the applicable SFS / SRX qualification and DBPR approval."
                href="/license-types/4cop-sfs-restaurant"
              />
              <HighlightCard
                icon={premisesIcon}
                line1="On-premises +"
                line2="sealed drinks to go"
                tooltip="A qualifying 4COP SFS / SRX restaurant may serve beer, wine and spirits on premises and may also sell or deliver restaurant-prepared wine- or liquor-based drinks for off-premises consumption when the order includes food and the drink is securely sealed, placed in tamper-evident outer packaging and accompanied by the required dated receipt. This authority does not permit ordinary package-store sales of manufacturer-sealed bottles of distilled spirits."
                href="/florida-liquor-license-news/florida-cocktails-to-go-sb-148-current-law"
              />
              <HighlightCard
                icon={rulesIcon}
                line1="51% food / nonalcoholic"
                line2="revenue requirement"
                tooltip="For the applicable SFS / SRX restaurant qualification, at least 51% of gross food-and-beverage revenue must come from food and nonalcoholic beverages. Buyers should confirm the current statutory and DBPR requirements for the specific premises."
                href="/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs"
              />
              <HighlightCard
                icon={supplyIcon}
                line1="Qualification-based"
                line2="not quota inventory"
                tooltip="A 4COP SFS / SRX license is qualification-based rather than quota inventory. It depends on the qualifying restaurant and approved premises and is not a separately transferable county quota-license asset."
                href="/license-types/4cop-quota#license-comparison-title"
              />
            </>
          ) : (
            <>
              <HighlightCard
                icon={fullLiquorIcon}
                line1="Beer & wine"
                line2="license"
                tooltip="A 2COP license authorizes beer and wine privileges for the approved premises; it does not authorize distilled spirits."
              />
              <HighlightCard
                icon={premisesIcon}
                line1="On-premises"
                line2="beer & wine"
                tooltip="A 2COP license can authorize beer and wine sales for consumption on the licensed premises within the privileges approved for that location."
              />
              <HighlightCard
                icon={rulesIcon}
                line1="Beer & wine"
                line2="without spirits"
                tooltip="The 2COP series is limited to beer and wine and does not provide distilled-spirit privileges."
              />
              <HighlightCard
                icon={supplyIcon}
                line1="Non-quota"
                line2="license series"
                tooltip="A 2COP license is a non-quota license series and is not a separately transferable county quota-license asset."
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
}
