"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
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
        setSubmitted(true);
        form.reset();
      } else if (data.errors && data.errors.length > 0) {
        setError(data.errors[0].message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Request a Quote</h1>
        <p className="mt-2 text-gray-600">
          For pricing, bulk orders, or custom packaging inquiries, our team replies within 24 hours.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Info card */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-6 lg:h-fit">
          <h2 className="text-lg font-semibold">Contact</h2>
          <dl className="mt-4 space-y-4 text-sm text-gray-700">
            <div>
              <dt className="font-medium">🏭 Warehouse &amp; Office</dt>
              <dd>3324 Marentette Ave, Windsor, ON N8X 4G4</dd>
            </div>
            <div>
              <dt className="font-medium">📞 Phone</dt>
              <dd>(226) 350-4144</dd>
            </div>
            <div>
              <dt className="font-medium">✉️ Email</dt>
              <dd>m.labak@allpacgroup.com</dd>
            </div>
            <div>
              <dt className="font-medium">⏰ Hours</dt>
              <dd>Mon–Fri · 8 AM–5 PM ET</dd>
            </div>
          </dl>
          <div className="mt-6">
            <a
              href="tel:+12263504144"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Call us
            </a>
          </div>
        </section>

        {/* Form card */}
        <section className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="sr-only">Contact Form</h2>

            {submitted ? (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800">
                Thank you! Your message has been sent.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                {/* Row: Name & Company */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Name" htmlFor="name" required>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200"
                      placeholder="Your name"
                    />
                  </FormField>

                  <FormField label="Company" htmlFor="company" optional>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200"
                      placeholder="Your business name"
                    />
                  </FormField>
                </div>

                {/* Row: Email & Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Email" htmlFor="email" required>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200"
                      placeholder="you@company.com"
                    />
                  </FormField>

                  <FormField label="Phone" htmlFor="phone" required>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      required
                      autoComplete="tel"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200"
                      placeholder="(226) 350-4144"
                    />
                  </FormField>
                </div>

                {/* Row: City & Upload */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="City" htmlFor="city">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200"
                      placeholder="Windsor, ON"
                    />
                  </FormField>

                  <FormField label="Upload Image / PDF" htmlFor="design" optional>
                    <label className="inline-flex w-full cursor-pointer items-center justify-between truncate rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100">
                      <input
                        id="design"
                        name="design"
                        type="file"
                        accept=".png,.jpg,.jpeg,.pdf"
                        className="hidden"
                      />
                      <span className="truncate">Choose file</span>
                    </label>
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, or PDF</p>
                  </FormField>
                </div>

                {/* Message */}
                <FormField label="Message" htmlFor="message" required>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 h-28 leading-relaxed"
                    placeholder="Tell us about your order or inquiry..."
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
                    className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                  >
                    Send message
                  </button>
                  <p className="text-xs text-gray-500">
                    By submitting, you agree to be contacted about your request.
                  </p>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function FormField({ label, htmlFor, required, optional, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-gray-800">
        {label} {optional ? <span className="text-gray-400">(optional)</span> : required ? "*" : null}
      </label>
      {children}
    </div>
  );
}
