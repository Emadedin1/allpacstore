"use client";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="pt-4 pb-10 px-4"> {/* removed large top padding */}
      <div className="max-w-5xl mx-auto">
        {/* ---------- HEADER ---------- */}
        <div className="text-center mb-3"> {/* much smaller gap */}
          <h1 className="text-3xl font-semibold text-[#0D1B2A]">About Allpac</h1>
        </div>

        {/* ---------- FIRST CARD: IMAGE + INTRO ---------- */}
        <div className="rounded-2xl border bg-white p-4 shadow-sm ring-1 ring-black/5 mt-2">
          <div className="w-full rounded-xl overflow-hidden mb-3">
            <Image
              src="/images/warehouse.JPG"
              alt="Allpac warehouse"
              width={900}
              height={280}
              className="object-cover w-full h-[200px] sm:h-[320px]" // shorter image for less whitespace
              priority
            />
          </div>

          <p className="text-gray-700 leading-relaxed">
            Based in Windsor, Ontario, Allpac was founded in 1999 and operates a 250,000 sq ft manufacturing facility,
            making it one of Canada’s most trusted partners for paper cup solutions.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            From regional distributors to national chains, we deliver high-volume single-wall and double-wall paper cups
            with matching lids — with optional custom printing — quickly, reliably, and competitively.
          </p>
        </div>

        {/* ---------- REST OF SECTIONS ---------- */}
        <div className="mt-6 flex flex-col gap-5">
          {/* Mission */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold text-[#0D1B2A] mb-2">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              We aim to replace single-use plastics with eco-friendly paper packaging while supporting businesses through
              just-in-time delivery and Canadian-made reliability.
            </p>
          </div>

          {/* What We Do */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold text-[#0D1B2A] mb-2">What We Do</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Single-wall paper cups — 10 oz – 32 oz</li>
              <li>Double-wall paper cups — 10 oz – 32 oz</li>
              <li>Dome lids — 80 mm & 90 mm diameters</li>
              <li>FSC®-certified and food-safe packaging</li>
            </ul>
          </div>

          {/* Process */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold text-[#0D1B2A] mb-4">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 text-gray-700">
              <div>
                <h3 className="font-semibold">1. Request a Quote</h3>
                <p className="text-sm mt-1">Fill out our contact form or email our sales team.</p>
              </div>
              <div>
                <h3 className="font-semibold">2. Get a Response</h3>
                <p className="text-sm mt-1">We’ll confirm details and send your quote within 24 hours.</p>
              </div>
              <div>
                <h3 className="font-semibold">3. Production & Delivery</h3>
                <p className="text-sm mt-1">Once approved, we manufacture and deliver your packaging on time.</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
<div className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
  <h2 className="text-lg font-semibold text-[#0D1B2A] mb-2">
    Certifications
  </h2>
  <p className="text-gray-700 leading-relaxed">
    Our paper cups and lids are produced under certified systems to ensure food-safe, sustainable, and quality packaging for your business.
  </p>
  <ul className="list-disc list-inside text-gray-700 space-y-1 mt-3">
    <li>FSC® Chain of Custody (Forest Stewardship Council) – verification that fiber comes from responsibly managed forests.</li>
    <li>ISO 9001 Quality Management – ensures consistent and controlled manufacturing procedures.</li>
    <li>ISO 22000 / FSSC 22000 Food Safety Management – applicable for beverage-contact packaging, ensuring hygienic production.</li>
    <li>Food-Contact Compliance – meets FDA (USA) and CFIA/Health Canada standards for food-safe materials.</li>
    <li>SMETA / BSCI Ethical Traceability – demonstrates fair labour practices and safe factory conditions.</li>
  </ul>
  <p className="text-gray-700 mt-4 leading-relaxed">
    If you require a specific certificate or audit report (e.g., custom food-service chain compliance), we are happy to provide supporting documentation.
  </p>
</div>

          {/* Support */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold text-[#0D1B2A] mb-2">Community & Support</h2>
            <p className="text-gray-700 leading-relaxed">
              We proudly support foodservice distributors and packaging partners across North America
              with fast, consistent supply from Canada and China.{" "}
              <Link href="/contact" className="text-cyan-700 underline">
                Request a quote
              </Link>{" "}
              to get started.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
