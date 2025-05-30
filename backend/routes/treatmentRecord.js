import express from 'express';
import { createTreatmentQuery, createTreatmentRecord, getTreatmentRecordById, replyTreatmentQuery, updateTreatmentRecord } from '../controllers/treatmentRecord.js';

const treatmentRecordRouter = express.Router();

treatmentRecordRouter.post('/create', createTreatmentRecord);
treatmentRecordRouter.get('/:id', getTreatmentRecordById);
treatmentRecordRouter.put('/:id/update', updateTreatmentRecord);
treatmentRecordRouter.post("/create-query", createTreatmentQuery);
treatmentRecordRouter.post("/reply-query", replyTreatmentQuery);
treatmentRecordRouter.put("/queries/:doctorId", replyTreatmentQuery);


export default treatmentRecordRouter;
