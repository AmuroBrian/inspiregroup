// script/InspireGroupFirebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuration for your SECOND Firebase project: inspire-group-38fb3
// IMPORTANT: For production, use environment variables (e.g., process.env.NEXT_PUBLIC_...)
// Hardcoding keys is not recommended for production.
const firebaseConfig = {
  apiKey: "AIzaSyAmHDx-BghJ5mCBgT0X2-h5Q6s8phDYdrc",
  authDomain: "inspire-group-38fb3.firebaseapp.com",
  projectId: "inspire-group-38fb3",
  storageBucket: "inspire-group-38fb3.appspot.com",
  messagingSenderId: "1018970613129",
  appId: "1:1018970613129:web:dda4bd3786697d74282d58",
  measurementId: "G-8E4RRD6T7T" // For Firebase Analytics, if used
};

// Define a unique name for this secondary app instance
const SECONDARY_APP_NAME = 'inspireGroupApp'; 

// Initialize the SECONDARY Firebase app (inspire-group-38fb3) with a unique name
let app; // Renamed to 'app' for consistency within this file, but it's the named app
if (!getApps().some(existingApp => existingApp.name === SECONDARY_APP_NAME)) {
  app = initializeApp(firebaseConfig, SECONDARY_APP_NAME);
} else {
  app = getApp(SECONDARY_APP_NAME); // Retrieve the named app if it already exists
}

// Get Firebase services instances for the SECONDARY app
export const db = getFirestore(app); // This 'db' refers to the Firestore of 'inspireGroupApp'
export const storage = getStorage(app); // This 'storage' refers to the Storage of 'inspireGroupApp'

// Optional: Initialize Analytics for the SECONDARY app if you are using it
export const analytics = getAnalytics(app); // This 'analytics' refers to the Analytics of 'inspireGroupApp'

// You can also export the app instance itself if needed
export { app };
