import React from 'react'

export const CompanyOverview = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Our Services</h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="border-2 border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center">
          <img src="images/service1.jpg" alt="Service 1" className="w-full h-60 object-cover rounded-lg" />
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Learn More
          </button>
        </div>

        {/* Card 2 */}
        <div className="border-2 border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center">
          <img src="images/service2.jpg" alt="Service 2" className="w-full h-60 object-cover rounded-lg" />
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Learn More
          </button>
        </div>

        {/* Card 3 */}
        <div className="border-2 border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center">
          <img src="images/service3.jpg" alt="Service 3" className="w-full h-60 object-cover rounded-lg" />
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Learn More
          </button>
        </div>

        {/* Card 4 */}
        <div className="border-2 border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center">
          <img src="images/service4.jpg" alt="Service 4" className="w-full h-60 object-cover rounded-lg" />
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Learn More
          </button>
        </div>
      </div>
    </div>

  );
};
