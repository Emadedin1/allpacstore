import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { CartProvider } from "../context/CartContext";
import ClientCartDrawer from "../components/layout/ClientCartDrawer";
import SiteBanner from "../components/SiteBanner"; // <-- updated import

export const metadata = {
  metadataBase: new URL("https://www.allpacstore.com"),
  title:
    "Allpac Store | Canadian Paper Cup Manufacturer & Wholesale Supplier",
  description:
    "Allpac is a Canadian paper cup manufacturer based in Windsor, Ontario. We produce single wall and double wall paper cups — including custom printed and eco-friendly options — for coffee shops, distributors, and foodservice companies across North America.",
  alternates: {
    canonical: "https://www.allpacstore.com/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title:
      "Allpac | Canadian Paper Cup Manufacturer — Single Wall, Double Wall, Custom & Eco-Friendly Cups",
    description:
      "Allpac manufactures high-quality paper cups in Windsor, Ontario. Our product range includes single wall and double wall paper cups, custom printed designs, and sustainable packaging solutions — available for wholesale across Canada and the U.S.",
    url: "https://www.allpacstore.com/",
    siteName: "Allpac Packaging",
    images: [
      {
        url: "https://www.allpacstore.com/images/hero-cups.png",
        width: 1200,
        height: 630,
        alt: "Single Wall and Double Wall Paper Cups Manufactured in Canada",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  other: {
    // ✅ JSON-LD schema to tell Google your logo + company identity
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Allpac Packaging",
      url: "https://www.allpacstore.com",
      logo: "https://www.allpacstore.com/images/hero-cups.png",
      sameAs: [
        "https://www.linkedin.com/company/allpacpackaging/",
        "https://www.allpacstore.com"
      ]
    }),
  },
};

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} !bg-white !text-black`}>
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
