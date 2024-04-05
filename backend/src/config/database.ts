import * as admin from "firebase-admin";
import serviceAccount from "../config/serviceAccountKey.json";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL, // Hidden in .env file
});

// Connect confirmed
function getDatabase() {
  console.log("Connection to Firebase successful!");

  return admin.database();
}

export default getDatabase;
