"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const form = e.target;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xqalonvg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
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
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
      </div>

      <section className="mb-8">
        <p className="text-lg text-gray-700">
          For questions about orders, pricing, or general inquiries, our team is here to help.
        </p>
      </section>

      <section className="space-y-2 text-gray-700 mb-8">
        <p><strong>🏭 Warehouse & Office</strong><br/>
        3324 Marentette Ave, Windsor, ON N8X 4G4</p>
        <p><strong>📞 Phone</strong><br/>
        (226) 350-4144</p>
        <p><strong>✉️ Email</strong><br/>
        m.labak@allpacgroup.com</p>
        <p><strong>⏰ Hours</strong><br/>
        Mon–Fri: 8 AM–5 PM ET</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
        {submitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded shadow">
            Thank you! Your message has been sent.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <div>
              <label htmlFor="name" className="block font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="company" className="block font-medium mb-1">Company (optional)</label>
              <input
                type="text"
                id="company"
                name="company"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Your business name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="you@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block font-medium mb-1">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="(519) 555-1234"
                required
              />
            </div>
            <div>
              <label htmlFor="design" className="block font-medium mb-1">Upload Image (optional)</label>
              <input
                type="file"
                id="design"
                name="design"
                accept=".png,.jpg,.pdf"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-medium mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                className="w-full border border-gray-300 p-2 rounded h-32"
                placeholder="Tell us about your order or inquiry..."
                required
              ></textarea>
            </div>
            {error && (
              <div className="bg-red-100 text-red-800 p-2 rounded">{error}</div>
            )}
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
            >
              Send Message
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
