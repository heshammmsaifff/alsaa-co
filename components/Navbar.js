"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Phone, Home, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "الرئيسية", href: "/", icon: <Home /> },
    { name: "تواصل معنا", href: "/contact", icon: <Phone /> },
    { name: "منتجاتنا", href: "/#products", icon: <ShoppingCart /> },
    {
      name: "العروض",
      href: "/#offers",
      isSpecial: true,
      icon: <ShoppingBag />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      dir="rtl"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 rounded-3xl backdrop-blur-md
        ${
          isScrolled
            ? "bg-white/30 shadow-sm border-b border-white/20 text-green-900"
            : "bg-white/50 shadow-md border-b border-white/40 text-green-800"
        }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 h-18">
        {/* 🌿 Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-extrabold text-green-800 hover:text-green-700 transition duration-300 flex items-center gap-2 mx-auto sm:mx-0"
        >
          🌿
        </Link>

        {/* ☰ Menu Button (Mobile) */}
        <button
          className="sm:hidden text-green-800 hover:text-green-600 transition absolute right-4 top-5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* 🧭 Navigation */}
        <nav
          className={`
            sm:flex sm:static sm:flex-row sm:items-center sm:gap-8 sm:bg-transparent
            text-[15px] sm:text-lg font-medium gap-3 transition-all duration-500 ease-in-out
            overflow-hidden sm:overflow-visible
            ${
              menuOpen
                ? "max-h-[400px] opacity-100 mt-4"
                : "max-h-0 opacity-0 sm:opacity-100"
            }
            absolute sm:relative top-20 right-4 left-4 sm:top-0 bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-none p-5 sm:p-0 shadow-lg sm:shadow-none border border-green-100 sm:border-0
          `}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`flex justify-center font-extrabold items-center gap-3 py-2 px-5 sm:px-6 rounded-[20px] whitespace-nowrap transition-all duration-300
${menuOpen ? "mt-2" : ""}
${
  link.isSpecial
    ? "text-red-600 border-red-100 hover:text-red-400 font-semibold shadow-sm bg-red-200"
    : "text-green-900 border-transparent hover:text-green-700 shadow-sm bg-amber-100"
}`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
