import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  onValue,
  set,
  remove,
} from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK4T0EWieAxUJL3_ldWttNigdTuMzz3xo",
  authDomain: "mobile-final-project-3140e.firebaseapp.com",
  databaseURL:
    "https://mobile-final-project-3140e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mobile-final-project-3140e",
  storageBucket: "mobile-final-project-3140e.appspot.com",
  messagingSenderId: "346568203332",
  appId: "1:346568203332:web:3b8c2c5b77ef910d87b011",
  measurementId: "G-6Q3TLC0JME",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export {
  app,
  auth,
  database,
  ref,
  push,
  onValue,
  set,
  remove,
  signInWithEmailAndPassword,
  signOut,
};
