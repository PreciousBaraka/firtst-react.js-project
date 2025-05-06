import Joi from 'joi';

export const treatmentRecordSchema = Joi.object({
  treatmentPlan: Joi.string().required(),
  symptoms: Joi.string().required(),
  status:Joi.string().valid("ACTIVE", "COMPLETED", "DISCHARGED").default("ACTIVE"),
});

export const treatmentRecordEditSchema = Joi.object({
  treatmentPlan: Joi.string(),
  symptoms: Joi.string(),
  status: Joi.string().valid("ACTIVE", "COMPLETED", "DISCHARGED").default("ACTIVE"),
});