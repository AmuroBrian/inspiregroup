\"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "./ui/Card";
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
    { id: 1, title: t.companyOverview, image: "./images/PSE.jpg", link: "/companyoverview" },
    { id: 2, title: t.missionVision, image: "./images/Dart.jpeg", link: "/missionvision" },
    { id: 3, title: t.messageExec, image: "./images/Denmark.jpeg", link: "/messageexec" },
    { id: 4, title: t.organization, image: "./images/CompanyMeeting.jpeg", link: "/orgchart" },
    { id: 5, title: t.inspireWallet, image: "./images/inspirewallet.png", link: "/docs/InspireWallet.pdf" },
    { id: 6, title: t.financialProducts, image: "./images/financialproduct.png", link: "/docs/FinancialProduct.pdf" },
    { id: 7, title: t.privateBanking, image: "./images/private-banker.png", link: "/docs/PrivateBanker.pdf" },
    { id: 8, title: t.travelProtection, image: "./images/travel-protect.png", link: "/docs/travel.pdf" },
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
