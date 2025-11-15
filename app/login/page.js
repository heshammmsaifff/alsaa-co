"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Mail, Lock, Loader2, Eye, EyeOff, User, Phone } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginRegisterPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // تسجيل الدخول
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

        if (signInError) {
          toast.error(signInError.message || "فشل تسجيل الدخول.");
          setError(signInError.message);
        } else {
          toast.success("تم تسجيل الدخول بنجاح!");
          router.push("/"); // توجه للصفحة الرئيسية
        }
      } else {
        // إنشاء حساب جديد
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: { name: form.name, phone: form.phone },
          },
        });

        if (signUpError) {
          toast.error(signUpError.message || "فشل إنشاء الحساب.");
          setError(signUpError.message);
        } else if (data?.user) {
          // بعد إنشاء الحساب في Auth، نضيفه في جدول users
          const { error: insertError } = await supabase.from("users").insert([
            {
              id: data.user.id,
              email: data.user.email,
              name: form.name,
              phone: form.phone,
            },
          ]);

          if (insertError) {
            console.error("خطأ في إدراج المستخدم في الجدول:", insertError);
            toast.error("حدث خطأ أثناء تسجيل المستخدم في قاعدة البيانات.");
          } else {
            toast.success(
              "تم إنشاء الحساب بنجاح! تم تسجيلك أيضًا في جدول المستخدمين."
            );
          }

          router.push("/check-email"); // توجيه المستخدم لصفحة التحقق
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(isLogin ? "فشل تسجيل الدخول." : "فشل إنشاء الحساب.");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="mt-10 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4"
    >
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
        </h2>

        {error && (
          <div className="bg-red-50 border-r-4 border-red-500 text-red-700 p-4 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              {/* الاسم الكامل */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الكامل
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pr-10 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                    placeholder="اسمك"
                  />
                </div>
              </div>

              {/* رقم الهاتف */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الهاتف
                </label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full pr-10 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                    placeholder="0123456789"
                  />
                </div>
              </div>
            </>
          )}

          {/* البريد الإلكتروني */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full pr-10 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                placeholder="name@example.com"
              />
            </div>
          </div>

          {/* كلمة المرور */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full pr-10 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-right text-sm mt-2">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline font-medium"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>
                  {isLogin ? "جاري تسجيل الدخول..." : "جاري إنشاء الحساب..."}
                </span>
              </>
            ) : isLogin ? (
              "تسجيل الدخول"
            ) : (
              "إنشاء حساب"
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          {isLogin ? (
            <>
              لا تملك حسابًا؟{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 font-medium hover:underline"
              >
                إنشاء حساب
              </button>
            </>
          ) : (
            <>
              لديك حساب بالفعل؟{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-600 font-medium hover:underline"
              >
                تسجيل الدخول
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
