"use client";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Top row with Back to Home */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold mb-2">About Allpac</h1>
      </div>
      {/* Hero */}
        <p className="text-lg text-gray-700">
          Based in Windsor, Ontario, Allpac is Canada’s trusted partner for custom-printed paper cups. 
          From single cafés to major events, we help brands stand out—one sustainable cup at a time.
        </p>

      {/* Our Mission */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-700">
          To replace single-use plastic with eco-friendly paper packaging, while empowering local businesses
          with vibrant, on-brand designs and reliable Canadian manufacturing.
        </p>
      </section>

      {/* What We Do */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">What We Do</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Produce 10 oz, 12 oz & 16 oz hot cups; 22 oz & 32 oz cold cups.</li>
          <li>Custom-print full-color artwork at up to 2 cups/sec on a state-of-the-art forming line.</li>
          <li>Offer both plain white stock and fully branded designs—EPR-compliant materials included.</li>
          <li>Fast turnaround: Orders typically ship within 1–2 business days from our Ontario warehouse.</li>
        </ul>
      </section>

      {/* How It Works */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          <div className="space-y-2">
            <h3 className="font-semibold">1. Upload Your Design</h3>
            <p>Use our online uploader or email your print-ready file.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">2. We Print & Inspect</h3>
            <p>Our team checks layout, color, and performs a sample proof.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">3. Delivery to You</h3>
            <p>Get fast, reliable shipping anywhere in Canada—right to your door.</p>
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
          Whether you’re a new café or an established chain, our team is here to guide you every step of the way.
        </p>
      </section>
    </div>
  );
}
