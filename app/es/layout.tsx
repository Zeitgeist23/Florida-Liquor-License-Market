import type { Metadata } from "next";
import "./spanish.css";

export const metadata: Metadata = {
  title: { default: "Licencias de licor en Florida | FLLM en español", template: "%s | FLLM en español" },
  description: "Información en español para comprar, vender, financiar y comprender licencias de bebidas alcohólicas en Florida.",
};

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <section lang="es">{children}</section>;
}
