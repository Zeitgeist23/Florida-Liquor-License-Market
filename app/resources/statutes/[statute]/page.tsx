import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../../forms/abt-forms.css";

type StatuteDefinition = {
  slug: string;
  citation: string;
  title: string;
  description: string;
  officialUrl: string;
};

const STATUTES: Record<string, StatuteDefinition> = {
  "668-004": {
    slug: "668-004",
    citation: "Florida Statute 668.004",
    title: "Force and effect of electronic signature",
    description: "The Florida provision addressing the force and effect of an electronic signature.",
    officialUrl:
      "https://leg.state.fl.us/statutes/index.cfm/statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699%2F0668%2FSections%2F0668.004.html",
  },
  "668-50": {
    slug: "668-50",
    citation: "Florida Statute 668.50",
    title: "Uniform Electronic Transaction Act",
    description:
      "Florida’s Uniform Electronic Transaction Act, including electronic-signature definitions, consent, legal recognition, attribution, retention, and governmental-agency provisions.",
    officialUrl:
      "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699%2F0668%2FSections%2F0668.50.html",
  },
};

export function generateStaticParams() {
  return Object.values(STATUTES).map((statute) => ({ statute: statute.slug }));
}

export async function generateMetadata(
  context: { params: Promise<{ statute: string }> }
): Promise<Metadata> {
  const { statute } = await context.params;
  const definition = STATUTES[statute.toLowerCase()];
  if (!definition) return { title: "Florida Electronic-Signature Law | FLLM" };

  return {
    title: `${definition.citation}: ${definition.title} | Florida Liquor License Market`,
    description: `${definition.description} View the official Florida Legislature text without leaving Florida Liquor License Market.`,
  };
}

export default async function FloridaStatutePage(
  context: { params: Promise<{ statute: string }> }
) {
  const { statute } = await context.params;
  const definition = STATUTES[statute.toLowerCase()];
  if (!definition) notFound();

  return (
    <main className="abt-forms-page abt-statute-page">
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="abt-form-title-band">
        <div className="page-shell">
          <nav className="abt-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span>›</span><a href="/resources/forms">Florida ABT Forms</a><span>›</span><b>{definition.citation}</b>
          </nav>
          <div className="abt-title-grid">
            <div>
              <span className="abt-eyebrow">Florida electronic-signature law</span>
              <h1>{definition.citation}</h1>
              <h2>{definition.title}</h2>
              <p>{definition.description}</p>
            </div>
            <aside>
              <span>Official source</span>
              <strong>Florida Legislature</strong>
              <small>The official text below is displayed inside this FLLM page.</small>
            </aside>
          </div>
        </div>
      </section>

      <section className="abt-statute-content page-shell">
        <div className="abt-statute-source-note">
          <div>
            <strong>Official statute text</strong>
            <span>Displayed directly from the Florida Legislature’s Online Sunshine website.</span>
          </div>
          <a className="btn btn-outline" href={definition.officialUrl} target="_blank" rel="noreferrer">
            Open official source
          </a>
        </div>

        <iframe
          className="abt-statute-frame"
          src={definition.officialUrl}
          title={`Official text of ${definition.citation}`}
          loading="eager"
          referrerPolicy="no-referrer"
        />

        <p className="abt-statute-disclaimer">
          This page provides convenient access to the official Legislature source. It is not legal advice and does not represent a determination that DBPR/ABT will accept a particular electronic signature or filing.
        </p>
      </section>

      <footer className="abt-forms-footer">
        <div className="page-shell">
          <img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" />
          <span>Florida’s marketplace for buying, selling and financing liquor licenses.</span>
          <span>You may close this window to return to the form.</span>
        </div>
      </footer>
    </main>
  );
}
