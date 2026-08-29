import Link from "next/link";
import SpanishSiteHeader from "./SpanishSiteHeader";

type SpanishPageShellProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
};

export default function SpanishPageShell({ eyebrow, title, intro, children }: SpanishPageShellProps) {
  return (
    <main className="es-site" lang="es">
      <SpanishSiteHeader />
      <section className="es-inner-hero">
        <p className="es-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
      <div className="es-page-content">{children}</div>
      <aside className="es-translation-notice">
        <strong>Aviso sobre la traducción</strong>
        <p>Esta versión en español se ofrece para facilitar el acceso a la información. Los estatutos, formularios, registros públicos, contratos y términos oficiales en inglés prevalecen si existe alguna diferencia.</p>
      </aside>
      <footer className="es-footer">
        <div><strong>Florida Liquor License Market</strong><span>Comprar · Vender · Financiar · Informarse</span></div>
        <div><Link href="/es">Inicio en español</Link><Link href="/">English</Link><Link href="/contact">Contacto</Link></div>
      </footer>
    </main>
  );
}
