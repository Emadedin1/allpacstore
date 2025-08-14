export const products = [
  {
    key: "10oz",
    slug: "10oz",
    size: "10 oz",
    name: "10 oz Hot Cup",
    desc: "Hot Cup, ideal for small beverages.",
    image: "/cups/10oz.png",
    priceCase: 41.50,
    qtyCase: 1000,
    specs: {
      Description: [
        "Hot Cup, ideal for small beverages.",
        "Great for espresso shots or small lattes.",
        "Fits standard cardboard sleeves."
      ],
      Material: [
        "Single-wall paper (12pt stock)",
        "FDA-approved food-safe coating",
        "Recyclable and compostable"
      ],
      "Case Quantity": [
        "1000 cups per case",
        "Packed in 20 bundles of 50 cups"
      ],
      Dimensions: [
        "Height: 90 mm",
        "Top Ø: 88 mm",
        "Bottom Ø: 57 mm"
      ],
      Usage: [
        "Hot liquids up to 85 °C"
      ],
    },
  },
  {
    key: "12oz",
    slug: "12oz",
    size: "12 oz",
    name: "12 oz Hot Cup",
    desc: "Most popular size for cafes. Perfect for coffee and tea.",
    image: "/cups/12oz.png",
    priceCase: 46.50,
    qtyCase: 1000,
    specs: {
      Description: [
        "Most popular size for cafes.",
        "Perfect for coffee and tea.",
        "Wrap-around design shows off branding."
      ],
      Material: [
        "Single-wall paper",
        "Food-grade PE lining",
        "Eco-friendly and compostable"
      ],
      "Case Quantity": [
        "1000 cups per case",
        "Packaged in 20 packs of 50 cups"
      ],
      Dimensions: [
        "Height: 100 mm",
        "Top Ø: 90 mm",
        "Bottom Ø: 60 mm"
      ],
      Usage: [
        "Ideal for hot drinks up to 90 °C"
      ],
    },
  },
  {
    key: "16oz",
    slug: "16oz",
    size: "16 oz",
    name: "16 oz Hot Cup",
    desc: "Larger size for lattes and premium hot beverages.",
    image: "/cups/16oz.png",
    priceCase: 60.00,
    qtyCase: 1000,
    specs: {
      Description: [
        "Ideal for lattes and premium hot drinks.",
        "Extra capacity for extra-foamy drinks."
      ],
      Material: [
        "Double-wall paper for insulation",
        "Food-safe polyethylene coat"
      ],
      "Case Quantity": [
        "1000 cups per case",
        "Packaged in 20 packs of 50 cups"
      ],
      Dimensions: [
        "Height: 110 mm",
        "Top Ø: 95 mm",
        "Bottom Ø: 65 mm"
      ],
      Usage: [
        "Keeps drinks warm longer"
      ],
    },
  },
  {
    key: "22oz",
    slug: "22oz",
    size: "22 oz",
    name: "22 oz Cold Cup",
    desc: "Perfect for soft drinks, smoothies, and cold beverages.",
    image: "/cups/22oz.png",
    priceCase: 78.00,
    qtyCase: 1000,
    specs: {
      Description: [
        "Great for smoothies and iced drinks.",
        "Clear lid compatible."
      ],
      Material: [
        "PET plastic (recyclable)",
        "Crystal-clear clarity"
      ],
      "Case Quantity": [
        "1000 cups per case",
        "Packaged in 20 packs of 50 cups"
      ],
      Dimensions: [
        "Height: 120 mm",
        "Top Ø: 96 mm",
        "Bottom Ø: 60 mm"
      ],
      Usage: [
        "Cold liquids only",
        "Dishwasher-safe"
      ],
    },
  },
  {
    key: "32oz",
    slug: "32oz",
    size: "32 oz",
    name: "32 oz Cold Cup",
    desc: "Extra large cold cup, great for events or promotions.",
    image: "/cups/32oz.png",
    priceCase: 114.50,
    qtyCase: 1000,
    specs: {
      Description: [
        "Extra-large for events or promotional giveaways.",
        "Fits large straws."
      ],
      Material: [
        "PET plastic",
        "Ultra-clear finish"
      ],
      "Case Quantity": [
        "1000 cups per case",
        "Packaged in 20 packs of 50 cups"
      ],
      Dimensions: [
        "Height: 140 mm",
        "Top Ø: 100 mm",
        "Bottom Ø: 65 mm"
      ],
      Usage: [
        "Cold drinks only",
        "Reusable & recyclable"
      ],
    },
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}
