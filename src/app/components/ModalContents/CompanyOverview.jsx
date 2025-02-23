"use client"; // Add this line to mark the component as a client component

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
    <div className="p-6 max-w-5xl mx-auto">
      <div className="w-full h-[80px]"></div>

      <h1 className="text-3xl font-bold text-center">Company Overview</h1>
      <hr className="my-4 border-gray-300" />

      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src="/images/PSE.jpg"
          alt="Company"
          className="w-80 h-80 object-cover rounded-lg shadow-lg"
        />

        {/* Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Inspire Holdings Incorporated</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Inspire Holdings is a financial, investing, and visionary management
            company with diverse interests spanning construction and
            development, healthcare and pharmaceuticals, gaming and
            entertainment, agricultural trading, and specialized services,
            serving both the private and public sectors.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            In adherence to the Wealthy Clique Model, it orchestrates a cohesive
            ecosystem, where the company operates as the central financial hub,
            capitalizing and harmonizing its subsidiaries and affiliates to
            drive innovation, efficiency, and collaboration.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            This forward-thinking entity is on a mission to make a direct and
            meaningful impact on the lives of individuals while also wielding
            its influence to create positive shifts in geopolitics.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Simultaneously, it remains dedicated to delivering substantial
            returns to its valued shareholders.
          </p>
        </div>
      </div>
    </div>
  );
};
