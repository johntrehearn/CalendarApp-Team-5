// Routes Calendar DB queries for will go here
import admin from "firebase-admin";
import express from "express";

const router = express.Router();

// -----------------------------------------------------------------------------------------------------------------------------------------------------

// Route to retrieve all calendars for a user

router.get("/getcalendars/:uid", async (req, res) => {
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

router.get("/getcalendar/:uid/:calendarId", async (req, res) => {
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

router.delete("/deletecalendar/:uid/:calendarId", async (req, res) => {
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

router.post("/addcalendar/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const calendarData = req.body; // This is the data sent from the frontend

    // Retrieve user's calendar data from Firestore
    const userDoc = await admin.firestore().collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();

    // change all isOpen to false no matter what the user submits
    for (let i = 0; i < calendarData.calendar1.hatches.length; i++) {
      calendarData.calendar1.hatches[i].isOpen = false;
    }

    // Increment the calendar counter
    const calendarCount = (userData.calendarCount || 0) + 1;

    // Add the new calendar to the user's data
    userData.calendars = {
      ...userData.calendars,
      [`calendar${calendarCount}`]: calendarData.calendar1,
    };

    // Update the calendar counter
    userData.calendarCount = calendarCount;

    // Update the user's data in Firestore
    await admin.firestore().collection("users").doc(uid).set(userData);

    res.json({
      message: "Calendar created successfully",
      calendarId: `calendar${calendarCount}`,
    });
  } catch (error) {
    console.error("Error creating calendar:", error);
    res.status(500).json({ error: "Failed to create calendar" });
  }
});

// Update a specific calendar

router.put("/updatecalendar/:uid/:calendarId", async (req, res) => {
  try {
    const { uid, calendarId } = req.params;
    const updatedCalendar = req.body;

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

    // Update the calendar
    userData.calendars[calendarId] = updatedCalendar;

    // Update the user's data in Firestore
    await admin.firestore().collection("users").doc(uid).set(userData);

    res.json({ message: "Calendar updated successfully" });
  } catch (error) {
    console.error("Error updating calendar:", error);
    res.status(500).json({ error: "Failed to update calendar" });
  }
});

// Update hatch status of a specific calendar

router.put("/updatehatch/:uid/:calendarId", async (req, res) => {
  try {
    const { uid, calendarId } = req.params;
    const updatedHatch = req.body;

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

    // Update the calendar
    userData.calendars[calendarId].hatch = updatedHatch.hatch;

    // Update the user's data in Firestore
    await admin.firestore().collection("users").doc(uid).set(userData);

    res.json({ message: "Hatch status updated successfully" });
  } catch (error) {
    console.error("Error updating hatch status:", error);
    res.status(500).json({ error: "Failed to update hatch status" });
  }
});

export default router;
