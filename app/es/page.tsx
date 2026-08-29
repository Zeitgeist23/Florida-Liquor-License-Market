import type { Metadata } from "next";
import Link from "next/link";
import SpanishSiteHeader from "@/components/es/SpanishSiteHeader";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

export const metadata: Metadata = {
  title: "Comprar y vender licencias de licor en Florida",
  description: "Mercado e información en español para comprar, vender, financiar y valorar licencias 4COP, 3PS y otras licencias de bebidas alcohólicas en Florida.",
  alternates: { canonical: `${siteUrl}/es`, languages: { "en-US": siteUrl, "es": `${siteUrl}/es`, "x-default": siteUrl } },
  openGraph: { locale: "es_US", url: `${siteUrl}/es`, title: "Florida Liquor License Market en español" },
};

const services = [
  { href: "/es/licencias-en-venta", title: "Comprar una licencia", copy: "Consulte oportunidades de licencias 4COP y 3PS por condado y comprenda el proceso de transferencia." },
  { href: "/es/vender-licencia", title: "Vender una licencia", copy: "Compare una publicación autodirigida con asistencia profesional para presentar su licencia al mercado." },
  { href: "/es/financiamiento", title: "Financiamiento", copy: "Conozca las diferencias entre préstamos privados para licencias independientes y financiamiento de negocios operativos." },
  { href: "/es/tipos-de-licencias", title: "Tipos de licencia", copy: "Entienda las licencias 4COP Quota, 3PS Quota, 2COP y 4COP-SFS/SRX sin alterar sus códigos oficiales." },
  { href: "/es/leyes", title: "Leyes y formularios", copy: "Acceda a explicaciones en español junto con enlaces a estatutos y formularios oficiales en inglés." },
  { href: "/counties", title: "Mercados por condado", copy: "Explore precios solicitados, disponibilidad y contexto del mercado en los 67 condados de Florida." },
];

export default function SpanishHomePage() {
  const structuredData = { "@context": "https://schema.org", "@type": "WebPage", name: "Florida Liquor License Market en español", url: `${siteUrl}/es`, inLanguage: "es", isPartOf: { "@id": `${siteUrl}/#website` } };
  return (
    <main className="es-site" lang="es">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SpanishSiteHeader />
      <section className="es-hero">
        <p className="es-eyebrow">Florida Liquor License Market · En español</p>
        <h1>El mercado de licencias de licor de Florida, ahora en español</h1>
        <p className="es-lead">Información clara para compradores, vendedores, inversionistas y propietarios que necesitan comprender licencias, precios, financiamiento, formularios y leyes de Florida.</p>
        <div className="es-hero-actions"><Link className="es-button" href="/es/licencias-en-venta">Ver licencias</Link><Link className="es-button secondary" href="/es/vender-licencia">Vender una licencia</Link></div>
      </section>
      <section className="es-section">
        <p className="es-eyebrow">Una entrada clara al mercado</p>
        <h2>Recursos esenciales en español</h2>
        <p className="es-section-intro">FLLM conserva los códigos oficiales —como 4COP, 3PS, SFS y los números de formularios ABT— y traduce las explicaciones necesarias para tomar decisiones informadas.</p>
        <div className="es-card-grid">{services.map((item) => <article className="es-card" key={item.href}><h3>{item.title}</h3><p>{item.copy}</p><Link href={item.href}>Explorar →</Link></article>)}</div>
      </section>
      <section className="es-band"><h2>¿Necesita ayuda con una operación?</h2><p className="es-section-intro">FLLM puede coordinar consultas relacionadas con publicaciones, compras, ventas, valoraciones y fuentes de financiamiento. La aprobación de licencias corresponde a las autoridades competentes.</p><div className="es-hero-actions"><Link className="es-button" href="/contact">Contactar a FLLM</Link></div></section>
      <aside className="es-translation-notice"><strong>Aviso sobre la traducción</strong><p>Esta versión en español se ofrece para facilitar el acceso a la información. Los estatutos, formularios, registros públicos, contratos y términos oficiales en inglés prevalecen si existe alguna diferencia.</p></aside>
      <footer className="es-footer"><div><strong>Florida Liquor License Market</strong><span>Comprar · Vender · Financiar · Informarse</span></div><div><Link href="/">English</Link><Link href="/contact">Contacto</Link></div></footer>
    </main>
  );
}
