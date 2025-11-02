"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);

  const products = [
    {
      title: "ذرة حمراء بلدي",
      description:
        "حبوب طبيعية بطعم أصيل تضيف غنى ولونًا مميزًا لأطباقك التقليدية.",
      image: "./images/one.png",
    },
    {
      title: "ذرة بيضاء بلدي",
      description: "ذرة نقية وناعمة بطعم ريفي يعبّر عن جودة الزراعة المحلية.",
      image: "./images/two.png",
    },
    {
      title: "حبش وطني",
      description: "حبوب مختارة بعناية بطابع سعودي أصيل وجودة تفوق التوقعات.",
      image: "./images/three.png",
    },
    {
      title: "بر قصيمي",
      description:
        "بر فاخر من أرض القصيم بطعم تراثي غني ومذاق يعبّر عن الأصالة.",
      image: "./images/four.png",
    },
    {
      title: "دخن يمني",
      description:
        "دخن طبيعي عالي الجودة بطعم فريد يمنح أطباقك نكهة شرقية مميزة.",
      image: "./images/five.png",
    },
    {
      title: "شعير وطني",
      description:
        "شعير سعودي نقي مثالي للمشروبات أو الوصفات الصحية التقليدية.",
      image: "./images/six.png",
    },
    {
      title: "دخن هندي",
      description:
        "حبوب دخن فاخرة بطابع هندي تضيف نكهة عميقة ولمسة مميزة لأكلك.",
      image: "./images/seven.png",
    },
    {
      title: "سدر ناعم",
      description:
        "سدر طبيعي مطحون برائحة زكية وفوائد لا تُعدّ من قلب الطبيعة.",
      image: "./images/eight.png",
    },
    {
      title: "كمون مطحون",
      description: "كمون طازج بطعم قوي يضيف نكهة عربية أصيلة لكل وجبة.",
      image: "./images/nine.png",
    },
    {
      title: "فلفل أسود مطحون",
      description:
        "فلفل أسود فاخر برائحة نفّاذة تعزز طعم الأطباق وتزيدها تميزًا.",
      image: "./images/ten.png",
    },
    {
      title: "كزبرة مطحون",
      description:
        "كزبرة مطحونة طازجة بنكهة دافئة تعطي أطباقك لمسة عطرية لذيذة.",
      image: "./images/eleven.png",
    },
    {
      title: "زعتر بري حبشي",
      description:
        "زعتر جبلي عطِر من أجود الأنواع بنكهة طبيعية قوية وطابع بري أصيل.",
      image: "./images/twelve.png",
    },
    {
      title: "إكليل الجبل حبشي",
      description: "أعشاب عطرية فاخرة تضيف لمسة راقية ونكهة منعشة لأطعمتك.",
      image: "./images/thirteen.png",
    },
    {
      title: "كركم حبشي",
      description: "كركم نقي بلون ذهبي زاهي يعزز النكهة ويضفي لمسة صحية مميزة.",
      image: "./images/fourteen.png",
    },
    {
      title: "كركديه مصري",
      description: "كركديه طبيعي بلونه الأحمر الغني وطعمه المنعش لكل الأوقات.",
      image: "./images/fifteen.png",
    },
    {
      title: "كركم مطحون",
      description:
        "كركم مطحون عالي الجودة يضيف لونًا زاهيًا ونكهة مميزة لوصفاتك.",
      image: "./images/sixteen.png",
    },
    {
      title: "زنجبيل",
      description:
        "زنجبيل طبيعي بطعمه الحار العطري المثالي للمشروبات والأكلات الشرقية.",
      image: "./images/seventeen.png",
    },
    {
      title: "سمسم",
      description:
        "سمسم محمص طازج بنكهة غنية يكمّل الحلويات والمخبوزات بأصالة.",
      image: "./images/eighteen.png",
    },
    {
      title: "كزبر حب",
      description: "كزبرة حبوب طازجة تمنح نكهة قوية وعطر مميز في كل طبق.",
      image: "./images/nineteen.png",
    },
    {
      title: "شيبة",
      description:
        "عشبة عطرية مميزة بطعم قوي تُستخدم لإضافة نكهة تقليدية أصيلة.",
      image: "./images/twenty.png",
    },
    {
      title: "دجرة",
      description:
        "حبوب طبيعية غنية بالطعم والمذاق الريفي، مثالية للوصفات الشعبية.",
      image: "./images/twentyone.png",
    },
    {
      title: "مشكل حمام",
      description:
        "خليط فاخر من الحبوب المختارة لتغذية متكاملة ومتوازنة للحمام.",
      image: "./images/twentytwo.png",
    },
  ];

  // helper validators
  const nameRegex = /^[\p{L}\s]{2,50}$/u; // letters+spaces only, 2-50 chars
  // allow up to 4 words
  const maxNameWords = 4;
  const phoneRegex = /^[0-9]{8,15}$/; // 8-15 digits

  const handleSubmit = async (e) => {
    e.preventDefault();
    // client-side validation
    const nameTrim = form.name.trim();
    const wordCount = nameTrim === "" ? 0 : nameTrim.split(/\s+/).length;

    if (!nameRegex.test(nameTrim) || wordCount > maxNameWords) {
      Swal.fire({
        icon: "warning",
        title: "الاسم غير صالح",
        html: `الرجاء إدخال اسم صحيح ${maxNameWords}.`,
        confirmButtonColor: "#166534",
      });
      return;
    }

    if (!phoneRegex.test(form.phone.trim())) {
      Swal.fire({
        icon: "warning",
        title: "رقم الهاتف غير صالح",
        html: `الرجاء إدخال رقم هاتف مكوّن من أرقام فقط.`,
        confirmButtonColor: "#166534",
      });
      return;
    }

    if (!form.address.trim()) {
      Swal.fire({
        icon: "warning",
        title: "العنوان مطلوب",
        text: "الرجاء إدخال العنوان.",
        confirmButtonColor: "#166534",
      });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: nameTrim,
          phone: form.phone.trim(),
          address: form.address.trim(),
          message: `استفسار عن المنتج: ${selectedProduct.title}`,
        },
      ]);

      if (error) throw error;

      await Swal.fire({
        icon: "success",
        title: "تم الإرسال ✅",
        text: "تم إرسال بياناتك بنجاح! سنعود إليك قريباً.",
        confirmButtonColor: "#166534",
      });

      setForm({ name: "", phone: "", address: "" });
      setSelectedProduct(null);
    } catch (err) {
      console.error("Supabase insert error:", err);
      Swal.fire({
        icon: "error",
        title: "حدث خطأ",
        text: "حصل خطأ أثناء إرسال البيانات. حاول مرة أخرى لاحقًا.",
        confirmButtonColor: "#b91c1c",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // restrict name input to letters and spaces as user types
  const handleNameChange = (e) => {
    // allow letters and spaces only
    const cleaned = e.target.value.replace(/[^\p{L}\s]/gu, "");
    setForm((s) => ({ ...s, name: cleaned }));
  };

  // restrict phone input to digits only as user types
  const handlePhoneChange = (e) => {
    const cleaned = e.target.value.replace(/[^0-9]/g, "");
    setForm((s) => ({ ...s, phone: cleaned }));
  };

  return (
    <section
      id="products"
      className="px-6 md:px-16 lg:px-24 py-14 bg-[#e3d4ab] from-green-50 to-green-100"
    >
      <h2 className="text-4xl font-extrabold mb-10 text-center text-[#133752]">
        جميع المنتجات
      </h2>

      {/* شبكة الكروت */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.15 } }}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center text-center transition-all duration-300"
          >
            <img
              src={product.image || "/placeholder.png"}
              alt={product.title}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {product.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{
                backgroundColor: "#166534",
                transition: { duration: 0.2 },
              }}
              onClick={() => {
                setSelectedProduct(product);
                // reset form when opening modal
                setForm({ name: "", phone: "", address: "" });
              }}
              className="bg-[#133752] text-white font-semibold py-2 px-5 rounded-full"
            >
              تواصل معنا
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* مودال التواصل */}
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
                استفسار عن: {selectedProduct.title}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="الاسم"
                  className="border rounded-xl px-4 py-2 focus:outline-green-700"
                  value={form.name}
                  onChange={handleNameChange}
                  inputMode="text"
                />

                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  className="border rounded-xl px-4 py-2 focus:outline-green-700"
                  value={form.phone}
                  onChange={handlePhoneChange}
                  inputMode="tel"
                />

                <input
                  type="text"
                  placeholder="العنوان"
                  className="border rounded-xl px-4 py-2 focus:outline-green-700"
                  value={form.address}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, address: e.target.value }))
                  }
                />

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  disabled={submitting}
                  className={`mt-3 bg-[#133752] text-white font-bold py-2 rounded-full transition-all duration-300 ${
                    submitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {submitting ? "⏳ جاري الإرسال..." : "إرسال"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
