import React from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  return (
    <main className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/paper-cups"
          className="block bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
        >
          <img
            src="/images/paper-cups-cover.jpg"
            alt="Paper Cups"
            className="h-48 w-full object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">Paper Cups</h2>
            <p className="text-gray-600 mt-2">
              Browse our high-quality hot & cold cups — fully customizable with your brand.
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
