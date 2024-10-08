// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIG21DdrsL43TmiORMYPaLTQtlzblfO-E",
  authDomain: "mail-frames.firebaseapp.com",
  projectId: "mail-frames",
  storageBucket: "mail-frames.appspot.com",
  messagingSenderId: "650411795943",
  appId: "1:650411795943:web:d5a91e8ad24d39dddbc942",
  measurementId: "G-J9LJ4N5KJX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);