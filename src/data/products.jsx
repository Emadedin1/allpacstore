export const products = [
  {
    key: "10oz",
    slug: "10oz",
    size: "10 oz",
    name: "10 oz Hot Cup",
    desc: "Ideal for small beverages.",
    image: "/cups/10oz.png",
    priceCase: 41.50,
    qtyCase: 1000,
    specs: {
      Description: [
        "Ideal for small beverages.",
        "Great for espresso shots or small lattes.",
        "Fits standard cardboard sleeves."
      ],
      Material: [
        "Base: Food-grade paperboard",
        "Thickness: 250 gsm",
        "Coating: PLA",
        "Safety: Compliant with all food-contact safety standards"
      ],
      // UPDATED
      Dimensions: [
        "Height: 110 mm",
        "Top diameter: 90 mm",
        "Bottom diameter: 60 mm"
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
    desc: "Most popular size, perfect for most drinks.",
    image: "/cups/12oz.png",
    priceCase: 46.50,
    qtyCase: 1000,
    specs: {
      Description: [
        "Most popular size, perfect for most drinks.",
      ],
      Material: [
        "Base: Food-grade paperboard",
        "Thickness: 280 gsm",
        "Coating: PLA",
        "Safety: Compliant with all food-contact safety standards"
      ],
      // UPDATED (standard: ~112mm tall, 90mm top, 60mm bottom)
      Dimensions: [
        "Height: 112 mm",
        "Top diameter: 90 mm",
        "Bottom diameter: 60 mm"
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
    desc: "Ideal for large drinks.",
    image: "/cups/16oz.png",
    priceCase: 60.00,
    qtyCase: 1000,
    specs: {
      Description: [
        "Ideal for large drinks.",
        "Extra capacity for extra-foamy drinks."
      ],
      Material: [
        "Base: Food-grade paperboard",
        "Thickness: 300 gsm",
        "Coating: PLA",
        "Safety: Compliant with all food-contact safety standards"
      ],
      // UPDATED (standard: ~135mm tall, 90mm top, 60mm bottom)
      Dimensions: [
        "Height: 135 mm",
        "Top diameter: 90 mm",
        "Bottom diameter: 60 mm"
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
        "Base: Food-grade paperboard",
        "Thickness: 320 gsm",
        "Coating: PLA",
        "Safety: Compliant with all food-contact safety standards"
      ],
      // UPDATED (standard: ~168mm tall, 98mm top, 65mm bottom)
      Dimensions: [
        "Height: 168 mm",
        "Top diameter: 98 mm",
        "Bottom diameter: 65 mm"
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
        "Base: Food-grade paperboard",
        "Thickness: 350 gsm",
        "Coating: PLA",
        "Safety: Compliant with all food-contact safety standards"
      ],
      // UPDATED
      Dimensions: [
        "Height: 180 mm",
        "Top diameter: 100 mm",
        "Bottom diameter: 70 mm"
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
