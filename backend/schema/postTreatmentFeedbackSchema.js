import Joi from "joi";

export const postTreatmentFeedbackSchema = Joi.object({
    postTreatmentRecordId: Joi.string().uuid().required(),
    prescription: Joi.string().required(),
    dateTime: Joi.date().required(),
    notes: Joi.string().required(),
  });
  