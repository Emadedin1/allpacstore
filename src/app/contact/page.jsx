"use client";

import { useState, useRef } from "react";
import { Mail, MapPin, Phone, ShieldCheck, Clock, ArrowRight, Loader2, Upload, User, MessageSquare } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact Allpac | Request a Quote",
  description: "Request pricing for paper cups, PET containers, and paper packaging. Allpac manufactures in Canada & China.",
};

export default function ContactPage() {
  // ---- Form state ----
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(null);
  const [error, setError] = useState(null);
  const dropRef = useRef(null);

  async function onSubmit(e) {
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
    <main className="relative">
      {/* gradient + glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50 via-white to-white" />
        <div className="absolute left-1/2 top-[-200px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" />
      </div>

      <section className="px-4 py-14 sm:py-18">
        <div className="mx-auto max-w-6xl">
          {/* hero */}
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-[#0D1B2A] sm:text-5xl">
              Request a Quote
            </h1>
            <p className="mt-3 text-lg text-gray-700">
              Tell us what you need — we’ll recommend the right packaging with clear lead times and fair pricing.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-black/5 backdrop-blur">
                <ShieldCheck className="h-4 w-4 text-cyan-700" />
                250,000-sq-ft Canadian facility
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-black/5 backdrop-blur">
                <Clock className="h-4 w-4 text-cyan-700" />
                Replies within 24 hours
              </div>
            </div>
          </div>

          {/* grid */}
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* form card */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border bg-white/80 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur">
                <form onSubmit={onSubmit} encType="multipart/form-data" noValidate className="space-y-5">
                  <input type="text" name="hp" className="hidden" tabIndex={-1} autoComplete="off" />
                  <input type="hidden" name="_subject" value="New Quote Request — Allpac" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name *" htmlFor="name" icon={<User className="h-4 w-4" />}>
                      <input
                        id="name"
                        name="name"
                        required
                        className="w-full rounded-xl border bg-white/90 px-3 py-2 pl-9 shadow-sm ring-1 ring-black/5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                        placeholder="Jane Doe"
                      />
                    </Field>

                    <Field label="Email *" htmlFor="email" icon={<Mail className="h-4 w-4" />}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="w-full rounded-xl border bg-white/90 px-3 py-2 pl-9 shadow-sm ring-1 ring-black/5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                        placeholder="you@company.com"
                      />
                    </Field>

                    <Field label="Phone" htmlFor="phone" icon={<Phone className="h-4 w-4" />}>
                      <input
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        className="w-full rounded-xl border bg-white/90 px-3 py-2 pl-9 shadow-sm ring-1 ring-black/5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                        placeholder="(226) 350-4144"
                      />
                    </Field>

                    <Field label="City" htmlFor="city" icon={<MapPin className="h-4 w-4" />}>
                      <input
                        id="city"
                        name="city"
                        className="w-full rounded-xl border bg-white/90 px-3 py-2 pl-9 shadow-sm ring-1 ring-black/5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                        placeholder="Windsor, ON"
                      />
                    </Field>
                  </div>

                  <Field label="Message *" htmlFor="message" icon={<MessageSquare className="h-4 w-4" />}>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full rounded-xl border bg-white/90 px-3 py-2 pl-9 shadow-sm ring-1 ring-black/5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                      placeholder="Tell us sizes, quantities, printing, and ship-to (postal/port)."
                    />
                  </Field>

                  {/* drag-n-drop style upload */}
                  <div>
                    <span className="mb-1 block text-sm font-medium text-[#0D1B2A]">Upload artwork / spec (optional)</span>
                    <label
                      ref={dropRef}
                      htmlFor="design"
                      onDragOver={(e) => {
                        e.preventDefault();
                        dropRef.current?.classList.add("ring-2", "ring-cyan-600");
                      }}
                      onDragLeave={() => dropRef.current?.classList.remove("ring-2", "ring-cyan-600")}
                      onDrop={(e) => {
                        e.preventDefault();
                        dropRef.current?.classList.remove("ring-2", "ring-cyan-600");
                        const input = document.getElementById("design");
                        if (input && e.dataTransfer?.files?.length) input.files = e.dataTransfer.files;
                      }}
                      className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed bg-white/70 px-4 py-3 text-sm text-gray-600 shadow-sm ring-1 ring-black/5 transition-colors hover:bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <Upload className="h-4 w-4 text-cyan-700" />
                        <span>Drag & drop or click to upload (PNG, JPG, PDF)</span>
                      </div>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">Max 10MB</span>
                    </label>
                    <input id="design" name="design" type="file" accept=".png,.jpg,.jpeg,.pdf" className="sr-only" />
                  </div>

                  <div className="min-h-[28px]">
                    {ok === true && <p className="text-sm text-green-700" aria-live="polite">Thanks — we’ll be in touch shortly.</p>}
                    {ok === false && <p className="text-sm text-red-600" aria-live="polite">{error || "Couldn’t send. Please try again."}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0D1B2A] px-5 py-2.5 text-white shadow-sm ring-1 ring-black/5 transition hover:bg-[#0b1420] disabled:opacity-50"
                  >
                    {loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : "Send request"}
                  </button>
                </form>
              </div>

              {/* quick FAQs */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <details className="group rounded-xl border bg-white/70 p-4 ring-1 ring-black/5 backdrop-blur">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[#0D1B2A]">
                    Do you offer custom sizes or printing? <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-2 text-sm text-gray-700">
                    Yes. Flexo and litho-lam available. Share dielines or upload a reference.
                  </p>
                </details>
                <details className="group rounded-xl border bg-white/70 p-4 ring-1 ring-black/5 backdrop-blur">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[#0D1B2A]">
                    Shipments & Incoterms <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-2 text-sm text-gray-700">
                    We ship worldwide (FOB, CIF, DDP/DAP). Include your port/postal code for landed pricing.
                  </p>
                </details>
              </div>
            </div>

            {/* sidebar */}
            <aside className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border bg-white/80 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur">
                <h2 className="text-lg font-semibold text-[#0D1B2A]">Contact</h2>
                <ul className="mt-3 space-y-3 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Mail size={16} className="text-cyan-700" />
                    <a href="mailto:m.labak@allpacgroup.com" className="underline">m.labak@allpacgroup.com</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone size={16} className="mt-[2px] text-cyan-700" />
                    <span>
                      Ousama Labak — Partner & Executive Manager
                      <br />
                      <a href="tel:+12263407900" className="text-cyan-700 underline">+1 (226) 340-7900</a> • Mon–Fri 10:00–18:00 ET
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin size={16} className="mt-[2px] text-cyan-700" />
                    <span>
                      3324 Marentette Ave, Windsor, ON N8X 4G4
                      <br />Canada
                    </span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">Prefer email? We reply within one business day.</p>
              </div>

              <div className="rounded-2xl border bg-white/80 p-5 text-sm shadow-sm ring-1 ring-black/5 backdrop-blur">
                Looking for a specific item?{" "}
                <Link href="/products" className="text-cyan-700 underline">Browse all products</Link>.
              </div>

              <div className="overflow-hidden rounded-2xl border ring-1 ring-black/5">
                <iframe
                  title="Allpac Location"
                  className="h-56 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=3324%20Marentette%20Ave%2C%20Windsor%2C%20ON&output=embed"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, htmlFor, icon, children }) {
  return (
    <div className="grid gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium text-[#0D1B2A]">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        {children}
      </div>
    </div>
  );
}
