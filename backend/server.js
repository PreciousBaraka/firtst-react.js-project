import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("The app is running");
});

// routes
app.use("/api/users", userRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
