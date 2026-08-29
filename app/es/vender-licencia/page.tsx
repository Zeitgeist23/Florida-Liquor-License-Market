import type { Metadata } from "next";
import Link from "next/link";
import SpanishPageShell from "@/components/es/SpanishPageShell";

const url = "https://www.floridaliquorlicensemarket.com/es/vender-licencia";
export const metadata: Metadata = { title: "Vender una licencia de licor en Florida", description: "Opciones en español para publicar o vender una licencia de licor independiente en Florida.", alternates: { canonical: url, languages: { "es": url, "en-US": "https://www.floridaliquorlicensemarket.com/sell-your-license" } } };

export default function SpanishSellPage() {
  return <SpanishPageShell eyebrow="Vender" title="Presente su licencia al mercado de Florida" intro="FLLM ofrece vías para propietarios y corredores que desean publicar una licencia independiente y recibir consultas de compradores.">
    <div className="es-card-grid"><article className="es-card"><h2>Publicación autodirigida</h2><p>El propietario controla el precio, las consultas y las negociaciones. FLLM proporciona exposición en el mercado, pero no sustituye los servicios legales o de cierre.</p><Link href="/sell-your-license">Comenzar publicación →</Link></article><article className="es-card"><h2>Asistencia profesional</h2><p>Para operaciones que requieren coordinación adicional, valoración, análisis del mercado o referencias a profesionales autorizados.</p><Link href="/contact">Solicitar información →</Link></article><article className="es-card"><h2>Para corredores</h2><p>Los corredores pueden presentar licencias de sus clientes y seleccionar cómo desean recibir consultas de posibles compradores.</p><Link href="/brokers/list-your-license">Portal para corredores →</Link></article></div>
  </SpanishPageShell>;
}
