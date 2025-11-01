"use client";

import Script from "next/script";

export default function CatalogSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Allpac Store Product Catalog",
    description:
      "Browse Allpac Store’s wholesale catalog of paper cups, lids, and foodservice packaging — available for distributors across North America.",
    url: "https://www.allpacstore.com/catalog",
    publisher: {
      "@type": "Organization",
      name: "Allpac Group",
      url: "https://www.allpacstore.com",
      logo: "https://www.allpacstore.com/favicon.ico",
      sameAs: [
        "https://www.linkedin.com/company/allpacpackaging/",
        "https://www.instagram.com/allpac/",
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "Product",
          name: "Single-Wall Paper Cups",
          url: "https://www.allpacstore.com/catalog/single-wall-paper-cups",
        },
        {
          "@type": "Product",
          name: "Double-Wall Paper Cups",
          url: "https://www.allpacstore.com/catalog/double-wall-paper-cups",
        },
        {
          "@type": "Product",
          name: "Dome Lids",
          url: "https://www.allpacstore.com/catalog/dome-lids",
        },
      ],
    },
  };

  return (
    <Script
      id="ld-json-catalog"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
