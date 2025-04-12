import { prisma } from "../config/db.js";
import { postTreatmentRecordSchema } from "../schema/postTreatmentRecord.js";

export const createPostTreatmentRecord = async (req, res) => {
    try {
      const { error, value } = postTreatmentRecordSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const {
        treatmentRecordId,
        patientId,
        patientQueryId,
        doctorId,
        followUpPlan,
        observations,
        recoveryStatus,
        notes,
      } = value;
  
      // Check if treatment is marked COMPLETED
      const treatmentRecord = await prisma.treatmentRecord.findUnique({
        where: { id: treatmentRecordId },
      });
  
      if (!treatmentRecord) {
        return res.status(404).json({ message: "Treatment record not found" });
      }
  
      if (treatmentRecord.status !== "COMPLETED") {
        return res.status(400).json({
          message: "Cannot create post-treatment record before treatment is completed.",
        });
      }
  
      const newPostTreatment = await prisma.postTreatmentRecord.create({
        data: {
          treatmentRecordId,
          patientId,
          patientQueryId,
          doctorId,
          followUpPlan,
          observations,
          recoveryStatus,
          notes,
        },
      });
  
      res.status(201).json(newPostTreatment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const getPostTreatmentRecordById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const record = await prisma.postTreatmentRecord.findUnique({
        where: { id },
        include: {
          treatmentRecord: true,
          patient: {
            include: { user: true },
          },
          Doctor: {
            include: { user: true },
          },
          PatientQuery: true,
        },
      });
  
      if (!record) {
        return res.status(404).json({ message: "Post-treatment record not found" });
      }
  
      res.status(200).json(record);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const updatePostTreatmentRecord = async (req, res) => {
    try {
      const { id } = req.params;
  
      const {
        followUpPlan,
        observations,
        recoveryStatus,
        notes,
      } = req.body;
  
      const existing = await prisma.postTreatmentRecord.findUnique({
        where: { id },
      });
  
      if (!existing) {
        return res.status(404).json({ message: "Post-treatment record not found" });
      }
  
      const updated = await prisma.postTreatmentRecord.update({
        where: { id },
        data: {
          followUpPlan: followUpPlan || existing.followUpPlan,
          observations: observations || existing.observations,
          recoveryStatus: recoveryStatus || existing.recoveryStatus,
          notes: notes ?? existing.notes,
        },
      });
  
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const getAllPostTreatmentRecords = async (req, res) => {
    try {
      const { patientId } = req.query;
  
      if (!patientId) {
        return res.status(400).json({ message: "patientId is required" });
      }
  
      const records = await prisma.postTreatmentRecord.findMany({
        where: { patientId },
        include: {
          treatmentRecord: true,
          patient: {
            include: { user: true },
          },
          Doctor: {
            include: { user: true },
          },
          PatientQuery: true,
        },
      });
  
      if (records.length === 0) {
        return res.status(404).json({ message: "No post-treatment records found for this patient" });
      }
  
      res.status(200).json(records);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  