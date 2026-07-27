import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.floridaliquorlicensemarket.com"),
  title: {
    default: "Florida Liquor License Market",
    template: "%s | Florida Liquor License Market",
  },
  description:
    "Florida's marketplace for buying, selling, financing, and investing in liquor licenses.",
  applicationName: "Florida Liquor License Market",
  openGraph: {
    type: "website",
    siteName: "Florida Liquor License Market",
    url: "https://www.floridaliquorlicensemarket.com",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
