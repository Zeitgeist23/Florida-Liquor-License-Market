import type { ReactNode } from "react";
import CountyHeatMapViewportFix from "@/components/CountyHeatMapViewportFix";
import "./counties-heading-center.css";
import "./county-table-row-hover.css";

export default function CountiesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CountyHeatMapViewportFix />
      {children}
    </>
  );
}
