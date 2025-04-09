"use client";

import React from "react";
import { Link } from "react-scroll";
import Image from "next/image";

const tocItems = [
  {
    name: "era",
    label: "A new era of buying real estate with virtual currency has arrived!",
  },
  { name: "features", label: "Features of this innovative mechanism" },
  {
    name: "advantages",
    label: "Advantages of investing in real estate with USDT",
  },
];

const ToC = () => (
  <div className="hidden md:block md:p-4 md:relative lg:fixed lg:left-10 lg:top-20 lg:w-1/4 bg-white shadow-lg rounded-lg border border-gray-200">
    <h2 className="font-semibold mb-2">📌 Table of Contents</h2>
    <ul className="space-y-2 text-sm">
      {tocItems.map((item, index) => (
        <li
          key={index}
          className={`flex items-center space-x-2 ${index === 0 ? "" : "ml-4"}`}
        >
          <Link
            to={item.name}
            smooth={true}
            duration={500}
            offset={-80}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Section = ({ title, name, children }) => (
  <section id={name} className="mb-10">
    <div className="flex items-center space-x-2 mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    {children}
  </section>
);

const RealEstatePurchase = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto p-6 pt-20">
      <ToC />
      <div className="md:w-3/4 md:ml-auto">
        {/* Intro Section */}
        <Image
          src="/images/realestateusdt.png"
          alt="Real Estate Purchase with USDT"
          width={600}
          height={300}
          className="mb-6 mx-auto rounded-lg shadow-lg"
        />
        <h1 className="text-2xl font-bold mb-4 pt-4">
          For the first time in the industry, it is now possible to purchase
          real estate with USDT!
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>Inspire</strong> has finally made it possible to purchase real
          estate using the cryptocurrency <strong>USDT (Tether).</strong>
        </p>
        <hr className="my-6" />

        <Section
          title="🌟 A new era of buying real estate with virtual currency has arrived!"
          name="intro"
        >
          <p className="text-gray-700 text-lg leading-relaxed">
          You don't have to <strong>wait for a bank loan to be approved or go through complicated paperwork</strong> 
          like you used to. By using USDT, you can manage your assets more freely and smartly, 
          and you can realize flexible real estate investment.
          </p>
          <Image
            src="/images/realestateusdtinfo1.png"
            alt="Information 1"
            width={600}
            height={300}
            className="mb-6 mx-auto rounded-lg shadow-lg"
          />
        </Section>

        <Section
          title="🌟 Features of this innovative mechanism"
          name="features">

          <h2 className="text-lg font-semibold mb-2">✅ Smooth transactions with Inspire Wallet</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
          Just register with the financial institution app <strong>"Inspire Wallet"</strong> for safe and secure transactions.
          </p>
<hr className="my-6" />

          <h2 className="text-lg font-semibold mb-2">✅ Start operating with a minimum amount of time deposit, and then manage it freely</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
          A certain amount of time deposit is required, but after that, you can flexibly manage your assets with USDT.
          </p>

          <hr className="my-6" />
          <h2 className="text-lg font-semibold mb-2">✅ Easy payment for down payment and monthly payment with USDTT</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
          Speedy settlement using USDT without relying on conventional bank transfers.
          </p>

          <hr className="my-6" />
          <h2 className="text-lg font-semibold mb-2">✅ Peace of mind that you are in complete control of your assets </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
          Manage your assets directly in your own wallet, ensuring safety and transparency.
          </p>

          <hr className="my-6" />
          <h2 className="text-lg font-semibold mb-2">✅ A Next-Generation Real Estate Purchase Model Free from Fiat Currency Constraints</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
          A new form of investment that allows you to purchase and manage real estate without relying on banks or fiat currency.
          </p>
          </Section>

          <Section
          title="🌟 Advantages of investing in real estate with USDT"
          name="advantages">
          <h2 className="text-lg font-semibold mb-4">✅ No need to rely on banks or fiat currency</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
          You can purchase real estate without relying on banks or fiat currency, which can be a hassle.
          </p>
          </Section>
      </div>
    </div>
  );
};

export default RealEstatePurchase;
