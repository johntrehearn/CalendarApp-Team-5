import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import logger from "../src/utils/logger";
import { startMetricsServer } from "../src/utils/metrics";

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

const app = express(); // Create an Express application

app.use(cors()); // Enable All CORS Requests
app.use(compression()); // Compress all routes and responses
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(bodyParser.json()); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(morgan(":method :url :status :response-time ms")); // Logging HTTP requests to the console

app.use("/calendar", calendarRouter);

app.get("/", (req, res) => {
  res.send("Calendar API is running 🚀");
});

const server = http.createServer(app); // Create an HTTP server

server.listen(8080, () => {
  // Start the server on port 8080
  console.log("Server is running on port http://localhost:8080/");
  logger.info(`Server listening on port 8080 🚀`);
});

connectToDatabase(FIREBASE_URL); // Connect to MongoDB
startMetricsServer(); // Start the metrics server on port 9100
