import express from "express";
import axios from "axios";
import sharp from "sharp";

import * as admin from "firebase-admin";
import generateTokenAndSetCookie from "../utils/generateToken";
import { Request, Response } from "express";
import verifyToken from "../middlewares/verifyToken";
import { JwtPayload } from "jsonwebtoken";

const router = express.Router();

// Route for user registration using Firebase Auth and Realtime Database
router.post("/register", async (req, res) => {
  try {
    const { email, password, displayName, otherDetails } = req.body;

    // Create user using Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    // Store additional user details
    await admin
      .database()
      .ref("users/" + userRecord.uid)
      .set({
        email: userRecord.email,
        displayName: userRecord.displayName,
        otherDetails: otherDetails,
        status: "free",
      });

    // User created successfully
    res.status(201).json({
      message: "User created successfully",
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        status: "free",
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Route for user login using Firebase Auth and Realtime Database
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign in user using Firebase Auth
    const userRecord = await admin.auth().getUserByEmail(email);

    // Retrieve user status from the database
    const userStatusSnapshot = await admin
      .database()
      .ref("users/" + userRecord.uid + "/status")
      .once("value");
    const userStatus = userStatusSnapshot.val();

    // Generate JWT token
    const token = generateTokenAndSetCookie(userRecord.uid, userStatus, res);

    // User signed in successfully
    res.status(200).json({
      message: "User signed in successfully",
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        status: userStatus,
      },
      token: token,
    });
  } catch (error) {
    console.error("Error signing in user:", error);
    res.status(500).json({ error: "Failed to sign in user" });
  }
});

// Route for user logout
router.post("/logout", async (req, res) => {
  try {
    // Clear JWT token cookie
    res.clearCookie("jwt");
    res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    console.error("Error signing out user:", error);
    res.status(500).json({ error: "Failed to sign out user" });
  }
});

// Route for deleting ALL user data
router.delete("/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    // Remove images associated with the user from Firebase Storage
    const bucket = admin.storage().bucket("prac-team5.appspot.com");
    const imagesDir = "images/";

    // List all files in the images directory
    const [files] = await bucket.getFiles({ prefix: imagesDir });

    // Filter files that contain the UID in their name
    const imagesToDelete = files.filter((file) =>
      file.name.includes(`${imagesDir}${uid}`)
    );

    // Delete each image
    const deletionPromises = imagesToDelete.map((file) => file.delete());
    await Promise.all(deletionPromises);

    // Delete user from Firebase Auth
    await admin.auth().deleteUser(uid);

    // Delete user data from Firebase database
    await admin
      .database()
      .ref("users/" + uid)
      .remove();

    res
      .status(200)
      .json({ message: "User and associated images deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ error: "Failed to delete user and associated images" });
  }
});

// Route for getting user data from Firebase Auth and Realtime Database
router.get("/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    // Retrieve user data from Firebase Auth
    const userRecord = await admin.auth().getUser(uid);

    // Retrieve user data from Firebase database
    const userSnapshot = await admin
      .database()
      .ref("users/" + uid)
      .once("value");
    const userData = userSnapshot.val();

    res.status(200).json({
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        status: userData.status,
        otherDetails: userData.otherDetails,
      },
    });
  } catch (error) {
    console.error("Error getting user data:", error);
    res.status(500).json({ error: "Failed to get user data" });
  }
});

// Route for premium route that requires premium status to access it
router.get("/premiumCheck", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ message: "Access granted to premium route" });
});

// Route for protected route that requires authentication to access it
router.get("/protectedCheck", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ message: "Access granted to protected route" });
});

// Route for Image Upload to Firebase Storage and verify token
router.post("/uploadImage", async (req, res) => {
  try {
    const { uid, image } = req.body;
    if (uid) {
      // Verify token
      admin
        .auth()
        .verifyIdToken(uid)
        .then(async (decodedToken) => {
          const userUid = decodedToken.uid;
          if (userUid === uid) {
            // Upload image to Firebase Storage
            const bucket = admin.storage().bucket();
            const imageBuffer = Buffer.from(image, "base64");
            const file = bucket.file("images/" + userUid + ".png");
            await file.save(imageBuffer, {
              metadata: { contentType: "image/png" },
            });
            res.status(200).json({ message: "Image uploaded successfully" });
          } else {
            res.status(401).json({ error: "User not authenticated" });
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          res.status(401).json({ error: "Failed to verify token" });
        });
    } else {
      res.status(401).json({ error: "User not authenticated" });
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// Route for Premium API call and verify token middleware
router.get(
  "/protectedImageGen",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.user as JwtPayload;

      // Array to store the URLs of the generated images
      const imageUrls = [];

      // Loop 3 times to generate 3 images
      for (let i = 0; i < 3; i++) {
        // Make API call to DALL-E to generate a Christmas image
        const response = await axios.post("DALL-E_API_ENDPOINT", {
          prompt:
            "small fun images, I would expect to find in Christmas calendar hatches",
        });

        // Assuming DALL-E returns image data in response.data
        const imageData = response.data.image;

        // Convert image data to buffer
        const imageBuffer = Buffer.from(imageData, "base64");

        // Store image buffer in Firebase Storage
        const bucket = admin.storage().bucket("prac-team5.appspot.com");
        const filename = `images/${userId}_christmas_image_${i}.png`;
        const file = bucket.file(filename);
        await file.save(imageBuffer, {
          metadata: { contentType: "image/png" },
        });

        // Generate a signed URL for the file with a 1-day expiration
        const [url] = await file.getSignedUrl({
          action: "read",
          expires: Date.now() + 1000 * 60 * 60 * 24, // 1 day
        });

        // Store the URL in the array
        imageUrls.push(url);
      }

      res.status(200).json({
        message: "Generated and stored Christmas images successfully",
        imageUrls,
      });
    } catch (error) {
      console.error("Error in protected route:", error);
      res
        .status(500)
        .json({ error: "Failed to generate and store Christmas images" });
    }
  }
);

export default router;
