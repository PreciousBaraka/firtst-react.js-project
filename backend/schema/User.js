import Joi from "joi";

// User schema for creating or updating a user
export const userSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required().messages({
    "string.base": "Full Name must be a string",
    "string.min": "Full Name must be at least 3 characters long",
    "string.max": "Full Name must be less than or equal to 100 characters",
    "any.required": "Full Name is required",
  }),

  email: Joi.string().email().required().trim().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),

  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/) // Consider extending regex for international support
    .required()
    .messages({
      "string.base": "Phone number must be a string",
      "string.pattern.base": "Phone number must be a 10-digit number",
      "any.required": "Phone number is required",
    }),

  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")) // Password must include a mix of letters and numbers
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
});

export const doctorSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
    password: Joi.string().min(6).required(),
  nationalIdNo: Joi.string().required(), // Only relevant to doctors
  specialization: Joi.string()
    .valid(
      "GENERAL_SURGERY",
      "NEUROSURGERY",
      "ORTHOPEDIC_SURGERY",
      "CARDIOTHORACIC_SURGERY",
      "VASCULAR_SURGERY",
      "PEDIATRIC_SURGERY",
      "ENT_SURGERY",
      "OPHTHALMIC_SURGERY",
      "PLASTIC_SURGERY",
      "UROLOGIC_SURGERY",
      "TRAUMA_SURGERY",
      "COLORECTAL_SURGERY",
      "GYNECOLOGIC_SURGERY"
    )
    .required(),
  roleId: Joi.string().required(),
});
export const doctorEditSchema = Joi.object({
  fullName: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/),
    password: Joi.string().min(6),
  nationalIdNo: Joi.string(), // Only relevant to doctors
  specialization: Joi.string().valid(
    "GENERAL_SURGERY",
    "NEUROSURGERY",
    "ORTHOPEDIC_SURGERY",
    "CARDIOTHORACIC_SURGERY",
    "VASCULAR_SURGERY",
    "PEDIATRIC_SURGERY",
    "ENT_SURGERY",
    "OPHTHALMIC_SURGERY",
    "PLASTIC_SURGERY",
    "UROLOGIC_SURGERY",
    "TRAUMA_SURGERY",
    "COLORECTAL_SURGERY",
    "GYNECOLOGIC_SURGERY"
  ),
  roleId: Joi.string(),
});

export const patientSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid("Male", "Female").required(),
  address: Joi.string().min(5).max(255).required(),
  nationalIdNo: Joi.string().required(),
  createdAt: Joi.date().default(Date.now),
});

export const patientEditSchema = Joi.object({
  fullName: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/),
  password: Joi.string().min(6),
  dateOfBirth: Joi.date(),
  gender: Joi.string().valid("Male", "Female"),
  address: Joi.string().min(5).max(255),
  nationalIdNo: Joi.string(),
  createdAt: Joi.date().default(Date.now),
});

export const receptionistSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  nationalIdNo: Joi.string().required(),
  password: Joi.string().min(6).required(),
  createdAt: Joi.date().default(Date.now),
  roleId: Joi.string().required(),
});

export const receptionEditistSchema = Joi.object({
  fullName: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/),
  nationalIdNo: Joi.string(),
  password: Joi.string().min(6),
  roleId: Joi.string(),
  createdAt: Joi.date().default(Date.now),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
