import Joi from "joi";
export const userSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
});

export const doctorSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  roleId: Joi.string().required(),
  nationalIdNo : Joi.string(). required()
});

export const doctorEditSchema = Joi.object({
  fullName: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  roleId: Joi.string(),
  nationalIdNo : Joi.string()
});

export const patientSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  password:Joi.string().required(),
  age : Joi.number().interger().required(),
  nationalIdNo : Joi.string(). required()
});

export const patientEditSchema = Joi.object({
  fullName: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  password:Joi.string(),
  age: Joi.number(). interger(),
  nationalIdNo : Joi.string()
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
