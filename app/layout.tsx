import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Florida Liquor License Market",
  description: "Florida's marketplace for buying, selling, financing and investing in liquor licenses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
