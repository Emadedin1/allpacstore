import HomeClient from "./HomeClient"
import Script from "next/script"

export const metadata = {
  title: "Allpac Store | Canadian Paper Cup Manufacturer & Wholesale Supplier",
  description:
    "Allpac manufactures single wall and double wall paper cups in Windsor, Ontario. Trusted by distributors, importers, and coffee chains across North America for high-quality, eco-friendly paper packaging.",
  alternates: { canonical: "https://allpacstore.com/" },
  openGraph: {
    title: "Allpac | Canadian Paper Cup Manufacturer & Wholesale Supplier",
    description:
      "Eco-friendly single wall and double wall paper cups manufactured in Windsor, Ontario and supplied to distributors and importers across North America.",
    url: "https://allpacstore.com/",
    siteName: "Allpac Packaging",
    images: [
      {
        url: "https://allpacstore.com/images/hero-cups.png",
        width: 1200,
        height: 630,
        alt: "Canadian Paper Cup Manufacturer",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
}

export default function Home() {
  return (
    <>
      <Script
        id="ld-json-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Allpac Packaging",
            url: "https://www.allpacstore.com",
            logo: "https://www.allpacstore.com/favicon.ico",
            description:
              "Allpac is a Canadian paper cup manufacturer and wholesale supplier based in Windsor, Ontario, providing single wall, double wall, and custom eco-friendly cups.",
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
