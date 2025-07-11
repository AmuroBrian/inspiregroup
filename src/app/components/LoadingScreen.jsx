"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <div className="relative w-[200px] h-[100px] sm:w-[400px] sm:h-[200px] md:w-[600px] md:h-[300px] lg:w-[800px] lg:h-[400px]">
        <Image
          src="/images/InspireGroup.png"
          alt="Loading..."
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 800px"
          className="object-contain"
          priority
          quality={100}
        />
        {/* Shine element */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent shine-animation" />
        </div>
      </div>
    </div>
  );
}