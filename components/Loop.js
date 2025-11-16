"use client";

import React from "react";

const Loop1 = ({
  texts = [
    "بهاراتنا أصل المذاق… ونكهتها تحكي عن الجودة!",
    "حبوب طبيعية مختارة بعناية من أجود المزارع.",
    "من الطبيعة مباشرة إلى مطبخك بنكهة لا تُضاهى.",
    "الصاع… سر المذاق الأصيل في كل وجبة.",
  ],
  speed = 25,
}) => {
  return (
    <div className="w-full overflow-hidden bg-[#e3b43c] py-4" dir="ltr">
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
          {/* نكرر المصفوفة مرتين علشان تفضل الحركة سلسة */}
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

export default Loop1;
