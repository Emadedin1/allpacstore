"use client";

import { useState } from "react";

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
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header (matches About page) */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Request a Quote</h1>
      </div>

      {/* Intro / contact details (kept your copy) */}
      <section className="mb-2">
        <p className="text-lg text-gray-700">
          For pricing, bulk orders, or custom packaging inquiries, our team will respond within 24 hours.
        </p>
      </section>

      <section className="space-y-2 text-gray-700">
        <p>
          <strong>🏭 Warehouse &amp; Office</strong>
          <br />
          3324 Marentette Ave, Windsor, ON N8X 4G4
        </p>
        <p>
          <strong>📞 Phone</strong>
          <br />
          (226) 350-4144
        </p>
        <p>
          <strong>✉️ Email</strong>
          <br />
          m.labak@allpacgroup.com
        </p>
        <p>
          <strong>⏰ Hours</strong>
          <br />
          Mon–Fri: 8 AM–5 PM ET
        </p>
      </section>

      {/* Contact Form */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>

        {submitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded shadow">
            Thank you! Your message has been sent.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            encType="multipart/form-data"
          >
            {/* Row: Name & Company (compact, side-by-side) */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Name" htmlFor="name" required>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200"
                  placeholder="Your name"
                  required
                  autoComplete="name"
                />
              </FormField>

              <FormField label="Company" htmlFor="company" optional>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200"
                  placeholder="Your business name"
                  autoComplete="organization"
                />
              </FormField>
            </div>

            {/* Row: Email & Phone */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Email" htmlFor="email" required>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200"
                  placeholder="you@company.com"
                  required
                  autoComplete="email"
                />
              </FormField>

              <FormField label="Phone" htmlFor="phone" required>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200"
                  placeholder="(226) 350-4144"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                />
              </FormField>
            </div>

            {/* Row: City (required) & Upload */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="City" htmlFor="city" required>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200"
                  placeholder="Windsor, ON"
                  required
                  autoComplete="address-level2"
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
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 h-28 leading-relaxed"
                placeholder="Tell us about your order or inquiry..."
                required
              />
            </FormField>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="bg-black text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800"
            >
              Send message
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

/* small label helper that shows * or (optional) consistently */
function FormField({ label, htmlFor, required, optional, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1 block text-sm font-medium text-gray-800"
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
