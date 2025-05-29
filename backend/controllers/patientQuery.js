import { prisma } from "../config/db.js";
import { patientQuerySchema } from "../schema/patientQueries.js";

// Create patient query
export const createPatientQuery = async (req, res) => {
  try {
    const { error, value } = patientQuerySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { patientId, doctorId, treatmentRecordId, message } = value;

    // Verify treatment record belongs to patient
    const treatmentRecord = await prisma.treatmentRecord.findUnique({
      where: { id: treatmentRecordId },
      include: { hospitalVisit: true },
    });

    if (
      !treatmentRecord ||
      treatmentRecord.hospitalVisit.patientId !== patientId
    ) {
      return res
        .status(400)
        .json({ message: "Treatment record does not belong to the patient" });
    }

    const newPatientQuery = await prisma.patientQuery.create({
      data: {
        patientId,
        doctorId,
        treatmentRecordId,
        message,
        status: "PENDING",
      },
    });

    res.status(201).json(newPatientQuery);
  } catch (error) {
    console.error("Error creating patient query:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all patient queries
export const getPatientQueries = async (req, res) => {
  try {
    const queries = await prisma.patientQuery.findMany({
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
        treatmentRecord: true,
        postTreatmentRecord: true,
        doctorResponses: true,
      },
    });

    res.status(200).json(queries);
  } catch (error) {
    console.error("Error fetching queries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single query by ID
export const getPatientQueryById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await prisma.patientQuery.findUnique({
      where: { id },
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
        treatmentRecord: true,
        postTreatmentRecord: true,
        doctorResponses: true,
      },
    });

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.status(200).json(query);
  } catch (error) {
    console.error("Error fetching query by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get patient queries by patientId
export const getPatientQueriesByPatientId = async (req, res) => {
  const { patientId } = req.params;
  try {
    const queries = await prisma.patientQuery.findMany({
      where: { patientId },
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
        treatmentRecord: true,
        postTreatmentRecord: true,
        doctorResponses: true,
      },
    });

    if (!queries || queries.length === 0) {
      return res
        .status(404)
        .json({ message: "No queries found for this patient" });
    }

    res.status(200).json(queries);
  } catch (error) {
    console.error("Error fetching queries by patient ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update patient query (only status)
export const updatePatientQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existingQuery = await prisma.patientQuery.findUnique({
      where: { id },
    });

    if (!existingQuery) {
      return res.status(404).json({ message: "Query not found" });
    }

    if (status && !["PENDING", "RESPONDED", "CLOSED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedQuery = await prisma.patientQuery.update({
      where: { id },
      data: {
        status: status || existingQuery.status,
      },
    });

    res.status(200).json(updatedQuery);
  } catch (error) {
    console.error("Error updating query:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
