"use client";

import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

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
      } else if (data.errors?.length > 0) {
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
            For pricing, bulk orders, or custom-printed packaging inquiries,
            our team will respond within 24 hours. Share your requirements, and we’ll
            provide a clear, competitive quote tailored to your needs.
          </p>
        </div>

        {/* Your full form + contact info below — unchanged */}
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
                  {/* your full existing form fields here */}
                </form>
              )}
            </div>
          </div>

          {/* CONTACT DETAILS SECTION */}
          <aside className="lg:col-span-5 space-y-4">
            {/* your contact info content unchanged */}
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
