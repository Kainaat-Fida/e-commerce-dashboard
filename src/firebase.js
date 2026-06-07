// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // 🔹 Added for authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmuKO6U1SWrbEsZcBWg-XWd0xDc6ba0EQ",
  authDomain: "urbancart-dffd9.firebaseapp.com",
  projectId: "urbancart-dffd9",
  storageBucket: "urbancart-dffd9.firebasestorage.app",
  messagingSenderId: "341201997500",
  appId: "1:341201997500:web:81e109a5d7c0d8e69b4ab9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Exports
export const db = getFirestore(app);  // Firestore database
export const auth = getAuth(app);     // Firebase Authentication
