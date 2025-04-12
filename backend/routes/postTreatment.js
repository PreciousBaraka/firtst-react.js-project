import express from "express";
import {
  createPostTreatmentRecord,
  getAllPostTreatmentRecords,
  getPostTreatmentRecordById,
  updatePostTreatmentRecord,
} from "../controllers/postTreatment.js";

const postTreatmentRecordRouter = express.Router();

postTreatmentRecordRouter.post("/", createPostTreatmentRecord);
postTreatmentRecordRouter.get("/:id", getPostTreatmentRecordById);
postTreatmentRecordRouter.put("/:id", updatePostTreatmentRecord);
postTreatmentRecordRouter.get("/", getAllPostTreatmentRecords);

export default postTreatmentRecordRouter;
