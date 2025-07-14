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
      <div className="relative w-[300px] h-[150px] md:w-[400px] md:h-[200px] lg:w-[600px] lg:h-[300px]">
        <Image
          src="/images/InspireGroup.png"
          alt="Loading..."
          fill
          sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 600px"
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