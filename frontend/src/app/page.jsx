export default function HomePage() {
  const products = [
    {
      title: "10 oz Hot Cup",
      image: "/images/paper-cups-cover.jpg",
      link: "/products/10oz-hot",
    },
    {
      title: "12 oz Hot Cup",
      image: "/images/hot-cups.jpg",
      link: "/products/12oz-hot",
    },
    {
      title: "16 oz Hot Cup",
      image: "/images/hot-cups.jpg",
      link: "/products/16oz-hot",
    },
    {
      title: "22 oz Cold Cup",
      image: "/images/cold-cups.jpg",
      link: "/products/22oz-cold",
    },
    {
      title: "32 oz Cold Cup",
      image: "/images/cold-cups.jpg",
      link: "/products/32oz-cold",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="relative text-center py-24 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-cups.png')" }}
      >
        <div className="absolute inset-0 bg-white/80 sm:bg-white/60 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-black">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Custom-Printed Paper Cups Delivered Fast
          </h1>
          <p className="text-lg mb-6 max-w-xl mx-auto">
            Print your brand on hot and cold paper cups with quick turnaround and low minimums.
          </p>
          <a
            href="#products"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Shop Products
          </a>
        </div>
      </section>

      {/* Product Grid */}
      <section id="products" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product, i) => (
            <a
              key={i}
              href={product.link}
              className="bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-md font-semibold text-allpac">{product.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
