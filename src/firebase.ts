// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kanban-9e4e9.firebaseapp.com",
  projectId: "kanban-9e4e9",
  storageBucket: "kanban-9e4e9.appspot.com",
  messagingSenderId: "1028735043822",
  appId: "1:1028735043822:web:3b7d78f93d7d0da5708bff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
