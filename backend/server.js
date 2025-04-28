import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import doctorRouter from "./routes/doctor.js";
import patientRouter from "./routes/patient.js";
import roleRouter from "./routes/roles.js";
import treatmentRecordRouter from "./routes/treatmentRecord.js";
import hospitalVisitRouter from "./routes/hospitalVisits.js";
import postTreatmentRecordRouter from "./routes/postTreatment.js";
import patientQueryRouter from "./routes/patientQuery.js";
import doctorResponseRouter from "./routes/doctorResponse.js";
import receptionistRouter from "./routes/receptionist.js";
import cors from "cors"

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("The app is running");
});

// routes
app.use("/api/roles", roleRouter);
app.use("/api/users", userRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/patients", patientRouter);
app.use("/api/receptionists", receptionistRouter);
app.use("/api/treatment-records", treatmentRecordRouter);
app.use("/api/hospital-visits", hospitalVisitRouter);
app.use("/api/post-treatment-records", postTreatmentRecordRouter);
app.use("/api/patient-queries", patientQueryRouter);
app.use("/api/doctor-responses", doctorResponseRouter);


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
