"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="exactVisualPage">
      <div className="visualCanvas">
        <img
          src="/images/approved-homepage.png"
          alt="Florida Liquor License Market"
          className="approvedVisual"
        />
        <Link href="/listings" className="hotspot buyNav">Browse liquor licenses</Link>
        <Link href="/listings" className="hotspot browseCard">Search available licenses</Link>
      </div>
    </main>
  );
}
