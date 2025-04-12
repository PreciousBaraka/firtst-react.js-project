import { prisma } from "../config/db.js";
import { patientEditSchema } from "../schema/user.js";

export const getPatients = async (req, res) => {
  try {
    const doctor = await prisma.patient.findMany({
      include: {
        user: true,
        role: true,
      },
    });
    res.status(200).json(patient);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching patient", error });
  }
};

export const updatedPatient = async (req, res) => {
  const { id } = req.params;
  const { error, value } = patientEditSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingPatient = await prisma.patient.findUnique({
      where: { id },
      include: {
        user: true,
        role: true,
      },
    });

    if (!existingPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: {
        user: {
          update: {
            fullName: value.fullName || existingPatient.user.fullName,
            email: value.email || existingPatient.user.email,
            phoneNumber: value.phoneNumber || existingPatient.user.phoneNumber,
            password: value.password || existingPatient.user.password,
          },
        },
        nationalIdNo: value.nationalIdNo || existingPatient.user.nationalIdNo,
        role: {
          connect: {
            id: value.roleId || existingPatient.roleId,
          },
        },
      },
      include: {
        user: true,
        role: true,
      },
    });

    res.status(200).json(updatedPatient);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating receptionist", error });
  }
};
