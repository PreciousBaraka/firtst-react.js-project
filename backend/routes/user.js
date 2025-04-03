import express from "express";
import {registerUser, loginUser, getUserProfile} from ("../controllers/user.js");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", getUserProfile);

export default userRouter;
