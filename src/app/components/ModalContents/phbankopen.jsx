"use client";

import React, { useState } from "react";
import { Link, Element } from "react-scroll";
import Image from "next/image";

const PHBankOpen = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto p-6">
      {/* Desktop ToC - Fixed on large screens */}
      <div className="hidden md:block md:p-4 md:relative lg:fixed lg:left-10 lg:top-20 lg:w-1/4 bg-white shadow-lg rounded-lg border border-gray-200">
        <ToC />
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 md:ml-auto">
        {/* Centered Image */}
        <SectionImage src="images/phbankopen.png" alt="Open Bank" />

        {/* Introduction */}
        <p className="mt-4 text-lg justified-center">
          When opening a bank account in the Philippines, you generally need to
          have a long-term residency status in the country. However, there are
          cases where it is possible to open an account while in Japan.
        </p>

        {/* Sections */}
        <Section title="Phillipine Banks in use in Japan" name="japanbank">
          <ol className="list-decimal pl-6 space-y-4">
            {japanbank.map((item, index) => (
              <li key={index}>
                <strong>{item.title}</strong>
                <ul className="list-disc pl-6">
                  {item.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Conditions for Opening an Account" name="opening">
          {opening.map((service, index) => (
            <div key={index} className="mb-4">
              <strong>{service.title}</strong>
              <ul className="list-disc pl-6">
                {service.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-gray-200 p-4 rounded-lg text-sm text-gray-700">
            <p className="leading-relaxed">
              In these cases, the service is for residents, and an ACR (Alien
              Certificate of Registration) is always required.
            </p>
          </div>
        </Section>

        <Section title="Inspire Holdings Incorporated" name="inspire">
          <div className="space-y-4">
            <p className="text-gray-700 text-lg leading-relaxed">
              Inspire Holdings Incorporated is a general financial trading
              company based in the Philippines that supports online bank account
              opening for non-residents. The required documents are a passport
              and a Japan driver's license (or My Number Card), and the
              procedure will be carried out through an online interview.
            </p>
          </div>

          <div className="bg-gray-200 p-4 rounded-lg text-sm text-gray-700">
            <h3 className="font-bold text-gray-900">⚠️ REMINDERS </h3>
            <ul className="list-disc pl-5 mt-2 space-y-4">
              <li>
                <strong>Maintain a Minimum Deposit:</strong> Some banks may
                charge an account maintenance fee if you drop below the minimum
                deposit amount. For example, BDO Unibank requires a minimum
                deposit of P2,000 for ATM card-only accounts and P5,000 for
                passbook and ATM card accounts.
              </li>
              <li>
                <strong>Continued Trading:</strong> Your account may be frozen
                if you don't trade for one year. Make sure you trade regularly.
              </li>
              <li>
                <strong>Check Fees:</strong> There may be various fees, such as
                transfer fees and ATM usage fees, so it is important to check in
                advance.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <SectionImage src="images/phbankopeninfo.png" alt="Info" />

            <a
              href="https://inspireholdings.ph/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow duration-300 w-full max-w-2xl"
            >
              {/* Left side - Text */}
              <div className="p-5 flex-1">
                <h2 className="text-lg font-bold text-gray-900">
                  Inspire Holdings Inc.
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Explore a variety of high-quality, advanced services and prod
                </p>
                <p className="text-blue-500 text-sm mt-2">inspireholdings.ph</p>
              </div>

              {/* Right side - Image */}
              <div className="w-1/3">
                <Image
                  src="/images/earth.png"
                  alt="Inspire Holdings"
                  width={200}
                  height={120}
                  className="object-cover w-full h-full"
                />
              </div>
            </a>
          </div>
        </Section>

        <Section title="INSPIRE WALLET" name="wallet">
          {wallet.map((item, index) => (
            <h3 key={index} className="text-lg font-bold space-y-4">
              {item}
            </h3>
          ))}
        </Section>
        <SectionImage src="images/inspirewallet.png" alt="Holdings Info" />
        <p className="text-gray-700 text-lg leading-relaxed justified-center">
          Inspire Wallet is a multi-wallet that allows you to open microfinance,
          banking services, and accounts with partner banks while staying in
          Japan. In addition, there are also services such as Travel Protection
          at an additional cost, and the scope of the service is limited to
          Manila for now.
        </p>

        <p className="mt-6 text-gray-700 text-lg justified-center">
          Inspire wallet can be pooled in two types: Philippine peso and USDT
          (BEP-20).
        </p>

        <p className="mt-6 text-gray-700 text-lg justified-center">
          When you open an account, you will need to sign a contract with a
          passport and a photo ID such as a driver's license or My Number card.
        </p>
        <p className="mt-6 text-gray-700 text-lg justified-center">
          From the menu screen, it is possible to open a bank account with our
          partners: BDO, Security Bank, CTBC Bank, and Union Bank. This is the
          only wallet that can do this!
        </p>

        <Section
          title="How to Download the Inspire Wallet App"
          name="download-app"
        >
          <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              How to Download the Inspire Wallet App
            </h2>

            <ul className="space-y-8">
              {/* Step 1 */}
              <li className="flex flex-col items-center">
                <img
                  src="/images/appstore1.png"
                  alt="App Store"
                  className="w-100 h-100 rounded-lg shadow-md"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">
                    Step 1: Open your iOS App Store or Android Play Store
                  </h3>
                </div>
                <hr className="w-full border-t border-gray-300 my-6" />
              </li>

              {/* Step 2 */}
              <li className="flex flex-col items-center">
                <img
                  src="/images/phbankopeninspirewallet.png"
                  alt="Search App"
                  className="w-100 h-100 rounded-lg shadow-md"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">
                    Step 2: Search for "Inspire Wallet"
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Type "Inspire Wallet" in the search bar, locate the correct
                    app, and click Install.
                  </p>
                </div>
                <hr className="w-full border-t border-gray-300 my-6" />
              </li>

              {/* Step 3 */}
              <li className="flex flex-col items-center">
                <img
                  src="/images/phbankopenregister.png"
                  alt="Download App"
                  className="w-100 h-100 rounded-lg shadow-md"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">
                    Step 3: When installation is complete, open the app and
                    click "Register"
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Registration is FREE! Fill out the necessary information in
                    the Registration form.
                  </p>
                </div>
                <hr className="w-full border-t border-gray-300 my-6" />
              </li>

              {/* Step 4 */}
              <li className="flex flex-col items-center">
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">
                    Step 4: Once done registering, your account is created!
                  </h3>
                  <p className="text-gray-600 text-lg">
                    You will be redirected to the homepage of the app, explore
                    the app to see all the features!
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, name, children }) => (
  <Element name={name} className="mt-10">
    <h2 className="text-xl font-bold">{title}</h2>
    {children}
  </Element>
);

const SectionImage = ({ src, alt }) => (
  <div className="flex justify-center mt-10">
    <img src={src} alt={alt} className="w-full h-auto" />
  </div>
);

const ToC = () => (
  <>
    <h2 className="font-semibold mb-2">📌 Table of Contents</h2>
    <ul className="space-y-2 text-sm">
      {tocItems.map((item, index) => (
        <li key={index} className={item.indent ? "pl-4" : ""}>
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
  </>
);

const japanbank = [
  {
    title: "Philippine National Bank (PNB)",
    details: [
      "Possible to open an account at the Tokyo Branch Office and Nagoya Branch Office.",
      "Required documents include a passport, residence card (if you are a Japan resident), two photographs (30 mm × 24 mm), 510 yen for mailing, and the amount of the initial deposit",
      "When opening an account, proof of acquisition of real estate is required.",
      "NOTE: this account is a payment-only account and does not come with a debit card.",
    ],
  },
  {
    title: "Banco de Oro (BDO)",
    details: [
      "Can open an account directly at any local BDO branch",
      "Requires Japanese Passport and additional identification (i.e. Japan Driver's License or Alien Registration Card), and Certificate of Employment or any documents proving local work",
      "Inital deposit can vary on the type of account, Php 2,000 or more",
    ],
  },
];

const opening = [
  {
    title: "",
    items: [
      "Buying real estate in the Philippines and receiving rental income",
      "Pension benefits",
      "Obtaining a Special Resident Retiree Visa (SRRV)",
      "Receiving a salary for working in the Philippines",
      "Study Abroad in Schools in the Philippines",
      "If you have a Filipino spouse or children",
    ],
  },
];

const tocItems = [
  { name: "japanbank", label: "Philippine Banks in use in Japan" },
  { name: "opening", label: "Conditions for Opening an Account", indent: true },
  { name: "inspire", label: "Inspire Holdings" },
  { name: "wallet", label: "Inspire Wallet", indent: true },
  { name: "download-app", label: "How to Download the Inspire Wallet App" },
];

const wallet = [
  /*"Established on January 2012",
  "President: Mrs. Melody Santos",
  "Nature of Business: Comprehensive consultancy",
  "Board Members: 8",
  "Employees and Agents: 85",
  "Capital: 200,000,000 PHP (approx. 520M Yen)", */
];

export default PHBankOpen;
