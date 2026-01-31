import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  const payload = req.body;

  const hashPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: { ...payload, password: hashPassword },
  });

  res.send({
    message: "Registered Successfully",
    data: user,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: email });

  if (!user) return res.send({ message: "User not found." });

  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) return res.send({ message: "Invalid Credentials." });

  const token = jwt.sign({ id: user.id, role: user.role }, "jwtsecret", {
    expiresIn: "7d",
  });

  res.send({ message: "Logged in successfully.", token: token });
};

export const userController = {
  register,
  login,
};
