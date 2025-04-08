import { prisma } from "../config/db.js";
import { postTreatmentRecordSchema } from "../schema/postTreatmentRecord.js";

export const createPostTreatmentRecord = async (req, res) => {
  const { error, value } = postTreatmentRecordSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const pTR = await prisma.postTreatmentRecord.create({ data: value });
    res.status(201).json(pTR);
  } catch (err) {
    res.status(500).json({ error: "Failed to create postTreatmentRecord" });
  }
};

export const getPostTreatmentRecord = async (req, res) => {
    try {
      const { id } = req.params;
  
      const postTreatmentRecord = await prisma.postTreatmentRecord.findUnique({
        where: { id },
        include: {
          treatment: true,
          patient: { include: { user: true } },
          feedback: true,
        },
      });
  
      if (!postTreatmentRecord) {
        return res.status(404).json({ message: "Post-treatment record not found" });
      }
  
      res.status(200).json(postTreatmentRecord);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  