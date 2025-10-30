"use client";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(null);        // no generics in JSX
  const [error, setError] = useState(null);

  async function onSubmit(e) {                // no type annotation in JSX
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot
    const hp = (formData.get("hp") || "").toString();
    if (hp.trim()) {
      setOk(true);
      setLoading(false);
      form.reset();
      return;
    }

    try {
      const res = await fetch("https://formspree.io/f/xqalonvg", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = json?.errors?.[0]?.message || "Failed to send.";
        throw new Error(msg);
      }
      setOk(true);
      form.reset();
    } catch (err) {
      setOk(false);
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Request a Quote</h1>
      </div>

      <section className="mb-8">
        <p className="text-lg text-gray-700">
          For pricing, bulk orders, or custom packaging inquiries, our team will respond within 24 hours.
        </p>
      </section>

      <section className="space-y-2 text-gray-700 mb-8">
        <p><strong>🏭 Warehouse &amp; Office</strong><br/>3324 Marentette Ave, Windsor, ON N8X 4G4</p>
        <p><strong>📞 Phone</strong><br/>(226) 350-4144</p>
        <p><strong>✉️ Email</strong><br/>m.labak@allpacgroup.com</p>
        <p><strong>⏰ Hours</strong><br/>Mon–Fri: 8 AM–5 PM ET</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>

        <form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data" noValidate>
          {/* Honeypot */}
          <input type="text" name="hp" className="hidden" tabIndex={-1} autoComplete="off" />
          <input type="hidden" name="_subject" value="New Quote Request — Allpac" />

          <div>
            <label htmlFor="name" className="block font-medium mb-1">Name *</label>
            <input id="name" name="name" required className="w-full border border-gray-300 p-2 rounded" placeholder="Your name" />
          </div>

          <div>
            <label htmlFor="company" className="block font-medium mb-1">Company (optional)</label>
            <input id="company" name="company" className="w-full border border-gray-300 p-2 rounded" placeholder="Your business name" />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email *</label>
            <input id="email" name="email" type="email" required className="w-full border border-gray-300 p-2 rounded" placeholder="you@company.com" />
          </div>

          <div>
            <label htmlFor="phone" className="block font-medium mb-1">Phone</label>
            <input id="phone" name="phone" className="w-full border border-gray-300 p-2 rounded" placeholder="(226) 350-4144" />
          </div>

          <div>
            <label htmlFor="city" className="block font-medium mb-1">City</label>
            <input id="city" name="city" className="w-full border border-gray-300 p-2 rounded" placeholder="Windsor, ON" />
          </div>

          <div>
            <label htmlFor="design" className="block font-medium mb-1">Upload Image / PDF (optional)</label>
            <input id="design" name="design" type="file" accept=".png,.jpg,.jpeg,.pdf" className="w-full border border-gray-300 p-2 rounded" />
          </div>

          <div>
            <label htmlFor="message" className="block font-medium mb-1">Message *</label>
            <textarea id="message" name="message" required className="w-full border border-gray-300 p-2 rounded h-32" placeholder="Tell us about your order or inquiry..." />
          </div>

          {ok === true && <div className="bg-green-100 text-green-800 p-3 rounded" aria-live="polite">Thanks — we’ll be in touch.</div>}
          {ok === false && <div className="bg-red-100 text-red-800 p-3 rounded" aria-live="polite">{error || "Couldn’t send."}</div>}

          <button type="submit" disabled={loading} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50">
            {loading ? "Sending..." : "Send request"}
          </button>
        </form>
      </section>
    </div>
  );
}
