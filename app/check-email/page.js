"use client";

import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4"
    >
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          تحقق من بريدك الإلكتروني
        </h2>
        <p className="text-gray-700">
          لقد أرسلنا رابط تأكيد الحساب إلى بريدك الإلكتروني. من فضلك افتح بريدك
          واتبع التعليمات لإكمال التسجيل.
        </p>
        <Link
          href="/login"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          العودة لتسجيل الدخول
        </Link>
      </div>
    </div>
  );
}
