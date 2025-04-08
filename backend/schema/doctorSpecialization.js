import Joi from "joi";

export const doctorSpecializationSchema = Joi.object({
  doctorId: Joi.string().uuid().required(),
  specializationId: Joi.string().uuid().required(),
  specializationType: Joi.string()
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
    .default("GENERAL_SURGERY")
});



export const doctorSpecializationEditSchema = Joi.object({
  doctorId: Joi.string().uuid().optional(),
  specializationId: Joi.string().uuid().optional(),
  specializationType: Joi.string()
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
    .optional()
});

