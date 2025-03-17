"use client";

import React, { useState } from "react";
import { Link, Element } from "react-scroll";
import { CheckCircle, XCircle } from "lucide-react";

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
        When opening a bank account in the Philippines, you generally need to have a long-term residency 
        status in the country. However, there are cases where it is possible to open an account while in Japan. 
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

        <Section title="Conditions for Opening" name="opening">
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
        </Section>

      {/*  <Section title="Services that can help you open an account online" name="services">
          <ul className="list-decimal pl-6 space-y-4">
            {services.map((adv, index) => (
              <li key={index}>
                <div className="flex items-center mb-2">
                  {adv.icon}
                  <strong>{adv.title}</strong>
                </div>
                <ul className="list-disc pl-6 space-y-1">
                  {adv.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section> */}


        <Section title="Inspire Holdings Incorporated" name="inspire">
        <div className="space-y-4">

          <p className="text-gray-700 text-lg leading-relaxed">
          Inspire Holdings Incorporated is a general financial trading company based in the Philippines that supports online bank account 
          opening for non-residents. The required documents are a passport and a Japan driver's license (or My Number Card), 
          and the procedure will be carried out through an online interview.
          </p>
  
          </div>

          
          <div className="space-y-4">

          <SectionImage src="images/pselobby.png" alt="PSE Lobby" />

    
          </div>

        </Section>

        <Section title="Company Profile" name="profile">
          {companyProfile.map((item, index) => (
            <h3 key={index} className="text-lg font-bold space-y-4">{item}</h3>
          ))}
        </Section>
        <SectionImage src="images/holdingsinfo.png" alt="Holdings Info" />

        <Section title="Annual Interest Table for Microinvestments" name="interest">
        <p className="text-gray-700 text-lg leading-relaxed">
        The term of the contract ranges from 6 months to a maximum of 2 years.
        You can get a bank interest rate of 1.2% per annum up to 12.1%.
          </p>
          <SectionImage src="images/holdingsdividend.png" alt="Dividend Info" />
          <SectionImage src="images/dividendtimeinfo.png" alt="Dividend Time Info" />
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
          <Link to={item.name} smooth={true} duration={500} offset={-80} className="cursor-pointer text-blue-600 hover:underline">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </>
);

const japanbank = [
  { title: "Philippine National Bank (PNB)", details: ["Possible to open an account at the Tokyo Branch Office and Nagoya Branch Office.", "Required documents include a passport, residence card (if you are a Japan resident), two photographs (30 mm × 24 mm), 510 yen for mailing, and the amount of the initial deposit","When opening an account, proof of acquisition of real estate is required.","NOTE: this account is a payment-only account and does not come with a debit card."] },
  { title: "Banco de Oro (BDO)", details: ["Can open an account directly at any local BDO branch", "Requires Japanese Passport and additional identification (i.e. Japan Driver's License or Alien Registration Card), and Certificate of Employment or any documents proving local work","Inital deposit can vary on the type of account, Php 2,000 or more"] },
];

const opening = [
  { title: "", items: ["Buying real estate in the Philippines and receiving rental income", "Pension benefits", "Obtaining a Special Resident Retiree Visa (SRRV)","Receiving a salary for working in the Philippines","Study Abroad in Schools in the Philippines","If you have a Filipino spouse or children"] },
];

const services = [
  { title: "Advantages", icon: <CheckCircle className="text-green-500 w-5 h-5 mr-2" />, details: ["Can start with a small amount.", "Automated savings help build wealth.", "Lower fees compared to traditional investment options."] },
  { title: "Disadvantages", icon: <XCircle className="text-red-500 w-5 h-5 mr-2" />, details: ["Small investments take time.", "Some services have relatively high fees.", "Automated strategies may not suit stock pickers."] },
];

const tocItems = [
  { name: "characteristics", label: "Characteristics of Microinvestments" },
  { name: "services", label: "Typical Services", indent: true },
  { name: "advantages", label: "Advantages & Disadvantages", indent: true },
  { name: "inspire", label: "Inspire Holdings" },
  { name: "profile", label: "Company Profile", indent: true },
  { name: "interest", label: "Annual Interest Table" },
];

const companyProfile = [
  "Established on January 2012",
  "President: Mrs. Melody Santos",
  "Nature of Business: Comprehensive consultancy",
  "Board Members: 8",
  "Employees and Agents: 85",
  "Capital: 200,000,000 PHP (approx. 520M Yen)",
];

export default PHBankOpen