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
      title: "بهارات مشكلة",
      description: "أجود أنواع البهارات الطبيعية المختارة بعناية.",
      image: "/spices.jpg",
    },
    {
      title: "حبوب متنوعة",
      description: "حبوب صحية وطبيعية لجميع الاستخدامات.",
      image: "/beans.jpg",
    },
    {
      title: "أعشاب طبيعية",
      description: "أعشاب طازجة ومنوعة لأفضل نكهة.",
      image: "/herbs.jpg",
    },
    {
      title: "منتج بدون صورة",
      description: "هذا المنتج لا يحتوي على صورة، سيستخدم placeholder.",
      image: null,
    },
    { title: "منتج 5", description: "وصف المنتج 5", image: null },
    { title: "منتج 6", description: "وصف المنتج 6", image: null },
    { title: "منتج 7", description: "وصف المنتج 7", image: null },
    { title: "منتج 8", description: "وصف المنتج 8", image: null },
    { title: "منتج 9", description: "وصف المنتج 9", image: null },
    { title: "منتج 10", description: "وصف المنتج 10", image: null },
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
      className="px-6 md:px-16 lg:px-24 py-14 bg-gradient-to-b from-green-50 to-green-100"
    >
      <h2 className="text-4xl font-extrabold mb-10 text-center text-green-700">
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
            transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.15 } }}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center text-center transition-all duration-300"
          >
            <img
              src={product.image || "/placeholder.png"}
              alt={product.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
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
              className="bg-green-700 text-white font-semibold py-2 px-5 rounded-full"
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

              <h2 className="text-xl font-bold text-center mb-4 text-green-700">
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
                  className={`mt-3 bg-green-700 text-white font-bold py-2 rounded-full transition-all duration-300 ${
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
