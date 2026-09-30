import type { Metadata } from "next";

import FeaturedThirdPartyBusinessListingPage, { type FeaturedThirdPartyBusinessListingConfig } from "@/components/FeaturedThirdPartyBusinessListingPage";
import { buildFloridaMarketIndex, marketPriceStats } from "@/lib/florida-market-index";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "@/app/listings/listings-premium.css";
import "@/app/listings/listings-header-position.css";
import "@/app/listings/listings-map-size.css";
import "@/app/listings/listings-county-links.css";
import "@/app/listings/listings-navy-refresh.css";
import "@/app/listings/listings-card-gold-borders.css";
import "@/app/listings/listings-title-highlight.css";
import "@/app/listings/listings-regression-fix.css";
import "@/app/listings/listings-filter-depth.css";
import "@/app/listings/listings-logo-3pct-lock.css";
import "@/app/listings/listings-conversion-cards.css";
import "@/app/listings/listings-card-overlap-fix.css";
import "@/app/listings/listings-masthead-darker.css";
import "@/app/listings/listings-mobile-header-fix.css";
import "@/app/listings/listings-focused-card.css";
import "@/app/listings/[slug]/listing-detail.css";
import "@/app/listings/third-party-business-listing-standard.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const sourceListingUrl = "https://www.bizbuysell.com/business-opportunity/turnkey-downtown-hollywood-nightclub-1-1m-gross-revenue-4cop-lice/2494332/";
const socialImageUrl = "https://images.bizbuysell.com/shared/brokerdirectory/images/52324/pf_prs_IMG_3680.JPG";

export const dynamic = "force-dynamic";

const canonicalPath = "/es/listings/vlasova";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

export const metadata: Metadata = {
  title: "Club nocturno en Downtown Hollywood + Licencia 4COP Quota | Vista previa",
  description: "Vista previa para revisión de la corredora Mariya Vlasova de un club nocturno en Downtown Hollywood ofrecido por $790,000 con licencia 4COP Quota del condado de Broward.",
  alternates: { canonical: canonicalUrl, languages: { "en-US": `${siteUrl}/listings/vlasova`, "es-US": canonicalUrl, "ru-RU": `${siteUrl}/ru/listings/vlasova`, "x-default": `${siteUrl}/listings/vlasova` } },
  robots: { index: false, follow: false, noarchive: true },
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

async function buildConfig(): Promise<FeaturedThirdPartyBusinessListingConfig> {
  const visibleListings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());
  const browardFourCop = visibleListings.filter((listing) => listing.county === "Broward County" && listing.type === "4COP Quota");
  const fourCopStats = marketPriceStats(browardFourCop.map((listing) => listing.price));
  const marketIndex = buildFloridaMarketIndex(visibleListings);
  const browardMarket = marketIndex.countyRows.find((row) => row.county === "Broward County");
  const medianValue = fourCopStats.median ?? browardMarket?.fourCop.median ?? 250_000;
  const medianLabel = money(medianValue);
  const countyPopulation = (browardMarket?.population ?? 2_037_472).toLocaleString("en-US");

  return {
    listingReference: "FLLM-VLASOVA",
    canonicalPath,
    locale: "es",
    languageAlternates: { en: "/listings/vlasova", es: canonicalPath, ru: "/ru/listings/vlasova" },
    county: "Broward County",
    countyHref: "/counties/broward",
    countyValueHref: "/counties/broward/liquor-license-value",
    countyCities: "Hollywood · Fort Lauderdale · Pompano Beach · Pembroke Pines",
    countyPopulation,
    askingPrice: "Incluida en el paquete",
    askingPriceNumber: 0,
    marketMedianAskingPrice: medianLabel,
    marketMedianAskingPriceNumber: medianValue,
    packagePrice: "$790,000",
    packagePriceNumber: 790_000,
    licenseType: "4COP Quota",
    licenseAvailableSeparately: false,
    approvalPreview: true,
    businessLabel: "Club nocturno llave en mano en Downtown Hollywood",
    businessLabelLinkUrl: sourceListingUrl,
    businessLabelBodyBold: false,
    packagePriceExternalLink: true,
    packagePricePhrase: "paquete de club nocturno + licencia de licor 4COP Quota:",
    heroSummary: "Oportunidad de vida nocturna llave en mano en Downtown Hollywood ofrecida como restaurante, bar, lounge y club nocturno en operación con una licencia de licor 4COP Quota del condado de Broward incluida. Paquete de negocio + licencia de licor 4COP Quota: $790,000.",
    broker: {
      name: "Mariya Vlasova",
      brokerage: "Mariya Vlasova Real Estate",
      phone: "(321) 209-7182",
      email: "vlasovarealestate@gmail.com",
      website: "https://www.vlasovarealestate.com/",
      listingUrl: sourceListingUrl,
      photo: socialImageUrl,
      credential: "Licencia de bienes raíces de Florida SL3550830",
    },
    additionalSellerIntro: "Oportunidad para adquirir un restaurante, bar, lounge y club nocturno llave en mano en Downtown Hollywood, en una ubicación privilegiada de entretenimiento, con licencia completa 4COP Quota incluida.",
    packageIncludes: `El paquete de $790,000 incluye el negocio de vida nocturna en operación, la licencia 4COP Quota del condado de Broward, muebles, accesorios y equipos, bar, equipo de cocina, asientos de comedor y lounge, decoración, iluminación, sonido y equipo de entretenimiento, sitio web, marca e infraestructura operativa existente. El negocio se ofrece sin bienes raíces. La mediana actual de precios solicitados de FLLM para licencias 4COP en Broward County es ${medianLabel}; es contexto de mercado, no una tasación ni un valor asignado a esta licencia.`,
    businessMetrics: [
      { label: "Ingresos brutos", value: "$1,100,000", description: "Ingresos brutos anuales de $1,100,000. Los compradores deben conciliarlos con estados financieros, declaraciones de impuestos y registros de respaldo durante la debida diligencia." },
      { label: "Flujo de caja (SDE)", value: "No divulgado", description: "No se han divulgado las ganancias discrecionales del vendedor." },
      { label: "Precio de venta del negocio", value: "$790,000", description: "El paquete del negocio se ofrece por $790,000. Los compradores deben confirmar la estructura final de la transacción y los activos incluidos directamente con la corredora." },
      { label: "EBITDA", value: "No divulgado", description: "No se ha divulgado EBITDA." },
      { label: "Establecido", value: "2021", description: "El negocio fue establecido en 2021." },
      { label: "Clasificación de licencia", value: "4COP Quota", description: "Se incluye una licencia completa de bebidas alcohólicas 4COP Quota del condado de Broward, sujeta a calificación del comprador, local, zonificación y aprobación de DBPR/ABT.", href: "/license-types/4cop-quota" },
      { label: "Mediana FLLM 4COP Quota de Broward", value: medianLabel, description: `Calculada con inventario activo independiente 4COP Quota en Broward County. Licencias incluidas en el cálculo: ${fourCopStats.count}. Es contexto de mercado, no una tasación.`, href: "/counties/broward/liquor-license-value" },
      { label: "Muebles, accesorios y equipos", value: "$200,000 incluidos", description: "Aproximadamente $200,000 en muebles, accesorios y equipos están incluidos en el precio solicitado." },
      { label: "Empleados", value: "8 a tiempo completo", description: "El negocio tiene ocho empleados a tiempo completo." },
      { label: "Local", value: "7,828 pies² arrendados", description: "El local operativo tiene aproximadamente 7,828 pies cuadrados y es arrendado." },
      { label: "Alquiler mensual", value: "$17,490", description: "El alquiler mensual es de $17,490. Deben verificarse contrato, cesión, opciones, CAM y requisitos del propietario." },
      { label: "Bienes raíces", value: "No incluidos", description: "Es una venta del negocio; los bienes raíces no están incluidos." },
      { label: "Motivo de venta", value: "Otros intereses comerciales", description: "El vendedor está concentrándose en otros intereses comerciales." },
    ],
    opportunitiesHeading: "Aspectos destacados de la oferta",
    opportunities: [
      "Adquirir una operación llave en mano de restaurante, bar, lounge y club nocturno en Downtown Hollywood.",
      "Operar con una licencia completa 4COP Quota de Broward County incluida, sujeta a aprobación de DBPR/ABT.",
      "Adquirir aproximadamente $200,000 en muebles, accesorios y equipos incluidos en el precio.",
      "Aprovechar ingresos brutos anuales de $1,100,000 y la infraestructura existente de comedor, vida nocturna, entretenimiento y eventos.",
      "Expandir eventos privados, reservaciones VIP, marketing digital, programación de entretenimiento y promociones temáticas.",
    ],
    transitionText: "El vendedor está dispuesto a proporcionar un período razonable de transición para familiarizar al comprador con las operaciones diarias, el personal, proveedores, menú, formato de eventos y procedimientos generales del negocio.",
    confidentialityText: "las consultas serias deben confirmar directamente con la corredora la identidad del negocio, registros financieros, contrato de arrendamiento, registros de licencia, activos incluidos y términos de la transacción antes de confiar en ellos.",
    sourceDisclosure: "La información comercial, financiera, de arrendamiento, licencia y operación debe verificarse de forma independiente durante la debida diligencia antes de depender de ella o cerrar la transacción.",
    countyContext: "Broward County incluye Hollywood, Fort Lauderdale, Pompano Beach, Pembroke Pines, Coral Springs, Miramar y otros importantes mercados de hospitalidad y vida nocturna del sur de Florida.",
    singleExternalLinks: true,
    sourceListingLinkLabel: "Ver anuncio original en BizBuySell →",
  };
}

export default async function MariyaVlasovaSpanishPreviewPage() {
  const config = await buildConfig();
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
