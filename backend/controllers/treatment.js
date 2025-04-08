import { prisma } from "../config/db.js";
import { treatmentRecordSchema } from "../schema/treatmentRecord.js";

export const createTreatment = async (req, res) => {
  const { error, value } = treatmentRecordSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const treatment = await prisma.treatmentRecord.create({ data: value });
    res.status(201).json(treatment);
  } catch (err) {
    res.status(500).json({ error: "Failed to create treatment" });
  }
};
