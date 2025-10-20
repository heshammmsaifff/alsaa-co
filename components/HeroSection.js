"use client";

import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      dir="rtl"
      className="relative h-[85vh] flex items-center justify-center bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/boharat.jpg')",
      }}
    >
      {/* 🟤 تعتيم الخلفية */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" />

      {/* 🌿 المحتوى */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 mt-20 text-center px-6 max-w-2xl"
      >
        {/* ✅ المسافة بين العنوان والفقرة */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight inline-grid gap-3 mb-6">
          الصاع <span className="text-green-300">سر المذاق الأصيل</span>
        </h1>

        {/* ✅ النص */}
        <p className="text-lg md:text-xl text-gray-200 mb-5 leading-relaxed">
          اكتشف أجود أنواع الحبوب والبهارات الطبيعية المختارة بعناية من أفضل
          المزارع، بنكهة غنية وجودة لا تُضاهى.
        </p>

        {/* ✅ الزر أكبر لكن النص بنفس الحجم */}
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className=" inline-block bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-6 px-16 rounded-full shadow-lg transition-all duration-300"
        >
          تواصل معنا الآن
        </motion.a>
      </motion.div>

      {/* 🟢 زخرفة بسيطة أسفل الصورة */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/40 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
