import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "List Your Florida Liquor License | Florida Liquor License Market",
    description: "Florida Liquor License Market List Your License page.",
    alternates: {
          canonical: "https://www.floridaliquorlicensemarket.com/sell-your-license",
    },
};

export default function SellYourLicensePage() {
    return (
        <main
            style={{
                minHeight: "100vh",
                margin: 0,
                background: "#01080f",
                lineHeight: 0,
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/api/fllm-list-your-license-image"
                alt="Florida Liquor License Market List Your License page"
                style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    margin: 0,
                }}
            />
        </main>
    );
}
