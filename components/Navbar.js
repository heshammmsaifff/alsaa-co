"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Phone, Home, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext"; // ✅ استيراد الـ CartContext

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { user, signOut } = useAuth();
  const { cartItems } = useCart(); // عدد العناصر في السلة

  const navLinks = [
    { name: "الرئيسية", href: "/", icon: <Home /> },
    { name: "تواصل معنا", href: "/contact", icon: <Phone /> },
    { name: "منتجاتنا", href: "/#products", icon: <ShoppingCart /> },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1030);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Navbar Header */}
      <header
        dir="rtl"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4
          ${
            isScrolled
              ? "bg-white/80 shadow-sm border-b border-white/20 text-green-900"
              : "bg-white/80 shadow-md border-b border-white/40 text-green-800"
          }
        `}
      >
        <div className="container mx-auto flex justify-between items-center py-4 h-18 relative">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold flex items-center gap-2"
          >
            <img
              src="/sa3.jpg"
              alt="logo"
              width={120}
              className="rounded-full"
            />
          </Link>

          {/* Desktop nav */}
          {!isMobile && (
            <nav className="flex items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex justify-center font-extrabold items-center gap-2 py-2 px-5 rounded-[20px] bg-amber-100 text-[#133752]"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}

              {/* أيقونة السلة */}
              <Link
                href="/CartPage"
                className="relative flex items-center gap-1 px-3 py-2 rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition"
              >
                <ShoppingBag />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                      {user.email?.[0].toUpperCase()}
                    </div>
                    <span className="text-gray-800 font-medium">
                      {user.user_metadata?.name
                        ? user.user_metadata.name
                        : user.email?.split("@")[0]}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute left-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
                      >
                        الملف الشخصي
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-600"
                      >
                        تسجيل الخروج
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-sm bg-blue-700 text-white px-3 py-1.5 rounded-full hover:bg-blue-400 transition"
                >
                  تسجيل الدخول
                </Link>
              )}
            </nav>
          )}

          {/* Hamburger button for mobile */}
          {isMobile && (
            <button
              className="text-green-800 z-50"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobile && (
        <>
          {menuOpen && (
            <div
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setMenuOpen(false)}
            ></div>
          )}

          <div
            className={`fixed top-0 right-0 h-full w-64 z-50 transform transition-transform duration-300
              bg-blue-900 text-white shadow-xl border-l border-blue-700 rounded-l-2xl
              ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex justify-between items-center p-4 border-b border-blue-700">
              <span className="font-bold text-lg">القائمة</span>
              <button onClick={() => setMenuOpen(false)} className="text-white">
                <X size={28} />
              </button>
            </div>

            <nav className="flex flex-col mt-4 gap-2 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-blue-800"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}

              {/* أيقونة السلة للموبايل */}
              <Link
                href="/CartPage"
                onClick={() => setMenuOpen(false)}
                className="relative flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-blue-800"
              >
                <ShoppingBag />
                <span className="mr-2">سلة التسوق</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              <hr className="my-2 border-blue-700" />

              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-blue-800"
                  >
                    {user.user_metadata?.name || "الملف الشخصي"}
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-red-700 text-red-400"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 py-2 px-3 rounded-lg bg-white/30 hover:bg-white/60"
                >
                  تسجيل الدخول
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
