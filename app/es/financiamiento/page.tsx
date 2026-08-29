import type { Metadata } from "next";
import Link from "next/link";
import SpanishPageShell from "@/components/es/SpanishPageShell";

const url = "https://www.floridaliquorlicensemarket.com/es/financiamiento";
export const metadata: Metadata = { title: "Financiamiento de licencias de licor en Florida", description: "Información en español sobre financiamiento privado y financiamiento de negocios que poseen licencias 4COP o 3PS.", alternates: { canonical: url, languages: { "es": url, "en-US": "https://www.floridaliquorlicensemarket.com/financing" } } };

export default function SpanishFinancePage() {
  return <SpanishPageShell eyebrow="Financiamiento" title="Financiar una licencia o un negocio con licencia" intro="La fuente de financiamiento normalmente depende de si se compra una licencia independiente o un negocio operativo que ya posee una licencia.">
    <div className="es-content-grid"><section className="es-panel"><h2>Licencias independientes</h2><p>Las licencias 4COP Quota y 3PS Quota publicadas separadamente del negocio suelen financiarse mediante prestamistas privados, capital del comprador u otras estructuras negociadas. Las tasas, garantías y requisitos dependen del prestamista.</p><h2>Negocios operativos</h2><p>La compra o refinanciación de un restaurante, bar, club nocturno o licorería que ya posee una licencia puede ser evaluada por bancos comerciales y, cuando corresponda, mediante programas garantizados por la SBA. La SBA no presta directamente y ninguna aprobación está garantizada.</p><Link className="es-button" href="/financing#request-financing">Solicitar información</Link></section><aside className="es-panel"><h3>Información adicional</h3><div className="es-link-list"><Link href="/how-to-finance-florida-liquor-license">Guía de financiamiento en inglés</Link><Link href="/private-liquor-license-lenders">Prestamistas privados</Link><Link href="/financing-disclosure">Divulgación de financiamiento</Link></div></aside></div>
  </SpanishPageShell>;
}
