import express from "express";
import axios from "axios";
import sharp from "sharp";
import stripePackage from "stripe";
import { sendEmail } from "../utils/confirmAccount";
import { body, validationResult } from "express-validator";

import image_generation from "../utils/generateImage";

import * as admin from "firebase-admin";
import generateTokenAndSetCookie from "../utils/generateToken";
import { Request, Response } from "express";
import verifyToken from "../middlewares/verifyToken";
import { JwtPayload } from "jsonwebtoken";

const stripe = new stripePackage(
  "sk_test_51P32IZP7WrlB8etah6fHU1BNPacwJlR8XNFQ4qBIuRlPaYjQSMRXacQZ66A30vDYRQkOh2PPqLWmZc2YRiY3PgCS00FzGWVXgz"
);

interface Calendar {
  title: string;
  backgroundFile: string; // Change this to the correct type for your background file
  backgroundUrl: string;
  hatches: Array<{
    num: number;
    imageFile: string; // Change this to the correct type for your image file
    imageUrl: string;
    isOpen: boolean;
  }>;
}

let calendars: { [key: string]: Calendar };

//-----------------------------------------------------------------------------------------------------------------------------------

const router = express.Router();

// Route for user registration using Firebase Auth and Realtime Database and Firestore  (with email verification)

router.post(
  "/register",
  [
    // Validate the request body
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 7 characters long"),
    body("displayName").not().isEmpty().withMessage("Display name is required"),
    body("status")
      .optional()
      .isIn(["free"])
      .withMessage("Invalid status value"),
  ],
  async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, displayName, status } = req.body;

      // Check if status is not "free"
      if (status && status !== "free") {
        return res.status(400).json({ error: "Invalid status value" });
      }

      // Create user using Firebase Auth
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName,
      });

      // Store additional user details in Realtime Database
      await admin
        .database()
        .ref("users/" + userRecord.uid)
        .set({
          email: userRecord.email,
          displayName: userRecord.displayName,
          status: "free",
        });

      // Store additional user details in Firestore
      await admin
        .firestore()
        .collection("users")
        .doc(userRecord.uid)
        .set({ calendars: {} });

      // Send welcome email
      // const emailSubject = "Welcome to our platform!";
      // const emailHtml =
      // "<h1>Welcome!</h1><p>Thank you for registering on our platform.</p>";
      // await sendEmail(email, emailSubject, emailHtml);

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
  }
);

// Route for user login using Firebase Auth and Realtime Database
router.post("/login", async (req, res) => {
  try {
    const idToken = req.body.idToken as string; // Firebase ID token

    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Set the user ID in the session
    //req.session.userId = uid;

    // Retrieve user status from the database
    const userStatusSnapshot = await admin
      .database()
      .ref("users/" + uid + "/status")
      .once("value");
    const userStatus = userStatusSnapshot.val();

    // Generate JWT token
    const token = generateTokenAndSetCookie(uid, userStatus, res);

    // User signed in successfully
    res.status(200).json({
      message: "User signed in successfully",
      user: {
        uid: uid,
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

// Route for generating and storing Christmas images for the user
router.get("/generateImage/:uid", verifyToken, async (req, res) => {
  try {
    const { uid } = req.params;

    // Generate image using OpenAI API
    const imageUrlList = await image_generation();

    // Download image using Axios
    const imageResponse = await axios.get(imageUrlList[0], {
      responseType: "arraybuffer",
    });

    // Resize image using Sharp
    const resizedImageBuffer = await sharp(imageResponse.data)
      //.resize(256, 256)
      .toBuffer();

    // Upload image to Firebase Storage
    const bucket = admin.storage().bucket("prac-team5.appspot.com");
    const file = bucket.file(`images/${uid}/${Date.now()}_${uid}.png`);
    await file.save(resizedImageBuffer, {
      metadata: { contentType: "image/png" },
    });

    res
      .status(200)
      .json({ message: "Image generated and stored successfully" });
  } catch (error) {
    console.error("Error generating and storing image:", error);
    res.status(500).json({ error: "Failed to generate and store image" });
  }
});

// Route for creating a Stripe Checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { userId, priceId } = req.body;

    console.log("Received userId:", userId); // Log the userId

    // Here you might want to find the user in your database based in userId

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "https://example.com/cancel",
      client_reference_id: userId,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

export default router;
