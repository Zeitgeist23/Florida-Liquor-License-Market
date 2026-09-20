import type { ReactNode } from "react";
import Link from "next/link";
import FormsSiteHeader from "@/components/FormsSiteHeader";

type Align = "left" | "center";
type Columns = 2 | 3 | 4;


export function FllmPageShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`fllm-official-page ${className}`.trim()}
      data-fllm-design-system="v2"
    >
      <div className="fllm-ui-header"><FormsSiteHeader /></div>
      {children}
    </main>
  );
}

export function FllmSectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: Align;
  action?: ReactNode;
}) {
  return (
    <div className={`fllm-ui-heading${align === "center" ? " fllm-ui-heading--center" : ""}`}>
      <div>
        {eyebrow ? <span className="fllm-template-eyebrow">{eyebrow}</span> : null}
        <h2>{title}</h2>
        {copy ? <div className="fllm-ui-heading-copy">{copy}</div> : null}
      </div>
      {action ? <div className="fllm-ui-heading-action">{action}</div> : null}
    </div>
  );
}

export function FllmButton({
  href,
  children,
  variant = "gold",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "gold" | "outline";
  className?: string;
}) {
  const classes = [
    "fllm-template-button",
    variant === "outline" ? "fllm-template-button--outline" : "",
    className,
  ].filter(Boolean).join(" ");

  return <Link className={classes} href={href}>{children}</Link>;
}

export function FllmCardGrid({
  children,
  columns = 3,
  className = "",
}: {
  children: ReactNode;
  columns?: Columns;
  className?: string;
}) {
  return (
    <div className={`fllm-ui-grid fllm-ui-grid--${columns} ${className}`.trim()}>
      {children}
    </div>
  );
}

export function FllmCard({
  eyebrow,
  title,
  children,
  variant = "standard",
  align = "left",
  className = "",
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  variant?: "standard" | "gold";
  align?: Align;
  className?: string;
}) {
  return (
    <article
      className={[
        "fllm-template-card",
        variant === "gold" ? "fllm-template-card--gold" : "",
        align === "center" ? "fllm-ui-card--center" : "",
        className,
      ].filter(Boolean).join(" ")}
    >
      {eyebrow ? <span className="fllm-ui-card-kicker">{eyebrow}</span> : null}
      {title ? <strong className="fllm-template-card-title">{title}</strong> : null}
      <div className="fllm-ui-card-body">{children}</div>
    </article>
  );
}

export function FllmStepCard({
  eyebrow,
  title,
  children,
  actions,
  className = "",
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <article className={`fllm-ui-step-card ${className}`.trim()}>
      <span className="fllm-ui-step-kicker">{eyebrow}</span>
      <h3>{title}</h3>
      <div className="fllm-ui-step-body">{children}</div>
      {actions ? <div className="fllm-ui-step-actions">{actions}</div> : null}
    </article>
  );
}

export function FllmDisclosure({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`fllm-template-disclosure ${className}`.trim()}>{children}</div>;
}

export function FllmTable({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className="fllm-template-table-wrap">
      <table className={`fllm-ui-table ${className}`.trim()}>{children}</table>
    </div>
  );
}

export function FllmFaqGrid({
  items,
  columns = 2,
}: {
  items: Array<{ question: string; answer: ReactNode }>;
  columns?: 1 | 2;
}) {
  return (
    <div className={`fllm-ui-faq-grid fllm-ui-faq-grid--${columns}`}>
      {items.map((item) => (
        <details className="fllm-ui-faq" key={item.question}>
          <summary>{item.question}</summary>
          <div className="fllm-ui-faq-answer">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}

export function FllmStatGrid({
  children,
  columns = 4,
}: {
  children: ReactNode;
  columns?: Columns;
}) {
  return <div className={`fllm-ui-grid fllm-ui-grid--${columns} fllm-ui-stat-grid`}>{children}</div>;
}

export function FllmStatCard({
  value,
  label,
  copy,
}: {
  value: ReactNode;
  label: ReactNode;
  copy?: ReactNode;
}) {
  return (
    <article className="fllm-template-stat-card fllm-ui-stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
      {copy ? <p>{copy}</p> : null}
    </article>
  );
}
