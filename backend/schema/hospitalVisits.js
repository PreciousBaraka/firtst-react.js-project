import Joi from "joi";

export const hospitalVisitSchema = Joi.object({
  reason: Joi.string().min(5).max(500).required(),
});

export const hospitalVisitEditSchema = Joi.object({
    reason: Joi.string().min(5).max(500)
  });
