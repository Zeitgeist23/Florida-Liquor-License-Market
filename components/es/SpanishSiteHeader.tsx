"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  ["/es/licencias-en-venta", "Comprar"],
  ["/es/vender-licencia", "Vender"],
  ["/es/financiamiento", "Financiamiento"],
  ["/es/tipos-de-licencias", "Tipos de licencia"],
  ["/es/leyes", "Leyes"],
] as const;

export default function SpanishSiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="es-header">
      <Link className="es-brand" href="/es" aria-label="Florida Liquor License Market en español">
        <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
      </Link>
      <button className="es-menu-button" type="button" aria-expanded={open} aria-label="Abrir navegación" onClick={() => setOpen(!open)}>☰</button>
      <nav className={open ? "es-nav is-open" : "es-nav"} aria-label="Navegación en español">
        {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      </nav>
      <div className="es-header-actions">
        <Link className="es-language" href="/" hrefLang="en" lang="en">EN</Link>
        <Link className="es-contact" href="/contact">Contacto</Link>
      </div>
    </header>
  );
}
