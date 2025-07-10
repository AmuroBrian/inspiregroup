"use client";

import React, { useState, useContext } from "react";
import { db, storage } from "../../../script/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TranslationContext } from "../../TranslationContext";

const TravelProtectionForm = () => {
  const { t } = useContext(TranslationContext);
  const [formData, setFormData] = useState({});
  const [passportImage, setPassportImage] = useState(null);
  const [govIdImage, setGovIdImage] = useState(null);
  const [submissionId, setSubmissionId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Field mapping with translation keys
  const fieldMapping = [
    { key: "lastName", label: t.lastName || "Last Name" },
    { key: "firstName", label: t.firstName || "First Name" },
    { key: "middleName", label: t.middleName || "Middle Name" },
    { key: "birthdate", label: t.birthdate || "Birthdate" },
    { key: "gender", label: t.gender || "Gender" },
    { key: "civilStatus", label: t.civilStatus || "Civil Status" },
    { key: "address", label: t.address || "Address" },
    { key: "personalMobileNumber", label: t.personalMobileNumber || "Personal Mobile Number" },
    { key: "landlineNumber", label: t.landlineNumber || "Landline Number" },
    { key: "emailAddress", label: t.emailAddress || "Email Address" },
    { key: "citizenship", label: t.citizenship || "Citizenship" },
    { key: "passportNumber", label: t.passportNumber || "Passport Number" },
    { key: "purposeOfVisit", label: t.purposeOfVisit || "Purpose of Visit" },
    { key: "stayInAddress", label: t.stayInAddress || "Stay In Address" },
    { key: "cashOnHand", label: t.cashOnHand || "Cash On Hand" },
    { key: "grossMonthlyIncome", label: t.grossMonthlyIncome || "Gross Monthly Income" },
    { key: "arrivalDateTime", label: t.arrivalDateTime || "Arrival Date / Time" },
    { key: "departureDateTime", label: t.departureDateTime || "Departure Date / Time" },
    { key: "stayInDuration", label: t.stayInDuration || "Stay In Duration (Days)" },
    { key: "airlineType", label: t.airlineType || "Airline Type" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    if (type === "passport") {
      setPassportImage(e.target.files[0]);
    } else if (type === "govId") {
      setGovIdImage(e.target.files[0]);
    }
  };

  const uploadFile = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newSubmissionId = "SMBTP-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setSubmissionId(newSubmissionId);

    try {
      let passportUrl = "";
      let govIdUrl = "";

      if (passportImage) {
        passportUrl = await uploadFile(passportImage, `gs://inspire-group-38fb3.firebasestorage.app/passport/${newSubmissionId}-passport.jpg`);
      }

      if (govIdImage) {
        govIdUrl = await uploadFile(govIdImage, `gs://inspire-group-38fb3.firebasestorage.app/govId/${newSubmissionId}-govId.jpg`);
      }

      await addDoc(collection(db, "travel_protection"), {
        type: "Travel Protection",
        ...formData,
        submissionId: newSubmissionId,
        passportUrl,
        govIdUrl,
        createdAt: new Date(),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-10 px-2 sm:px-6">
      <div className="w-full max-w-4xl bg-white/90 rounded-3xl shadow-2xl border border-blue-100 p-6 sm:p-10 relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-full p-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-green-800 mb-2 mt-8 tracking-tight">
          {t.travelProtectionForm || "Travel Protection Form"}
        </h2>
        <p className="text-center text-gray-500 mb-8">Please fill out the form below to apply for travel protection services. All fields are required.</p>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {fieldMapping.map((field, index) => (
            <div key={index} className="col-span-1">
              <label className="block font-semibold text-gray-700 mb-1">{field.label}</label>
              {field.key === "birthdate" ? (
                <input type="date" name={field.key} className="w-full p-2.5 border border-green-200 rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 transition" required onChange={handleChange} />
              ) : field.key.includes("DateTime") ? (
                <input type="datetime-local" name={field.key} className="w-full p-2.5 border border-green-200 rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 transition" required onChange={handleChange} />
              ) : field.key === "gender" ? (
                <select name={field.key} className="w-full p-2.5 border border-green-200 rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 transition" required onChange={handleChange}>
                  <option value="">{t.selectGender || "Select Gender"}</option>
                  <option value="Male">{t.male || "Male"}</option>
                  <option value="Female">{t.female || "Female"}</option>
                  <option value="Other">{t.other || "Other"}</option>
                </select>
              ) : field.key === "civilStatus" ? (
                <select name={field.key} className="w-full p-2.5 border border-green-200 rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 transition" required onChange={handleChange}>
                  <option value="">{t.selectCivilStatus || "Select Civil Status"}</option>
                  <option value="Single">{t.single || "Single"}</option>
                  <option value="Married">{t.married || "Married"}</option>
                  <option value="Divorced">{t.divorced || "Divorced"}</option>
                  <option value="Widowed">{t.widowed || "Widowed"}</option>
                </select>
              ) : field.key === "airlineType" ? (
                <select name={field.key} className="w-full p-2.5 border border-green-200 rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 transition" required onChange={handleChange}>
                  <option value="">{t.selectAirlineType || "Select Airline Type"}</option>
                  <option value="Cebu Pacific">{t.cebuPacific || "Cebu Pacific"}</option>
                  <option value="Philippine Airlines">{t.philippineAirlines || "Philippine Airlines"}</option>
                  <option value="AirAsia">{t.airAsia || "AirAsia"}</option>
                </select>
              ) : (
                <input type={field.key.includes("Number") || field.key.includes("Duration") || field.key.includes("Income") || field.key.includes("Cash") ? "number" : field.key.includes("Email") ? "email" : "text"} name={field.key} placeholder={field.label} className="w-full p-2.5 border border-green-200 rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 transition" required onChange={handleChange} />
              )}
            </div>
          ))}

          {/* Upload Passport */}
          <div className="col-span-1">
            <label className="block font-semibold text-gray-700 mb-1">{t.uploadPassport || "Upload Passport"}</label>
            <input type="file" accept="image/*" className="w-full p-2.5 border border-green-200 rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 transition" onChange={(e) => handleFileChange(e, "passport")} required />
          </div>

          {/* Upload Government ID */}
          <div className="col-span-1">
            <label className="block font-semibold text-gray-700 mb-1">{t.uploadGovernmentID || "Upload Government ID"}</label>
            <input type="file" accept="image/*" className="w-full p-2.5 border border-green-200 rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 transition" onChange={(e) => handleFileChange(e, "govId")} required />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-center mt-2">
            <button
              type="submit"
              className={`w-full md:w-1/2 py-3 rounded-xl font-bold text-lg shadow-md transition-all duration-300 ${submitted ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white"}`}
              disabled={submitted || loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  {t.uploading || "Uploading..."}
                </span>
              ) : submitted ? (t.submitted || "Submitted") : (t.submit || "Submit")}
            </button>
          </div>
        </form>

        {/* Submission Confirmation */}
        {submitted && (
          <div className="mt-8 flex flex-col items-center justify-center">
            <div className="bg-gradient-to-r from-green-100 to-green-200 border border-green-300 rounded-2xl shadow-lg px-8 py-6 text-center">
              <svg className="mx-auto mb-2 w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="font-semibold text-lg text-green-800 mb-1">{t.thankYouSubmission || "Thank you for your submission!"}</p>
              <p className="text-gray-700 mb-2">{t.applicationReceived || "Your application has been received. Please save your Submission ID for your records:"}</p>
              <div className="text-2xl font-bold text-green-700 tracking-wider mb-2">{submissionId}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelProtectionForm;
