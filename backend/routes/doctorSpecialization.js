import express from "express";
import {
  getDoctorSpecializations,
  createDoctorSpecialization,
  updateDoctorSpecialization,
} from "../controllers/doctorSpecialization.controller.js";

const doctorSpecializationrouter = express.Router();

doctorSpecializationrouter.get("/", getDoctorSpecializations);
doctorSpecializationrouter.post("/", createDoctorSpecialization);
doctorSpecializationrouter.patch("/:doctorId/:specializationId", updateDoctorSpecialization);

export default doctorSpecializationrouter;
