"use client";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="exactVisualPage">
      <div className="visualCanvas">
        <Image
          src="/images/approved-homepage.png"
          alt="Florida Liquor License Market homepage"
          width={1024}
          height={1536}
          priority
          className="approvedVisual"
        />
        <a className="hotspot buyNav" href="#featured" aria-label="Buy" />
        <a className="hotspot sellNav" href="mailto:info@floridaliquorlicensemarket.com?subject=Sell%20My%20License" aria-label="Sell" />
        <a className="hotspot financeNav" href="mailto:info@floridaliquorlicensemarket.com?subject=Financing%20Inquiry" aria-label="Finance" />
        <a className="hotspot investNav" href="mailto:info@floridaliquorlicensemarket.com?subject=Investment%20Inquiry" aria-label="Invest" />
        <a className="hotspot marketNav" href="#market-data" aria-label="Market Data" />
        <a className="hotspot resourcesNav" href="#resources" aria-label="Resources" />
        <a className="hotspot listLicenseNav" href="mailto:info@floridaliquorlicensemarket.com?subject=List%20My%20License" aria-label="List your license" />
        <a className="hotspot contactNav" href="mailto:info@floridaliquorlicensemarket.com" aria-label="Contact us" />
        <a className="hotspot browseCard" href="#featured" aria-label="Browse featured licenses" />
        <a className="hotspot sellCard" href="mailto:info@floridaliquorlicensemarket.com?subject=Sell%20My%20License" aria-label="Sell your license" />
        <a className="hotspot financeCard" href="mailto:info@floridaliquorlicensemarket.com?subject=Financing%20Inquiry" aria-label="Explore financing" />
        <a className="hotspot investCard" href="mailto:info@floridaliquorlicensemarket.com?subject=Investment%20Inquiry" aria-label="Investment opportunities" />
        <div id="featured" className="anchor featuredAnchor" />
        <div id="market-data" className="anchor marketAnchor" />
        <div id="resources" className="anchor resourcesAnchor" />
      </div>
    </main>
  );
}
