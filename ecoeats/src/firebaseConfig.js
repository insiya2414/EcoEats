// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_R_7KAl2yPchsRdHvXfjuQyeYIErnDqo",
  authDomain: "ecoeats-hci.firebaseapp.com",
  projectId: "ecoeats-hci",
  storageBucket: "ecoeats-hci.firebasestorage.app",
  messagingSenderId: "504273575153",
  appId: "1:504273575153:web:f38852641831e748679d50",
  measurementId: "G-FDMHH87B9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
// Use the Configuration in Other Files: In other JavaScript files where you need to use Firebase services, import the configuration like this:
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
// import { app, db } from './firebaseConfig';