"use client"; // Ensure it's a Client Component

import Link from "next/link";
import { Rocket, Home } from "lucide-react"; // 🛸 Use Rocket instead of Alien

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6 relative overflow-hidden">
      {/* 🚀 Moving Rocket (Lucide React Rocket Icon) */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 animate-move">
        <Rocket className="w-24 h-24 text-yellow-400 drop-shadow-lg" />
      </div>

      {/* 🔥 Glowing 404 Text */}
      <h1 className="text-9xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]">
        404
      </h1>

      {/* 🛸 Error Message */}
      <h2 className="text-3xl mt-4 font-semibold text-gray-300">
        Lost in Space?
      </h2>
      <p className="mt-2 text-gray-400 text-lg text-center max-w-md">
        Looks like this page got lost in the cosmos.
      </p>

      {/* 📦 Glassmorphism Box */}
      <div className="mt-6 bg-white bg-opacity-10 backdrop-blur-md px-8 py-4 rounded-lg shadow-lg border border-white border-opacity-20">
        <p className="text-gray-300">Let’s get you back to Earth!</p>

        {/* 🔙 Back Home Button */}
        <Link href="/">
          <button className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition-all">
            <Home className="w-5 h-5" /> Go Back Home
          </button>
        </Link>
      </div>

      {/* 🎬 Floating & Side-to-Side Animation - CSS */}
      <style jsx>{`
        @keyframes moveSideways {
          0% {
            transform: translateX(-30px);
          }
          50% {
            transform: translateX(30px);
          }
          100% {
            transform: translateX(-30px);
          }
        }

        .animate-move {
          animation: moveSideways 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
