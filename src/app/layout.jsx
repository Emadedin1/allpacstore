import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { CartProvider } from "../context/CartContext";
import ClientCartDrawer from "../components/layout/ClientCartDrawer";
import SiteBanner from "../components/SiteBanner";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://www.allpacstore.com"),
  title: "Allpac Store | Wholesale Paper Cup Manufacturer Canada",
  description:
    "Allpac manufactures single-wall and double-wall paper cups with matching lids. Based in Windsor, Ontario — trusted by distributors and foodservice suppliers across North America.",
  alternates: {
    canonical: "https://www.allpacstore.com/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Allpac Store | Wholesale Paper Cups & Lids Manufacturer Canada",
    description:
      "Trusted Canadian manufacturer of single-wall and double-wall paper cups with matching lids — serving distributors across North America.",
    url: "https://www.allpacstore.com/",
    siteName: "Allpac Store",
    images: [
      {
        url: "https://www.allpacstore.com/images/hero-cups.png",
        width: 1200,
        height: 630,
        alt: "Allpac paper cups and lids manufactured in Canada",
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
    images: ["https://www.allpacstore.com/images/hero-cups.png"],
  },
};

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} !bg-white !text-black`}
    >
      <head>
        {/* ✅ Structured data for Google (Organization schema) */}
        <Script
          id="ld-json-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Allpac Group",
              url: "https://www.allpacstore.com",
              logo: "https://www.allpacstore.com/favicon.ico",
              description:
                "Allpac is a Canadian manufacturer of paper cups and lids, based in Windsor, Ontario. Serving distributors and foodservice suppliers across North America.",
              sameAs: [
                "https://www.linkedin.com/company/allpacpackaging/",
                "https://www.instagram.com/allpac/",
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <SiteBanner />
        <div style={{ paddingTop: 40 }} />
        <CartProvider>
          <Navbar />
          <ClientCartDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
