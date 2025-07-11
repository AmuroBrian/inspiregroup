// script/InspireWalletFirebaseConfig.js
"use client"; // This directive ensures the module runs only on the client-side

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "firebase/auth";

// Firebase configuration for the 'inspire-wallet' project
const firebaseConfig = {
    apiKey: "AIzaSyAyOHQrTQ_paCmaEkkm8PC4wg8Rb7o9F6E",
    authDomain: "inspire-wallet.firebaseapp.com",
    databaseURL: "https://inspire-wallet-default-rtdb.firebaseio.com",
    projectId: "inspire-wallet",
    storageBucket: "inspire-wallet.firebasestorage.app",
    messagingSenderId: "1091026046056",
    appId: "1:1091026046056:web:bd0fc54a12e57511cb3fdd",
    measurementId: "G-KJD1Q665JR"
};

// Initialize the default Firebase app, ensuring it's only done once.
// This pattern explicitly tries to get the default app. If it doesn't exist (which throws an error),
// it then proceeds to initialize it. This is more robust against potential race conditions
// or multiple module evaluations in development environments.
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
// These are exported for use throughout the application.
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

// A Promise to track the readiness of Firebase Authentication.
// This allows other parts of the application to wait until the initial authentication state
// has been determined (signed in, anonymous, or no user).
let authReadyPromiseResolve;
export const authReadyPromise = new Promise(resolve => {
    authReadyPromiseResolve = resolve;
});

// Set up an authentication state change listener.
// This listener will be triggered whenever the user's authentication state changes (e.g., sign-in, sign-out).
// It also resolves `authReadyPromise` once the initial state is known.
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
// It prioritizes signing in with a custom token (if provided by the environment, e.g., Canvas)
// and falls back to anonymous authentication if no custom token is available.
async function authenticateUser() {
    try {
        // Check if a custom authentication token is provided by the environment.
        // `__initial_auth_token` is a global variable provided by the Canvas environment.
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(auth, __initial_auth_token);
            console.log("Firebase Auth (Inspire Wallet): Signed in with custom token.");
        } else {
            // If no custom token, sign in anonymously.
            // Note: Anonymous authentication must be enabled in your Firebase project settings.
            await signInAnonymously(auth);
            console.log("Firebase Auth (Inspire Wallet): Signed in anonymously.");
        }
    } catch (error) {
        // Log any authentication errors.
        console.error("Firebase Authentication Error (Inspire Wallet):", error);
        // Resolve the promise even on error to prevent the application from hanging,
        // allowing it to proceed even if authentication fails.
        authReadyPromiseResolve(null);
    }
}

// Call the authentication function immediately when the module is executed.
authenticateUser();

// Export the Firebase app instance itself, which can be useful for other Firebase service initializations
// or for direct access to the app object.
export { app };
