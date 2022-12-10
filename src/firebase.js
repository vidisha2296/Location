import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDahAZLP3Fe68j9C-7ZT9i0nAqiQWXhs_4 ",
  authDomain: "tracknerd-staging.firebaseapp.com",
  projectId: "tracknerd-staging",
  // databaseURL: "https://tracknerd-staging-default-rtdb.firebaseio.com ",
  storageBucket: " tracknerd-staging.appspot.com ",
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: "1:847967007196:web:ae4df284f5560af4139f19 "
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
