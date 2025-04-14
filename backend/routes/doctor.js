import express from "express";
import { RoleType } from "@prisma/client";
import { authenticate, authorizeDoctor } from "../middlewares/auth.js";
import { getDoctors, updateDoctor } from "../controllers/doctor.js";


const doctorRouter = express.Router();

doctorRouter.get(
  "/",
  // authenticate,
  // authorizeDoctor([RoleType.MANAGER]),
  getDoctors
);
doctorRouter.put(
  "/:id/edit",
  // authenticate,
  // authorizeDoctor([RoleType.MANAGER]),
  updateDoctor
);

export default doctorRouter;
