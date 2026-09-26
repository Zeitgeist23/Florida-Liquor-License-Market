import Link from "next/link";

import FloridaCountyMap from "@/components/FloridaCountyMap";
import HeaderNavMenus from "@/components/HeaderNavMenus";
import ListingBrokerInquiryForm from "@/components/ListingBrokerInquiryForm";
import ListingViewCount from "@/components/ListingViewCount";
import {
  FeaturedBrokerBusinessInteractions,
  FeaturedBrokerEmailCopyButton,
} from "@/components/FeaturedThirdPartyBusinessListingInteractions";

export type FeaturedBusinessMetric = {
  label: string;
  value: string;
  description?: string;
  href?: string;
};

type SellerFinancingDisclosure = {
  offered: true;
  source: "broker-reported" | "seller-reported";
  advertisedRate?: string;
  termsSummary: string;
};

type SbaFinancingDisclosure = {
  status: "broker-advertised" | "lender-reviewed";
  termsSummary: string;
};

export type FeaturedThirdPartyBusinessListingConfig = {
  listingReference: string;
  canonicalPath: string;
  locale?: "en" | "es";
  languageAlternates?: { en: string; es: string };
  county: string;
  countyHref: string;
  countyValueHref: string;
  countyCities: string;
  countyPopulation?: string;
  annualLicenseFee?: string;
  askingPrice: string;
  askingPriceNumber: number;
  packagePrice: string;
  packagePriceNumber: number;
  licenseType: "4COP Quota" | "3PS Quota / Package Store" | "4COP SFS/SRX" | "2COP Beer & Wine";
  licenseClass?: "quota" | "sfs" | "2cop";
  sellerDirect?: boolean;
  approvalPreview?: boolean;
  businessLabel: string;
  businessLabelLinkUrl?: string;
  heroSummary: string;
  broker: {
    name: string;
    brokerage: string;
    phone: string;
    email: string;
    website: string;
    listingUrl: string;
    photo?: string;
    credential?: string;
  };
  additionalSellerIntro: string;
  additionalSellerIntroLinkText?: string;
  packageIncludes: string;
  businessMetrics: FeaturedBusinessMetric[];
  sellerFinancing?: SellerFinancingDisclosure;
  sbaFinancing?: SbaFinancingDisclosure;
  opportunitiesHeading: string;
  opportunities: string[];
  transitionText?: string;
  confidentialityText: string;
  sourceDisclosure?: string;
  countyContext: string;
};

function phoneHref(phone: string) {
  return "tel:" + phone.replace(/[^\d+]/g, "");
}

function standardizeBusinessMetrics(
  metrics: FeaturedBusinessMetric[],
  isSpanish: boolean,
) {
  const normalize = (label: string) =>
    label.toLowerCase().replace(/[^a-z0-9áéíóúüñ]+/g, " ").trim();

  const grossIndex = metrics.findIndex((metric) => {
    const label = normalize(metric.label);
    return label.includes("gross revenue") || label.includes("ingresos brutos");
  });

  const cashFlowIndex = metrics.findIndex((metric) => {
    const label = normalize(metric.label);
    if (label.includes("adjusted") || label.includes("ajustad")) return false;
    return (
      label.includes("cash flow") ||
      label.includes("flujo de caja") ||
      label === "sde" ||
      label.includes("sde")
    );
  });

  const used = new Set<number>();
  const grossRevenue =
    grossIndex >= 0
      ? (used.add(grossIndex), metrics[grossIndex])
      : {
          label: isSpanish ? "Ingresos brutos" : "Gross Revenue",
          value: isSpanish ? "No divulgado" : "Not Disclosed",
        };

  const cashFlow =
    cashFlowIndex >= 0
      ? (used.add(cashFlowIndex), metrics[cashFlowIndex])
      : {
          label: isSpanish ? "Flujo de caja (SDE)" : "Cash Flow (SDE)",
          value: isSpanish ? "No divulgado" : "Not Disclosed",
        };

  return [
    grossRevenue,
    cashFlow,
    ...metrics.filter((_, index) => !used.has(index)),
  ];
}

function buildInquiryHref(config: FeaturedThirdPartyBusinessListingConfig) {
  const params = new URLSearchParams({
    source: "specific-license",
    listing: `${config.listingReference} — ${config.county} — ${config.licenseType} — ${config.askingPrice}`,
    ref: config.listingReference,
    county: config.county,
    license_type: config.licenseType,
    asking_price: config.packagePrice,
    listing_status: "Available / Broker confirmation required",
    listing_url: config.canonicalPath,
  });
  return `/contact?${params.toString()}`;
}

export default function FeaturedThirdPartyBusinessListingPage({
  config,
}: {
  config: FeaturedThirdPartyBusinessListingConfig;
}) {
  const isSpanish = config.locale === "es";
  const tr = (english: string, spanish: string) => isSpanish ? spanish : english;
  const statusLabel = config.approvalPreview
    ? config.sellerDirect
      ? tr("Seller review preview", "Vista previa para revisión de la vendedora")
      : tr("Broker review preview", "Vista previa para revisión del corredor")
    : config.sellerDirect
      ? tr("Available / Seller confirmation required", "Disponible / Confirmación de la vendedora requerida")
      : tr("Available / Broker confirmation required", "Disponible / Confirmación del corredor requerida");
  const statusCardLabel = config.approvalPreview ? tr("Preview", "Vista previa") : tr("Available", "Disponible");
  const inquiryHref = buildInquiryHref(config);
  const shortLicenseType =
    config.licenseType === "2COP Beer & Wine"
      ? "2COP"
      : config.licenseType === "4COP Quota"
      ? "4COP Quota"
      : config.licenseType === "4COP SFS/SRX"
        ? "4COP SFS / SRX"
        : "3PS Quota";
  const isSfsListing = config.licenseClass === "sfs" || config.licenseType === "4COP SFS/SRX";
  const is2copListing = config.licenseClass === "2cop" || config.licenseType === "2COP Beer & Wine";
  const isNonQuotaBusiness = isSfsListing || is2copListing;
  const countyShort = config.county.replace(/\s+County$/i, "");
  const isWeSellRestaurantsBroker =
    config.broker.brokerage.trim().toLowerCase() === "we sell restaurants";
  const hasFinancingDisclosure = Boolean(
    config.sellerFinancing || config.sbaFinancing,
  );
  const standardizedBusinessMetrics = standardizeBusinessMetrics(
    config.businessMetrics,
    isSpanish,
  );

  return (
    <main
      className="results-page marketplace-listing-page"
      data-featured-broker-listing={config.listingReference}
      data-featured-broker-business-listing="true"
      data-listing-template={isSfsListing ? "fllm-4cop-sfs-business-listing-v1" : undefined}
      data-seller-direct={config.sellerDirect ? "true" : undefined}
      data-approval-preview={config.approvalPreview ? "true" : undefined}
      lang={isSpanish ? "es" : "en"}
    >
      <FeaturedBrokerBusinessInteractions
        listingReference={config.listingReference}
      />

      <style>{`
        .results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .marketplace-listing-kicker{font-size:12px!important;font-weight:900;letter-spacing:.075em;text-transform:uppercase}
        .results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .marketplace-listing-kicker::after{content:none!important;display:none!important}
        .results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .marketplace-listing-facts>div:nth-child(4)>strong{font-size:20px!important;line-height:1.2!important}
        .results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .marketplace-listing-facts>div:nth-child(4)>strong::before,.results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .marketplace-listing-facts>div:nth-child(4)>strong::after{content:none!important;display:none!important}
        .featured-business-package-alert{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:10px 0 0;color:#d7e2e8;font-size:14px;font-weight:750;line-height:1.45}.featured-business-package-badge{display:inline-flex;align-items:center;min-height:25px;padding:0 9px;border:1px solid #efaa10;border-radius:4px;color:#071a3a;background:#efaa10;font-size:9px;font-weight:950;letter-spacing:.07em;text-transform:uppercase}.featured-business-package-alert strong{color:#f1b53a}.featured-business-label-link{text-decoration:none!important;transition:color .16s ease,border-color .16s ease}.featured-business-label-link--hero{color:inherit!important;font-weight:inherit!important;text-shadow:none!important;border-bottom:1px solid rgba(215,226,232,.34)}.featured-business-label-link--hero:hover,.featured-business-label-link--hero:focus-visible{color:#fff!important;border-bottom-color:rgba(255,255,255,.72);outline:none}.featured-business-label-link--body{color:#54dbc8!important;-webkit-text-fill-color:#54dbc8!important;font-weight:400!important;text-shadow:none!important;border-bottom:0!important}.featured-business-label-link--body:hover,.featured-business-label-link--body:focus-visible{color:#7be8d8!important;-webkit-text-fill-color:#7be8d8!important;border-bottom:0!important;outline:none}.featured-business-sfs-lead{color:#f1a600!important;-webkit-text-fill-color:#f1a600!important}.featured-business-fee-link{color:#69d6ff!important;-webkit-text-fill-color:#69d6ff!important;font-weight:400!important;text-decoration:none!important}.featured-business-fee-link:hover,.featured-business-fee-link:focus-visible{color:#a8e9ff!important;-webkit-text-fill-color:#a8e9ff!important;text-decoration:underline!important}.package-business-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:17px 0;overflow:visible}.package-business-metric{position:relative!important;display:block!important;min-width:0;min-height:96px;padding:16px!important;overflow:visible!important;border:1px solid rgba(226,165,30,.25);border-radius:8px;background:rgba(4,23,39,.72);color:inherit;text-decoration:none!important;cursor:help;transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease,background .16s ease}.package-business-metric--link{cursor:pointer}.package-business-metric:hover,.package-business-metric:focus-visible{z-index:100!important;transform:translateY(-2px);border-color:rgba(105,214,255,.82);background:rgba(9,38,58,.96);box-shadow:0 11px 24px rgba(0,0,0,.32),0 0 16px rgba(105,214,255,.12);outline:none}.package-business-metric>span:first-child{display:block;color:#69d6ff;font-size:10px;font-weight:900;letter-spacing:.06em;text-transform:uppercase}.package-business-metric>strong{display:block;margin-top:6px;color:#fff;font-size:15px}.package-business-tooltip{position:absolute!important;z-index:120!important;left:12px!important;right:12px!important;top:calc(100% + 8px)!important;bottom:auto!important;display:block!important;padding:11px 12px;border:1px solid rgba(105,214,255,.72);border-radius:7px;background:#071b2d!important;color:#dce8ef!important;box-shadow:0 14px 28px rgba(0,0,0,.42);font-size:12px!important;font-weight:400!important;letter-spacing:0!important;line-height:1.5!important;text-transform:none!important;opacity:0;visibility:hidden;transform:translateY(-5px);pointer-events:auto;transition:opacity .15s ease,visibility .15s ease,transform .15s ease}.package-business-tooltip:before{content:"";position:absolute;left:18px;bottom:100%;border:7px solid transparent;border-bottom-color:rgba(105,214,255,.72)}.package-business-tooltip:after{content:"";position:absolute;left:0;right:0;bottom:100%;height:9px;background:transparent}.package-business-tooltip small{display:block;margin-top:6px;color:#f1a600;font-size:10px;font-weight:900;letter-spacing:.04em;text-transform:uppercase}.package-business-metric:hover .package-business-tooltip,.package-business-metric:focus-visible .package-business-tooltip{opacity:1;visibility:visible;transform:translateY(0)}.results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .package-business-grid>.package-business-metric>.package-business-tooltip{color:#dce8ef!important;font-weight:400!important}.package-total{margin:18px 0;padding:16px 18px;border-left:4px solid #efa916;background:rgba(239,169,22,.07);color:#cbd6dd;line-height:1.7}.package-total strong{color:#f1b53a}.featured-business-financing{margin-top:16px;padding:18px;border:1px solid rgba(105,214,255,.32);border-radius:8px;background:rgba(4,23,39,.72)}.featured-business-financing>h3{margin:0 0 13px!important;color:#fff!important;font-size:18px!important;text-align:center}.featured-business-financing-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.featured-business-financing-grid:has(>article:only-child){grid-template-columns:minmax(0,1fr)}.featured-business-financing-card{display:flex;min-height:112px;flex-direction:column;justify-content:center;padding:17px 18px;border:1px solid rgba(241,166,0,.58);border-radius:7px;background:linear-gradient(145deg,#173653,#081b2d);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 10px 22px rgba(0,0,0,.24)}.featured-business-financing-card>span{color:#69d6ff;font-size:10px;font-weight:900;letter-spacing:.075em;text-transform:uppercase}.featured-business-financing-card>strong{margin-top:5px;color:#f1a600;font:700 21px/1.12 Georgia,serif}.featured-business-financing-card>p{margin:8px 0 0!important;color:#d7e2e8!important;font-size:13px!important;line-height:1.55!important}.featured-business-financing-card>small{margin-top:7px;color:#93a7b5;font-size:10px;line-height:1.45}.marketplace-listing-broker-license{display:block;margin-top:4px;color:#9fb0bd;font-size:11px;font-weight:750}.marketplace-listing-broker-photo img{object-fit:cover}.package-confidential{font-size:12px;color:#9eb0be;line-height:1.6}.package-source-disclosure{font-size:11px;color:#8398a8;line-height:1.6}.featured-business-email-copy-row{display:inline-flex;align-items:center;gap:5px;width:fit-content;max-width:100%}.featured-business-copy-email-button{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;width:16px;height:16px;margin:0;padding:0;border:0;border-radius:0;background:transparent;color:#f1a600;font-size:13px;font-weight:900;line-height:1;cursor:pointer;box-shadow:none;appearance:none}.featured-business-call-broker-button{position:relative;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.28),0 7px 18px rgba(0,0,0,.28)}.featured-business-call-broker-label{display:block;opacity:1;line-height:inherit;white-space:nowrap;transition:opacity .14s ease}.featured-business-call-broker-phone{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;color:inherit;font:inherit;line-height:inherit;white-space:nowrap;pointer-events:none;transition:opacity .14s ease}.featured-business-call-broker-button:hover .featured-business-call-broker-label,.featured-business-call-broker-button:focus-visible .featured-business-call-broker-label{opacity:0}.featured-business-call-broker-button:hover .featured-business-call-broker-phone,.featured-business-call-broker-button:focus-visible .featured-business-call-broker-phone{opacity:1}.results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .we-sell-restaurants-disclosure-link{color:#d98282!important;-webkit-text-fill-color:#d98282!important;background:none!important;background-image:none!important;font-weight:400!important;text-shadow:none!important;text-decoration:none}.results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .we-sell-restaurants-disclosure-link:hover,.results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .we-sell-restaurants-disclosure-link:focus-visible{color:#e79a9a!important;-webkit-text-fill-color:#e79a9a!important;filter:none!important;text-shadow:0 0 8px rgba(217,130,130,.22)!important;outline:none}.results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .we-sell-restaurants-sidebar-link strong{color:#f1a600!important;-webkit-text-fill-color:#f1a600!important}.results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .we-sell-restaurants-sidebar-link:hover strong,.results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .we-sell-restaurants-sidebar-link:focus-visible strong{color:#ffc43d!important;-webkit-text-fill-color:#ffc43d!important}.featured-business-badge-row{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin:0 0 10px}.featured-business-language-switch{display:flex;align-items:center;gap:7px;width:fit-content;margin:0;padding:6px 9px;border:1px solid rgba(105,214,255,.5);border-radius:999px;background:rgba(2,18,31,.72);color:#dce8ef;font-size:10px;font-weight:900;letter-spacing:.06em}.featured-business-language-switch svg{width:14px;height:14px;fill:none;stroke:#69d6ff;stroke-width:1.8}.featured-business-language-switch a{color:#dce8ef!important;text-decoration:none!important}.featured-business-language-switch a:hover,.featured-business-language-switch a:focus-visible{color:#fff!important;outline:none}.featured-business-language-switch [aria-current="page"]{color:#f1a600}.featured-business-language-divider{color:#69808f}@media(max-width:760px){.package-business-grid,.featured-business-financing-grid{grid-template-columns:1fr}}
      `}</style>

      <header className="results-header page-shell">
        <Link
          className="seller-brand"
          href="/"
          aria-label={tr("Florida Liquor License Market home", "Página principal de Florida Liquor License Market")}
        >
          <img
            src="/assets/brand-sharp.svg"
            alt="Florida Liquor License Market"
          />
        </Link>
        <HeaderNavMenus
          className="primary-nav listings-primary-nav"
          showContactLink
        />
      </header>

      <section className="marketplace-listing-hero">
        <div className="marketplace-listing-shell marketplace-listing-hero-grid">
          <div className="marketplace-listing-copy">
            <div className="marketplace-listing-breadcrumbs">
              <Link href={is2copListing ? "/listings?type=businesses-2cop" : isSfsListing ? "/listings?type=businesses-sfs" : "/businesses-with-quota-licenses"}>
                {is2copListing ? tr("Businesses With 2COP Beer & Wine Licenses", "Negocios con licencias 2COP de cerveza y vino") : isSfsListing ? tr("Businesses With 4COP SFS / SRX Licenses", "Negocios con licencias 4COP SFS / SRX") : tr("Businesses With Quota Licenses", "Negocios con licencias de cupo")}
              </Link>
              <span>›</span>
              <Link href={config.countyHref}>{config.county}</Link>
              <span>›</span>
              <strong>{config.listingReference}</strong>
            </div>
            <div className="featured-business-badge-row">
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: 27,
                  marginBottom: 0,
                  padding: "0 11px",
                  border: "1px solid #79ddff",
                  borderRadius: 5,
                  color: "#ffffff",
                  background: "linear-gradient(180deg,#22bde9,#087ba5)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,.35),0 5px 14px rgba(0,160,210,.18)",
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: ".065em",
                  textTransform: "uppercase",
                }}
              >
                {config.approvalPreview
                  ? config.sellerDirect
                    ? tr("Seller Review Preview", "Vista previa del vendedor")
                    : tr("Broker Review Preview", "Vista previa del corredor")
                  : tr("Featured Listing", "Anuncio destacado")}
              </span>
              {config.languageAlternates ? (
                <nav className="featured-business-language-switch" aria-label={tr("Listing language", "Idioma del anuncio")}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3c3 3.1 4.2 6.1 4.2 9S15 17.9 12 21M12 3C9 6.1 7.8 9.1 7.8 12S9 17.9 12 21" />
                  </svg>
                  {isSpanish ? <Link href={config.languageAlternates.en}>EN</Link> : <span aria-current="page">EN</span>}
                  <span className="featured-business-language-divider">|</span>
                  {isSpanish ? <span aria-current="page">ES</span> : <Link href={config.languageAlternates.es}>ES</Link>}
                </nav>
              ) : null}
            </div>
            <span className="marketplace-listing-kicker">
              {config.sellerDirect ? tr("Direct Seller Business Listing", "Anuncio de negocio de venta directa") : tr("Featured Third-Party Broker Listing", "Anuncio destacado de corredor externo")}
            </span>
            <h1>
              <span className="marketplace-listing-title-line">
                {config.county}
              </span>
              <span className="marketplace-listing-title-line marketplace-listing-title-type">
                {config.businessLabel}
              </span>
              <span className="marketplace-listing-title-line">
                {isSpanish && isSfsListing ? (
                  <>+ Licencia completa de bebidas alcohólicas{" "}<span className="marketplace-license-series">{shortLicenseType.replace(" Quota", "")}</span></>
                ) : isSpanish && is2copListing ? (
                  <>+ Licencia <span className="marketplace-license-series">{shortLicenseType}</span> de cerveza y vino</>
                ) : (
                  <>+ <span className="marketplace-license-series">{shortLicenseType.replace(" Quota", "")}</span>{" "}{is2copListing ? "Beer & Wine License" : isSfsListing ? "Full-Liquor License" : "Quota License"}</>
                )}
              </span>
            </h1>
            <p className="marketplace-listing-price">{config.packagePrice}</p>
            <div className="featured-business-package-alert">
              {!isSfsListing && (
                <span className="featured-business-package-badge">
                  {is2copListing ? tr("Business + 2COP License", "Negocio + licencia 2COP") : tr("Business Purchase Required", "Compra del negocio requerida")}
                </span>
              )}
              <span>
                {is2copListing ? (
                  <>{tr("Beer-and-wine privileges only", "Solo cerveza y vino")} · <strong>{tr("No separate quota-license value", "Sin valor separado de licencia de cupo")}</strong></>
                ) : isSfsListing ? (
                  <>{tr("Business asking price", "Precio de venta del negocio")} · <strong>{tr("4COP SFS / SRX full-liquor license included", "Licencia completa de bebidas alcohólicas 4COP SFS / SRX incluida")}</strong></>
                ) : (
                  <>{tr("Included", "Incluida")} {shortLicenseType} {tr("allocated value", "valor asignado")} {config.askingPrice} · <strong>{tr("License not offered separately", "La licencia no se ofrece por separado")}</strong></>
                )}
              </span>
            </div>
            <div className="marketplace-listing-availability">
              <span className="availability-pill" title={statusLabel}>
                <span className="availability-dot" aria-hidden="true" />
                {config.approvalPreview ? "Preview" : tr("Available", "Disponible")}
              </span>
              <span className="marketplace-listing-hero-reference">
                {tr("Listing", "Anuncio")} {config.listingReference}
              </span>
              {!config.approvalPreview ? <ListingViewCount listingRef={config.listingReference} locale={config.locale} /> : null}
              <span className="marketplace-listing-broker-badge">
                {config.sellerDirect ? tr("Seller Direct · Business Sale", "Venta directa · Venta de negocio") : tr("Featured · Third-Party Broker", "Destacado · Corredor externo")}
              </span>
            </div>
            <p className="marketplace-listing-summary">{config.heroSummary}</p>
            <div className="marketplace-listing-actions">
              {config.approvalPreview && config.sellerDirect ? (
                <a className="marketplace-listing-primary" href={phoneHref(config.broker.phone)} aria-label={`Call seller ${config.broker.name} at ${config.broker.phone}`}>Call Seller · {config.broker.phone}</a>
              ) : (
                <Link className="marketplace-listing-primary" href={inquiryHref} aria-label={`Inquire about the ${config.county} business and ${shortLicenseType} package`}>
                  {tr("Inquire About This Business Package", "Solicitar información sobre este negocio")}
                </Link>
              )}
              <Link
                className="marketplace-listing-secondary"
                href={isNonQuotaBusiness ? "#license-details" : config.countyHref}
              >
                {isNonQuotaBusiness
                  ? tr("View License Details", "Ver detalles de la licencia")
                  : <>{tr("View", "Ver mercado de licencias de")} {countyShort}</>}
              </Link>
            </div>
          </div>

          <div
            className="marketplace-listing-map"
            aria-label={`${config.county} map`}
          >
            <FloridaCountyMap county={config.county} enlarged />
            <strong>{config.county}</strong>
            <span>{config.countyCities}</span>
          </div>
        </div>
      </section>

      <section id="license-details" className="marketplace-listing-body">
        <div className="marketplace-listing-shell">
          <div className="marketplace-listing-grid">
            <article className="marketplace-listing-main">
              <div className="marketplace-listing-heading">
                <span>{tr("Specific License Details", "Detalles específicos de la licencia")}</span>
                <h2>
                  <span className="marketplace-license-series">
                    {shortLicenseType.replace(" Quota", "")}
                  </span>{" "}
                  {is2copListing ? tr("Beer & Wine License", "Licencia de cerveza y vino") : isSfsListing ? tr("Full-Liquor License", "Licencia completa de bebidas alcohólicas") : tr("Quota", "Cupo")} {tr("in", "en")} {config.county}
                </h2>
              </div>

              <div
                className="marketplace-listing-facts"
                aria-label={tr("Specific listing details", "Detalles específicos del anuncio")}
              >
                <div>
                  <span>{isNonQuotaBusiness ? tr("Restaurant Business Asking Price", "Precio de venta del negocio de restaurante") : tr("Business + License Package", "Paquete de negocio + licencia")}</span>
                  <strong>{config.packagePrice}</strong>
                </div>
                <div
                  className={isNonQuotaBusiness ? "marketplace-listing-education-card marketplace-listing-license-type-card" : "marketplace-listing-tooltip-card"}
                  tabIndex={!isNonQuotaBusiness ? 0 : undefined}
                >
                  <span>{isNonQuotaBusiness ? tr("Liquor License Type", "Tipo de licencia de bebidas alcohólicas") : tr("License Type", "Tipo de licencia")}</span>
                  <strong>{is2copListing ? tr("2COP Beer & Wine", "2COP Cerveza y Vino") : shortLicenseType}</strong>
                  {!isNonQuotaBusiness ? (
                    <span className="marketplace-listing-card-tooltip" role="tooltip">
                      {tr("A Florida quota license is county-limited. The 4COP series supports full-liquor consumption on premises and package sales within its approved privileges; a change to the 3PS package-sales series requires DBPR/ABT approval.", "Una licencia de cupo de Florida está limitada por condado. La serie 4COP permite bebidas alcohólicas completas para consumo en el local y ventas en paquete dentro de sus privilegios aprobados; un cambio a la serie 3PS requiere aprobación de DBPR/ABT.")}
                    </span>
                  ) : null}
                  {isSfsListing ? (
                    <>
                      <span
                        id="sfs-license-type-tooltip"
                        className="marketplace-listing-license-type-tooltip"
                        role="tooltip"
                      >
                        <span>{tr("Series: 4COP (Consumption on Premises)", "Serie: 4COP (consumo en el local)")}</span>
                        <span>{tr("Status: SFS / SRX", "Estado: SFS / SRX")}</span>
                      </span>
                      <Link
                        className="marketplace-listing-education-link"
                        href="/license-types/4cop-sfs-restaurant"
                        aria-label="Learn about 4COP SFS / SRX full-liquor licenses"
                        aria-describedby="sfs-license-type-tooltip"
                      >
                        <span>{tr("Learn more →", "Más información →")}</span>
                      </Link>
                    </>
                  ) : null}
                </div>
                <div
                  className={isNonQuotaBusiness ? "marketplace-listing-education-card" : "marketplace-listing-tooltip-card"}
                  tabIndex={!isNonQuotaBusiness ? 0 : undefined}
                >
                  <span>{isNonQuotaBusiness ? tr("License Classification", "Clasificación de la licencia") : tr("Allocated License Value", "Valor asignado de la licencia")}</span>
                  <strong>{is2copListing ? tr("Non-quota · no separate value", "Sin cupo · sin valor separado") : isSfsListing ? tr("Location-specific", "Vinculada al local") : config.askingPrice}</strong>
                  {!isNonQuotaBusiness ? (
                    <span className="marketplace-listing-card-tooltip" role="tooltip">
                      {tr("This is the license value allocated within the business-and-license package. Buyers should confirm the exact license series, current status, ownership, liens, transferability and negotiated allocation before closing.", "Este es el valor de la licencia asignado dentro del paquete de negocio y licencia. Los compradores deben confirmar la serie exacta, estado actual, titularidad, gravámenes, transferibilidad y asignación negociada antes del cierre.")}
                    </span>
                  ) : null}
                  {isSfsListing ? (
                    <Link
                      className="marketplace-listing-education-link"
                      href="/license-types/4cop-sfs-restaurant"
                      aria-label="Learn about location-specific 4COP SFS / SRX licenses"
                    >
                      <span>Learn more →</span>
                    </Link>
                  ) : null}
                </div>
                <div>
                  <span>{tr("Marketplace Status", "Estado en el mercado")}</span>
                  <strong>{statusCardLabel}</strong>
                </div>
              </div>

              <section
                className="marketplace-listing-highlights"
                aria-labelledby="license-highlights-heading"
              >
                <h3 id="license-highlights-heading">{tr("License Highlights", "Características de la licencia")}</h3>
                <div className="marketplace-listing-highlight-grid">
                  <div
                    className={isSfsListing ? "marketplace-listing-education-card" : !isNonQuotaBusiness ? "marketplace-listing-tooltip-card" : undefined}
                    tabIndex={!isNonQuotaBusiness ? 0 : undefined}
                  >
                    <svg viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M11 42h13V18H11zM15 18V8h5v10M11 26h13M29 25h12l-2 9a5 5 0 0 1-4 3.5A5 5 0 0 1 31 34zM35 37.5V42M30 42h10" />
                    </svg>
                    <strong>
                      {is2copListing ? tr("Beer & wine", "Cerveza y vino") : tr("Full-liquor", "Bebidas alcohólicas")}
                      <br />
                      {is2copListing ? tr("license", "licencia") : tr("license", "licencia completa")}
                    </strong>
                    {!isNonQuotaBusiness ? (
                      <span className="marketplace-listing-card-tooltip" role="tooltip">
                        {tr("Full-liquor quota privileges include beer, wine and distilled spirits, subject to the approved series, premises and DBPR/ABT requirements.", "Los privilegios de una licencia de cupo de bebidas alcohólicas completas incluyen cerveza, vino y licores destilados, sujetos a la serie aprobada, el local y los requisitos de DBPR/ABT.")}
                      </span>
                    ) : null}
                    {isSfsListing ? (
                      <Link
                        className="marketplace-listing-education-link"
                        href="/license-types/4cop-sfs-restaurant"
                        aria-label="Learn about the 4COP SFS / SRX full-liquor license"
                      >
                        <span>Learn more →</span>
                      </Link>
                    ) : null}
                  </div>
                  <div
                    className={isSfsListing ? "marketplace-listing-education-card" : !isNonQuotaBusiness ? "marketplace-listing-tooltip-card" : undefined}
                    tabIndex={!isNonQuotaBusiness ? 0 : undefined}
                  >
                    <svg viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M8 18h32l-4-9H12zM11 18v22h26V18M17 40V27h14v13M9 18c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0" />
                    </svg>
                    <strong>
                      {is2copListing ? tr("On-premises", "Consumo en el local") : isSfsListing ? tr("Qualifying restaurant", "Local de restaurante") : tr("On- or", "Dentro o")}
                      <br />
                      {is2copListing ? tr("beer & wine", "cerveza y vino") : isSfsListing ? tr("premises", "que cumple requisitos") : tr("off-premises use", "fuera del local")}
                    </strong>
                    {!isNonQuotaBusiness ? (
                      <span className="marketplace-listing-card-tooltip" role="tooltip">
                        {tr("In the 4COP series, a quota license can authorize on-premises consumption and package sales for off-premises consumption within its approved privileges. A 3PS series is used for package sales.", "En la serie 4COP, una licencia de cupo puede autorizar consumo en el local y ventas en paquete para consumo fuera del local dentro de sus privilegios aprobados. La serie 3PS se utiliza para ventas en paquete.")}
                      </span>
                    ) : null}
                    {isSfsListing ? (
                      <Link
                        className="marketplace-listing-education-link"
                        href="/license-types/4cop-sfs-restaurant"
                        aria-label="Learn about restaurant and premises requirements for 4COP SFS / SRX licenses"
                      >
                        <span>Learn more →</span>
                      </Link>
                    ) : null}
                  </div>
                  <div
                    className={isSfsListing ? "marketplace-listing-education-card" : !isNonQuotaBusiness ? "marketplace-listing-tooltip-card" : undefined}
                    tabIndex={!isNonQuotaBusiness ? 0 : undefined}
                  >
                    <svg viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M15 9h18v33H10V9h5M18 6h12v7H18zM16 21l3 3 6-7M16 31l3 3 6-7M29 21h5M29 31h5" />
                    </svg>
                    <strong>
                      {is2copListing ? tr("Beer & wine", "Cerveza y vino") : isSfsListing ? tr("51% food / nonalcoholic", "51% alimentos / sin alcohol") : tr("Generally no SFS", "Generalmente sin SFS")}
                      <br />
                      {is2copListing ? tr("without spirits", "sin bebidas destiladas") : isSfsListing ? tr("revenue requirement", "requisito de ingresos") : tr("food-sales percentage", "porcentaje de ventas de alimentos")}
                    </strong>
                    {!isNonQuotaBusiness ? (
                      <span className="marketplace-listing-card-tooltip" role="tooltip">
                        {tr("A transferable quota license is different from a qualification-based 4COP SFS / SRX restaurant license. The statewide SFS food-and-nonalcoholic revenue percentage generally does not govern a quota 4COP license.", "Una licencia de cupo transferible es diferente de una licencia de restaurante 4COP SFS / SRX basada en requisitos. El porcentaje estatal de ingresos de alimentos y bebidas no alcohólicas de SFS generalmente no rige una licencia 4COP de cupo.")}
                      </span>
                    ) : null}
                    {isSfsListing ? (
                      <Link
                        className="marketplace-listing-education-link"
                        href="/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs"
                        aria-label="Learn about the 51 percent food and nonalcoholic revenue requirement"
                      >
                        <span>Learn more →</span>
                      </Link>
                    ) : null}
                  </div>
                  <div
                    className={isSfsListing ? "marketplace-listing-education-card" : !isNonQuotaBusiness ? "marketplace-listing-tooltip-card" : undefined}
                    tabIndex={!isNonQuotaBusiness ? 0 : undefined}
                  >
                    <svg viewBox="0 0 48 48" aria-hidden="true">
                      <circle cx="24" cy="14" r="7" />
                      <circle cx="10" cy="22" r="5" />
                      <circle cx="38" cy="22" r="5" />
                      <path d="M13 42v-6c0-7 5-12 11-12s11 5 11 12v6zM2 42v-5c0-5 4-9 9-9 2 0 4 1 6 2M46 42v-5c0-5-4-9-9-9-2 0-4 1-6 2" />
                    </svg>
                    <strong>
                      {is2copListing ? tr("Non-quota", "Sin cupo") : isSfsListing ? tr("Qualification-based", "Basada en requisitos") : `${tr("Limited", "Limitada")} ${countyShort}`}
                      <br />
                      {is2copListing ? tr("license series", "serie de licencia") : isSfsListing ? tr("not quota inventory", "no es inventario de cupo") : tr("County quota supply", "Oferta de cupos del condado")}
                    </strong>
                    {!isNonQuotaBusiness ? (
                      <span className="marketplace-listing-card-tooltip" role="tooltip">
                        {tr(`Florida quota-license supply is county-specific and limited by the statutory quota system. A ${config.county} license generally remains a ${config.county} asset, subject to DBPR/ABT transfer and location approval.`, `La oferta de licencias de cupo de Florida es específica por condado y está limitada por el sistema legal de cupos. Una licencia de ${config.county} generalmente permanece como un activo de ${config.county}, sujeta a la aprobación de transferencia y ubicación de DBPR/ABT.`)}
                      </span>
                    ) : null}
                    {isSfsListing ? (
                      <Link
                        className="marketplace-listing-education-link"
                        href="/license-types/4cop-quota#license-comparison-title"
                        aria-label="Compare qualification-based 4COP SFS / SRX licenses with transferable quota licenses"
                      >
                        <span>Learn more →</span>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </section>

              {hasFinancingDisclosure ? (
                <section
                  className="featured-business-financing"
                  aria-labelledby="featured-business-financing-heading"
                >
                  <h3 id="featured-business-financing-heading">
                    Purchase Financing
                  </h3>
                  <div className="featured-business-financing-grid">
                    {config.sellerFinancing ? (
                      <article className="featured-business-financing-card">
                        <span>Seller Financing Terms</span>
                        <strong>Seller Financing Available</strong>
                        <p>
                          {config.sellerFinancing.advertisedRate
                            ? `${config.sellerFinancing.advertisedRate} advertised rate · `
                            : ""}
                          {config.sellerFinancing.termsSummary}
                        </p>
                        <small>
                          Availability, final terms, documentation, and buyer
                          qualification require direct seller{config.sellerDirect ? "" : " and broker"} confirmation.
                        </small>
                      </article>
                    ) : null}
                    {config.sbaFinancing ? (
                      <article className="featured-business-financing-card">
                        <span>
                          {config.sbaFinancing.status === "lender-reviewed"
                            ? "Lender-Reviewed"
                            : "SBA Financing Information"}
                        </span>
                        <strong>SBA Financing May Be Available</strong>
                        <p>{config.sbaFinancing.termsSummary}</p>
                        <small>
                          SBA eligibility and all credit, underwriting,
                          collateral, and approval decisions belong to the
                          participating lender and, where applicable, the SBA.
                        </small>
                      </article>
                    ) : null}
                  </div>
                </section>
              ) : null}

              <div className="marketplace-listing-note">
                <strong>{config.sellerDirect ? tr("Direct seller disclosure", "Divulgación de venta directa") : tr("Third-party broker disclosure", "Divulgación sobre corredor externo")}</strong>
                {config.sellerDirect ? <p>{tr(`This business is offered directly by ${config.broker.name}. Florida Liquor License Market provides marketplace exposure and is not acting as the seller’s broker or transaction representative. Availability, package terms, license status and transfer requirements should be confirmed directly with the seller.`, `Este negocio es ofrecido directamente por ${config.broker.name}. Florida Liquor License Market proporciona exposición en el mercado y no actúa como corredor ni representante de la vendedora. La disponibilidad, los términos del paquete, el estado de la licencia y los requisitos de cambio de titularidad deben confirmarse directamente con la vendedora.`)}</p> : <p>
                  {tr("This featured listing is represented by", "Este anuncio destacado está representado por")} {config.broker.name} {tr("of", "de")}{" "}
                  <a
                    className={`featured-business-disclosure-link${isWeSellRestaurantsBroker ? " we-sell-restaurants-disclosure-link" : ""}`}
                    href={isWeSellRestaurantsBroker ? config.broker.website : config.broker.listingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {config.broker.brokerage}
                  </a>
                  . {tr("Florida Liquor License Market is providing marketplace exposure and is not acting as the seller’s broker or transaction representative. Availability, package terms, license status, transferability, and all transaction information should be confirmed directly with the listing broker.", "Florida Liquor License Market proporciona exposición en el mercado y no actúa como corredor del vendedor ni como representante de la transacción. La disponibilidad, los términos del paquete, el estado y la transferibilidad de la licencia y toda la información de la transacción deben confirmarse directamente con el corredor del anuncio.")}
                </p>}
              </div>

              <section className="marketplace-listing-section">
                <h2>{tr("About This Business & License Listing", "Acerca de este anuncio de negocio y licencia")}</h2>
                <p>
                  <strong className={isSfsListing ? "featured-business-sfs-lead" : undefined}>{is2copListing ? tr("Business & 2COP Beer & Wine License:", "Negocio y licencia 2COP de cerveza y vino:") : isSfsListing ? tr("Business & 4COP SFS / SRX Full-Liquor License:", "Negocio y licencia completa de bebidas alcohólicas 4COP SFS / SRX:") : tr("Business purchase required:", "Compra del negocio requerida:")}</strong>{is2copListing ? tr(" the seller offers the 2COP beer-and-wine license with the operating ", " la vendedora ofrece la licencia 2COP de cerveza y vino junto con el ") : isSfsListing ? tr(" the license is tied to the qualifying restaurant operation and licensed premises associated with the ", " la licencia está vinculada a la operación del restaurante que cumple los requisitos y al local autorizado asociado con el ") : tr(" the license is being offered only in connection with the acquisition of the associated ", " la licencia se ofrece únicamente junto con la adquisición del negocio asociado ")}
                  {config.businessLabelLinkUrl ? (
                    <a
                      className="featured-business-label-link featured-business-label-link--body"
                      href={config.businessLabelLinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {config.businessLabel}
                    </a>
                  ) : (
                    config.businessLabel
                  )}
                  . {is2copListing ? tr("License status and any ownership-change requirements must be verified with DBPR; the license is not priced as a separate quota asset.", "El estado de la licencia y cualquier requisito de cambio de titularidad deben verificarse con el DBPR; la licencia no tiene un precio separado como activo de cupo.") : isSfsListing
                    ? tr("It is not an independently transferable quota license.", "No es una licencia de cupo transferible de forma independiente.")
                    : "The liquor license is not currently offered as a standalone sale."}
                </p>
                {!isNonQuotaBusiness ? <p>
                  A Florida quota license may generally be changed between the{" "}
                  <Link
                    className="featured-business-license-type-link featured-business-license-type-link--4cop"
                    href="/license-types/4cop-quota"
                  >
                    4COP Quota
                  </Link>{" "}
                  series and the{" "}
                  <Link
                    className="featured-business-license-type-link featured-business-license-type-link--3ps"
                    href="/license-types/3ps-package-store"
                  >
                    3PS Quota
                  </Link>{" "}
                  series through a DBPR-approved change of license series,
                  subject to applicable premises, zoning, applicant, and
                  regulatory requirements.
                </p> : is2copListing ? <p>{isSpanish ? <>La <Link href="/license-types/2cop-beer-wine">licencia 2COP de cerveza y vino</Link> de Florida es una serie sin cupo para cerveza y vino. No autoriza bebidas destiladas. Confirme el registro de la licencia, el local autorizado, los requisitos del comprador y los requisitos de la transacción con el DBPR.</> : <>Florida&apos;s <Link href="/license-types/2cop-beer-wine">2COP beer-and-wine license</Link> is a non-quota series for beer and wine privileges. It does not authorize spirits. Confirm the license record, licensed premises, buyer qualifications, and transaction requirements with DBPR.</>}</p> : <p>
                  {isSpanish ? (<>Una licencia completa de bebidas alcohólicas <Link className="featured-business-sfs-classification" href="/license-types/4cop-sfs-restaurant">4COP SFS / SRX</Link> se emite para un restaurante que cumple los requisitos y permanece vinculada a la operación de servicio de alimentos que cumple los requisitos, el local aprobado, la aprobación de cambios de propiedad o entidad y el cumplimiento continuo de los requisitos aplicables del DBPR, incluida la prueba de ventas de alimentos y bebidas no alcohólicas.</>) : (<>A <Link className="featured-business-sfs-classification" href="/license-types/4cop-sfs-restaurant">4COP SFS / SRX</Link> full-liquor license is issued to a qualifying restaurant and remains dependent on the qualifying food-service operation, approved premises, ownership or entity-change approval, and continuing compliance with applicable DBPR requirements, including the food-and-nonalcoholic-beverage sales test.</>)}
                </p>}
                {isSfsListing && config.annualLicenseFee ? (
                  <p className="featured-business-renewal-fee">
                    <strong className="featured-business-sfs-lead">
                      {tr("Annual State License Fee:", "Tarifa estatal anual de la licencia:")}
                    </strong>{" "}
                    {tr("The current annual DBPR/DABT fee for a 4COP SFS / SRX license in", "La tarifa anual vigente de DBPR/DABT para una licencia 4COP SFS / SRX en")}{" "}
                    {config.county} {tr("is", "es")} <strong>{config.annualLicenseFee}</strong>.{" "}
                    {tr("Fees may change and should be confirmed with the Florida Division of Alcoholic Beverages and Tobacco.", "Las tarifas pueden cambiar y deben confirmarse con la División de Bebidas Alcohólicas y Tabaco de Florida.")}{" "}
                    <Link className="featured-business-fee-link" href="/resources/license-fees">
                      {tr("View FLLM License Fee Chart →", "Ver la tabla de tarifas de licencias de FLLM →")}
                    </Link>
                  </p>
                ) : null}
              </section>

              <section className="marketplace-listing-section marketplace-listing-seller-details">
                <h2>{tr("Business Offering Details", "Detalles de la oferta comercial")}</h2>
                <p>
                  {config.additionalSellerIntroLinkText &&
                  config.additionalSellerIntro.includes(
                    config.additionalSellerIntroLinkText,
                  ) ? (
                    <>
                      {config.additionalSellerIntro.slice(
                        0,
                        config.additionalSellerIntro.indexOf(
                          config.additionalSellerIntroLinkText,
                        ),
                      )}
                      <a
                        className="featured-business-seller-link featured-business-glimmer-link"
                        href={config.broker.listingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {config.additionalSellerIntroLinkText}
                      </a>
                      {config.additionalSellerIntro.slice(
                        config.additionalSellerIntro.indexOf(
                          config.additionalSellerIntroLinkText,
                        ) + config.additionalSellerIntroLinkText.length,
                      )}
                    </>
                  ) : (
                    config.additionalSellerIntro
                  )}
                </p>
                <p>
                  {tr("The total asking price for the", "El precio total solicitado por el")}{" "}
                  <a
                    className="package-listing-link"
                    href={config.broker.listingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tr("business and license package is", "paquete de negocio y licencia es")} {config.packagePrice}
                  </a>
                  . {config.packageIncludes}
                </p>

                <div className="package-total">
                  <strong>
                    {tr("Business + license package", "Paquete de negocio + licencia")}: {config.packagePrice}.
                  </strong>{" "}
                  {is2copListing
                    ? tr("The 2COP beer-and-wine license is not a quota license. FLLM assigns it no separate license value. The business asking price excludes the separately advertised real estate and inventory unless the seller confirms otherwise.", "La licencia 2COP de cerveza y vino no es una licencia de cupo. FLLM no le asigna un valor separado. El precio solicitado del negocio excluye el inmueble y el inventario anunciados por separado, salvo confirmación distinta de la vendedora.")
                    : isSfsListing
                    ? (isSpanish ? `El precio solicitado de ${config.packagePrice} corresponde al paquete del negocio y la licencia completa de bebidas alcohólicas ${shortLicenseType}. Una licencia de bebidas alcohólicas ${shortLicenseType} no tiene valor transferible independiente y FLLM no le asigna un valor separado.` : `The ${config.packagePrice} asking price applies to the business and ${shortLicenseType} full-liquor license package. A ${shortLicenseType} liquor license has no independent transferable value and FLLM assigns no separate value to it.`)
                    : `The ${shortLicenseType} liquor license is displayed on FLLM at ${config.askingPrice}. Purchase of the associated business is required, and the license is not currently being offered separately.`}
                </div>

                <h3>{tr("Business Details", "Detalles del negocio")}</h3>
                <div
                  className="package-business-grid"
                  aria-label={tr("Business details and definitions", "Detalles y definiciones del negocio")}
                >
                  {standardizedBusinessMetrics.map((metric, index) => {
                    const tooltipId = `${config.listingReference.toLowerCase()}-metric-${index}`;
                    const metricContent = (
                      <>
                        <span>{metric.label}</span>
                        <strong>{metric.value}</strong>
                        {metric.description ? (
                          <span
                            id={tooltipId}
                            className="package-business-tooltip"
                            role="tooltip"
                          >
                            {metric.description}
                            {metric.href ? <small>{tr("Click to read the FLLM guide →", "Haga clic para leer la guía de FLLM →")}</small> : null}
                          </span>
                        ) : null}
                      </>
                    );

                    return metric.href ? (
                      <Link
                        key={metric.label}
                        className="package-business-metric package-business-metric--link"
                        href={metric.href}
                        aria-describedby={metric.description ? tooltipId : undefined}
                      >
                        {metricContent}
                      </Link>
                    ) : (
                      <div
                        key={metric.label}
                        className="package-business-metric"
                        aria-describedby={metric.description ? tooltipId : undefined}
                      >
                        {metricContent}
                      </div>
                    );
                  })}
                </div>

                <h3>{config.opportunitiesHeading}</h3>
                <ul>
                  {config.opportunities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {config.transitionText ? <p>{config.transitionText}</p> : null}
                <p className="package-confidential">
                  <strong>{tr("Confidentiality:", "Confidencialidad:")}</strong>{" "}
                  {config.confidentialityText}
                </p>
                {config.sourceDisclosure ? (
                  <p className="package-source-disclosure">
                    {config.sourceDisclosure}
                  </p>
                ) : null}
              </section>

              <section className="marketplace-listing-section">
                <h2>{isSpanish ? `Contexto del mercado del ${config.county}` : `${config.county} Market Context`}</h2>
                <p>{config.countyContext}</p>
                {config.countyPopulation ? (
                  <p>
                    <strong>{tr("Total county population:", "Población total del condado:")}</strong>{" "}
                    {config.countyPopulation} — {tr("U.S. Census Vintage 2024 estimate", "estimación Vintage 2024 del Censo de EE. UU.")}
                  </p>
                ) : null}
                {!isNonQuotaBusiness ? (
                  <>
                    <p>
                      <Link href={config.countyHref}>
                        View the {config.county} liquor license market →
                      </Link>
                    </p>
                    <p>
                      {is2copListing ? (
                        <Link href="/license-types/2cop-beer-wine">
                          Explore the FLLM 2COP Beer &amp; Wine License Guide →
                        </Link>
                      ) : (
                        <Link href={config.countyValueHref}>
                          Review current {config.county} liquor license values →
                        </Link>
                      )}
                    </p>
                  </>
                ) : null}
              </section>

              {isNonQuotaBusiness ? (
                <section className="marketplace-listing-section">
                  <h2>{is2copListing ? tr("2COP Beer & Wine License Resources", "Recursos sobre la licencia 2COP de cerveza y vino") : tr("4COP SFS / SRX License Resources", "Recursos sobre licencias 4COP SFS / SRX")}</h2>
                  <p>
                    {is2copListing ? tr("Review Florida beer-and-wine licensing and the steps to evaluate a restaurant business acquisition.", "Revise las licencias de cerveza y vino de Florida y los pasos para evaluar la adquisición de un restaurante.") : tr("Review how Florida’s qualification-based 4COP SFS / SRX full-liquor license works, how it differs from a transferable 4COP quota license, and the FLLM resources available for transaction planning.", "Conozca cómo funciona la licencia completa de bebidas alcohólicas 4COP SFS / SRX de Florida basada en requisitos, en qué se diferencia de una licencia de cupo 4COP transferible y qué recursos ofrece FLLM para planificar la transacción.")}
                  </p>
                  <p>
                    <Link href={is2copListing ? "/license-types/2cop-beer-wine" : "/license-types/4cop-sfs-restaurant"}>
                      {is2copListing ? tr("Learn about 2COP beer-and-wine licenses →", "Conozca las licencias 2COP de cerveza y vino →") : tr("Learn about 4COP SFS / SRX full-liquor licenses →", "Conozca las licencias completas de bebidas alcohólicas 4COP SFS / SRX →")}
                    </Link>
                  </p>
                  {!is2copListing ? <p>
                    <Link href="/license-types/4cop-quota#license-comparison-title">
                      {tr("Compare 4COP Quota vs. 4COP SFS / SRX →", "Compare 4COP de cupo con 4COP SFS / SRX →")}
                    </Link>
                  </p> : null}
                  <p>
                    <Link href="/transaction-services">
                      {tr("Explore FLLM Liquor License Transfer Services →", "Explore los servicios de transferencia de licencias de bebidas alcohólicas de FLLM →")}
                    </Link>
                  </p>
                </section>
              ) : null}
            </article>

            <aside
              className={`marketplace-listing-aside marketplace-listing-aside-broker${isNonQuotaBusiness ? " marketplace-listing-aside-sfs" : ""}`}
            >
              <div className="marketplace-listing-action-card">
                <span>{config.sellerDirect ? tr("Direct Seller", "Vendedor directo") : tr("Independent Listing Broker", "Corredor independiente del anuncio")}</span>
                <div className="marketplace-listing-broker-profile">
                  <h2>{config.broker.name}</h2>
                  {config.broker.photo ? (
                    <a
                      className="marketplace-listing-broker-photo"
                      href={config.broker.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${config.broker.name} and ${config.broker.brokerage}`}
                    >
                      <img
                        src={config.broker.photo}
                        alt={`${config.broker.name}, listing broker`}
                        referrerPolicy="no-referrer"
                      />
                    </a>
                  ) : null}
                  <div className="marketplace-listing-broker-contact">
                    {isWeSellRestaurantsBroker ? (
                      <a
                        className="we-sell-restaurants-sidebar-link"
                        href={config.broker.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${config.broker.name}'s ${config.broker.brokerage} broker page`}
                      >
                        <strong>{config.broker.brokerage}</strong>
                      </a>
                    ) : (
                      <strong>{config.broker.brokerage}</strong>
                    )}
                    {config.broker.credential ? (
                      <span className="marketplace-listing-broker-license">
                        {config.broker.credential}
                      </span>
                    ) : null}
                    {config.broker.phone ? <a href={phoneHref(config.broker.phone)}>
                      ☎ {config.broker.phone}
                    </a> : null}
                    {config.broker.email && !config.approvalPreview ? <span className="featured-business-email-copy-row">
                      <a href={`mailto:${config.broker.email}`}>
                        {config.broker.email}
                      </a>
                      <FeaturedBrokerEmailCopyButton
                        email={config.broker.email}
                      />
                    </span> : null}
                  </div>
                </div>
                <a
                  className="marketplace-listing-primary featured-business-call-broker-button"
                  href={phoneHref(config.broker.phone)}
                  aria-label={`Call ${config.sellerDirect ? "seller" : "listing broker"} ${config.broker.name} at ${config.broker.phone}`}
                >
                  <span className="featured-business-call-broker-label">
                    {config.sellerDirect ? tr("Call Seller", "Llamar al vendedor") : tr("Call Listing Broker", "Llamar al corredor")}
                  </span>
                  <span
                    className="featured-business-call-broker-phone"
                    aria-hidden="true"
                  >
                    {config.broker.phone}
                  </span>
                </a>
                <a
                  className="marketplace-listing-text-link"
                  href={config.broker.listingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {config.sellerDirect ? tr("View Original Seller Advertisement →", "Ver el anuncio original de la vendedora →") : tr("Visit Listing Broker Website →", "Visitar el sitio web del corredor →")}
                </a>
                {!config.approvalPreview ? <ListingBrokerInquiryForm
                  listingReference={config.listingReference}
                  listingRequested={isNonQuotaBusiness
                    ? `${config.county} ${shortLicenseType} Restaurant Business`
                    : `${config.county} ${shortLicenseType} Liquor License — Business Purchase Required`}
                  listingCounty={config.county}
                  licenseType={shortLicenseType}
                  askingPrice={isNonQuotaBusiness
                    ? `${config.packagePrice} business asking price; no separate quota-license value`
                    : `${config.askingPrice} license asking price; ${config.packagePrice} total business package`}
                  listingStatus={statusLabel}
                  listingUrl={config.canonicalPath}
                  recipientKind={config.sellerDirect ? "seller" : "broker"}
                  locale={config.locale}
                  showFinancingCalculator
                  financingCalculatorMode={isNonQuotaBusiness ? "sba-business" : "license"}
                  financingPurchasePrice={isNonQuotaBusiness ? config.packagePriceNumber : config.askingPriceNumber}
                  financingDownPayment={isNonQuotaBusiness ? Math.round(config.packagePriceNumber * 0.1) : undefined}
                /> : null}
              </div>

              {isNonQuotaBusiness ? (
                <section
                  className="marketplace-listing-finance-promo marketplace-listing-ira-promo"
                  aria-labelledby="listing-ira-rollover-title"
                >
                  <span>{tr("FLLM Retirement-Fund Coordination", "Coordinación de fondos de jubilación de FLLM")}</span>
                  <h2 id="listing-ira-rollover-title">{tr("Self-Directed IRA Rollover Service", "Servicio de transferencia a una IRA autodirigida")}</h2>
                  <p>
                    {tr("Explore whether eligible retirement funds may be transferred or rolled over to a self-directed IRA structure considered for this business acquisition.", "Explore si fondos de jubilación elegibles pueden transferirse a una estructura IRA autodirigida considerada para esta adquisición comercial.")}
                  </p>
                  <Link
                    className="marketplace-listing-finance-button"
                    href="/self-directed-ira-liquor-license-lending#ira-setup-assistance"
                  >
                    {tr("Review Rollover Assistance", "Revisar asistencia para transferencias")}
                  </Link>
                  <small>
                    {tr("FLLM coordinates administrative setup and introductions only. Custodian acceptance, transaction eligibility, prohibited-transaction review, tax treatment, and any investment decision require independent professional review.", "FLLM únicamente coordina la configuración administrativa y las presentaciones. La aceptación del custodio, la elegibilidad de la transacción, la revisión de transacciones prohibidas, el tratamiento fiscal y cualquier decisión de inversión requieren revisión profesional independiente.")}
                  </small>
                </section>
              ) : (
                <>
                  <section
                    className="marketplace-listing-appraisal-card"
                    aria-labelledby="listing-appraisal-promo-title"
                  >
                    <img
                      src="/assets/fllm-formal-appraisal-preview-v1.webp"
                      alt="Sample FLLM formal liquor license appraisal report"
                    />
                    <div>
                      <span>Professional License Valuation</span>
                      <h2 id="listing-appraisal-promo-title">Order a Liquor License Appraisal</h2>
                      <p>Get a license-specific valuation supported by county market evidence and regulatory research.</p>
                      <Link className="marketplace-listing-appraisal-button" href="/florida-liquor-license-appraisal#order-form">Order an Appraisal</Link>
                      <Link className="marketplace-listing-heat-map-link" href="/?open=heat-map">Explore the Florida License Heat Map →</Link>
                    </div>
                  </section>

                  <section
                    className="marketplace-listing-finance-promo"
                    aria-labelledby="listing-financing-promo-title"
                  >
                    <span>Liquor License Purchase Financing</span>
                    <h2 id="listing-financing-promo-title">Finance the License Component</h2>
                    <p>Request financing consideration through the FLLM Private Lender Network for the qualifying liquor-license component of a transaction.</p>
                    <Link className="marketplace-listing-finance-button" href="/financing#request-financing">Request Financing</Link>
                    <small>All financing is subject to independent lender review, underwriting, collateral eligibility, transaction structure, and approval.</small>
                  </section>
                </>
              )}

              <section
                className="marketplace-listing-sticky-contact"
                aria-label={`Contact ${config.broker.name} about listing ${config.listingReference}`}
              >
                <span>{tr("Interested in this business?", "¿Le interesa este negocio?")}</span>
                <h2>{config.broker.name}</h2>
                <p>{config.broker.brokerage}</p>
                <a
                  className="marketplace-listing-sticky-contact-call"
                  href={phoneHref(config.broker.phone)}
                  aria-label={`Call ${config.sellerDirect ? "seller" : "listing broker"} ${config.broker.name} at ${config.broker.phone}`}
                >
                  <span className="marketplace-listing-sticky-contact-call-label">
                    {config.sellerDirect ? tr("Call Seller", "Llamar al vendedor") : tr("Call Listing Broker", "Llamar al corredor")}
                  </span>
                  <span
                    className="marketplace-listing-sticky-contact-call-phone"
                    aria-hidden="true"
                  >
                    {config.broker.phone}
                  </span>
                </a>
                {config.approvalPreview ? <a className="marketplace-listing-sticky-contact-request" href={config.broker.listingUrl} target="_blank" rel="noopener noreferrer">View Seller Advertisement</a> : <a
                  className="marketplace-listing-sticky-contact-request"
                  href={`#${config.listingReference.toLowerCase()}-request-information`}
                >
                  {tr("Request Information", "Solicitar información")}
                </a>}
              </section>
            </aside>
          </div>

          <div className="marketplace-listing-disclaimer">
            {tr("Marketplace information is provided for informational purposes and remains subject to seller or broker confirmation. Florida Liquor License Market does not guarantee business performance, license status, availability, transfer approval, package price, license price, lease terms, or transaction terms. Independent legal, tax, financial, licensing, zoning, and regulatory review is recommended.", "La información del mercado se proporciona únicamente con fines informativos y está sujeta a confirmación por parte del vendedor o corredor. Florida Liquor License Market no garantiza el rendimiento del negocio, el estado o disponibilidad de la licencia, la aprobación de transferencias, el precio del paquete o de la licencia, los términos del arrendamiento ni los términos de la transacción. Se recomienda una revisión legal, fiscal, financiera, de licencias, zonificación y regulación independiente.")}
          </div>
        </div>
      </section>
    </main>
  );
}
