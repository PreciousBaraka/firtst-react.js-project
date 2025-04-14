import express from "express";
import { RoleType } from "@prisma/client";
import { authenticate, authorizeDoctor } from "../middlewares/auth.js";
import { getReceptionists, updateReceptionist } from "../controllers/receptionist.js";


const receptionistRouter = express.Router();

receptionistRouter.get(
  "/",
//   authenticate,
//   authorizeDoctor([RoleType.MANAGER]),
  getReceptionists
);
receptionistRouter.put(
  "/:id/edit",
//   authenticate,
//   authorizeDoctor([RoleType.MANAGER]),
  updateReceptionist
);

export default receptionistRouter;
