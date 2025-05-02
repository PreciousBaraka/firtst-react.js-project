import Joi from 'joi';

export const treatmentRecordSchema = Joi.object({
  vitals: Joi.string().required(),
  treatmentPlan: Joi.string().required(),
  painLevel: Joi.number().integer().min(0).max(10).required(),
  mobility: Joi.string().required(),
  symptoms: Joi.string().required(),
  status:Joi.string().valid("ACTIVE", "COMPLETED", "DISCHARGED").required(),
  temperature: Joi.number().min(-273.15).required(), // Temperature in Celsius
});

export const treatmentRecordEditSchema = Joi.object({
  vitals: Joi.string(),
  treatmentPlan: Joi.string(),
  painLevel: Joi.number().integer(),
  mobility: Joi.string(),
  symptoms: Joi.string(),
  temperature: Joi.number().min(-273.15),
  status: Joi.string().valid("ACTIVE", "COMPLETED", "DISCHARGED"),
});