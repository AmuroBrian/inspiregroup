"use client";

import React, { useState, useContext } from "react";
import { app, db, storage } from "../../../script/firebaseConfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TranslationContext } from "../../TranslationContext";

export default function FinanceForm() {
    const { t } = useContext(TranslationContext);
    const [formData, setFormData] = useState({});
    const [submissionId, setSubmissionId] = useState("");
    const [passportImage, setPassportImage] = useState(null);
    const [govIdImage, setGovIdImage] = useState(null);
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
        { key: "sourceOfFund", label: t.sourceOfFund || "Source of Fund" },
        { key: "grossMonthlyIncome", label: t.grossMonthlyIncome || "Gross Monthly Income" }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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
        const newSubmissionId = "SMBFS-" + Math.random().toString(36).substr(2, 9).toUpperCase();
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

            await addDoc(collection(db, "financeForms"), {
                type: "Financial Service",
                ...formData,
                submissionId: newSubmissionId,
                passportUrl,
                govIdUrl,
                submittedAt: new Date(),
            });

            setSubmitted(true);
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("There is something wrong with the Server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen mt-20 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-10 px-2 sm:px-6">
            <div className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl border border-blue-100 p-6 sm:p-10 relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-full p-4 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 2c-2.67 0-8 1.337-8 4v2a1 1 0 001 1h14a1 1 0 001-1v-2c0-2.663-5.33-4-8-4z" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-800 mb-2 mt-8 tracking-tight">
                    {t.financialServiceApplication || "Financial Service Application"}
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    {t.financialFormDescription || "Please fill out the form below to apply for our financial services. All fields are required."}
                </p>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    {fieldMapping.map((field, index) => (
                        <div key={index} className="col-span-1">
                            <label className="block font-semibold text-gray-700 mb-1">{field.label}</label>
                            {field.key === "birthdate" ? (
                                <input type="date" name={field.key} className="w-full p-2.5 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" required onChange={handleChange} />
                            ) : field.key === "gender" ? (
                                <select name={field.key} className="w-full p-2.5 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" required onChange={handleChange}>
                                    <option value="">{t.selectGender || "Select Gender"}</option>
                                    <option value="Male">{t.male || "Male"}</option>
                                    <option value="Female">{t.female || "Female"}</option>
                                    <option value="Other">{t.other || "Other"}</option>
                                </select>
                            ) : field.key === "civilStatus" ? (
                                <select name={field.key} className="w-full p-2.5 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" required onChange={handleChange}>
                                    <option value="">{t.selectCivilStatus || "Select Civil Status"}</option>
                                    <option value="Single">{t.single || "Single"}</option>
                                    <option value="Married">{t.married || "Married"}</option>
                                    <option value="Divorced">{t.divorced || "Divorced"}</option>
                                    <option value="Widowed">{t.widowed || "Widowed"}</option>
                                </select>
                            ) : (
                                <input type={field.key.includes("Number") ? "number" : field.key.includes("Email") ? "email" : "text"} name={field.key} placeholder={field.label} className="w-full p-2.5 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" required onChange={handleChange} />
                            )}
                        </div>
                    ))}
                    {/* Upload Passport */}
                    <div className="col-span-1">
                        <label className="block font-semibold text-gray-700 mb-1">{t.uploadPassport || "Upload Passport"}</label>
                        <input type="file" accept="image/*" className="w-full p-2.5 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" onChange={(e) => handleFileChange(e, "passport")} required />
                    </div>
                    {/* Upload Government ID */}
                    <div className="col-span-1">
                        <label className="block font-semibold text-gray-700 mb-1">{t.uploadGovernmentID || "Upload Government ID"}</label>
                        <input type="file" accept="image/*" className="w-full p-2.5 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" onChange={(e) => handleFileChange(e, "govId")} required />
                    </div>
                    <div className="col-span-1 md:col-span-2 flex flex-col items-center mt-2">
                        <button
                            type="submit"
                            className={`w-full md:w-1/2 py-3 rounded-xl font-bold text-lg shadow-md transition-all duration-300 ${submitted ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"}`}
                            disabled={submitted || loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                    {t.submitting || "Submitting..."}
                                </span>
                            ) : submitted ? (t.submitted || "Submitted") : (t.submit || "Submit")}
                        </button>
                    </div>
                </form>
                {submitted && (
                    <div className="mt-8 flex flex-col items-center justify-center">
                        <div className="bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300 rounded-2xl shadow-lg px-8 py-6 text-center">
                            <svg className="mx-auto mb-2 w-10 h-10 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <p className="font-semibold text-lg text-blue-800 mb-1">{t.thankYouSubmission || "Thank you for your submission!"}</p>
                            <p className="text-gray-700 mb-2">{t.applicationReceived || "Your application has been received. Please save your Submission ID for your records:"}</p>
                            <div className="text-2xl font-bold text-blue-700 tracking-wider mb-2">{submissionId}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
