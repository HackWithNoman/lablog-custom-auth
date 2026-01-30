import { Request, RequestHandler, Response } from "express";
import { prisma } from "../../lib/prisma";

// const createEquipment = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;

//     console.log(payload);

//     const equipment = await prisma.equipment.create({
//       data: payload,
//     });
//     res.send({
//       message: "Equipment Added",
//       data: equipment,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

const createEquipment: RequestHandler = async (req, res) => {
  try {
    const payload = req.body;

    const equipment = await prisma.equipment.create({
      data: payload,
    });

    res.send({ message: "Equipment Added", data: equipment });
  } catch (error) {
    console.error(error);
  }
};

const getEquipments = async (req: Request, res: Response) => {
  try {
    const data = await prisma.equipment.findMany();
    res.send({
      message: "Equipments",
      data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const equipmentController = {
  createEquipment,
  getEquipments,
};
