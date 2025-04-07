"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "./ui/Card";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional icons
import { useTranslation } from "@/TranslationContext";

const cards = [
  {
    id: 1,
    title: "Company Overview",
    image: "./images/PSE.jpg",
    link: "/companyoverview",
  },
  {
    id: 2,
    title: "Mission and Vision",
    image: "./images/Dart.jpeg",
    link: "/missionvision",
  },
  {
    id: 3,
    title: "Message from Executives",
    image: "./images/Denmark.jpeg",
    link: "/messageexec",
  },
  {
    id: 4,
    title: "Organization",
    image: "./images/CompanyMeeting.jpeg",
    link: "/orgchart",
  },

  {
    id: 5, //1
    title: "Inspire Wallet",
    image: "./images/inspirewallet.png",
    link: "/docs/InspireWallet(JP).pdf",
  },
  {
    id: 6, //2
    title: "Inspire Wallet Partner Banks",
    image: "./images/inspirepartnerbanks.png",
    link: "/docs/Bank.pdf",
  },

  {
    id: 7, //3
    title: "Financial Products",
    image: "./images/financialproduct.png",
    link: "/docs/FinancialProduct.pdf",
  },

  {
    id: 8, //4
    title: "Micro Investments",
    image: "./images/microinvestments.png",
    link: "/docs/Micro-Investment1.pdf",
  },
  {
    id: 9, //5
    title: "Private Banking",
    image: "./images/private-banker.png",
    link: "/docs/PrivateBanker.pdf",
  },
  {
    id: 10, //6
    title: "Opening a Philippine Bank Account for non-residents",
    image: "./images/bankaccounts.png",
    link: "/docs/InspireWallet(JP).pdf",
  },
  {
    id: 11, //7
    title: "Buying Real Estate with USDT",
    image: "./images/realestateusdt.png",
    link: "/docs/CryptoPresentation.pdf",
  },

  {
    id: 12, //8
    title: "Travel Protection",
    image: "./images/travel-protect.png",
    link: "/docs/travel.pdf",
  },
];

const AnimatedCard = ({ title, image, link }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full p-4"
    >
      <a href={link} rel="noopener noreferrer">
        <Card className="overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition h-full flex flex-col">
          <img src={image} alt={title} className="w-full h-32 md:h-64" />
          <CardContent className="md:p-4 flex-grow flex flex-col">
            {/* ✅ Title is now inside a <p> element using t.someKey */}
            <p className="text-base md:text-lg font-semibold flex flex-grow justify-center text-center items-center">
              {title}
            </p>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
};

// ✅ Section Title Component
const SectionTitle = ({ title }) => (
  <div className="relative flex items-center w-full my-6">
    <div className="flex-grow border-t border-gray-400"></div>
    <span className="px-4 text-lg font-semibold text-gray-700">{title}</span>
    <div className="flex-grow border-t border-gray-400"></div>
  </div>
);

const ProjectCards = () => {
  const { t } = useTranslation(); // ✅ Using t.someKey for translations

  const cardData = [
    {
      id: 1,
      title: t.companyOverview,
      image: "./images/PSE.jpg",
      link: "/companyoverview",
    },
    {
      id: 2,
      title: t.missionVision,
      image: "./images/Dart.jpeg",
      link: "/missionvision",
    },
    {
      id: 3,
      title: t.messageExec,
      image: "./images/Denmark.jpeg",
      link: "/messageexec",
    },
    {
      id: 4,
      title: t.organization,
      image: "./images/CompanyMeeting.jpeg",
      link: "/orgchart",
    },
    {
      id: 5,
      title: t.inspireWallet,
      image: "./images/inspirewallet.png",
      link: "/docs/InspireWallet.pdf",
    },
    {
      id: 6,
      title: t.financialProducts,
      image: "./images/financialproduct.png",
      link: "/docs/FinancialProduct.pdf",
    },
    {
      id: 7,
      title: t.privateBanking,
      image: "./images/private-banker.png",
      link: "/docs/PrivateBanker.pdf",
    },
    {
      id: 8,
      title: t.travelProtection,
      image: "./images/travel-protect.png",
      link: "/docs/travel.pdf",
    },
    {
      id: 9,
      title: t.InspireWalletPartnerBanks,
      image: "./images/inspirepartnerbanks.png",
      link: "/docs/Bank.pdf",
    },
    {
      id: 10,
      title: t.OpeningaPhilippineBankAccountfornonresidents,
      image: "./images/bankaccounts.png",
      link: "/docs/InspireWallet(JP).pdf",
    },
    {
      id: 11,
      title: t.BuyingRealEstatewithUSDT,
      image: "./images/realestateusdt.png",
      link: "/docs/CryptoPresentation.pdf",
    },
    {
      id: 12,
      title: t.MicroInvestments,
      image: "./images/microinvestments.png",
      link: "/docs/Micro-Investment1.pdf",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center p-1 md:p-8">
      {/* Business Lines Section */}
      <SectionTitle title={t.businessLines} />
      <div className="grid grid-cols-2 gap-2 w-full sm:grid-cols-2 md:px-16 xl:px-32">
        {cardData.slice(4).map((card) => (
          <AnimatedCard key={card.id} {...card} />
        ))}
      </div>

      <SectionTitle title={t.divisionInfo} />

      <div className="flex flex-col gap-10 bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 md:px-12 rounded-3xl shadow-inner">
        {/* Centered Intro */}
        <p className="w-full max-w-5xl mx-auto text-justify text-lg md:text-xl font-semibold text-gray-700 px-4">
          {t.divisionInfoTextIntro}
        </p>

        {/* Content Rows */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="border border-blue-400 rounded-2xl p-6 shadow-md bg-white transition hover:shadow-lg">
            <img
              src="/images/ccm1.png"
              alt="Consumer and Community Banking"
              className="w-full max-w-sm mx-auto rounded-xl mb-4"
            />

            <div className="text-lg font-extrabold text-blue-600 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full" />
              {t.divisionInfoText1Header}
            </div>
            <div className="text-gray-700 text-base md:text-lg font-medium mt-4 space-y-3">
              <p>{t.divisionInfoText1Intro}</p>
              <p>{t.divisionInfoText1Info}</p>
              <div className="font-semibold text-blue-700">
                {t.divisionInfoText1InfoHeader}
              </div>
              <ul className="list-disc list-inside text-gray-600 pl-2">
                <li>{t.divisionInfoText1InfoList1}</li>
                <li>{t.divisionInfoText1InfoList2}</li>
                <li>{t.divisionInfoText1InfoList3}</li>
                <li>{t.divisionInfoText1InfoList4}</li>
              </ul>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-blue-400 rounded-2xl p-6 shadow-md bg-white transition hover:shadow-lg">
            <img
              src="/images/cib1.png"
              alt="Corporate and Investement Banking"
              className="w-full max-w-sm mx-auto rounded-xl mb-4"
            />
            <div className="text-lg font-extrabold text-blue-600 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full" />
              {t.divisionInfoText2Header}
            </div>
            <div className="text-gray-700 text-base md:text-lg font-medium mt-4 space-y-3">
              <p>{t.divisionInfoText2Intro}</p>
              <p>{t.divisionInfoText2Info}</p>
              <div className="font-semibold text-blue-700">
                {t.divisionInfoText2InfoHeader}
              </div>
              <ul className="list-disc list-inside text-gray-600 pl-2">
                <li>{t.divisionInfoText2InfoList1}</li>
                <li>{t.divisionInfoText2InfoList2}</li>
                <li>{t.divisionInfoText2InfoList3}</li>
                <li>{t.divisionInfoText2InfoList4}</li>
              </ul>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border border-blue-400 rounded-2xl p-6 shadow-md bg-white transition hover:shadow-lg">
            <img
              src="/images/cb1.png"
              alt="Community Banking"
              className="w-full max-w-sm mx-auto rounded-xl mb-4"
            />
            <div className="text-lg font-extrabold text-blue-600 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full" />
              {t.divisionInfoText3Header}
            </div>
            <div className="text-gray-700 text-base md:text-lg font-medium mt-4 space-y-3">
              <p>{t.divisionInfoText3Intro}</p>
              <p>{t.divisionInfoText3Info}</p>
              <div className="font-semibold text-blue-700">
                {t.divisionInfoText3InfoHeader}
              </div>
              <ul className="list-disc list-inside text-gray-600 pl-2">
                <li>{t.divisionInfoText3InfoList1}</li>
                <li>{t.divisionInfoText3InfoList2}</li>
                <li>{t.divisionInfoText3InfoList3}</li>
                <li>{t.divisionInfoText3InfoList4}</li>
              </ul>
            </div>
          </div>

          {/* Card 4 */}
          <div className="border border-blue-400 rounded-2xl p-6 shadow-md bg-white transition hover:shadow-lg">
            <img
              src="/images/awm.png"
              alt="Asset and Wealth Management"
              className="w-full max-w-sm mx-auto rounded-xl mb-4"
            />
            <div className="text-lg font-extrabold text-blue-600 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full" />
              {t.divisionInfoText4Header}
            </div>
            <div className="text-gray-700 text-base md:text-lg font-medium mt-4 space-y-3">
              <p>{t.divisionInfoText4Intro}</p>
              <p>{t.divisionInfoText4Info}</p>
              <div className="font-semibold text-blue-700">
                {t.divisionInfoText4InfoHeader}
              </div>
              <ul className="list-disc list-inside text-gray-600 pl-2">
                <li>{t.divisionInfoText4InfoList1}</li>
                <li>{t.divisionInfoText4InfoList2}</li>
                <li>{t.divisionInfoText4InfoList3}</li>
                <li>{t.divisionInfoText4InfoList4}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <SectionTitle title={t.about} />
      <div className="grid grid-cols-2 gap-2 w-full sm:grid-cols-2 md:px-16 xl:px-32">
        {cardData.slice(0, 4).map((card) => (
          <AnimatedCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCards;
