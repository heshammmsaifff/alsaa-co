"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import moment from "moment";

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // كل الـ hooks هنا ثابتة
  const fetchOrders = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data);
    } catch (err) {
      console.error("خطأ عند جلب الطلبات:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]); // لو user اتغير

  return (
    <div className="container mx-auto px-4 py-10 mt-20">
      {!user ? (
        <div className="flex justify-center items-center h-[80vh] text-gray-700">
          <p>يجب تسجيل الدخول لعرض الملف الشخصي.</p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">الملف الشخصي</h1>

          <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold mb-2">
                {user.email?.[0].toUpperCase()}
              </div>
              <p className="text-gray-800 font-medium">{user.email}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p>
                <b>الاسم:</b> {user.user_metadata?.name || "-"}
              </p>
              <p>
                <b>رقم الهاتف:</b> {user.user_metadata?.phone || "-"}
              </p>
            </div>

            <button
              onClick={signOut}
              className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
            >
              تسجيل الخروج
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-center">طلباتي</h2>

          {loading ? (
            <p className="text-center text-gray-500">جاري تحميل الطلبات...</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-500">لا توجد طلبات حالياً</p>
          ) : (
            <div className="space-y-4 max-w-2xl mx-auto">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-4 rounded-xl shadow border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">
                      {moment(order.created_at).format("DD/MM/YYYY HH:mm")}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        order.status === "تم التواصل"
                          ? "bg-green-100 text-green-800"
                          : order.status === "قيد التجهيز"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "تم التسليم"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status || "جديد"}
                    </span>
                  </div>
                  <p>
                    <b>الهاتف:</b> {order.phone}
                  </p>
                  <p>
                    <b>العنوان:</b> {order.address}
                  </p>
                  <div className="mt-2">
                    <b>المنتجات:</b>
                    <ul className="list-disc list-inside">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.title} - {item.quantity}{" "}
                          {item.unit === "gram" ? "غ" : "كغ"}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
