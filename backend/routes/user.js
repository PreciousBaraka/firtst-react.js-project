import express from "express";
import {registerUser, loginUser, changeUserAccess, getDashboardStats} from "../controllers/user.js";
import { authenticate, authorizeDoctor } from "../middlewares/auth.js";
import {RoleType} from "@prisma/client"

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/:id/activate-deactivate", 
    authenticate, authorizeDoctor([RoleType.MANAGER]), 
    changeUserAccess)
userRouter.get("/stats", getDashboardStats);
export default userRouter;
