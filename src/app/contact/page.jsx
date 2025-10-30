"use client";

import { useState } from "react";

export default function QuoteForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    const hp = (formData.get("hp") as string) || "";
    if (hp.trim()) {
      setOk(true); // pretend success for bots
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
        const firstErr = json?.errors?.[0]?.message || "Failed to send.";
        throw new Error(firstErr);
      }

      setOk(true);
      form.reset();
    } catch (err: any) {
      setOk(false);
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data" noValidate>
      {/* Honeypot (bots fill this) */}
      <input type="text" name="hp" className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Optional: subject for Formspree dashboard */}
      <input type="hidden" name="_subject" value="New Quote Request — Allpac" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1">
          <label htmlFor="name" className="text-sm font-medium text-[#0D1B2A]">Name *</label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-lg border px-3 py-2 shadow-sm ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            placeholder="Jane Doe"
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="email" className="text-sm font-medium text-[#0D1B2A]">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border px-3 py-2 shadow-sm ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            placeholder="you@company.com"
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="phone" className="text-sm font-medium text-[#0D1B2A]">Phone</label>
          <input
            id="phone"
            name="phone"
            autoComplete="tel"
            className="w-full rounded-lg border px-3 py-2 shadow-sm ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            placeholder="(226) 350-4144"
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="city" className="text-sm font-medium text-[#0D1B2A]">City</label>
          <input
            id="city"
            name="city"
            className="w-full rounded-lg border px-3 py-2 shadow-sm ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            placeholder="Windsor, ON"
          />
        </div>
      </div>

      <div className="grid gap-1">
        <label htmlFor="design" className="text-sm font-medium text-[#0D1B2A]">Upload Image / PDF (optional)</label>
        <input
          id="design"
          name="design"
          type="file"
          accept=".png,.jpg,.jpeg,.pdf"
          className="w-full rounded-lg border px-3 py-2 shadow-sm ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-cyan-600"
        />
      </div>

      <div className="grid gap-1">
        <label htmlFor="message" className="text-sm font-medium text-[#0D1B2A]">Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border px-3 py-2 shadow-sm ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          placeholder="Tell us about your order or inquiry..."
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-full bg-[#0D1B2A] px-4 py-2 text-white shadow-sm hover:bg-[#0b1420] disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send request"}
        </button>
        {ok === true && <span className="text-sm text-green-700" aria-live="polite">Thanks — we’ll be in touch.</span>}
        {ok === false && <span className="text-sm text-red-600" aria-live="polite">{error || "Couldn’t send."}</span>}
      </div>
    </form>
  );
}
