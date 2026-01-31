import { NextFunction, Request, Response } from "express";
import { Role } from "../generated/prisma/enums";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const auth = (roles?: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.send("No token found!!");
    }

    try {
      const decoded = jwt.verify(token as string, "jwtsecret");


      if (!decoded) return res.send("Unauthorized");

      req.user = decoded as JwtPayload;

      next();
    } catch (error) {
      console.error(error);
    }
  };
};

export default auth;
