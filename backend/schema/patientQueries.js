import Joi from "joi";

export const patientQuerySchema = Joi.object({
  patientId: Joi.string().uuid().required(),
  doctorId: Joi.string().uuid().required(),
  treatmentRecordId: Joi.string().uuid().required(),
  message: Joi.string().min(10).required(),
  status: Joi.string().valid("PENDING", "RESPONDED", "CLOSED").default("PENDING").required(),
});
