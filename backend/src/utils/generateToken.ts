import { Response } from "express";
import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (
  userId: string,
  userStatus: string,
  res: Response
) => {
  const token = jwt.sign(
    { userId, status: userStatus },
    process.env.JWT_SECRET,
    {
      expiresIn: "15d",
    }
  );

  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
    httpOnly: false, // The cookie only accessible by the web server
    sameSite: "strict", // The cookie not sent with cross-origin requests
    secure: process.env.NODE_ENV === "production", // The cookie only transmitted over HTTPS
  });

  return token;
};
export default generateTokenAndSetCookie;
