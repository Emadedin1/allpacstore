"use client";

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold">AllpacStore</h1>
        <nav className="space-x-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/cart" className="hover:underline">Cart</a>
        </nav>
      </header>

      <main>
        <h2 className="text-2xl mb-4">Welcome to AllpacStore!</h2>
        <p>Your one‑stop shop for custom packaging solutions.</p>
      </main>

      <footer className="mt-16 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} Allpac Packaging Co.
      </footer>
    </div>
  );
}
