import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { CartProvider } from "../context/CartContext";
import ClientCartDrawer from "../components/layout/ClientCartDrawer";
import SiteBanner from "../components/SiteBanner"; // <-- updated import

export const metadata = {
  title:
    "Paper Cup Manufacturer in Canada | Single Wall & Double Wall Wholesale Cups | Allpac Packaging",
  description:
    "Allpac is a Canadian paper cup manufacturer based in Windsor, Ontario. We produce single wall and double wall paper cups — including custom printed and eco-friendly options — for coffee shops, distributors, and foodservice companies across North America.",
  alternates: {
    canonical: "https://allpacstore.com/",
  },
  openGraph: {
    title:
      "Allpac | Canadian Paper Cup Manufacturer — Single Wall, Double Wall, Custom & Eco-Friendly Cups",
    description:
      "Allpac manufactures high-quality paper cups in Windsor, Ontario. Our product range includes single wall and double wall paper cups, custom printed designs, and sustainable packaging solutions — available for wholesale across Canada and the U.S.",
    url: "https://allpacstore.com/",
    siteName: "Allpac Packaging",
    images: [
      {
        url: "https://allpacstore.com/images/hero-cups.png",
        width: 1200,
        height: 630,
        alt: "Single Wall and Double Wall Paper Cups Manufactured in Canada",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
};

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} !bg-white !text-black`}>
      <body suppressHydrationWarning className="antialiased">
        <SiteBanner /> {/* <-- updated usage */}
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
