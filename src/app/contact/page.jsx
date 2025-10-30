// app/contact/page.tsx
import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import QuoteForm from "@/components/QuoteForm"; // client component below

export const metadata = {
  title: "Contact Allpac | Request a Quote",
  description: "Request pricing for paper cups, PET containers, and paper packaging. Allpac manufactures in Canada & China.",
};

export default function ContactPage() {
  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50 via-white to-white" />
        <div className="absolute left-1/2 top-[-200px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" />
      </div>

      <section className="px-4 py-14 sm:py-18">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-[#0D1B2A] sm:text-5xl">Request a Quote</h1>
            <p className="mt-3 text-lg text-gray-700">
              Tell us what you need — we’ll recommend the right packaging with clear lead times and fair pricing.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-black/5 backdrop-blur">
                <ShieldCheck className="h-4 w-4 text-cyan-700" /> 250,000-sq-ft Canadian facility
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-black/5 backdrop-blur">
                <Clock className="h-4 w-4 text-cyan-700" /> Replies within 24 hours
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="rounded-2xl border bg-white/80 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur">
                <QuoteForm />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <details className="group rounded-xl border bg-white/70 p-4 ring-1 ring-black/5 backdrop-blur">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[#0D1B2A]">
                    Do you offer custom sizes or printing? <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-2 text-sm text-gray-700">Yes—flexo & litho-lam. Upload a reference in the form.</p>
                </details>
                <details className="group rounded-xl border bg-white/70 p-4 ring-1 ring-black/5 backdrop-blur">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[#0D1B2A]">
                    Shipments & Incoterms <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-2 text-sm text-gray-700">We ship worldwide (FOB, CIF, DDP/DAP). Add port or postal code.</p>
                </details>
              </div>
            </div>

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
                    <span>3324 Marentette Ave, Windsor, ON N8X 4G4<br />Canada</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">Prefer email? We reply within one business day.</p>
              </div>

              <div className="rounded-2xl border bg-white/80 p-5 text-sm shadow-sm ring-1 ring-black/5 backdrop-blur">
                Looking for a specific item? <Link href="/products" className="text-cyan-700 underline">Browse all products</Link>.
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
