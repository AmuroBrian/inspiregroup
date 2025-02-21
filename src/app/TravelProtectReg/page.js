"use client"; 

import React, { useState } from "react";

const TravelProtectionForm = () => {
  const [transactionId, setTransactionId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate transaction ID upon submission
    const newTransactionId = "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setTransactionId(newTransactionId);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Travel Protection Form</h2>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {/* Type (Disabled Dropdown) */}
        <div className="col-span-2">
          <label className="block font-semibold">Type</label>
          <select className="w-full p-2 border rounded mb-3 bg-white" disabled>
            <option>Travel Protection</option>
          </select>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-3 gap-4 col-span-2">
          {["Last Name", "First Name", "Middle Name"].map((field, index) => (
            <div key={index}>
              <label className="block font-semibold">{field}</label>
              <input type="text" placeholder={field} className="w-full p-2 border rounded bg-white" required />
            </div>
          ))}
        </div>

        {/* Birthdate, Gender, Civil Status */}
        <div className="grid grid-cols-3 gap-4 col-span-2">
          <div>
            <label className="block font-semibold">Birthdate</label>
            <input type="date" className="w-full p-2 border rounded bg-white" required />
          </div>
          <div>
            <label className="block font-semibold">Gender</label>
            <select className="w-full p-2 border rounded bg-white" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Civil Status</label>
            <select className="w-full p-2 border rounded bg-white" required>
              <option value="">Select Civil Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
        </div>

        {/* Address, Mobile Number, Landline, Email */}
        <div className="col-span-2">
          <label className="block font-semibold">Address</label>
          <input type="text" placeholder="Address" className="w-full p-2 border rounded bg-white" required />
        </div>
        <div className="grid grid-cols-3 gap-4 col-span-2">
          {["Personal Mobile Number", "Landline Number", "Email Address"].map((field, index) => (
            <div key={index}>
              <label className="block font-semibold">{field}</label>
              <input type={field.includes("Number") ? "number" : "email"} placeholder={field} className="w-full p-2 border rounded bg-white" required />
            </div>
          ))}
        </div>

        {/* Citizenship, Passport, Purpose, Stay Address, Cash On Hand, Income */}
        <div className="grid grid-cols-3 gap-4 col-span-2">
          {["Citizenship", "Passport Number", "Purpose of Visit", "Stay In Address", "Cash On Hand", "Gross Monthly Income"].map((field, index) => (
            <div key={index}>
              <label className="block font-semibold">{field}</label>
              <input type="text" placeholder={field} className="w-full p-2 border rounded bg-white" required />
            </div>
          ))}
        </div>

        {/* Arrival, Departure, Stay Duration, Airline Type */}
        <div className="grid grid-cols-4 gap-4 col-span-2">
          <div>
            <label className="block font-semibold">Arrival Date / Time</label>
            <input type="datetime-local" className="w-full p-2 border rounded bg-white" required />
          </div>
          <div>
            <label className="block font-semibold">Departure Date / Time</label>
            <input type="datetime-local" className="w-full p-2 border rounded bg-white" required />
          </div>
          <div>
            <label className="block font-semibold">Stay In Duration (Days)</label>
            <input type="text" placeholder="Stay Duration" className="w-full p-2 border rounded bg-white" required />
          </div>
          <div>
            <label className="block font-semibold">Airline Type</label>
            <select className="w-full p-2 border rounded bg-white" required>
              <option value="">Select Airline</option>
              <option value="Cebu Pacific">Cebu Pacific</option>
              <option value="Philippine Airlines">Philippine Airlines</option>
              <option value="AirAsia">AirAsia</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>

      {/* Show Transaction ID after submission */}
      {submitted && (
        <div className="mt-6 p-4 bg-gray-200 rounded-lg text-center">
          <p className="font-semibold text-lg">Transaction ID:</p>
          <p className="text-xl font-bold text-blue-600">{transactionId}</p>
        </div>
      )}
    </div>
  );
};

export default TravelProtectionForm;
