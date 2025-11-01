"use client";

import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

// 🔽 everything below stays exactly the same
export default function ContactClient() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xqalonvg", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setOk(true);
        form.reset();
      } else if (data.errors && data.errors.length > 0) {
        setError(data.errors[0].message);
        setOk(false);
      } else {
        setError("Something went wrong. Please try again.");
        setOk(false);
      }
    } catch {
      setOk(false);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-[#0D1B2A]">
            Request a Quote
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-gray-700">
            For pricing, bulk orders, or custom-printed paper cup inquiries,
            our team will respond within 24 hours. Share your requirements, and
            we’ll provide a clear, competitive quote tailored to your needs.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* FORM SECTION */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
              {ok === true ? (
                <div className="bg-green-100 text-green-800 p-4 rounded shadow">
                  Thank you! Your message has been sent.
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  encType="multipart/form-data"
                >
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="_gotcha"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Row 1: Name + Company */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Name" htmlFor="name" required>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        className="w-full rounded-lg border px-3 py-2 shadow-sm ring-1 ring-black/5 focus:ring-2 focus:ring-cyan-600"
                      />
                    </FormField>

                    <FormField label="Company" htmlFor="company" optional>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Your business name"
                        className="w-full rounded-lg border px-3 py-2 shadow-sm ring-1 ring-black/5 focus:ring-2 focus:ring-cyan-600"
                      />
                    </FormField>
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Email" htmlFor="email" required>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@company.com"
                        required
                        className="w-full rounded-lg border px-3 py-2 shadow-sm ring-1 ring-black/5 focus:ring-2 focus:ring-cyan-600"
                      />
                    </FormField>

                    <FormField label="Phone" htmlFor="phone" required>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="(226) 350-4144"
                        required
                        className="w-full rounded-lg border px-3 py-2 shadow-sm ring-1 ring-black/5 focus:ring-2 focus:ring-cyan-600"
                      />
                    </FormField>
                  </div>

                  {/* Row 3: City + Upload */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="City" htmlFor="city" required>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Windsor, ON"
                        required
                        className="w-full rounded-lg border px-3 py-2 shadow-sm ring-1 ring-black/5 focus:ring-2 focus:ring-cyan-600"
                      />
                    </FormField>

                    <FormField
                      label="Upload Image / PDF"
                      htmlFor="design"
                      optional
                    >
                      <label className="inline-flex w-full cursor-pointer items-center justify-between truncate rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <input
                          id="design"
                          name="design"
                          type="file"
                          accept=".png,.jpg,.jpeg,.pdf"
                          className="hidden"
                        />
                        <span className="truncate">Choose file</span>
                      </label>
                      <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG, or PDF
                      </p>
                    </FormField>
                  </div>

                  {/* Message */}
                  <FormField label="Message" htmlFor="message" required>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your order or inquiry..."
                      required
                      rows={5}
                      className="w-full rounded-lg border px-3 py-2 shadow-sm ring-1 ring-black/5 focus:ring-2 focus:ring-cyan-600"
                    />
                  </FormField>

                  {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                      {error}
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center rounded-full bg-[#0D1B2A] px-4 py-2 text-white shadow-sm hover:bg-[#0b1420] disabled:opacity-50"
                    >
                      {loading ? "Sending..." : "Send message"}
                    </button>
                    {ok === false && (
                      <span className="text-sm text-red-600">
                        {error || "Couldn’t send message."}
                      </span>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* CONTACT DETAILS SECTION */}
          <aside className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border bg-white p-5 shadow-sm ring-1 ring-black/5">
              <h2 className="text-lg font-semibold text-[#0D1B2A]">
                Contact
              </h2>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-cyan-700" />
                  <a
                    href="mailto:m.labak@allpacgroup.com"
                    className="underline"
                  >
                    m.labak@allpacgroup.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-cyan-700" />
                  <span>
                    3324 Marentette Ave
                    <br />
                    Windsor, ON N8X 4G4, Canada
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone size={16} className="text-cyan-700 mt-[2px]" />
                  <span>
                    Mohammad Labak — Sales & Business Development
                    <br />
                    <a
                      href="tel:+12263504144"
                      className="text-cyan-700 underline"
                    >
                      +1 (226) 350-4144
                    </a>{" "}
                  </span>
                </li>
              </ul>

              <div className="mt-4 text-sm text-gray-600">
                Prefer email? We respond within one business day.
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5 text-sm shadow-sm ring-1 ring-black/5">
              Looking for a specific product?{" "}
              <Link href="/catalog" className="text-cyan-700 underline">
                Browse all products
              </Link>
              .
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, htmlFor, required, optional, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1 block text-sm font-medium text-[#0D1B2A]"
      >
        {label}{" "}
        {optional ? (
          <span className="text-gray-400">(optional)</span>
        ) : required ? (
          <span className="text-gray-400">*</span>
        ) : null}
      </label>
      {children}
    </div>
  );
}
