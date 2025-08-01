// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { CartProvider } from "../context/CartContext";
import ClientCartDrawer from "../components/layout/ClientCartDrawer";
import SiteBanner from "../components/SiteBanner"; // <-- updated import

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="!bg-white !text-black">
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
