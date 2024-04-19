// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "majorproject-413417.firebaseapp.com",
  databaseURL: "https://majorproject-413417-default-rtdb.firebaseio.com",
  projectId: "majorproject-413417",
  storageBucket: "majorproject-413417.appspot.com",
  messagingSenderId: "617002293403",
  appId: "1:617002293403:web:25cf5c48a13288331c4e3e",
  measurementId: "G-VQL0YNFJPD"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
