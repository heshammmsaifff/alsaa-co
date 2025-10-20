import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata = {
  title: "SpiceCo | بهارات وحبوب",
  description: "أجود أنواع البهارات والحبوب.",
  icons: {
    icon: { url: "/fav.png", type: "image/png" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth">
      <body className={cairo.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
