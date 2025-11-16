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

    const nameRegex = /^[\p{L}\s]{2,50}$/u;
    const wordCount = formData.name.trim().split(/\s+/).length;
    if (!nameRegex.test(formData.name) || wordCount > 4) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ الاسم غير صالح",
        text: "الرجاء إدخال اسم صحيح.",
        confirmButtonText: "حسناً",
        confirmButtonColor: "#304f27",
      });
      return;
    }

    const phoneRegex = /^[0-9]{8,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ رقم الهاتف غير صالح",
        text: "الرجاء إدخال رقم هاتف صحيح.",
        confirmButtonText: "حسناً",
        confirmButtonColor: "#304f27",
      });
      return;
    }

    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 1500));

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

      // تحويل لواتساب في تبويب جديد
      const whatsappMsg = encodeURIComponent(`مرحباً! أود التواصل معكم.`);
      window.open(
        `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`,
        "_blank"
      );
    } catch (error) {
      console.error("❌ خطأ أثناء الإرسال:", error.message);
      toast.error("❌ حدث خطأ أثناء الإرسال. حاول مرة أخرى.", {
        duration: 4000,
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8c42e]/20 p-5">
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

      <h1 className="text-3xl mt-20 md:text-4xl font-extrabold mb-8 text-center text-[#304f27]">
        تواصل معنا الآن لمعرفة المزيد!
      </h1>

      {/* أزرار التواصل */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-[#68875a] hover:bg-[#304f27] text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-300"
        >
          <MessageCircle size={28} />
          واتساب
        </a>

        <a
          href={`tel:+${whatsappNumber}`}
          className="flex items-center justify-center gap-3 bg-[#e3b43c] hover:bg-[#f8c42e] text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-300"
        >
          <Phone size={28} />
          اتصال مباشر
        </a>
      </div>

      {/* نموذج التواصل */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <label className="font-bold text-[#304f27]">الاسم</label>
        <input
          type="text"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-[#68875a]"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <label className="font-bold text-[#304f27]">رقم الهاتف (واتساب)</label>
        <input
          type="tel"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-[#68875a]"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <label className="font-bold text-[#304f27]">العنوان</label>
        <input
          type="text"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-[#68875a]"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />

        <label className="font-bold text-[#304f27]">الرسالة (اختياري)</label>
        <textarea
          rows="4"
          placeholder="يمكنك ارسال استفسارك بشكل عام أو استفسار عن منتج معين"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-[#68875a]"
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
              : "bg-[#304f27] hover:bg-[#68875a] text-white"
          }`}
        >
          {loading ? "⏳ جاري إرسال رسالتك..." : "إرسال الآن"}
        </button>
      </form>
    </div>
  );
}
