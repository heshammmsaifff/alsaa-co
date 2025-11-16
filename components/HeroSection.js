"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import Media from "./Media";

const HeroSection = () => {
  return (
    <section
      dir="rtl"
      className="relative h-[130vh] flex items-center justify-center overflow-hidden"
    >
      {/* 🎥 فيديو الخلفية */}
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-75 blur-[3px]"
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🟤 طبقة شفافة فوق الفيديو */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 🌿 المحتوى */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight inline-grid gap-3 mb-6">
          شركة الصاع <span className="text-[#68875a]">للتوابل والبهارات</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-5 leading-relaxed">
          <span className="font-bold block text-gray-300 mb-5">
            الصاع تعني مكيال قديم لقياس الكمية وكان يُستخدم في زمن النبي ﷺ
          </span>
          علامة سعودية متخصصة في توريد وتصنيع أجود أنواع التوابل والبهارات، نقدم
          نكهات أصيلة وجودة عالية تُضفي على المائدة طعمًا لا يُنسى. تعتمد الصاع
          على اختيار محاصيل منتقاة بعناية من أفضل المزارع، ثم معالجتها وتعبئتها
          بمعايير دقيقة تضمن النقاء والطعم المميز.
        </p>

        {/* زر CTA */}
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="block mx-auto bg-[#304f27] hover:bg-[#68875a] text-white text-lg font-bold py-6 px-16 rounded-full shadow-lg transition-all duration-300"
        >
          تواصل معنا الآن
        </motion.a>

        {/* زر واتساب تحت زر الـ CTA */}
        <motion.a
          href="https://wa.me/966500365101"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className=" mx-auto mt-5 flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300"
        >
          <FaWhatsapp className="text-2xl" />
          واتساب
        </motion.a>

        <Media />
      </motion.div>
    </section>
  );
};

export default HeroSection;
