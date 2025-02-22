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
        <a href="https://translate.google.com/translate?sl=ja&tl=en&u=https://inspiregroup-git-main-amurobrians-projects.vercel.app">
          English
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=th&u=https://inspiregroup-git-main-amurobrians-projects.vercel.app">
          Thai
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=fr&u=https://inspiregroup-git-main-amurobrians-projects.vercel.app">
          French
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=zh-TW&u=https://inspiregroup-git-main-amurobrians-projects.vercel.app">
          繁體中文
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=zh-CN&u=https://inspiregroup-git-main-amurobrians-projects.vercel.app">
          简体中文
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=ko&u=https://inspiregroup-git-main-amurobrians-projects.vercel.app">
          한국어
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=id&u=https://inspiregroup-git-main-amurobrians-projects.vercel.app">
          Indonesian
        </a>
        <a href="https://translate.google.com/translate?sl=en&tl=ja&u=https://inspiregroup-git-main-amurobrians-projects.vercel.app">
          日本語
        </a>
      </div>

      <p>Powered by</p>
      <p>Inspire Group</p>
    </footer>
  );
};

export default Footer;
