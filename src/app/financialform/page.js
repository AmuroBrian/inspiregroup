"use client";

import React, { useState } from "react";
import { app, db, storage } from "../../../script/firebaseConfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function FinanceForm() {
    const [formData, setFormData] = useState({});
    const [submissionId, setSubmissionId] = useState("");
    const [passportImage, setPassportImage] = useState(null);
    const [govIdImage, setGovIdImage] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

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
        <div className="max-w-4xl mx-auto p-8">
            <div className="w-full h-[80px]"></div>
            <h2 className="text-xl font-bold mb-4 text-center">Financial Form</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                {[
                    "Last Name", "First Name", "Middle Name", "Birthdate", "Gender", "Civil Status",
                    "Address", "Personal Mobile Number", "Landline Number", "Email Address", "Citizenship", "Passport Number", "Source of Fund", "Gross Monthly Income"
                ].map((field, index) => (
                    <div key={index} className="col-span-1">
                        <label className="block font-semibold">{field}</label>
                        {field === "Birthdate" ? (
                            <input type="date" name={field} className="w-full p-2 border rounded bg-white" required onChange={handleChange} />
                        ) : field === "Gender" ? (
                            <select name={field} className="w-full p-2 border rounded bg-white" required onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        ) : field === "Civil Status" ? (
                            <select name={field} className="w-full p-2 border rounded bg-white" required onChange={handleChange}>
                                <option value="">Select Civil Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        ) : (
                            <input type={field.includes("Number") ? "number" : field.includes("Email") ? "email" : "text"} name={field} placeholder={field} className="w-full p-2 border rounded bg-white" required onChange={handleChange} />
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

                <div className="col-span-1 md:col-span-2 flex justify-center">
                    <button
                        type="submit"
                        className={`w-full md:w-full p-2 rounded ${submitted ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                        disabled={submitted || loading}
                    >
                        {loading ? "Submitting..." : submitted ? "Submitted" : "Submit"}
                    </button>
                </div>

            </form>

            {submitted && (
                <div className="mt-6 p-4 bg-gray-200 rounded-lg text-center">
                    <p className="font-semibold text-lg">Submission ID:</p>
                    <p className="text-xl font-bold text-blue-600">{submissionId}</p>
                </div>
            )}
        </div>
    );
}
