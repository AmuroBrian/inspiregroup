"use client";

import React, { useState } from "react";
import { db, storage } from "../../../script/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const TravelProtectionForm = () => {
  const [formData, setFormData] = useState({});
  const [passportImage, setPassportImage] = useState(null);
  const [govIdImage, setGovIdImage] = useState(null);
  const [submissionId, setSubmissionId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

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
    setLoading(true); // Start loading

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
      setLoading(false); // Stop loading after submission
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="w-full h-[80px]"></div>
      <h2 className="text-xl font-bold mb-4 w-full text-center">Travel Protection Form</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {/* Input Fields */}
        {["Last Name", "First Name", "Middle Name", "Birthdate", "Gender", "Civil Status", "Address", "Personal Mobile Number", "Landline Number", "Email Address", "Citizenship", "Passport Number", "Purpose of Visit", "Stay In Address", "Cash On Hand", "Gross Monthly Income", "Arrival Date / Time", "Departure Date / Time", "Stay In Duration (Days)", "Airline Type"].map((field, index) => (
          <div key={index} className="col-span-1">
            <label className="block font-semibold">{field}</label>
            {field === "Birthdate" ? (
              <input type="date" name={field} className="w-full p-2 border rounded bg-white" required onChange={handleChange} />
            ) : field.includes("Date") ? (
              <input type="datetime-local" name={field} className="w-full p-2 border rounded bg-white" required onChange={handleChange} />
            ) : field === "Gender" || field === "Civil Status" || field === "Airline Type" ? (
              <select name={field} className="w-full p-2 border rounded bg-white" required onChange={handleChange}>
                <option value="">Select {field}</option>
                {field === "Gender" && ["Male", "Female", "Other"].map(option => <option key={option} value={option}>{option}</option>)}
                {field === "Civil Status" && ["Single", "Married", "Divorced", "Widowed"].map(option => <option key={option} value={option}>{option}</option>)}
                {field === "Airline Type" && ["Cebu Pacific", "Philippine Airlines", "AirAsia"].map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            ) : (
              <input type={field.includes("Number") ? "number" : "text"} name={field} placeholder={field} className="w-full p-2 border rounded bg-white" required onChange={handleChange} />
            )}
          </div>
        ))}

        {/* Upload Passport */}
        <div className="col-span-1">
          <label className="block font-semibold">Upload Passport</label>
          <input type="file" accept="image/*" className="w-full p-2 border rounded bg-white" onChange={(e) => handleFileChange(e, "passport")} required />
        </div>

        {/* Upload Government ID */}
        <div className="col-span-1">
          <label className="block font-semibold">Upload Government ID</label>
          <input type="file" accept="image/*" className="w-full p-2 border rounded bg-white" onChange={(e) => handleFileChange(e, "govId")} required />
        </div>

        {/* Submit Button with Loading Effect */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className={`w-full p-2 text-white rounded ${submitted ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={submitted || loading}
          >
            {loading ? "Uploading..." : submitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </form>

      {/* Submission Confirmation */}
      {submitted && (
        <div className="mt-6 p-4 bg-gray-200 rounded-lg text-center">
          <p className="font-semibold text-lg">Submission ID:</p>
          <p className="text-xl font-bold text-blue-600">{submissionId}</p>
        </div>
      )}
    </div>
  );
};

export default TravelProtectionForm;
