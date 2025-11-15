"use client";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  // بيانات التواصل البسيطة
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConfirmOrder = async () => {
    if (!user) {
      toast.error("يجب تسجيل الدخول لإتمام الطلب");
      return;
    }

    // التحقق من الحقول الأساسية
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error("الرجاء ملء جميع الحقول");
      return;
    }

    try {
      // حفظ الطلب في Supabase
      const { data: order, error } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id,
            full_name: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            items: cartItems, // حفظ المنتجات كـ JSON
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // عرض رسالة نجاح احترافية للمستخدم
      Swal.fire({
        icon: "success",
        title: "تم تأكيد طلبك!",
        html: `
        شكراً لك على الطلب.<br>
        سنتواصل معك قريباً لتحديد السعر وترتيب التسليم.<br><br>
      `,
        confirmButtonColor: "#166534",
        confirmButtonText: "حسناً",
      });

      // مسح السلة وإعادة تهيئة النموذج
      clearCart();
      setFormData({ fullName: "", phone: "", address: "" });
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء تأكيد الطلب");
    }
  };
  return (
    <div className="p-6 mt-24 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-[#133752]">
        سلة المشتريات
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">السلة فارغة</p>
      ) : (
        <>
          {/* منتجات السلة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center transition-all hover:shadow-lg"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-lg mb-3"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 mb-3">
                    صورة
                  </div>
                )}
                <h2 className="text-lg font-bold text-gray-800 mb-1">
                  {item.name}
                </h2>
                <p className="text-gray-600 mb-3">
                  الكمية: {item.quantity} {item.unit === "gram" ? "غ" : "كغ"}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    className="w-16 p-1 border rounded text-center"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Form بيانات التواصل البسيطة */}
          <div className="bg-white rounded-2xl shadow-md p-6 mt-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-[#133752]">
              بيانات التواصل
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="الاسم الكامل"
                className="border rounded-xl px-4 py-2 w-full"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="رقم الهاتف"
                className="border rounded-xl px-4 py-2 w-full"
              />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="العنوان بالتفصيل"
                className="border rounded-xl px-4 py-2 w-full"
              />
            </div>
          </div>

          {/* زر التأكيد */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleConfirmOrder}
              className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 font-semibold transition"
            >
              تأكيد الطلب
            </button>
          </div>
        </>
      )}
    </div>
  );
}
