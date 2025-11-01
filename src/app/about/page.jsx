import AboutClient from "./AboutClient";
import Script from "next/script";

export const metadata = {
  title: "About Allpac Store | Canadian Paper Cup Manufacturer in Windsor, Ontario",
  description:
    "Founded in 1999, Allpac Store operates a 250,000 sq ft facility in Windsor, Ontario, producing single-wall and double-wall paper cups, matching lids, and custom-printed eco-friendly packaging for distributors across North America.",
  keywords: [
    "Allpac Store",
    "Allpac Group",
    "paper cup manufacturer Canada",
    "wholesale paper cups",
    "custom printed coffee cups",
    "disposable paper cups Ontario",
    "eco-friendly cups supplier",
    "foodservice packaging manufacturer",
  ],
  alternates: { canonical: "https://www.allpacstore.com/about" },
  openGraph: {
    title: "About Allpac Store | Canada’s Trusted Paper Cup Manufacturer",
    description:
      "Allpac Store manufactures high-volume paper cups and lids in Windsor, Ontario. Learn about our 25+ years of experience in eco-friendly foodservice packaging.",
    url: "https://www.allpacstore.com/about",
    siteName: "Allpac Store",
    images: [
      {
        url: "https://www.allpacstore.com/images/warehouse.JPG",
        width: 1200,
        height: 630,
        alt: "Allpac manufacturing facility in Windsor, Ontario",
      },
    ],
    locale: "en_CA",
    type: "article",
  },
};

export default function AboutPage() {
  return (
    <>
      <Script
        id="ld-json-about"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Allpac Store",
            description:
              "Allpac Store is a Canadian packaging manufacturer specializing in paper cups, lids, and foodservice packaging since 1999.",
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
          }),
        }}
      />
      <AboutClient />
    </>
  );
}
