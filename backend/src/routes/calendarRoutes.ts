// Routes and DB queries for will go here
import admin from "firebase-admin";
import express from "express";

const router = express.Router();

router.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    // Retrieve user's calendar data from Firestore
    const userDoc = await admin.firestore().collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();

    // Send the calendar data as a response
    res.json(userData.calendars);
  } catch (error) {
    console.error("Error retrieving calendar:", error);
    res.status(500).json({ error: "Failed to retrieve calendar" });
  }
});

// Retrieve a specific calendar

router.get("/:uid/:calendarId", async (req, res) => {
  try {
    const { uid, calendarId } = req.params;

    // Retrieve user's calendar data from Firestore
    const userDoc = await admin.firestore().collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();
    const calendar = userData.calendars[calendarId];

    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }

    // Send the calendar data as a response
    res.json(calendar);
  } catch (error) {
    console.error("Error retrieving calendar:", error);
    res.status(500).json({ error: "Failed to retrieve calendar" });
  }
});
export default router;
