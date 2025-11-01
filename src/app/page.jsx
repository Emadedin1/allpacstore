import HomeClient from "./HomeClient";

export const metadata = {
  title: "Allpac Store | Wholesale Paper Cups & Lids Manufacturer Canada",
  description:
    "Allpac manufactures single-wall and double-wall paper cups with matching lids. Based in Windsor, Ontario — serving distributors and foodservice suppliers across North America.",
  alternates: { canonical: "https://allpacstore.com/" },
  openGraph: {
    title: "Allpac Store | Wholesale Paper Cups & Lids Manufacturer Canada",
    description:
      "Canada’s trusted manufacturer of paper cups and lids — low minimums, fast delivery, premium quality.",
    url: "https://allpacstore.com/",
    siteName: "Allpac Store",
    images: [
      {
        url: "https://allpacstore.com/images/hero-cups.png",
        width: 1200,
        height: 630,
        alt: "Allpac paper cups and lids",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allpac Store | Wholesale Paper Cups & Lids Manufacturer Canada",
    description:
      "Trusted Canadian manufacturer of single-wall and double-wall paper cups with matching lids — serving distributors across North America.",
    images: ["https://allpacstore.com/images/hero-cups.png"],
  },
  // ✅ Structured data that Google will now detect
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Allpac Store",
      url: "https://www.allpacstore.com",
      logo: "https://www.allpacstore.com/favicon.ico",
      description:
        "Allpac is a Canadian manufacturer of paper cups, lids, and custom foodservice packaging — based in Windsor, Ontario and serving distributors across North America.",
      sameAs: [
        "https://www.linkedin.com/company/allpac",
        "https://www.instagram.com/allpac",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-226-350-4144",
        contactType: "Sales",
        areaServed: "CA, US",
        availableLanguage: ["English"],
      },
    }),
  },
};

export default function Home() {
  return <HomeClient />;
}
