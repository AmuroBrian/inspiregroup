"use client";
import { useTranslation } from "@/TranslationContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Wallet, TrendingUp, ShieldCheck } from "lucide-react";
import TranslatedButton from "./TranslatedButton";
import { motion, AnimatePresence } from "framer-motion";

const CompanyInfo = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const element = document.querySelector("#company-info");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const features = [
    {
      icon: Wallet,
      title: t.inspireWallet,
      desc: t.inspireDesc,
      link: "/images/InspireWallet.jpg",
    },
    {
      icon: TrendingUp,
      title: t.financialProducts,
      desc: t.financialDesc,
      link: "/financialform",
    },
    {
      icon: ShieldCheck,
      title: t.travelProtection,
      desc: t.travelDesc,
      link: "/TravelProtectReg",
    },
  ];

  return (
    <section 
      id="company-info"
      className="w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Floating decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-xl"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-blue-200 opacity-15 blur-xl"></div>
        </div>

        {/* Title with working modern underline */}
        <motion.div 
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block relative">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
              {t.title}
            </h1>
            {!prefersReducedMotion && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isVisible ? { 
                  scaleX: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.3
                  }
                } : {}}
                className="absolute -bottom-1 left-0 right-0 mx-auto h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                style={{ width: '70%' }}
              />
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut",
                  delay: index * 0.1 
                }}
                className="flex flex-col h-full"
              >
                <div className="flex flex-col items-center text-center p-8 rounded-2xl h-full bg-gradient-to-br from-[#09555C] to-[#004ff9] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="p-4 mb-4 rounded-full bg-white/20">
                    <item.icon size={40} className="text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-extrabold text-white mt-4">
                    {item.title}
                  </h2>
                  
                  <p className="mt-4 text-white/90 text-sm md:text-base">
                    {item.desc}
                  </p>
                  
                  <ul className="mt-6 space-y-2 text-sm text-white/90">
                    <li className="flex items-center justify-center gap-2">
                      <span className="text-green-300">✓</span> {t.secure}
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <span className="text-green-300">✓</span> {t.easy}
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <span className="text-green-300">✓</span> {t.support}
                    </li>
                  </ul>
                  
                  <div className="mt-8 w-full">
                    <TranslatedButton
                      label={t.download}
                      onClick={() => router.push(item.link)}
                      className="w-full bg-white text-[#09555C] hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors"
                    />
                  </div>
                  
                  <p className="mt-4 text-white/70 text-xs">
                    {t.scanQR}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;