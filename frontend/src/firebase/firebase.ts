import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "prac-team5.firebaseapp.com",
  projectId: "prac-team5",
  storageBucket: "prac-team5.appspot.com",
  messagingSenderId: "19577062626",
  appId: "1:19577062626:web:1aa946ef44844d6b280abb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export { app, auth };
