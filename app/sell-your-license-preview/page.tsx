import type { Metadata } from "next";

import ListYourLicenseMockup from "@/components/ListYourLicenseMockup";
import "@/app/resources/forms/abt-forms.css";
import "./list-your-license-preview.css";

export const metadata: Metadata = {
  title: "List Your Florida Liquor License | FLLM Preview",
  description:
    "Preview self-directed and broker-assisted Florida liquor license listing options.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ListYourLicensePreviewPage() {
  return <ListYourLicenseMockup />;
}

