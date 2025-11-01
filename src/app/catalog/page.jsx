export const dynamic = "force-dynamic";
import CatalogClient from "./CatalogClient";
import Script from "next/script";

export const metadata = {
  title: "Product Catalog | Allpac Store — Paper Cups, Lids & Custom Packaging",
  description:
    "Explore Allpac Store’s wholesale catalog of paper cups, double-wall cups, dome lids, and custom foodservice packaging. Made in Canada and trusted by distributors across North America.",
  keywords: [
    "paper cup catalog",
    "wholesale paper cups Canada",
    "double wall paper cups",
    "single wall coffee cups",
    "custom logo paper cups",
    "dome lids manufacturer",
    "foodservice packaging supplier",
  ],
  alternates: { canonical: "https://www.allpacstore.com/catalog" },
  openGraph: {
    title: "Allpac Store Catalog | Paper Cups, Lids & Custom Printed Packaging",
    description:
      "Browse our full line of single-wall and double-wall paper cups, matching lids, and eco-friendly packaging — manufactured in Windsor, Ontario.",
    url: "https://www.allpacstore.com/catalog",
    siteName: "Allpac Store",
    images: [
      {
        url: "https://www.allpacstore.com/images/hero-cups.png",
        width: 1200,
        height: 630,
        alt: "Allpac Store product catalog — paper cups and lids",
      },
    ],
    locale: "en_CA",
    type: "CollectionPage",
  },
};

export default function CatalogPage() {
  return (
    <>
      <Script
        id="ld-json-catalog"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
      <CatalogClient />
    </>
  );
}
