"use client";

import React, { useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { supabase } from "../../lib/supabase";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const whatsappNumber = "966500365101";
  const message = "مرحباً! أود التواصل معكم.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ تحقق من الاسم (حروف فقط، حد أقصى 4 كلمات)
    const nameRegex = /^[\p{L}\s]{2,50}$/u; // يقبل الحروف العربية والإنجليزية فقط
    const wordCount = formData.name.trim().split(/\s+/).length;
    if (!nameRegex.test(formData.name) || wordCount > 4) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ الاسم غير صالح",
        text: "الرجاء إدخال اسم صحيح.",
        confirmButtonText: "حسناً",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // ✅ تحقق من رقم الهاتف (أرقام فقط)
    const phoneRegex = /^[0-9]{8,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ رقم الهاتف غير صالح",
        text: "الرجاء إدخال رقم هاتف صحيح.",
        confirmButtonText: "حسناً",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setLoading(true);

    try {
      // ⏳ تأخير وهمي 3 ثواني
      await new Promise((r) => setTimeout(r, 3000));

      // 🧾 حفظ البيانات الجديدة في Supabase (بدون التحقق من التكرار)
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          message: formData.message || "— لا توجد —",
        },
      ]);

      if (error) throw error;

      toast.success("✅ تم استلام رسالتك! سيتم التواصل معك قريباً.", {
        duration: 4000,
      });

      setFormData({ name: "", phone: "", address: "", message: "" });
      setLoading(false);
    } catch (error) {
      console.error("❌ خطأ أثناء الإرسال:", error.message);
      toast.error("❌ حدث خطأ أثناء الإرسال. حاول مرة أخرى.", {
        duration: 4000,
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 p-5 mt-17">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            direction: "rtl",
            fontFamily: "Tajawal, sans-serif",
          },
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-green-900 mt-10">
        تواصل معنا الآن لمعرفة المزيد!
      </h1>

      {/* زر واتساب */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 w-64 rounded-lg shadow-lg transition-all duration-300 mb-4"
      >
        <MessageCircle size={28} />
        تواصل عبر واتساب
      </a>

      {/* زر الاتصال */}
      <a
        href={`tel:+${whatsappNumber}`}
        className="flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 w-64 rounded-lg shadow-lg transition-all duration-300 mb-10"
      >
        <Phone size={28} />
        اتصال مباشر
      </a>

      {/* نموذج التواصل */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <label className="block mb-2 font-bold text-green-800">الاسم</label>
        <input
          type="text"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <label className="block mb-2 font-bold text-green-800">
          رقم الهاتف (واتساب)
        </label>
        <input
          type="tel"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <label className="block mb-2 font-bold text-green-800">العنوان</label>
        <input
          type="text"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />

        <label className="block mb-2 font-bold text-green-800">
          الرسالة (اختياري)
        </label>
        <textarea
          rows="4"
          placeholder="يمكنك ارسال استفسارك بشكل عام أو استفسار عن منتج معين"
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-bold py-3 rounded-lg transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#133752] hover:bg-green-700 text-white"
          }`}
        >
          {loading ? "⏳ جاري إرسال رسالتك..." : "إرسال الآن"}
        </button>
      </form>
    </div>
  );
}
