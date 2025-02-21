'use client'; // Add this line to mark the component as a client component

import React, { useState, useEffect } from "react";

export const CompanyOverview = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component only renders after the client has mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If the component is not mounted yet, return null to prevent SSR mismatches
  if (!isMounted) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto rounded-lg shadow-lg">
      <div className="w-full h-14"></div>
      {/* Title */}
      <h1 className="text-3xl font-bold text-center">{/*Company Overview*/}会社概要</h1>
      <hr className="my-4 border-gray-300" />

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <img
          src="/images/PSEBuilding.jpg" // Ensure the path is correct
          alt="Company"
          className="w-80 h-80 object-cover rounded-lg shadow-lg"
        />

        {/* Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{/*Inspire Holdings Incorporated*/}インスパイア・ホールディングス株式会社</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {/*Inspire Holdings is a financial, investing, and visionary management
            company with diverse interests spanning construction and
            development, healthcare and pharmaceuticals, gaming and
            entertainment, agricultural trading, and specialized services,
            serving both the private and public sectors.*/}
            インスパイア・ホールディングスは、金融、投資、
            ビジョナリー・マネジメントを行う企業であり、建設・開発、医療・製薬、ゲーム・エンターテインメント、
            農業貿易、特殊サービスなど、多岐にわたる分野で事業を展開し、民間および公共部門にサービスを提供しています。
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            {/*In adherence to the Wealthy Clique Model, it orchestrates a cohesive
            ecosystem, where the company operates as the central financial hub,
            capitalizing and harmonizing its subsidiaries and affiliates to
            drive innovation, efficiency, and collaboration.*/ }
            ウェルシー・クリーク・モデルに従い、同社は中央の金融ハブとして機能し、
            子会社や関連会社を資本面で支えながら、イノベーション、効率性、協力を促進する統合的なエコシステムを構築しています。
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            {/*This forward-thinking entity is on a mission to make a direct and
            meaningful impact on the lives of individuals while also wielding
            its influence to create positive shifts in geopolitics.*/}
            この先見的な企業は、個人の生活に直接的かつ意味のある影響を与えることを使命とし、
            同時にその影響力を活かして地政学的な前向きな変化を生み出すことを目指しています。
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            {/*Simultaneously, it remains dedicated to delivering substantial
            returns to its valued shareholders.*/}
            同時に、価値ある株主の皆様に対して、着実なリターンを提供し続けることに尽力しています。
          </p>
        </div>
      </div>
    </div>
  );
};
