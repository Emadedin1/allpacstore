"use client";

export default function Home() {
  return (
    <main className="container mx-auto p-8 mt-8 text-center">
      <h1 className="text-5xl font-bold mb-6">AllpacStore</h1>
      <p className="mb-8">Custom packaging solutions for every business.</p>
      <img src="/hero-package.jpg" alt="Packaging example" className="mx-auto mb-8 rounded-lg" />
      <a
        href="/products"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Shop Products
      </a>
    </main>
  );
}
