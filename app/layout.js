import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tajawal } from "next/font/google";

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
        <link rel="icon" href="/fav.png" />
      </head>
      <body className={tajawal.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
