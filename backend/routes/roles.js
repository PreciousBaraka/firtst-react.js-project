import express from "express";
import {
  createRole,
  deleteRole,
  getRoles,
  updateRole,
} from "../controllers/roles.js";
import { authenticate, authorizeDoctor} from "../middlewares/auth.js";
import { RoleType } from "@prisma/client";

const roleRouter = express.Router();

roleRouter.post(
  "/create",
  authenticate,
  authorizeDoctor([RoleType.MANAGER]),
  createRole
);
roleRouter.get("/", authenticate, authorizeStaff([RoleType.MANAGER]), getRoles);
roleRouter.put(
  "/:id/edit",
  authenticate,
  authorizeDoctor([RoleType.MANAGER]),
  updateRole
);
roleRouter.delete(
  "/:id/delete",
  authenticate,
  authorizeDoctor([RoleType.MANAGER]),
  deleteRole
);

export default roleRouter;
