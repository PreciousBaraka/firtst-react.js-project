import express from "express"; 
import {
  createPatientQuery,
  getPatientQueries,
  getPatientQueryById,
  updatePatientQuery,
  getPatientQueriesByPatientId,  // <-- Import the new controller
} from "../controllers/patientQuery.js";

const patientQueryRouter = express.Router();

patientQueryRouter.post("/create", createPatientQuery);
patientQueryRouter.get("/", getPatientQueries);
// Add this above the "/:id" route to avoid conflicts
patientQueryRouter.get("/patient/:patientId", getPatientQueriesByPatientId);
patientQueryRouter.get("/:id", getPatientQueryById);
patientQueryRouter.put("/:id", updatePatientQuery);

export default patientQueryRouter;
