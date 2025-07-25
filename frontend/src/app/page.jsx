export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-allpac">
      {/* Hero Section */}
      <section
        className="relative text-center py-24 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-cups.png')" }}
      >
        <div className="absolute inset-0 bg-white/80 sm:bg-white/60 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 !text-allpac">
            Custom-Printed Paper Cups Delivered Fast
          </h1>
          <p className="text-lg mb-6 max-w-xl mx-auto !text-allpac">
            Print your brand on hot and cold paper cups with quick turnaround and low minimums.
          </p>
          <a
            href="/products"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Browse Products
          </a>
        </div>
      </section>


      {/* Product Preview */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Cups & Accessories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Hot Cups",
              image: "/images/hot-cups.jpg",
              link: "/products",
            },
            {
              title: "Cold Cups",
              image: "/images/cold-cups.jpg",
              link: "/products",
            },
            {
              title: "Accessories",
              image: "/images/sleeves.jpg",
              link: "/products",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white shadow-md rounded-xl overflow-hidden">
              <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <a
                  href={item.link}
                  className="mt-3 inline-block text-red-600 hover:underline font-medium"
                >
                  View {item.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Allpac?</h2>
          <ul className="text-left list-disc pl-6 space-y-3 max-w-xl mx-auto">
            <li>Fast turnaround time for orders</li>
            <li>Fully customizable designs and branding</li>
            <li>Eco-compliant packaging options</li>
            <li>Canadian-based factory & shipping</li>
          </ul>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl text-red-600 mb-2">1</div>
            <h3 className="font-semibold text-lg mb-1">Choose your cup size</h3>
            <p className="text-sm">Pick from hot or cold sizes that match your needs.</p>
          </div>
          <div>
            <div className="text-5xl text-red-600 mb-2">2</div>
            <h3 className="font-semibold text-lg mb-1">Upload or request a design</h3>
            <p className="text-sm">Send us your artwork or ask our team for help.</p>
          </div>
          <div>
            <div className="text-5xl text-red-600 mb-2">3</div>
            <h3 className="font-semibold text-lg mb-1">We print and ship</h3>
            <p className="text-sm">Get your custom cups delivered in no time.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-red-600 text-white text-center py-12 px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to Print Your Cups?</h2>
        <a
          href="/products"
          className="inline-block bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Shop Paper Cups
        </a>
      </section>
    </main>
  );
}
