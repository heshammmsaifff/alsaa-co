"use client";

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaSnapchatGhost,
} from "react-icons/fa";

const Media = () => {
  const iconStyle =
    "text-3xl p-3 rounded-full transition-all duration-300 hover:scale-110";

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      {/* Facebook */}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconStyle}`}
        style={{ backgroundColor: "#68875a", color: "#fff" }}
      >
        <FaFacebookF />
      </a>

      {/* Instagram */}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconStyle}`}
        style={{ backgroundColor: "#304f27", color: "#fff" }}
      >
        <FaInstagram />
      </a>

      {/* WhatsApp */}
      {/* <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconStyle}`}
        style={{ backgroundColor: "#e3b43c", color: "#304f27" }}
      >
        <FaWhatsapp />
      </a> */}

      {/* TikTok */}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconStyle}`}
        style={{ backgroundColor: "#f8c42e", color: "#304f27" }}
      >
        <FaTiktok />
      </a>

      {/* Snapchat */}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconStyle}`}
        style={{ backgroundColor: "#e3b43c", color: "#fff" }}
      >
        <FaSnapchatGhost />
      </a>
    </div>
  );
};

export default Media;
