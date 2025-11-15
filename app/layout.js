import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tajawal } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext"; // ✅ استيراد الـ Provider
import { CartProvider } from "@/contexts/CartContext";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata = {
  title: "الصاع | بهارات وحبوب",
  description: "أجود أنواع البهارات والحبوب من متجر الصاع",
  keywords: "بهارات, حبوب, توابل, الصاع, متجر بهارات",
  authors: [{ name: "الصاع", url: "https://alsaa-co.netlify.app/" }],
  creator: "الصاع",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/sa3.jpg" />
      </head>
      <body className={tajawal.className}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
