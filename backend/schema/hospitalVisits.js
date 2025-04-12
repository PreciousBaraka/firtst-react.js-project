import Joi from "joi";

export const hospitalVisitSchema = Joi.object({
  visitDate: Joi.date().iso().required(),
  reason: Joi.string().min(5).max(500).required(),
});

export const hospitalVisitEditSchema = Joi.object({
    visitDate: Joi.date().iso(),
    reason: Joi.string().min(5).max(500)
  });
