import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Broker Liquor License Listing | Florida Liquor License Market",
  description:
    "Florida real estate and business brokers can add a Florida liquor license listing to FLLM for a one-time $14.95 fee and receive buyer inquiries directly.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/brokers/list-your-license",
  },
  robots: { index: true, follow: true },
};

const benefits = [
  "Your name and brokerage are displayed as the listing representative",
  "Your business contact information is shown with the listing",
  "Buyer inquiries are sent directly to you",
  "You retain complete control of your client relationship and transaction",
  "FLLM does not seek or receive any portion of your brokerage commission",
];

export default function BrokerListYourLicensePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#0f3455] px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
            Florida Liquor License Market
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
            Add Your Client&apos;s Liquor License to FLLM
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
            Give your Florida liquor license listing additional exposure to buyers searching the specialized liquor-license market while you remain the listing representative.
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.25fr_.75fr]">
          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-9">
            <h2 className="text-2xl font-bold text-slate-900">Broker Marketplace Listing</h2>
            <p className="mt-3 text-slate-600">
              One-time listing fee: <strong className="text-slate-900">$14.95</strong>
            </p>

            <ul className="mt-7 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-slate-700">
                  <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-700">
              <strong>For broker-submitted listings, FLLM acts solely as an advertising marketplace.</strong>{" "}
              FLLM will not participate as a broker in your transaction, represent your buyer or seller, or seek or receive any portion of your brokerage commission. FLLM may separately market licenses for which it has its own direct brokerage or representative relationship. This does not affect broker-submitted listings.
            </div>

            <div className="mt-8">
              <Link
                href="/sell-your-license/form"
                className="inline-flex items-center justify-center rounded-lg bg-[#c79a2b] px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-[#ae8422]"
              >
                Add Your License to FLLM — $14.95
              </Link>
              <p className="mt-3 text-sm text-slate-500">
                Complete the listing form and submit your broker contact information.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
            <h2 className="text-xl font-bold text-slate-900">What happens next?</h2>
            <div className="mt-5 space-y-5 text-sm leading-6 text-slate-600">
              <p><strong className="text-slate-900">1. Submit the listing.</strong><br />Provide the license, county, asking price, and your broker contact information.</p>
              <p><strong className="text-slate-900">2. FLLM publishes the listing.</strong><br />Your brokerage information appears with the license.</p>
              <p><strong className="text-slate-900">3. Buyers contact you.</strong><br />Interested buyers are directed to you as the listing representative.</p>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-600">
              Questions? Contact <a className="font-semibold text-[#0f3455] underline" href="mailto:listings@floridaliquorlicensemarket.com">listings@floridaliquorlicensemarket.com</a>.
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
