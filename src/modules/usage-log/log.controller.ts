import { RequestHandler } from "express";
import { prisma } from "../../lib/prisma";

const createUsageLog: RequestHandler = async (req, res) => {
  try {
    const payload = req.body;
    const log = await prisma.usageLog.create({
      data: payload,
    });

    res.send({
      message: "log added",
      data: log,
    });
  } catch (error) {
    res.send({ message: "log creation erorr", error });
  }
};

const getUsageLog: RequestHandler = async (req, res) => {
  try {
    const log = await prisma.usageLog.findMany({
      include: {
        user: true,
        equipment: true,
      },
    });

    res.send({
      message: "log retrived",
      data: log,
    });
  } catch (error) {
    res.send({ message: "log retriving faild", error });
  }
};

export const logController = {
  createUsageLog,
  getUsageLog,
};
