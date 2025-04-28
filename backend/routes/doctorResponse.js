import express from "express";
import { createDoctorResponse, getDoctorResponseById, updateDoctorResponse } from "../controllers/doctorResponse.js";

const doctorResponseRouter = express.Router();

doctorResponseRouter.post("/create", createDoctorResponse);
doctorResponseRouter.get("/:id", getDoctorResponseById);
doctorResponseRouter.put("/:id", updateDoctorResponse);

export default doctorResponseRouter;
