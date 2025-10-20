"use client";

import React from "react";

const Loop = ({
  text = "منتجاتنا الطبيعية بأعلي جودة وأسعار منافسة جدا ",
  text1 = "تمااام",
  speed = 25,
}) => {
  return (
    <div className="w-full overflow-hidden bg-amber-300  py-4" dir="ltr">
      <div className="relative flex">
        <div
          className="flex animate-marquee whitespace-nowrap"
          style={{ animationDuration: `${speed}s` }}
        >
          <span className="text-black text-xl font-bold mx-8">{text}</span>
          <span className="text-black text-xl font-bold mx-8">{text}</span>
          <span className="text-black text-xl font-bold mx-8">{text}</span>
          <span className="text-black text-xl font-bold mx-8">{text}</span>
          <span className="text-black text-xl font-bold mx-8">{text}</span>
          <span className="text-black text-xl font-bold mx-8">{text}</span>
          <span className="text-black text-xl font-bold mx-8">{text}</span>
          <span className="text-black text-xl font-bold mx-8">{text}</span>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: flex;
          gap: 4rem;
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
