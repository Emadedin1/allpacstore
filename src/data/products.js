// src/data/products.js
export const products = [
  {
    key: "10oz",
    slug: "10oz",
    name: "10 oz Hot Cup",
    desc: "Hot Cup, ideal for small beverages.",
    image: "/cups/10oz.png",
    type: "Hot Cup",
    qtyCase: 1000,
    priceCase: 92,
  },
  {
    key: "12oz",
    slug: "12oz",
    name: "12 oz Hot Cup",
    desc: "Most popular size for cafes. Perfect for coffee and tea.",
    image: "/cups/12oz.png",
    type: "Hot Cup",
    qtyCase: 1000,
    priceCase: 94,
  },
  {
    key: "16oz",
    slug: "16oz",
    name: "16 oz Hot Cup",
    desc: "Larger size for lattes and premium hot beverages.",
    image: "/cups/16oz.png",
    type: "Hot Cup",
    qtyCase: 1000,
    priceCase: 96,
  },
  {
    key: "22oz",
    slug: "22oz",
    name: "22 oz Cold Cup",
    desc: "Perfect for soft drinks, smoothies, and cold beverages.",
    image: "/cups/22oz.png",
    type: "Cold Cup",
    qtyCase: 1000,
    priceCase: 88,
  },
  {
    key: "32oz",
    slug: "32oz",
    name: "32 oz Cold Cup",
    desc: "Extra large cold cup, great for events or promotions.",
    image: "/cups/32oz.png",
    type: "Cold Cup",
    qtyCase: 1000,
    priceCase: 90,
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}
