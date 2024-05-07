import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const FIREBASE_AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "prac-team5.firebaseapp.com",
  projectId: "prac-team5",
  storageBucket: "prac-team5.appspot.com",
  messagingSenderId: "19577062626",
  appId: "1:19577062626:web:1aa946ef44844d6b280abb",
  databaseURL: FIREBASE_AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);
export const firestoreDb = getFirestore(app);
export const realtimeDb = getDatabase(app);

export { app, auth };
