import express from "express";
import {
  createPatientQuery,
  getPatientQueries,
  getPatientQueryById,
  updatePatientQuery,
} from "../controllers/patientQuery.js";

const patientQueryRouter = express.Router();

patientQueryRouter.post("/create", createPatientQuery);
patientQueryRouter.get("/", getPatientQueries);
patientQueryRouter.get("/:id", getPatientQueryById);
patientQueryRouter.put("/:id", updatePatientQuery);

export default patientQueryRouter;
