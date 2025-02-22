import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAmHDx-BghJ5mCBgT0X2-h5Q6s8phDYdrc",
    authDomain: "inspire-group-38fb3.firebaseapp.com",
    projectId: "inspire-group-38fb3",
    storageBucket: "inspire-group-38fb3.appspot.com",
    messagingSenderId: "1018970613129",
    appId: "1:1018970613129:web:dda4bd3786697d74282d58",
    measurementId: "G-8E4RRD6T7T"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export { collection, addDoc, ref, uploadBytes, getDownloadURL };
