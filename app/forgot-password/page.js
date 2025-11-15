"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "حدث خطأ",
        text: error.message,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "تم إرسال الرابط!",
        text: "تحقق من بريدك الإلكتروني لإعادة تعيين كلمة المرور.",
        confirmButtonText: "حسنًا",
        timer: 3000,
        timerProgressBar: true,
        willClose: () => {
          router.push("/"); // توجيه للصفحة الرئيسية بعد الإغلاق أو انتهاء الوقت
        },
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          نسيت كلمة المرور
        </h2>

        <p className="text-center text-gray-600">
          أدخل بريدك الإلكتروني لاستلام رابط إعادة تعيين كلمة المرور.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-green-700 placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#166534] text-white py-3 rounded-lg hover:bg-[#14532d] transition"
          >
            {loading ? "جارٍ الإرسال..." : "إرسال الرابط"}
          </button>
        </form>
      </div>
    </div>
  );
}
