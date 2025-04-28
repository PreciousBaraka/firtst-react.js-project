import { prisma } from "../config/db.js";
import {
  treatmentRecordSchema,
  treatmentRecordEditSchema,
} from "../schema/treatmentRecord.js";

// Create Treatment Record
export const createTreatmentRecord = async (req, res) => {
  try {
    const { error, value } = treatmentRecordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {
      hospitalVisitId,
      vitals,
      treatmentPlan,
      painLevel,
      mobility,
      symptoms,
      temperature,
      status,
    } = value;

    const hospitalVisit = await prisma.hospitalVisit.findUnique({
      where: { id: hospitalVisitId },
    });
    if (!hospitalVisit) {
      return res.status(404).json({ message: "Hospital visit not found" });
    }


    const newTreatmentRecord = await prisma.treatmentRecord.create({
      data: {
        hospitalVisitId,
        vitals,
        treatmentPlan,
        painLevel,
        mobility,
        symptoms,
        temperature,
        status
      },
    });

    res.status(201).json(newTreatmentRecord);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Treatment Record by ID
export const getTreatmentRecordById = async (req, res) => {
  try {
    const { id } = req.params;

    const treatmentRecord = await prisma.treatmentRecord.findUnique({
      where: { id },
      include: {
        hospitalVisit: true,
      },
    });

    if (!treatmentRecord) {
      return res.status(404).json({ message: "Treatment record not found" });
    }

    res.status(200).json(treatmentRecord);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update Treatment Record
export const updateTreatmentRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = treatmentRecordEditSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingRecord = await prisma.treatmentRecord.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      return res.status(404).json({ message: "Treatment record not found" });
    }

    const updatedRecord = await prisma.treatmentRecord.update({
      where: { id },
      data: { ...value },
    });

    res.status(200).json(updatedRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
