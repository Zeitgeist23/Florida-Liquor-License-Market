import type { Metadata } from "next";
import Link from "next/link";
import SpanishPageShell from "@/components/es/SpanishPageShell";

const url = "https://www.floridaliquorlicensemarket.com/es/licencias-en-venta";
export const metadata: Metadata = { title: "Licencias de licor en venta en Florida", description: "Guía en español para buscar y comprar licencias 4COP y 3PS en Florida por condado.", alternates: { canonical: url, languages: { "es": url, "en-US": "https://www.floridaliquorlicensemarket.com/listings" } } };

export default function SpanishListingsPage() {
  return <SpanishPageShell eyebrow="Comprar" title="Licencias de licor en venta en Florida" intro="Explore el inventario de FLLM y conozca los pasos fundamentales antes de presentar una oferta por una licencia independiente.">
    <div className="es-content-grid"><section className="es-panel"><h2>Antes de comprar</h2><ol><li>Confirme el condado y la serie de la licencia.</li><li>Verifique el estado del registro y cualquier gravamen, interés de garantía o reclamación.</li><li>Evalúe las condiciones de zonificación y del local propuesto.</li><li>Prepare la solicitud de transferencia correspondiente ante la División de Bebidas Alcohólicas y Tabaco.</li><li>Utilice profesionales autorizados cuando necesite asesoramiento legal, fiscal o contable.</li></ol><Link className="es-button" href="/listings">Abrir el inventario actual</Link></section><aside className="es-panel"><h3>Rutas relacionadas</h3><div className="es-link-list"><Link href="/es/tipos-de-licencias">Comparar tipos de licencia</Link><Link href="/es/financiamiento">Opciones de financiamiento</Link><Link href="/counties">Mercados por condado</Link><Link href="/how-to-buy-florida-liquor-license">Guía completa en inglés</Link></div></aside></div>
  </SpanishPageShell>;
}
