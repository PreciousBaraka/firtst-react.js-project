import express from 'express';
import { createTreatmentRecord, getTreatmentRecordById, updateTreatmentRecord } from '../controllers/treatmentRecord.js';

const treatmentRecordRouter = express.Router();

treatmentRecordRouter.post('/create', createTreatmentRecord);
treatmentRecordRouter.get('/:id', getTreatmentRecordById);
treatmentRecordRouter.put('/:id', updateTreatmentRecord);


export default treatmentRecordRouter;
