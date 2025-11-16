"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import Media from "./Media";

const HeroSection = () => {
  return (
    <section
      dir="rtl"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
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

      {/* 🟤 طبقة شفافة */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 container mx-auto px-6  mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* 🌿 النص (يمين) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-center md:text-cetner max-w-2xl order-2 md:order-1"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight inline-grid gap-3 mb-6 mt-3">
              شركة الصاع{" "}
              <span className="text-[#68875a]">للتوابل والبهارات</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-5 leading-relaxed">
              <span className="font-bold block text-gray-300 mb-5">
                الصاع تعني مكيال قديم لقياس الكمية وكان يُستخدم في زمن النبي ﷺ
              </span>
              علامة سعودية متخصصة في توريد وتصنيع أجود أنواع التوابل والبهارات،
              نقدم نكهات أصيلة وجودة عالية تُضفي على المائدة طعمًا لا يُنسى.
              تعتمد الصاع على اختيار محاصيل منتقاة بعناية من أفضل المزارع، ثم
              معالجتها وتعبئتها بمعايير دقيقة تضمن النقاء والطعم المميز.
            </p>

            {/* 🎯 أزرار الـ CTA */}
            <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 mt-6">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="w-full md:w-auto bg-[#304f27] hover:bg-[#68875a] text-white text-lg font-bold py-4 px-12 rounded-full shadow-lg transition-all duration-300 text-center"
              >
                تواصل معنا الآن
              </motion.a>

              <motion.a
                href="https://wa.me/966500365101"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-4 px-12 rounded-full shadow-lg transition-all duration-300"
              >
                <FaWhatsapp className="text-2xl" />
                واتساب
              </motion.a>
            </div>

            <Media className="justify-center flex" />
          </motion.div>

          {/* 🟢 اللوجو (شمال) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center md:justify-start order-1 md:order-2 mr-5"
          >
            <img
              src="/logo1.png"
              alt="Logo"
              className="w-[280px] md:w-[380px] drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
