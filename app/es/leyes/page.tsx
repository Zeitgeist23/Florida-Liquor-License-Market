import type { Metadata } from "next";
import Link from "next/link";
import SpanishPageShell from "@/components/es/SpanishPageShell";

const url = "https://www.floridaliquorlicensemarket.com/es/leyes";
export const metadata: Metadata = { title: "Leyes de licencias de licor de Florida", description: "Centro introductorio en español con enlaces a leyes, decisiones judiciales y formularios oficiales de licencias de bebidas alcohólicas de Florida.", alternates: { canonical: url, languages: { "es": url, "en-US": "https://www.floridaliquorlicensemarket.com/resources/florida-liquor-license-laws" } } };

export default function SpanishLawsPage() {
  return <SpanishPageShell eyebrow="Leyes y cumplimiento" title="Referencias legales de licencias de bebidas alcohólicas" intro="FLLM ofrece explicaciones generales en español, pero los estatutos, reglas, decisiones y formularios oficiales en inglés constituyen las fuentes que deben consultarse para una operación.">
    <div className="es-content-grid"><section className="es-panel"><h2>Temas fundamentales</h2><ul><li>Creación y disponibilidad de licencias de cuota por población.</li><li>Transferencias de propiedad y cambios de ubicación o serie.</li><li>Intereses de garantía, gravámenes y registros relacionados.</li><li>Requisitos para solicitantes y restricciones de elegibilidad.</li><li>Reglas de restaurantes especiales, zonificación y consumo.</li><li>Formularios ABT y autorizaciones de otras agencias.</li></ul><p>La información del sitio no constituye asesoramiento legal. Para interpretar una ley o preparar una transacción, consulte a un abogado autorizado.</p></section><aside className="es-panel"><h3>Fuentes y recursos</h3><div className="es-link-list"><Link href="/resources/florida-liquor-license-laws">Centro legal completo</Link><Link href="/florida-liquor-license-court-decisions">Decisiones judiciales</Link><Link href="/resources/forms">Formularios ABT</Link><a href="https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/" target="_blank" rel="noopener noreferrer">Florida ABT — sitio oficial ↗</a></div></aside></div>
  </SpanishPageShell>;
}
