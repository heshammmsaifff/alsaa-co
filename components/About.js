"use client";

import React from "react";

const About = () => {
  return (
    <section
      className="relative py-16 px-6 md:px-16 lg:px-24"
      style={{
        backgroundImage: "url('/1440x960-spices.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* overlay فاتح لتسهيل القراءة */}
      <div className="absolute inset-0 bg-[#f8e6b3]/85"></div>

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* النص على اليمين */}
        <div className=" text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#68875a]">
            في <span className="text-[#304f27]">الصاع</span> للتوابل والبهارات
          </h2>
          <p className="text-2xl text-[#213c15] leading-relaxed mb-4 font-bold">
            نحرص على تقديم منتجات طبيعية 100%، خالية من الإضافات، مع تنوع واسع
            يشمل البهارات الشرقية، الخلطات الخاصة، وتوابل الطبخ اليومية.
          </p>
          <p className="text-2xl text-[#213c15] leading-relaxed mb-4 font-bold">
            نسعى دائمًا لتوفير نكهات تثق بها الأسر والمطاعم، ونطمح لأن نكون
            الخيار الأول لعشاق الطعم الأصيل في السوق السعودي.
          </p>
          <p className="text-lg md:text-xl font-bold text-[#304f27]">
            الصاع .. نكهة تقاس بالجودة
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
