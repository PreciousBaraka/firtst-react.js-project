import Joi from 'joi';

export const doctorResponseSchema = Joi.object({
  patientQueryId: Joi.string().uuid().required(),
  doctorId: Joi.string().uuid().required(),
  responseMessage: Joi.string().min(10).required(),
  status: Joi.string().valid('PENDING', 'RESPONDED', 'CLOSED').default('PENDING').required(),
});
