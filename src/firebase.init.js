// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6BejsyUZA_KfeHvGMRlO4JaANnAnflqE",
  authDomain: "explore-email-password-a-fc593.firebaseapp.com",
  projectId: "explore-email-password-a-fc593",
  storageBucket: "explore-email-password-a-fc593.firebasestorage.app",
  messagingSenderId: "997837947657",
  appId: "1:997837947657:web:cb17560ab44e022090c9d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);