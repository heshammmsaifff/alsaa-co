"use client";

import React from "react";
import Link from "next/link";
import Media from "./Media";
export default function Footer() {
  return (
    <footer className="bg-black/90 text-gray-100 pt-10">
      <div className="container mx-auto px-5 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 🌿 Logo & Short Description */}
        <div>
          <h2 className="text-2xl font-extrabold text-[#68875a] flex items-center gap-2">
            الصاع
          </h2>
          <p className="mt-3 text-gray-300">
            نوفر أجود أنواع البهارات والحبوب الطبيعية المختارة بعناية من أفضل
            المزارع.
          </p>
        </div>

        {/* روابط الموقع */}
        <div>
          <h3 className="font-bold mb-4">روابط سريعة</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/" className="hover:text-green-400 transition">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link
                href="#products"
                className="hover:text-green-400 transition"
              >
                منتجاتنا
              </Link>
            </li>
            <li>
              <a href="/contact" className="hover:text-green-400 transition">
                تواصل معنا
              </a>
            </li>
          </ul>
        </div>

        {/* تواصل معنا */}
        <div>
          <h3 className="font-bold mb-4">تواصل معنا</h3>
          <ul className="space-y-2 text-gray-300">
            <li dir="ltr" className="text-right">
              +966 50 036 5101
            </li>
            {/* <li dir="ltr" className="text-right">
              info@example.com
            </li> */}
            <li> العنوان: المملكة العربية السعودية</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">روباط التواصل الاجتماعي</h3>
          <Media />
        </div>
      </div>

      {/* حقوق الملكية */}
      <div
        dir="rtl"
        className="border-t border-gray-700 mt-10 py-4 text-center text-gray-400 text-sm"
      >
        © {new Date().getFullYear()} الصاع. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
