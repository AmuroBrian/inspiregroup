"use client";

import React, { useState } from "react";
import { Link, Element } from "react-scroll";
import { CheckCircle, XCircle } from "lucide-react";

const MicroInvestments = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto p-6">
      {/* Desktop ToC - Fixed on large screens */}
      <div className="hidden md:block md:p-4 md:relative lg:fixed lg:left-10 lg:top-20 lg:w-1/4 bg-white shadow-lg rounded-lg border border-gray-200">
        <ToC />
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 md:ml-auto">
        {/* Centered Image */}
        <SectionImage
          src="images/MicroInvestmentsNotTranslate.png"
          alt="Micro Investments"
        />

        {/* Introduction */}
        <p className="mt-4 text-lg justified-center">
          Micro Investment is a method of investing with a small amount of
          money. Conventional investments require a certain amount, but with
          microinvestments, even beginners and people who just started asset
          formation can easily participate.
        </p>

        {/* Sections */}
        <Section
          title="Characteristics of Microinvestments"
          name="characteristics"
        >
          <ol className="list-decimal pl-6 space-y-4">
            {characteristics.map((item, index) => (
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

        <SectionImage src="images/investmentinfo.png" alt="Investment Info" />
        <Section title="Typical Services of Microinvestment" name="services">
          {services.map((service, index) => (
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

        <Section title="Advantages and Disadvantages" name="advantages">
          <ul className="list-decimal pl-6 space-y-4">
            {advantages.map((adv, index) => (
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
        </Section>

        <SectionImage
          src="images/yesnoinvestment.png"
          alt="Investment Decision"
        />

        <Section title="Inspire Holdings Incorporated" name="inspire">
          <div className="space-y-4">
            <p className="text-gray-700 text-lg leading-relaxed">
              Inspire Holdings is a financial, investing, and visionary
              management company with diverse interests spanning construction
              and development, healthcare and pharmaceuticals, gaming and
              entertainment, agricultural trading, and specialized services,
              serving both the private and public sectors.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              In adherence to the Wealthy Clique Model, it orchestrates a
              cohesive ecosystem, where the company operates as the central
              financial hub, capitalizing and harmonizing its subsidiaries and
              affiliates to drive innovation, efficiency, and collaboration.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              This forward-thinking entity is on a mission to make a direct and
              meaningful impact on the lives of individuals while also wielding
              its influence to create positive shifts in geopolitics.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Simultaneously, it remains dedicated to delivering substantial
              returns to its valued shareholders.
            </p>
          </div>

          <div className="space-y-4">
            <SectionImage src="images/pselobby.png" alt="PSE Lobby" />

            <p className="text-gray-700 text-lg leading-relaxed">
              Inspire Holdings Inc. is a full-service consulting firm based in
              the Philippines. The company provides professional consulting
              services for strategic business expansion and helps companies
              effectively expand into new market conditions.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Japan managers who have been involved in the Philippines for many
              years are now so trusted and relied on by INSPIRE that they are
              inundated with requests.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              We are also focusing on precise marketing management, the
              evolution of smart cities using AI, and the promotion of advanced
              technologies. The company's mission is to expand international
              business from the Philippines, facilitate mergers and
              acquisitions, and be a pioneer in the global entertainment
              business.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Moreover, Inspire Holdings Inc. aims to go public by 2027 and
              plans to contribute to its vision of making the Philippines a
              leader in Asia.
            </p>
          </div>
        </Section>

        <Section title="Company Profile" name="profile">
          {companyProfile.map((item, index) => (
            <h3 key={index} className="text-lg font-bold space-y-4">
              {item}
            </h3>
          ))}
        </Section>
        <SectionImage src="images/holdingsinfo.png" alt="Holdings Info" />

        <Section
          title="Annual Interest Table for Microinvestments"
          name="interest"
        >
          <p className="text-gray-700 text-lg leading-relaxed">
            The term of the contract ranges from 6 months to a maximum of 2
            years. You can get a bank interest rate of 1.2% per annum up to
            12.1%.
          </p>
          <SectionImage src="images/holdingsdividend.png" alt="Dividend Info" />
          <SectionImage
            src="images/dividendtimeinfo.png"
            alt="Dividend Time Info"
          />
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

const characteristics = [
  {
    title: "Small Initial Investment",
    details: [
      "Start with a small amount.",
      "Beginner-friendly due to its low entry barrier.",
    ],
  },
  {
    title: "Utilization of Apps and Digital Platforms",
    details: [
      "Invest easily via smartphone apps.",
      "Many platforms offer fully online account setup.",
    ],
  },
  {
    title: "Emphasis on Recurring and Spare Change Investments",
    details: [
      "Automated investment of spare change from credit card transactions.",
      "Option for recurring, fixed-amount investments.",
    ],
  },
];

const services = [
  {
    title: "Domestic Services (Japan)",
    items: [
      "WealthNavi for TsumiTate",
      "THEO",
      "Toranoko (Spare Change Investment)",
    ],
  },
  {
    title: "Overseas Services",
    items: ["Acorns (USA)", "Stash (USA)", "Raiz (Australia)"],
  },
];

const advantages = [
  {
    title: "Advantages",
    icon: <CheckCircle className="text-green-500 w-5 h-5 mr-2" />,
    details: [
      "Can start with a small amount.",
      "Automated savings help build wealth.",
      "Lower fees compared to traditional investment options.",
    ],
  },
  {
    title: "Disadvantages",
    icon: <XCircle className="text-red-500 w-5 h-5 mr-2" />,
    details: [
      "Small investments take time.",
      "Some services have relatively high fees.",
      "Automated strategies may not suit stock pickers.",
    ],
  },
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

export default MicroInvestments;
