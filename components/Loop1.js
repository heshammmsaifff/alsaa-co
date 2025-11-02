"use client";

import React from "react";

const Loop = ({
  texts = [
    "منتجاتنا الطبيعية بأعلى جودة وأسعار منافسة جدًا.",
    "بهاراتنا أصل المذاق ونكهتها لا تُنسى.",
    "حبوب مختارة بعناية من أفضل المزارع.",
    "الصاع… سر المذاق الأصيل في كل وجبة.",
  ],
  speed = 25,
}) => {
  return (
    <div className="w-full overflow-hidden bg-[#dbbc66] py-4" dir="ltr">
      <div className="relative flex">
        <div
          className="flex animate-marquee whitespace-nowrap"
          style={{ animationDuration: `${speed}s` }}
        >
          {texts.map((text, i) => (
            <span
              key={i}
              className="text-black text-xl font-bold mx-8 whitespace-nowrap"
              dir="rtl"
            >
              {text}
            </span>
          ))}

          {/* نكرر المصفوفة مرتين علشان الحركة تستمر بدون توقف */}
          {texts.map((text, i) => (
            <span
              key={`repeat-${i}`}
              className="text-black text-xl font-bold mx-8 whitespace-nowrap"
              dir="rtl"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: flex;
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
};

export default Loop;
