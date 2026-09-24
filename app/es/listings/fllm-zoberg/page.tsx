import type { Metadata } from "next";

import FeaturedThirdPartyBusinessListingPage from "@/components/FeaturedThirdPartyBusinessListingPage";
import {
  defineOfficial4CopSfsBusinessListing,
} from "@/lib/listings/official4CopSfsBusinessListing";

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
const canonicalPath = "/es/listings/fllm-zoberg";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const englishUrl = `${siteUrl}/listings/fllm-zoberg`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/turnkey-mexican-latin-dining-and-entertainment-concept-with-full-liquor/2545461/";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Restaurante mexicano en Miami + licencia 4COP SFS / SRX | Vista previa",
  description:
    "Vista previa para aprobación del corredor de un restaurante mexicano-latino y centro de entretenimiento en Miami-Dade con licencia 4COP SFS / SRX vinculada al local.",
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "en-US": englishUrl,
      "es-US": canonicalUrl,
      "x-default": englishUrl,
    },
  },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Restaurante mexicano-latino en Miami + licencia 4COP SFS / SRX",
    description:
      "Anuncio destacado de un corredor externo representado por Brian Zoberg de Suncoast Business Consultants.",
    siteName: "Florida Liquor License Market",
    locale: "es_US",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurante mexicano-latino en Miami + licencia 4COP SFS / SRX",
    description:
      "Vista previa privada del anuncio destacado para revisión y aprobación del corredor.",
  },
};

const config = defineOfficial4CopSfsBusinessListing({
  listingReference: "FLLM-ZOBERG",
  canonicalPath,
  locale: "es",
  languageAlternates: {
    en: "/listings/fllm-zoberg",
    es: canonicalPath,
  },
  county: "Miami-Dade County",
  countyHref: "/counties/miami-dade",
  countyValueHref: "/counties/miami-dade/liquor-license-value",
  countyCities: "Miami · Doral · Hialeah · Miami Beach",
  countyPopulation: "2,838,461",
  annualLicenseFee: "$1,820",
  askingPrice: "Sin valor separado",
  askingPriceNumber: 0,
  packagePrice: "$1,200,000",
  packagePriceNumber: 1_200_000,
  businessLabel: "restaurante mexicano-latino y centro de entretenimiento",
  businessLabelLinkUrl: sourceListingUrl,
  heroSummary:
    "Restaurante mexicano-latino de servicio completo y centro de entretenimiento establecido en Miami-Dade, ofrecido como adquisición llave en mano con una licencia completa de bebidas alcohólicas 4COP SFS / SRX vinculada al local.",
  broker: {
    name: "Brian Zoberg",
    brokerage: "Suncoast Business Consultants",
    phone: "(305) 301-2443",
    email: "Brian@suncoastbiz.net",
    website: "https://suncoastbiz.net/about-us/",
    listingUrl: sourceListingUrl,
    photo:
      "https://suncoastbiz.net/wp-content/uploads/2026/09/Brian-Pic-2026-Left-upper.jpg",
    credential: "Licencia de corredor inmobiliario de Florida BK3289133",
  },
  additionalSellerIntro:
    "Oportunidad de adquirir como negocio llave en mano un restaurante mexicano de servicio completo, programa de cócteles y centro de entretenimiento bien establecido en Miami-Dade County.",
  packageIncludes:
    "La oferta incluye el negocio de restaurante en operación, sistemas establecidos, muebles, instalaciones y equipo, cocina comercial e infraestructura de bar, derechos de arrendamiento y valor comercial asociado. El restaurante opera con una licencia completa de bebidas alcohólicas 4COP SFS / SRX vinculada a la operación que cumple los requisitos y al local aprobado.",
  businessMetrics: [
    {
      label: "Precio de venta del negocio",
      value: "$1,200,000",
      description:
        "El precio solicitado por el vendedor para el negocio en operación y los activos incluidos en la transacción. El precio final, los activos incluidos, el capital de trabajo y los costos de la transacción están sujetos a negociación y verificación.",
    },
    {
      label: "Ingresos brutos",
      value: "$3,280,000",
      description:
        "Las ventas anuales del negocio antes de gastos operativos, servicio de deuda, impuestos, compensación del propietario y otras deducciones.",
    },
    {
      label: "Flujo de caja (SDE)",
      value: "$388,520",
      description:
        "SDE significa ganancias discrecionales del vendedor: ganancias del negocio ajustadas para reflejar el beneficio económico disponible para un propietario-operador antes de partidas como compensación del propietario, intereses, impuestos, depreciación, amortización y ciertos gastos discrecionales o no recurrentes.",
    },
    {
      label: "SDE ajustado",
      value: "$362,000",
      description:
        "Una estimación ajustada de las ganancias discrecionales del vendedor después de los cambios de normalización indicados. Los compradores deben solicitar el detalle de los ajustes y compararlo con las declaraciones de impuestos y los estados financieros.",
    },
    {
      label: "Clasificación de la licencia",
      value: "4COP SFS / SRX",
      description:
        "4COP autoriza cerveza, vino y bebidas destiladas para consumo en el local autorizado. SFS significa Servicio Especial de Alimentos y SRX se usa comúnmente para esta categoría de restaurante que cumple los requisitos. Esta licencia basada en requisitos depende del restaurante y del local aprobado y no constituye un activo de cupo transferible por separado.",
      href: "/license-types/4cop-sfs-restaurant",
    },
    {
      label: "Local",
      value: "5,242 pies² arrendados",
      description:
        "El tamaño total indicado del local arrendado del restaurante. Los compradores deben verificar el área utilizable, los términos del arrendamiento, el uso permitido, las opciones de renovación y los derechos de cesión.",
    },
    {
      label: "Alquiler mensual",
      value: "$33,162",
      description:
        "La cantidad pagada cada mes por ocupar el local comercial. Confirme si incluye cargos de áreas comunes, impuestos sobre la propiedad, seguro, alquiler porcentual u otros costos de ocupación.",
    },
    {
      label: "Empleados",
      value: "28 tiempo completo · 4 medio tiempo",
      description:
        "El número de empleados a tiempo completo y parcial asociados con el negocio. La nómina, la condición de contratista, los beneficios, los horarios y la continuidad laboral deben verificarse de forma independiente.",
    },
    {
      label: "Servicio de alimentos",
      value: "Cocina completa, campana y trampa de grasa",
      description:
        "Los sistemas y equipos de cocina utilizados para preparar y servir alimentos. El estado y la propiedad del equipo, los permisos, el cumplimiento de códigos y las obligaciones de mantenimiento requieren inspección y verificación.",
    },
    {
      label: "Entretenimiento",
      value: "Música en vivo · DJs · eventos privados",
      description:
        "Los tipos de entretenimiento ofrecidos en el local. Los compradores deben confirmar la zonificación, la ocupación, el ruido, los horarios nocturnos y las autorizaciones de entretenimiento.",
    },
    {
      label: "Canales de ingresos",
      value: "Consumo en local · para llevar · entrega · catering",
      description:
        "Las formas en que el negocio genera ventas. Los compradores deben verificar la contribución a los ingresos, los márgenes y los contratos asociados con cada canal.",
    },
    {
      label: "Opciones de visa",
      value: "E-2 / L-1 / EB-5 anunciadas",
      description:
        "Categorías de inmigración que pueden considerarse en relación con una inversión empresarial que cumpla los requisitos. Esto no garantiza elegibilidad ni aprobación; los compradores deben obtener asesoramiento de un abogado de inmigración calificado.",
    },
  ],
  opportunitiesHeading: "Aspectos destacados de la oferta",
  opportunities: [
    "Adquirir un restaurante mexicano-latino de servicio completo, llave en mano, con una base de clientes y sistemas operativos establecidos.",
    "Continuar los ingresos provenientes del consumo en el local, pedidos para llevar, entregas, catering, eventos privados y bebidas.",
    "Operar el concepto existente de restaurante con bebidas alcohólicas completas, sujeto a la aprobación del DBPR y al cumplimiento continuo de los requisitos SFS.",
    "Ampliar el marketing, el catering, los eventos privados, las ubicaciones adicionales o las iniciativas de franquicia.",
  ],
  transitionText:
    "El vendedor ofrece capacitación de transición y consultoría después del cierre, sujeto al acuerdo final con el comprador.",
  confidentialityText:
    "el nombre del negocio, el local exacto, los registros financieros, los documentos de arrendamiento y los registros de licencias pueden requerir que el comprador cumpla ciertos requisitos y los confirme directamente con el corredor del anuncio.",
  countyContext:
    "Miami-Dade County es el mayor mercado internacional de hospitalidad de Florida y combina turismo global, finanzas, comercio, cultura, hoteles, restaurantes, vida nocturna, entretenimiento y una población densa durante todo el año.",
});

export default function BrianZobergSpanishFeaturedListingPage() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
