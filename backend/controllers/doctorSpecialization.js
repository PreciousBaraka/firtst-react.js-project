import { prisma } from "../config/db.js";
import {
  doctorSpecializationSchema,
  doctorSpecializationEditSchema,
} from "../schema/doctorSpecialization.js";

export const getDoctorSpecializations = async (req, res) => {
  try {
    const specializations = await prisma.doctorSpecialization.findMany({
      include: {
        doctor: {
          include: { user: true },
        },
        specialization: true,
      },
    });
    res.status(200).json(specializations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch specializations" });
  }
};

export const createDoctorSpecialization = async (req, res) => {
  const { error, value } = doctorSpecializationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const specialization = await prisma.doctorSpecialization.create({
      data: value,
    });
    res.status(201).json(specialization);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create specialization" });
  }
};

export const updateDoctorSpecialization = async (req, res) => {
  const { doctorId, specializationId } = req.params;
  const { error, value } = doctorSpecializationEditSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updated = await prisma.doctorSpecialization.update({
      where: {
        doctorId_specializationId: {
          doctorId,
          specializationId,
        },
      },
      data: value,
    });
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update specialization" });
  }
};
