import HeroSection from "@/components/HeroSection";
// import OfferCard from "@/components/OfferCard";
import Loop from "@/components/Loop";
import Loop1 from "@/components/Loop1";
import Products from "@/components/Products";
import About from "@/components/About";

export default function Home() {
  const offers = [
    {
      image: "./images/fourteen.png",
      title: "كركم مطحون",
      description:
        "كركم مطحون عالي الجودة يضيف لونًا زاهيًا ونكهة مميزة لوصفاتك.",
      discount: 15,
    },
    {
      image: "./images/ten.png",
      title: "فلفل أسود مطحون",
      description:
        "فلفل أسود فاخر برائحة نفّاذة تعزز طعم الأطباق وتزيدها تميزًا.",
      discount: 12,
    },
    {
      image: "./images/eighteen.png",
      title: "سمسم",
      description:
        "سمسم محمص طازج بنكهة غنية يكمّل الحلويات والمخبوزات بأصالة.",
      discount: 10,
    },
  ];

  return (
    <>
      {/* hero Component */}
      <HeroSection />

      {/* loop Component */}
      <Loop />

      {/* offersCard */}
      {/* <section
        className="pb-10 px-5 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/bg.jpg')" }}
        id="offers"
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px] offers" />
        <div className="relative z-10">
          <h2 className="p-7 text-5xl md:text-6xl font-extrabold text-center bg-clip-text text-white drop-shadow-lg">
            أحدث العروض
          </h2>

          <p className="text-center mb-[60px] font-bold text-white">
            تصفح أحدث العروض الحصرية لدينا علي أجود أنواع البهارات و الحبوب
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {offers.map((offer, idx) => (
              <OfferCard key={idx} {...offer} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 from-white/40 to-transparent"></div>
      </section> */}

      {/* products component */}
      <Products />

      {/* loop1 Component */}
      <Loop1 />

      <About />
    </>
  );
}

// export default function Home() {
//   return (
//     <main className="justify-center items-center bg-amber-300 min-h-screen flex flex-col gap-4 font-extrabold text-2xl">
//       <h1 className="flex items-center justify-center mb-10">
//         الموقع مغلق الآن
//       </h1>
//       <h2 className="flex items-center justify-center">
//         برجاء زيارة الموقع في وقت لاحق
//       </h2>
//     </main>
//   );
// }
