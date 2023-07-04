import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDROd2KcZpOw0VWPcDRVN-_G2nIfuuVl8Y",
    authDomain: "contact-database-ff1a8.firebaseapp.com",
    projectId: "contact-database-ff1a8",
    storageBucket: "contact-database-ff1a8.appspot.com",
    messagingSenderId: "899893527959",
    appId: "1:899893527959:web:9eef2d94982bed8e11f0d2",
    measurementId: "G-6LLNP84V1M",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const db = getFirestore(app);
