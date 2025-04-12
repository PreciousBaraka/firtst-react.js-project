import { prisma } from "../config/db.js";
import { receptionEditistSchema } from "../schema/User.js";

// Get all doctors with associated user and role info
export const getReceptionists = async (req, res) => {
  try {
    const receptionists = await prisma.receptionists.findMany({
      include: {
        user: true,
        role: true,
      },
    });
    res.status(200).json(receptionists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};

// Update doctor details
export const updateReceptionist = async (req, res) => {
  const { id } = req.params;
  const { error, value } = receptionEditistSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingReceptionist = await prisma.receptionist.findUnique({
      where: { id },
      include: {
        user: true,
        role: true,
      },
    });

    if (!existingReceptionist) {
      return res.status(404).json({ message: "Receptionist not found" });
    }

    const updatedReceptionist = await prisma.receptionist.update({
      where: { id },
      data: {
        user: {
          update: {
            fullName: value.fullName || existingReceptionist.user.fullName,
            email: value.email || existingReceptionist.user.email,
            phoneNumber: value.phoneNumber || existingReceptionist.user.phoneNumber,
            password: value.password || existingReceptionist.user.password,
          },
        },
        nationalIdNo: value.nationalIdNo || existingReceptionist.nationalIdNo,
        role: {
          connect: {
            id: value.roleId || existingReceptionist.roleId,
          },
        },
      },
      include: {
        user: true,
        role: true,
      },
    });

    res.status(200).json(updatedReceptionist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating receptionist", error });
  }
};
