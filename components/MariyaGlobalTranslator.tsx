"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const pageUrl = "https://floridaliquorlicensemarket.com/listings/vlasova";

function translateUrl(language: "es" | "ru") {
  return `https://translate.google.com/translate?sl=en&tl=${language}&u=${encodeURIComponent(pageUrl)}`;
}

export default function MariyaGlobalTranslator() {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    const locate = () =>
      document.querySelector(
        '.results-page.marketplace-listing-page[data-featured-broker-business-listing="true"] .featured-business-badge-row',
      );

    const existing = locate();
    if (existing) {
      setTarget(existing);
      return;
    }

    const observer = new MutationObserver(() => {
      const found = locate();
      if (found) {
        setTarget(found);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  if (!target) return null;

  return createPortal(
    <nav className="featured-business-language-switch" aria-label="Translate listing">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.1 4.2 6.1 4.2 9S15 17.9 12 21M12 3C9 6.1 7.8 9.1 7.8 12S9 17.9 12 21" />
      </svg>
      <span aria-current="page">EN</span>
      <span className="featured-business-language-divider">|</span>
      <a href={translateUrl("es")} target="_blank" rel="noopener noreferrer" title="Traducir al español">
        ES
      </a>
      <span className="featured-business-language-divider">|</span>
      <a href={translateUrl("ru")} target="_blank" rel="noopener noreferrer" title="Перевести на русский">
        RU
      </a>
    </nav>,
    target,
  );
}
