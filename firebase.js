// Import the functions you need from the SDKs you need
import firebase, { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdiZIZhlEFLPB0JwqEqhkY5OzvLuVIJbU",
  authDomain: "react-elastic-71ebb.firebaseapp.com",
  projectId: "react-elastic-71ebb",
  storageBucket: "react-elastic-71ebb.appspot.com",
  messagingSenderId: "182980408470",
  appId: "1:182980408470:web:b615e3c15e4bdd649e7eb7",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
