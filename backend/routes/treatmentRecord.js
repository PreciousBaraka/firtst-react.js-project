import express from 'express';
import { createTreatmentRecord, getTreatmentRecordById, updateTreatmentRecord } from '../controllers/treatmentRecord.js';

const treatmentRecordRouter = express.Router();

treatmentRecordRouter.post('/treatment-record', createTreatmentRecord);
treatmentRecordRouter.get('/treatment-record/:id', getTreatmentRecordById);
treatmentRecordRouter.put('/treatment-record/:id', updateTreatmentRecord);


export default treatmentRecordRouter;
