import Joi from "joi";

export const treatmentRecordSchema = Joi.object({
    admissionId: Joi.string().uuid().required(),
    diagnosis: Joi.string().required(),
    symptoms: Joi.string().required(),
    prescription: Joi.string().required(),
    time: Joi.date().required(),
  });
  