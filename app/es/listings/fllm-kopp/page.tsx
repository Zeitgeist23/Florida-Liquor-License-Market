import type { Metadata } from "next";

import FeaturedThirdPartyBusinessListingPage, {
  type FeaturedThirdPartyBusinessListingConfig,
} from "@/components/FeaturedThirdPartyBusinessListingPage";

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
const canonicalPath = "/es/listings/fllm-kopp";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const englishUrl = `${siteUrl}/listings/fllm-kopp`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/prime-location-in-miami-established-peruvian-mediterranean-restauran/2479201/";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Restaurante peruano en Miami + licencia 2COP de cerveza y vino | Vista previa",
  description:
    "Vista previa para aprobación de la vendedora de un restaurante peruano-mediterráneo establecido en Miami-Dade con licencia 2COP de cerveza y vino.",
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "en-US": englishUrl,
      "es-US": canonicalUrl,
      "x-default": englishUrl,
    },
  },
  robots: { index: false, follow: false, noarchive: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Restaurante peruano en Miami + licencia 2COP de cerveza y vino",
    description:
      "Vista previa destacada de venta directa de un restaurante peruano-mediterráneo establecido en Miami-Dade County.",
    siteName: "Florida Liquor License Market",
    locale: "es_US",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurante peruano en Miami + licencia 2COP de cerveza y vino",
    description:
      "Maqueta privada del anuncio destacado para revisión y aprobación de la vendedora.",
  },
};

const config: FeaturedThirdPartyBusinessListingConfig = {
  listingReference: "FLLM-KOPP",
  canonicalPath,
  locale: "es",
  languageAlternates: {
    en: "/listings/fllm-kopp",
    es: canonicalPath,
  },
  county: "Miami-Dade County",
  countyHref: "/counties/miami-dade",
  countyValueHref: "/counties/miami-dade/liquor-license-value",
  countyCities: "Miami · Doral · Hialeah · Miami Beach",
  countyPopulation: "2,838,461",
  askingPrice: "Sin valor independiente",
  askingPriceNumber: 0,
  packagePrice: "$599,999",
  packagePriceNumber: 599_999,
  licenseType: "2COP Beer & Wine",
  licenseClass: "2cop",
  sellerDirect: true,
  businessLabel: "restaurante peruano-mediterráneo",
  businessLabelLinkUrl: sourceListingUrl,
  heroSummary:
    "Restaurante peruano-mediterráneo establecido en Miami-Dade, ofrecido como adquisición de un negocio en operación con una licencia 2COP de cerveza y vino.",
  broker: {
    name: "Marianella Kopp",
    brokerage: "Venta directa",
    phone: "(786) 477-3541",
    email: "",
    website: sourceListingUrl,
    listingUrl: sourceListingUrl,
  },
  additionalSellerIntro:
    "Oportunidad de adquirir como negocio llave en mano un restaurante peruano-mediterráneo establecido en Miami-Dade County.",
  packageIncludes:
    "La oferta incluye el restaurante en operación, su licencia 2COP de cerveza y vino, y aproximadamente $500,000 en muebles, instalaciones y equipo. Aproximadamente $40,000 de inventario y el inmueble ofrecido por separado no están incluidos en el precio anunciado del negocio. El uso de la licencia y los cambios de titularidad permanecen sujetos a la aprobación del DBPR y al local aprobado.",
  businessMetrics: [
    {
      label: "Precio de venta del negocio",
      value: "$599,999",
      description:
        "El precio solicitado por la vendedora para el restaurante en operación y los activos incluidos. El inmueble y el inventario se ofrecen por separado.",
    },
    {
      label: "Ingresos brutos anuales",
      value: "$980,000",
      description:
        "Las ventas anuales indicadas antes de gastos operativos, servicio de deuda, impuestos, compensación del propietario y otras deducciones. Los compradores deben verificar los registros financieros directamente con la vendedora.",
    },
    {
      label: "Establecido",
      value: "2007",
      description:
        "El año de establecimiento y el historial operativo indicados para el restaurante.",
    },
    {
      label: "Muebles, instalaciones y equipo",
      value: "Aproximadamente $500,000",
      description:
        "El valor indicado de los muebles, instalaciones y equipo incluidos con el negocio. Los compradores deben confirmar la propiedad, el estado y los artículos incluidos.",
    },
    {
      label: "Tipo de licencia",
      value: "2COP Beer & Wine",
      description:
        "Una licencia 2COP autoriza cerveza y vino para consumo en el local aprobado. No autoriza bebidas destiladas y no es una licencia de cupo del condado transferible de manera independiente.",
      href: "/license-types/2cop-beer-wine",
    },
    {
      label: "Local del restaurante",
      value: "2,725 pies²",
      description:
        "El tamaño indicado del local. Los compradores deben verificar el área utilizable, el uso permitido, la ocupación y la aprobación del local.",
    },
    {
      label: "Asientos del restaurante",
      value: "80 asientos permitidos",
      description:
        "La capacidad permitida indicada. La posible ampliación a 120 asientos permanece sujeta a las aprobaciones aplicables.",
    },
    {
      label: "Financiamiento de la vendedora",
      value: "Hasta 40% anunciado",
      description:
        "La vendedora anuncia financiamiento de hasta el 40% del precio solicitado, sujeto a la calificación del comprador y a términos acordados mutuamente.",
    },
    {
      label: "Apoyo de transición",
      value: "Aproximadamente dos semanas",
      description:
        "La vendedora ofrece aproximadamente dos semanas de capacitación de transición, sujeto al contrato de compraventa final.",
    },
    {
      label: "Inventario",
      value: "Aproximadamente $40,000",
      description:
        "El inventario indicado no está incluido en el precio solicitado del negocio y debe verificarse antes del cierre.",
    },
    {
      label: "Bien inmueble",
      value: "Ofrecido por separado",
      description:
        "El negocio del restaurante puede adquirirse sin comprar el inmueble. Cualquier transacción inmobiliaria separada requiere términos y diligencia debida independientes.",
    },
    {
      label: "Tipo de transacción",
      value: "Venta de negocio en operación",
      description:
        "La oferta es una adquisición del restaurante en operación y de los activos incluidos, no la venta de una licencia de cupo independiente.",
    },
  ],
  opportunitiesHeading: "Aspectos destacados de la oferta",
  opportunities: [
    "Adquirir un restaurante peruano-mediterráneo establecido y en operación desde 2007.",
    "Continuar el servicio de cerveza y vino bajo la licencia 2COP incluida, sujeto a la aprobación del DBPR y a los requisitos del local.",
    "Adquirir aproximadamente $500,000 en muebles, instalaciones y equipo indicados junto con el negocio.",
    "Considerar el financiamiento anunciado por la vendedora y la posible ampliación de asientos, sujeto a términos finales y aprobaciones aplicables.",
  ],
  transitionText:
    "La vendedora ofrece aproximadamente dos semanas de capacitación de transición, sujeto al acuerdo final con el comprador.",
  confidentialityText:
    "el nombre del negocio, el local exacto, los registros financieros, los términos inmobiliarios y los registros de licencias pueden requerir que el comprador cumpla ciertos requisitos y los confirme directamente con la vendedora.",
  countyContext:
    "Miami-Dade County es el mayor mercado internacional de hospitalidad de Florida y combina turismo global, finanzas, comercio, cultura, hoteles, restaurantes, vida nocturna, entretenimiento y una población densa durante todo el año.",
};

export default function MarianellaSpanishSellerPreview() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
