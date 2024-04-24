// Routes Calendar DB queries for will go here
import admin from "firebase-admin";
import express from "express";

const router = express.Router();

// -----------------------------------------------------------------------------------------------------------------------------------------------------

// Route to retrieve all calendars for a user

router.get("getcalendars/:uid", async (req, res) => {
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

router.get("getcalendar/:uid/:calendarId", async (req, res) => {
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

// delete a specific calendar

router.delete("deletecalendar/:uid/:calendarId", async (req, res) => {
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

    // Delete the calendar
    delete userData.calendars[calendarId];

    // Update the user's data in Firestore
    await admin.firestore().collection("users").doc(uid).set(userData);

    res.json({ message: "Calendar deleted successfully" });
  } catch (error) {
    console.error("Error deleting calendar:", error);
    res.status(500).json({ error: "Failed to delete calendar" });
  }
});

// create a new calendar for a user with the next number

router.post("addcalendar/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    // Retrieve user's calendar data from Firestore
    const userDoc = await admin.firestore().collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();

    // Get the current number of calendars
    const currentCalendarCount = Object.keys(userData.calendars).length;

    // Create a new calendar with the next number
    const newCalendar = {
      title: `Advent Calendar ${currentCalendarCount + 1}`,
      backgroundFile: "Your background file here",
      backgroundUrl: "",
      hatches: Array.from({ length: 24 }, (_, i) => ({
        num: i + 1,
        imageFile: "Your image file here",
        imageUrl: "",
        isOpen: false,
      })),
    };

    // Add the new calendar to the user's data
    userData.calendars = {
      ...userData.calendars,
      [`calendar${currentCalendarCount + 1}`]: newCalendar,
    };

    // Update the user's data in Firestore
    await admin.firestore().collection("users").doc(uid).set(userData);

    res.json({ message: "Calendar created successfully" });
  } catch (error) {
    console.error("Error creating calendar:", error);
    res.status(500).json({ error: "Failed to create calendar" });
  }
});

export default router;
