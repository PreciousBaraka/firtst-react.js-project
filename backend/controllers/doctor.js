import { prisma } from "../config/db.js";
import { doctorEditSchema } from "../schema/User.js";

// Get all doctors with associated user and role info
export const getDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        user: true,
        role: true,
      },
    });
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};

// Update doctor details
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
            password: value.password || existingDoctor.user.password,
          },
        },
        nationalIdNo: value.nationalIdNo || existingDoctor.nationalIdNo,
        specialization: value.specialization || existingDoctor.specialization,
        role: {
          connect: {
            id: value.roleId || existingDoctor.roleId,
          },
        },
      },
      include: {
        user: true,
        role: true,
      },
    });

    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating doctor", error });
  }
};
