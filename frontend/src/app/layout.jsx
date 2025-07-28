import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { CartProvider } from "../context/CartContext";
import ClientCartDrawer from "../components/layout/ClientCartDrawer"; 
import ShippingBanner from "../components/ShippingBanner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} !bg-white !text-black`}>
      <body className="antialiased">
        <CartProvider>
          <Navbar />
          <ClientCartDrawer /> {/* ✅ use this */}
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
