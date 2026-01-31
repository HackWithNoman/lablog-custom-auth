import { RequestHandler } from "express";
import { prisma } from "../../lib/prisma";

const createUsageLog: RequestHandler = async (req, res) => {
  try {
    const payload = req.body;
    const log = await prisma.usageLog.create({
      data: { ...payload, userId: req.user.id },
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

const updateUsageLog: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.send("Please provide id");
  try {
    const log = await prisma.usageLog.update({
      where: { id },
      data: {
        endTime: new Date(),
      },
    });
    res.send({
      message: "log updated",
      data: log,
    });
  } catch (error) {
    res.send({ message: "log updating faild", error });
  }
};

export const logController = {
  createUsageLog,
  getUsageLog,
  updateUsageLog,
};
