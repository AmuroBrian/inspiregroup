// script/InspireWalletFirebaseConfig.js
"use client"; // This directive ensures the module runs only on the client-side

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "firebase/auth";

// Firebase configuration for the 'inspire-wallet' project
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize the default Firebase app, ensuring it's only done once.
let app;
try {
    // Attempt to get the default Firebase app. This will succeed if it's already initialized.
    app = getApp();
    console.log("Retrieving existing default Firebase app for Inspire Wallet.");
} catch (e) {
    // If the default app has not been created yet, initialize it.
    if (e.code === 'app/no-app') {
        console.log("Initializing default Firebase app for Inspire Wallet.");
        app = initializeApp(firebaseConfig);
    } else {
        // Re-throw any other unexpected errors during app retrieval.
        throw e;
    }
}

// Get instances of Firebase services associated with the initialized app.
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Initialize Analytics only in browser environment and if supported
export let analytics = null;
if (typeof window !== 'undefined') {
    isSupported().then(supported => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    }).catch(err => {
        console.warn('Firebase Analytics not supported:', err);
    });
}

// A Promise to track the readiness of Firebase Authentication.
let authReadyPromiseResolve;
export const authReadyPromise = new Promise(resolve => {
    authReadyPromiseResolve = resolve;
});

// Set up an authentication state change listener.
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Firebase Auth (Inspire Wallet): User is signed in.", user.uid);
    } else {
        console.log("Firebase Auth (Inspire Wallet): No user is signed in.");
    }
    // Resolve the promise with the current user object (or null if no user).
    authReadyPromiseResolve(user);
});

// Function to authenticate the user immediately when this module loads.
async function authenticateUser() {
    try {
        // Check if a custom authentication token is provided by the environment.
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(auth, __initial_auth_token);
            console.log("Firebase Auth (Inspire Wallet): Signed in with custom token.");
        } else {
            // If no custom token, sign in anonymously.
            await signInAnonymously(auth);
            console.log("Firebase Auth (Inspire Wallet): Signed in anonymously.");
        }
    } catch (error) {
        // Log any authentication errors.
        console.error("Firebase Authentication Error (Inspire Wallet):", error);
        authReadyPromiseResolve(null);
    }
}

// Call the authentication function immediately when the module is executed.
authenticateUser();

// Export the Firebase app instance itself
export { app };
