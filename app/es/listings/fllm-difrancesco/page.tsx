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
const canonicalPath = "/es/listings/fllm-difrancesco";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const englishUrl = `${siteUrl}/listings/fllm-difrancesco`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/beachside-restaurant-and-nightclub-with-liquor-license-and-steady-revenue/2397061/";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Restaurante y club nocturno frente a la playa + Licencia 4COP Quota | Vista previa",
  description:
    "Vista previa privada para revisión del corredor de un restaurante y club nocturno en Broward County ofrecido por $1,650,000 con una licencia de cupo transferible incluida.",
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "en-US": englishUrl,
      "es-US": canonicalUrl,
      "x-default": englishUrl,
    },
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      noimageindex: true,
    },
  },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title:
      "Restaurante y club nocturno frente a la playa + Licencia de cupo | Vista previa",
    description:
      "Vista previa privada de FLLM representada por Nick DiFrancesco de Business Exit Advisors.",
    siteName: "Florida Liquor License Market",
    locale: "es_US",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Restaurante y club nocturno frente a la playa + Licencia de cupo | Vista previa",
    description:
      "Vista previa privada de FLLM representada por Nick DiFrancesco de Business Exit Advisors.",
  },
};

const config: FeaturedThirdPartyBusinessListingConfig = {
  listingReference: "FLLM-DIFRANCESCO",
  canonicalPath,
  locale: "es",
  languageAlternates: {
    en: "/listings/fllm-difrancesco",
    es: canonicalPath,
  },
  county: "Broward County",
  countyHref: "/counties/broward",
  countyValueHref: "/counties/broward/liquor-license-value",
  countyCities: "Fort Lauderdale · Hollywood · Pompano Beach · Deerfield Beach",
  countyPopulation: "2,037,472",
  askingPrice: "El corredor indica casi $500,000",
  askingPriceNumber: 500000,
  marketMedianAskingPrice: "$225,000",
  marketMedianAskingPriceNumber: 225000,
  packagePrice: "$1,650,000",
  packagePriceNumber: 1_650_000,
  licenseType: "4COP Quota",
  approvalPreview: true,
  businessLabel: "Restaurante frente a la playa y club nocturno",
  businessLabelLinkUrl: sourceListingUrl,
  heroSummary:
    "Restaurante y club nocturno frente a la playa en Broward County ofrecido como adquisición llave en mano, con ingresos estables, música en vivo, actividad nocturna, instalaciones recientemente remodeladas y una licencia de licor de cupo 4COP / 3PS transferible incluida.",
  broker: {
    name: "Nick DiFrancesco",
    brokerage: "Business Exit Advisors",
    phone: "(561) 578-0584",
    email: "nick@myexitplan.com",
    website: "https://businesssaleslistings.com",
    listingUrl: sourceListingUrl,
    photo:
      "https://images.bizbuysell.com/shared/brokerdirectory/images/50260/pf_prs_headshot.jpeg",
    credential: "Corredor de negocios con licencia de Florida · SL3626742",
  },
  additionalSellerIntro:
    "Oportunidad de adquirir un restaurante y club nocturno frente a la playa en Broward County, llave en mano y a poca distancia de la playa, posicionado para comidas, música en vivo, baile y tráfico nocturno.",
  packageIncludes:
    "La oferta incluye el restaurante y club nocturno en operación, aproximadamente $15,000 de inventario, aproximadamente $475,000 en muebles, accesorios y equipo, las instalaciones hoteleras recientemente remodeladas de 3,000 pies cuadrados y la licencia de licor de cupo transferible asociada. La licencia de licor de cupo 4COP incluida tiene un valor estimado de $225,000 basado en el precio mediano calculado por FLLM para Broward County. El precio total solicitado por el negocio es de $1,650,000. Los compradores deben confirmar directamente con el corredor la serie exacta de la licencia, los activos incluidos, los términos del arrendamiento, la asignación de valor de la licencia y la estructura de la transacción.",
  businessMetrics: [
    {
      label: "Ingresos brutos",
      value: "$1,616,822",
      description:
        "Se declaran ingresos brutos de $1,616,822. Los compradores deben verificar el período reportado y conciliar los ingresos con los registros financieros.",
    },
    {
      label: "Flujo de caja (SDE)",
      value: "$285,735",
      description:
        "Se declaran ganancias discrecionales del vendedor de $285,735. Los compradores deben conciliar esta cifra con declaraciones de impuestos, estados financieros y documentación de respaldo durante la debida diligencia.",
    },
    {
      label: "Licencia",
      value: "Licencia de cupo 4COP / 3PS incluida",
      description:
        "La licencia de licor de cupo 4COP incluida tiene un valor estimado de $225,000 basado en el precio mediano calculado por FLLM para Broward County. La mediana de FLLM es contexto de mercado, no una tasación de esta licencia específica. Los compradores deben confirmar con el corredor y DBPR/ABT la serie actual exacta, el estado de cupo, la titularidad y la transferibilidad.",
      href: "/license-types/4cop-quota",
    },
    {
      label: "Muebles, accesorios y equipo",
      value: "$475,000 incluidos",
      description:
        "Aproximadamente $475,000 en muebles, accesorios y equipo están incluidos en el precio solicitado.",
    },
    {
      label: "Inventario",
      value: "$15,000 incluido",
      description:
        "Aproximadamente $15,000 de inventario están incluidos en el precio solicitado.",
    },
    {
      label: "Empleados",
      value: "11",
      description:
        "Se indica que el negocio cuenta con 11 empleados. Los compradores deben verificar nómina, funciones, horarios y continuidad laboral.",
    },
    {
      label: "Establecido",
      value: "2006",
      description:
        "Se indica que el negocio fue establecido en 2006.",
    },
    {
      label: "Local",
      value: "3,000 pies²",
      description:
        "El local tiene aproximadamente 3,000 pies cuadrados y está configurado como una operación de restaurante llave en mano. Los compradores deben verificar el tamaño exacto, los términos del arrendamiento, el uso permitido y la ocupación.",
    },
    {
      label: "Instalaciones",
      value: "Interior remodelado · bar exterior mejorado",
      description:
        "Las instalaciones incluyen baños actualizados, muebles nuevos, un interior rediseñado y un área de bar exterior mejorada.",
    },
    {
      label: "Competencia / posicionamiento",
      value: "Zona hotelera frente a la playa de alto tráfico",
      description:
        "El negocio ocupa una ubicación de alto tráfico con servicio completo de bebidas alcohólicas, horario extendido, comidas, música en vivo y posicionamiento nocturno.",
    },
    {
      label: "Capacitación del vendedor",
      value: "14 días hábiles",
      description:
        "El vendedor proporcionará 14 días hábiles de capacitación sin costo después del cierre.",
    },
    {
      label: "Motivo de venta",
      value: "Razones familiares",
      description:
        "El motivo declarado de la venta está relacionado con la familia.",
    },
  ],
  opportunitiesHeading: "Aspectos destacados de la oferta",
  opportunities: [
    "Adquirir un restaurante y club nocturno frente a la playa en Broward County, llave en mano y a poca distancia de la playa.",
    "Continuar un concepto hotelero conocido por música en vivo, baile, vida nocturna y un evento semanal apoyado por la comunidad.",
    "Operar con la licencia de licor de cupo transferible asociada, sujeto a la aprobación del comprador, el local y DBPR/ABT.",
    "Aprovechar el interior recientemente remodelado, los baños actualizados, los muebles nuevos y el área de bar exterior mejorada.",
    "Desarrollar los ingresos brutos reportados de $1,616,822 y el SDE de $285,735 mediante marketing digital, eventos e iniciativas de retención de clientes.",
  ],
  transitionText:
    "El vendedor proporcionará 14 días hábiles de capacitación sin costo después del cierre. El motivo declarado de la venta está relacionado con la familia.",
  confidentialityText:
    "el nombre del negocio, el local exacto, los documentos de arrendamiento, estados financieros, registros de licencia y otra información sensible pueden requerir calificación del comprador y confirmación directa a través del corredor.",
  sourceDisclosure:
    "Las cifras comerciales, financieras, de instalaciones, personal, activos y demás información no han sido auditadas ni verificadas de forma independiente por FLLM. Los datos actuales de FLLM para Broward County muestran un valor mediano de $225,000 para inventario comparable de licencias 4COP de cupo independientes. Este punto de referencia de mercado no es una tasación ni un valor asignado a la licencia específica incluida en esta transacción. Los compradores deben verificar la serie actual, estado de cupo, titularidad, transferibilidad, local, zonificación, condiciones del arrendamiento, desempeño financiero, activos incluidos y todos los términos de la transacción directamente con Nick DiFrancesco, el vendedor y los asesores profesionales correspondientes.",
  countyContext:
    "Broward County sostiene un importante mercado de restaurantes, vida nocturna, hotelería y turismo en Fort Lauderdale, Hollywood, Pompano Beach, Deerfield Beach y comunidades cercanas. Los valores de licencias de cupo pueden variar de forma significativa según la oferta, los términos del vendedor, el local previsto, el calendario y la estructura de la transacción.",
};

export default function NickDiFrancescoSpanishFeaturedListingPreviewPage() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
