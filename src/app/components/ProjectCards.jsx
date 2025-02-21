"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "./ui/Card";

const cards = [
  {
    id: 1,
    title: "Company Overview",
    image: "./images/PSEbuilding.jpg",
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
    id: 5,
    title: "Inspire Wallet",
    image: "./images/inspirewallet.png",
    link: "/docs/InspireWallet.pdf",
    image: "./images/inspire-logoo.png",
    link: "/docs/Inspire-Wallet.pdf",
  },
  {
    id: 6,
    title: "Financial Products",
    image: "./images/financialproduct.png",
    link: "/docs/FinancialProduct.pdf",
  },
  {
    id: 7,
    title: "Private Banking",
    image: "./images/private-banker.png",
    link: "/docs/PrivateBanker.pdf",
  },
  {
    id: 8,
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
      <a href={link} 

      rel="noopener noreferrer">
        <Card className="overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition h-full flex flex-col">
          <img src={image} alt={title} className="w-full h-64 object-cover" />
          <CardContent className="p-4 flex-grow flex flex-col">
            <h3 className="text-lg font-semibold flex-grow text-center">
              {title}
            </h3>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
};

const ProjectCards = () => {
  return (
    <div className="flex flex-wrap justify-center p-8" id="about">
      {/* Horizontal line with Business Line text */}
      <div className="relative flex items-center w-full my-6">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="px-4 text-lg font-semibold text-gray-700">
          BUSINESS LINES
        </span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      {/* Second set of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pr-2 pl-2 md:pr-44 md:pl-44 sm:pl-16 sm:pr-16 xl:pl-32 xl:pr-32">
        {cards.slice(4).map((card) => (
          <AnimatedCard key={card.id} {...card} />
        ))}
      </div>
      {/* Grid layout: 2 columns on all screen sizes with responsive padding */}
      <div className="relative flex items-center w-full mb-6">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="px-4 text-lg font-semibold text-gray-700">ABOUT</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      {/* First set of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pr-2 pl-2 md:pr-44 md:pl-44 sm:pl-16 sm:pr-16 xl:pl-32 xl:pr-32">
        {cards.slice(0, 4).map((card) => (
          <AnimatedCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCards;
