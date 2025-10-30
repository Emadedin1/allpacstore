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
          Based in Windsor, Ontario, Allpac was founded in 1999 and owns a 250,000 sq ft manufacturing facility, making it
          one of Canada’s most trusted partners for comprehensive paper packaging solutions. From single cafés to major events,
          we deliver high-quality products — from paper cups to a wide range of paper-based packaging — quickly, with reliable service and competitive pricing.
        </p>

      {/* Our Mission */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-700">
          We aim to replace single-use plastic with eco-friendly paper packaging, while
          empowering businesses with just-in-time delivery, and reliable Canadian manufacturing.
        </p>
      </section>

      {/* What We Do */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">What We Do</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Single-wall paper cups (10, 12, 16, 22, 32 oz)</li>
        <li>Double-wall paper cups (10, 12, 16, 22, 32 oz)</li>
        <li>Lids for our paper cups</li>
        <li>Food-safe certifications & materials (FSC® options, EPR-registered; FDA-/CFIA-aligned)</li>
          </ul>
      </section>

      {/* How It Works */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          <div className="space-y-2">
            <h3 className="font-semibold">1. Request a Quote</h3>
            <p>Fill out the contact form.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">2. Get a Response</h3>
            <p>Our team will contact you shortly to confirm details and provide pricing.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">3. Production & Delivery</h3>
            <p>Once approved, we manufacture and deliver your packaging on time.</p>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Our Eco Commitment</h2>
        <p className="text-gray-700">
           Allpac paper packaging is crafted from FSC-certified materials and designed with sustainability in mind. 
           We continuously optimize production to reduce waste and energy usage while maintaining quality.
        </p>
      </section>

      {/* Community & Support */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Community & Support</h2>
        <p className="text-gray-700">
          We’re proud to support businesses worldwide. Whether you’re a distributor, food manufacturer, or enterprise buyer,
          we’ll help you find the right large-volume paper packaging solutions—delivered globally with reliable service.
        </p>
      </section>
    </div>
  );
}
