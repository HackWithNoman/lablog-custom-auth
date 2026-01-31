import { NextFunction, Request, Response } from "express";
import { Role } from "../generated/prisma/enums";
import jwt from "jsonwebtoken";

const auth = (roles?: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.send("No token found!!");
    }

    try {
      const decoded = jwt.verify(token as string, "jwtsecret");

      next();
    } catch (error) {
      console.error(error);
    }
  };
};
