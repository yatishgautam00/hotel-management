// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import getStorage

const firebaseConfig = {
  apiKey: "AIzaSyBnbfe5OSwUDErb5u40QgdcDg0BIwbfMNE",
  authDomain: "hotel-rivayat.firebaseapp.com",
  projectId: "hotel-rivayat",
  storageBucket: "hotel-rivayat.appspot.com",
  messagingSenderId: "588587490970",
  appId: "1:588587490970:web:c2b15cceaf817d41ffc923",
  measurementId: "G-7TH0GVGNH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { app, firestore, auth, storage }; // Export storage
