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
        <a href="https://translate.google.com/translate?sl=en&tl=en&u=https://inspireholdings.ph">
          English
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=th&u=https://sample.com">
          Thai
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=fr&u=https://sample.com">
          French
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=zh-TW&u=https://sample.com">
          繁體中文
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=zh-CN&u=https://sample.com">
          简体中文
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=ko&u=https://sample.com">
          한국어
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=id&u=https://sample.com">
          Indonesian
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=ja&u=https://sample.com">
          日本語
        </a>
      </div>

      <p>Powered by</p>
      <p>Inspire Group</p>
    </footer>
  );
};

export default Footer;
