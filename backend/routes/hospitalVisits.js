import express from "express";
import {
  createHospitalVisit,
  getAllHospitalVisits,
  getHospitalVisitById,
  updateHospitalVisit,
} from "../controllers/hospitalVisits.js";

const hospitalVisitRouter = express.Router();

hospitalVisitRouter.post("/", createHospitalVisit);
hospitalVisitRouter.get("/", getAllHospitalVisits);
hospitalVisitRouter.get("/:id", getHospitalVisitById);
hospitalVisitRouter.put("/:id", updateHospitalVisit);

export default hospitalVisitRouter;
