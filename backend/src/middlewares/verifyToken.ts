import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    userId: string;
    status: string;
  }
}
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  // Get token from the cookie
  const token: string | undefined = req.cookies.jwt;

  // Check if token is provided
  if (!token) {
    res.status(401).json({ error: "Access Denied" });
    return;
  }

  try {
    // Verify the token
    const verified: JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // Check if user status is "premium"
    if (verified.status !== "premium") {
      res.status(403).json({ error: "Access Denied for non-premium users" });
      return;
    }

    // Add user from the token to the request object
    req.user = verified;

    // Continue to the next middleware function
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

export default verifyToken;
