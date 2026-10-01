import type { Metadata } from "next";

import SearchPerformanceClient from "./SearchPerformanceClient";
import "./search-performance.css";

export const metadata: Metadata = {
  title: "FLLM Lifetime Search Performance",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <SearchPerformanceClient />;
}
