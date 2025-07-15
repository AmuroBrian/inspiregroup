"use client";

import React, { useState, useContext, useEffect } from "react";
import { db, authReadyPromise, auth } from "../../../script/InspireWalletFirebaseConfig"; // Removed 'storage' as no file uploads are defined in the form

import { collection, addDoc } from "firebase/firestore";
// Removed ref, uploadBytes, getDownloadURL as no file uploads are defined in the form
import { TranslationContext } from "../../TranslationContext";

export default function FinanceForm() {
    const { t } = useContext(TranslationContext);
    const [formData, setFormData] = useState({});
    const [submissionId, setSubmissionId] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authReadyPromise;
            setIsAuthReady(true);
            if (user) {
                setCurrentUserId(user.uid);
                console.log("FinanceForm: Firebase Authentication for Inspire Wallet is ready. User ID:", user.uid);
            } else {
                console.log("FinanceForm: Firebase Authentication for Inspire Wallet is ready, but no user is signed in.");
            }
        };
        checkAuth();
    }, []);

    // Field mapping for Finance Service Applications with added fields
    const fieldMapping = [
        { key: "userName", label: t.userName },
        { key: "userEmail", label: t.userEmail, type: "email" },
        { key: "mobileNumber", label: t.mobileNumber, type: "tel" },
        { key: "landlineNumber", label: t.landlineNumber, type: "tel", optional: true },
        { key: "birthdate", label: t.birthdate, type: "date" },
        { key: "gender", label: t.gender, type: "select", options: [t.male, t.female, t.other] },
        { key: "civilStatus", label: t.civilStatus, type: "select", options: [t.single, t.married, t.divorced, t.widowed] },
        { key: "citizenship", label: t.citizenship },
        { key: "address", label: t.address, type: "textarea" }, // Changed to textarea for address
        { key: "sourceOfFund", label: t.sourceOfFund, type: "text" },
        { key: "preferredBank", label: t.preferredBank, type: "text" },
        { key: "grossMonthlyIncome", label: t.grossMonthlyIncome, type: "text" },
        { key: "notes", label: t.notes, type: "textarea", optional: true },
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!currentUserId) {
            console.error("Authentication not ready or user not signed in. Cannot submit form.");
            setLoading(false);
            return;
        }

        const newSubmissionId = "SMBBK-" + Math.random().toString(36).substr(2, 9).toUpperCase();
        setSubmissionId(newSubmissionId);

        try {
            await addDoc(collection(db, "bankApplications"), {
                applicationType: "Bank Service",
                userId: currentUserId,
                status: "Pending",
                ...formData,
                submissionId: newSubmissionId,
                submittedAt: new Date(),
                processedAt: null, // Added processedAt with null value
                // approvedAt, approvedBy are typically set by admin, not by user form submission
            });

            setSubmitted(true);
        } catch (error) {
            console.error("Error adding document: ", error);
            console.error("There was an error submitting your form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen mt-20 flex items-center justify-center bg-white py-10 px-2 sm:px-6">
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
                            <label className="block font-semibold text-gray-700 mb-1">
                                {field.label}
                                {!field.optional && <span className="text-red-500">*</span>}
                            </label>
                            {field.type === "date" ? (
                                <input type="date" name={field.key} className="w-full p-2.5 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" required={!field.optional} onChange={handleChange} />
                            ) : field.type === "select" ? (
                                <select name={field.key} className="w-full p-2.5 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" required={!field.optional} onChange={handleChange}>
                                    <option value="">{t[`select${field.key.charAt(0).toUpperCase() + field.key.slice(1)}`] || field.label}</option>
                                    {field.options.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : field.type === "textarea" ? (
                                <textarea name={field.key} placeholder={field.label} rows="3" className="w-full p-2.5 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" required={!field.optional} onChange={handleChange}></textarea>
                            ) : (
                                <input type={field.type || "text"} name={field.key} placeholder={field.label} className="w-full p-2.5 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" required={!field.optional} onChange={handleChange} />
                            )}
                        </div>
                    ))}
                    <div className="col-span-1 md:col-span-2 flex flex-col items-center mt-2">
                        <button
                            type="submit"
                            className={`w-full md:w-1/2 py-3 rounded-xl font-bold text-lg shadow-md transition-all duration-300
                                ${submitted || loading || !isAuthReady ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"}`}
                            disabled={submitted || loading || !isAuthReady}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                    {t.submitting}
                                </span>
                            ) : submitted ? (t.submitted) : (isAuthReady ? (t.submit) : "Loading Authentication...")}
                        </button>
                    </div>
                </form>
                {submitted && (
                    <div className="mt-8 flex flex-col items-center justify-center">
                        <div className="bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300 rounded-2xl shadow-lg px-8 py-6 text-center">
                            <svg className="mx-auto mb-2 w-10 h-10 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <p className="font-semibold text-lg text-blue-800 mb-1">{t.thankYouSubmission}</p>
                            <p className="text-gray-700 mb-2">{t.applicationReceived}</p>
                            <div className="text-2xl font-bold text-blue-700 tracking-wider mb-2">{submissionId}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}