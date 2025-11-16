"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Phone, Home, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
          ? "bg-[#68875a]/40 shadow-sm border-b border-white/20 text-[#304f27]"
          : "bg-[#68875a] shadow-md border-b border-white/40 text-[#68875a]"
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
                  className="flex justify-center font-extrabold items-center gap-2 py-2 px-5 rounded-[20px] bg-[#f8c42e] text-[#304f27] hover:bg-[#e3b43c] transition-all duration-300"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Hamburger button for mobile */}
          {isMobile && (
            <button
              className="text-[#304f27] z-50"
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
          bg-[#68875a] text-white shadow-xl border-l border-[#304f27] rounded-l-2xl
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex justify-between items-center p-4 border-b border-[#304f27]">
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
                  className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-[#e3b43c] hover:text-[#304f27] transition-all duration-300"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}

              <hr className="my-2 border-[#304f27]" />
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
