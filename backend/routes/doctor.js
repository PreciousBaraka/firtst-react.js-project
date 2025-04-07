import express from "express";
import { RoleType } from "@prisma/client";
import { authenticate, authorizeDoctor } from "../middleware/auth.js";
import { getDoctor, updateDoctor } from "../controllers/doctor.js";


const doctorRouter = express.Router();

doctorRouter.get(
  "/",
  authenticate,
  authorizeDoctor([RoleType.MANAGER]),
  getDoctor
);
doctorRouter.put(
  "/:id/edit",
  authenticate,
  authorizeDoctor([RoleType.MANAGER]),
  updateDoctor
);

export default staffRouter;
