"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Products() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("gram"); // الافتراضي جرام

  const products = [
    {
      id: 1,
      title: "ذرة حمراء بلدي",
      description:
        "حبوب طبيعية بطعم أصيل تضيف غنى ولونًا مميزًا لأطباقك التقليدية.",
      image: "./images/one.png",
    },
    {
      id: 2,
      title: "ذرة بيضاء بلدي",
      description: "ذرة نقية وناعمة بطعم ريفي يعبّر عن جودة الزراعة المحلية.",
      image: "./images/two.png",
    },
    {
      id: 3,
      title: "حبش وطني",
      description: "حبوب مختارة بعناية بطابع سعودي أصيل وجودة تفوق التوقعات.",
      image: "./images/three.png",
    },
    {
      id: 4,
      title: "بر قصيمي",
      description:
        "بر فاخر من أرض القصيم بطعم تراثي غني ومذاق يعبّر عن الأصالة.",
      image: "./images/four.png",
    },
    {
      id: 5,
      title: "دخن يمني",
      description:
        "دخن طبيعي عالي الجودة بطعم فريد يمنح أطباقك نكهة شرقية مميزة.",
      image: "./images/five.png",
    },
    {
      id: 6,
      title: "شعير وطني",
      description:
        "شعير سعودي نقي مثالي للمشروبات أو الوصفات الصحية التقليدية.",
      image: "./images/six.png",
    },
    {
      id: 7,
      title: "دخن هندي",
      description:
        "حبوب دخن فاخرة بطابع هندي تضيف نكهة عميقة ولمسة مميزة لأكلك.",
      image: "./images/seven.png",
    },
    {
      id: 8,
      title: "سدر ناعم",
      description:
        "سدر طبيعي مطحون برائحة زكية وفوائد لا تُعدّ من قلب الطبيعة.",
      image: "./images/eight.png",
    },
    {
      id: 9,
      title: "كمون مطحون",
      description: "كمون طازج بطعم قوي يضيف نكهة عربية أصيلة لكل وجبة.",
      image: "./images/nine.png",
    },
    {
      id: 10,
      title: "فلفل أسود مطحون",
      description:
        "فلفل أسود فاخر برائحة نفّاذة تعزز طعم الأطباق وتزيدها تميزًا.",
      image: "./images/ten.png",
    },
    {
      id: 11,
      title: "كزبرة مطحون",
      description:
        "كزبرة مطحونة طازجة بنكهة دافئة تعطي أطباقك لمسة عطرية لذيذة.",
      image: "./images/eleven.png",
    },
    {
      id: 12,
      title: "زعتر بري حبشي",
      description:
        "زعتر جبلي عطِر من أجود الأنواع بنكهة طبيعية قوية وطابع بري أصيل.",
      image: "./images/twelve.png",
    },
    {
      id: 13,
      title: "إكليل الجبل حبشي",
      description: "أعشاب عطرية فاخرة تضيف لمسة راقية ونكهة منعشة لأطعمتك.",
      image: "./images/thirteen.png",
    },
    {
      id: 14,
      title: "كركم حبشي",
      description: "كركم نقي بلون ذهبي زاهي يعزز النكهة ويضفي لمسة صحية مميزة.",
      image: "./images/fourteen.png",
    },
    {
      id: 15,
      title: "كركديه مصري",
      description: "كركديه طبيعي بلونه الأحمر الغني وطعمه المنعش لكل الأوقات.",
      image: "./images/fifteen.png",
    },
    {
      id: 16,
      title: "كركم مطحون",
      description:
        "كركم مطحون عالي الجودة يضيف لونًا زاهيًا ونكهة مميزة لوصفاتك.",
      image: "./images/sixteen.png",
    },
    {
      id: 17,
      title: "زنجبيل",
      description:
        "زنجبيل طبيعي بطعمه الحار العطري المثالي للمشروبات والأكلات الشرقية.",
      image: "./images/seventeen.png",
    },
    {
      id: 18,
      title: "سمسم",
      description:
        "سمسم محمص طازج بنكهة غنية يكمّل الحلويات والمخبوزات بأصالة.",
      image: "./images/eighteen.png",
    },
    {
      id: 19,
      title: "كزبر حب",
      description: "كزبرة حبوب طازجة تمنح نكهة قوية وعطر مميز في كل طبق.",
      image: "./images/nineteen.png",
    },
    {
      id: 20,
      title: "شيبة",
      description:
        "عشبة عطرية مميزة بطعم قوي تُستخدم لإضافة نكهة تقليدية أصيلة.",
      image: "./images/twenty.png",
    },
    {
      id: 21,
      title: "دجرة",
      description:
        "حبوب طبيعية غنية بالطعم والمذاق الريفي، مثالية للوصفات الشعبية.",
      image: "./images/twentyone.png",
    },
    {
      id: 22,
      title: "مشكل حمام",
      description:
        "خليط فاخر من الحبوب المختارة لتغذية متكاملة ومتوازنة للحمام.",
      image: "./images/twentytwo.png",
    },
  ];

  // فتح المودال
  const handleAddToCartClick = (product) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "الرجاء تسجيل الدخول أولاً",
        confirmButtonColor: "#166534",
      }).then(() => router.push("/login"));
      return;
    }
    setSelectedProduct(product);
    setQuantity("");
    setUnit("gram");
  };

  // تأكيد الكمية والإضافة للسلة
  const handleConfirmQuantity = () => {
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
      Swal.fire({
        icon: "warning",
        title: "الكمية غير صالحة",
        text: "الرجاء إدخال كمية صحيحة بالجرام أو الكيلو.",
        confirmButtonColor: "#166534",
      });
      return;
    }

    addToCart({ ...selectedProduct, unit }, Number(quantity));

    Swal.fire({
      icon: "success",
      title: "تمت الإضافة للسلة",
      html: `المنتج: <b>${
        selectedProduct.title
      }</b><br>الكمية: <b>${quantity} ${unit === "gram" ? "غ" : "كغ"}</b>`,
      confirmButtonColor: "#166534",
    });

    setSelectedProduct(null);
    setQuantity("");
  };

  return (
    <section
      id="products"
      className="px-6 md:px-16 lg:px-24 py-14 bg-[#e3d4ab]"
      style={{ backgroundImage: "url('/bgp.jpg')" }}
    >
      <h2 className="text-4xl font-extrabold mb-10 text-center text-[#133752]">
        جميع المنتجات
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.15 } }}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center text-center transition-all duration-300"
          >
            <div className="w-full aspect-square mb-4">
              <img
                src={product.image || "/placeholder.png"}
                alt={product.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
              {product.title}
            </h3>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              {product.description}
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{
                backgroundColor: "#166534",
                transition: { duration: 0.2 },
              }}
              onClick={() => handleAddToCartClick(product)}
              className="bg-[#133752] text-white font-semibold py-2 px-5 rounded-full"
            >
              اختيار الكمية
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* مودال إدخال الكمية */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.86, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-xl p-6 w-[92%] max-w-md relative"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-2 left-3 text-gray-500 hover:text-red-500 text-lg"
              >
                ✖
              </button>

              <h2 className="text-xl font-bold text-center mb-4 text-[#133752]">
                {selectedProduct.title}
              </h2>

              <p className="text-gray-600 mb-4">
                {selectedProduct.description}
              </p>
              <p className="text-gray-800 mb-4 font-bold">
                برجاء تحديد الكمية المطلوبة
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex justify-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="unit"
                      value="gram"
                      checked={unit === "gram"}
                      onChange={() => setUnit("gram")}
                    />
                    جرام
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="unit"
                      value="kg"
                      checked={unit === "kg"}
                      onChange={() => setUnit("kg")}
                    />
                    كيلو
                  </label>
                </div>

                <input
                  type="number"
                  min={0}
                  placeholder={`أدخل الكمية بال${
                    unit === "gram" ? "جرام" : "كيلوجرام"
                  }`}
                  className="border rounded-xl px-4 py-2 focus:outline-green-700 w-full text-center"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleConfirmQuantity}
                  className="mt-2 bg-[#133752] text-white font-bold py-2 rounded-full w-full"
                >
                  تأكيد و إضافة للسلة
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
