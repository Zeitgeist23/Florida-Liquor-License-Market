"use client";
import { useState, type FormEvent } from "react";

export default function BusinessListingIntake() {
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending"); setError("");
    try {
      const form = new FormData(event.currentTarget);
      const category = String(form.get("business_category") || "");
      const county = String(form.get("preferred_county") || "");
      const price = String(form.get("asking_price") || "");
      const notes = String(form.get("details") || "");
      form.set("inquiry_type", "Business Listing Review Request");
      form.set("message", `Business listing review request (not a published listing). Category: ${category}; County: ${county}; Asking price: ${price || "Not provided"}; Business details: ${notes}`);
      const result = await fetch("/api/inquiry", { method: "POST", body: form });
      const payload = await result.json().catch(() => ({}));
      if (!result.ok) throw new Error(payload.error || "Unable to submit request.");
      setStatus("sent");
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to submit request."); setStatus("error"); }
  }
  if (status === "sent") return <div className="fllm-business-intake-success" role="status">Thank you. FLLM received your business-listing review request. Submission does not automatically publish a listing.</div>;
  return <form onSubmit={submit} className="fllm-business-intake-form">
    <div className="fllm-business-intake-fields">
      <label>Your name<input name="name" required maxLength={160} autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
      <label>Phone<input name="phone" type="tel" maxLength={60} autoComplete="tel" /></label>
      <label>Business category<select name="business_category" required defaultValue=""><option value="" disabled>Select category</option>{["Restaurant","Bar / Tavern","Cocktail Lounge","Nightclub","Liquor Store","Gentlemen's Club","Marina","Hotel / Motel","Other Hospitality"].map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Florida county<input name="preferred_county" required maxLength={100} placeholder="e.g. Collier County" /></label>
      <label>Business asking price (optional)<input name="asking_price" maxLength={60} placeholder="$" /></label>
    </div>
    <label>Business and liquor-license details<textarea name="details" required rows={4} maxLength={4000} placeholder="Describe the business, existing license type, and whether you are the owner or authorized representative." /></label>
    <button type="submit" disabled={status==="sending"}>{status==="sending"?"Submitting…":"Request Business Listing Review →"}</button>
    {status==="error" && <p role="alert">{error}</p>}
    <p className="fllm-business-intake-disclaimer">FLLM reviews submissions before any publication. This form does not establish brokerage representation or authorize FLLM to advertise a business.</p>
  </form>;
}
