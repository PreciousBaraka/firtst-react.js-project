import { prisma } from "../config/db.js";
import { patientQuerySchema } from "../schema/patientQueries.js";

export const createPatientQuery = async (req, res) => {
  try {
    const { error, value } = patientQuerySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { patientId, doctorId, treatmentRecordId, message } = value;

    const newPatientQuery = await prisma.patientQuery.create({
      data: {
        patientId,
        doctorId,
        treatmentRecordId,
        message,
        status: "PENDING",  // Default status
      },
    });

    res.status(201).json(newPatientQuery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPatientQueries = async (req, res) => {
    try {
      const queries = await prisma.patientQuery.findMany({
        include: {
          patient: true,
          doctor: true,
          treatmentRecord: true,
          postTreatmentRecord: true,
        },
      });
  
      res.status(200).json(queries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const getPatientQueryById = async (req, res) => {
    try {
      const { id } = req.params;
      const query = await prisma.patientQuery.findUnique({
        where: { id },
        include: {
          patient: true,
          doctor: true,
          treatmentRecord: true,
          postTreatmentRecord: true,
        },
      });
  
      if (!query) {
        return res.status(404).json({ message: "Query not found" });
      }
  
      res.status(200).json(query);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const updatePatientQuery = async (req, res) => {
    try {
      const { id } = req.params;
      const { response, status } = req.body;
  
      const existingQuery = await prisma.patientQuery.findUnique({
        where: { id },
      });
  
      if (!existingQuery) {
        return res.status(404).json({ message: "Query not found" });
      }
  
      // Ensure the status transition is valid
      if (status && !["PENDING", "RESPONDED", "CLOSED"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
  
      const updatedQuery = await prisma.patientQuery.update({
        where: { id },
        data: {
          response: response || existingQuery.response,  // Update response
          status: status || existingQuery.status,        // Update status
        },
      });
  
      res.status(200).json(updatedQuery);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  