import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import doctorRouter from "./routes/doctor.js";
import patientRouter from "./routes/patient.js";
import roleRouter from "./routes/roles.js";
import doctorSpecializationrouter from "./routes/doctorSpecialization.js";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("The app is running");
});

// routes
app.use("/api/roles", roleRouter);
app.use("/api/users", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/doctor", doctorSpecializationrouter);
app.use("/api/patient", patientRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
