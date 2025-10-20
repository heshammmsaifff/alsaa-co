"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export default function OfferCard({ image, title, description, discount }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);

  // Regex للتحقق
  const nameRegex = /^[\p{L}\s]{2,50}$/u; // حروف ومسافات فقط
  const phoneRegex = /^[0-9]{8,15}$/; // 8-15 رقم

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameTrim = form.name.trim();
    const phoneTrim = form.phone.trim();

    if (!nameRegex.test(nameTrim)) {
      Swal.fire({
        icon: "warning",
        title: "الاسم غير صالح",
        text: "الرجاء إدخال اسم صحيح.",
        confirmButtonColor: "#166534",
      });
      return;
    }

    if (!phoneRegex.test(phoneTrim)) {
      Swal.fire({
        icon: "warning",
        title: "رقم الهاتف غير صالح",
        text: "الرجاء إدخال رقم هاتف مكوّن من أرقام فقط.",
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

    const { error } = await supabase.from("contact_messages").insert([
      {
        name: nameTrim,
        phone: phoneTrim,
        address: form.address.trim(),
        message: `استفسار عن العرض: ${title}`,
      },
    ]);

    if (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "حدث خطأ ❌",
        text: "يرجى المحاولة لاحقًا",
        confirmButtonColor: "#b91c1c",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "تم الإرسال ✅",
        text: "تم إرسال بياناتك بنجاح!",
        confirmButtonColor: "#166534",
      });
      setForm({ name: "", phone: "", address: "" });
      setIsModalOpen(false);
    }

    setSubmitting(false);
  };

  // التحقق أثناء الكتابة
  const handleNameChange = (e) => {
    const cleaned = e.target.value.replace(/[^\p{L}\s]/gu, "");
    setForm((s) => ({ ...s, name: cleaned }));
  };

  const handlePhoneChange = (e) => {
    const cleaned = e.target.value.replace(/[^0-9]/g, "");
    setForm((s) => ({ ...s, phone: cleaned }));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        }}
        className="max-w-sm bg-amber-100 rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
      >
        <div className="relative">
          <img
            src={image || "/placeholder.png"}
            alt={title}
            className="w-full h-48 object-cover"
          />
          {discount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm">
              {discount}% خصم
            </span>
          )}
        </div>
        <div className="p-5 flex flex-col justify-between min-h-[180px]">
          <div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
          >
            المزيد من التفاصيل
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.8, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 left-3 text-gray-500 hover:text-red-500 text-lg"
              >
                ✖
              </button>

              <h2 className="text-xl font-bold text-center mb-4 text-green-700">
                استفسار عن: {title}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="الاسم"
                  className="border rounded-xl px-4 py-2 focus:outline-green-700"
                  value={form.name}
                  onChange={handleNameChange}
                />
                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  className="border rounded-xl px-4 py-2 focus:outline-green-700"
                  value={form.phone}
                  onChange={handlePhoneChange}
                />
                <input
                  type="text"
                  placeholder="العنوان"
                  className="border rounded-xl px-4 py-2 focus:outline-green-700"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ backgroundColor: "#166534" }}
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
    </>
  );
}
