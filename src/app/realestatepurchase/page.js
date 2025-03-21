"use client";

import Image from 'next/image';
import { FaUniversity } from 'react-icons/fa';
import { useRef } from 'react';

export default function InspireWalletPage() {
  const sectionsRef = {
    openAccount: useRef(null),
    bdo: useRef(null),
    unionbank: useRef(null),
    bpi: useRef(null),
    ctbc: useRef(null),
    securitybank: useRef(null),
    maya: useRef(null),
  };

  const scrollToSection = (section) => {
    sectionsRef[section].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white flex justify-center p-28">
      <div className="max-w-3xl w-full bg-white p-6">
 {/* Image Section */}
 <div className="mt-6 flex justify-center">
          <Image 
            src="/images/realestateusdt.png"
            alt="Inspire Holdings Incorporated" 
            width={800} 
            height={400} 
            className="rounded-lg"
          />
        </div>

        {/* Content Section */}
        <h2 className="mt-6 text-3xl font-bold text-left">First in the industry! It is now possible to purchase real estate with USDT!</h2>


        {/* Description */}
        <p className="mt-4 text-gray-700 text-left">
        Inspire has finally made it possible to purchase real estate using the cryptocurrency USDT (Tether)!
        </p>

        {/* Table of Contents */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="font-bold text-gray-700">📌 Table of Contents</p>
          {/* <button 
            onClick={() => scrollToSection("openAccount")} 
            className="text-gray-600 hover:text-blue-600 transition w-full text-left block py-2"
          >
            Open an account via wallet
          </button> */}
          <div className="mt-2 border-t border-gray-300">
            {[
              { name: "BDO Unibank", id: "bdo" },
              { name: "UnionBank", id: "unionbank" },
              { name: "BPI BANK", id: "bpi" },
              { name: "CTBC BANK", id: "ctbc" },
              { name: "Security Bank", id: "securitybank" },
              { name: "MAYA", id: "maya" }
            ].map((bank) => (
              <button 
                key={bank.id} 
                onClick={() => scrollToSection(bank.id)} 
                className="block py-2 border-b border-gray-200 flex items-center gap-2 text-gray-700 hover:text-blue-600 transition w-full text-left"
              >
                <FaUniversity className="text-gray-500" />
                {bank.name}
              </button>
            ))}
          </div>
        </div>

        {/* Open an Account via Wallet Section */}
        <div className="mt-10 space-y-12">
          {/* <section ref={sectionsRef.openAccount} className="mt-12">
            <h2 className="text-xl font-bold text-left">Open an Account via Wallet</h2>
            <div className="mt-6 flex justify-center">
          <Image 
            src="/images/accountviawallet.png"
            alt="Inspire Holdings Incorporated" 
            width={800} 
            height={400} 
            className="rounded-lg"
          />
        </div>
            <p className="text-gray-600 mt-2 text-center">
              You can open these accounts!
            </p>

            <p className="text-justify mt-2 text-xl leading-relaxed">
            Normally, you are required to open a bank account if you are a resident of the 
            country or if you have a VISA. However, the Philippines' Inspire Wallet app has cleared that hurdle.
            </p>
            <p className="text-justify mt-2 text-xl leading-relaxed">
            Although it is limited to banks, it is still possible to open accounts such as "BDO", "Union Bank", 
            "BPI", "CTBC", "Security Bank", "MAYA", etc. with a <strong>Japan ID card</strong>. </p>
            <p className="text-justify mt-2 text-xl leading-relaxed">
                Debit cards and cash cards themselves 
                are delivered locally in the Philippines, but it is quite an innovative system.
            </p>

          </section> */}

          {/* Bank Sections with Unique Content */}
          <section ref={sectionsRef.bdo} className="mt-12">
            <h2 className="text-xl font-bold text-left">🌟 A new era of buying real estate with virtual currency has arrived!</h2>
            

            {/* Bank Information Box */}
                <p className="text-gray-800 leading-relaxed text-lg text-justify mt-10">
                You don't have to wait for a bank loan to be approved or go through complicated paperwork like you used to. By using USDT, you can manage your assets more freely and smartly, and you can realize flexible real estate investment.
                </p>


            <Image 
            src="/images/newera.png"
            alt="Inspire Holdings Incorporated" 
            width={800} 
            height={400} 
            className="rounded-lg mt-10"
          />
          </section>

          <section ref={sectionsRef.unionbank} className="mt-12">
            <h2 className="text-xl font-bold text-left">🌟 Features of this innovative mechanism</h2>

        <div className="mt-10">
          <h2 className="text-xl font-bold">✅ Smooth transactions with Inspire WalletJust</h2>
          <p className="text-gray-800 leading-relaxed text-lg mt-2 text-justify">
          register with the financial institution app "Inspire Wallet" for safe and secure transactions.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold">✅ Start operating with a minimum amount of time deposit, and then manage it freelyA</h2>
          <p className="text-gray-800 leading-relaxed text-lg mt-2 text-justify">
          certain amount of time deposit is required, but after that, you can flexibly manage your assets with USDT.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold">✅ Easy payment for down payment and monthly payment with USDTTspeedy settlement</h2>
          <p className="text-gray-800 leading-relaxed text-lg mt-2 text-justify">
          using USDT without relying on conventional bank transfers.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold">✅ Peace of mind that you are in complete control of your assets: Manage your assets directly in your own wallet,</h2>
          <p className="text-gray-800 leading-relaxed text-lg mt-2 text-justify">
          ensuring safety and transparency.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold">✅ We have realized a new form of investment that allows you to purchase and manage real estate without relying on next-generation real estate purchase model</h2>
          <p className="text-gray-800 leading-relaxed text-lg mt-2 text-justify">
          banks and fiat currencies that are not bound by legal tender.
          </p>
        </div>
          </section>

          <section ref={sectionsRef.bpi} className="mt-12">
            <h2 className="text-xl font-bold text-left">🌟 Advantages of investing in real estate with USDT</h2>
            <div className="mt-10">
          <h2 className="text-xl font-bold">🔹 Smooth cross-border transactions Unaffected by</h2>
          <p className="text-gray-800 leading-relaxed text-lg mt-2 text-justify">
          exchange rates, international asset management is possible.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold">🔹 Fast and efficient settlement There is no need to wait for</h2>
          <p className="text-gray-800 leading-relaxed text-lg mt-2 text-justify">
          bank loan approval, and transactions can be made in real time.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold">🔹 Price stability Since</h2>
          <p className="text-gray-800 leading-relaxed text-lg mt-2 text-justify">
          USDT is linked to the U.S. dollar, there is little risk of price fluctuations and stable operation.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl">🔹 <strong>Improved security and privacy</strong> You can manage your assets directly</h2>
          <p className="text-gray-800 leading-relaxed text-lg mt-2 text-justify">
          without involving
        <p>a third party.</p>
          </p>
        </div>

        <div className="flex items-center justify-center mt-10">
  <div className="bg-gray-100 rounded-lg shadow-md border border-gray-300 p-6">
    <p className="text-gray-800 leading-relaxed text-lg text-center">
     <strong> 🚀 Experience the future of real estate investment with Inspire!</strong>
    </p>
  </div>
</div>


        <div className="mt-10">
          <p className="text-gray-800 leading-relaxed text-lg mt-2 text-justify">
          The Inspire Wallet is an innovative platform that provides the future of real estate investment experiences, leveraging blockchain technology and cryptocurrencies to enable a new era of real estate ownership.
          </p>
        </div>
          </section>
     
        </div>
      </div>
    </div>
  );
}
