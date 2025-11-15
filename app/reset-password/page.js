"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  // 📌 Supabase يرسل session جديدة عند فتح رابط إعادة التعيين
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          setSessionReady(true);
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sessionReady) {
      Swal.fire({
        icon: "error",
        title: "رابط إعادة التعيين غير صالح أو منتهي",
        confirmButtonColor: "#166534",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "كلمات المرور غير متطابقة",
        confirmButtonColor: "#166534",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "تم تحديث كلمة المرور بنجاح!",
        confirmButtonColor: "#166534",
      }).then(() => router.push("/login"));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "حدث خطأ أثناء إعادة تعيين كلمة المرور",
        text: err.message,
        confirmButtonColor: "#166534",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          إعادة تعيين كلمة المرور
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="كلمة المرور الجديدة"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded-lg px-4 py-2 focus:outline-green-700 w-full"
          />

          <input
            type="password"
            placeholder="تأكيد كلمة المرور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border rounded-lg px-4 py-2 focus:outline-green-700 w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#166534] text-white py-2 rounded-lg hover:bg-[#14532d] transition"
          >
            {loading ? "جارٍ المعالجة..." : "إعادة تعيين كلمة المرور"}
          </button>
        </form>
      </div>
    </div>
  );
}
