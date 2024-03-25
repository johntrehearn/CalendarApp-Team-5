import winston from "winston";
import { MongoDB } from "winston-mongodb";
import dotenv from "dotenv";

dotenv.config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to the log format
    winston.format.simple()
  ),
  transports: [
    // new winston.transports.Console(),
    //new winston.transports.File({ filename: "logfile.log" }),
    /*
    new MongoDB({
      db: process.env.MONGO_URL,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      collection: "logs",
      format: winston.format.json(),
    }), */
  ],
});

export default logger;
