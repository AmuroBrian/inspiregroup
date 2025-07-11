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
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="relative w-full h-full max-w-[200px] max-h-[100px] sm:max-w-[400px] sm:max-h-[200px] md:max-w-[600px] md:max-h-[300px] lg:max-w-[800px] lg:max-h-[400px] mx-auto">
          <Image
            src="/images/inspiregroup.png"
            alt="Loading..."
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 800px"
            className="object-contain"
            priority
            quality={100}
          />
          {/* Shine element */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent shine-animation"
            />
          </div>
        </div>
      </div>
    </div>
  );
}