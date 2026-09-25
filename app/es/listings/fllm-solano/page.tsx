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
const canonicalPath = "/es/listings/fllm-solano";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const englishUrl = `${siteUrl}/listings/fllm-solano`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/restaurant-bar-with-outside-seating-on-main-boulevard-in-hollywood-fl/2543711/";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Restaurante/Bar en Hollywood + Licencia 4COP SFS / SRX | Vista Previa del Corredor",
  description:
    "Vista previa para revisión del corredor de un restaurante/bar en Hollywood, Florida, ofrecido por $499,000 con una licencia completa 4COP SFS / SRX vinculada al local.",
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
    title: "Restaurante/Bar en Hollywood + Licencia 4COP SFS / SRX | Vista Previa",
    description:
      "Vista previa privada para revisión del corredor Aquiles Solano Jr., P.A., de Southeast Florida Realty & Management Corp.",
    siteName: "Florida Liquor License Market",
    locale: "es_US",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurante/Bar en Hollywood + Licencia 4COP SFS / SRX | Vista Previa",
    description:
      "Paquete comercial de restaurante/bar en Broward County con licencia completa 4COP SFS / SRX basada en requisitos.",
  },
};

const config = defineOfficial4CopSfsBusinessListing({
  listingReference: "FLLM-SOLANO",
  canonicalPath,
  locale: "es",
  languageAlternates: {
    en: "/listings/fllm-solano",
    es: canonicalPath,
  },
  county: "Broward County",
  countyHref: "/counties/broward",
  countyValueHref: "/counties/broward/liquor-license-value",
  countyCities: "Fort Lauderdale · Hollywood · Pompano Beach · Coral Springs",
  countyPopulation: "2,037,472",
  askingPrice: "Sin valor transferible independiente",
  askingPriceNumber: 0,
  packagePrice: "$499,000",
  packagePriceNumber: 499_000,
  businessLabel: "restaurante/bar en Hollywood con comedor al aire libre",
  businessLabelLinkUrl: sourceListingUrl,
  heroSummary:
    "Restaurante y bar establecido en Hollywood ofrecido como adquisición llave en mano de un negocio en operación con comedor interior y exterior, ubicación de alto tráfico en Broward County y una licencia completa 4COP SFS / SRX basada en requisitos.",
  broker: {
    name: "Aquiles Solano Jr., P.A.",
    brokerage: "Southeast Florida Realty & Management Corp",
    phone: "(305) 525-9962",
    email: "solanojr@sfrmc.com",
    website: "https://www.sfrmc.com/",
    listingUrl: sourceListingUrl,
    photo:
      "https://images.bizbuysell.com/shared/brokerdirectory/images/29626/pf_prs_AquilesJr6.jpg",
    credential: "Licencia de bienes raíces de Florida 3269585",
  },
  additionalSellerIntro:
    "Oportunidad de adquirir un restaurante y bar de servicio completo en el bulevar principal de Hollywood, con capacidad para 120 personas, configuraciones de comedor interior y exterior, sistemas operativos establecidos y fuerte visibilidad para tráfico local y turístico.",
  packageIncludes:
    "La oferta se presenta como una adquisición llave en mano del restaurante/bar en operación, su infraestructura operativa existente y su posición de arrendamiento. El anuncio fuente identifica campana, equipo de cocina, congeladores, refrigeradores, lavavajillas, áreas de preparación y almacenamiento, dos baños, oficina, mesas y sillas interiores y exteriores, sistema de música y bar completo. Los compradores deben confirmar directamente con el corredor los activos finales incluidos, inventario, permisos, términos de cesión del arrendamiento y demás elementos de la transacción.",
  businessMetrics: [
    {
      label: "Precio de venta del negocio",
      value: "$499,000",
      description:
        "El precio solicitado por el vendedor para el restaurante/bar en operación. Los compradores deben confirmar con el corredor la estructura final, los activos incluidos, inventario, capital de trabajo y términos de cierre.",
    },
    {
      label: "Ingresos brutos",
      value: "$1,000,000",
      description:
        "El anuncio fuente declara ingresos brutos anuales de $1,000,000. Los compradores deben conciliar los ingresos con declaraciones de impuestos, estados financieros y registros fuente durante la debida diligencia.",
    },
    {
      label: "Flujo de caja (SDE)",
      value: "No divulgado",
      description:
        "Las ganancias discrecionales del vendedor no fueron divulgadas en el anuncio fuente. Se indica que la documentación financiera detallada está disponible para compradores calificados después de firmar un acuerdo de confidencialidad.",
    },
    {
      label: "EBITDA",
      value: "No divulgado",
      description:
        "El EBITDA no fue divulgado en el anuncio fuente. Los compradores deben solicitar estados financieros y documentación de respaldo a través del corredor.",
    },
    {
      label: "Establecido",
      value: "2025",
      description:
        "El anuncio fuente indica que el negocio actual fue establecido en 2025.",
    },
    {
      label: "Clasificación de licencia",
      value: "4COP SFS / SRX",
      description:
        "Esta es una licencia completa 4COP SFS / SRX basada en requisitos y vinculada a la operación de restaurante que cumple los requisitos y al local aprobado. No es una licencia de cupo transferible de forma independiente y FLLM no asigna un valor transferible separado a la licencia.",
      href: "/license-types/4cop-sfs-restaurant",
    },
    {
      label: "Designación comida / licor",
      value: "51% comida · 49% licor",
      description:
        "El anuncio fuente indica una designación de 51% comida / 49% licor. Los compradores deben confirmar de forma independiente los requisitos actuales de DBPR, calificación, reportes, local y operación.",
    },
    {
      label: "Local",
      value: "1,740 pies² arrendados",
      description:
        "El anuncio fuente indica 1,740 pies cuadrados de local arrendado en Hollywood, Florida. Los compradores deben verificar el área utilizable, uso permitido, ocupación y términos del arrendamiento.",
    },
    {
      label: "Alquiler mensual",
      value: "$7,600",
      description:
        "El anuncio fuente indica alquiler mensual de $7,600. Confirme si aplican cargos adicionales de ocupación, impuestos, seguro, CAM o renta porcentual.",
    },
    {
      label: "Vencimiento del arrendamiento",
      value: "12/19/2030",
      description:
        "El anuncio fuente indica una fecha de vencimiento del arrendamiento del 19 de diciembre de 2030. Deben verificarse los derechos de cesión, opciones y aprobación del arrendador.",
    },
    {
      label: "Capacidad de asientos",
      value: "120 personas",
      description:
        "El anuncio fuente indica capacidad total para 120 personas con configuraciones de comedor interior y exterior.",
    },
    {
      label: "Empleados",
      value: "7 · 4 tiempo completo · 3 medio tiempo",
      description:
        "El anuncio fuente reporta siete empleados: cuatro a tiempo completo y tres a tiempo parcial. Los compradores deben verificar nómina, funciones, beneficios y continuidad laboral.",
    },
    {
      label: "Instalaciones",
      value: "Cocina completa · bar completo · comedor exterior",
      description:
        "El anuncio fuente identifica campana, equipo de cocina, congeladores, refrigeradores, lavavajillas, áreas de preparación y almacenamiento, dos baños, oficina, mesas y sillas interiores y exteriores, sistema de música y bar completo.",
    },
    {
      label: "Competencia",
      value: "Muchos restaurantes y bares cercanos",
      description:
        "El anuncio fuente describe la ubicación como excelente y señala muchos restaurantes y bares en el mercado circundante.",
    },
    {
      label: "Motivo de venta",
      value: "Los socios siguen caminos separados",
      description:
        "El anuncio fuente indica desacuerdo entre los socios propietarios y que seguirán caminos separados.",
    },
  ],
  opportunitiesHeading: "Aspectos destacados de la oferta",
  opportunities: [
    "Adquirir un restaurante y bar de servicio completo, llave en mano, en Hollywood con base de clientes establecida e infraestructura operativa existente.",
    "Operar desde una ubicación de alta visibilidad en el bulevar principal, atendiendo tráfico local y turístico con comedor interior y exterior.",
    "Continuar las operaciones de restaurante con bebidas alcohólicas completas, sujeto a aprobación de DBPR y al cumplimiento continuo de la calificación 4COP SFS / SRX.",
    "Aprovechar el historial declarado de $1,000,000 en ingresos brutos, capacidad para 120 personas y componente escalable de comedor al aire libre.",
  ],
  confidentialityText:
    "se indica que la documentación financiera detallada y las métricas operativas están disponibles para compradores calificados después de firmar un acuerdo de confidencialidad. La identidad exacta del negocio, el local, los registros financieros, documentos de arrendamiento, activos incluidos y registros de licencias deben confirmarse directamente a través del corredor.",
  sourceDisclosure:
    "Vista previa para revisión del corredor basada en el anuncio fuente identificado como BizBuySell Ad #2543711 y en información pública del perfil del corredor. FLLM no ha verificado de forma independiente la información comercial proporcionada por el vendedor.",
  countyContext:
    "Broward County es un importante mercado del sur de Florida alrededor de Fort Lauderdale y Hollywood, con alta densidad de población, playas, navegación, turismo, restaurantes, vida nocturna, entretenimiento y demanda hotelera durante todo el año.",
});

export default function AquilesSolanoSpanishBrokerPreviewPage() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
