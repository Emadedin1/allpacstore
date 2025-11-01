import HomeClient from "./HomeClient"
import Script from "next/script"

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
}

export default function Home() {
  return (
    <>
      {/* ✅ Clean JSON-LD that Google won’t confuse for the logo page */}
      <Script
        id="ld-json-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Allpac Store",
            url: "https://www.allpacstore.com",
            publisher: {
              "@type": "Organization",
              name: "Allpac Group",
              logo: {
                "@type": "ImageObject",
                url: "https://www.allpacstore.com/favicon.ico",
              },
            },
            description:
              "Canadian manufacturer of paper cups and lids. Based in Windsor, Ontario — trusted by distributors and foodservice suppliers across North America.",
            sameAs: [
              "https://www.linkedin.com/company/allpac",
              "https://www.instagram.com/allpac",
            ],
          }),
        }}
      />

      <HomeClient />
    </>
  )
}
