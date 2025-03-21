"use client";
import { useTranslation } from "@/TranslationContext"; 
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Wallet, TrendingUp, ShieldCheck } from "lucide-react";
import TranslatedButton from "./TranslatedButton";

const CompanyInfo = () => {
  const { language, setLanguage, t } = useTranslation(); // Get translation context
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="p-8 w-full min-h-screen bg-gray-100">
      
      <h1 className="text-3xl font-bold text-center">{t.title}</h1>
      <div className="flex flex-col md:flex-row gap-8 mt-8 items-center justify-center">
        {[{ icon: Wallet, title: t.inspireWallet, desc: t.inspireDesc }, 
          { icon: TrendingUp, title: t.financialProducts, desc: t.financialDesc }, 
          { icon: ShieldCheck, title: t.travelProtection, desc: t.travelDesc }].map((item, index) => (
          <div
            key={index}
            className={`w-full md:w-1/3 flex flex-col items-center text-white font-bold p-8 text-center rounded-2xl bg-gradient-to-l from-[#09555C] to-[#004ff9] ${
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } transition-opacity ease-in-out`}
          >
            <item.icon size={48} className="mb-4" />
            <h2 className="text-2xl md:text-3xl font-extrabold mt-4">{item.title}</h2>
            <p className="mt-2 max-w-sm text-white text-center text-sm md:text-base">{item.desc}</p>
            <ul className="mt-4 max-w-sm text-white text-center text-sm md:text-base">
              <li>✅ {t.secure}</li>
              <li>✅ {t.easy}</li>
              <li>✅ {t.support}</li>
            </ul>
            <TranslatedButton label={t.download} onClick={() => router.push("/download")} />
            <p className="mt-2 text-white text-center text-sm">{t.scanQR}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyInfo;
