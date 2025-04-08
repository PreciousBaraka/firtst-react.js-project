import { prisma } from "../config/db.js";
import { admissionSchema } from "../schema/Admission.js";

export const createAdmission = async (req, res) => {
  const { error, value } = admissionSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const admission = await prisma.admission.create({ data: value });
    res.status(201).json(admission);
  } catch (err) {
    res.status(500).json({ error: "Failed to create admission" });
  }
};
  
export const getAdmission = async(req, res) => {
  const {id} = req.params;
  const admission = await prisma.admission.findUnique({
    where: { id: admissionId },
    include: {
      doctor: { include: { user: true } },
      patient: { include: { user: true } },
      treatmentRecords: true,
    },
  });

}