import { createTransport } from "nodemailer";

import { config } from "dotenv";
config();

const transport = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  await transport.sendMail({
    from: "noreply@HBCxmascalendars.com",
    to: to, // Pass the 'to' parameter here
    subject: subject, // Pass the 'subject' parameter here
    html: html, // Pass the 'html' parameter here
  });
}
