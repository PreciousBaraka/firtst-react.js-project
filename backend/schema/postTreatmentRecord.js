import Joi from "joi";

export const postTreatmentRecordSchema = Joi.object({
  treatmentRecordId: Joi.string().required(),
  patientId: Joi.string().required(),
  patientQueryId: Joi.string().required(),
  doctorId: Joi.string().required(),
  followUpPlan: Joi.string().required(),
  observations: Joi.string().required(),
  recoveryStatus: Joi.string().required(),
  notes: Joi.string().allow(""),
});


