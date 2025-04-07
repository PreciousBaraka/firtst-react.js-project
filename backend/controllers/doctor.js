import { prisma } from "../config/db.js";
import { doctorEditSchema,  } from "../schema/User.js";

export const getDoctor = async (req, res) => {
  try {
    const doctor = await prisma.doctor.findMany({
      include: {
        user: true,
        role: true,
      },
    });
    res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching doctor", error });
  }
};

export const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { error, value } = doctorEditSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingDoctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        user: true,
        role: true,
      },
    });

    if (!existingDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id },
      data: {
        user: {
          update: {
            fullName: value.fullName || existingDoctor.user.fullName,
            email: value.email || existingDoctor.user.email,
            phoneNumber: value.phoneNumber || existingDoctor.user.phoneNumber,
          },
          nationalIdNo: value.nationalIdNo || existingDoctor.user.nationalIdNo,

        },
        
        role: {
          connect: { id: value.roleId || existingDoctor.roleId },
        },
      },
      include: {
        user: true,
        role: true,
      },
    });

    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating staff", error });
  }
};


