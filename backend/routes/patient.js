import express from "express";
import { RoleType } from "@prisma/client";
import { authenticate, authorizeDoctor} from "../middlewares/auth.js";
import { getPatientById, getPatients, updatedPatient } from "../controllers/patient.js";

const patientRouter = express.Router();
patientRouter.get(
  "/",
  // authenticate,
  // // authorizeDoctor([RoleType.MANAGER]),
  getPatients
);
patientRouter.put(
  "/:id/edit",
  // authenticate,
  // authorizeDoctor ([RoleType.MANAGER]),
  updatedPatient
);

patientRouter.get("/:id", getPatientById)


export default patientRouter;
