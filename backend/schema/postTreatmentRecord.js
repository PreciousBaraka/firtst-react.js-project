import Joi from "joi";

export const postTreatmentRecordSchema = Joi.object({
    treatmentId: Joi.string().uuid().required(),
    patientId: Joi.string().uuid().required(),
    postSymptoms: Joi.string().required(),
    dateAndTime: Joi.date().required(),
    notes: Joi.string().required(),
  });
  