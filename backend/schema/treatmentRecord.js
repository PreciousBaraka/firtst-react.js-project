import Joi from 'joi';

export const treatmentRecordSchema = Joi.object({
  hospitalVisitId: Joi.string().required(),
  doctorId: Joi.string().required(),
  vitals: Joi.string().required(),
  treatmentPlan: Joi.string().required(),
  painLevel: Joi.number().integer().min(0).max(10).required(),
  mobility: Joi.string().required(),
  symptoms: Joi.string().required(),
  temperature: Joi.number().min(-273.15).required(), // Temperature in Celsius
  patientId: Joi.string().required(),
});

export const treatmentRecordEditSchema = Joi.object({
  vitals: Joi.string(),
  treatmentPlan: Joi.string(),
  painLevel: Joi.number().integer(),
  mobility: Joi.string(),
  symptoms: Joi.string(),
  temperature: Joi.number(),
  status: Joi.string().valid("ACTIVE", "COMPLETED", "DISCHARGED"),
});