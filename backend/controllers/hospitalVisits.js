import { prisma } from "../config/db.js";
import {
  hospitalVisitEditSchema,
  hospitalVisitSchema,
} from "../schema/hospitalVisits.js";

export const createHospitalVisit = async (req, res) => {
  try {
    const { error, value } = hospitalVisitSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { reason } = value;
    const { patientId, receptionistId } = req.query;

    // Validate required foreign keys
    if (!patientId || !receptionistId) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // Ensure all linked entities exist
    const [patient, receptionist] = await Promise.all([
      prisma.patient.findUnique({ where: { id: patientId } }),
      prisma.receptionist.findUnique({ where: { id: receptionistId } }),
    ]);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    if (!receptionist) {
      return res.status(404).json({ message: "Receptionist not found" });
    }

    // Create the hospital visit
    const newVisit = await prisma.hospitalVisit.create({
      data: {
        reason,
        patient: { connect: { id: patientId } },
        receptionist: { connect: { id: receptionistId } },
      },
      include: {
        patient:{
          include:{
            user:{
              select:{
                fullName,
                email,
                phoneNumber
              }
            }
          }
        },
        receptionist: {
          include:{
            user:{
              select:{
                fullName,
                email,
                phoneNumber
              }
            }
          }
        },
      },
    });

    res.status(201).json(newVisit);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllHospitalVisits = async (req, res) => {
  try {
    const visits = await prisma.hospitalVisit.findMany({
      include: {
        patient: {
          include: {
            user: true,
          },
        },
        receptionist: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        visitDate: "desc",
      },
    });

    res.status(200).json(visits);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHospitalVisitById = async (req, res) => {
  try {
    const { id } = req.params;

    const visit = await prisma.hospitalVisit.findUnique({
      where: { id },
      include: {
        patient: {
          include: {
            user: {
              select: {
                fullName,
                email,
                phoneNumber,
              },
            },
          },
        },
        receptionist: true,
        treatmentRecord: {
          include: {
            doctor: {
              include: {
                user: {
                  select: {
                    fullName,
                    email,
                    phoneNumber,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!visit) {
      return res.status(404).json({ message: "Hospital visit not found" });
    }

    res.status(200).json(visit);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateHospitalVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = hospitalVisitEditSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existing = await prisma.hospitalVisit.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Hospital visit not found" });
    }

    const updated = await prisma.hospitalVisit.update({
      where: { id },
      data: value,
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
