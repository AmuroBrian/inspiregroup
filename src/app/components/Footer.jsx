"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/TranslationContext"; //
import { useLanguageStore } from "@/storage/languageStore";

const Footer = () => {
  const { language, setLanguage, t } = useTranslation();

  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      style={{
        backgroundColor: "#fff",
        color: "#282c34",
        textAlign: "center",
        padding: "20px 0",
      }}
    >
      {/* Copyright Notice */}
      <p>Copyright © 2024 Inspire Holdings Inc. - All Rights Reserved.</p>

      {/* Language Links */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "10px",
        }}
      >
        <div
          onClick={() => setLanguage("en")}
          style={{ cursor: "pointer" }}
          className={language === "en" ? "font-bold" : ""}
        >
          English
        </div>
        <div
          onClick={() => setLanguage("ja")}
          style={{ cursor: "pointer" }}
          className={language === "ja" ? "font-bold" : ""}
        >
          日本語
        </div>
        <div
          onClick={() => setLanguage("ko")}
          style={{ cursor: "pointer" }}
          className={language === "ko" ? "font-bold" : ""}
        >
          한국어
        </div>
        <div
          onClick={() => setLanguage("zh")}
          style={{ cursor: "pointer" }}
          className={language === "zh" ? "font-bold" : ""}
        >
          简体中文
        </div>
      </div>

      {/* Footer Branding */}
      <p>Powered by</p>
      <p>Inspire Group</p>
    </footer>
  );
};

export default Footer;
