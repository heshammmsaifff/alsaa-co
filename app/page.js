import HeroSection from "@/components/HeroSection";
import OfferCard from "@/components/OfferCard";
import Loop from "@/components/Loop";
import Loop1 from "@/components/Loop1";
import Products from "@/components/Products";

export default function Home() {
  const offers = [
    {
      image: null,
      title: "كركم مطحون",
      description:
        "كركم مطحون عالي الجودة يضيف لونًا زاهيًا ونكهة مميزة لوصفاتك.",
      discount: 15,
    },
    {
      image: null,
      title: "فلفل أسود مطحون",
      description:
        "فلفل أسود فاخر برائحة نفّاذة تعزز طعم الأطباق وتزيدها تميزًا.",
      discount: 12,
    },
    {
      image: null,
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
      <section
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
      </section>

      {/* loop1 Component */}
      <Loop1 />

      {/* products component */}
      <Products />
    </>
  );
}
