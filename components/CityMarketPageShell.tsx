import type { CSSProperties, ReactNode } from "react";
import FormsSiteHeader from "@/components/FormsSiteHeader";

type CityMarketPageShellProps = {
  city: string;
  heroTitle: ReactNode;
  heroDescription: ReactNode;
  heroBullets: string[];
  heroImage: string;
  heroImagePosition?: string;
  cityMark: string;
  cityMarkTagline: string;
  children: ReactNode;
};

export default function CityMarketPageShell({
  city,
  heroTitle,
  heroDescription,
  heroBullets,
  heroImage,
  heroImagePosition = "58% 50%",
  cityMark,
  cityMarkTagline,
  children,
}: CityMarketPageShellProps) {
  const pageStyle = {
    "--city-hero-image": `url("${heroImage}")`,
    "--city-hero-position": heroImagePosition,
  } as CSSProperties;

  return (
    <main className="city-page fllm-official-page" style={pageStyle}>
      <div className="city-page-header">
        <FormsSiteHeader />
      </div>

      <section className="city-page-hero" aria-label={`${city} liquor license market data`}>
        <div className="city-page-hero__photo" aria-hidden="true" />
        <div className="city-page-hero__veil" aria-hidden="true" />

        <div className="city-page-hero__inner">
          <div className="city-page-hero__copy">
            <span className="city-page-hero__eyebrow">Florida Market Data</span>
            <h1>{heroTitle}</h1>
            <div className="city-page-hero__description">{heroDescription}</div>
            <div className="city-page-hero__bullets">
              {heroBullets.map((bullet) => (
                <p className="city-page-hero__location" key={bullet}>
                  <span className="city-page-hero__pin" aria-hidden="true">●</span>
                  {bullet}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="city-page-hero__citymark">
          {cityMark}
          <small>{cityMarkTagline}</small>
        </div>
      </section>

      {children}
    </main>
  );
}
