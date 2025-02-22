"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Wallet, ShieldCheck, TrendingUp } from "lucide-react";

const Advertisement = () => {
  const router = useRouter(); // Initialize useRouter inside the component
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShow(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownload = (fileName) => {
    const link = document.createElement("a");
    link.href = `/docs/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-100 p-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center w-full py-8">
        Business Services
      </h1>
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Inspire Wallet Section */}
        <div
          //className={`w-full md:w-1/2 flex flex-col justify-center items-center rounded-2xl text-white font-bold transition-all duration-1000 p-8 text-center min-h-[500px] md:min-h-[600px] lg:min-h-[700px] h-full flex-1 bg-gradient-to-l from-[#004ff9] to-[#000000] ${
          className={`w-full md:w-1/2 flex flex-col justify-center rounded-2xl items-center text-white font-bold transition-all duration-1000 p-8 text-center min-h-[500px] md:min-h-[600px] lg:min-h-[700px] h-full flex-1 bg-gradient-to-l from-[#09555C] to-[#004ff9] ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } transition-opacity ease-in-out`}
        >
          <Wallet size={48} className="mb-4" />
          <h2 className="text-2xl md:text-3xl font-extrabold mt-4">
            Inspire Wallet
          </h2>
          <p className="mt-2 max-w-sm text-white text-center text-sm md:text-base">
            Using just your smartphone, handle all your financial needs with
            ease.
          </p>
          <ul className="mt-4 max-w-sm text-white text-center text-sm md:text-base">
            <li>✅ 100% Secure</li>
            <li>✅ Easy to Use</li>
            <li>✅ Built-in User Support</li>
          </ul>
          <button
            className="mt-4 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 hover:scale-110 transition-transform duration-300 ease-in-out"
            onClick={() => window.open("/images/InspireWallet.jpg", "_blank")}
          >
            Click here to download on your device
          </button>
          <p className="mt-2 text-white text-center text-sm">
            Scan the QR Code and install
          </p>
        </div>

        {/* Investment Opportunity Section */}
        <div
          //className={`w-full md:w-1/2 flex flex-col justify-center rounded-2xl items-center text-white font-bold transition-all duration-1000 p-8 text-center min-h-[500px] md:min-h-[600px] lg:min-h-[700px] h-full flex-1 bg-gradient-to-l from-[#12063B] to-[#09555C] ${
          className={`w-full md:w-1/2 flex flex-col justify-center rounded-2xl items-center text-white font-bold transition-all duration-1000 p-8 text-center min-h-[500px] md:min-h-[600px] lg:min-h-[700px] h-full flex-1 bg-gradient-to-l from-[#12063B] to-[#09555C] ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } transition-opacity ease-in-out`}
        >
          <TrendingUp size={48} className="mb-4" />
          <h2 className="text-2xl md:text-3xl font-extrabold mt-4">
            Inspire Financial Products
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold mt-2">
            Why Invest with Us?
          </h3>
          <ul className="text-white mt-2 space-y-1 text-center text-sm md:text-base">
            <li>✅ High-Growth Industry</li>
            <li>✅ Secure & Transparent Investment</li>
            <li>✅ Potential for High Returns</li>
            <li>✅ Trusted & Experienced Team</li>
          </ul>
          <button
            className="mt-4 px-6 py-2 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-200 hover:scale-110 transition-transform duration-300 ease-in-out"
            onClick={() => router.push("/financialform")}
          >
            Click Here to Register
          </button>
          <p className="mt-2 text-white text-center text-sm">
            Your Investments are safe with us
          </p>
        </div>

        {/* Travel Protection Section */}
        <div
          //className={`w-full md:w-1/2 flex flex-col justify-center items-center rounded-2xl text-white font-bold transition-all duration-1000 p-8 text-center min-h-[500px] md:min-h-[600px] lg:min-h-[700px] h-full flex-1 bg-gradient-to-l from-[#004ff9] to-[#000000] ${
          className={`w-full md:w-1/2 flex flex-col justify-center rounded-2xl items-center text-white font-bold transition-all duration-1000 p-8 text-center min-h-[500px] md:min-h-[600px] lg:min-h-[700px] h-full flex-1 bg-gradient-to-l from-[#004ff9] to-[#000000] ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } transition-opacity ease-in-out`}
        >
          <ShieldCheck size={48} className="mb-4" />
          <h2 className="text-2xl md:text-3xl font-extrabold mt-4">
            Travel Protection
          </h2>
          <p className="mt-2 max-w-sm text-white text-center text-sm md:text-base">
            Coverage for trip cancellations, medical emergencies, and lost
            luggage.
          </p>
          <ul className="mt-4 max-w-sm text-white text-center text-sm md:text-base">
            <li>✅ Emergency Assistance</li>
            <li>✅ Travel-Related Support</li>
            <li>✅ Unforeseen Incident Coverage</li>
          </ul>
          <button
            className="mt-4 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 hover:scale-110 transition-transform duration-300 ease-in-out"
            onClick={() => router.push("/TravelProtectReg")}
          >
            Click Here to Register
          </button>
          <p className="mt-2 text-white text-center text-sm">
            Your travels are safer with us
          </p>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
