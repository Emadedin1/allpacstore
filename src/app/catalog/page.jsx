export const dynamic = "force-dynamic";

import CatalogClient from "./CatalogClient";
import CatalogSchema from "./CatalogSchema"; // ✅ we'll create this next

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
      {/* ✅ moved Script into its own client component */}
      <CatalogSchema />
      <CatalogClient />
    </>
  );
}
