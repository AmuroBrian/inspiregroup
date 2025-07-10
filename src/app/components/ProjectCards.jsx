"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "./ui/Card";
import { useTranslation } from "@/TranslationContext";
import Image from "next/image";

// Custom spring animation configuration
const springConfig = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 0.5,
  restDelta: 0.001
};

const ProjectCards = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = typeof window !== 'undefined' ? 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const cardData = [
    {
      id: 1,
      title: t.companyOverview,
      image: "/images/Alliance-Global3.jpg",
      link: "/companyoverview",
    },
    {
      id: 2,
      title: t.missionVision,
      image: "/images/MV.png",
      link: "/missionvision",
    },
    {
      id: 3,
      title: t.messageExec,
      image: "/images/MessageE.png",
      link: "/messageexec",
    },
    {
      id: 4,
      title: t.organization,
      image: "/images/Orgs.jpg",
      link: "/orgchart",
    },
    {
      id: 5,
      title: t.inspireWallet,
      image: "/images/InspireWalletNew.png",
      link: "/docs/InspireWalletFeatures.pdf",
    },
    {
      id: 6,
      title: t.financialProducts,
      image: "/images/FinancialPproduct.png",
      link: "/docs/FinancialProductsNew.pdf",
    },
    {
      id: 7,
      title: t.privateBanking,
      image: "/images/Privatebanking.png",
      link: "/docs/PrivateBankerNew.pdf",
    },
    {
      id: 8,
      title: t.travelProtection,
      image: "/images/Travelprotection.png",
      link: "/docs/TravelProtectionNew.pdf",
    },
    {
      id: 9,
      title: t.InspireWalletPartnerBanks,
      image: "/images/InspireWalletBankpartner.png",
      link: "/docs/Bank.pdf",
    },
    {
      id: 10,
      title: t.OpeningaPhilippineBankAccountfornonresidents,
      image: "/images/OpeningPHBank.png",
      link: "/docs/InspireWallet(JP).pdf",
    },
    {
      id: 11,
      title: t.BuyingRealEstatewithUSDT,
      image: "/images/Buyingrealestate.png",
      link: "/docs/CryptoPresentation.pdf",
    },
    {
      id: 12,
      title: t.MicroInvestments,
      image: "/images/Microinvestmentnew.png",
      link: "/docs/Micro-Investment1.pdf",
    },
  ];

  const SectionTitle = ({ title }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <motion.div 
      ref={ref}
      className="relative w-full my-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      >
        {/* Floating decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-xl"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-blue-200 opacity-15 blur-xl"></div>
        </div>

        <div className="inline-block relative">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            {title}
          </h2>
          {!prefersReducedMotion && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { 
                scaleX: 1,
                transition: {
                  ...springConfig,
                  delay: 0.3
                }
              } : {}}
              className="absolute -bottom-2 left-0 right-0 mx-auto h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              style={{ width: '70%' }}
            />
          )}
        </div>
      </motion.div>
    );
  };

  const AnimatedCard = ({ title, image, link, index }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
      rootMargin: "-50px 0px",
    });

    const [isLoading, setIsLoading] = useState(false);
    const direction = index % 2 === 0 ? -1 : 1; // Alternate direction
    const delay = index * 0.08;

    const handleClick = (e) => {
      e.preventDefault();
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = link;
      }, 1500);
    };

    return (
      <motion.div
        ref={ref}
        initial={prefersReducedMotion ? false : { 
          opacity: 0, 
          y: 40,
          x: direction * 100,
          rotate: direction * 5
        }}
        animate={prefersReducedMotion ? false : inView ? { 
          opacity: 1, 
          y: 0,
          x: 0,
          rotate: 0,
          transition: {
            ...springConfig,
            delay: delay,
            x: { ...springConfig, delay: delay * 0.7 },
            rotate: { ...springConfig, delay: delay * 0.9 }
          }
        } : {}}
        whileHover={prefersReducedMotion ? false : { 
          y: -5,
          x: direction * 2,
          transition: { ...springConfig, stiffness: 200 }
        }}
        whileTap={prefersReducedMotion ? false : { 
          scale: 0.97,
          transition: { ...springConfig, stiffness: 500 }
        }}
        className="w-full p-2 sm:p-3 md:p-4"
      >
        <a 
          href={link} 
          rel="noopener noreferrer" 
          aria-label={`View ${title}`}
          className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
          onClick={handleClick}
        >
          <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-200/80 hover:border-blue-200 relative group">
            <motion.div 
              className="absolute inset-0 bg-black/40 group-hover:bg-black/0 z-10"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            
            <motion.div className="relative h-48 w-full bg-white overflow-hidden">
          {/* Remove padding and use object-cover to fill container */}
          <Image
            src={image}
            alt={title || "Project image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,..."
          />
            </motion.div>
            
            <motion.h3 
              className="text-xl sm:text-lg md:text-xl lg:text-lg xl:text-lg font-bold text-white absolute top-6 left-6 z-20 [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)] group-hover:[text-shadow:_0_2px_12px_rgba(0,0,0,0.9)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: delay + 0.1 }}
            >
              {title}
            </motion.h3>
            
            <motion.div 
              className="absolute bottom-6 left-6 z-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: delay + 0.15 }}
            >
              <motion.button 
                className={`bg-blue-600 text-white font-medium py-1.5 px-3 md:py-2 md:px-4 border border-blue-600 rounded flex items-center gap-2 text-sm md:text-base hover:bg-blue-700 transition-colors ${isLoading ? 'cursor-not-allowed' : ''}`}
                whileHover={isLoading ? {} : { 
                  backgroundColor: "#1d4ed8",
                  transition: { ...springConfig, stiffness: 300 }
                }}
                whileTap={isLoading ? {} : { 
                  scale: 0.95,
                  transition: { ...springConfig, stiffness: 500 }
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    {t.loading || "Loading..."}
                  </div>
                ) : (
                  <>
                    {t.readMore || "Read More"}
                    <motion.span 
                      className="inline-block"
                      whileHover={{ x: 4 }}
                      transition={springConfig}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </Card>
        </a>
      </motion.div>
    );
  };

  const InfoCard = ({ title, image, header, intro, info, infoHeader, infoList }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    const direction = title.includes("Consumer") ? -1 : 1;

    return (
      <motion.div
        ref={ref}
        className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200/70 hover:border-blue-200 transition-all duration-300 h-full"
        initial={prefersReducedMotion ? false : { 
          opacity: 0, 
          y: 20,
          x: direction * 100,
          rotate: direction * 3
        }}
        animate={prefersReducedMotion ? false : inView ? { 
          opacity: 1, 
          y: 0,
          x: 0,
          rotate: 0,
          transition: {
            ...springConfig,
            delay: title.includes("Consumer") ? 0.1 : 0.2,
            x: { ...springConfig, delay: (title.includes("Consumer") ? 0.1 : 0.2) * 0.7 },
            rotate: { ...springConfig, delay: (title.includes("Consumer") ? 0.1 : 0.2) * 0.9 }
          }
        } : {}}
        whileHover={prefersReducedMotion ? false : { 
          y: -5,
          transition: { ...springConfig, stiffness: 200 }
        }}
        viewport={{ once: true }}
      >
        <motion.div className="relative h-48 w-full bg-white overflow-hidden flex items-center justify-center">
        {/* Optional subtle background */}
        <div className="absolute inset-0 bg-gray-50/30"></div>
        
        <Image
          src={image}
          alt={title || "Project image"}
          fill
          className="object-contain p-2" // Prevents edge bleeding
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,..."
        />
      </motion.div>
        
        <div className="p-6">
          <motion.h3 
            className="text-xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { 
              opacity: 1, 
              y: 0,
              transition: { ...springConfig, delay: 0.3 }
            } : {}}
          >
            {header}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { 
              opacity: 1, 
              y: 0,
              transition: { ...springConfig, delay: 0.35 }
            } : {}}
          >
            {intro}
          </motion.p>
          
          <div className="border-t border-gray-200 pt-4">
            <motion.h4 
              className="font-semibold text-gray-700 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { 
                opacity: 1, 
                y: 0,
                transition: { ...springConfig, delay: 0.4 }
              } : {}}
            >
              {infoHeader}
            </motion.h4>
            
            <motion.p 
              className="text-gray-600 mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { 
                opacity: 1, 
                y: 0,
                transition: { ...springConfig, delay: 0.45 }
              } : {}}
            >
              {info}
            </motion.p>
            
            <motion.ul 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={inView ? { 
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.5
                }
              } : {}}
            >
              {infoList.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { 
                    opacity: 1, 
                    x: 0,
                    transition: { ...springConfig }
                  } : {}}
                >
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-600">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="relative w-full overflow-hidden"
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={prefersReducedMotion ? false : { opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="absolute inset-0 opacity-5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ ...springConfig, delay: 0.4 }}
      >
        <svg className="h-full w-full" aria-hidden="true">
          <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </motion.div>
      {/* Main content container */}
      <motion.div 
          className="w-full max-w-[1200px] mx-auto relative z-10"
          initial={prefersReducedMotion ? false : { y: 30, opacity: 0 }}
          animate={prefersReducedMotion ? false : { y: 0, opacity: 1 }}
          transition={{ ...springConfig, delay: 0.2 }}
          viewport={{ once: true }}
      >
        <SectionTitle title={t.businessLines} />
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={prefersReducedMotion ? false : { 
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3
            }
          }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          {cardData.slice(4).map((card, index) => (
            <AnimatedCard key={card.id} {...card} index={index} />
          ))}
        </motion.div>

        <SectionTitle title={t.divisionInfo} />

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? false : { 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 50,
              damping: 15
                       }
          }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-50/70 to-gray-100/70 py-10 md:py-14 px-4 sm:px-6 md:px-10 rounded-3xl shadow-inner my-10 border border-gray-200/50 relative overflow-hidden"
          viewport={{ once: true }}
        >
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? false : { 
              opacity: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 50,
                damping: 15,
                delay: 0.1
              }
            }}
            viewport={{ once: true }}
            className="w-full max-w-4xl mx-auto text-center text-base md:text-lg font-medium text-gray-700 px-4 mb-10 md:mb-14 leading-relaxed"
          >
            {t.divisionInfoTextIntro}
          </motion.p>

          <motion.div 
            className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={prefersReducedMotion ? false : { 
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </motion.div>

        <SectionTitle title={t.aboutT} />
        <div id="about-section">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={prefersReducedMotion ? false : { 
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          {cardData.slice(0, 4).map((card, index) => (
            <AnimatedCard key={card.id} {...card} index={index} />
          ))}
        </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCards;