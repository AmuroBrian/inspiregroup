// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAmHDx-BghJ5mCBgT0X2-h5Q6s8phDYdrc",
    authDomain: "inspire-group-38fb3.firebaseapp.com",
    projectId: "inspire-group-38fb3",
    storageBucket: "inspire-group-38fb3.firebasestorage.app",
    messagingSenderId: "1018970613129",
    appId: "1:1018970613129:web:dda4bd3786697d74282d58",
    measurementId: "G-8E4RRD6T7T"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export { db, collection, addDoc, getDocs, query, where };