import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();
app.use(express.json());

// User routes
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
