// Import the functions you need from the SDKs you need
import firebase, { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: <Replace Me />,
  authDomain: <Replace Me />,
  projectId: <Replace Me />,
  storageBucket: <Replace Me />,
  messagingSenderId: <Replace Me />,
  appId: <Replace Me />,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
