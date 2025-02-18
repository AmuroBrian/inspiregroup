import React from "react";

export const CompanyOrgChart = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-left">
        Inspire Holdings Inc. Organization
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
            Introduction of Each Department
          </h2>

          <br />
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> OFFICE OF
              THE PRESIDENT
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> EXECUTIVE
              VICE PRESIDENT
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> SECRETARIAL
              DEPARTMENT
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> ACCOUNTANT
              AUDIT DEPARTMENT
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span>{" "}
              ADMINISTRATIVE DEPARTMENT
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> HUMAN
              RESOURCE DEPARTMENT
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> IT SOLUTION
              DEPARTMENT
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> MARKETING
              DEPARTMENT
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> OUTSOURCING
              MANAGEMENT DEPARTMENT
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span> SECURITY
              DEPARTMENT
            </li>
            <li className="flex items-center text-lg">
              <span className="text-yellow-500 mr-2">&#9733;</span>{" "}
              INVESTIGATION DEPARTMENT
            </li>
          </ul>
          <br />
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            This structure is designed to enhance efficiency and communication
            within the organization. A clear hierarchy ensures that
            responsibilities and reporting lines are well-defined, reducing
            confusion and potential conflicts. The distinct roles also
            facilitate effective task management and execution, contributing to
            the company's overall operational efficiency.
          </p>
        </div>

        {/* Image Section */}
      </div>
    </div>
  );
};
