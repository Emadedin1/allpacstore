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
          <p className="mx-auto mt-2 max-w-2xl text-gray-700">
            Trusted paper packaging manufacturer serving North America.  
            Discover our commitment to quality, sustainability, and reliable service.
          </p>
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
            making it one of Canada’s most trusted partners for paper cup and food packaging solutions.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            From regional distributors to national chains, we deliver high-volume single-wall and double-wall paper cups
            with matching lids — quickly, reliably, and competitively.
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
              <li>Single-wall paper cups (10–32 oz)</li>
              <li>Double-wall paper cups (10–32 oz)</li>
              <li>Dome lids and sip lids</li>
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

          {/* Eco Commitment */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold text-[#0D1B2A] mb-2">Our Eco Commitment</h2>
            <p className="text-gray-700 leading-relaxed">
              Allpac products are crafted from FSC-certified paper using energy-efficient production.
              We continuously optimize manufacturing to reduce waste and improve sustainability.
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
