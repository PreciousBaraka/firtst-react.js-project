import { prisma } from "../config/db.js";


export const createPostTreatmentFeedback = async (req, res) => {
  const { error, value } = postTreatmentFeedbackSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const PTF = await prisma.postTreatmentFeedback.create({ data: value });
    res.status(201).json(PTF);
  } catch (err) {
    res.status(500).json({ error: "Failed to create Post Treatment Feedback Schema" });
  }
};
