"use client";

import React, { useState, useContext, useEffect } from "react";
// Corrected import: All Firebase services (db, storage, authReadyPromise, auth) are now imported
// from InspireWalletFirebaseConfig.js
import { db, storage, authReadyPromise, auth } from "../../../script/InspireWalletFirebaseConfig";

import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TranslationContext } from "../../TranslationContext";

export default function TravelApplicationForm() {
    const { t } = useContext(TranslationContext);
    const [formData, setFormData] = useState({});
    const [submissionId, setSubmissionId] = useState("");
    const [passportImage, setPassportImage] = useState(null);
    const [govIdImage, setGovIdImage] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAuthReady, setIsAuthReady] = useState(false); // State for auth readiness
    const [currentUserId, setCurrentUserId] = useState(null); // State to store the authenticated user's ID

    // Effect to wait for Firebase authentication to be ready
    useEffect(() => {
        const checkAuth = async () => {
            const user = await authReadyPromise; // Wait for the promise from InspireWalletFirebaseConfig to resolve
            setIsAuthReady(true); // Set auth as ready
            if (user) {
                setCurrentUserId(user.uid); // Store the user ID if authenticated
                console.log("TravelApplicationForm: Firebase Authentication for Inspire Wallet is ready. User ID:", user.uid);
            } else {
                console.log("TravelApplicationForm: Firebase Authentication for Inspire Wallet is ready, but no user is signed in.");
            }
        };
        checkAuth();
    }, []); // Run only once on component mount

    // Field mapping with translation keys for Travel Applications
    const fieldMapping = [
        { key: "userName", label: t.userName || "Full Name" },
        { key: "userEmail", label: t.userEmail || "Email Address", type: "email" },
        { key: "mobileNumber", label: t.mobileNumber || "Mobile Number", type: "tel" },
        { key: "landlineNumber", label: t.landlineNumber || "Landline Number", type: "tel" },
        { key: "birthdate", label: t.birthdate || "Birthdate", type: "date" },
        { key: "gender", label: t.gender || "Gender", type: "select", options: ["Male", "Female", "Other"] },
        { key: "civilStatus", label: t.civilStatus || "Civil Status", type: "select", options: ["Single", "Married", "Divorced", "Widowed"] },
        { key: "citizenship", label: t.citizenship || "Citizenship" },
        { key: "passportNumber", label: t.passportNumber || "Passport Number" },
        { key: "homeAddress", label: t.homeAddress || "Home Address" },
        { key: "destinationAddress", label: t.destinationAddress || "Destination Address" },
        { key: "purposeOfTravel", label: t.purposeOfTravel || "Purpose of Travel" },
        { key: "airline", label: t.airline || "Airline" },
        { key: "checkInDate", label: t.checkInDate || "Check-in Date", type: "date" },
        { key: "departureTime", label: t.departureTime || "Departure Time", type: "time" },
        { key: "arrivalTime", label: t.arrivalTime || "Arrival Time", type: "time" },
        { key: "stayDuration", label: t.stayDuration || "Stay Duration (days)", type: "number" },
        { key: "sourceOfFund", label: t.sourceOfFund || "Source of Fund" },
        { key: "grossMonthlyIncome", label: t.grossMonthlyIncome || "Gross Monthly Income", type: "number" },
        { key: "cashOnHand", label: t.cashOnHand || "Cash on Hand", type: "number" },
        { key: "userTimeDepositAmount", label: t.userTimeDepositAmount || "Time Deposit Amount", type: "number" },
        { key: "preferredBank", label: t.preferredBank || "Preferred Bank" },
        { key: "isDiscountedRate", label: t.isDiscountedRate || "Apply for Discounted Rate?", type: "checkbox" },
        { key: "notes", label: t.notes || "Additional Notes", type: "textarea" },
        { key: "protectionFee", label: t.protectionFee || "Protection Fee", type: "number" }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e, type) => {
        if (type === "passport") {
            setPassportImage(e.target.files[0]);
        } else if (type === "govId") {
            setGovIdImage(e.target.files[0]);
        }
    };

    const uploadFile = async (file, path) => {
        // 'storage' now refers directly to the storage from InspireWalletFirebaseConfig.js
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!currentUserId) {
            console.error("Authentication not ready or user not signed in. Cannot submit form.");
            setLoading(false);
            // Consider showing a user-friendly message in the UI
            return;
        }

        const newSubmissionId = "SMBTR-" + Math.random().toString(36).substr(2, 9).toUpperCase(); // Changed prefix for Travel
        setSubmissionId(newSubmissionId);

        try {
            let passportPhotoUrl = "";
            let governmentIdUrl = "";

            if (passportImage) {
                // Path for passport image within the 'inspire-wallet' storage bucket
                passportPhotoUrl = await uploadFile(passportImage, `travel_ids/${currentUserId}/${newSubmissionId}-passport.jpg`);
            }

            if (govIdImage) {
                // Path for government ID image within the 'inspire-wallet' storage bucket
                governmentIdUrl = await uploadFile(govIdImage, `travel_ids/${currentUserId}/${newSubmissionId}-govId.jpg`);
            }

            // 'db' now refers to the Firestore from InspireWalletFirebaseConfig.js
            await addDoc(collection(db, "travelApplications"), {
                applicationType: "Travel Service",
                userId: currentUserId,
                status: "Pending",
                ...formData,
                submissionId: newSubmissionId,
                passportPhotoUrl,
                governmentIdUrl,
                submittedAt: new Date(),
                // approvedAt, approvedBy, processedAt are typically set by admin, not by user form submission
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
                        {/* Travel Icon (e.g., plane, globe) */}
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-800 mb-2 mt-8 tracking-tight">
                    {t.travelServiceApplication || "Travel Service Application"}
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    {t.travelFormDescription || "Please fill out the form below to apply for our travel services. All fields are required."}
                </p>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    {fieldMapping.map((field, index) => (
                        <div key={index} className="col-span-1">
                            <label className="block font-semibold text-gray-700 mb-1">{field.label}</label>
                            {field.type === "date" ? (
                                <input type="date" name={field.key} className="w-full p-2.5 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" required={!field.optional} onChange={handleChange} />
                            ) : field.type === "time" ? (
                                <input type="time" name={field.key} className="w-full p-2.5 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" required={!field.optional} onChange={handleChange} />
                            ) : field.type === "select" ? (
                                <select name={field.key} className="w-full p-2.5 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" required={!field.optional} onChange={handleChange}>
                                    <option value="">{`Select ${field.label}`}</option>
                                    {field.options.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : field.type === "checkbox" ? (
                                <input type="checkbox" name={field.key} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" onChange={handleChange} />
                            ) : field.type === "textarea" ? (
                                <textarea name={field.key} placeholder={field.label} rows="3" className="w-full p-2.5 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" required={!field.optional} onChange={handleChange}></textarea>
                            ) : (
                                <input type={field.type || "text"} name={field.key} placeholder={field.label} className="w-full p-2.5 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" required={!field.optional} onChange={handleChange} />
                            )}
                        </div>
                    ))}
                    {/* Upload Passport */}
                    <div className="col-span-1">
                        <label className="block font-semibold text-gray-700 mb-1">{t.uploadPassport || "Upload Passport Photo"}</label>
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
                                    {t.submitting || "Submitting..."}
                                </span>
                            ) : submitted ? (t.submitted || "Submitted") : (isAuthReady ? (t.submit || "Submit") : "Loading Authentication...")}
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
                            <p className="text-gray-700 mb-2">{t.applicationReceived || "Your travel application has been received. Please save your Submission ID for your records:"}</p>
                            <div className="text-2xl font-bold text-blue-700 tracking-wider mb-2">{submissionId}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}