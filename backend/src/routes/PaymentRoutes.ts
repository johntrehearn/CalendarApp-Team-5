import express from "express";
import stripePackage from "stripe";

const stripe = new stripePackage(
  "sk_test_51P32IZP7WrlB8etah6fHU1BNPacwJlR8XNFQ4qBIuRlPaYjQSMRXacQZ66A30vDYRQkOh2PPqLWmZc2YRiY3PgCS00FzGWVXgz"
);

import * as admin from "firebase-admin";

const router = express.Router();

// Route for webhook listening for payment events

// Stripe webhook handler

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"],
        process.env.endpointSecret
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const userId = session.client_reference_id; // This is now the user's UID // Manuallly insert UID to test

        // Update user status in Firebase Realtime Database
        console.log(userId);
        const db = admin.database();
        const ref = db.ref(`users/${userId}`);
        await ref.update({ status: "premium" });
        console.log("User status updated to premium");
        break;
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        console.log(paymentIntentSucceeded);
        console.log("Payment intent succeeded");
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      case "payment_intent.created":
        const paymentIntentCreated = event.data.object;
        console.log(paymentIntentCreated);
        // Define and call a function to handle the event payment_intent.created
        break;
      case "checkout.session.async_payment_succeeded":
        const asyncPaymentSession = event.data.object;
        console.log(asyncPaymentSession);
        // Define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
    console.log("Stripe webhook received");
  }
);

export default router;
