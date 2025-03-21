"use client";

import React from "react";
import { useTranslation } from "@/TranslationContext";

export const CompanyOrgChart = () => {
  const { t } = useTranslation(); // Use translation context
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="w-full h-[80px]"></div>
      <h1 className="text-3xl font-bold text-left">
       {t.org}
      </h1>
      <hr className="my-4 border-gray-300" />

      <div className="flex flex-col items-start gap-6">
        <div className="flex-1">
          <img
            src="images/OrgChart.jpg"
            alt="Organization Image"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Department List */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-left">
            {t.orgone}
          </h2>

          <br />
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> {t.orgtwo}
             
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> {t.orgtwo}
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> {t. orgthree}
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> {t.orgfive}
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span>{" "}
              {t.orgsix}
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> {t.orgseven}
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> {t.orgeight}
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> {t.orgnine}
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> {t.orgten}
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> {t.orgeleven}
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span>{" "}
              {t.orgtwelve}
            </li>
          </ul>
          <br />
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            {t.orgthird}
          </p>
        </div>

        {/* Image Section */}
      </div>
    </div>
  );
};
