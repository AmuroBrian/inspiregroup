"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "./ui/Card";
import { useTranslation } from "@/TranslationContext";
import Image from "next/image";

const AnimatedCard = ({ title, image, link }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="w-full p-2 sm:p-3 md:p-4"
    >
      <a href={link} rel="noopener noreferrer" className="block h-full">
        <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-200/80 hover:border-blue-200">
          <div className="relative aspect-video w-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
            />
          </div>
          <CardContent className="p-3 md:p-4 flex-grow flex flex-col bg-white">
            <h3 className="text-sm sm:text-base md:text-lg font-medium text-center flex-grow flex items-center justify-center text-gray-800">
              {title}
            </h3>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
};

const SectionTitle = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex items-center w-full my-8 md:my-12"
    >
      <div className="flex-grow border-t border-gray-300/80"></div>
      <span className="px-4 text-lg md:text-xl font-semibold text-gray-700 whitespace-nowrap">
        {title}
      </span>
      <div className="flex-grow border-t border-gray-300/80"></div>
    </motion.div>
  );
};

const InfoCard = ({
  title,
  image,
  header,
  intro,
  info,
  infoHeader,
  infoList,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px 0px" }}
      transition={{ duration: 0.5 }}
      className="border border-blue-400/50 rounded-2xl p-5 md:p-6 shadow-sm bg-white/90 backdrop-blur-sm transition-all hover:shadow-md hover:border-blue-400"
    >
      <div className="relative aspect-video w-full max-w-md mx-auto rounded-lg mb-4 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
        />
      </div>
      <div className="text-lg font-bold text-blue-600 flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
        {header}
      </div>
      <div className="text-gray-700 text-sm md:text-base font-medium mt-4 space-y-3">
        <p>{intro}</p>
        <p>{info}</p>
        <div className="font-semibold text-blue-700">{infoHeader}</div>
        <ul className="list-disc list-inside text-gray-600 pl-4 space-y-1">
          {infoList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ProjectCards = () => {
  const { t } = useTranslation();

  const cardData = [
    {
      id: 1,
      title: t.companyOverview,
      image: "/images/PSE.jpg",
      link: "/companyoverview",
    },
    {
      id: 2,
      title: t.missionVision,
      image: "/images/Dart.jpeg",
      link: "/missionvision",
    },
    {
      id: 3,
      title: t.messageExec,
      image: "/images/Denmark.jpeg",
      link: "/messageexec",
    },
    {
      id: 4,
      title: t.organization,
      image: "/images/CompanyMeeting.jpeg",
      link: "/orgchart",
    },
    {
      id: 5,
      title: t.inspireWallet,
      image: "/images/inspirewallet.png",
      link: "/docs/InspireWallet.pdf",
    },
    {
      id: 6,
      title: t.financialProducts,
      image: "/images/financialproduct.png",
      link: "/docs/FinancialProduct.pdf",
    },
    {
      id: 7,
      title: t.privateBanking,
      image: "/images/private-banker.png",
      link: "/docs/PrivateBanker.pdf",
    },
    {
      id: 8,
      title: t.travelProtection,
      image: "/images/travel-protect.png",
      link: "/docs/travel.pdf",
    },
    {
      id: 9,
      title: t.InspireWalletPartnerBanks,
      image: "/images/inspirepartnerbanks.png",
      link: "/docs/Bank.pdf",
    },
    {
      id: 10,
      title: t.OpeningaPhilippineBankAccountfornonresidents,
      image: "/images/bankaccounts.png",
      link: "/docs/InspireWallet(JP).pdf",
    },
    {
      id: 11,
      title: t.BuyingRealEstatewithUSDT,
      image: "/images/realestateusdt.png",
      link: "/docs/CryptoPresentation.pdf",
    },
    {
      id: 12,
      title: t.MicroInvestments,
      image: "/images/microinvestments.png",
      link: "/docs/Micro-Investment1.pdf",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Business Lines Section */}
      <SectionTitle title={t.businessLines} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {cardData.slice(4).map((card) => (
          <AnimatedCard key={card.id} {...card} />
        ))}
      </div>

      {/* Division Info Section */}
      <SectionTitle title={t.divisionInfo} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-blue-50/70 to-gray-100/70 py-10 md:py-14 px-4 sm:px-6 md:px-10 rounded-3xl shadow-inner my-10 border border-gray-200/50"
      >
        {/* Centered Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl mx-auto text-center text-base md:text-lg font-medium text-gray-700 px-4 mb-10 md:mb-14 leading-relaxed"
        >
          {t.divisionInfoTextIntro}
        </motion.p>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          <InfoCard
            title="Consumer and Community Banking"
            image="/images/ccm1.png"
            header={t.divisionInfoText1Header}
            intro={t.divisionInfoText1Intro}
            info={t.divisionInfoText1Info}
            infoHeader={t.divisionInfoText1InfoHeader}
            infoList={[
              t.divisionInfoText1InfoList1,
              t.divisionInfoText1InfoList2,
              t.divisionInfoText1InfoList3,
              t.divisionInfoText1InfoList4,
            ]}
          />

          <InfoCard
            title="Corporate and Investment Banking"
            image="/images/cib1.png"
            header={t.divisionInfoText2Header}
            intro={t.divisionInfoText2Intro}
            info={t.divisionInfoText2Info}
            infoHeader={t.divisionInfoText2InfoHeader}
            infoList={[
              t.divisionInfoText2InfoList1,
              t.divisionInfoText2InfoList2,
              t.divisionInfoText2InfoList3,
              t.divisionInfoText2InfoList4,
            ]}
          />

          <InfoCard
            title="Community Banking"
            image="/images/cb1.png"
            header={t.divisionInfoText3Header}
            intro={t.divisionInfoText3Intro}
            info={t.divisionInfoText3Info}
            infoHeader={t.divisionInfoText3InfoHeader}
            infoList={[
              t.divisionInfoText3InfoList1,
              t.divisionInfoText3InfoList2,
              t.divisionInfoText3InfoList3,
              t.divisionInfoText3InfoList4,
            ]}
          />

          <InfoCard
            title="Asset and Wealth Management"
            image="/images/awm.png"
            header={t.divisionInfoText4Header}
            intro={t.divisionInfoText4Intro}
            info={t.divisionInfoText4Info}
            infoHeader={t.divisionInfoText4InfoHeader}
            infoList={[
              t.divisionInfoText4InfoList1,
              t.divisionInfoText4InfoList2,
              t.divisionInfoText4InfoList3,
              t.divisionInfoText4InfoList4,
            ]}
          />
        </div>
      </motion.div>

      {/* About Section */}
      <SectionTitle title={t.about} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cardData.slice(0, 4).map((card) => (
          <AnimatedCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCards;