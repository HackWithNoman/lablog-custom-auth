import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

const register = async (req: Request, res: Response) => {
  const payload = req.body;

  const user = await prisma.user.create({
    data: payload,
  });

  res.send({
    message: "Registered Successfully",
    data: user,
  });
};

export const userController = {
  register,
};
