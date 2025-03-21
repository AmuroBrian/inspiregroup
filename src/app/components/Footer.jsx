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
      {/* Language Selector */}
      <div className="flex justify-end mb-4">
      <select 
  className="p-2 border rounded" 
  onChange={(e) => setLanguage(e.target.value)}
  value={language}
>
  <option value="en" disabled={language === "en"}>English</option>
  <option value="ja" disabled={language === "ja"}>Japanese</option>
  <option value="ko" disabled={language === "ko"}>Korean</option>
  <option value="zh" disabled={language === "zh"}>Chinese</option>
</select>

      </div>

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
        <a href="https://translate.google.com/translate?sl=ja&tl=en&u=https://www.bankgroup.ph">English</a>
        <a href="https://translate.google.com/translate?sl=en&tl=th&u=https://www.bankgroup.ph">Thai</a>
        <a href="https://translate.google.com/translate?sl=en&tl=fr&u=https://www.bankgroup.ph">French</a>
        <a href="https://translate.google.com/translate?sl=en&tl=zh-TW&u=https://www.bankgroup.ph">繁體中文</a>
        <a href="https://translate.google.com/translate?sl=en&tl=zh-CN&u=https://www.bankgroup.ph">简体中文</a>
        <a href="https://translate.google.com/translate?sl=en&tl=ko&u=https://www.bankgroup.ph">한국어</a>
        <a href="https://translate.google.com/translate?sl=en&tl=id&u=https://www.bankgroup.ph">Indonesian</a>
        <a href="https://translate.google.com/translate?sl=en&tl=ja&u=https://www.bankgroup.ph">日本語</a>
      </div>

      {/* Footer Branding */}
      <p>Powered by</p>
      <p>Inspire Group</p>
    </footer>
  );
};

export default Footer;
