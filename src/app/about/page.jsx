"use client";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Top row with Back to Home */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold mb-2">About Allpac</h1>
      </div>
      
      {/* Warehouse Photo */}
      <div className="w-full max-w-3xl mx-auto aspect-[11/6] rounded-xl overflow-hidden mb-6">
      <Image 
        src="/images/warehouse.JPG" // match the exact name and subfolder
        alt="Allpac warehouse"
        width={800}
        height={300}
        className="w-full h-[220px] sm:h-[400px] object-cover rounded-xl"
        priority
      />
      </div>
      
      {/* Hero */}
        <p className="text-lg text-gray-700">
          Based in Windsor, Ontario, Allpac was founded in 1999 and is one of Canada’s most trusted partners for paper cup solutions. 
          From single cafés to major events, we deliver paper cups quickly, with low minimums and premium quality.
        </p>

      {/* Our Mission */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-700">
          We aim to replace single-use plastic with eco-friendly paper packaging, while
          empowering local businesses with just-in-time delivery, and reliable Canadian manufacturing.
        </p>
      </section>

      {/* What We Do */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">What We Do</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Produce 10 oz, 12 oz & 16 oz, 22 oz, and 32oz blank single-walled paper cups.</li>
          <li>High-volume manufacturing capacity with state-of-the-art lines producing up to 2 cups per second.</li>
          <li>Offer plain white stock designs made with EPR-compliant materials.</li>
          <li>Fast turnaround: most orders ship within 1–2 business days from our Windsor, ON warehouse.</li>
        </ul>
      </section>

      {/* How It Works */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          <div className="space-y-2">
            <h3 className="font-semibold">1. Choose Cup Size</h3>
            <p>Pick from 5 available sizes.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">2. Choose Quantity</h3>
            <p>Select how many cases you need and add them to cart.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">3. Checkout</h3>
            <p>Review your order, complete checkout, and we'll ship it fast.</p>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Our Eco Commitment</h2>
        <p className="text-gray-700">
          Allpac cups are made from FSC-certified paper and lined with a plant-based PLA coating—
          fully recyclable in curbside programs. We continuously optimize to reduce waste and energy usage.
        </p>
      </section>

      {/* Community & Support */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Community & Support</h2>
        <p className="text-gray-700">
          We’re passionate about Windsor’s local economy.
          Whether you’re a new café or an established chain, we'll guide you in finding the right paper cup solutions.
        </p>
      </section>
    </div>
  );
}
