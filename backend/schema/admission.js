import Joi from "joi";

export const admissionSchema = Joi.object({
  patientId: Joi.string().uuid().required(),
  doctorId: Joi.string().uuid().required(),
  timeIn: Joi.date().required(),
  dischargeAt: Joi.date().optional(),
  patientDescription: Joi.string().required(),
});
