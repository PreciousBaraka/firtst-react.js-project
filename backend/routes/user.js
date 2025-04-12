import express from "express";
import {registerUser, loginUser, changeUserAccess} from "../controllers/user.js";
import { authenticate, authorizeDoctor } from "../middlewares/auth.js";
import {RoleType} from "@prisma/client"

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/:id/activate-deactivate", authenticate, authorizeDoctor([RoleType.MANAGER]), changeUserAccess)
export default userRouter;
