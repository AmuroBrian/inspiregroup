import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#fff",
        color: "#282c34",
        textAlign: "center",
        padding: "20px 0",
      }}
    >
      <p>Copyright © 2024 Inspire Holdings Inc. - All Rights Reserved.</p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "10px",
        }}
      >
        <a href="https://translate.google.com/translate?sl=ja&tl=en&u=https://www.bankgroup.ph">
          English
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=th&u=https://www.bankgroup.ph">
          Thai
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=fr&u=https://www.bankgroup.ph">
          French
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=zh-TW&u=https://www.bankgroup.ph">
          繁體中文
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=zh-CN&u=https://www.bankgroup.ph">
          简体中文
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=ko&u=https://www.bankgroup.ph">
          한국어
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=id&u=https://www.bankgroup.ph">
          Indonesian
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=ja&u=https://www.bankgroup.ph">
          日本語
        </a>
      </div>

      <p>Powered by</p>
      <p>Inspire Group</p>
    </footer>
  );
};

export default Footer;
