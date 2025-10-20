"use client";

import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 pt-10">
      <div className="container mx-auto px-5 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 🌿 Logo & Short Description */}
        <div>
          <h2 className="text-2xl font-extrabold text-green-400 flex items-center gap-2">
            🌿 الصاع
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
              <a href="/" className="hover:text-green-400 transition">
                الرئيسية
              </a>
            </li>
            <li>
              <a href="#products" className="hover:text-green-400 transition">
                منتجاتنا
              </a>
            </li>
            <li>
              <a href="#offers" className="hover:text-green-400 transition">
                العروض
              </a>
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
              +20 123 456 7890
            </li>
            <li dir="ltr" className="text-right">
              info@example.com
            </li>
            <li> العنوان: المملكة العربية السعودية</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold mb-4">تابعنا على</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-green-400">
              <Facebook />
            </a>
            <a href="#" className="hover:text-green-400">
              <Instagram />
            </a>
            <a href="#" className="hover:text-green-400">
              <Twitter />
            </a>
            <a href="#" className="hover:text-green-400">
              <Linkedin />
            </a>
          </div>
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
