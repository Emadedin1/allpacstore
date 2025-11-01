import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Allpac Store | Get a Quote for Paper Cups & Food Packaging",
  description:
    "Contact Allpac Store for wholesale and custom paper cup pricing. Based in Windsor, Ontario, we supply distributors and coffee chains across North America with single-wall and double-wall paper cups and lids.",
  keywords: [
    "Allpac Store contact",
    "paper cup quote",
    "wholesale paper cup supplier",
    "food packaging manufacturer Canada",
    "custom printed cups Canada",
    "eco-friendly disposable cups",
    "paper cup distributor Ontario",
  ],
  alternates: { canonical: "https://www.allpacstore.com/contact" },
  openGraph: {
    title: "Request a Quote | Allpac Store",
    description:
      "Reach out for custom or bulk paper cup orders. Allpac Store — Canadian manufacturer of single-wall and double-wall paper cups and lids.",
    url: "https://www.allpacstore.com/contact",
    siteName: "Allpac Store",
    images: [
      {
        url: "https://www.allpacstore.com/images/hero-cups.png",
        width: 1200,
        height: 630,
        alt: "Allpac paper cups and lids",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
